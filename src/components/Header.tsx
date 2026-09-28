import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, MessageSquare, Sun, Moon, Globe, 
  Search, Dumbbell, UserCheck, Calculator, Sparkles, MapPin, 
  ArrowRight, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import { triggerGoldBurst } from '../utils/confetti';
import { SEARCH_INDEX, searchGymContent, SearchItem } from '../data/searchIndex';
import SocialLinksBar, { CORE_FOUR_SOCIAL_LINKS } from './SocialIcons';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ theme, toggleTheme, currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef('');

  const navLinks = [
    { name: language === 'en' ? 'Home' : 'ಮುಖಪುಟ', href: '/' },
    { name: language === 'en' ? 'About' : 'ನಮ್ಮ ಬಗ್ಗೆ', href: '/about' },
    { name: language === 'en' ? 'Training' : 'ತರಬೇತಿ', href: '/training' },
    { name: language === 'en' ? 'Transformations' : 'ಪರಿವರ್ತನೆಗಳು', href: '/transformations' },
    { name: language === 'en' ? 'Trainers' : 'ತರಬೇತುದಾರರು', href: '/trainers' },
    { name: language === 'en' ? 'Contact' : 'ಸಂಪರ್ಕಿಸಿ', href: '/contact' },
    { name: language === 'en' ? 'Portal' : 'ಅಡ್ಮಿನ್ ಲಾಗಿನ್', href: '/login' },
  ];

  const quickFilterPills = [
    { label: 'Personal Training', query: 'personal training' },
    { label: language === 'en' ? 'Trainers' : 'ತರಬೇತುದಾರರು', query: 'trainers' },
    { label: language === 'en' ? 'Weight Loss' : 'ತೂಕ ಇಳಿಕೆ', query: 'weight loss' },
    { label: 'BMI', query: 'bmi' },
    { label: language === 'en' ? 'Fees / Pricing' : 'ಶುಲ್ಕ', query: 'pricing' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setIsSearchOpen(false);
    onNavigate(href);
  };

  const handleSearchSelect = (item: SearchItem) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    
    if (item.path !== currentPath) {
      onNavigate(item.path);
      if (item.sectionId) {
        setTimeout(() => {
          const el = document.getElementById(item.sectionId!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Live search calculation
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setSearchResults(searchGymContent(searchQuery));
    } else {
      setSearchResults(SEARCH_INDEX.slice(0, 6)); // Default featured items
    }
  }, [searchQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else if (!isOpen) {
      document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  // Keyboard shortcut: Cmd/Ctrl + K or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isSearchOpen) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;
    let sectionCache: { id: string; href: string; top: number; height: number }[] = [];

    const updateSectionCache = () => {
      sectionCache = navLinks
        .filter((link) => link.href.startsWith('/#') || link.href.startsWith('#'))
        .map((link) => {
          const sectionId = link.href.replace(/^\/?#/, '');
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            return {
              id: sectionId,
              href: link.href,
              top: rect.top + window.scrollY,
              height: rect.height,
            };
          }
          return null;
        })
        .filter(Boolean) as { id: string; href: string; top: number; height: number }[];
    };

    updateSectionCache();
    window.addEventListener('resize', updateSectionCache, { passive: true });

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const shouldBeScrolled = scrollY > 20;

          if (shouldBeScrolled !== isScrolledRef.current) {
            isScrolledRef.current = shouldBeScrolled;
            setIsScrolled(shouldBeScrolled);
          }

          // Direct DOM transform without triggering React re-renders
          if (progressRef.current) {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const totalHeight = docHeight - winHeight;
            if (totalHeight > 0) {
              const ratio = Math.min(Math.max(scrollY / totalHeight, 0), 1);
              progressRef.current.style.transform = `scaleX(${ratio})`;
            }
          }

          // Determine active section from cached coordinates
          if (sectionCache.length > 0) {
            const scrollPosition = scrollY + 160;
            let currentSec = '';

            for (const sec of sectionCache) {
              if (scrollPosition >= sec.top && scrollPosition < sec.top + sec.height) {
                currentSec = sec.href;
              }
            }

            if (scrollY < 120) {
              currentSec = '';
            }

            if (currentSec !== activeSectionRef.current) {
              activeSectionRef.current = currentSec;
              setActiveSection(currentSec);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateSectionCache);
    };
  }, [language]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Service':
        return <Dumbbell className="w-4 h-4 text-[#FFC400]" />;
      case 'Trainer':
        return <UserCheck className="w-4 h-4 text-[#FFC400]" />;
      case 'Tool':
        return <Calculator className="w-4 h-4 text-[#FFC400]" />;
      case 'Facility':
        return <Sparkles className="w-4 h-4 text-[#FFC400]" />;
      default:
        return <Shield className="w-4 h-4 text-[#FFC400]" />;
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-lg border-b border-white/10 shadow-lg py-3'
          : 'bg-black/80 py-5'
      }`}
    >
      {/* Subtle Logo Watermark for Header Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden select-none">
        <img 
          src="https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png"
          className="absolute -left-10 -top-10 w-64 h-64 object-contain grayscale blur-[1px]"
          alt=""
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png"
          className="absolute -right-10 -bottom-10 w-64 h-64 object-contain grayscale blur-[1px] rotate-180"
          alt=""
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          
          {/* Original Brand Logo: Dhanus Gold Fitness */}
          <a 
            id="header-logo" 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')} 
            className="relative flex items-center gap-2 group focus:outline-none bg-black/40 p-2 rounded-xl border border-white/5 shadow-inner overflow-hidden"
          >
            {/* Logo Background with Overlay */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
              <img 
                src="https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png"
                alt="" 
                className="w-full h-full object-cover blur-[3px] scale-125 grayscale" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <img
              src="https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png"
              alt="Dhanus Gold Fitness"
              className={`relative z-10 w-auto object-contain transition-all duration-300 transform group-hover:scale-105 rounded-lg ${
                isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16'
              }`}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-sans text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-gold after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-gold-premium after:w-full scale-105'
                      : 'text-gray-300 hover:text-gold-premium hover:after:w-full after:w-0'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Hub (Search, Language, Theme, WhatsApp/Call CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger Button (Desktop & Mobile) */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-[#FFC400]/40 text-gray-400 hover:text-[#FFC400] transition-all duration-200 cursor-pointer shadow-sm group"
              aria-label="Search training services or trainers"
              title="Search gym services, trainers, tools (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-[#FFC400] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-sans text-zinc-400 group-hover:text-zinc-200">
                {language === 'en' ? 'Search services...' : 'ಹುಡುಕಿ...'}
              </span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Desktop Language Switcher */}
            <div className="hidden sm:flex items-center bg-zinc-950 border border-white/10 rounded-xl p-1 gap-1">
              <button
                id="lang-toggle-en"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-gold-premium text-black shadow-md font-extrabold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                id="lang-toggle-kn"
                onClick={() => setLanguage('kn')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  language === 'kn'
                    ? 'bg-gold-premium text-black shadow-md font-extrabold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Theme Toggle (Desktop & Mobile) */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/10 text-gold-premium hover:text-white hover:border-gold-premium/40 transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden relative"
              aria-label="Toggle visual theme"
              title={theme === 'dark' ? 'Switch to Golden Light Mode' : 'Switch to High-Contrast Dark Mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Desktop Direct Social Handles (Instagram, Facebook, YouTube, LinkedIn) */}
            <div className="hidden 2xl:flex items-center gap-1.5 border-l border-white/10 pl-3">
              {CORE_FOUR_SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  title={social.name}
                  className={`p-1.5 rounded-lg bg-zinc-950/80 border border-white/10 hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5 ${social.brandColor}`}
                >
                  <span className="[&>svg]:w-4 [&>svg]:h-4 block">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Desktop Direct Phone CTA */}
            <a
              id="header-phone-cta"
              href={`tel:${CONTACT_INFO.phoneNumber.replace(/\s+/g, '')}`}
              className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-gray-300 hover:text-gold-premium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-premium" />
              <span>{CONTACT_INFO.phoneNumber}</span>
            </a>

            {/* Desktop Join Gold CTA */}
            <div className="hidden sm:block">
              <a
                id="header-whatsapp-cta"
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  language === 'en' 
                    ? 'Hi Dhanus Gold Fitness, I am viewing your website and want to know more about your premium gym services and facilities!'
                    : 'ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್, ನಾನು ನಿಮ್ಮ ವೆಬ್‌ಸೈಟ್ ನೋಡಿ ನಿಮ್ಮ ಜಿಮ್ ಸೌಲಭ್ಯಗಳ ಬಗ್ಗೆ ತಿಳಿಯಲು ಬಯಸುತ್ತೇನೆ!'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerGoldBurst}
                className="flex items-center gap-2 bg-gradient-gold text-black font-sans font-extrabold text-xs xl:text-sm px-3.5 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-200 animate-gold-pulse"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>{language === 'en' ? 'Join Gold' : 'ಜಿಮ್ ಸೇರಿ'}</span>
              </a>
            </div>

            {/* Mobile Language Toggle */}
            <button
              id="lang-toggle-mobile"
              onClick={toggleLanguage}
              className="flex sm:hidden px-2.5 py-1.5 rounded-xl bg-zinc-950 border border-white/10 text-gold-premium text-[10px] font-extrabold hover:text-white transition-all duration-300 items-center gap-1 cursor-pointer"
              aria-label="Toggle language to Kannada or English"
            >
              <Globe className="w-3.5 h-3.5 text-gold-premium" />
              <span>{language === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 lg:hidden rounded-md text-gray-400 hover:text-gold-premium hover:bg-zinc-900 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Golden Scroll Progress Indicator Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5 overflow-hidden z-50 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full w-full bg-gradient-gold origin-left will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Mobile-Optimized Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[#090909] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Search Header Bar */}
              <div className="p-4 sm:p-5 border-b border-zinc-850 flex items-center gap-3 bg-[#0D0D0D]">
                <Search className="w-5 h-5 text-[#FFC400] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Search training programs, trainers, BMI, pricing...'
                      : 'ತರಬೇತಿ ಸೇವೆಗಳು, ತರಬೇತುದಾರರು, ಶುಲ್ಕ ಹುಡುಕಿ...'
                  }
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-zinc-400 hover:text-white rounded-md cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-2.5 py-1 text-xs font-mono font-bold bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Quick Filter Tag Buttons */}
              <div className="px-4 sm:px-5 py-3 border-b border-zinc-900 bg-black flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest shrink-0">
                  {language === 'en' ? 'Quick:' : 'ತ್ವರಿತ:'}
                </span>
                {quickFilterPills.map((pill) => (
                  <button
                    key={pill.label}
                    onClick={() => setSearchQuery(pill.query)}
                    className="px-3 py-1 bg-zinc-900/80 hover:bg-[#FFC400]/15 hover:text-[#FFC400] border border-zinc-800 hover:border-[#FFC400]/40 rounded-full text-xs font-sans text-zinc-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Search Results List */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 scrollbar-thin">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSearchSelect(item)}
                      className="w-full text-left p-3.5 sm:p-4 bg-zinc-950/60 hover:bg-[#FFC400]/10 border border-zinc-850 hover:border-[#FFC400]/40 rounded-2xl transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-[#FFC400]/50 transition-colors">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-display font-black text-white group-hover:text-[#FFC400] transition-colors truncate">
                              {language === 'en' ? item.title : item.kannadaTitle}
                            </h4>
                            <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                              {language === 'en' ? item.category : item.kannadaCategory}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-zinc-400 line-clamp-1 mt-0.5">
                            {language === 'en' ? item.description : item.kannadaDescription}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#FFC400] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12 text-zinc-500">
                    <p className="text-sm font-sans mb-1">
                      {language === 'en' ? 'No matching services or trainers found.' : 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {language === 'en' ? 'Try searching "personal training", "prashanth", "weight loss", or "bmi".' : 'ಉದಾಹರಣೆಗೆ "ತರಬೇತಿ", "ಪ್ರಶಾಂತ್", ಅಥವಾ "ತೂಕ" ಹುಡುಕಿ.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Search Footer */}
              <div className="p-3 border-t border-zinc-900 bg-[#070707] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Dhanus Gold Fitness Search</span>
                <span className="hidden sm:inline">Press ESC to dismiss</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation Menu via AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 z-45 bg-black/75 backdrop-blur-sm"
            />

            {/* Sliding Premium Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-[#070707] border-l border-[#FFC400]/10 flex flex-col justify-between shadow-2xl shadow-black"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0B0B0B]">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="flex items-center gap-2.5 group cursor-pointer"
                  title="Dhanus Gold Fitness - Home"
                >
                  <img
                    src="https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png"
                    alt="Dhanus Gold Fitness"
                    className="h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-display font-black text-gold-premium tracking-wider uppercase leading-none">
                    Dhanus Gold<br/><span className="text-[9px] text-zinc-500 font-sans tracking-widest font-bold">Kengeri Gym</span>
                  </span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-gold-premium hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2.5 scrollbar-thin">
                {/* Search Quick Button in Mobile Menu */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 py-3 px-4 rounded-xl bg-zinc-900 border border-[#FFC400]/20 text-[#FFC400] text-xs font-mono font-bold uppercase transition-all mb-4"
                >
                  <Search className="w-4 h-4" />
                  <span>{language === 'en' ? 'Search Services & Trainers' : 'ಸೇವೆಗಳು & ಕೋಚ್ ಹುಡುಕಿ'}</span>
                </button>

                {navLinks.map((link, idx) => {
                  const isActive = currentPath === link.href;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`block font-display text-base font-extrabold uppercase py-3 px-4 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? 'bg-zinc-950 border-[#FFC400]/20 text-[#FFC400] pl-5 shadow-inner'
                          : 'bg-transparent border-transparent text-gray-300 hover:bg-zinc-900 hover:text-white hover:pl-5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />}
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom Drawer Actions & Social Media */}
              <div className="p-6 border-t border-white/5 bg-[#0B0B0B] space-y-4">
                {/* Original Social Media Handles */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                    {language === 'en' ? 'Follow & Connect' : 'ಸಾಮಾಜಿಕ ತಾಣಗಳು'}
                  </span>
                  <SocialLinksBar className="flex items-center gap-2 justify-between" itemClassName="p-2" />
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={`tel:${CONTACT_INFO.phoneNumber.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-zinc-950 font-mono text-sm text-gray-300 hover:text-gold-premium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#FFC400]" />
                    <span>{CONTACT_INFO.phoneNumber}</span>
                  </a>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                      language === 'en' 
                        ? 'Hi Dhanus Gold Fitness, I am interested in visiting your Kengeri gym. Please share details.'
                        : 'ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್, ನಾನು ನಿಮ್ಮ ಕೆಂಗೇರಿ ಜಿಮ್‌ಗೆ ಭೇಟಿ ನೀಡಲು ಆಸಕ್ತಿ ಹೊಂದಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setIsOpen(false);
                      triggerGoldBurst();
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-gold text-black font-sans font-black text-sm py-3.5 rounded-xl shadow-lg active:scale-98 transition-all duration-200"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>{language === 'en' ? 'JOIN DHANUS FITNESS' : 'ಧನುಸ್ ಫಿಟ್ನೆಸ್ ಸೇರಿ'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
