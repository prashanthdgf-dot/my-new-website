import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import { CONTACT_INFO } from '../../data';
import ScrollReveal from '../ScrollReveal';
import SocialLinksBar from '../SocialIcons';
import GymGoogleMap from '../GymGoogleMap';

interface Props {
  onNavigate: (path: string) => void;
}

export default function ContactKengeriPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    program: 'Personal Training',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    const title = language === 'en'
      ? 'Contact Dhanus Gold Fitness | Gym in Kengeri Bengaluru'
      : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಸಂಪರ್ಕಿಸಿ | ಕೆಂಗೇರಿ ಬೆಂಗಳೂರು';
    const description = language === 'en'
      ? 'Contact Dhanus Gold Fitness at Hoysala Circle, Kengeri Satellite Town, Bengaluru. Phone: +91 97400 18911. Operating hours, Google Map directions, and membership inquiries.'
      : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಸಂಪರ್ಕ ಮಾಹಿತಿ: ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಉಪನಗರ, ಬೆಂಗಳೂರು. ಮೊಬೈಲ್: +91 97400 18911. ಸದಸ್ಯತ್ವ ವಿಚಾರಣೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.';

    updateMetaTags(title, description, undefined, '/contact-kengeri');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Contact Us' : 'ಸಂಪರ್ಕಿಸಿ', path: '/contact-kengeri' }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Contact' : 'ಸಂಪರ್ಕಿಸಿ', path: '/contact-kengeri' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};
    if (!formState.name.trim()) newErrors.name = language === 'en' ? 'Name is required' : 'ಹೆಸರು ಅಗತ್ಯವಿದೆ';
    if (!formState.phone.trim() || !/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = language === 'en' ? 'Valid 10-digit phone number is required' : '೧೦ ಅಂಕಿಗಳ ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: '', phone: '', email: '', program: 'Personal Training', message: '' });
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'VISIT OUR FLAGSHIP FACILITY' : 'ನಮ್ಮ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Contact Dhanus Gold Fitness — ' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಸಂಪರ್ಕಿಸಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Kengeri, Bengaluru' : 'ಕೆಂಗೇರಿ, ಬೆಂಗಳೂರು'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Have a question about memberships, personal training packages, or visiting our gym? Reach out directly via call, WhatsApp, or drop by our front desk at Hoysala Circle.'
                : 'ಸದಸ್ಯತ್ವದ ಬಗ್ಗೆ ವಿಚಾರಿಸಲು ಅಥವಾ ಜಿಮ್ ನೋಡಲು ನಮ್ಮನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಹೊಯ್ಸಳ ಸರ್ಕಲ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Info Cards Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Phone */}
            <div className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4 text-[#FFC400]">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-display font-bold uppercase text-white mb-1">
                  {language === 'en' ? 'Direct Phone' : 'ನೇರ ಫೋನ್ ಸಂಖ್ಯೆ'}
                </h2>
                <p className="text-xs text-zinc-400 font-sans mb-3">
                  {language === 'en' ? 'Call us directly for instant enquiries.' : 'ತಕ್ಷಣದ ಮಾಹಿತಿಗಾಗಿ ಕರೆ ಮಾಡಿ.'}
                </p>
              </div>
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-sm font-mono font-bold text-[#FFC400] hover:underline block"
              >
                {CONTACT_INFO.phoneNumber}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4 text-[#FFC400]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-display font-bold uppercase text-white mb-1">
                  {language === 'en' ? 'WhatsApp Support' : 'ವಾಟ್ಸಾಪ್ ಬೆಂಬಲ'}
                </h2>
                <p className="text-xs text-zinc-400 font-sans mb-3">
                  {language === 'en' ? 'Chat directly with head fitness coaches.' : 'ಕೋಚ್‌ಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಚಾಟ್ ಮಾಡಿ.'}
                </p>
              </div>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-[#FFC400] hover:underline flex items-center gap-1.5"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Operating Hours */}
            <div className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4 text-[#FFC400]">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-display font-bold uppercase text-white mb-1">
                  {language === 'en' ? 'Operating Hours' : 'ಕಾರ್ಯನಿರ್ವಹಣೆಯ ಸಮಯ'}
                </h2>
                <p className="text-xs text-zinc-300 font-mono space-y-1 mt-2">
                  <span className="block">Mon – Sat: 5:30 AM – 10:00 PM</span>
                  <span className="block text-[#FFC400]">Sun: 5:00 PM – 9:00 PM</span>
                </p>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase mt-3">365-Day Access</span>
            </div>

            {/* Email */}
            <div className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4 text-[#FFC400]">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-display font-bold uppercase text-white mb-1">
                  {language === 'en' ? 'Email Inquiries' : 'ಇಮೇಲ್ ವಿಳಾಸ'}
                </h2>
                <p className="text-xs text-zinc-400 font-sans mb-3">
                  {language === 'en' ? 'Corporate & sponsorship inquiries.' : 'ಕಾರ್ಪೊರೇಟ್ ವಿಚಾರಣೆಗಳು.'}
                </p>
              </div>
              <a
                href={CONTACT_INFO.social.email}
                className="text-xs font-mono font-bold text-[#FFC400] hover:underline truncate block"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

          </div>
        </ScrollReveal>

        {/* Address and Map Box */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            
            {/* Left: Detailed Address Block & Form */}
            <div className="lg:col-span-5 bg-[#0A0A0A] border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#FFC400] uppercase tracking-widest block mb-2">
                  {language === 'en' ? 'OFFICIAL ADDRESS' : 'ಅಧಿಕೃತ ವಿಳಾಸ'}
                </span>
                <h2 className="text-xl font-display font-black text-white uppercase mb-3">
                  Dhanus Gold Fitness Kengeri
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {CONTACT_INFO.address}
                </p>
                <div className="mt-4 p-3 bg-black/60 border border-zinc-850 rounded-xl text-xs text-zinc-400 font-mono">
                  <strong className="text-[#FFC400]">Landmark:</strong> {CONTACT_INFO.landmark}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
                <a
                  href={CONTACT_INFO.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-gradient-gold text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{language === 'en' ? 'Open in Google Maps' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ'}</span>
                </a>
                <a
                  href={CONTACT_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-zinc-900 border border-zinc-800 hover:border-[#FFC400] text-xs font-mono font-bold uppercase text-[#FFC400] rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{language === 'en' ? 'Write a Review on Google' : 'ಗೂಗಲ್‌ನಲ್ಲಿ ವಿಮರ್ಶೆ ಬರೆಯಿರಿ'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Original Social Handles */}
                <div className="pt-3 border-t border-zinc-900">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                    {language === 'en' ? 'Official Social Handles' : 'ಅಧಿಕೃತ ಸಾಮಾಜಿಕ ತಾಣಗಳು'}
                  </span>
                  <SocialLinksBar className="flex flex-wrap items-center gap-2.5" />
                </div>
              </div>
            </div>

            {/* Right: Embedded Google Map & Locator Plus */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl">
              <GymGoogleMap />
            </div>

          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
