import { useState, useEffect, lazy, Suspense, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import MobileQuickActions from './components/MobileQuickActions';
import GoldLoader from './components/GoldLoader';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent, { readConsent } from './components/CookieConsent';
import { useLanguage } from './LanguageContext';
import { updateMetaTags } from './lib/seo';
import { getSupabaseClient, adminRoleFor } from './lib/supabase';

// =========================================================================
// CODE-SPLITTING MAJOR FEATURE COMPONENTS (React.lazy)
// =========================================================================
const Gallery = lazy(() => import('./components/Gallery'));
const Trainers = lazy(() => import('./components/Trainers'));
const FAQ = lazy(() => import('./components/FAQ'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TransformationGallery = lazy(() => import('./components/TransformationGallery'));
const Founders = lazy(() => import('./components/Founders'));
const PromoVideo = lazy(() => import('./components/PromoVideo'));
const BMICalculator = lazy(() => import('./components/BMICalculator'));
const ContactAndLocation = lazy(() => import('./components/ContactAndLocation'));

// Code-split major route subpages
const AboutPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.AboutPage }))
);
const TrainingPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.TrainingPage }))
);
const TransformationsPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.TransformationsPage }))
);
const TrainersPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.TrainersPage }))
);
const ContactPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.ContactPage }))
);
const LoginPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.LoginPage }))
);
const AdsHubPage = lazy(() =>
  import('./components/Pages').then((module) => ({ default: module.AdsHubPage }))
);

