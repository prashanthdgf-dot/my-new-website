import React, { useEffect } from 'react';
import { Heart, ShieldCheck, CheckCircle2, Sparkles, Users, Lock, Award, ArrowRight } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function WomensFitnessPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? "Women's Fitness & Strength Training in Kengeri | Dhanus Gold Fitness"
      : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್ ಮತ್ತು ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್';
    const description = language === 'en'
      ? "Join women's fitness programs at Dhanus Gold Fitness Kengeri. Separate cardio zones, private changing rooms, certified coaches, body toning, and comfortable safe environment."
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಮಹಿಳೆಯರಿಗಾಗಿ ವಿಶೇಷ ಫಿಟ್‌ನೆಸ್ ತರಬೇತಿ. ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ವಲಯ, ಬಾಡಿ ಟೋನಿಂಗ್ ಮತ್ತು ಸುರಕ್ಷಿತ ವಾತಾವರಣ.';

    updateMetaTags(title, description, undefined, '/womens-fitness-kengeri');
    setBreadcrumbsSchema([
      { name: language === 'en' ? "Women's Fitness" : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್', path: '/womens-fitness-kengeri' }
    ]);
    setFaqSchema([
      {
        question: 'Is there a separate workout area for women at Dhanus Gold Fitness Kengeri?',
        answer: 'Yes! Dhanus Gold Fitness features dedicated separate cardio floors and private changing/steam facilities to provide a completely comfortable and safe workout environment for women.'
      },
      {
        question: 'What women-specific fitness programs are available?',
        answer: 'We offer body toning, glute and core sculpting, PCOS/PCOD metabolic management, post-pregnancy fitness recovery, and general endurance training.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? "Women's Fitness" : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್', path: '/womens-fitness-kengeri' }
  ];

  const highlights = [
    {
      icon: <Lock className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Separate Cardio Floor & Changing Areas' : 'ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮತ್ತು ಚೇಂಜಿಂಗ್ ರೂಮ್',
      desc: language === 'en' ? 'Enjoy dedicated private space equipped with interactive treadmills, cycles, and cross-trainers.' : 'ಗರಿಷ್ಠ ಗೌಪ್ಯತೆ ಮತ್ತು ಆರಾಮದಾಯಕ ವ್ಯಾಯಾಮಕ್ಕಾಗಿ ಪ್ರತ್ಯೇಕ ಮಹಡಿ.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Body Toning & Core Sculpting' : 'ಬಾಡಿ ಟೋನಿಂಗ್ ಮತ್ತು ಕೋರ್ ಶಿಲ್ಪಕಲೆ',
      desc: language === 'en' ? 'Tailored strength and resistance programs focused on toning, core definition, and posture correction.' : 'ದೇಹದ ಆಕಾರ ಮತ್ತು ಸಮತೋಲನವನ್ನು ಸುಧಾರಿಸಲು ಕಸ್ಟಮ್ ತರಬೇತಿ.'
    },
    {
      icon: <Heart className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Hormonal & Lifestyle Fitness' : 'ಹಾರ್ಮೋನು ಮತ್ತು ಜೀವನಶೈಲಿ ಫಿಟ್‌ನೆಸ್',
      desc: language === 'en' ? 'Specialized routines that support thyroid balance, PCOS/PCOD weight management, and stress relief.' : 'ಪಿಸಿಓಡಿ/ಪಿಸಿಓಎಸ್ ಮತ್ತು ಥೈರಾಯ್ಡ್ ನಿರ್ವಹಣೆಗೆ ಪೂರಕವಾದ ವ್ಯಾಯಾಮ.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Supportive & Safe Culture' : 'ಸುರಕ್ಷಿತ ಮತ್ತು ಬೆಂಬಲಿತ ವಾತಾವರಣ',
      desc: language === 'en' ? 'Professional certified trainers who guide exercise form respectfully with clear step-by-step progressions.' : 'ವೃತ್ತಿಪರ ಮತ್ತು ಗೌರವಾನ್ವಿತ ಕೋಚಿಂಗ್ ವಾತಾವರಣ.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Heart className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? "EMPOWERING WOMEN'S HEALTH & FITNESS" : 'ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಮತ್ತು ಫಿಟ್‌ನೆಸ್'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? "Women's Fitness Programs in Kengeri — " : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? "Dhanus Gold Fitness provides a welcoming, private, and results-focused fitness environment for women in Kengeri Satellite Town. Benefit from separate cardio zones, dedicated personal trainers, and safe resistance training."
                : 'ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿ ಮಹಿಳೆಯರಿಗಾಗಿ ಸುರಕ್ಷಿತ ಮತ್ತು ಫಲಿತಾಂಶ ಆಧಾರಿತ ಫಿಟ್‌ನೆಸ್ ಕೇಂದ್ರ. ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ವಿಭಾಗ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ಕೋಚಿಂಗ್ ಸೌಲಭ್ಯ ಲಭ್ಯವಿದೆ.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {highlights.map((h, idx) => (
              <div key={idx} className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4">
                  {h.icon}
                </div>
                <h2 className="text-lg font-display font-bold uppercase text-white mb-2">{h.title}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{h.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? "Join Kengeri's Premier Women's Fitness Gym" : 'ಕೆಂಗೇರಿಯ ಪ್ರಮುಖ ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್ ಕೇಂದ್ರಕ್ಕೆ ಸೇರಿ'}
          subtitle={language === 'en' ? 'Visit our private facility at Hoysala Circle, Kengeri Satellite Town.' : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್‌ನಲ್ಲಿರುವ ನಮ್ಮ ಜಿಮ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
