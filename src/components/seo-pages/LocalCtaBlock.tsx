import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../../data';
import { useLanguage } from '../../LanguageContext';

interface LocalCtaBlockProps {
  title?: string;
  subtitle?: string;
  onNavigate?: (path: string) => void;
}

export default function LocalCtaBlock({
  title,
  subtitle,
  onNavigate
}: LocalCtaBlockProps) {
  const { language } = useLanguage();

  const heading = title || (language === 'en' ? 'Start Your Fitness Journey at Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ');
  const sub = subtitle || (language === 'en' 
    ? 'Visit our 3-floor facility at Hoysala Circle, Kengeri Satellite Town, or consult directly with our certified head coaches.' 
    : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿರುವ ನಮ್ಮ ಮೂರು ಅಂತಸ್ತಿನ ಜಿಮ್‌ಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ನಮ್ಮ ತರಬೇತುದಾರರೊಂದಿಗೆ ಮಾತನಾಡಿ.');

  return (
    <div className="my-16 bg-gradient-to-br from-zinc-950 via-[#0A0A0A] to-zinc-950 border border-[#FFC400]/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#FFC400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/30 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFC400]" />
            <span className="text-[10px] font-mono font-bold text-[#FFC400] uppercase tracking-wider">
              {language === 'en' ? 'Direct Gym Coach Consultation' : 'ನೇರ ಕೋಚ್ ಸಮಾಲೋಚನೆ'}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
            {heading}
          </h3>

          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
            {sub}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>Hoysala Circle, Kengeri Satellite Town</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>Mon–Sat: 5:30 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-gold text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FFC400]/15 hover:scale-[1.02] transition-transform"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'en' ? 'WhatsApp Us Directly' : 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ'}</span>
          </a>

          <a
            href={CONTACT_INFO.phoneHref}
            className="px-6 py-3.5 bg-zinc-900 border border-zinc-750 hover:border-[#FFC400]/50 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-850 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#FFC400]" />
            <span>Call +91 97400 18911</span>
          </a>

          <a
            href={CONTACT_INFO.googleBusinessProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black/60 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FFC400]" />
            <span>{language === 'en' ? 'Get Google Map Directions' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ ಮಾರ್ಗ'}</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
