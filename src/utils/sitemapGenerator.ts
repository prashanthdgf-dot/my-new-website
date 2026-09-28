/**
 * Dynamic XML Sitemap Generator & Route Crawler for Dhanus Gold Fitness
 * Automatically crawls and parses route definitions directly from App.tsx,
 * assigning localized metadata and generating Google/Schema-compliant XML
 * sitemaps with bilingual hreflang alternates (English & Kannada).
 */

import fs from 'fs';
import path from 'path';

export interface CrawledRoute {
  path: string;
  canonicalPath: string;
  component: string;
  isAlias: boolean;
  isExcluded: boolean;
  exclusionReason?: string;
  category: 'core' | 'service' | 'member' | 'legal' | 'auth';
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod: string;
  titleEn: string;
  titleKn: string;
  descriptionEn: string;
  descriptionKn: string;
}

export interface SitemapRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
  title: string;
  category: 'core' | 'service' | 'member' | 'legal';
}

/**
 * Verified metadata dictionary for localized page indexing
 */
export const ROUTE_LOCALIZATION_DICTIONARY: Record<
  string,
  {
    category: 'core' | 'service' | 'member' | 'legal';
    priority: number;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    titleEn: string;
    titleKn: string;
    descriptionEn: string;
    descriptionKn: string;
  }
