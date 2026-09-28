import React, { useEffect } from 'react';
import { Target, CheckCircle2, ShieldCheck, Dumbbell, Award, ArrowRight, UserCheck, HeartHandshake } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import { CONTACT_INFO, TRAINERS } from '../../data';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function PersonalTrainingPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Personal Training in Kengeri | Dhanus Gold Fitness'
      : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್';
    const description = language === 'en'
      ? 'Get certified 1-on-1 personal training in Kengeri at Dhanus Gold Fitness. Customized workout programs, posture correction, nutrition coaching, and guaranteed body transformation results.'
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ೧-ಆನ್-೧ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಪಡೆಯಿರಿ. ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ವರ್ಕೌಟ್ ಮತ್ತು ಡಯಟ್ ಯೋಜನೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಗುರಿಯನ್ನು ತಲುಪಿ.';

    updateMetaTags(title, description, undefined, '/personal-training-kengeri');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Personal Training' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ', path: '/personal-training-kengeri' }
    ]);
    setFaqSchema([
      {
        question: 'What is included in Personal Training at Dhanus Gold Fitness Kengeri?',
        answer: 'Our personal training includes 1-on-1 dedicated coaching, posture and form correction, weekly progress tracking, customized Indian diet design, and priority support.'
      },
      {
        question: 'Who are the personal trainers at Dhanus Gold Fitness?',
        answer: 'Our coaches include founder and state medalist Prashanth, head coach Dhananjay H.B., and certified trainers Balaji, Kiran, Manjunath, and Vinay with 6 to 12 years of experience.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Personal Training' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ', path: '/personal-training-kengeri' }
  ];

  const pillars = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Dedicated 1-on-1 Coaching' : '೧-ಆನ್-೧ ಮೀಸಲಾದ ಕೋಚಿಂಗ್',
      desc: language === 'en' ? 'Individual attention during every session to ensure safe execution, maximum hypertrophy, and injury prevention.' : 'ಪ್ರತಿ ಸೆಷನ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತ ವ್ಯಾಯಾಮ ಮತ್ತು ಗಾಯ ತಡೆಗಟ್ಟುವಿಕೆಗೆ ವೈಯಕ್ತಿಕ ಗಮನ.'
    },
    {
      icon: <Target className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Goal-Specific Periodization' : 'ಗುರಿ ಆಧಾರಿತ ತರಬೇತಿ ಯೋಜನೆ',
      desc: language === 'en' ? 'Scientific progressive overload cycles mapped out for fat loss, strength gain, or athletic conditioning.' : 'ಕೊಬ್ಬು ಇಳಿಕೆ, ಸ್ನಾಯು ಬಲವರ್ಧನೆಗೆ ವೈಜ್ಞಾನಿಕ ತರಬೇತಿ ಚಾರ್ಟ್.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Customized Nutrition Sync' : 'ವೈಯಕ್ತಿಕ ಆಹಾರ ಯೋಜನೆ',
      desc: language === 'en' ? 'Practical Indian macro plans tailored to vegetarian and non-vegetarian lifestyles without crash dieting.' : 'ಸುಲಭವಾಗಿ ಪಾಲಿಸಬಹುದಾದ ಸಮತೋಲಿತ ಭಾರತೀಯ ಆಹಾರ ಯೋಜನೆ.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#FFC400]" />,
      title: language === 'en' ? 'Regular Biometric Tracking' : 'ನಿಯಮಿತ ಪ್ರಗತಿ ಪರಿಶೀಲನೆ',
      desc: language === 'en' ? 'Regular body composition assessments, measurement milestones, and strength progress logs.' : 'ದೇಹದ ಅಳತೆ, ಕೊಬ್ಬಿನ ಶೇಕಡಾವಾರು ಮತ್ತು ಬಲದ ಪ್ರಗತಿಯ ನಿಯಮಿತ ಪರಿಶೀಲನೆ.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        {/* Hero Section */}
        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'CERTIFIED PERSONAL COACHING' : 'ಪ್ರಮಾಣೀಕೃತ ವೈಯಕ್ತಿಕ ಕೋಚಿಂಗ್'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Personal Training in Kengeri — ' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೆಂಗೇರಿ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Accelerate your transformation with 1-on-1 personal coaching in Kengeri Satellite Town. Our certified trainers design custom workout splits, correct movement biomechanics, and provide direct daily accountability.'
                : 'ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿ ೧-ಆನ್-೧ ವೈಯಕ್ತಿಕ ತರಬೇತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ದೇಹದ ಗುರಿಗಳನ್ನು ಸಾಧಿಸಿ. ನಮ್ಮ ಅನುಭವಿ ಕೋಚ್‌ಗಳು ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Pillars Grid */}
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

        {/* Coaches Showcase Preview */}
        <ScrollReveal>
          <div className="bg-[#080808] border border-zinc-900 rounded-3xl p-6 sm:p-10 mb-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <span className="text-xs font-mono font-bold text-[#FFC400] uppercase tracking-widest block mb-1">
                  {language === 'en' ? 'OUR CERTIFIED TRAINERS' : 'ನಮ್ಮ ಪ್ರಮಾಣೀಕೃತ ಕೋಚ್‌ಗಳು'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                  {language === 'en' ? 'Meet Your Personal Training Coaches' : 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರರನ್ನು ಭೇಟಿ ಮಾಡಿ'}
                </h2>
              </div>
              <button
                onClick={() => onNavigate('/trainers')}
                className="px-5 py-2.5 bg-zinc-900 border border-zinc-750 hover:border-[#FFC400] text-xs font-mono font-bold uppercase text-white rounded-xl transition-all cursor-pointer"
              >
                {language === 'en' ? 'View All Trainers →' : 'ಎಲ್ಲಾ ತರಬೇತುದಾರರನ್ನು ನೋಡಿ →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRAINERS.slice(0, 3).map((trainer) => (
                <div key={trainer.id} className="bg-[#0F0F0F] border border-zinc-850 rounded-2xl p-5 flex items-center gap-4">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#FFC400]/30 shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{trainer.name}</h3>
                    <p className="text-xs text-[#FFC400] font-sans font-medium">{trainer.role}</p>
                    <p className="text-[11px] text-zinc-400 font-mono mt-1">{trainer.experienceYears}+ Years Experience</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Cross Link Options */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-xl font-display font-black uppercase text-white mb-6">
              {language === 'en' ? 'Related Training Services in Kengeri' : 'ಸಂಬಂಧಿತ ತರಬೇತಿ ಸೇವೆಗಳು'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div onClick={() => onNavigate('/weight-loss-training-kengeri')} className="p-4 bg-zinc-900/60 border border-zinc-800 hover:border-[#FFC400] rounded-xl cursor-pointer transition-all">
                <h3 className="text-sm font-bold uppercase text-white mb-1">Weight Loss Training</h3>
                <p className="text-xs text-zinc-400">Fat burn conditioning & metabolism boost.</p>
              </div>
              <div onClick={() => onNavigate('/muscle-building-kengeri')} className="p-4 bg-zinc-900/60 border border-zinc-800 hover:border-[#FFC400] rounded-xl cursor-pointer transition-all">
                <h3 className="text-sm font-bold uppercase text-white mb-1">Muscle Building</h3>
                <p className="text-xs text-zinc-400">Hypertrophy programs and power lifting.</p>
              </div>
              <div onClick={() => onNavigate('/womens-fitness-kengeri')} className="p-4 bg-zinc-900/60 border border-zinc-800 hover:border-[#FFC400] rounded-xl cursor-pointer transition-all">
                <h3 className="text-sm font-bold uppercase text-white mb-1">Women's Fitness</h3>
                <p className="text-xs text-zinc-400">Dedicated strength, toning and wellness.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <LocalCtaBlock
          title={language === 'en' ? 'Book Your Personal Training Assessment Today' : 'ಇಂದೇ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಮೌಲ್ಯಮಾಪನವನ್ನು ಬುಕ್ ಮಾಡಿ'}
          subtitle={language === 'en' ? 'Speak directly with our head trainers at Hoysala Circle, Kengeri Satellite Town.' : 'ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿರುವ ನಮ್ಮ ತರಬೇತುದಾರರೊಂದಿಗೆ ಮಾತನಾಡಿ.'}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
}
