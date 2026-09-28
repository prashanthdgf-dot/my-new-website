import React, { useEffect } from 'react';
import { Flame, CheckCircle2, HeartPulse, Scale, Apple, TrendingDown, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function WeightLossPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Weight Loss Training in Kengeri | Dhanus Gold Fitness'
      : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್';
    const description = language === 'en'
      ? 'Looking for weight loss training in Kengeri? Dhanus Gold Fitness offers structured fat loss programs, HIIT cardio, metabolic resistance workouts, and custom nutrition plans.'
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ತೂಕ ಇಳಿಕೆ ತರಬೇತಿಯನ್ನು ಹುಡುಕುತ್ತಿದ್ದೀರಾ? ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್‌ನಲ್ಲಿ ಸುಸ್ಥಿರ ಕೊಬ್ಬು ಇಳಿಕೆ ಮತ್ತು ಡಯಟ್ ಯೋಜನೆಗಳು ಲಭ್ಯವಿದೆ.';

    updateMetaTags(title, description, undefined, '/weight-loss-training-kengeri');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Weight Loss Training' : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ', path: '/weight-loss-training-kengeri' }
    ]);
    setFaqSchema([
      {
        question: 'How fast can I lose weight at Dhanus Gold Fitness Kengeri?',
        answer: 'Our certified weight loss programs target healthy, sustainable fat reduction of 2 to 4 kg per month while preserving lean muscle mass through metabolic resistance training.'
      },
      {
        question: 'Do I need strict crash dieting for weight loss?',
        answer: 'No. We create balanced Indian nutrition plans focusing on calorie deficits, proper protein intake, and high-energy whole foods without starvation.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Weight Loss Training' : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ', path: '/weight-loss-training-kengeri' }
  ];

  const benefits = [
    {
      icon: <Flame className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Metabolic Resistance Circuits' : 'ಮೆಟಬಾಲಿಕ್ ರೆಸಿಸ್ಟೆನ್ಸ್ ಸರ್ಕ್ಯೂಟ್ಸ್',
      desc: language === 'en' ? 'Combine weights and dynamic movements to trigger the afterburn effect (EPOC) for all-day calorie burning.' : 'ದಿನವಿಡೀ ಕ್ಯಾಲೊರಿಗಳನ್ನು ಕರಗಿಸಲು ವೇಯ್ಟ್ಸ್ ಮತ್ತು ಕಾರ್ಡಿಯೋ ಸಂಯೋಜನೆ.'
    },
    {
      icon: <Apple className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Custom Indian Diet Mapping' : 'ಭಾರತೀಯ ಆಹಾರ ಯೋಜನೆ',
      desc: language === 'en' ? 'Practical macro planning adapted to local home-cooked South Indian and North Indian food styles.' : 'ಮನೆಯಲ್ಲಿ ಮಾಡುವ ಆಹಾರ ಪದ್ಧತಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವ ಡಯಟ್ ಪ್ಲಾನ್.'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Cardio & Stamina Conditioning' : 'ಕಾರ್ಡಿಯೋ ಮತ್ತು ಸ್ಟ್ಯಾಮಿನಾ',
      desc: language === 'en' ? 'Dedicated commercial cardio zones with treadmills, spin bikes, and cross-trainers.' : 'ವಿಶಾಲವಾದ ಕಾರ್ಡಿಯೋ ವಿಭಾಗದಲ್ಲಿ ಸ್ಟ್ಯಾಮಿನಾ ಹೆಚ್ಚಿಸುವ ತರಬೇತಿ.'
    },
    {
      icon: <Scale className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Weekly Body Composition Audits' : 'ವಾರದ ಪ್ರಗತಿ ಪರಿಶೀಲನೆ',
      desc: language === 'en' ? 'Track fat loss vs muscle retention with comprehensive body fat and waistline assessments.' : 'ಕೊಬ್ಬು ಇಳಿಕೆ ಮತ್ತು ಸ್ನಾಯು ರಕ್ಷಣೆಯ ನಿಖರವಾದ ಟ್ರ್ಯಾಕಿಂಗ್.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        {/* Hero */}
        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Flame className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'SUSTAINABLE FAT LOSS & CONDITIONING' : 'ಸುಸ್ಥಿರ ಕೊಬ್ಬು ಇಳಿಕೆ ಮತ್ತು ಕಂಡೀಷನಿಂಗ್'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Weight Loss Training in Kengeri — ' : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ ಕೆಂಗೇರಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Say goodbye to extreme starvation diets and endless treadmill marathons. Our scientific weight loss programs in Kengeri focus on building metabolic strength, sustainable calorie deficits, and toned physique transformations.'
                : 'ಅತಿಯಾದ ಉಪವಾಸವಿಲ್ಲದೆ ವೈಜ್ಞಾನಿಕ ರೀತಿಯಲ್ಲಿ ತೂಕ ಇಳಿಸಿಕೊಳ್ಳಿ. ನಮ್ಮ ಮೆಟಬಾಲಿಕ್ ವರ್ಕೌಟ್‌ಗಳು ಮತ್ತು ಆಹಾರ ಯೋಜನೆಗಳು ನಿಮಗೆ ಶಾಶ್ವತ ಫಲಿತಾಂಶ ನೀಡುತ್ತವೆ.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h2 className="text-lg font-display font-bold uppercase text-white mb-2">{b.title}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{b.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Transformation link */}
        <ScrollReveal>
          <div className="bg-[#0A0A0A] border border-zinc-900 rounded-3xl p-6 sm:p-10 mb-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#FFC400] uppercase tracking-widest block">
                {language === 'en' ? 'REAL CLIENT RESULTS' : 'ನೈಜ ಸದಸ್ಯರ ಫಲಿತಾಂಶಗಳು'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                {language === 'en' ? 'Over 600+ Verified Transformations' : '೬೦೦+ ಕ್ಕೂ ಹೆಚ್ಚು ಪರಿಶೀಲಿಸಿದ ಪರಿವರ್ತನೆಗಳು'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                {language === 'en'
                  ? 'Explore real before-and-after photo transformations from college students, working parents, and tech professionals in Kengeri Satellite Town.'
                  : 'ಕೆಂಗೇರಿ ಉಪನಗರದ ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಉದ್ಯೋಗಿಗಳ ನೈಜ ಫೋಟೋ ಪರಿವರ್ತನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/transformations')}
              className="px-6 py-3.5 bg-gradient-gold text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-transform shrink-0 cursor-pointer"
            >
              {language === 'en' ? 'View Transformation Gallery →' : 'ಪರಿವರ್ತನೆಗಳ ಗ್ಯಾಲರಿ ನೋಡಿ →'}
            </button>
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? 'Start Your Weight Loss Transformation in Kengeri' : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ನಿಮ್ಮ ತೂಕ ಇಳಿಕೆಯ ಪಯಣ ಆರಂಭಿಸಿ'}
          subtitle={language === 'en' ? 'Consult with our fat loss specialists at Hoysala Circle, Kengeri Satellite Town.' : 'ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿರುವ ನಮ್ಮ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
