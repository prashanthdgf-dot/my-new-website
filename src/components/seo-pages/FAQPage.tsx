import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Phone, MapPin, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import { CONTACT_INFO } from '../../data';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function FAQPage({ onNavigate }: Props) {
  const { language, faqs } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const title = language === 'en'
      ? 'Frequently Asked Questions | Dhanus Gold Fitness Kengeri'
      : 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಉತ್ತರಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ';
    const description = language === 'en'
      ? 'Find answers to common questions about Dhanus Gold Fitness in Kengeri. Gym timings, membership fees, personal training packages, women cardio areas, and facilities.'
      : 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ. ಜಿಮ್ ಸಮಯ, ಸದಸ್ಯತ್ವ ಶುಲ್ಕ, ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಮತ್ತು ಸೌಲಭ್ಯಗಳು.';

    updateMetaTags(title, description, undefined, '/faq');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'FAQ' : 'ಪ್ರಶ್ನೋತ್ತರಗಳು', path: '/faq' }
    ]);
    setFaqSchema(faqs);
  }, [language, faqs]);

  const breadcrumbs = [
    { name: language === 'en' ? 'FAQ' : 'ಪ್ರಶ್ನೋತ್ತರಗಳು', path: '/faq' }
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'FREQUENTLY ASKED QUESTIONS' : 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Everything You Need To Know — ' : 'ನೀವು ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಎಲ್ಲ ಮಾಹಿತಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold' : 'ಧನುಸ್ ಗೋಲ್ಡ್'}
              </span>
            </h1>

            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {language === 'en'
                ? 'Get clarity on gym timings, membership packages, personal coaching, amenities, and location near Hoysala Circle, Kengeri Satellite Town.'
                : 'ಜಿಮ್ ಸಮಯ, ಸದಸ್ಯತ್ವ ಪ್ಯಾಕೇಜ್‌ಗಳು, ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಮತ್ತು ಸೌಲಭ್ಯಗಳ ಬಗ್ಗೆ ವಿವರವಾದ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-4 mb-20">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0A0A0A] border border-zinc-850 hover:border-zinc-700 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h2 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wide">
                      {faq.question}
                    </h2>
                    <div className={`w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-[#FFC400] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FFC400]/20' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed border-t border-zinc-900">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? 'Have a Specific Question? Speak with Us' : 'ಹೆಚ್ಚಿನ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ'}
          subtitle={language === 'en' ? 'Call +91 97400 18911 or visit our desk at Hoysala Circle, Kengeri Satellite Town.' : 'ಕರೆ ಮಾಡಿ +91 97400 18911 ಅಥವಾ ಹೊಯ್ಸಳ ಸರ್ಕಲ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
