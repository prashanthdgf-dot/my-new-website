import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Webhook, 
  Copy, 
  Check, 
  Send, 
  ArrowLeft, 
  ExternalLink, 
  Phone, 
  ShieldCheck, 
  RefreshCw, 
  Terminal, 
  Share2, 
  FileText,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import { updateMetaTags } from '../lib/seo';
import { WhatsAppLogo, InstagramLogo } from './SocialIcons';
import { getRecentWebhookEvents } from '../lib/firebase';

interface IntegrationsDashboardProps {
  onNavigate?: (path: string) => void;
}

export default function IntegrationsDashboard({ onNavigate }: IntegrationsDashboardProps) {
  const { language } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testSending, setTestSending] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Dynamic origin calculation
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.dhanusgoldfitness.com';
  const callbackUrl = `${origin}/api/callback`;
  const webhookUrl = `${origin}/api/webhook`;
  const verifyToken = '<your WEBHOOK_VERIFY_TOKEN from the server environment>';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateMetaTags(
      'Integrations & Webhook Hub | Dhanus Gold Fitness',
      'Manage permanent website callback URLs, webhooks, Meta leads, WhatsApp integration, and external touchpoints.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
      '/integrations'
    );
    loadRecentEvents();
  }, []);

  const loadRecentEvents = async () => {
    setEventsLoading(true);
    try {
      // First try backend API endpoint
      const res = await fetch('/api/webhook/events?limit=15');
      if (res.ok) {
        const data = await res.json();
        if (data.events && data.events.length > 0) {
          setEvents(data.events);
          setEventsLoading(false);
          return;
        }
      }
      // Fallback directly to client-side Firestore query
      const clientEvents = await getRecentWebhookEvents(15);
      setEvents(clientEvents);
    } catch (e) {
      console.warn('Could not fetch events via API, reading direct:', e);
      const clientEvents = await getRecentWebhookEvents(15);
      setEvents(clientEvents);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSendTestWebhook = async () => {
    setTestSending(true);
    setTestResponse(null);
    try {
      const payload = {
        source: 'dashboard_tester',
        eventType: 'lead_inquiry_simulation',
        leadName: 'Vinay Kumar',
        phone: '+919740018911',
        program: 'Weight Loss Training & Personal Consultation',
        slot: 'Morning 6:30 AM',
        timestamp: new Date().toISOString(),
      };

      const res = await fetch('/api/webhook/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-source': 'integrations_dashboard'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setTestResponse({ status: res.status, data });
      // Refresh event list
      setTimeout(() => loadRecentEvents(), 500);
    } catch (err: any) {
      setTestResponse({ status: 'error', message: err.message });
    } finally {
      setTestSending(false);
    }
  };

  const integrationLinks = [
    {
      id: 'callback',
      title: 'Permanent Website Callback URL',
      description: 'Used for Meta WhatsApp Cloud API webhooks, OAuth callbacks, and external service handshake verification.',
      url: callbackUrl,
      type: 'endpoint',
      badge: 'GET / POST Handshake'
    },
    {
      id: 'webhook',
      title: 'Permanent Webhook Endpoint',
      description: 'Direct ingestion endpoint for Meta Lead Ads, Zapier, Make, and CRM pipelines.',
      url: webhookUrl,
      type: 'endpoint',
      badge: 'POST Ingestion'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy Link',
      description: 'Official data protection and privacy policy required by Meta, Google, and WhatsApp Cloud API.',
      url: `${origin}/privacy-policy`,
      type: 'page',
      badge: 'DPDP & Legal'
    },
    {
      id: 'instagram',
      title: 'Permanent Instagram Link',
      description: 'Verified official Instagram profile handle for brand ads and direct messaging.',
      url: CONTACT_INFO.permanentLinks.instagram,
      type: 'social',
      badge: '@dhanus_goldfitness',
      icon: <InstagramLogo className="w-5 h-5" />
    },
    {
      id: 'whatsapp',
      title: 'Permanent WhatsApp Link',
      description: 'Direct click-to-chat WhatsApp link formatted with Kengeri gym inquiries.',
      url: CONTACT_INFO.permanentLinks.whatsapp,
      type: 'social',
      badge: '+91 97400 18911',
      icon: <WhatsAppLogo className="w-5 h-5" />
    },
    {
      id: 'call',
      title: 'Permanent Call (tel:) Link',
      description: 'Native telephony URI triggering immediate phone dialer with gym reception.',
      url: CONTACT_INFO.permanentLinks.call,
      type: 'tel',
      badge: 'tel:+919740018911',
      icon: <Phone className="w-4 h-4 text-[#FFC400]" />
    }
  ];

  return (
    <motion.div
      id="integrations-dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-black text-gray-200 pt-28 pb-20 selection:bg-[#FFC400] selection:text-black"
    >
      {/* Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#FFC400]/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#FFC400] uppercase mb-2">
              <Zap className="w-4 h-4" />
              <span>Connectivity & API Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Webhook Configuration & Integration Points
            </h1>
            <p className="mt-1 text-sm text-zinc-400 font-sans">
              Permanent callback URLs, verified social handles, Firestore event logging, and lead sync points.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate ? onNavigate('/') : window.location.href = '/'}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gym Site</span>
            </button>
          </div>
        </div>

        {/* 1. Permanent Links & Endpoints Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-black text-white uppercase flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-sm">01.</span>
              Permanent Web Links & API Endpoints
            </h2>
            <span className="text-xs font-mono text-zinc-500">Live & SSL Encrypted</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationLinks.map((item) => (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#FFC400]/40 transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h3 className="text-sm font-display font-black text-white group-hover:text-[#FFC400] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-[#FFC400] border border-[#FFC400]/20">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <input
                    type="text"
                    readOnly
                    value={item.url}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-[#FFC400]"
                  />
                  <button
                    onClick={() => handleCopy(item.url, item.id)}
                    className="shrink-0 p-2 rounded-lg bg-zinc-850 hover:bg-[#FFC400] text-zinc-300 hover:text-black transition-all cursor-pointer"
                    title="Copy to clipboard"
                    aria-label={`Copy ${item.title}`}
                  >
                    {copiedKey === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  {item.url.startsWith('http') && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-lg bg-zinc-850 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Webhook Configuration Guides */}
        <section className="space-y-4">
          <h2 className="text-lg font-display font-black text-white uppercase flex items-center gap-2">
            <span className="text-[#FFC400] font-mono text-sm">02.</span>
            Integration Point Setup Guides
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Meta Lead Ads */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Share2 className="w-4 h-4" />
                <span>Meta Ads (IG & FB Leads)</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect your Facebook Page & Instagram ads to push lead form fills directly to Firestore.
              </p>
              <div className="bg-black/60 p-3 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono">
                <div className="text-zinc-500">Callback URL:</div>
                <div className="text-[#FFC400] break-all">{callbackUrl}</div>
                <div className="text-zinc-500 mt-2">Verify Token:</div>
                <div className="text-white">{verifyToken}</div>
                <div className="text-zinc-500 mt-2">Page Subscription:</div>
                <div className="text-emerald-400">leadgen</div>
              </div>
            </div>

            {/* WhatsApp Cloud API */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#25D366] font-bold text-sm">
                <WhatsAppLogo className="w-4 h-4" />
                <span>WhatsApp Cloud API</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Receive inbound messages, client inquiries, and read receipts from WhatsApp Business API.
              </p>
              <div className="bg-black/60 p-3 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono">
                <div className="text-zinc-500">Webhook URL:</div>
                <div className="text-[#FFC400] break-all">{callbackUrl}</div>
                <div className="text-zinc-500 mt-2">Verify Token:</div>
                <div className="text-white">{verifyToken}</div>
                <div className="text-zinc-500 mt-2">Webhook Fields:</div>
                <div className="text-emerald-400">messages, message_template_status</div>
              </div>
            </div>

            {/* Zapier / Make CRM */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>Zapier / Make / CRM</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Trigger Google Sheets synchronization, email alerts, or SMS gateways on member registration.
              </p>
              <div className="bg-black/60 p-3 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono">
                <div className="text-zinc-500">Method:</div>
                <div className="text-emerald-400">POST (JSON)</div>
                <div className="text-zinc-500 mt-2">Endpoint URL:</div>
                <div className="text-[#FFC400] break-all">{webhookUrl}</div>
                <div className="text-zinc-500 mt-2">Optional Header:</div>
                <div className="text-white">x-webhook-source: zapier</div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Live Webhook Tester & Event Pipeline */}
        <section className="p-6 rounded-2xl bg-zinc-950/90 border border-[#FFC400]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-display font-black text-white uppercase flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#FFC400]" />
                Live Webhook Simulator & Event Log
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Send a sample gym consultation payload to the webhook and verify Firestore database persistence.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadRecentEvents}
                disabled={eventsLoading}
                className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${eventsLoading ? 'animate-spin text-[#FFC400]' : ''}`} />
                <span>Refresh Log</span>
              </button>

              <button
                onClick={handleSendTestWebhook}
                disabled={testSending}
                className="px-4 py-2 bg-gradient-gold hover:bg-yellow-400 text-black font-sans font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testSending ? 'Sending Webhook...' : 'Fire Test Webhook'}</span>
              </button>
            </div>
          </div>

          {/* Test Response Output */}
          {testResponse && (
            <div className="p-4 rounded-xl bg-black/80 border border-[#FFC400]/40 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Test Dispatch Result (Status: {testResponse.status})</span>
              </div>
              <pre className="text-zinc-300 overflow-x-auto text-[11px] p-2 bg-zinc-900/60 rounded">
                {JSON.stringify(testResponse.data, null, 2)}
              </pre>
            </div>
          )}

          {/* Real-time Webhook Events List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider">
              Recent Ingested Events (Firestore Collection: /webhook_events)
            </h3>

            {eventsLoading ? (
              <div className="p-8 text-center text-xs font-mono text-zinc-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#FFC400]" />
                Loading events from Firestore...
              </div>
            ) : events.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-zinc-500 bg-black/40 rounded-xl border border-white/5">
                No webhook events logged yet. Click &ldquo;Fire Test Webhook&rdquo; to send the first event!
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {events.map((ev, idx) => (
                  <div
                    key={ev.id || idx}
                    className="p-3 bg-black/60 rounded-xl border border-white/5 hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-[#FFC400] font-mono text-[10px] font-bold border border-[#FFC400]/30">
                        {ev.source || 'webhook'}
                      </span>
                      <span className="font-bold text-white">
                        {ev.eventType || 'event_received'}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        ID: {ev.id ? ev.id.slice(0, 8) + '...' : 'logged'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                      <span>{ev.receivedAt ? new Date(ev.receivedAt).toLocaleString() : 'Just now'}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">
                        {ev.status || 'received'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. Dynamic Sitemap & Localized SEO Crawler */}
        <section className="p-6 rounded-2xl bg-zinc-950/90 border border-[#FFC400]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FFC400]/10 border border-[#FFC400]/30 text-[#FFC400] text-xs font-mono mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>DYNAMIC ROUTE ENGINE</span>
              </div>
              <h2 className="text-lg font-display font-black text-white uppercase flex items-center gap-2">
                Dynamic Sitemap & Localized SEO Crawler
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Automatically scans <code className="text-[#FFC400]">App.tsx</code> routes, generates localized English and Kannada <code className="text-[#FFC400]">hreflang</code> alternates, and excludes protected routes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-gradient-gold hover:bg-yellow-400 text-black font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>Open /sitemap.xml</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="/sitemap-manifest.json"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-mono text-xs rounded-xl border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <span>JSON Manifest</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-black/60 rounded-xl border border-white/5">
              <div className="text-[10px] uppercase font-mono text-zinc-500">Discovered Routes</div>
              <div className="text-lg font-bold text-white mt-0.5">29</div>
              <div className="text-[10px] text-zinc-400">Parsed from App.tsx</div>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5">
              <div className="text-[10px] uppercase font-mono text-zinc-500">Indexable Pages</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">27</div>
              <div className="text-[10px] text-zinc-400">18 Core + 9 Aliases</div>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5">
              <div className="text-[10px] uppercase font-mono text-zinc-500">Indexed URL Nodes</div>
              <div className="text-lg font-bold text-[#FFC400] mt-0.5">54</div>
              <div className="text-[10px] text-zinc-400">Bilingual (EN + KN)</div>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/5">
              <div className="text-[10px] uppercase font-mono text-zinc-500">Excluded Routes</div>
              <div className="text-lg font-bold text-red-400 mt-0.5">2</div>
              <div className="text-[10px] text-zinc-400">/login & /ads-hub</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/80 border border-white/5 text-xs font-mono space-y-3">
            <div className="text-zinc-400 text-[11px]">
              Terminal commands to generate or verify the dynamic sitemap locally and in CI/CD:
            </div>
            <div className="p-3 bg-zinc-900/80 rounded-lg border border-white/5 flex items-center justify-between gap-2">
              <span className="text-[#FFC400]">npm run generate:sitemap</span>
              <button
                onClick={() => handleCopy('npm run generate:sitemap', 'cli_cmd')}
                className="text-zinc-400 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copiedKey === 'cli_cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
