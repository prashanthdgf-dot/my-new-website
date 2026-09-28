import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';
import { CONTACT_INFO } from '../data';

interface FAQItemProps {
  key?: React.Key;
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-zinc-900/60 border border-white/5 rounded-xl overflow-hidden transition-colors hover:border-gold-premium/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-0"
      >
        <span className="font-display font-bold text-sm sm:text-base text-white hover:text-gold-premium transition-colors pr-4">
          {question}
        </span>
        <div className="text-gold-premium flex-shrink-0">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 sm:px-6 sm:pb-6 border-t border-white/5 pt-4 bg-zinc-950/40">
          <p className="text-xs sm:text-sm font-sans text-gray-400 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { language, faqs, t } = useLanguage();

  return (
    <section id="faq" className="py-16 lg:py-20 bg-black/40 backdrop-blur-sm relative content-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-gold-premium uppercase font-semibold">
            {t('faqsTag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-3 mb-4">
            {t('faqsTitle')} <span className="text-gradient-gold">{t('faqsTitleGold')}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            {t('faqsSubtitle')}
          </p>
        </ScrollReveal>

        {/* Accordions Group */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05} y={15}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Footer inside FAQ */}
        <ScrollReveal className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500 font-sans">
            {language === 'en' ? (
              <>
                Have another query not listed above? Just shoot us a direct ping!{' '}
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hi%20Dhanus%20Gold%20Fitness%2C%20I%20have%20a%20question%20regarding%20the%20Kengeri%20gym...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-premium hover:underline font-bold"
                >
                  Ask on WhatsApp →
                </a>
              </>
            ) : (
              <>
                ಮೇಲೆ ಪಟ್ಟಿ ಮಾಡದ ಇನ್ಯಾವುದೇ ಪ್ರಶ್ನೆ ಇದೆಯೇ? ನಮಗೆ ನೇರವಾಗಿ ಸಂದೇಶ ಕಳುಹಿಸಿ!{' '}
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=ನಮಸ್ಕಾರ%20ಧನುಸ್%20ಗೋಲ್ಡ್%20ಫಿಟ್ನೆಸ್%2C%20ನನಗೆ%20ಕೆಂಗೇರಿ%20ಶಾಖೆಯ%20ಬಗ್ಗೆ%20ಕೆಲವು%20ಪ್ರಶ್ನೆಗಳಿವೆ...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-premium hover:underline font-bold"
                >
                  ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕೇಳಿ →
                </a>
              </>
            )}
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}


