import React, { useEffect } from 'react';
import { Star, Quote, CheckCircle2, MapPin, ExternalLink, MessageSquare, Award } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import { CONTACT_INFO } from '../../data';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function ReviewsPage({ onNavigate }: Props) {
  const { language, testimonials } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Member Reviews & Testimonials | Dhanus Gold Fitness Kengeri'
      : 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು ಮತ್ತು ಅನುಭವಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ';
    const description = language === 'en'
      ? 'Read authentic member reviews and testimonials for Dhanus Gold Fitness in Kengeri Satellite Town. 4.9+ star rating, 600+ transformations, and trusted local community feedback.'
      : 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಬಗ್ಗೆ ನೈಜ ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳನ್ನು ಓದಿ. ೪.೯+ ಸ್ಟಾರ್ ರೇಟಿಂಗ್ ಮತ್ತು ೬೦೦+ ಯಶಸ್ವಿ ಪರಿವರ್ತನೆಗಳು.';

    updateMetaTags(title, description, undefined, '/reviews');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Reviews & Testimonials' : 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು', path: '/reviews' }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Reviews' : 'ವಿಮರ್ಶೆಗಳು', path: '/reviews' }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 fill-[#FFC400] text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'AUTHENTIC COMMUNITY FEEDBACK' : 'ನೈಜ ಸಮುದಾಯದ ವಿಮರ್ಶೆಗಳು'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Member Reviews & Testimonials — ' : 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Read real stories and feedback from members training at our Kengeri Satellite Town gym. From busy tech employees to students and fitness competitors, see why our community trusts us.'
                : 'ಕೆಂಗೇರಿ ಉಪನಗರದ ನಮ್ಮ ಜಿಮ್‌ನಲ್ಲಿ ತರಬೇತಿ ಪಡೆಯುತ್ತಿರುವ ಸದಸ್ಯರ ನೈಜ ಅನುಭವಗಳನ್ನು ಓದಿ.'}
            </p>

            {/* Google Rating badge */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-[#0E0E0E] border border-zinc-800 px-5 py-2.5 rounded-2xl">
                <div className="flex text-[#FFC400]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC400] text-[#FFC400]" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-white">4.9 / 5.0 Rating</span>
              </div>

              <a
                href={CONTACT_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-750 hover:border-[#FFC400] text-xs font-mono font-bold text-[#FFC400] uppercase rounded-2xl transition-colors"
              >
                <span>{language === 'en' ? 'Write a Google Review' : 'ಗೂಗಲ್ ವಿಮರ್ಶೆ ಬರೆಯಿರಿ'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id || idx}
                className="relative bg-[#0A0A0A] border border-zinc-850 hover:border-[#FFC400]/40 p-7 sm:p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between shadow-2xl group"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-zinc-850 group-hover:text-[#FFC400]/10 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFC400] text-[#FFC400]" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed italic mb-8">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-850 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#FFC400]/30 bg-zinc-900 shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name || 'DGF Member'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-display font-black text-white truncate">
                        {testimonial.name || 'Verified Member'}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                    </div>
                    <p className="text-xs font-sans text-[#FFC400] font-medium truncate mt-0.5">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono mt-0.5">
                      <MapPin className="w-3 h-3 text-[#FFC400] shrink-0" />
                      <span className="truncate">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? 'Experience the Gold Standard for Yourself' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್‌ನ ಶ್ರೇಷ್ಠತೆಯನ್ನು ಅನುಭವಿಸಿ'}
          subtitle={language === 'en' ? 'Visit our facility at Hoysala Circle, Kengeri Satellite Town.' : 'ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿರುವ ನಮ್ಮ ಜಿಮ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