> = {
  '/': {
    category: 'core',
    priority: 1.0,
    changefreq: 'daily',
    titleEn: 'Dhanus Gold Fitness — Gym & Personal Training in Kengeri Bengaluru',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ — ಕೆಂಗೇರಿಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಜಿಮ್ & ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್',
    descriptionEn: 'Transform your fitness at Dhanus Gold Fitness, 3-floor facility at Hoysala Circle Kengeri Bengaluru.',
    descriptionKn: 'ಕೆಂಗೇರಿಯ ಹೊಯ್ಸಳ ಸರ್ಕಲ್‌ನಲ್ಲಿರುವ ೩ ಅಂತಸ್ತಿನ ಪ್ರೀಮಿಯಂ ಜಿಮ್ ಮತ್ತು ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೇಂದ್ರ.',
  },
  '/gym-in-kengeri': {
    category: 'service',
    priority: 1.0,
    changefreq: 'weekly',
    titleEn: 'Best Gym in Kengeri Bengaluru | Dhanus Gold Fitness',
    titleKn: 'ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಜಿಮ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಬೆಂಗಳೂರು',
    descriptionEn: 'Explore Kengeri’s top-rated 3-floor fitness center with separate cardio zones and certified trainers.',
    descriptionKn: 'ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮತ್ತು ಸಾಮರ್ಥ್ಯ ತರಬೇತಿ ಹೊಂದಿರುವ ಕೆಂಗೇರಿಯ ನಂ.೧ ಜಿಮ್ ಸೌಲಭ್ಯ.',
  },
  '/personal-training-kengeri': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: '1-on-1 Personal Training in Kengeri | Dhanus Gold Fitness',
    titleKn: '೧-ಆನ್-೧ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
    descriptionEn: 'Certified personal training, custom nutrition plans, and guaranteed results in Kengeri Satellite Town.',
    descriptionKn: 'ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರಿಂದ ವೈಯಕ್ತಿಕ ಫಿಟ್‌ನೆಸ್ ಹಾಗೂ ಆಹಾರ ತರಬೇತಿ ಯೋಜನೆಗಳು.',
  },
  '/weight-loss-training-kengeri': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Weight Loss & Fat Burn Training in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ತೂಕ ಇಳಿಸುವ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
    descriptionEn: 'Scientific fat loss workouts, metabolic conditioning, and structured diet coaching.',
    descriptionKn: 'ವೈಜ್ಞಾನಿಕ ತೂಕ ಇಳಿಸುವಿಕೆ ಮತ್ತು ಕೊಬ್ಬು ಕರಗಿಸುವ ಸಮಗ್ರ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ.',
  },
  '/muscle-building-kengeri': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Muscle Building & Strength Training Gym in Kengeri',
    titleKn: 'ದೇಹದಾರ್ಢ್ಯ ಮತ್ತು ಶಕ್ತಿ ತರಬೇತಿ ಜಿಮ್ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descriptionEn: 'Hypertrophy-focused resistance training with imported heavy-duty biomechanical machines.',
    descriptionKn: 'ಸ್ನಾಯು ಬೆಳೆಸುವ ಮತ್ತು ದೇಹದಾರ್ಢ್ಯಕ್ಕಾಗಿ ಆಮದು ಮಾಡಿಕೊಂಡ ಅತ್ಯಾಧುನಿಕ ಜಿಮ್ ಉಪಕರಣಗಳು.',
  },
  '/bodybuilding-gym-kengeri': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Bodybuilding & Hypertrophy Gym in Kengeri Bengaluru',
    titleKn: 'ಬಾಡಿಬಿಲ್ಡಿಂಗ್ & ಹೈಪರ್ಟ್ರೋಫಿ ಜಿಮ್ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
    descriptionEn: 'Professional competitive bodybuilding and powerlifting setup in Kengeri.',
    descriptionKn: 'ವೃತ್ತಿಪರ ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಕಟ್ಟುನಿಟ್ಟಿನ ವೇಯ್ಟ್ ಟ್ರೈನಿಂಗ್ ಕೇಂದ್ರ.',
  },
  '/strength-training-kengeri': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Functional Strength & Conditioning Gym in Kengeri',
    titleKn: 'ಫಂಕ್ಷನಲ್ ಸ್ಟ್ರೆಂತ್ & ಕಂಡೀಷನಿಂಗ್ ಜಿಮ್ ಕೆಂಗೇರಿ',
    descriptionEn: 'Free weights, Olympic barbells, squat racks, and functional strength turf.',
    descriptionKn: 'ಸ್ಕ್ವಾಟ್ ರ್ಯಾಕ್‌ಗಳು, ಒಲಿಂಪಿಕ್ ಬಾರ್‌ಬೆಲ್‌ಗಳು ಮತ್ತು ಶಕ್ತಿ ವರ್ಧಕ ವ್ಯಾಯಾಮಗಳು.',
  },
  '/womens-fitness-kengeri': {
    category: 'service',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: "Women's Fitness & Strength Training in Kengeri | Dhanus Gold",
    titleKn: 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್ & ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ ಕೆಂಗೇರಿ',
    descriptionEn: 'Safe, private environment with dedicated female cardio zones, tone-up classes, and certified trainers.',
    descriptionKn: 'ಮಹಿಳೆಯರಿಗಾಗಿ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಮಹಡಿ ಮತ್ತು ಸುರಕ್ಷಿತ ವ್ಯಾಯಾಮ ವಾತಾವರಣ.',
  },
  '/group-fitness': {
    category: 'service',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: 'Group Fitness Classes & Zumba in Kengeri | Dhanus Gold Fitness',
    titleKn: 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್ & ಜುಂಬಾ ತರಗತಿಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'High-energy group workouts, HIIT circuits, functional aerobics, and Zumba classes in Kengeri.',
    descriptionKn: 'ಉತ್ಸಾಹಭರಿತ ಗ್ರೂಪ್ ವರ್ಕೌಟ್‌ಗಳು, ಜುಂಬಾ ಮತ್ತು ಫಂಕ್ಷನಲ್ ಏರೋಬಿಕ್ಸ್ ತರಗತಿಗಳು.',
  },
  '/zumba-classes-kengeri': {
    category: 'service',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: 'Zumba Dance & Aerobics Classes in Kengeri Bengaluru',
    titleKn: 'ಜುಂಬಾ ಡ್ಯಾನ್ಸ್ & ಏರೋಬಿಕ್ಸ್ ಕ್ಲಾಸ್‌ಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Fun calorie-burning Zumba dance fitness sessions led by certified instructors.',
    descriptionKn: 'ಪ್ರಮಾಣೀಕೃತ ಶಿಕ್ಷಕರಿಂದ ವಿನೋದಮಯ ಜುಂಬಾ ನೃತ್ಯ ಮತ್ತು ಕಾರ್ಡಿಯೋ ತರಗತಿಗಳು.',
  },
  '/nutrition-guidance': {
    category: 'service',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: 'Nutrition Guidance & Diet Planning in Kengeri | Dhanus Gold',
    titleKn: 'ನ್ಯೂಟ್ರಿಷನ್ ಮಾರ್ಗದರ್ಶನ & ಡಯಟ್ ಯೋಜನೆಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Personalized macro meal plans, vegetarian & non-vegetarian muscle and fat-loss diets.',
    descriptionKn: 'ಪ್ರತಿಯೊಬ್ಬರ ಜೀವನಶೈಲಿಗೆ ತಕ್ಕಂತೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆಹಾರ ಹಾಗೂ ಪೌಷ್ಟಿಕಾಂಶ ಸಲಹೆಗಳು.',
  },
  '/training': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Gym Services & Personal Training Programs in Kengeri',
    titleKn: 'ಜಿಮ್ ಸೇವೆಗಳು ಮತ್ತು ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Comprehensive fitness programs: weight loss, muscle gain, functional strength, and stamina.',
    descriptionKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್‌ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಸಮಗ್ರ ತರಬೇತಿ ಕೋರ್ಸ್‌ಗಳು.',
  },
  '/gym-services-kengeri': {
    category: 'service',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: 'All Gym Services & Facilities in Kengeri | Dhanus Gold',
    titleKn: 'ಕೆಂಗೇರಿಯ ಜಿಮ್ ಸೇವೆಗಳು & ಸೌಲಭ್ಯಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್',
    descriptionEn: 'Steam bath, 3 floors of equipment, personal training, and group classes.',
    descriptionKn: 'ಸ್ಟೀಮ್ ಬಾತ್, ೩ ಮಹಡಿಗಳ ಜಿಮ್ ಮತ್ತು ಪರಿಣಿತ ಕೋಚಿಂಗ್ ಸೌಲಭ್ಯಗಳು.',
  },
  '/transformations': {
    category: 'service',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Member Body Transformations & Success Stories in Kengeri',
    titleKn: 'ಸದಸ್ಯರ ದೇಹ ರೂಪಾಂತರ & ಯಶೋಗಾಥೆಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Real 600+ client before/after body transformations and fitness achievements in Kengeri.',
    descriptionKn: '೬೦೦ಕ್ಕೂ ಹೆಚ್ಚು ಸದಸ್ಯರ ನೈಜ ದೇಹ ರೂಪಾಂತರದ ಫೋಟೋಗಳು ಮತ್ತು ಪ್ರೇರಣಾದಾಯಕ ಫಲಿತಾಂಶಗಳು.',
  },
  '/body-transformations': {
    category: 'service',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: 'Client Fitness Transformations in Kengeri | Dhanus Gold',
    titleKn: 'ನೈಜ ಫಿಟ್ನೆಸ್ ರೂಪಾಂತರ ಫಲಿತಾಂಶಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Verified weight loss, body recomposition, and muscle growth results from Kengeri members.',
    descriptionKn: 'ತೂಕ ಇಳಿಕೆ ಮತ್ತು ಬಾಡಿ ರೀಕಾಂಪೊಸಿಷನ್‌ನಲ್ಲಿ ಧನುಸ್ ಗೋಲ್ಡ್ ಸದಸ್ಯರ ಅದ್ಭುತ ಫಲಿತಾಂಶಗಳು.',
  },
  '/trainers': {
    category: 'service',
    priority: 0.85,
    changefreq: 'monthly',
    titleEn: 'Certified Gym Trainers & Coaches in Kengeri | Dhanus Gold',
    titleKn: 'ಪ್ರಮಾಣೀಕೃತ ಜಿಮ್ ತರಬೇತುದಾರರು & ಕೋಚ್‌ಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Meet our 7+ certified coaches with extensive bodybuilding and transformation experience.',
    descriptionKn: 'ಅನುಭವಿ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ೭+ ಫಿಟ್ನೆಸ್ ತರಬೇತುದಾರರ ವಿವರಗಳು.',
  },
  '/reviews': {
    category: 'member',
    priority: 0.85,
    changefreq: 'weekly',
    titleEn: 'Member Reviews & Testimonials | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು & ಅನಿಸಿಕೆಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಕೆಂಗೇರಿ',
    descriptionEn: 'Read genuine Google reviews and member feedback for Dhanus Gold Fitness at Hoysala Circle.',
    descriptionKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕುರಿತು ನಮ್ಮ ಸದಸ್ಯರ ಪ್ರಾಮಾಣಿಕ ವಿಮರ್ಶೆಗಳು.',
  },
  '/faq': {
    category: 'core',
    priority: 0.85,
    changefreq: 'monthly',
    titleEn: 'Frequently Asked Questions | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಕೆಂಗೇರಿ',
    descriptionEn: 'Find answers about timings, membership fees, trial sessions, facilities, and personal trainers.',
    descriptionKn: 'ಜಿಮ್ ಸಮಯ, ಶುಲ್ಕ, ಉಚಿತ ಟ್ರಯಲ್ ಮತ್ತು ತರಬೇತಿಯ ಕುರಿತ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು.',
  },
  '/about': {
    category: 'core',
    priority: 0.8,
    changefreq: 'monthly',
    titleEn: 'About Dhanus Gold Fitness | Gym in Kengeri Satellite Town',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಬಗ್ಗೆ | ಕೆಂಗೇರಿ ಸ್ಯಾಟಲೈಟ್ ಟೌನ್ ಜಿಮ್',
    descriptionEn: 'Our 9+ years journey, certified coaches, and modern fitness infrastructure in West Bengaluru.',
    descriptionKn: '೯+ ವರ್ಷಗಳ ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ, ಅತ್ಯುತ್ತಮ ತರಬೇತುದಾರರು ಮತ್ತು ನಮ್ಮ ಫಿಟ್‌ನೆಸ್ ಧ್ಯೇಯ.',
  },
  '/gym-membership-kengeri': {
    category: 'service',
    priority: 0.85,
    changefreq: 'monthly',
    titleEn: 'Gym Membership Plans & Pricing in Kengeri | Dhanus Gold',
    titleKn: 'ಜಿಮ್ ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ಮತ್ತು ಯೋಜನೆಗಳು ಕೆಂಗೇರಿ',
    descriptionEn: 'Affordable 1-month, 3-month, 6-month, and annual gym membership packages.',
    descriptionKn: 'ಕೆಂಗೇರಿಯಲ್ಲಿ ಕೈಗೆಟುಕುವ ಮಾಸಿಕ, ತ್ರೈಮಾಸಿಕ ಮತ್ತು ವಾರ್ಷಿಕ ಜಿಮ್ ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳು.',
  },
  '/contact': {
    category: 'core',
    priority: 0.9,
    changefreq: 'monthly',
    titleEn: 'Contact Dhanus Gold Fitness | Hoysala Circle Kengeri Bengaluru',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಸಂಪರ್ಕಿಸಿ | ಹೊಯ್ಸಳ ಸರ್ಕಲ್ ಕೆಂಗೇರಿ',
    descriptionEn: 'Visit us above Trends Junior, Hoysala Circle, Kengeri Outer Ring Road. Call +91 97400 18911.',
    descriptionKn: 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಔಟರ್ ರಿಂಗ್ ರೋಡ್, ಕೆಂಗೇರಿ. ಕರೆ ಮಾಡಿ: +91 97400 18911.',
  },
  '/contact-kengeri': {
    category: 'core',
    priority: 0.9,
    changefreq: 'monthly',
    titleEn: 'Contact Dhanus Gold Fitness | Gym in Kengeri Bengaluru',
    titleKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸಂಪರ್ಕಿಸಿ | ಕೆಂಗೇರಿ ಬೆಂಗಳೂರು',
    descriptionEn: 'Directions, phone numbers, WhatsApp, and operating hours for our Kengeri facility.',
    descriptionKn: 'ವಿಳಾಸ, ದೂರವಾಣಿ ಸಂಖ್ಯೆ, ವಾಟ್ಸಾಪ್ ಮತ್ತು ತೆರೆಯುವ ಸಮಯದ ವಿವರಗಳು.',
  },
  '/contact-gym-kengeri': {
    category: 'core',
    priority: 0.85,
    changefreq: 'monthly',
    titleEn: 'Gym Contact & Free Trial Booking in Kengeri Bengaluru',
    titleKn: 'ಜಿಮ್ ಸಂಪರ್ಕ & ಉಚಿತ ಟ್ರಯಲ್ ಬುಕಿಂಗ್ ಕೆಂಗೇರಿ',
    descriptionEn: 'Book your free workout trial pass or reach our gym desk at Hoysala Circle.',
    descriptionKn: 'ನಿಮ್ಮ ಉಚಿತ ವ್ಯಾಯಾಮ ಟ್ರಯಲ್ ಪಾಸ್ ಬುಕ್ ಮಾಡಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',
  },
  '/locator': {
    category: 'core',
    priority: 0.9,
    changefreq: 'weekly',
    titleEn: 'Gym Location & Store Locator Plus | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಜಿಮ್ ಲೊಕೇಶನ್ & ಸ್ಟೋರ್ ಲೊಕೇಟರ್ ಪ್ಲಸ್ | ಧನುಸ್ ಗೋಲ್ಡ್ ಕೆಂಗೇರಿ',
    descriptionEn: 'Find Dhanus Gold Fitness at Hoysala Circle Kengeri Bengaluru with Google Maps Locator Plus, directions, and distance matrix.',
    descriptionKn: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಲೊಕೇಟರ್ ಪ್ಲಸ್ ಮತ್ತು ನಿಖರವಾದ ದಾರಿಯೊಂದಿಗೆ ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಹುಡುಕಿ.',
  },
  '/privacy-policy': {
    category: 'legal',
    priority: 0.7,
    changefreq: 'monthly',
    titleEn: 'Privacy Policy & Data Security | Dhanus Gold Fitness Kengeri',
    titleKn: 'ಗೌಪ್ಯತಾ ನೀತಿ & ಡೇಟಾ ಭದ್ರತೆ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descriptionEn: 'Official privacy policy, WhatsApp communication consent, and personal data protection terms.',
    descriptionKn: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್‌ನ ಅಧಿಕೃತ ಗೌಪ್ಯತಾ ನೀತಿ ಮತ್ತು ಗ್ರಾಹಕರ ಮಾಹಿತಿ ರಕ್ಷಣೆ ನಿಯಮಗಳು.',
  },
  '/privacy': {
    category: 'legal',
    priority: 0.7,
    changefreq: 'monthly',
    titleEn: 'Privacy & Data Terms | Dhanus Gold Fitness',
    titleKn: 'ಗೌಪ್ಯತೆ ಮತ್ತು ನಿಯಮಗಳು | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descriptionEn: 'Information collection and communication standards for Dhanus Gold Fitness.',
    descriptionKn: 'ಮಾಹಿತಿ ಸಂಗ್ರಹ ಮತ್ತು ಸಂವಹನ ಮಾನದಂಡಗಳ ವಿವರಣೆ.',
  },
  '/integrations': {
    category: 'core',
    priority: 0.7,
    changefreq: 'monthly',
    titleEn: 'Webhooks & External Integrations Hub | Dhanus Gold Fitness',
    titleKn: 'ವೆಬ್‌ಹುಕ್ಸ್ & ಏಕೀಕರಣ ಕೇಂದ್ರ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್',
    descriptionEn: 'Permanent callback URLs, Meta leads handshake, WhatsApp Cloud API webhooks, and touchpoints.',
    descriptionKn: 'ಶಾಶ್ವತ ಕಾಲ್‌ಬ್ಯಾಕ್ ಲಿಂಕ್‌ಗಳು, ಮೆಟಾ ಲೀಡ್ಸ್ ಮತ್ತು ವಾಟ್ಸಾಪ್ ಕ್ಲೌಡ್ ಎಪಿಐ ಏಕೀಕರಣ.',
  },
  '/webhooks': {
    category: 'core',
    priority: 0.7,
    changefreq: 'monthly',
    titleEn: 'Webhook & Callback Endpoints | Dhanus Gold Fitness',
    titleKn: 'ವೆಬ್‌ಹುಕ್ & ಕಾಲ್‌ಬ್ಯಾಕ್ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು',
    descriptionEn: 'Real-time Firestore lead logging and external webhook integration endpoints.',
    descriptionKn: 'ರಿಯಲ್-ಟೈಮ್ ಲೀಡ್ ಲಾಗಿಂಗ್ ಮತ್ತು ಬಾಹ್ಯ ವೆಬ್‌ಹುಕ್ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳು.',
  },
};

