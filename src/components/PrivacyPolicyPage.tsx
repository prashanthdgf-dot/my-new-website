import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  Database, 
  MessageSquare,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import { updateMetaTags } from '../lib/seo';
import { WhatsAppLogo, InstagramLogo } from './SocialIcons';

interface PrivacyPolicyPageProps {
  onNavigate?: (path: string) => void;
}

export default function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateMetaTags(
      'Privacy Policy | Dhanus Gold Fitness Kengeri Bangalore',
      'Read the official privacy policy and data security practices for Dhanus Gold Fitness in Kengeri Satellite Town, Bengaluru.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
      '/privacy-policy'
    );
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div id="privacy-policy-page" className="min-h-screen bg-black text-gray-200 pt-28 pb-20 selection:bg-[#FFC400] selection:text-black">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#FFC400]/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <a
            href="/"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#FFC400] hover:text-white transition-colors bg-zinc-900/80 px-3.5 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Back to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'}</span>
          </a>
        </div>

        {/* Header Title */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#FFC400] uppercase mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Policy Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight uppercase">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
            Dhanus Gold Fitness, 3rd & 4th Floor, Hoysala Circle, Kengeri Satellite Town, Bengaluru 560060.
            <br />
            <span className="font-mono text-xs text-zinc-500">Effective Date: January 1, 2024 • Last Updated: March 2026</span>
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-10 text-sm font-sans leading-relaxed text-zinc-300">

          {/* Section 1: Introduction */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">01.</span>
              Introduction & Scope
            </h2>
            <p>
              Dhanus Gold Fitness (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to respecting and protecting the privacy of our website visitors, gym members, personal training clients, and trial pass applicants. This Privacy Policy sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed and stored.
            </p>
            <p>
              By accessing our website (<a href={CONTACT_INFO.websiteUrl} className="text-[#FFC400] underline">{CONTACT_INFO.websiteUrl}</a>), submitting free trial inquiries, calculating BMI, or interacting with our WhatsApp and social channels, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">02.</span>
              Information We Collect
            </h2>
            <p>We may collect and process the following categories of information:</p>
            <ul className="space-y-2.5 ml-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span><strong>Contact & Identity Data:</strong> Full Name, Mobile Phone Number, and Email Address submitted via consultation or trial pass forms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span><strong>Fitness & Health Preferences:</strong> Preferred workout time slots, personal fitness targets (e.g. weight loss, bodybuilding, strength), and gym membership tier interests.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span><strong>Anthropometric Data (BMI Calculator):</strong> Gender, age, height, weight, calculated Body Mass Index, and target weight goals.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <span><strong>Technical & Ingestion Logs:</strong> IP address, browser type, referral URLs, and webhook event metadata transmitted by integrated channels (such as WhatsApp Cloud API or Meta Lead Forms).</span>
              </li>
            </ul>
          </section>

          {/* Section 3: How We Use Your Data */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">03.</span>
              How We Use Your Data
            </h2>
            <p>Your information is used strictly to provide you with the best gym experience in Kengeri:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">Trial Pass Verification</h4>
                <p className="text-xs text-zinc-400">Scheduling your free workout trial session with our certified trainers.</p>
              </div>
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">Direct Consultation</h4>
                <p className="text-xs text-zinc-400">Replying to your fitness inquiries via WhatsApp or phone call.</p>
              </div>
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">Fitness Recommendations</h4>
                <p className="text-xs text-zinc-400">Customizing diet plans, workout splits, and training packages.</p>
              </div>
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                <h4 className="font-bold text-white text-xs mb-1">Safety & Operations</h4>
                <p className="text-xs text-zinc-400">Ensuring safe physical exercise and maintaining facility member security.</p>
              </div>
            </div>
          </section>

          {/* Section 4: WhatsApp & Communication Consent */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-[#FFC400]/20 space-y-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl" />
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">04.</span>
              Communication Consent (WhatsApp, SMS & Phone)
            </h2>
            <p>
              When you submit your phone number via our website consultation forms, WhatsApp floating button, or trial pass application, you expressly consent to receive direct communications from Dhanus Gold Fitness staff via:
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg font-mono">
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Business: +91 97400 18911
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-white/10 text-white text-xs rounded-lg font-mono">
                <Phone className="w-3.5 h-3.5 text-[#FFC400]" /> Voice Call & SMS: +91 97400 18911
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              We do not sell, rent, or lease your phone number or email to third-party telemarketers. You may opt out of promotional messages at any time by replying &ldquo;STOP&rdquo; on WhatsApp or emailing us at {CONTACT_INFO.email}.
            </p>
          </section>

          {/* Section 5: Data Storage & Security */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">05.</span>
              Data Storage & Google Cloud Security
            </h2>
            <p>
              Your inquiries, trial pass registrations, and webhook payloads are stored securely in Google Firebase Firestore databases (Project: <code className="text-xs font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-[#FFC400]">linen-eon-58gvj</code>). All data transfers use Transport Layer Security (TLS/HTTPS) encryption in transit and AES-256 encryption at rest.
            </p>
          </section>

          {/* Section 6: Official Channels & Permanent Links */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">06.</span>
              Verified Permanent Links & Social Handles
            </h2>
            <p>
              For your safety against imposter accounts, please verify our genuine contact and social touchpoints:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a 
                href={CONTACT_INFO.permanentLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-[#E1306C]/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramLogo className="w-5 h-5" />
                  <span className="text-xs font-bold text-white group-hover:text-[#E1306C] transition-colors">
                    Official Instagram
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              </a>

              <a 
                href={CONTACT_INFO.permanentLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-[#25D366]/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppLogo className="w-5 h-5" />
                  <span className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">
                    Official WhatsApp
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              </a>

              <a 
                href={CONTACT_INFO.phoneHref}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-[#FFC400]/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FFC400]" />
                  <span className="text-xs font-bold text-white group-hover:text-[#FFC400] transition-colors">
                    Direct Call (+91 97400 18911)
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              </a>

              <a 
                href={CONTACT_INFO.social.map}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 border border-white/10 hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    Google Maps Profile
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              </a>
            </div>
          </section>

          {/* Section 7: Grievance Officer & Contact */}
          <section className="bg-zinc-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <span className="text-[#FFC400] font-mono text-base">07.</span>
              Grievance & Privacy Inquiries
            </h2>
            <p>
              If you have any questions or complaints regarding this Privacy Policy, please contact our administrative desk:
            </p>
            <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/10 space-y-2 text-xs font-sans">
              <p className="text-white font-bold">Dhanus Gold Fitness Desk</p>
              <p className="text-zinc-400">{CONTACT_INFO.address}</p>
              <p className="text-zinc-300">
                Email:{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#FFC400] hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="text-zinc-300">
                Phone:{' '}
                <a href={CONTACT_INFO.phoneHref} className="text-[#FFC400] hover:underline">
                  {CONTACT_INFO.phoneNumber}
                </a>
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
