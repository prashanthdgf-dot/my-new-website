import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, MEMBERSHIP_PLANS_LOC, TRAINERS_LOC, TESTIMONIALS_LOC, GALLERY_ITEMS_LOC, FAQS_LOC, Language, FAQItemType } from './translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  membershipPlans: any[];
  trainers: any[];
  testimonials: any[];
  galleryItems: any[];
  faqs: FAQItemType[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'kn' || urlLang === 'en') {
          return urlLang;
        }
      } catch {
        // Fallback to localStorage
      }
      const saved = localStorage.getItem('dhanus-language');
      return (saved === 'kn' ? 'kn' : 'en') as Language;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('dhanus-language', language);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'kn' : 'en'));
  };

  const t = (key: string): string => {
    const translationSet = (TRANSLATIONS as any)[language] || (TRANSLATIONS as any)['en'];
    return translationSet[key] || (TRANSLATIONS as any)['en']?.[key] || key;
  };

  const membershipPlans = (MEMBERSHIP_PLANS_LOC as any)[language] || (MEMBERSHIP_PLANS_LOC as any)['en'];
  const trainers = (TRAINERS_LOC as any)[language] || (TRAINERS_LOC as any)['en'];
  const testimonials = (TESTIMONIALS_LOC as any)[language] || (TESTIMONIALS_LOC as any)['en'];
  const galleryItems = (GALLERY_ITEMS_LOC as any)[language] || (GALLERY_ITEMS_LOC as any)['en'];
  const faqs = (FAQS_LOC as any)[language] || (FAQS_LOC as any)['en'];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        membershipPlans,
        trainers,
        testimonials,
        galleryItems,
        faqs,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
