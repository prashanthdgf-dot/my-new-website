import React, { useEffect } from 'react';
import { Dumbbell, Trophy, Zap, ShieldCheck, CheckCircle2, ArrowRight, Target, Flame } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function MuscleBuildingPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Muscle Building & Strength Gym in Kengeri | Dhanus Gold Fitness'
      : 'ಸ್ನಾಯು ನಿರ್ಮಾಣ ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ಜಿಮ್ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್';
    const description = language === 'en'
      ? 'Build lean muscle and power at Dhanus Gold Fitness Kengeri. Heavy plate-loaded machines, dumbbell racks up to 50kg, power cages, and bodybuilding coaching by state medalists.'
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಸ್ನಾಯು ನಿರ್ಮಾಣ ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ತರಬೇತಿ. ೫೦ ಕೆಜಿವರೆಗಿನ ಡಂಬ್ಬೆಲ್‌ಗಳು, ಪ್ಲೇಟ್-ಲೋಡೆಡ್ ಯಂತ್ರಗಳು ಮತ್ತು ಚಾಂಪಿಯನ್ ಕೋಚ್‌ಗಳು.';

    updateMetaTags(title, description, undefined, '/muscle-building-kengeri');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Muscle Building & Strength' : 'ಸ್ನಾಯು ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ', path: '/muscle-building-kengeri' }
    ]);
    setFaqSchema([
      {
        question: 'What strength equipment is available for muscle building at Dhanus Gold Fitness?',
        answer: 'We have plate-loaded incline/decline chest presses, dual cable crossovers, Olympic squat racks, deadlift platforms, linear leg presses, and heavy dumbbell racks from 2kg to 50kg.'
      },
      {
        question: 'Is bodybuilding contest prep coaching offered?',
        answer: 'Yes. Our head coaches, including founder Prashanth (Mr. Karnataka Medalist) and Dhananjay, provide comprehensive bodybuilding prep covering posing, peak week, and hypertrophy splits.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Muscle Building & Strength' : 'ಸ್ನಾಯು ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ', path: '/muscle-building-kengeri' }
  ];

  const pillars = [
    {
      icon: <Dumbbell className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Heavy Free Weights & Power Racks' : 'ಭಾರವಾದ ತೂಕಗಳು ಮತ್ತು ಪವರ್ ರಾಕ್ಸ್‌ಗಳು',
      desc: language === 'en' ? 'Rubber hex dumbbells up to 50kg, Olympic barbells, multi-grip pullup stations, and deadlift platforms.' : '೫೦ ಕೆಜಿವರೆಗಿನ ಡಂಬ್ಬೆಲ್‌ಗಳು ಮತ್ತು ಒಲಿಂಪಿಕ್ ಬಾರ್‌ಬೆಲ್‌ಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಫ್ರೀ-ವೇಯ್ಟ್ಸ್ ವಲಯ.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Biomechanical Hypertrophy Machinery' : 'ಬಯೋಮೆಕಾನಿಕಲ್ ಸ್ನಾಯು ಯಂತ್ರಗಳು',
      desc: language === 'en' ? 'Plate-loaded chest presses, hack squats, seated rows, and lat pulldowns engineered for peak contraction.' : 'ಸ್ನಾಯು ಬೆಳವಣಿಗೆಗೆ ಗರಿಷ್ಠ ಆಕುಂಚನ ನೀಡುವ ಪ್ಲೇಟ್-ಲೋಡೆಡ್ ಯಂತ್ರಗಳು.'
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'State Medalist Coaching' : 'ಚಾಂಪಿಯನ್ ಕೋಚ್‌ಗಳ ಮಾರ್ಗದರ್ಶನ',
      desc: language === 'en' ? 'Learn advanced lifting techniques, time-under-tension, and drop-sets directly from competitive medalists.' : 'ಸ್ಪರ್ಧಾತ್ಮಕ ಪದಕ ವಿಜೇತ ಕೋಚ್‌ಗಳಿಂದ ಮುಂದುವರಿದ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ.'
    },
    {
      icon: <Target className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Surplus Nutrition & Recovery' : 'ಪೋಷಕಾಂಶ ಮತ್ತು ರಿಕವರಿ ಯೋಜನೆ',
      desc: language === 'en' ? 'High-protein diet splits, recovery planning, and post-workout eucalyptus steam bath access.' : 'ಹೆಚ್ಚಿನ ಪ್ರೋಟೀನ್ ಆಹಾರ ಯೋಜನೆ ಮತ್ತು ವರ್ಕೌಟ್ ನಂತರ ಸ್ಟೀಮ್ ಬಾತ್ ಸೌಲಭ್ಯ.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Dumbbell className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'STRENGTH & HYPERTROPHY MASTERY' : 'ಸ್ಟ್ರೆಂತ್ ಮತ್ತು ಸ್ನಾಯು ಬೆಳವಣಿಗೆ'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Muscle Building & Strength in Kengeri — ' : 'ಸ್ನಾಯು ನಿರ್ಮಾಣ ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ಕೆಂಗೇರಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Whether you are bulking lean mass or preparing for competitive strength feats, our flagship strength floor in Kengeri provides the heavy equipment, progressive overload systems, and expert guidance you need.'
                : 'ನೇರ ಸ್ನಾಯು ಹೆಚ್ಚಳ ಅಥವಾ ಬಲವರ್ಧನೆಗೆ ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಹೆವಿ ಉಪಕರಣಗಳು ಮತ್ತು ತಜ್ಞ ಕೋಚಿಂಗ್ ನಮ್ಮ ಕೆಂಗೇರಿ ಜಿಮ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದೆ.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h2 className="text-lg font-display font-bold uppercase text-white mb-2">{p.title}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? 'Build Serious Strength at Dhanus Gold Fitness Kengeri' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಿ'}
          subtitle={language === 'en' ? 'Tour our 3-floor facility at Hoysala Circle, Kengeri Satellite Town.' : 'ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿರುವ ನಮ್ಮ ಜಿಮ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
