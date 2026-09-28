import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { MessageSquare, Calendar, Shield, Award, Users, TrendingUp } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import { triggerGoldBurst, triggerGoldShower } from '../utils/confetti';
import TransformationCarousel from './TransformationCarousel';
import CrowdMeter from './CrowdMeter';
import { 
  InstagramLogo, YouTubeLogo, FacebookLogo, WhatsAppLogo, GmailLogo, GoogleMapsLogo, WebsiteLogo 
} from './SocialIcons';

export default function Hero() {
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformations for 3D effect
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    // Only run parallax on desktop with fine mouse pointer
    const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!hasFinePointer) return;

    let isHeroVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHeroVisible || !heroRef.current) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black perspective-1000 scroll-mt-24"
    >
      {/* Immersive Dark Gym Atmosphere Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-50 will-change-transform"
        style={{ 
          x: useTransform(smoothX, [-0.5, 0.5], [-30, 30]),
          y: useTransform(smoothY, [-0.5, 0.5], [-30, 30]),
          scale: 1.1
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img
          src="https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_1920/v1782845589/_A0A5520_ewwv0e.jpg"
          srcSet="https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_768/v1782845589/_A0A5520_ewwv0e.jpg 768w, https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_1280/v1782845589/_A0A5520_ewwv0e.jpg 1280w, https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_1920/v1782845589/_A0A5520_ewwv0e.jpg 1920w"
          sizes="100vw"
          alt="Dhanus Gold Fitness Kengeri Premium Gym Floor"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-60"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative Gold Light Beams - Enhanced Brightness */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-premium/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gold-premium/10 rounded-full blur-[160px] pointer-events-none animate-pulse-gold" />
      
      {/* Vertical Light Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold-premium/20 to-transparent blur-[1px]" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold-premium/20 to-transparent blur-[1px]" />
      </div>

      {/* Content Container with Responsive Two-Column Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{ rotateX, rotateY, x: translateX, y: translateY }}
        >
          
          {/* Left Column: Brand Statement & Core CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            {/* Social Media Quick Links - Original Brand Logos */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-8">
              {[
                { icon: YouTubeLogo, href: CONTACT_INFO.social.youtube, label: 'YouTube', borderHover: 'hover:border-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]' },
                { icon: InstagramLogo, href: CONTACT_INFO.social.instagram, label: 'Instagram', borderHover: 'hover:border-[#E1306C] hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]' },
                { icon: FacebookLogo, href: CONTACT_INFO.social.facebookPage, label: 'Facebook', borderHover: 'hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]' },
                { icon: WhatsAppLogo, href: CONTACT_INFO.social.whatsapp, label: 'WhatsApp (+919740018911)', borderHover: 'hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]' },
                { icon: GoogleMapsLogo, href: CONTACT_INFO.social.map, label: 'Google Maps Location', borderHover: 'hover:border-[#4285F4] hover:shadow-[0_0_20px_rgba(66,133,244,0.4)]' },
                { icon: GmailLogo, href: CONTACT_INFO.social.email, label: 'Gmail (dhanusgoldfitness@gmail.com)', borderHover: 'hover:border-[#EA4335] hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]' },
                { icon: WebsiteLogo, href: CONTACT_INFO.social.website, label: 'Official Website', borderHover: 'hover:border-[#FFC400] hover:shadow-[0_0_20px_rgba(255,196,0,0.4)]' }
              ].map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <motion.a 
                    key={`${social.label}-${i}`}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -5, scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-2.5 sm:p-3 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-300 ${social.borderHover}`}
                    aria-label={`Open Dhanus Gold Fitness ${social.label}`}
                    title={social.label}
                  >
                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                );
              })}
            </div>

            {/* Localized Live Badge with Gold Accent */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex self-start items-center gap-2 bg-zinc-900/95 border border-gold-premium/40 px-4 py-2 rounded-full mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(255,196,0,0.2)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-premium opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-premium"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-gold-premium uppercase">
                {t('heroBadge')}
              </span>
            </motion.div>

            {/* Main SEO Local Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white tracking-tight leading-[0.95] mb-6"
            >
              <span className="block drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{t('heroTitlePart1')}</span>
              <span className="text-gold-premium text-glow-gold block mt-2">
                {t('heroTitlePart2')}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 mb-10 font-sans leading-relaxed max-w-2xl"
            >
              {t('heroSubtitle')}
            </motion.p>

            {/* Live Gym Crowd Meter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CrowdMeter />
            </motion.div>

            {/* Premium CTA Buttons with gold pulse effect */}
            <div className="flex flex-col sm:flex-row gap-5 mt-10 mb-12">
              <motion.a
                id="hero-primary-cta"
                href="#plans"
                onClick={triggerGoldBurst}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 196, 0, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-gold-premium hover:bg-gold-400 text-black font-sans font-black px-10 py-5 rounded-2xl shadow-[0_0_20px_rgba(255,196,0,0.3)] transition-all duration-300 text-center animate-gold-pulse uppercase tracking-wider text-lg"
              >
                <Calendar className="w-6 h-6 text-black" />
                <span>{t('heroCtaJoin')}</span>
              </motion.a>
              
              <motion.a
                id="hero-whatsapp-inquiry"
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  language === 'en' 
                    ? 'Hi Dhanus Gold Fitness, I am interested in joining your Kengeri gym. Please share details on membership plans and personal training.'
                    : 'ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್, ಕೆಂಗೇರಿ ಜಿಮ್ ಸದಸ್ಯತ್ವ ಮತ್ತು ವೈಯಕ್ತಿಕ ತರಬೇತಿಯ ವಿವರಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಬೇಕಿತ್ತು.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerGoldShower}
                whileHover={{ scale: 1.05, borderColor: "rgba(255, 196, 0, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-zinc-900/90 hover:bg-zinc-850 border border-white/10 px-10 py-5 rounded-2xl text-white font-sans font-bold transition-all duration-300 text-center text-lg"
              >
                <MessageSquare className="w-6 h-6 text-gold-premium fill-gold-premium/10" />
                <span>{language === 'en' ? 'Inquire on WhatsApp' : 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ'}</span>
              </motion.a>
            </div>

            {/* Core USP Badges Grid (Dynamic from translations) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/5">
              {[
                { icon: Award, title: t('usp1Title'), sub: t('usp1Sub') },
                { icon: Shield, title: t('usp4Title'), sub: t('usp4Sub') },
                { icon: Users, title: t('usp2Title'), sub: t('usp2Sub') },
                { icon: TrendingUp, title: t('usp3Title'), sub: t('usp3Sub') }
              ].map((usp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 bg-zinc-900/80 rounded-2xl border border-white/5 group-hover:border-gold-premium/40 transition-colors shadow-lg">
                    <usp.icon className="w-6 h-6 text-gold-premium" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-display font-black text-white leading-tight uppercase group-hover:text-gold-premium transition-colors">{usp.title}</div>
                    <div className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase group-hover:text-zinc-400 transition-colors">
                      {usp.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Immersive Before/After Transformation Slider */}
          <motion.div 
            className="lg:col-span-5 w-full flex flex-col justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Minimal Header label above the carousel */}
            <div className="mb-6 flex items-center justify-center lg:justify-start gap-3">
              <span className="w-3 h-3 rounded-full bg-gold-premium shadow-[0_0_12px_#FFC400] animate-pulse" />
              <h3 className="text-sm sm:text-base font-display font-black tracking-[0.2em] text-white uppercase drop-shadow-lg">
                {language === 'en' ? 'REAL MEMBER TRANSFORMATIONS' : 'ನಿಜವಾದ ಸದಸ್ಯರ ಪರಿವರ್ತನೆಗಳು'}
              </h3>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold-premium/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <TransformationCarousel />
            </div>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Dynamic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-premium to-transparent" />
      </motion.div>
    </section>
  );
}

