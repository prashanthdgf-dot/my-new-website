import React, { useEffect } from 'react';
import { Apple, Scale, Flame, CheckCircle2, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function NutritionGuidancePage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Nutrition Guidance & Diet Plans in Kengeri | Dhanus Gold Fitness'
      : 'ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಡಯಟ್ ಯೋಜನೆ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್';
    const description = language === 'en'
      ? 'Get personalized nutrition guidance and Indian macro meal plans at Dhanus Gold Fitness Kengeri. Tailored diet strategies for fat loss, muscle growth, and metabolic wellness.'
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ವೈಯಕ್ತಿಕ ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಆಹಾರ ಯೋಜನೆ. ಕೊಬ್ಬು ಇಳಿಕೆ ಮತ್ತು ಸ್ನಾಯು ಬೆಳವಣಿಗೆಗೆ ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಡಯಟ್ ಚಾರ್ಟ್.';

    updateMetaTags(title, description, undefined, '/nutrition-guidance');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Nutrition Guidance' : 'ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ', path: '/nutrition-guidance' }
    ]);
    setFaqSchema([
      {
        question: 'Are the diet plans at Dhanus Gold Fitness suitable for South Indian food habits?',
        answer: 'Yes! Our certified sports nutritionists customize macronutrient breakdowns around everyday Indian foods including rice, roti, dal, eggs, paneer, chicken, and local seasonal vegetables.'
      },
      {
        question: 'Do I have to buy expensive commercial supplements?',
        answer: 'No. We prioritize whole foods and sustainable nutrition. Supplements are only recommended if medically or performance-wise beneficial and are never forced.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Nutrition Guidance' : 'ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ', path: '/nutrition-guidance' }
  ];

  const pillars = [
    {
      icon: <Scale className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Calorie & Macro Calculations' : 'ಕ್ಯಾಲೋರಿ ಮತ್ತು ಮ್ಯಾಕ್ರೋ ಲೆಕ್ಕಾಚಾರ',
      desc: language === 'en' ? 'Exact protein, carbohydrate, and healthy fat targets calculated from your Basal Metabolic Rate (BMR).' : 'ನಿಮ್ಮ ದೇಹಕ್ಕೆ ಅಗತ್ಯವಿರುವ ನಿಖರವಾದ ಪ್ರೋಟೀನ್ ಮತ್ತು ಕ್ಯಾಲೊರಿ ಲೆಕ್ಕಾಚಾರ.'
    },
    {
      icon: <Apple className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Everyday Indian Food Matching' : 'ದೈನಂದಿನ ಭಾರತೀಯ ಆಹಾರ ಹೊಂದಾಣಿಕೆ',
      desc: language === 'en' ? 'Flexible meal plans designed for students, working IT professionals, and families without exotic ingredients.' : 'ಮನೆಯಲ್ಲಿ ಮಾಡುವ ಸುಲಭ ಮತ್ತು ಪೌಷ್ಟಿಕ ಆಹಾರ ಪದ್ಧತಿ.'
    },
    {
      icon: <Flame className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Fat Loss & Hypertrophy Blueprints' : 'ಕೊಬ್ಬು ಇಳಿಕೆ ಮತ್ತು ಸ್ನಾಯು ಯೋಜನೆ',
      desc: language === 'en' ? 'Targeted nutrient timing to fuel your workouts and maximize post-exercise muscle protein synthesis.' : 'ವರ್ಕೌಟ್‌ಗೆ ಶಕ್ತಿ ನೀಡುವ ಮತ್ತು ಸ್ನಾಯು ಚೇತರಿಕೆಗೆ ಸೂಕ್ತವಾದ ಆಹಾರ ಸಮಯ.'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Continuous Habit Coaching' : 'ನಿರಂತರ ಜೀವನಶೈಲಿ ಕೋಚಿಂಗ್',
      desc: language === 'en' ? 'Weekly check-ins and adjustments to ensure adherence without social isolation or guilt.' : 'ವಾರದ ಪ್ರಗತಿ ಪರಿಶೀಲನೆ ಮತ್ತು ಆಹಾರ ಮಾರ್ಪಾಡುಗಳು.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Apple className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'SUSTAINABLE NUTRITION SCIENCE' : 'ಸುಸ್ಥಿರ ಪೌಷ್ಟಿಕಾಂಶ ವಿಜ್ಞಾನ'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Nutrition Guidance & Diet Plans in Kengeri — ' : 'ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ ಕೆಂಗೇರಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? '80% of your body transformation happens in the kitchen. Our coaches in Kengeri create balanced, realistic nutrition plans that empower you to eat delicious food while consistently hitting your fitness goals.'
                : '೮೦% ಪರಿವರ್ತನೆ ಸರಿಯಾದ ಆಹಾರ ಪದ್ಧತಿಯಿಂದ ಬರುತ್ತದೆ. ನಮ್ಮ ತರಬೇತುದಾರರು ನಿಮ್ಮ ಜೀವನಶೈಲಿಗೆ ಹೊಂದುವ ಸಮತೋಲಿತ ಡಯಟ್ ಪ್ಲಾನ್ ಸಿದ್ಧಪಡಿಸುತ್ತಾರೆ.'}
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
          title={language === 'en' ? 'Consult with a Sports Nutritionist in Kengeri' : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಪೌಷ್ಟಿಕಾಂಶ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ'}
          subtitle={language === 'en' ? 'Visit our consultation desk at Hoysala Circle, Kengeri Satellite Town.' : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್‌ನಲ್ಲಿರುವ ನಮ್ಮ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
