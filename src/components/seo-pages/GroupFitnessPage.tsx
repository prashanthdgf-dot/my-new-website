import React, { useEffect } from 'react';
import { Users, Music, Activity, Zap, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function GroupFitnessPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Group Fitness & Functional Training in Kengeri | Dhanus Gold Fitness'
      : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್ ಮತ್ತು ಫಂಕ್ಷನಲ್ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್';
    const description = language === 'en'
      ? 'Experience high-energy group fitness classes at Dhanus Gold Fitness Kengeri. Zumba, Aerobics, Functional HIIT, and agility conditioning in a spacious high-energy studio.'
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಜುಂಬಾ, ಏರೋಬಿಕ್ಸ್ ಮತ್ತು ಹೈ-ಎನರ್ಜಿ ಗ್ರೂಪ್ ತರಬೇತಿ. ಅತ್ಯುತ್ತಮ ಸ್ಟುಡಿಯೋ ಮತ್ತು ಅನುಭವಿ ಬೋಧಕರು.';

    updateMetaTags(title, description, undefined, '/group-fitness');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Group Fitness' : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್', path: '/group-fitness' }
    ]);
    setFaqSchema([
      {
        question: 'What group classes are offered at Dhanus Gold Fitness Kengeri?',
        answer: 'We host high-energy Zumba, Step Aerobics, Functional CrossFit turf drills, Core Blitz, and HIIT circuits led by passionate certified instructors.'
      },
      {
        question: 'Are group classes beginner-friendly?',
        answer: 'Yes! All routines include low-impact modifications so members of any fitness background can participate comfortably and burn calories.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Group Fitness' : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್', path: '/group-fitness' }
  ];

  const classes = [
    {
      icon: <Music className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Zumba & Dance Fitness' : 'ಜುಂಬಾ ಮತ್ತು ಡ್ಯಾನ್ಸ್ ಫಿಟ್‌ನೆಸ್',
      desc: language === 'en' ? 'Cardio dance choreography set to upbeat international rhythms that makes cardio effortless and fun.' : 'ಉತ್ಸಾಹಭರಿತ ಸಂಗೀತದೊಂದಿಗೆ ತೂಕ ಇಳಿಸುವ ಆನಂದದಾಯಕ ಜುಂಬಾ ತರಗತಿಗಳು.'
    },
    {
      icon: <Activity className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'High-Intensity Interval Training (HIIT)' : 'ಹೈ-ಇಂಟೆನ್ಸಿಟಿ ತರಬೇತಿ (HIIT)',
      desc: language === 'en' ? 'Burst circuits targeting cardiovascular endurance, agility, and massive calorie output in 45 minutes.' : '೪೫ ನಿಮಿಷಗಳಲ್ಲಿ ಅಧಿಕ ಕ್ಯಾಲೊರಿ ದಹಿಸುವ ತೀವ್ರ ತರಬೇತಿ.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Functional Turf Conditioning' : 'ಫಂಕ್ಷನಲ್ ಟರ್ಫ್ ತರಬೇತಿ',
      desc: language === 'en' ? 'Battle ropes, agility ladders, kettlebell flows, and plyometrics on our dedicated turf track.' : 'ಕ್ರಾಸ್‌ಫಿಟ್ ಟರ್ಫ್‌ನಲ್ಲಿ ಬ್ಯಾಟಲ್ ರೋಪ್ಸ್ ಮತ್ತು ಕೆಟಲ್‌ಬೆಲ್ ಚಲನೆಗಳು.'
    },
    {
      icon: <Users className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Energizing Community Atmosphere' : 'ಉತ್ಸಾಹಭರಿತ ಸಮುದಾಯ',
      desc: language === 'en' ? 'Train with motivated peers in an uplifting environment that keeps you accountable each week.' : 'ಸಮಾನ ಮನಸ್ಕರೊಂದಿಗೆ ಒಟ್ಟಿಗೆ ವ್ಯಾಯಾಮ ಮಾಡುವ ಅದ್ಭುತ ಅನುಭವ.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Users className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'DYNAMIC GROUP TRAINING' : 'ಡೈನಾಮಿಕ್ ಗ್ರೂಪ್ ತರಬೇತಿ'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Group Fitness & Functional Classes in Kengeri — ' : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Break the monotony with electrifying group workouts. From high-tempo Zumba to full-body functional conditioning on our indoor turf floor, our sessions ignite your motivation.'
                : 'ಒಂಟಿಯಾಗಿ ವ್ಯಾಯಾಮ ಮಾಡಲು ಬೇಸರವೇ? ನಮ್ಮ ಹೈ-ಎನರ್ಜಿ ಜುಂಬಾ ಮತ್ತು ಗ್ರೂಪ್ ತರಗತಿಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ ಸುಲಭವಾಗಿ ತೂಕ ಇಳಿಸಿಕೊಳ್ಳಿ.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {classes.map((c, idx) => (
              <div key={idx} className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4">
                  {c.icon}
                </div>
                <h2 className="text-lg font-display font-bold uppercase text-white mb-2">{c.title}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{c.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? 'Join a High-Energy Group Class in Kengeri' : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ನಮ್ಮ ಗ್ರೂಪ್ ತರಗತಿಗಳಿಗೆ ಸೇರಿ'}
          subtitle={language === 'en' ? 'Visit our spacious studio floor at Hoysala Circle, Kengeri Satellite Town.' : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್‌ನಲ್ಲಿರುವ ನಮ್ಮ ಸ್ಟುಡಿಯೋಗೆ ಭೇಟಿ ನೀಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
