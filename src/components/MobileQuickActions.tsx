import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  X, 
  Dumbbell, 
  UserCheck, 
  MapPin, 
  ChevronRight, 
  ExternalLink,
  Sparkles,
  Phone,
  Clock
} from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import { GoogleMapsLogo, WhatsAppLogo, InstagramLogo } from './SocialIcons';

interface MobileQuickActionsProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function MobileQuickActions({ onNavigate, currentPath }: MobileQuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Optional: Prevent background scrolling when open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  const handleActionClick = (path: string, isExternal: boolean = false) => {
    setIsOpen(false);
    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(path);
      // If navigating to home section or contact, scroll smoothly
      if (path.includes('#')) {
        const id = path.split('#')[1];
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  const quickActions = [
    {
      id: 'membership-plans',
      title: language === 'en' ? 'Membership Plans' : 'ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳು',
      subtitle: language === 'en' ? 'Pricing, discounts & duration packages' : 'ಶುಲ್ಕ, ರಿಯಾಯಿತಿ ಮತ್ತು ಪ್ಯಾಕೇಜ್‌ಗಳು',
      badge: language === 'en' ? 'Special Offers' : 'ವಿಶೇಷ ಆಫರ್',
      icon: <Dumbbell className="w-5 h-5 text-black" />,
      iconBg: 'bg-gradient-gold',
      onClick: () => handleActionClick('/contact'),
      isExternal: false,
    },
    {
      id: 'trainer-booking',
      title: language === 'en' ? 'Trainer Booking' : 'ತರಬೇತುದಾರರ ಬುಕಿಂಗ್',
      subtitle: language === 'en' ? '1-on-1 PT consultation & trial' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಹಾಗೂ ಸಮಾಲೋಚನೆ',
      badge: language === 'en' ? 'Free Consult' : 'ಉಚಿತ ಸಮಾಲೋಚನೆ',
      icon: <UserCheck className="w-5 h-5 text-black" />,
      iconBg: 'bg-[#FFC400]',
      onClick: () => handleActionClick('/training'),
      isExternal: false,
    },
    {
      id: 'find-us-on-maps',
      title: language === 'en' ? 'Find Us on Maps' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ಹುಡುಕಿ',
      subtitle: language === 'en' ? 'Hoysala Circle, Kengeri Satellite Town' : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಸ್ಯಾಟಲೈಟ್ ಟೌನ್',
      badge: language === 'en' ? 'Directions' : 'ಮಾರ್ಗಸೂಚಿ',
      icon: <GoogleMapsLogo className="w-5 h-5" />,
      iconBg: 'bg-zinc-850',
      onClick: () => handleActionClick(CONTACT_INFO.social.map, true),
      isExternal: true,
    },
  ];

  return (
    <div ref={menuRef} className="fixed bottom-6 left-6 z-40 md:hidden select-none">
      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Expanded Quick Actions Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-16 left-0 w-[calc(100vw-3rem)] max-w-sm bg-gradient-to-b from-zinc-900 to-black border-2 border-[#FFC400]/40 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,196,0,0.15)] z-40 overflow-hidden"
          >
            {/* Ambient Background Gold Flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC400]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Menu Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-gold flex items-center justify-center text-black font-black text-xs shadow-md">
                  <Zap className="w-4 h-4 fill-black" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-black text-white uppercase tracking-wider">
                    {language === 'en' ? 'Quick Actions' : 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು'}
                  </h3>
                  <p className="text-[9px] font-mono text-[#FFC400] font-bold uppercase tracking-wider">
                    Dhanus Gold Fitness
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close Quick Actions Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action Items List */}
            <div className="space-y-2.5">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.05 }}
                  onClick={action.onClick}
                  className="w-full text-left p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-850 border border-white/10 hover:border-[#FFC400]/60 active:scale-[0.98] transition-all duration-200 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                      {action.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-display font-black text-white group-hover:text-[#FFC400] transition-colors uppercase tracking-tight">
                          {action.title}
                        </span>
                        {action.badge && (
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 bg-[#FFC400]/15 text-[#FFC400] border border-[#FFC400]/30 rounded-full uppercase">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-sans text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-1 mt-0.5">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-zinc-500 group-hover:text-[#FFC400] transition-colors pl-2 shrink-0">
                    {action.isExternal ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Direct Touchpoints (WhatsApp, Instagram, Direct Call) */}
            <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-3 gap-1.5">
              <a
                href={CONTACT_INFO.permanentLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-950/80 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 flex flex-col items-center justify-center gap-1 transition-colors text-center group"
                aria-label="WhatsApp Dhanus Gold Fitness"
              >
                <WhatsAppLogo className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-zinc-300 group-hover:text-[#25D366]">WhatsApp</span>
              </a>

              <a
                href={CONTACT_INFO.permanentLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-950/80 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/40 flex flex-col items-center justify-center gap-1 transition-colors text-center group"
                aria-label="Instagram Profile"
              >
                <InstagramLogo className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-zinc-300 group-hover:text-[#E1306C]">Instagram</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                className="p-2 rounded-xl bg-zinc-950/80 hover:bg-[#FFC400]/20 border border-white/10 hover:border-[#FFC400]/40 flex flex-col items-center justify-center gap-1 transition-colors text-center group"
                aria-label="Call Dhanus Gold Fitness"
              >
                <Phone className="w-4 h-4 text-[#FFC400] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-zinc-300 group-hover:text-[#FFC400]">Call Now</span>
              </a>
            </div>

            {/* Timings / Location Footer Strip */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-400 px-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FFC400]" />
                5:30 AM – 10:00 PM
              </span>
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-[#FFC400] font-bold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                {CONTACT_INFO.phoneNumber}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        id="quick-actions-floating-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-2 px-3.5 py-3 rounded-full border-2 shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300 z-40 ${
          isOpen
            ? 'bg-zinc-900 border-[#FFC400] text-[#FFC400] shadow-[0_0_20px_rgba(255,196,0,0.4)]'
            : 'bg-gradient-gold border-yellow-300 text-black shadow-[0_0_20px_rgba(255,196,0,0.3)]'
        }`}
        aria-label={isOpen ? 'Close Quick Actions' : 'Open Quick Actions Menu'}
        aria-expanded={isOpen}
      >
        {/* Glow Halo */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#FFC400]/30 blur-md opacity-75 animate-pulse pointer-events-none" />
        )}

        <div className="relative z-10 flex items-center gap-1.5">
          {isOpen ? (
            <X className="w-5 h-5 text-[#FFC400]" />
          ) : (
            <Zap className="w-5 h-5 fill-black text-black" />
          )}
          <span className="text-xs font-display font-black tracking-wider uppercase">
            {isOpen 
              ? (language === 'en' ? 'Close' : 'ಮುಚ್ಚು')
              : (language === 'en' ? 'Quick Actions' : 'ತ್ವರಿತ ಕ್ರಿಯೆ')}
          </span>
        </div>

        {/* Pulse Dot */}
        {!isOpen && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
