import { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { updateMetaTags } from '../lib/seo';
import ScrollReveal from '../components/ScrollReveal';
import TransformationGallery from '../components/TransformationGallery';

export default function TransformationsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    updateMetaTags(
      language === 'en' ? 'Gym Transformations in Kengeri | Dhanus Gold Fitness' : 'ದೇಹ ಪರಿವರ್ತನೆಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ',
      language === 'en' 
        ? 'View real before-and-after member body transformations and success stories achieved at Dhanus Gold Fitness gym in Kengeri, Bengaluru.'
        : 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನಲ್ಲಿ ಸಾಧಿಸಿದ ನೈಜ ಸದಸ್ಯರ ದೇಹ ಪರಿವರ್ತನೆಗಳು ಮತ್ತು ಯಶಸ್ಸಿನ ಕಥೆಗಳನ್ನು ನೋಡಿ.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845390/_A0A4944_djqbto.jpg',
      '/transformations'
    );
  }, [language]);

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Trophy className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {t('transfSmallTitle')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'CLIENT EVOLUTION' : 'ನಮ್ಮ ಸದಸ್ಯರ'}{' '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'HISTORIES' : 'ಸಾಧನೆಗಳು'}
              </span>
            </h1>
            <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Real results from real people. Our members commit to the discipline, and we provide the scientific roadmap to physical greatness.' 
                : 'ನೈಜ ಜನರ ನೈಜ ಫಲಿತಾಂಶಗಳು. ನಮ್ಮ ಸದಸ್ಯರು ಶಿಸ್ತಿನಿಂದ ಕೆಲಸ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ನಾವು ಅವರಿಗೆ ದೈಹಿಕ ಶ್ರೇಷ್ಠತೆಯ ವೈಜ್ಞಾನಿಕ ಮಾರ್ಗಸೂಚಿಯನ್ನು ನೀಡುತ್ತೇವೆ.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Custom Transformation Component */}
        <ScrollReveal delay={0.2}>
          <div className="mb-24">
            <TransformationGallery />
          </div>
        </ScrollReveal>

        {/* Success CTA */}
        <div className="bg-[#0B0B0B] border border-zinc-900 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-center gap-8 mb-20 max-w-5xl mx-auto shadow-2xl">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="font-display font-black uppercase text-xl sm:text-2xl text-white leading-tight">
              {language === 'en' ? 'WANT TO BE THE NEXT SUCCESS STORY?' : 'ನಿಮ್ಮ ಬದಲಾವಣೆಯ ಪಯಣ ಪ್ರಾರಂಭಿಸಬೇಕೇ?'}
            </h3>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto lg:mx-0">
              {language === 'en' ? 'Our certified physical specialists customize everything to align with your personal goals.' : 'ನಮ್ಮ ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಫಿಟ್‌ನೆಸ್ ಗುರಿಗಳಿಗೆ ತಕ್ಕಂತೆ ಯೋಜನೆ ರೂಪಿಸುತ್ತಾರೆ.'}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('/contact')}
            className="px-8 py-4 bg-gradient-gold text-black font-sans font-black text-sm rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FFC400]/10 uppercase tracking-widest shrink-0 cursor-pointer"
          >
            {language === 'en' ? 'Book Transformation Session' : 'ಪರಿವರ್ತನಾ ತರಬೇತಿ ಬುಕ್ ಮಾಡಿ'}
          </button>
        </div>
      </div>
    </div>
  );
}

export { TransformationsPage };
