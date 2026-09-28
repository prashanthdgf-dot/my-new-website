import { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Target, Award, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import ScrollReveal from './ScrollReveal';

interface FounderData {
  id: string;
  name: {
    en: string;
    kn: string;
  };
  role: {
    en: string;
    kn: string;
  };
  image: string;
  experience: {
    en: string;
    kn: string;
  };
  philosophy: {
    en: string;
    kn: string;
  };
  vision: {
    en: string;
    kn: string;
  };
  background: {
    en: string;
    kn: string;
  };
}

const FOUNDERS: FounderData[] = [
  {
    id: 'prashanth',
    name: {
      en: 'Prashanth',
      kn: 'ಪ್ರಶಾಂತ್'
    },
    role: {
      en: 'Founder & Head Strength Coach',
      kn: 'ಸ್ಥಾಪಕರು ಮತ್ತು ಮುಖ್ಯ ತರಬೇತುದಾರರು'
    },
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1785136389/prashanth_e9qrto.png',
    experience: {
      en: "Gold's Gym Certified Trainer • Bodybuilding & Nutrition Expert",
      kn: 'ಗೋಲ್ಡ್ಸ್ ಜಿಮ್ ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರು • ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶ ತಜ್ಞರು'
    },
    philosophy: {
      en: "Fitness is not a temporary phase, but a lifelong commitment to strength, discipline, and precise nutrition. When you train your body, you empower your entire life.",
      kn: "ಫಿಟ್‌ನೆಸ್ ಎಂಬುದು ತಾತ್ಕಾಲಿಕ ಹಂತವಲ್ಲ, ಇದು ಶಕ್ತಿ, ಶಿಸ್ತು ಮತ್ತು ನಿಖರ ಪೌಷ್ಟಿಕಾಂಶದ ಕಡೆಗೆ ಜೀವಮಾನದ ಬದ್ಧತೆಯಾಗಿದೆ."
    },
    vision: {
      en: "To bring high-end athletic coaching, premium certified expertise, and elite-level bodybuilding and nutrition standards to Kengeri, ensuring every member transforms scientifically.",
      kn: "ಕೆಂಗೇರಿಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಅಥ್ಲೆಟಿಕ್ ಕೋಚಿಂಗ್, ಪ್ರಮಾಣೀಕೃತ ತರಬೇತಿ ಮತ್ತು ಉನ್ನತ ಮಟ್ಟದ ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಡಯಟ್ ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುವುದು."
    },
    background: {
      en: "A highly professional and Gold's Gym certified personal training expert and nutritionist who established Dhanus Gold with a passion to deliver absolute training standards.",
      kn: "ಗೋಲ್ಡ್ಸ್ ಜಿಮ್ ಪ್ರಮಾಣೀಕೃತ ಉನ್ನತ ತರಬೇತಿ ತಜ್ಞರು ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶ ತಜ್ಞರಾಗಿದ್ದು, ಅತ್ಯುನ್ನತ ಗುಣಮಟ್ಟದ ತರಬೇತಿ ನೀಡಲು ಈ ಸಂಸ್ಥೆಯನ್ನು ಮುನ್ನಡೆಸುತ್ತಿದ್ದಾರೆ."
    }
  },
  {
    id: 'dhananjay_hb',
    name: {
      en: 'Dhananjay H.B.',
      kn: 'ಧನಂಜಯ್ ಎಚ್.ಬಿ'
    },
    role: {
      en: 'Co-Founder & Bodybuilding Expert',
      kn: 'ಸಹ-ಸ್ಥಾಪಕರು ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ತಜ್ಞರು'
    },
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1785136389/dhanu_ontn0w.png',
    experience: {
      en: 'Competitive Bodybuilding Expert • 10+ Years Elite Strength Coaching',
      kn: 'ಸ್ಪರ್ಧಾತ್ಮಕ ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ತಜ್ಞರು • ೧೦+ ವರ್ಷಗಳ ತರಬೇತಿ ಅನುಭವ'
    },
    philosophy: {
      en: "Strength is forged through consistency and absolute dedication. My goal is to guide you step-by-step to sculpt a powerful, resilient, and aesthetic physique.",
      kn: "ನಿರಂತರ ಪ್ರಯತ್ನ ಮತ್ತು ಬದ್ಧತೆಯಿಂದ ಸಾಮರ್ಥ್ಯವು ಸಿದ್ಧಿಸುತ್ತದೆ. ನಿಮ್ಮ ಶರೀರವನ್ನು ಶಕ್ತಿಯುತವಾಗಿ ರೂಪಿಸುವುದು ನನ್ನ ಪ್ರಮುಖ ಗುರಿಯಾಗಿದೆ."
    },
    vision: {
      en: "To build an unmatched physical culture in Kengeri where bodybuilding and strength programming are taught with absolute biomechanical precision and safety.",
      kn: "ಕೆಂಗೇರಿಯಲ್ಲಿ ಜಾಗತಿಕ ಮಟ್ಟದ ಶಾರೀರಿಕ ಕಲ್ಚರ್ ಮತ್ತು ಬಯೋಮೆಕಾನಿಕಲ್ ತರಬೇತಿ ಒದಗಿಸುವ ಮೂಲಕ ಸದಸ್ಯರ ಗುರಿಗಳನ್ನು ಸಾಕಾರಗೊಳಿಸುವುದು."
    },
    background: {
      en: "A veteran bodybuilding expert and dedicated elite coach who has successfully guided hundreds of physical transformations through rigorous, performance-driven training schedules.",
      kn: "ನೂರಾರು ಸದಸ್ಯರ ಶಾರೀರಿಕ ಪರಿವರ್ತನೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ಮಾರ್ಗದರ್ಶನ ನೀಡಿರುವ ದಕ್ಷ ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಪರಿಣಿತರು ಮತ್ತು ಹಿರಿಯ ತರಬೇತುದಾರರು."
    }
  }
];

export default function Founders() {
  const { language } = useLanguage();
  const [activeFounder, setActiveFounder] = useState<string>(FOUNDERS[0].id);

  return (
    <section id="founders" className="py-16 lg:py-20 bg-gradient-to-b from-black via-[#060606] to-[#0A0A0A] relative border-t border-zinc-950 overflow-hidden">
      {/* Golden Aura Background Glows */}
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-[#FFC400]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-[#FFC400]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-[#FFC400] animate-pulse" />
              <span className="text-[10px] font-mono font-black text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'LEADERSHIP & VISION' : 'ನಾಯಕತ್ವ ಮತ್ತು ದೃಷ್ಟಿಕೋನ'}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal duration={0.8} delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-none mb-4">
              {language === 'en' ? 'MEET THE' : 'ನಮ್ಮ'}{' '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'FOUNDERS' : 'ಸ್ಥಾಪಕರು'}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal duration={0.8} delay={0.2}>
            <p className="text-sm sm:text-base text-zinc-400 font-sans tracking-wide leading-relaxed">
              {language === 'en' 
                ? 'The driving forces behind Kengeri Satellite Town’s premier luxury training arena. Learn about their journey, professional discipline, and core commitments.'
                : 'ಕೆಂಗೇರಿಯ ಅತ್ಯಂತ ಭವ್ಯವಾದ ಐಷಾರಾಮಿ ಫಿಟ್‌ನೆಸ್ ತಾಣದ ಪ್ರಮುಖ ಶಕ್ತಿಗಳು. ಅವರ ಯಶಸ್ಸಿನ ಪಯಣ, ದೈಹಿಕ ಶಿಸ್ತು ಮತ್ತು ಗುರಿಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Dynamic Founder Switcher Tabs */}
        <ScrollReveal duration={0.7}>
          <div className="flex justify-center mb-12">
            <div className="bg-zinc-950 p-1.5 rounded-2xl border border-zinc-850 flex gap-2">
              {FOUNDERS.map((founder) => (
                <button
                  key={founder.id}
                  onClick={() => setActiveFounder(founder.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-display font-extrabold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                    activeFounder === founder.id
                      ? 'bg-[#FFC400] text-black shadow-[0_4px_15px_rgba(255,196,0,0.25)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {founder.name[language as 'en' | 'kn']}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Founder Focus Cards with AnimatePresence */}
        <div className="min-h-[500px] flex items-center justify-center">
          {FOUNDERS.map((founder) => {
            if (founder.id !== activeFounder) return null;

            return (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 w-full items-stretch"
              >
                {/* Left Side: Large Portrait with premium border */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850 group shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    {/* Golden Highlight Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFC400]/30 rounded-2xl transition-all duration-500 z-20 pointer-events-none" />
                    
                    <img
                      src={founder.image}
                      alt={founder.name[language as 'en' | 'kn']}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Ambient shadow gradient at the bottom of portrait */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />
                    
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wide">
                        {founder.name[language as 'en' | 'kn']}
                      </h3>
                      <p className="text-[#FFC400] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase mt-1">
                        {founder.role[language as 'en' | 'kn']}
                      </p>
                      <div className="h-0.5 w-12 bg-[#FFC400] mt-3" />
                      <p className="text-zinc-400 font-sans text-[11px] sm:text-xs mt-3 leading-relaxed">
                        {founder.experience[language as 'en' | 'kn']}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Philosophy, Vision & Story */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {/* Philosophy Quote Box */}
                  <div className="bg-[#0B0B0B] border border-zinc-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#FFC400]/10 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Quote className="w-24 h-24 text-[#FFC400]" />
                    </div>
                    
                    <div className="flex gap-4 items-start relative z-10">
                      <div className="p-3 bg-[#FFC400]/10 rounded-xl border border-[#FFC400]/20 text-[#FFC400] shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#FFC400] uppercase font-black block mb-2">
                          {language === 'en' ? 'FITNESS PHILOSOPHY' : 'ದೈಹಿಕ ತರಬೇತಿ ತತ್ವ'}
                        </span>
                        <blockquote className="text-base sm:text-lg text-zinc-100 font-display font-extrabold italic leading-relaxed tracking-wide">
                          "{founder.philosophy[language as 'en' | 'kn']}"
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  {/* Brand Vision Box */}
                  <div className="bg-[#0B0B0B] border border-zinc-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#FFC400]/10 transition-all duration-300">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#FFC400]/10 rounded-xl border border-[#FFC400]/20 text-[#FFC400] shrink-0">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#FFC400] uppercase font-black block mb-2">
                          {language === 'en' ? 'GOLD BRAND VISION FOR KENGERI' : 'ಕೆಂಗೇರಿಗಾಗಿ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನ ಧೀಮಂತ ಗುರಿ'}
                        </span>
                        <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed tracking-wide">
                          {founder.vision[language as 'en' | 'kn']}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Biography & Core Story */}
                  <div className="bg-[#050505] border border-zinc-950 rounded-2xl p-6 sm:p-8 flex gap-4 items-start group hover:border-zinc-900 transition-all duration-300">
                    <div className="p-3 bg-zinc-900 rounded-xl text-zinc-400 border border-zinc-800 shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black block mb-2">
                        {language === 'en' ? 'BACKGROUND & COMMITTMENT' : 'ಹಿನ್ನೆಲೆ ಮತ್ತು ಬದ್ಧತೆ'}
                      </span>
                      <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                        {founder.background[language as 'en' | 'kn']}
                      </p>
                    </div>
                  </div>

                  {/* Premium Brand Stamp */}
                  <div className="pt-2 flex items-center justify-between border-t border-zinc-900/60">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-[#FFC400]" />
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                        {language === 'en' ? 'GENUINE ATHLETE DRIVEN BRAND' : 'ನಿಜವಾದ ಕ್ರೀಡಾಪಟು ಚಾಲಿತ ಬ್ರ್ಯಾಂಡ್'}
                      </span>
                    </div>
                    
                    <div className="text-[11px] font-mono text-[#FFC400] bg-[#FFC400]/10 border border-[#FFC400]/20 px-3 py-1 rounded-md tracking-wider font-bold">
                      EST. 2024
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