/**
 * Dynamically crawls and extracts routes from App.tsx source code
 * Uses Node fs when running in server/CLI, or fallback catalog when client-side.
 */
export function crawlAppRoutes(appTsxPath?: string): CrawledRoute[] {
  const currentDate = new Date().toISOString().split('T')[0];
  let appTsxContent = '';

  try {
    const targetPath = appTsxPath || path.resolve(process.cwd(), 'src/App.tsx');
    if (fs.existsSync(targetPath)) {
      appTsxContent = fs.readFileSync(targetPath, 'utf-8');
    }
  } catch {
    // Fallback to static crawl catalog below
  }

  // If App.tsx content was successfully read, perform dynamic AST/regex parsing
  if (appTsxContent) {
    return parseAppTsxContent(appTsxContent, currentDate);
  }

  // Fallback: Generate from verified route dictionary
  return getFallbackCrawledRoutes(currentDate);
}

/**
 * Parses raw App.tsx code to identify switch cases, components, and exclusions
 */
function parseAppTsxContent(content: string, currentDate: string): CrawledRoute[] {
  const routes: CrawledRoute[] = [];
  const switchMatch = content.match(/switch\s*\(\s*currentPath\s*\)\s*\{([\s\S]*?)\n\s*case '\/':/);
  const switchBody = switchMatch ? switchMatch[1] : content;

  // Always include the root home route '/'
  const homeMeta = ROUTE_LOCALIZATION_DICTIONARY['/'];
  routes.push({
    path: '/',
    canonicalPath: '/',
    component: 'Hero/Home',
    isAlias: false,
    isExcluded: false,
    category: homeMeta.category,
    changefreq: homeMeta.changefreq,
    priority: homeMeta.priority,
    lastmod: currentDate,
    titleEn: homeMeta.titleEn,
    titleKn: homeMeta.titleKn,
    descriptionEn: homeMeta.descriptionEn,
    descriptionKn: homeMeta.descriptionKn,
  });

  // Regex to match case blocks and their associated return statement
  const caseBlockRegex = /((?:case\s+['"][^'"]+['"]:\s*)+)([\s\S]*?return\s*\([\s\S]*?\);)/g;
  let match: RegExpExecArray | null;

  const seenPaths = new Set<string>(['/']);

  while ((match = caseBlockRegex.exec(switchBody)) !== null) {
    const casesRaw = match[1];
    const returnBlock = match[2];

    // Find actual component name inside return JSX, filtering out wrappers
    const componentMatches = Array.from(returnBlock.matchAll(/<([A-Z][A-Za-z0-9]+)/g)).map((m) => m[1]);
    const componentName =
      componentMatches.find((name) => name !== 'Suspense' && name !== 'SectionSkeleton' && name !== 'React') ||
      componentMatches[0] ||
      'PageComponent';

    // Extract individual path strings
    const casePaths: string[] = [];
    const singleCaseRegex = /case\s+['"]([^'"]+)['"]:/g;
    let pathMatch: RegExpExecArray | null;
    while ((pathMatch = singleCaseRegex.exec(casesRaw)) !== null) {
      casePaths.push(pathMatch[1]);
    }

    if (casePaths.length === 0) continue;

    // Check if this component or route is authenticated / excluded from indexing
    const isExcluded =
      componentName === 'LoginPage' ||
      componentName === 'AdsHubPage' ||
      componentName === 'IntegrationsDashboard' ||
      casePaths.some((p) => p === '/login' || p === '/ads-hub' || p === '/integrations' || p === '/webhooks');

    const canonicalPath = casePaths[0];

    casePaths.forEach((path, index) => {
      if (seenPaths.has(path)) return;
      seenPaths.add(path);

      const isAlias = index > 0;
      const dictMeta = ROUTE_LOCALIZATION_DICTIONARY[path] || ROUTE_LOCALIZATION_DICTIONARY[canonicalPath] || {
        category: isExcluded ? 'auth' : 'service',
        priority: isExcluded ? 0.0 : isAlias ? 0.8 : 0.85,
        changefreq: 'weekly',
        titleEn: `${formatPathToTitle(path)} | Dhanus Gold Fitness Kengeri`,
        titleKn: `${formatPathToTitle(path)} | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ`,
        descriptionEn: `Information about ${formatPathToTitle(path)} at Dhanus Gold Fitness in Kengeri Bengaluru.`,
        descriptionKn: `ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿಯಲ್ಲಿ ${formatPathToTitle(path)} ಕುರಿತಾದ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ.`,
      };

      routes.push({
        path,
        canonicalPath,
        component: componentName,
        isAlias,
        isExcluded,
        exclusionReason: isExcluded ? 'Private/internal route disallowed by robots.txt' : undefined,
        category: dictMeta.category as any,
        changefreq: dictMeta.changefreq,
        priority: dictMeta.priority,
        lastmod: currentDate,
        titleEn: dictMeta.titleEn,
        titleKn: dictMeta.titleKn,
        descriptionEn: dictMeta.descriptionEn,
        descriptionKn: dictMeta.descriptionKn,
      });
    });
  }

  return routes;
}

/**
 * Fallback route builder when filesystem is not accessible
 */
function getFallbackCrawledRoutes(currentDate: string): CrawledRoute[] {
  return Object.entries(ROUTE_LOCALIZATION_DICTIONARY).map(([path, meta]) => {
    const isExcluded = path === '/login' || path === '/ads-hub' || path === '/integrations' || path === '/webhooks';
    return {
      path,
      canonicalPath: path,
      component: 'PageComponent',
      isAlias: false,
      isExcluded,
      exclusionReason: isExcluded ? 'Authenticated route disallowed by robots.txt' : undefined,
      category: meta.category,
      changefreq: meta.changefreq,
      priority: meta.priority,
      lastmod: currentDate,
      titleEn: meta.titleEn,
      titleKn: meta.titleKn,
      descriptionEn: meta.descriptionEn,
      descriptionKn: meta.descriptionKn,
    };
  });
}

function formatPathToTitle(path: string): string {
  return path
    .replace(/^\//, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export interface SitemapOptions {
  includeKannadaEntries?: boolean;
  currentDate?: string;
  baseUrl?: string;
}

/**
 * Generates an automated, schema-compliant localized XML Sitemap string
 * with cross-referencing hreflang tags for English and Kannada.
 *
 * @param baseUrl Canonical production domain
 * @param options Sitemap generation options
 */
export function generateSitemapXml(
  baseUrl: string = 'https://www.dhanusgoldfitness.com',
  options: SitemapOptions = {}
): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const currentDate = options.currentDate || new Date().toISOString().split('T')[0];
  // ?lang=kn URLs share the same canonical as the English page (the canonical tag ignores ?lang),
  // so listing them with hreflang alternates sends Google contradictory signals. Opt-in only.
  const includeKannada = options.includeKannadaEntries === true;

  // Aliases (e.g. /privacy, /contact-kengeri, /body-transformations) canonicalise to another URL,
  // so only canonical routes belong in the sitemap.
  // /gym-membership-kengeri renders the About page and canonicalises to /about.
  const NON_CANONICAL = new Set(['/gym-membership-kengeri']);
  const crawledRoutes = crawlAppRoutes().filter((r) => !r.isExcluded && !r.isAlias && !NON_CANONICAL.has(r.path));

  const xmlEntries: string[] = [];

  for (const route of crawledRoutes) {
    const canonicalLoc = route.path === '/' ? `${cleanBase}/` : `${cleanBase}${route.path}`;
    const kannadaLoc = route.path === '/' ? `${cleanBase}/?lang=kn` : `${cleanBase}${route.path}?lang=kn`;
    const lastmod = route.lastmod || currentDate;

    // 1. Primary Canonical Entry (English / Default)
    xmlEntries.push(`  <url>
    <loc>${canonicalLoc}</loc>
${includeKannada ? `    <xhtml:link rel="alternate" hreflang="en" href="${canonicalLoc}" />
    <xhtml:link rel="alternate" hreflang="kn" href="${kannadaLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalLoc}" />
` : ''}    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`);

    // 2. Localized Kannada Entry (Explicitly indexed for localized queries)
    if (includeKannada) {
      // Slightly lower priority than canonical to indicate primary language variant
      const knPriority = Math.max(0.6, Number((route.priority * 0.95).toFixed(1)));
      xmlEntries.push(`  <url>
    <loc>${kannadaLoc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${canonicalLoc}" />
    <xhtml:link rel="alternate" hreflang="kn" href="${kannadaLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalLoc}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${knPriority.toFixed(1)}</priority>
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries.join('\n')}
</urlset>
`;
}

/**
 * Generates an audit manifest summary of all crawled routes from App.tsx
 */
export function generateSitemapManifest(baseUrl: string = 'https://www.dhanusgoldfitness.com') {
  const routes = crawlAppRoutes();
  const indexable = routes.filter((r) => !r.isExcluded);
  const excluded = routes.filter((r) => r.isExcluded);

  return {
    generator: 'Dhanus Gold Fitness Dynamic App.tsx Sitemap Crawler',
    crawledAt: new Date().toISOString(),
    baseUrl,
    counts: {
      totalDiscoveredRoutes: routes.length,
      indexableCanonicalRoutes: indexable.filter((r) => !r.isAlias).length,
      indexableAliasRoutes: indexable.filter((r) => r.isAlias).length,
      totalIndexableRoutes: indexable.length,
      totalXmlUrlNodes: indexable.filter((r) => !r.isAlias).length,
      excludedPrivateRoutes: excluded.length,
    },
    languages: ['en', 'kn'],
    routes,
  };
}

/**
 * Backward compatibility: export static routes list
 */
export const SITEMAP_ROUTES: SitemapRoute[] = Object.entries(ROUTE_LOCALIZATION_DICTIONARY).map(
  ([path, meta]) => ({
    path,
    changefreq: meta.changefreq,
    priority: meta.priority,
    title: meta.titleEn,
    category: meta.category,
  })
);

export function getAllSitemapRoutes(): SitemapRoute[] {
  return SITEMAP_ROUTES;
}

