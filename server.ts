import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, ThinkingLevel, Modality, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";
import { generateSitemapXml, generateSitemapManifest } from "./src/utils/sitemapGenerator";
import { buildCrawlerShell } from "./src/utils/crawlerShell";
import { addWebhookEventToFirestore, getRecentWebhookEvents } from "./src/lib/firebase";

dotenv.config();

// Shared Gemini client utility
// Always set the User-Agent header to 'aistudio-build' in httpOptions for telemetry.
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Ensure it is defined in your Secrets.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

export async function createApp() {
  const app = express();
  app.set("trust proxy", 1);
  const PORT = Number(process.env.PORT) || 3000;

  // Body size limits: AI image/music endpoints need base64 uploads, but 50mb per request is an easy DoS vector
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // Minimal in-memory rate limiter for the paid Gemini endpoints (per IP, sliding window).
  // These endpoints are public, so without a limit anyone can run up your Gemini bill.
  const aiHits = new Map<string, number[]>();
  const AI_WINDOW_MS = 60_000;
  const AI_MAX_PER_WINDOW = Number(process.env.AI_RATE_LIMIT_PER_MIN) || 20;
  app.use("/api/ai", (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const recent = (aiHits.get(ip) || []).filter((t) => now - t < AI_WINDOW_MS);
    if (recent.length >= AI_MAX_PER_WINDOW) {
      return res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
    }
    recent.push(now);
    aiHits.set(ip, recent);
    if (aiHits.size > 5000) {
      for (const [k, v] of aiHits) if (!v.some((t) => now - t < AI_WINDOW_MS)) aiHits.delete(k);
    }
    next();
  });

  // Helper to determine the canonical base URL for the active request or environment
  const getSiteBaseUrl = (req: express.Request) => {
    if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");
    const host = req.get("host") || "www.dhanusgoldfitness.com";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    return `${protocol}://${host}`;
  };

  // ==========================================
  // DYNAMIC SITEMAP, MANIFEST & ROBOTS.TXT
  // ==========================================
  app.get("/sitemap.xml", (req, res) => {
    const siteUrl = getSiteBaseUrl(req);
    res.header("Content-Type", "application/xml; charset=utf-8");
    res.header("Cache-Control", "public, max-age=3600, s-maxage=86400");
    try {
      const xml = generateSitemapXml(siteUrl);
      res.send(xml);
    } catch (err) {
      const staticSitemap = path.join(process.cwd(), "public/sitemap.xml");
      if (fs.existsSync(staticSitemap)) {
        res.sendFile(staticSitemap);
      } else {
        res.status(500).send("Error generating sitemap");
      }
    }
  });

  app.get("/sitemap-manifest.json", (req, res) => {
    const siteUrl = getSiteBaseUrl(req);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header("Cache-Control", "public, max-age=3600, s-maxage=86400");
    try {
      res.json(generateSitemapManifest(siteUrl));
    } catch {
      res.status(500).json({ error: "Error generating sitemap manifest" });
    }
  });

  app.get("/robots.txt", (req, res) => {
    const siteUrl = getSiteBaseUrl(req);
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.header("Cache-Control", "public, max-age=86400");
    res.send(`# Dhanus Gold Fitness SEO Robots Configuration
User-agent: *
Allow: /

# Protected Routes
Disallow: /admin/
Disallow: /api/
Disallow: /ads-hub
Disallow: /login
Disallow: /integrations
Disallow: /webhooks

# Sitemaps Location
Sitemap: ${siteUrl}/sitemap.xml
`);
  });

  // Serve static files from the public directory explicitly
  app.use(express.static(path.join(process.cwd(), "public")));

  // ==========================================
  // GEMINI API ENDPOINTS
  // ==========================================

  // 1. Multi-turn Chatbot with optional Thinking Mode & Specific Roles
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history, role, useThinking } = req.body;
      const ai = getGeminiClient();

      // System instruction based on the coach's role
      let systemInstruction = "You are a professional fitness coach at Dhanus Gold Fitness.";
      if (role === "nutritionist") {
        systemInstruction = "You are an Elite Sports Nutritionist and Diet Planner at Dhanus Gold Fitness. Create detailed macro calculations and tailored meal options.";
      } else if (role === "corrective") {
        systemInstruction = "You are a Corrective Exercise & Rehab Specialist at Dhanus Gold Fitness. Focus on injury prevention, form correction, and rehabilitation.";
      } else if (role === "general") {
        systemInstruction = "You are Dhanus AI, a helpful, encouraging elite fitness guide at Dhanus Gold Fitness center in Kengeri, Bengaluru. Provide positive, clear answers.";
      }

      // Model Selection: gemini-3.1-pro-preview for complex tasks (Thinking), gemini-3.5-flash for general tasks
      const modelName = useThinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";

      // Prepare Chat options
      const chatConfig: any = {
        systemInstruction,
      };

      if (useThinking) {
        chatConfig.thinkingConfig = {
          thinkingLevel: ThinkingLevel.HIGH
        };
      }

      const chat = ai.chats.create({
        model: modelName,
        config: chatConfig,
        history: history || []
      });

      const response = await chat.sendMessage({ message });
      const text = response.text || "";

      res.json({ text });
    } catch (error: any) {
      console.error("Chat Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate chat response" });
    }
  });

  // 2. Google Maps Grounding Search
  app.post("/api/ai/maps-search", async (req, res) => {
    try {
      const { prompt } = req.body;
      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt || "Find fitness store or healthy restaurant near Kengeri, Bengaluru.",
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      const text = response.text || "";
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;

      res.json({ text, groundingMetadata });
    } catch (error: any) {
      console.error("Maps Search Error:", error);
      res.status(500).json({ error: error.message || "Failed to perform maps search" });
    }
  });

  // 3. High-Quality Image Generation (Imagen) with Aspect Ratio & Size Controls
  app.post("/api/ai/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio, imageSize, modelType } = req.body;
      const ai = getGeminiClient();

      // Models: 'gemini-3-pro-image-preview' for studio-quality, or 'gemini-3.1-flash-image-preview' for general cases
      const modelName = modelType === "studio" ? "gemini-3-pro-image-preview" : "gemini-3.1-flash-image-preview";

      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [{ text: prompt || "A sleek futuristic fitness poster with golden lighting" }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || "1:1",
            imageSize: imageSize || "1K"
          }
        }
      });

      let imageUrl = "";
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!imageUrl) {
        throw new Error("No image data returned from Gemini");
      }

      res.json({ imageUrl });
    } catch (error: any) {
      console.error("Image Gen Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  // 4. Lyria Music Generation (Clip & Pro)
  app.post("/api/ai/generate-music", async (req, res) => {
    try {
      const { prompt, isFullLength, imageBytes, mimeType } = req.body;
      const ai = getGeminiClient();

      const modelName = isFullLength ? "lyria-3-pro-preview" : "lyria-3-clip-preview";

      let contents: any = prompt || "Generate a high energy workout techno beat with heavy bass.";
      
      // Support Image + Text music generation
      if (imageBytes && mimeType) {
        contents = {
          parts: [
            { text: prompt || "Generate track inspired by this image." },
            { inlineData: { data: imageBytes, mimeType } }
          ]
        };
      }

      const responseStream = await ai.models.generateContentStream({
        model: modelName,
        contents,
        config: {
          responseModalities: [Modality.AUDIO],
        }
      });

      let audioBase64 = "";
      let lyrics = "";
      let responseMimeType = "audio/wav";

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              responseMimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      if (!audioBase64) {
        throw new Error("No music audio data generated");
      }

      res.json({
        audio: audioBase64,
        mimeType: responseMimeType,
        lyrics
      });
    } catch (error: any) {
      console.error("Music Gen Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate music" });
    }
  });

  // 5. Veo Video Generation: Step 1 (Start)
  app.post("/api/ai/generate-video", async (req, res) => {
    try {
      const { prompt, imageBytes, mimeType, aspectRatio, resolution } = req.body;
      const ai = getGeminiClient();

      // We support veo-3.1-fast-generate-preview or veo-3.1-lite-generate-preview
      const modelName = "veo-3.1-fast-generate-preview";

      let videoPayload: any = {
        model: modelName,
        config: {
          numberOfVideos: 1,
          resolution: resolution || "720p",
          aspectRatio: aspectRatio || "16:9"
        }
      };

      if (prompt) {
        videoPayload.prompt = prompt;
      }

      // Image to video generation support
      if (imageBytes && mimeType) {
        videoPayload.image = {
          imageBytes,
          mimeType
        };
      }

      const operation = await ai.models.generateVideos(videoPayload);

      res.json({ operationName: operation.name });
    } catch (error: any) {
      console.error("Video Gen Start Error:", error);
      res.status(500).json({ error: error.message || "Failed to start video generation" });
    }
  });

  // 6. Veo Video Generation: Step 2 (Poll Status)
  app.post("/api/ai/video-status", async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: "operationName is required" });
      }

      const ai = getGeminiClient();
      const op = new GenerateVideosOperation();
      op.name = operationName;

      const updated = await ai.operations.getVideosOperation({ operation: op });
      res.json({ done: updated.done });
    } catch (error: any) {
      console.error("Video Poll Error:", error);
      res.status(500).json({ error: error.message || "Failed to fetch video operation status" });
    }
  });

  // 7. Veo Video Generation: Step 3 (Download)
  app.post("/api/ai/video-download", async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: "operationName is required" });
      }

      const ai = getGeminiClient();
      const op = new GenerateVideosOperation();
      op.name = operationName;

      const updated = await ai.operations.getVideosOperation({ operation: op });
      
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) {
        return res.status(404).json({ error: "Video URI not found or video is not completed yet" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': apiKey || "" },
      });

      if (!videoRes.ok) {
        throw new Error(`Video download failed with status ${videoRes.status}`);
      }
      res.setHeader("Content-Type", "video/mp4");
      
      // Stream the video back
      const reader = videoRes.body?.getReader();
      if (!reader) {
        throw new Error("Unable to read video download stream");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } catch (error: any) {
      console.error("Video Download Error:", error);
      res.status(500).json({ error: error.message || "Failed to download video" });
    }
  });

  // ==========================================
  // PERMANENT WEBSITE CALLBACK & WEBHOOK INTEGRATION ENDPOINTS
  // ==========================================

  // Verification challenge (GET /api/callback & GET /api/webhook)
  // Supports Meta / WhatsApp Cloud API webhook handshake (hub.mode, hub.verify_token, hub.challenge)
  // and browser health check / status inspection
  const handleWebhookVerification = (req: express.Request, res: express.Response) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    const expectedToken = process.env.WEBHOOK_VERIFY_TOKEN || "dhanus_gold_webhook_token";

    if (mode && token) {
      if (mode === "subscribe" && token === expectedToken) {
        console.log("[Webhook Handshake] Meta/WhatsApp webhook challenge verified successfully");
        return res.status(200).send(challenge);
      } else {
        console.warn("[Webhook Handshake] Verification failed. Token mismatch.");
        return res.status(403).json({ error: "Verification token mismatch" });
      }
    }

    const host = req.get("host") || "www.dhanusgoldfitness.com";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    return res.status(200).json({
      status: "active",
      service: "Dhanus Gold Fitness - Permanent Callback & Webhook Ingestion Service",
      version: "2.0.0",
      permanentEndpoints: {
        callbackUrl: `${baseUrl}/api/callback`,
        webhookUrl: `${baseUrl}/api/webhook`,
        integrationConfigUrl: `${baseUrl}/api/integrations/config`,
        eventsUrl: `${baseUrl}/api/webhook/events`,
      },
      database: "Firestore",
      timestamp: new Date().toISOString(),
      instructions: "Configure this endpoint in Meta WhatsApp Business Cloud API, Meta Lead Ads, Zapier, Make, or custom CRM webhook settings.",
    });
  };

  app.get("/api/callback", handleWebhookVerification);
  app.get("/api/webhook", handleWebhookVerification);

  // Ingestion handler (POST /api/callback & POST /api/webhook)
  // Receives incoming leads, notifications, WhatsApp messages, payments, and stores them in Firestore
  const handleWebhookIngestion = async (req: express.Request, res: express.Response) => {
    try {
      const source = (
        (req.headers["x-webhook-source"] as string) ||
        (req.query.source as string) ||
        (req.body?.object === "whatsapp_business_account" ? "whatsapp_cloud_api" : null) ||
        (req.body?.entry?.[0]?.changes?.[0]?.value?.leadgen_id ? "meta_lead_ads" : null) ||
        (req.body?.event ? `partner_${req.body.event}` : null) ||
        "website_callback"
      );

      const eventType = (
        (req.headers["x-event-type"] as string) ||
        (req.query.event as string) ||
        req.body?.event ||
        req.body?.type ||
        (req.body?.entry?.[0]?.changes?.[0]?.field ? req.body.entry[0].changes[0].field : null) ||
        "lead_or_message_received"
      );

      const payload = req.body || {};
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
      const userAgent = req.headers["user-agent"] || "unknown";

      // Persist to Firestore
      const firestoreResult = await addWebhookEventToFirestore({
        source,
        eventType,
        payload,
        status: "received",
        ip,
        userAgent,
        receivedAt: new Date().toISOString()
      });

      console.log(`[Webhook Ingestion] Logged event ${firestoreResult.id} from ${source} (${eventType})`);

      return res.status(200).json({
        success: true,
        message: "Webhook event received and recorded successfully",
        eventId: firestoreResult.id || "logged",
        source,
        eventType,
        receivedAt: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("[Webhook Ingestion Error]:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to process webhook event"
      });
    }
  };

  app.post("/api/callback", handleWebhookIngestion);
  app.post("/api/webhook", handleWebhookIngestion);

  // Integration Configuration details
  app.get("/api/integrations/config", (req, res) => {
    const host = req.get("host") || "www.dhanusgoldfitness.com";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    res.json({
      service: "Dhanus Gold Fitness Integration Engine",
      permanentEndpoints: {
        websiteCallbackUrl: `${baseUrl}/api/callback`,
        webhookUrl: `${baseUrl}/api/webhook`,
        testWebhookUrl: `${baseUrl}/api/webhook/test`,
        recentEventsUrl: `${baseUrl}/api/webhook/events`
      },
      auth: {
        supportedHeaders: ["x-webhook-source", "x-event-type", "x-api-key"]
      },
      links: {
        privacyPolicy: `${baseUrl}/privacy-policy`,
        instagram: "https://www.instagram.com/dhanus_goldfitness/",
        whatsapp: "https://wa.me/919740018911",
        call: "tel:+919740018911",
        googleMaps: "https://maps.app.goo.gl/yB41yXc1GgFDYtwv5"
      },
      integrationPoints: [
        {
          name: "Meta Lead Ads (Instagram & Facebook)",
          description: "Receive real-time gym inquiry leads from Instagram & Facebook lead ads directly to Firestore.",
          callbackUrl: `${baseUrl}/api/callback`,
          events: ["leadgen"]
        },
        {
          name: "WhatsApp Business Cloud API",
          description: "Webhook listener for WhatsApp member inquiries, replies, and status reports.",
          callbackUrl: `${baseUrl}/api/callback`,
          events: ["messages", "message_status"]
        },
        {
          name: "Zapier / Make.com Webhook Automation",
          description: "Connect Google Sheets, Email alerts, or CRM pipelines by sending HTTP POST to the webhook endpoint.",
          webhookUrl: `${baseUrl}/api/webhook`,
          method: "POST",
          format: "JSON"
        },
        {
          name: "Payment Gateway Webhooks (Razorpay / Stripe)",
          description: "Sync online membership registrations and renewals.",
          webhookUrl: `${baseUrl}/api/webhook?source=payment_gateway`,
          method: "POST"
        }
      ]
    });
  });

  // Test Webhook trigger
  app.post("/api/webhook/test", async (req, res) => {
    try {
      const testData = req.body && Object.keys(req.body).length > 0 
        ? req.body 
        : {
            name: "Test Prospect",
            phone: "+919740018911",
            service: "Personal Training Consultation",
            source: "Test Simulation from Developer Panel",
            timestamp: new Date().toISOString()
          };

      const result = await addWebhookEventToFirestore({
        source: req.body?.source || "test_simulation",
        eventType: req.body?.eventType || "simulation_ping",
        payload: testData,
        status: "verified_test",
        ip: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1",
        userAgent: req.headers["user-agent"] || "Test Suite",
        receivedAt: new Date().toISOString()
      });

      res.json({
        success: true,
        message: "Test webhook event dispatched and recorded in Firestore successfully",
        eventId: result.id,
        data: testData
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Recent Webhook events reader
  app.get("/api/webhook/events", async (req, res) => {
    try {
      const limitCount = parseInt(req.query.limit as string) || 20;
      const limitSafe = Math.min(Math.max(limitCount, 1), 100);
      let events = await getRecentWebhookEvents(limitSafe);
      // Payloads contain lead PII (names, phone numbers, WhatsApp messages). Only return them
      // when the caller presents the admin key; everyone else gets a redacted summary.
      const adminKey = process.env.ADMIN_API_KEY;
      const isAdmin = !!adminKey && req.headers["x-admin-key"] === adminKey;
      if (!isAdmin) {
        events = events.map((ev: any) => ({
          id: ev.id,
          source: ev.source,
          eventType: ev.eventType,
          status: ev.status,
          receivedAt: ev.receivedAt,
        }));
      }
      res.json({ success: true, count: events.length, events });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message, events: [] });
    }
  });

  // ==========================================
  // SEO & LEGACY 301 REDIRECTS (WIX TO REACT MIGRATION)
  // ==========================================
  // NOTE: only legacy Wix URLs that no longer exist as real pages belong here.
  // Do NOT add paths that App.tsx serves itself (e.g. /personal-training-kengeri, /weight-loss-training-kengeri,
  // /bodybuilding-gym-kengeri, /strength-training-kengeri, /body-transformations, /gym-services-kengeri,
  // /contact-gym-kengeri) - redirecting them makes those pages unreachable and drops them from Google.
  const wixRedirects: Record<string, string> = {
    "/book-online": "/contact",
    "/services-4": "/training",
    "/join-us": "/contact",
    "/booking-services-sitemap.xml": "/sitemap.xml",
    "/store-products-sitemap.xml": "/sitemap.xml",
    "/pricing-plans-sitemap.xml": "/sitemap.xml",
    "/pages-sitemap.xml": "/sitemap.xml",
  };

  Object.entries(wixRedirects).forEach(([oldUrl, newUrl]) => {
    app.get(oldUrl, (_req, res) => {
      res.redirect(301, newUrl);
    });
  });

  // ==========================================
  // VITE DEV / PRODUCTION HANDLERS & ROUTE META INJECTION
  // ==========================================
  const ROUTE_SEO: Record<string, { title: string; desc: string; image: string; url: string }> = {
    "/": {
      title: "Dhanus Gold Fitness — Gym & Personal Training in Kengeri",
      desc: "Transform your fitness with professional training at Dhanus Gold Fitness in Kengeri, Bengaluru. Explore Personal Training, Group Fitness, Women's Fitness, Strength Training, Weight Loss programs and structured fitness guidance.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg",
      url: "https://www.dhanusgoldfitness.com/",
    },
    "/gym-in-kengeri": {
      title: "Best Gym in Kengeri Bengaluru | Dhanus Gold Fitness",
      desc: "Premier 3-floor fitness center in Kengeri Satellite Town, Bengaluru. Certified personal trainers, separate women's cardio zone, imported strength equipment.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845403/_A0A4956_tno3se.jpg",
      url: "https://www.dhanusgoldfitness.com/gym-in-kengeri",
    },
    "/personal-training-kengeri": {
      title: "Personal Training in Kengeri | Dhanus Gold Fitness",
      desc: "1-on-1 personal coaching in Kengeri, Bengaluru. Customized workout plans, body posture correction, and diet guidance from certified master trainers.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845316/_A0A5580_dbtzio.jpg",
      url: "https://www.dhanusgoldfitness.com/personal-training-kengeri",
    },
    "/weight-loss-training-kengeri": {
      title: "Weight Loss & Fat Burn Training in Kengeri | Dhanus Gold Fitness",
      desc: "Structured weight loss & fat reduction programs in Kengeri. High-intensity cardio conditioning, customized caloric plans, and sustainable fat loss results.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg",
      url: "https://www.dhanusgoldfitness.com/weight-loss-training-kengeri",
    },
    "/muscle-building-kengeri": {
      title: "Muscle Building & Strength Training Gym in Kengeri | Dhanus Gold Fitness",
      desc: "Championship-level muscle hypertrophy, powerlifting, and strength training in Kengeri. Heavy dumbbells, Olympic barbells, and bodybuilding coaching.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845390/_A0A4944_djqbto.jpg",
      url: "https://www.dhanusgoldfitness.com/muscle-building-kengeri",
    },
    "/womens-fitness-kengeri": {
      title: "Women's Fitness & Strength Training in Kengeri | Dhanus Gold Fitness",
      desc: "Dedicated women-friendly fitness coaching in Kengeri. Private cardio sections, female transformation coaching, weight loss, and strength conditioning.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg",
      url: "https://www.dhanusgoldfitness.com/womens-fitness-kengeri",
    },
    "/group-fitness": {
      title: "Group Fitness & Functional Training in Kengeri | Dhanus Gold Fitness",
      desc: "High-energy Zumba classes, aerobics, HIIT, and functional group fitness conditioning in Kengeri Satellite Town, Bengaluru.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg",
      url: "https://www.dhanusgoldfitness.com/group-fitness",
    },
    "/nutrition-guidance": {
      title: "Nutrition Guidance & Meal Planning in Kengeri | Dhanus Gold Fitness",
      desc: "Personalized nutrition coaching, macro breakdown, and Indian diet meal planning for fat loss, muscle building, and athletic performance.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845403/_A0A4956_tno3se.jpg",
      url: "https://www.dhanusgoldfitness.com/nutrition-guidance",
    },
    "/reviews": {
      title: "Member Reviews & Testimonials | Dhanus Gold Fitness Kengeri",
      desc: "Read genuine reviews from over 4,000+ members who trained at Dhanus Gold Fitness in Kengeri, Bengaluru. 4.9★ rating on Google.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg",
      url: "https://www.dhanusgoldfitness.com/reviews",
    },
    "/faq": {
      title: "Frequently Asked Questions | Dhanus Gold Fitness Kengeri",
      desc: "Find answers to common questions about Dhanus Gold Fitness in Kengeri. Gym timings, membership fees, personal training packages, and amenities.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg",
      url: "https://www.dhanusgoldfitness.com/faq",
    },
    "/training": {
      title: "Personal Training & Fitness Programs in Kengeri | Dhanus Gold Fitness",
      desc: "Explore personal training, strength training, bodybuilding, fat loss, and customized workout programs at Dhanus Gold Fitness in Kengeri, Bengaluru.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg",
      url: "https://www.dhanusgoldfitness.com/training",
    },
    "/transformations": {
      title: "Gym Transformations in Kengeri | Dhanus Gold Fitness",
      desc: "View real before-and-after member body transformations and success stories achieved at Dhanus Gold Fitness gym in Kengeri, Bengaluru.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845390/_A0A4944_djqbto.jpg",
      url: "https://www.dhanusgoldfitness.com/transformations",
    },
    "/trainers": {
      title: "Personal Trainers in Kengeri | Dhanus Gold Fitness",
      desc: "Meet certified fitness coaches and personal trainers at Dhanus Gold Fitness Kengeri. Expert guidance in bodybuilding, fat loss, and strength training.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845316/_A0A5580_dbtzio.jpg",
      url: "https://www.dhanusgoldfitness.com/trainers",
    },
    "/about": {
      title: "About Dhanus Gold Fitness | Gym in Kengeri",
      desc: "Learn about Dhanus Gold Fitness in Kengeri, Bengaluru. 9+ years of service, 4,000+ clients trained, and state-of-the-art three-floor training facility.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg",
      url: "https://www.dhanusgoldfitness.com/about",
    },
    "/contact": {
      title: "Contact Dhanus Gold Fitness | Kengeri Bengaluru",
      desc: "Contact Dhanus Gold Fitness at Hoysala Circle, Kengeri Satellite Town, Bengaluru. Call +91 9740018911 or visit for membership inquiries.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg",
      url: "https://www.dhanusgoldfitness.com/contact",
    },
    "/contact-kengeri": {
      title: "Contact Dhanus Gold Fitness | Gym in Kengeri Bengaluru",
      desc: "Contact Dhanus Gold Fitness at Hoysala Circle, Kengeri Satellite Town, Bengaluru. Call +91 9740018911 or visit for membership inquiries.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg",
      url: "https://www.dhanusgoldfitness.com/contact-kengeri",
    },
    "/privacy-policy": {
      title: "Privacy Policy | Dhanus Gold Fitness Kengeri Bengaluru",
      desc: "Official privacy policy and user data protection protocols for Dhanus Gold Fitness in Kengeri Satellite Town, Bengaluru.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png",
      url: "https://www.dhanusgoldfitness.com/privacy-policy",
    },
    "/integrations": {
      title: "Webhooks & API Integrations Hub | Dhanus Gold Fitness",
      desc: "Webhook endpoints, Meta lead ads integration, WhatsApp API callback configuration, and Firestore data pipelines.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png",
      url: "https://www.dhanusgoldfitness.com/integrations",
    },
    "/locator": {
      title: "Store Locator Plus & Gym Directions | Dhanus Gold Fitness",
      desc: "Find Dhanus Gold Fitness at Hoysala Circle, Kengeri Satellite Town Bengaluru. Live directions, distance matrix, and Google Maps Locator Plus.",
      image: "https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg",
      url: "https://www.dhanusgoldfitness.com/locator",
    },
  };

  // Paths that alias another page's SEO block (mirrors the aliases in App.tsx)
  const ROUTE_ALIASES: Record<string, string> = {
    "/bodybuilding-gym-kengeri": "/muscle-building-kengeri",
    "/strength-training-kengeri": "/muscle-building-kengeri",
    "/zumba-classes-kengeri": "/group-fitness",
    "/gym-membership-kengeri": "/about",
    "/gym-services-kengeri": "/training",
    "/body-transformations": "/transformations",
    "/contact-gym-kengeri": "/contact",
    "/privacy": "/privacy-policy",
    "/webhooks": "/integrations",
  };
  const NOINDEX_PATHS = new Set(["/login", "/ads-hub", "/integrations", "/webhooks"]);
  const isKnownRoute = (p: string) => {
    const clean = p.length > 1 ? p.replace(/\/+$/, "") : p;
    return !!(ROUTE_SEO[clean] || ROUTE_ALIASES[clean] || NOINDEX_PATHS.has(clean));
  };
  const escAttr = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  const renderMetaHtml = (htmlContent: string, reqPath: string) => {
    const clean = reqPath.length > 1 ? reqPath.replace(/\/+$/, "") : reqPath;
    const known = isKnownRoute(clean);
    const base = ROUTE_SEO[ROUTE_ALIASES[clean] || clean] || ROUTE_SEO["/"];
    const canonicalUrl = known ? (ROUTE_SEO[ROUTE_ALIASES[clean] || clean]?.url || base.url) : base.url;
    const meta = { ...base, title: escAttr(base.title), desc: escAttr(base.desc), url: canonicalUrl };
    let out = htmlContent
      .replace(/<title>.*?<\/title>/, () => `<title>${meta.title}</title>`)
      .replace(/<meta name="description" content=".*?" \/>/, () => `<meta name="description" content="${meta.desc}" />`)
      .replace(/<link rel="canonical" href=".*?" \/>/, () => `<link rel="canonical" href="${meta.url}" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/, () => `<meta property="og:title" content="${meta.title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, () => `<meta property="og:description" content="${meta.desc}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/, () => `<meta property="og:image" content="${meta.image}" />`)
      .replace(/<meta property="og:image:secure_url" content=".*?" \/>/, () => `<meta property="og:image:secure_url" content="${meta.image}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/, () => `<meta property="og:url" content="${meta.url}" />`)
      .replace(/<meta name="twitter:title" content=".*?" \/>/, () => `<meta name="twitter:title" content="${meta.title}" />`)
      .replace(/<meta name="twitter:description" content=".*?" \/>/, () => `<meta name="twitter:description" content="${meta.desc}" />`)
      .replace(/<meta name="twitter:image" content=".*?" \/>/, () => `<meta name="twitter:image" content="${meta.image}" />`);
    // Give crawlers real text in the first response; React replaces it on load.
    if (known && !NOINDEX_PATHS.has(clean)) {
      const shell = buildCrawlerShell(base.title, base.desc, clean);
      out = out.replace('<div id="root"></div>', () => `<div id="root">${shell}</div>`);
    }
    if (NOINDEX_PATHS.has(clean) || !known) {
      out = out.replace(/<meta name="robots" content=".*?" \/>/, () => `<meta name="robots" content="noindex, nofollow" />`);
    }
    return out;
  };

  if (process.env.NODE_ENV !== "production") {
    // Imported lazily so Vite is never bundled into the production / serverless build
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.join(process.cwd(), "index.html");
        let template = fs.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const html = renderMetaHtml(template, req.path);
        res.status(isKnownRoute(req.path) ? 200 : 404).set({ "Content-Type": "text/html; charset=utf-8" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        try {
          const rawHtml = fs.readFileSync(indexPath, "utf-8");
          const injectedHtml = renderMetaHtml(rawHtml, req.path);
          res.status(isKnownRoute(req.path) ? 200 : 404);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.send(injectedHtml);
        } catch (err) {
          res.sendFile(indexPath);
        }
      } else {
        res.sendFile(indexPath);
      }
    });
  }

  return { app, PORT };
}

// On Vercel the app is exported through api/index.ts instead of listening on a port.
if (!process.env.VERCEL) {
  createApp().then(({ app, PORT }) => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}