// Code-split dedicated Local SEO Subpages
const GymInKengeriPage = lazy(() => import('./components/seo-pages/GymInKengeriPage'));
const PersonalTrainingPage = lazy(() => import('./components/seo-pages/PersonalTrainingPage'));
const WeightLossPage = lazy(() => import('./components/seo-pages/WeightLossPage'));
const MuscleBuildingPage = lazy(() => import('./components/seo-pages/MuscleBuildingPage'));
const WomensFitnessPage = lazy(() => import('./components/seo-pages/WomensFitnessPage'));
const GroupFitnessPage = lazy(() => import('./components/seo-pages/GroupFitnessPage'));
const NutritionGuidancePage = lazy(() => import('./components/seo-pages/NutritionGuidancePage'));
const ReviewsPage = lazy(() => import('./components/seo-pages/ReviewsPage'));
const FAQPage = lazy(() => import('./components/seo-pages/FAQPage'));
const ContactKengeriPage = lazy(() => import('./components/seo-pages/ContactKengeriPage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));
const IntegrationsDashboard = lazy(() => import('./components/IntegrationsDashboard'));

/**
 * Minimalist gold-themed suspense placeholder
 */
function SectionSkeleton({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`w-full ${height} bg-[#070707] border-y border-zinc-900/60 flex items-center justify-center relative overflow-hidden animate-pulse`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#FFC400]/20 border-t-[#FFC400] animate-spin" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FFC400]/60">
          Loading Section...
        </span>
      </div>
    </div>
  );
}

/**
 * Complete Route-Specific SEO & Open Graph Configuration for Search Engine CTR Optimization
 */
interface RouteMetaItem {
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  image: string;
  canonicalPath: string;
}

const ROUTE_SEO_CONFIG: Record<string, RouteMetaItem> = {
  '/': {
    titleEn: 'Best Gym in Kengeri | Personal Training | Dhanus Gold Fitness',
    titleKn: 'ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಜಿಮ್ | ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descEn: 'Dhanus Gold Fitness is a premier 3-floor luxury fitness center in Kengeri Bengaluru offering personal training, strength coaching, weight loss, and bodybuilding.',
    descKn: 'ಕೆಂಗೇರಿಯ ಹೊಯ್ಸಳ ಸರ್ಕಲ್‌ನಲ್ಲಿರುವ ೩ ಅಂತಸ್ತಿನ ಪ್ರೀಮಿಯಂ ಜಿಮ್. ಪ್ರಮಾಣೀಕೃತ ಕೋಚ್‌ಗಳಿಂದ ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ತೂಕ ಇಳಿಸುವ ತರಬೇತಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/',
  },
  '/trainers': {
    titleEn: 'Certified Personal Trainers in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ಪ್ರಮಾಣೀಕೃತ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರರು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
    descEn: 'Meet 7+ certified coaches and personal trainers at Dhanus Gold Fitness Kengeri. Expert guidance in bodybuilding, fat loss, and strength training. Book a free 1-on-1 trial!',
    descKn: 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನ ಪ್ರಮಾಣೀಕೃತ ಕೋಚ್‌ಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ. ಬಾಡಿಬಿಲ್ಡಿಂಗ್, ತೂಕ ಇಳಿಕೆ ಮತ್ತು ಶಕ್ತಿ ತರಬೇತಿಯಲ್ಲಿ ಪರಿಣಿತ ಮಾರ್ಗದರ್ಶನ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845316/_A0A5580_dbtzio.jpg',
    canonicalPath: '/trainers',
  },
  '/training': {
    titleEn: 'Personal Training & Fitness Programs in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ & ಫಿಟ್‌ನೆಸ್ ಕೋರ್ಸ್‌ಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Explore personal training, strength workouts, bodybuilding, fat loss, and customized workout programs at Dhanus Gold Fitness in Kengeri, Bengaluru.',
    descKn: 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನಲ್ಲಿ ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ, ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ತೂಕ ಇಳಿಕೆ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/training',
  },
  '/gym-services-kengeri': {
    titleEn: 'Gym Services & Premium Facilities in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ಕೆಂಗೇರಿಯ ಜಿಮ್ ಸೇವೆಗಳು & ಸೌಲಭ್ಯಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Explore 3 floors of world-class imported equipment, steam bath, free weights, personal training, and group classes in Kengeri Satellite Town.',
    descKn: 'ಸ್ಟೀಮ್ ಬಾತ್, ೩ ಮಹಡಿಗಳ ಸುಸಜ್ಜಿತ ಜಿಮ್, ಕಾರ್ಡಿಯೋ ಫ್ಲೋರ್ ಮತ್ತು ಪರಿಣಿತ ಕೋಚಿಂಗ್ ಸೌಲಭ್ಯಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/training',
  },
  '/transformations': {
    titleEn: 'Real Member Body Transformations in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ನೈಜ ಸದಸ್ಯರ ದೇಹ ರೂಪಾಂತರ ಫಲಿತಾಂಶಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'View 34+ certified member before & after transformation posters and real results at Dhanus Gold Fitness Kengeri. Proven fat loss and muscle gain success stories!',
    descKn: 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನಲ್ಲಿ ಸಾಧಿಸಿದ ೩೪+ ನೈಜ ಸದಸ್ಯರ ಶಾರೀರಿಕ ರೂಪಾಂತರ ಪೋಸ್ಟರ್‌ಗಳು ಮತ್ತು ತೂಕ ಇಳಿಕೆಯ ಯಶಸ್ಸಿನ ಕಥೆಗಳನ್ನು ನೋಡಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845390/_A0A4944_djqbto.jpg',
    canonicalPath: '/transformations',
  },
  '/body-transformations': {
    titleEn: 'Real Member Body Transformations in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ನೈಜ ಸದಸ್ಯರ ದೇಹ ರೂಪಾಂತರ ಫಲಿತಾಂಶಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'View 34+ certified member before & after transformation posters and real results at Dhanus Gold Fitness Kengeri. Proven fat loss and muscle gain success stories!',
    descKn: 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನಲ್ಲಿ ಸಾಧಿಸಿದ ೩೪+ ನೈಜ ಸದಸ್ಯರ ಶಾರೀರಿಕ ರೂಪಾಂತರ ಪೋಸ್ಟರ್‌ಗಳು ಮತ್ತು ತೂಕ ಇಳಿಕೆಯ ಯಶಸ್ಸಿನ ಕಥೆಗಳನ್ನು ನೋಡಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845390/_A0A4944_djqbto.jpg',
    canonicalPath: '/transformations',
  },
  '/gym-in-kengeri': {
    titleEn: 'Best Gym in Kengeri Satellite Town Bengaluru | Dhanus Gold Fitness',
    titleKn: 'ಕೆಂಗೇರಿ ಸ್ಯಾಟಲೈಟ್ ಟೌನ್‌ನ ಅತ್ಯುತ್ತಮ ಜಿಮ್ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Top-rated 3-floor fitness center at Hoysala Circle, Kengeri. Dedicated cardio floor, certified trainers, steam bath, and flexible memberships.',
    descKn: 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್ ಕೆಂಗೇರಿಯಲ್ಲಿರುವ ನಂ.೧ ಜಿಮ್. ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮಹಡಿ, ಪರಿಣಿತ ಕೋಚ್‌ಗಳು ಮತ್ತು ಸ್ಟೀಮ್ ಬಾತ್ ಸೌಲಭ್ಯ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/gym-in-kengeri',
  },
  '/personal-training-kengeri': {
    titleEn: '1-on-1 Personal Training in Kengeri | Dhanus Gold Fitness',
    titleKn: '೧-ಆನ್-೧ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
    descEn: 'Dedicated personal fitness coaches in Kengeri. Custom diet blueprints, posture correction, and guaranteed fat loss or muscle building results.',
    descKn: 'ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರಿಂದ ವೈಯಕ್ತಿಕ ಫಿಟ್‌ನೆಸ್ ಹಾಗೂ ಆಹಾರ ತರಬೇತಿ ಯೋಜನೆಗಳು. ಖಚಿತ ಫಲಿತಾಂಶ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845316/_A0A5580_dbtzio.jpg',
    canonicalPath: '/personal-training-kengeri',
  },
  '/weight-loss-training-kengeri': {
    titleEn: 'Targeted Weight Loss & Fat Burn Training in Kengeri | Dhanus Gold',
    titleKn: 'ತೂಕ ಇಳಿಸುವ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
    descEn: 'Shed body fat sustainably with scientific metabolic conditioning, calorie tracking, and customized workout protocols in Kengeri Satellite Town.',
    descKn: 'ವೈಜ್ಞಾನಿಕ ತೂಕ ಇಳಿಸುವಿಕೆ ಮತ್ತು ಕೊಬ್ಬು ಕರಗಿಸುವ ಸಮಗ್ರ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ. ಸುಸ್ಥಿರ ಫಲಿತಾಂಶ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845390/_A0A4944_djqbto.jpg',
    canonicalPath: '/weight-loss-training-kengeri',
  },
  '/muscle-building-kengeri': {
    titleEn: 'Muscle Building & Hypertrophy Gym in Kengeri | Dhanus Gold',
    titleKn: 'ಸ್ನಾಯು ಬೆಳೆಸುವ ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಜಿಮ್ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Hypertrophy-focused resistance training with imported heavy-duty biomechanical machines, Olympic barbells, and dumbbell racks in Kengeri.',
    descKn: 'ಸ್ನಾಯು ವೃದ್ಧಿ ಮತ್ತು ದೇಹದಾರ್ಢ್ಯಕ್ಕಾಗಿ ಆಮದು ಮಾಡಿಕೊಂಡ ಅತ್ಯಾಧುನಿಕ ಜಿಮ್ ಉಪಕರಣಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/muscle-building-kengeri',
  },
  '/bodybuilding-gym-kengeri': {
    titleEn: 'Competitive Bodybuilding Gym in Kengeri Bengaluru | Dhanus Gold',
    titleKn: 'ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಜಿಮ್ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
    descEn: 'Professional bodybuilding and powerlifting setup in Kengeri. Expert prep coaching, pose workshops, and advanced hypertrophy techniques.',
    descKn: 'ವೃತ್ತಿಪರ ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಕಟ್ಟುನಿಟ್ಟಿನ ವೇಯ್ಟ್ ಟ್ರೈನಿಂಗ್ ಕೇಂದ್ರ ಕೆಂಗೇರಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/muscle-building-kengeri',
  },
  '/strength-training-kengeri': {
    titleEn: 'Functional Strength & Conditioning Gym in Kengeri | Dhanus Gold',
    titleKn: 'ಫಂಕ್ಷನಲ್ ಸ್ಟ್ರೆಂತ್ & ಕಂಡೀಷನಿಂಗ್ ಜಿಮ್ ಕೆಂಗೇರಿ',
    descEn: 'Free weights, Olympic barbells, squat racks, and functional strength turf in Kengeri Satellite Town Bengaluru.',
    descKn: 'ಸ್ಕ್ವಾಟ್ ರ್ಯಾಕ್‌ಗಳು, ಒಲಿಂಪಿಕ್ ಬಾರ್‌ಬೆಲ್‌ಗಳು ಮತ್ತು ಶಕ್ತಿ ವರ್ಧಕ ವ್ಯಾಯಾಮಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/muscle-building-kengeri',
  },
  '/womens-fitness-kengeri': {
    titleEn: "Women's Fitness & Strength Training in Kengeri | Dhanus Gold",
    titleKn: 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್ & ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Safe, private environment with dedicated female cardio zones, tone-up classes, certified female coaches, and hygienic locker amenities.',
    descKn: 'ಮಹಿಳೆಯರಿಗಾಗಿ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮಹಡಿ, ಸುರಕ್ಷಿತ ವ್ಯಾಯಾಮ ವಾತಾವರಣ ಮತ್ತು ಲೇಡಿಸ್ ಕೋಚಿಂಗ್.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/womens-fitness-kengeri',
  },
  '/group-fitness': {
    titleEn: 'Group Fitness Classes & Zumba in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್ & ಜುಂಬಾ ತರಗತಿಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'High-energy group workouts, HIIT circuits, functional aerobics, and Zumba classes in Kengeri Satellite Town Bengaluru.',
    descKn: 'ಉತ್ಸಾಹಭರಿತ ಗ್ರೂಪ್ ವರ್ಕೌಟ್‌ಗಳು, ಜುಂಬಾ ಮತ್ತು ಫಂಕ್ಷನಲ್ ಏರೋಬಿಕ್ಸ್ ತರಗತಿಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845439/_A0A4988_k33biw.jpg',
    canonicalPath: '/group-fitness',
  },
  '/zumba-classes-kengeri': {
    titleEn: 'Zumba Dance & Aerobics Classes in Kengeri Bengaluru | Dhanus Gold',
    titleKn: 'ಜುಂಬಾ ಡ್ಯಾನ್ಸ್ & ಏರೋಬಿಕ್ಸ್ ಕ್ಲಾಸ್‌ಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Fun calorie-burning Zumba dance fitness sessions led by certified instructors in Kengeri Satellite Town.',
    descKn: 'ಪ್ರಮಾಣೀಕೃತ ಶಿಕ್ಷಕರಿಂದ ವಿನೋದಮಯ ಜುಂಬಾ ನೃತ್ಯ ಮತ್ತು ಕಾರ್ಡಿಯೋ ತರಗತಿಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845439/_A0A4988_k33biw.jpg',
    canonicalPath: '/group-fitness',
  },
  '/nutrition-guidance': {
    titleEn: 'Nutrition Guidance & Diet Planning in Kengeri | Dhanus Gold',
    titleKn: 'ನ್ಯೂಟ್ರಿಷನ್ ಮಾರ್ಗದರ್ಶನ & ಡಯಟ್ ಯೋಜನೆಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Personalized macro meal plans, vegetarian & non-vegetarian muscle building and fat-loss diet blueprints in Kengeri.',
    descKn: 'ಪ್ರತಿಯೊಬ್ಬರ ಜೀವನಶೈಲಿಗೆ ತಕ್ಕಂತೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆಹಾರ ಹಾಗೂ ಪೌಷ್ಟಿಕಾಂಶ ಸಲಹೆಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845403/_A0A4956_tno3se.jpg',
    canonicalPath: '/nutrition-guidance',
  },
  '/reviews': {
    titleEn: '4.9★ Member Reviews & Testimonials | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು & ಅನಿಸಿಕೆಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಕೆಂಗೇರಿ',
    descEn: 'Read genuine reviews from 4,000+ members who transformed their physique at Dhanus Gold Fitness at Hoysala Circle, Kengeri Bengaluru.',
    descKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕುರಿತು ನಮ್ಮ ಸದಸ್ಯರ ನೈಜ ಗೂಗಲ್ ವಿಮರ್ಶೆಗಳು ಮತ್ತು ಅನುಭವಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/reviews',
  },
  '/faq': {
    titleEn: 'Frequently Asked Questions | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಕೆಂಗೇರಿ',
    descEn: 'Find answers about gym timings, membership fees, personal training packages, steam bath, and free trial sessions in Kengeri.',
    descKn: 'ಜಿಮ್ ಸಮಯ, ಶುಲ್ಕ, ಉಚಿತ ಟ್ರಯಲ್ ಮತ್ತು ತರಬೇತಿಯ ಕುರಿತ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
    canonicalPath: '/faq',
  },
  '/about': {
    titleEn: 'About Dhanus Gold Fitness | 9+ Years Legacy in Kengeri',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಬಗ್ಗೆ | ೯+ ವರ್ಷಗಳ ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ',
    descEn: 'Discover our journey since 2015, certified coaching staff, 4,000+ success stories, and modern 3-floor facility at Hoysala Circle, Kengeri.',
    descKn: '೯+ ವರ್ಷಗಳ ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ, ಅತ್ಯುತ್ತಮ ತರಬೇತುದಾರರು ಮತ್ತು ನಮ್ಮ ಫಿಟ್‌ನೆಸ್ ಧ್ಯೇಯ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845439/_A0A4988_k33biw.jpg',
    canonicalPath: '/about',
  },
  '/gym-membership-kengeri': {
    titleEn: 'Gym Membership Plans & Fees in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ಜಿಮ್ ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ಮತ್ತು ಯೋಜನೆಗಳು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Affordable 1-month, 3-month, 6-month, and annual gym membership packages with steam bath and locker access in Kengeri.',
    descKn: 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಕೈಗೆಟುಕುವ ಮಾಸಿಕ, ತ್ರೈಮಾಸಿಕ ಮತ್ತು ವಾರ್ಷಿಕ ಜಿಮ್ ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845439/_A0A4988_k33biw.jpg',
    canonicalPath: '/about',
  },
  '/contact': {
    titleEn: 'Contact Dhanus Gold Fitness | Hoysala Circle Kengeri Bengaluru',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಸಂಪರ್ಕಿಸಿ | ಹೊಯ್ಸಳ ಸರ್ಕಲ್ ಕೆಂಗೇರಿ ಬೆಂಗಳೂರು',
    descEn: 'Visit our 3-floor gym above Trends Junior, Hoysala Circle, Kengeri Outer Ring Road. Call +91 97400 18911 to claim your free workout pass!',
    descKn: 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಔಟರ್ ರಿಂಗ್ ರೋಡ್, ಕೆಂಗೇರಿ. ಉಚಿತ ಟ್ರಯಲ್ ಪಾಸ್‌ಗಾಗಿ ಕರೆ ಮಾಡಿ: +91 97400 18911.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/contact',
  },
  '/contact-kengeri': {
    titleEn: 'Contact Dhanus Gold Fitness | Gym in Kengeri Bengaluru',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸಂಪರ್ಕಿಸಿ | ಕೆಂಗೇರಿ ಬೆಂಗಳೂರು',
    descEn: 'Direct phone numbers, WhatsApp link, address, and operating hours for Dhanus Gold Fitness at Hoysala Circle, Kengeri.',
    descKn: 'ವಿಳಾಸ, ದೂರವಾಣಿ ಸಂಖ್ಯೆ, ವಾಟ್ಸಾಪ್ ಮತ್ತು ತೆರೆಯುವ ಸಮಯದ ಸಂಪೂರ್ಣ ವಿವರಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/contact',
  },
  '/contact-gym-kengeri': {
    titleEn: 'Free Gym Trial & Contact Desk in Kengeri | Dhanus Gold',
    titleKn: 'ಜಿಮ್ ಸಂಪರ್ಕ & ಉಚಿತ ಟ್ರಯಲ್ ಬುಕಿಂಗ್ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Book your free workout trial pass or reach our gym desk at Hoysala Circle, Kengeri Satellite Town Bengaluru.',
    descKn: 'ನಿಮ್ಮ ಉಚಿತ ವ್ಯಾಯಾಮ ಟ್ರಯಲ್ ಪಾಸ್ ಬುಕ್ ಮಾಡಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/contact',
  },
  '/locator': {
    titleEn: 'Store Locator Plus & Gym Directions | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಜಿಮ್ ಲೊಕೇಶನ್ & ಸ್ಟೋರ್ ಲೊಕೇಟರ್ ಪ್ಲಸ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಕೆಂಗೇರಿ',
    descEn: 'Find Dhanus Gold Fitness at Hoysala Circle Kengeri Bengaluru with Google Maps Locator Plus, directions, and distance matrix.',
    descKn: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಲೊಕೇಟರ್ ಪ್ಲಸ್ ಮತ್ತು ನಿಖರವಾದ ದಾರಿಯೊಂದಿಗೆ ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಹುಡುಕಿ.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845589/_A0A5520_ewwv0e.jpg',
    canonicalPath: '/locator',
  },
  '/privacy-policy': {
    titleEn: 'Privacy Policy | Dhanus Gold Fitness Kengeri Bengaluru',
    titleKn: 'ಗೌಪ್ಯತಾ ನೀತಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ',
    descEn: 'Official privacy policy, WhatsApp communication consent, and user data protection terms for Dhanus Gold Fitness.',
    descKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್‌ನ ಅಧಿಕೃತ ಗೌಪ್ಯತಾ ನೀತಿ ಮತ್ತು ಸದಸ್ಯರ ಮಾಹಿತಿ ಸುರಕ್ಷತೆ ನಿಯಮಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
    canonicalPath: '/privacy-policy',
  },
  '/privacy': {
    titleEn: 'Privacy Policy | Dhanus Gold Fitness Kengeri Bengaluru',
    titleKn: 'ಗೌಪ್ಯತಾ ನೀತಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ',
    descEn: 'Official privacy policy, WhatsApp communication consent, and user data protection terms for Dhanus Gold Fitness.',
    descKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್‌ನ ಅಧಿಕೃತ ಗೌಪ್ಯತಾ ನೀತಿ ಮತ್ತು ಸದಸ್ಯರ ಮಾಹಿತಿ ಸುರಕ್ಷತೆ ನಿಯಮಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
    canonicalPath: '/privacy-policy',
  },
  '/integrations': {
    titleEn: 'Integrations & Webhook Hub | Dhanus Gold Fitness',
    titleKn: 'ಇಂಟಿಗ್ರೇಷನ್ಸ್ & ವೆಬ್‌ಹುಕ್ಸ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descEn: 'Webhook endpoints, Meta lead ads integration, WhatsApp API callback configuration, and Firestore data pipelines.',
    descKn: 'ವೆಬ್‌ಹುಕ್ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು, ಮೆಟಾ ಲೀಡ್ ಜಾಹೀರಾತುಗಳು ಮತ್ತು ವಾಟ್ಸಾಪ್ ಎಪಿಐ ಕಾಲ್‌ಬ್ಯಾಕ್‌ಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
    canonicalPath: '/integrations',
  },
  '/webhooks': {
    titleEn: 'Integrations & Webhook Hub | Dhanus Gold Fitness',
    titleKn: 'ಇಂಟಿಗ್ರೇಷನ್ಸ್ & ವೆಬ್‌ಹುಕ್ಸ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descEn: 'Webhook endpoints, Meta lead ads integration, WhatsApp API callback configuration, and Firestore data pipelines.',
    descKn: 'ವೆಬ್‌ಹುಕ್ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು, ಮೆಟಾ ಲೀಡ್ ಜಾಹೀರಾತುಗಳು ಮತ್ತು ವಾಟ್ಸಾಪ್ ಎಪಿಐ ಕಾಲ್‌ಬ್ಯಾಕ್‌ಗಳು.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
    canonicalPath: '/integrations',
  },
  '/login': {
    titleEn: 'Staff & Member Login | Dhanus Gold Fitness',
    titleKn: 'ಲಾಗಿನ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descEn: 'Sign in to access your trainer schedule, lead manager, and fitness portal at Dhanus Gold Fitness.',
    descKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಸದಸ್ಯರ ಲಾಗಿನ್ ಪೋರ್ಟಲ್.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
    canonicalPath: '/login',
  },
  '/ads-hub': {
    titleEn: 'Lead Ads & Campaign Hub | Dhanus Gold Fitness',
    titleKn: 'ಲೀಡ್ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಹಬ್ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descEn: 'Administrative dashboard for Meta lead ad campaigns, conversion tracking, and member inquiries.',
    descKn: 'ಮೆಟಾ ಜಾಹೀರಾತು ಪ್ರಚಾರಗಳು ಮತ್ತು ಲೀಡ್ ನಿರ್ವಹಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png',
    canonicalPath: '/ads-hub',
  },
};

function NotFoundPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="pt-32 pb-24 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <p className="font-mono text-xs tracking-[0.2em] text-[#FFC400] uppercase mb-3">404</p>
      <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-4">Page not found</h1>
      <p className="text-gray-400 max-w-md mb-8">The page you are looking for does not exist or has moved.</p>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('/');
        }}
        className="px-6 py-3 bg-[#FFC400] text-black font-bold rounded-xl"
      >
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dhanus-theme');
      return saved === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [userRole, setUserRole] = useState<string | null>(null);
  const analyticsId = (import.meta as any).env.VITE_GOOGLE_ANALYTICS_ID as string | undefined;
  const [analyticsConsent, setAnalyticsConsent] = useState<'granted' | 'denied' | null>(() => readConsent());
  const { t, language } = useLanguage();

  // Restore a staff session (and react to sign-out) only on the private routes, so normal
  // visitors never load the auth client.
  useEffect(() => {
    if (currentPath !== '/login' && currentPath !== '/ads-hub') return;
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const client = getSupabaseClient();
        const { data } = await client.auth.getSession();
        setUserRole(adminRoleFor(data.session?.user));
        const sub = client.auth.onAuthStateChange((_event, session) => {
          setUserRole(adminRoleFor(session?.user));
        });
        unsub = () => sub.data.subscription.unsubscribe();
      } catch {
        setUserRole(null);
      }
    })();
    return () => unsub?.();
  }, [currentPath]);
  const shouldReduceMotion = useReducedMotion();

  // Dynamic Route SEO & Open Graph Meta Tags (Updates on route or language change)
  useEffect(() => {
    const routeConfig = ROUTE_SEO_CONFIG[currentPath] || ROUTE_SEO_CONFIG['/'];
    const title = language === 'kn' ? routeConfig.titleKn : (currentPath === '/' ? t('metaTitle') : routeConfig.titleEn);
    const description = language === 'kn' ? routeConfig.descKn : (currentPath === '/' ? t('metaDescription') : routeConfig.descEn);
    const image = routeConfig.image;
    const path = routeConfig.canonicalPath;

    updateMetaTags(title, description, image, path);

    // Keep private/unknown pages out of the index
    const isPrivate = ['/login', '/ads-hub', '/integrations', '/webhooks'].includes(currentPath);
    const isUnknown = !ROUTE_SEO_CONFIG[currentPath];
    if (isPrivate || isUnknown) {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.setAttribute('content', 'noindex, nofollow');
      if (isUnknown) document.title = 'Page not found | Dhanus Gold Fitness';
    }
  }, [currentPath, language]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('golden-light');
      document.body.classList.add('golden-light');
    } else {
      root.classList.remove('golden-light');
      document.body.classList.remove('golden-light');
    }
    localStorage.setItem('dhanus-theme', theme);
  }, [theme]);

  useEffect(() => {
    // 1. Dynamic Google Site Verification from Environment Variable
    const verificationCode = (import.meta as any).env.VITE_GOOGLE_SITE_VERIFICATION;
    if (verificationCode) {
      let metaTag = document.querySelector('meta[name="google-site-verification"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'google-site-verification');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', verificationCode);
    }

  }, []);

  // Google Analytics only loads after the visitor accepts cookies
  useEffect(() => {
    if (!analyticsId || analyticsConsent !== 'granted') return;
    if (document.getElementById('ga-loader')) return;
    const scriptSrc = document.createElement('script');
    scriptSrc.id = 'ga-loader';
    scriptSrc.async = true;
    scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
    document.head.appendChild(scriptSrc);

    const scriptInit = document.createElement('script');
    scriptInit.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${JSON.stringify(analyticsId)}, { cookie_flags: 'SameSite=None;Secure' });
    `;
    document.head.appendChild(scriptInit);
  }, [analyticsId, analyticsConsent]);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 800);
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/gym-in-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <GymInKengeriPage onNavigate={navigate} />
          </Suspense>
        );
      case '/personal-training-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <PersonalTrainingPage onNavigate={navigate} />
          </Suspense>
        );
      case '/weight-loss-training-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <WeightLossPage onNavigate={navigate} />
          </Suspense>
        );
      case '/muscle-building-kengeri':
      case '/bodybuilding-gym-kengeri':
      case '/strength-training-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <MuscleBuildingPage onNavigate={navigate} />
          </Suspense>
        );
      case '/womens-fitness-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <WomensFitnessPage onNavigate={navigate} />
          </Suspense>
        );
      case '/group-fitness':
      case '/zumba-classes-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <GroupFitnessPage onNavigate={navigate} />
          </Suspense>
        );
      case '/nutrition-guidance':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <NutritionGuidancePage onNavigate={navigate} />
          </Suspense>
        );
      case '/reviews':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <ReviewsPage onNavigate={navigate} />
          </Suspense>
        );
      case '/faq':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <FAQPage onNavigate={navigate} />
          </Suspense>
        );
      case '/about':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <AboutPage onNavigate={navigate} />
          </Suspense>
        );
      case '/training':
      case '/gym-services-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <TrainingPage />
          </Suspense>
        );
      case '/transformations':
      case '/body-transformations':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <TransformationsPage onNavigate={navigate} />
          </Suspense>
        );
      case '/trainers':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <TrainersPage />
          </Suspense>
        );
      case '/gym-membership-kengeri':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <AboutPage onNavigate={navigate} />
          </Suspense>
        );

      case '/contact':
      case '/contact-kengeri':
      case '/contact-gym-kengeri':
      case '/locator':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <ContactKengeriPage onNavigate={navigate} />
          </Suspense>
        );
      case '/privacy-policy':
      case '/privacy':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <PrivacyPolicyPage onNavigate={navigate} />
          </Suspense>
        );
      case '/integrations':
      case '/webhooks':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <IntegrationsDashboard onNavigate={navigate} />
          </Suspense>
        );
      case '/login':
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <LoginPage onLoginSuccess={(role) => {
              setUserRole(role);
              navigate('/ads-hub');
            }} />
          </Suspense>
        );
      case '/ads-hub':
        if (!userRole) {
          return (
            <Suspense fallback={<SectionSkeleton height="h-screen" />}>
              <LoginPage onLoginSuccess={(role) => {
                setUserRole(role);
                navigate('/ads-hub');
              }} />
            </Suspense>
          );
        }
        return (
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <AdsHubPage userRole={userRole} onLogout={() => {
              getSupabaseClient().auth.signOut().catch(() => {});
              setUserRole(null);
              navigate('/');
            }} />
          </Suspense>
        );
      case '/':
        return (
          <>
            {/* Hero Landing & Key Metrics (Eager loaded for instant LCP) */}
            <Hero />
            
            {/* Premium Gym Facilities & Amenities */}
            <Features onNavigate={navigate} />

            {/* Promotional Auto-playing Video (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <PromoVideo />
            </Suspense>

            {/* Interactive BMI Metric Calculator (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-80" />}>
              <BMICalculator />
            </Suspense>

            {/* Certified Trainer Profiles (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Trainers />
            </Suspense>

            {/* Gym Founders Leadership & Vision (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Founders />
            </Suspense>

            {/* Client Success Transformation Gallery (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <TransformationGallery />
            </Suspense>

            {/* Interactive Filterable Photo Gallery with Lightbox (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Gallery />
            </Suspense>

            {/* Localized Kengeri Member Reviews (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-80" />}>
              <Testimonials />
            </Suspense>

            {/* Frequently Asked Questions (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-80" />}>
              <FAQ />
            </Suspense>

            {/* Contact Sheets, Operating Timings & Google Maps (Lazy loaded) */}
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <ContactAndLocation />
            </Suspense>
          </>
        );
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-gray-100 flex flex-col font-sans overflow-x-hidden transition-colors duration-300">
        {/* Custom Premium Gold Cursor */}
        <CustomCursor />

        {/* Dynamic Golden Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Gold-dust loading spinner / entrance animation */}
        <GoldLoader theme={theme} />

        {/* Premium Sticky Navigation Header with Search & Theme Toggle */}
        <Header theme={theme} toggleTheme={toggleTheme} currentPath={currentPath} onNavigate={navigate} />

        {/* Main Sections with Framer Motion Route Layout Transitions */}
        <main className="flex-grow bg-black relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{
                duration: shouldReduceMotion ? 0.05 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full flex-grow flex flex-col"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Structured Sitemap & SEO Metadata Footer */}
        <Footer currentPath={currentPath} onNavigate={navigate} />

        {analyticsId && <CookieConsent onChoice={setAnalyticsConsent} />}

        {/* Sticky WhatsApp Coach Widget */}
        <WhatsAppFloat />

        {/* Mobile Quick Actions Floating Menu */}
        <MobileQuickActions onNavigate={navigate} currentPath={currentPath} />
      </div>
    </ErrorBoundary>
  );
}
