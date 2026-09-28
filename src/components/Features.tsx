import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Flame, Dumbbell, Zap, Award, Users, Activity, Building2, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';

interface FacilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  image: string;
}

function FacilityCard({ icon, title, description, badge, image }: FacilityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const tickingRef = useRef(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tickingRef.current || !cardRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
      tickingRef.current = false;
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const optimizedImage = image.includes('cloudinary.com') && !image.includes('f_auto')
    ? image.replace('/upload/', '/upload/f_auto,q_auto,w_600/')
    : image;

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group bg-zinc-950 border border-white/5 p-6 rounded-2xl overflow-hidden hover:border-gold-premium/40 hover:shadow-[0_20px_50px_rgba(255,196,0,0.15)] transition-all duration-300 h-full perspective-1000 will-change-transform"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
        <img 
          src={optimizedImage} 
          alt="" 
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] transform duration-[1000ms]" />

      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-premium/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10 flex gap-6 items-start" style={{ transform: "translateZ(40px)" }}>
        {/* Icon Wrapper */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-gold-premium group-hover:text-black group-hover:bg-gradient-gold transition-all duration-300 shadow-lg shadow-black/50">
          {icon}
        </div>

        <div className="flex-1">
          {/* Badge */}
          {badge && (
            <span className="inline-block bg-gold-premium/10 border border-gold-premium/25 text-[9px] font-mono tracking-wider font-bold text-gold-premium px-2 py-0.5 rounded-full mb-3 uppercase shadow-[0_0_10px_rgba(255,196,0,0.2)]">
              {badge}
            </span>
          )}

          <h3 className="text-xl font-display font-black text-white mb-2 group-hover:text-gold-premium transition-colors duration-200 uppercase tracking-tight">
            {title}
          </h3>
          
          <p className="text-sm font-sans text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t, language } = useLanguage();

  const facilities = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: t('feat1Title'),
      description: t('feat1Desc'),
      badge: language === 'en' ? 'Facility' : 'ಸೌಲಭ್ಯ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845403/_A0A4956_tno3se.jpg'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('feat2Title'),
      description: t('feat2Desc'),
      badge: language === 'en' ? 'Cardio' : 'ಕಾರ್ಡಿಯೋ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('feat3Title'),
      description: t('feat3Desc'),
      badge: language === 'en' ? 'Coaching' : 'ತರಬೇತಿ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845316/_A0A5580_dbtzio.jpg'
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: t('feat5Title'),
      description: t('feat5Desc'),
      badge: language === 'en' ? 'Strength' : 'ಬಲ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845390/_A0A4944_djqbto.jpg'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: t('feat6Title'),
      description: t('feat6Desc'),
      badge: language === 'en' ? 'Bio-Metric' : 'ಬಯೋ-ಮೆಟ್ರಿಕ್',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: t('feat4Title'),
      description: t('feat4Desc'),
      badge: language === 'en' ? 'Results' : 'ಫಲಿತಾಂಶಗಳು',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg'
    }
  ];

  const servicePrograms = [
    { title: language === 'en' ? 'Personal Training' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ', path: '/personal-training-kengeri', desc: language === 'en' ? '1-on-1 coaching with custom nutrition.' : '೧-ಆನ್-೧ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನ.' },
    { title: language === 'en' ? 'Weight Loss Training' : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ', path: '/weight-loss-training-kengeri', desc: language === 'en' ? 'Metabolic fat burn conditioning.' : 'ಸುಸ್ಥಿರ ಕೊಬ್ಬು ಇಳಿಕೆ ಯೋಜನೆ.' },
    { title: language === 'en' ? 'Muscle Building & Strength' : 'ಸ್ನಾಯು ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ', path: '/muscle-building-kengeri', desc: language === 'en' ? 'Hypertrophy and progressive overload.' : 'ಸ್ನಾಯು ಬಲವರ್ಧನೆ ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್.' },
    { title: language === 'en' ? "Women's Fitness" : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್', path: '/womens-fitness-kengeri', desc: language === 'en' ? 'Private cardio & body sculpting.' : 'ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮತ್ತು ಬಾಡಿ ಟೋನಿಂಗ್.' },
    { title: language === 'en' ? 'Group Fitness & Functional' : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್', path: '/group-fitness', desc: language === 'en' ? 'High-energy Zumba & HIIT classes.' : 'ಜುಂಬಾ ಮತ್ತು ಹೈ-ಎನರ್ಜಿ ಗ್ರೂಪ್ ಕ್ಲಾಸ್‌ಗಳು.' },
    { title: language === 'en' ? 'Nutrition Guidance' : 'ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ', path: '/nutrition-guidance', desc: language === 'en' ? 'Personalized macro meal plans.' : 'ವೈಯಕ್ತಿಕ ಆಹಾರ ಯೋಜನೆ.' }
  ];

  return (
    <section 
      id="facilities" 
      className="py-16 lg:py-20 bg-black relative overflow-hidden content-auto"
    >
      {/* Background elements - High Brightness Gold Accents */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-premium/40 to-transparent shadow-[0_0_15px_rgba(255,196,0,0.3)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-premium/40 to-transparent shadow-[0_0_15px_rgba(255,196,0,0.3)]" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gold-premium/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-[#FFC400] uppercase font-semibold">
            {t('featuresTag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-3 mb-4">
            {t('featuresTitle')} <br className="hidden sm:block" />
            <span className="text-[#FFC400]">{t('featuresTitleGold')}</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFC400] mx-auto mb-6 rounded-full" />
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            {t('featuresSubtitle')}
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((fac, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} className="h-full">
              <FacilityCard
                icon={fac.icon}
                title={fac.title}
                description={fac.description}
                badge={fac.badge}
                image={fac.image}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Localized Training Services in Kengeri internal link row */}
        {onNavigate && (
          <ScrollReveal>
            <div className="bg-[#0A0A0A] border border-zinc-850 p-6 sm:p-8 rounded-3xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FFC400] uppercase tracking-widest block">
                    {language === 'en' ? 'LOCAL TRAINING PROGRAMS' : 'ಸ್ಥಳೀಯ ತರಬೇತಿ ಸೇವೆಗಳು'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                    {language === 'en' ? 'Specialized Training in Kengeri' : 'ಕೆಂಗೇರಿಯಲ್ಲಿ ನಮ್ಮ ವಿಶೇಷ ತರಬೇತಿ'}
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('/gym-in-kengeri')}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-750 hover:border-[#FFC400] text-xs font-mono font-bold uppercase text-[#FFC400] rounded-xl transition-all cursor-pointer"
                >
                  {language === 'en' ? 'About Our Kengeri Gym →' : 'ಕೆಂಗೇರಿ ಜಿಮ್ ಬಗ್ಗೆ →'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicePrograms.map((prog, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(prog.path)}
                    className="p-4 bg-black/60 border border-zinc-900 hover:border-[#FFC400]/50 rounded-2xl cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-display font-bold uppercase text-white group-hover:text-[#FFC400] transition-colors">
                        {prog.title}
                      </h4>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FFC400] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-zinc-400 font-sans">{prog.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}

