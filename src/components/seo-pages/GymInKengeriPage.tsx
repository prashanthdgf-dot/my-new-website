import React, { useEffect } from 'react';
import { Award, CheckCircle2, ShieldCheck, MapPin, Dumbbell, Users, Clock, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Breadcrumbs from './Breadcrumbs';
import LocalCtaBlock from './LocalCtaBlock';
import { updateMetaTags, setBreadcrumbsSchema, setFaqSchema } from '../../lib/seo';
import { useLanguage } from '../../LanguageContext';
import { CONTACT_INFO } from '../../data';
import ScrollReveal from '../ScrollReveal';

interface Props {
  onNavigate: (path: string) => void;
}

export default function GymInKengeriPage({ onNavigate }: Props) {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en'
      ? 'Best Gym in Kengeri Bengaluru | Dhanus Gold Fitness'
      : 'ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಜಿಮ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಬೆಂಗಳೂರು';
    const description = language === 'en'
      ? 'Looking for the best gym in Kengeri? Dhanus Gold Fitness features a 3-floor facility, imported biomechanical equipment, separate cardio zones, and certified personal trainers at Hoysala Circle.'
      : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಜಿಮ್ ಹುಡುಕುತ್ತಿದ್ದೀರಾ? ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್‌ನಲ್ಲಿ ೩ ಅಂತಸ್ತಿನ ಸೌಲಭ್ಯ, ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರಿದ್ದಾರೆ.';

    updateMetaTags(title, description, undefined, '/gym-in-kengeri');
    setBreadcrumbsSchema([
      { name: language === 'en' ? 'Gym in Kengeri' : 'ಕೆಂಗೇರಿಯ ಜಿಮ್', path: '/gym-in-kengeri' }
    ]);
    setFaqSchema([
      {
        question: 'Where is Dhanus Gold Fitness located in Kengeri?',
        answer: 'Dhanus Gold Fitness is situated on the 3rd & 4th Floor, No. 18, Hoysala Circle, Outer Ring Road, above Trends Junior and opposite Shoppers Choice in Kengeri Satellite Town, Bengaluru – 560060.'
      },
      {
        question: 'What are the operating hours of Dhanus Gold Fitness Kengeri?',
        answer: 'We are open Monday to Saturday from 5:30 AM to 10:00 PM, and on Sundays from 5:00 PM to 9:00 PM.'
      },
      {
        question: 'What facilities are available at Dhanus Gold Fitness in Kengeri?',
        answer: 'Our 3-floor setup includes plate-loaded strength equipment, separate cardio floors for men & women, functional training turf, luxury steam baths, and certified personal coaching.'
      }
    ]);
  }, [language]);

  const breadcrumbs = [
    { name: language === 'en' ? 'Gym in Kengeri' : 'ಕೆಂಗೇರಿಯ ಜಿಮ್', path: '/gym-in-kengeri' }
  ];

  const features = [
    {
      title: language === 'en' ? 'Three-Floor Premium Layout' : 'ಮೂರು ಅಂತಸ್ತಿನ ಪ್ರೀಮಿಯಂ ವಿನ್ಯಾಸ',
      desc: language === 'en' ? '5,100+ sq. ft. across multiple levels with dedicated zones for strength, cardio, and functional conditioning.' : '೫,೧೦೦+ ಚದರ ಅಡಿ ವಿಸ್ತೀರ್ಣದ ಮೂರು ಮಹಡಿಗಳಲ್ಲಿ ವಿವಿಧ ತರಬೇತಿ ವಿಭಾಗಗಳು.'
    },
    {
      title: language === 'en' ? 'Separate Cardio for Men & Women' : 'ಪುರುಷರು ಮತ್ತು ಮಹಿಳೆಯರಿಗೆ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ',
      desc: language === 'en' ? 'Dedicated floor sections ensure maximum privacy, safety, and focused workouts for all members.' : 'ಗರಿಷ್ಠ ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ವಿಭಾಗಗಳು.'
    },
    {
      title: language === 'en' ? 'Imported Biomechanical Machinery' : 'ಆಮದು ಮಾಡಿಕೊಂಡ ಬಾಯೋಮೆಕಾನಿಕಲ್ ಯಂತ್ರಗಳು',
      desc: language === 'en' ? 'Plate-loaded and pin-loaded machines engineered to follow natural human muscle arcs safely.' : 'ನೈಸರ್ಗಿಕ ಸ್ನಾಯು ಚಲನೆಗೆ ಹೊಂದಿಕೊಳ್ಳುವ ಅತ್ಯಾಧುನಿಕ ಉಪಕರಣಗಳು.'
    },
    {
      title: language === 'en' ? '9+ Years & 4,000+ Clients' : '೯+ ವರ್ಷಗಳು & ೪,೦೦೦+ ಗ್ರಾಹಕರು',
      desc: language === 'en' ? 'Kengeri Satellite Town’s longest standing premier fitness brand with 600+ verified transformations.' : '೬೦೦+ ನೈಜ ಪರಿವರ್ತನೆಗಳನ್ನು ಹೊಂದಿರುವ ಕೆಂಗೇರಿಯ ವಿಶ್ವಾಸಾರ್ಹ ಫಿಟ್‌ನೆಸ್ ಕೇಂದ್ರ.'
    }
  ];

  const services = [
    { name: language === 'en' ? 'Personal Training' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ', path: '/personal-training-kengeri', desc: language === 'en' ? '1-on-1 coaching with customized nutrition.' : 'ವೈಯಕ್ತಿಕ ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮ ಯೋಜನೆ.' },
    { name: language === 'en' ? 'Weight Loss Training' : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ', path: '/weight-loss-training-kengeri', desc: language === 'en' ? 'Fat loss circuits and metabolic conditioning.' : 'ಸುಸ್ಥಿರ ತೂಕ ಇಳಿಕೆ ಮತ್ತು ಕೊಬ್ಬು ಕರಗಿಸುವಿಕೆ.' },
    { name: language === 'en' ? 'Muscle Building & Strength' : 'ಸ್ನಾಯು ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ', path: '/muscle-building-kengeri', desc: language === 'en' ? 'Hypertrophy protocols with progressive overload.' : 'ಸ್ನಾಯು ಬಲವರ್ಧನೆ ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್.' },
    { name: language === 'en' ? "Women's Fitness" : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್', path: '/womens-fitness-kengeri', desc: language === 'en' ? 'Dedicated programs for toning, endurance & health.' : 'ಮಹಿಳೆಯರಿಗಾಗಿ ವಿಶೇಷ ಸುರಕ್ಷಿತ ಫಿಟ್‌ನೆಸ್ ಯೋಜನೆ.' },
    { name: language === 'en' ? 'Group Fitness & Functional' : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್ ಮತ್ತು ಫಂಕ್ಷನಲ್', path: '/group-fitness', desc: language === 'en' ? 'High-energy classes, HIIT, and agility drills.' : 'ಹೆಚ್ಚಿನ ಶಕ್ತಿಯ ಗ್ರೂಪ್ ತರಗತಿಗಳು ಮತ್ತು HIIT.' },
    { name: language === 'en' ? 'Nutrition Guidance' : 'ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ', path: '/nutrition-guidance', desc: language === 'en' ? 'Macro-balanced meal blueprints tailored to your lifestyle.' : 'ವೈಯಕ್ತಿಕ ಸಮತೋಲಿತ ಆಹಾರ ಯೋಜನೆ.' }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        {/* Primary Page Header */}
        <ScrollReveal y={20}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'FLAGSHIP FITNESS FACILITY IN KENGERI' : 'ಕೆಂಗೇರಿಯ ಪ್ರಮುಖ ಫಿಟ್‌ನೆಸ್ ಕೇಂದ್ರ'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'Best Gym in Kengeri — ' : 'ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಜಿಮ್ — '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'Dhanus Gold Fitness' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್'}
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {language === 'en'
                ? 'Welcome to Dhanus Gold Fitness, Kengeri Satellite Town’s premier three-floor gym and personal training center. Located right at Hoysala Circle on Outer Ring Road, we combine high-end imported strength equipment, private cardio zones, and certified coaching.'
                : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಉಪನಗರದಲ್ಲಿರುವ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್‌ಗೆ ಸುಸ್ವಾಗತ. ಮೂರು ಅಂತಸ್ತಿನ ವಿಶಾಲವಾದ ಜಿಮ್‌ನಲ್ಲಿ ಅತ್ಯಾಧುನಿಕ ಉಪಕರಣಗಳು ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ಕೋಚಿಂಗ್ ಲಭ್ಯವಿದೆ.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Key Features Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((f, idx) => (
              <div key={idx} className="bg-[#0B0B0B] border border-zinc-850 hover:border-[#FFC400]/30 p-6 rounded-2xl transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FFC400]/10 flex items-center justify-center mb-4 text-[#FFC400]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-display font-bold uppercase text-white mb-2">{f.title}</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Detailed Local Information Section */}
        <ScrollReveal>
          <div className="bg-[#080808] border border-zinc-900 rounded-3xl p-6 sm:p-10 mb-20">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-bold text-[#FFC400] uppercase tracking-widest block mb-2">
                {language === 'en' ? 'LOCAL CONVENIENCE & COMMUNITY' : 'ಸ್ಥಳೀಯ ಸೌಕರ್ಯ ಮತ್ತು ಸಂಪರ್ಕ'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mb-4">
                {language === 'en' ? 'Why Kengeri Residents Choose Dhanus Gold' : 'ಕೆಂಗೇರಿ ನಿವಾಸಿಗಳು ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್ ಅನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡುತ್ತಾರೆ'}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {language === 'en'
                  ? 'Conveniently situated near Kengeri Metro Station, Bangalore University campus, RV College of Engineering, Gnanabharathi Stage II, and Mailasandra, Dhanus Gold Fitness provides an easily accessible workout hub with generous operating hours from 5:30 AM to 10:00 PM.'
                  : 'ಕೆಂಗೇರಿ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ, ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ಆವರಣ, ಆರ್‌ವಿ ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜು ಮತ್ತು ಜ್ಞಾನಭಾರತಿಗೆ ಹತ್ತಿರದಲ್ಲಿದ್ದು, ಬೆಳಿಗ್ಗೆ ೫:೩೦ ರಿಂದ ರಾತ್ರಿ ೧೦:೦೦ ರವರೆಗೆ ಸುಲಭ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುತ್ತದೆ.'}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#FFC400]" /> Hoysala Circle Landmark</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#FFC400]" /> Open Mon–Sat 5:30 AM–10 PM, Sun 5–9 PM</div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FFC400]" /> Clean Lockers & Steam Baths</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Explore Service Programs */}
        <ScrollReveal>
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                {language === 'en' ? 'Explore Our Specialized Programs in Kengeri' : 'ನಮ್ಮ ವಿಶೇಷ ತರಬೇತಿ ಪ್ರೋಗ್ರಾಂಗಳನ್ನು ಅನ್ವೇಷಿಸಿ'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                {language === 'en' ? 'Tailored workout protocols led by certified fitness coaches.' : 'ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರ ನೇತೃತ್ವದಲ್ಲಿ ವೈಯಕ್ತಿಕ ತರಬೇತಿ.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate(svc.path)}
                  className="bg-[#0A0A0A] border border-zinc-850 hover:border-[#FFC400] p-6 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-display font-bold uppercase text-white group-hover:text-[#FFC400] transition-colors">
                        {svc.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFC400] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{svc.desc}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#FFC400] font-bold uppercase mt-4 block">
                    {language === 'en' ? 'Learn More →' : 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ →'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Local CTA Block */}
        <LocalCtaBlock onNavigate={onNavigate} />

      </div>
    </div>
  );
}
