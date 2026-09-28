import { useEffect } from 'react';
import { Award, Target, Compass, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { updateMetaTags } from '../lib/seo';
import ScrollReveal from '../components/ScrollReveal';

export default function AboutPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    updateMetaTags(
      language === 'en' ? 'About Dhanus Gold Fitness | Gym in Kengeri' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಬಗ್ಗೆ | ಕೆಂಗೇರಿಯ ಪ್ರೀಮಿಯಂ ಜಿಮ್',
      language === 'en' 
        ? 'Learn about Dhanus Gold Fitness in Kengeri, Bengaluru. 9+ years of service, 4,000+ clients trained, and state-of-the-art three-floor training facility.'
        : 'ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಫಿಟ್‌ನೆಸ್ ಕೇಂದ್ರವಾಗುವ ನಮ್ಮ ಪಯಣದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ. ೯+ ವರ್ಷಗಳ ಸೇವೆ ಮತ್ತು ೪,೦೦೦+ ಗ್ರಾಹಕರಿಗೆ ತರಬೇತಿ ನೀಡಲಾಗಿದೆ.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845439/_A0A4988_k33biw.jpg',
      '/about'
    );
  }, [language]);

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <ScrollReveal y={20}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {t('aboutBadge')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {t('aboutTitle')}{' '}
              <span className="text-[#FFC400]">
                {t('aboutTitleGold')}
              </span>
            </h1>
            <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('aboutIntro')}
            </p>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-medium">
              {t('aboutMission')}
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Pillar Layout (Mission, Vision, Values) */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-[#0B0B0B] border border-zinc-900 rounded-2xl p-8 hover:border-[#FFC400]/20 transition-all group">
              <Target className="w-10 h-10 text-[#FFC400] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display font-bold uppercase mb-3 text-white">
                {t('aboutMissionTitle')}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t('aboutMissionText')}
              </p>
            </div>

            <div className="bg-[#0B0B0B] border border-zinc-900 rounded-2xl p-8 hover:border-[#FFC400]/20 transition-all group">
              <Compass className="w-10 h-10 text-[#FFC400] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display font-bold uppercase mb-3 text-white">
                {t('aboutVisionTitle')}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t('aboutVisionText')}
              </p>
            </div>

            <div className="bg-[#0B0B0B] border border-zinc-900 rounded-2xl p-8 hover:border-[#FFC400]/20 transition-all group">
              <Sparkles className="w-10 h-10 text-[#FFC400] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display font-bold uppercase mb-3 text-white">
                {t('aboutPhilosophyTitle')}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t('aboutPhilosophyText')}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Values Grid */}
        <ScrollReveal>
          <div className="mb-24">
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-center mb-12 text-white">
              {t('aboutValuesTitle')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#070707] border border-zinc-900 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#FFC400]/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#FFC400]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase text-white mb-1">{t(`aboutVal${i}` as any)}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{t(`aboutVal${i}Desc` as any)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Premium Facility Detail Card */}
        <ScrollReveal>
          <div className="bg-[#0B0B0B] border border-zinc-900 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-12 mb-20 shadow-2xl">
            <div className="lg:w-1/2 space-y-6">
              <div className="text-xs font-mono font-bold text-[#FFC400] uppercase tracking-widest">
                {language === 'en' ? 'THE KENGERI HEADQUARTERS' : 'ಕೆಂಗೇರಿ ಕೇಂದ್ರ ಕಛೇರಿ'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase leading-tight text-white">
                {language === 'en' ? 'LUXURY GYM LAYOUT' : 'ಐಷಾರಾಮಿ ಜಿಮ್ ವಿನ್ಯಾಸ'}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {language === 'en'
                  ? 'Spreading over premium multi-level floors, our flagship facility is packed with high-end plate loaded machines, professional CrossFit turf tracks, smart bio-feedback cardios, and luxury eucalyptus-infused steam chambers.'
                  : 'ಮಲ್ಟಿ-ಲೆವೆಲ್ ಫ್ಲೋರ್‌ಗಳಲ್ಲಿ ಹರಡಿರುವ ನಮ್ಮ ಪ್ರಮುಖ ಜಿಮ್ ಅತ್ಯುತ್ತಮ ವೇಯ್ಟ್ ಲಿಫ್ಟಿಂಗ್ ಉಪಕರಣಗಳು, ವೃತ್ತಿಪರ ಕ್ರಾಸ್‌ಫಿಟ್ ಟ್ರ್ಯಾಕ್‌ಗಳು ಮತ್ತು ಐಷಾರಾಮಿ ಯೂಕಲಿಪ್ಟಸ್ ಸ್ಟೀಮ್ ಬಾತ್ ಸೌಲಭ್ಯಗಳನ್ನು ಹೊಂದಿದೆ.'}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-black/40 p-4 rounded-xl border border-zinc-900">
                  <span className="text-[#FFC400] font-mono font-bold block text-lg">5,100+ Sq.Ft.</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{language === 'en' ? 'Premium Carpet Area' : 'ಐಷಾರಾಮಿ ತರಬೇತಿ ಏರಿಯಾ'}</span>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-zinc-900">
                  <span className="text-[#FFC400] font-mono font-bold block text-lg">100% Certified</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{language === 'en' ? 'Gold Master Coaches' : 'ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರು'}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full relative aspect-square sm:aspect-video rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845403/_A0A4956_tno3se.jpg" 
                alt="Premium gym floor" 
                width={800}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="text-center py-16 bg-gradient-to-b from-transparent to-[#FFC400]/5 rounded-3xl border border-zinc-900">
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase mb-8 text-white max-w-2xl mx-auto leading-tight">
              {t('aboutCtaTitle')}
            </h2>
            <button 
              onClick={() => onNavigate('/contact')}
              className="px-10 py-4 bg-gradient-gold text-black font-sans font-black rounded-xl text-sm hover:scale-[1.05] transition-all active:scale-95 shadow-xl shadow-[#FFC400]/20 uppercase tracking-widest cursor-pointer"
            >
              {t('aboutCtaBtn')}
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

export { AboutPage };
