export interface SearchItem {
  id: string;
  title: string;
  kannadaTitle: string;
  category: 'Service' | 'Trainer' | 'Facility' | 'Tool' | 'Page';
  kannadaCategory: string;
  description: string;
  kannadaDescription: string;
  path: string;
  sectionId?: string;
  keywords: string[];
}

export const SEARCH_INDEX: SearchItem[] = [
  // Training Services
  {
    id: 'personal-training',
    title: '1-on-1 Personal Training in Kengeri',
    kannadaTitle: 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ (Personal Training)',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'Customized 1-on-1 coaching, posture correction, personalized diet, and dedicated trainer attention in Kengeri.',
    kannadaDescription: 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಭಂಗಿ ತಿದ್ದುಪಡಿ ಮತ್ತು ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಆಹಾರ ಯೋಜನೆ.',
    path: '/personal-training-kengeri',
    keywords: ['personal training', 'pt', 'coach', 'trainer', 'diet', '1 on 1', 'ತರಬೇತಿ', 'ಕೋಚ್', 'ವೈಯಕ್ತಿಕ'],
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss & Fat Reduction Training',
    kannadaTitle: 'ತೂಕ ಇಳಿಕೆ & ಕೊಬ್ಬು ಕರಗಿಸುವಿಕೆ',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'Targeted caloric deficit protocols, HIIT, cardio conditioning, and science-backed fat loss workouts in Kengeri.',
    kannadaDescription: 'ತೂಕ ಇಳಿಕೆ, ಕೊಬ್ಬು ಕರಗಿಸುವಿಕೆ ಮತ್ತು ಕಾರ್ಡಿಯೋ ತರಬೇತಿ.',
    path: '/weight-loss-training-kengeri',
    keywords: ['weight loss', 'fat loss', 'slim', 'belly fat', 'cardio', 'calorie', 'ತೂಕ ಇಳಿಕೆ', 'ಕೊಬ್ಬು', 'ಸ್ಲಿಮ್'],
  },
  {
    id: 'bodybuilding',
    title: 'Bodybuilding & Muscle Building in Kengeri',
    kannadaTitle: 'ಬಾಡಿಬಿಲ್ಡಿಂಗ್ & ಮಸಲ್ ಗೇನ್',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'Hypertrophy protocols, progressive overload, barbell lifts, and championship-level bodybuilding coaching.',
    kannadaDescription: 'ಬಾಡಿಬಿಲ್ಡಿಂಗ್, ಮಸಲ್ ಗೇನ್ ಮತ್ತು ದೇಹದಾರ್ಢ್ಯ ತರಬೇತಿ.',
    path: '/muscle-building-kengeri',
    keywords: ['bodybuilding', 'muscle gain', 'hypertrophy', 'biceps', 'chest', 'mass', 'ಬಾಡಿಬಿಲ್ಡಿಂಗ್', 'ಮಸಲ್'],
  },
  {
    id: 'strength-conditioning',
    title: 'Strength & Conditioning Training',
    kannadaTitle: 'ಸ್ಟ್ರೆಂತ್ & ಕಂಡೀಷನಿಂಗ್',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'Powerlifting basics, core stability, functional athletic conditioning, and heavy compound training.',
    kannadaDescription: 'ದೈಹಿಕ ಸಾಮರ್ಥ್ಯ ಹೆಚ್ಚಳ, ಕೋರ್ ಸ್ಟ್ರೆಂತ್ ಮತ್ತು ಕಾಂಪೌಂಡ್ ಲಿಫ್ಟ್.',
    path: '/muscle-building-kengeri',
    keywords: ['strength', 'powerlifting', 'squat', 'bench', 'deadlift', 'functional', 'ತಾಕತ್ತು', 'ಸ್ಟ್ರೆಂತ್'],
  },
  {
    id: 'womens-fitness',
    title: "Women's Fitness & Strength in Kengeri",
    kannadaTitle: 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್ ಮತ್ತು ತೂಕ ನಿರ್ವಹಣೆ',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'Safe, supportive, empowering strength and conditioning programs tailored for women with dedicated cardio zone.',
    kannadaDescription: 'ಮಹಿಳೆಯರಿಗಾಗಿ ಸುರಕ್ಷಿತ ಮತ್ತು ಪ್ರತ್ಯೇಕ ಫಿಟ್‌ನೆಸ್ ತರಬೇತಿ.',
    path: '/womens-fitness-kengeri',
    keywords: ['women', 'ladies', 'female', 'toning', 'posture', 'ಮಹಿಳೆಯರ', 'ಲೇಡೀಸ್'],
  },
  {
    id: 'zumba-aerobics',
    title: 'Group Fitness & Zumba Classes',
    kannadaTitle: 'ಜುಂಬಾ & ಏರೋಬಿಕ್ಸ್ ಕ್ಲಾಸ್‌ಗಳು',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'High-energy dance fitness, rhythmic calorie-burning workouts, and endurance training in Kengeri.',
    kannadaDescription: 'ಜುಂಬಾ ನೃತ್ಯ ಮತ್ತು ಏರೋಬಿಕ್ಸ್ ತರಗತಿಗಳು.',
    path: '/group-fitness',
    keywords: ['zumba', 'aerobics', 'dance', 'cardio dance', 'group class', 'ಜುಂಬಾ', 'ಏರೋಬಿಕ್ಸ್'],
  },
  {
    id: 'nutrition-guidance',
    title: 'Nutrition Guidance & Diet Planning',
    kannadaTitle: 'ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಆಹಾರ ಯೋಜನೆ',
    category: 'Service',
    kannadaCategory: 'ಸೇವೆ',
    description: 'Personalized macro meal plans, calorie counting, and Indian nutrition advice for members.',
    kannadaDescription: 'ವೈಯಕ್ತಿಕ ಡಯಟ್ ಚಾರ್ಟ್ ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ.',
    path: '/nutrition-guidance',
    keywords: ['nutrition', 'diet', 'meal plan', 'protein', 'calories', 'ಡಯಟ್', 'ಆಹಾರ'],
  },
  {
    id: 'member-reviews',
    title: 'Member Reviews & Testimonials',
    kannadaTitle: 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು & ಅನುಭವಗಳು',
    category: 'Page',
    kannadaCategory: 'ಪುಟ',
    description: 'Verified member stories, star ratings, and Google reviews for Dhanus Gold Fitness Kengeri.',
    kannadaDescription: 'ನಮ್ಮ ಜಿಮ್ ಸದಸ್ಯರ ನೈಜ ವಿಮರ್ಶೆಗಳು ಮತ್ತು ಅನುಭವಗಳು.',
    path: '/reviews',
    keywords: ['reviews', 'testimonials', 'ratings', 'feedback', 'stars', 'ವಿಮರ್ಶೆಗಳು'],
  },
  {
    id: 'gym-kengeri-main',
    title: 'Gym in Kengeri | Dhanus Gold Fitness',
    kannadaTitle: 'ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಜಿಮ್',
    category: 'Page',
    kannadaCategory: 'ಪುಟ',
    description: '3-floor premier gym facility at Hoysala Circle, Kengeri Satellite Town, Bengaluru.',
    kannadaDescription: 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಉಪನಗರದ ಪ್ರೀಮಿಯಂ ಜಿಮ್.',
    path: '/gym-in-kengeri',
    keywords: ['kengeri gym', 'fitness center kengeri', 'hoysala circle', 'gym near me', 'ಕೆಂಗೇರಿ ಜಿಮ್'],
  },

  // Trainers
  {
    id: 'trainer-prashanth',
    title: 'Prashanth D. - Head Coach & Founder',
    kannadaTitle: 'ಪ್ರಶಾಂತ್ ಡಿ. - ಹೆಡ್ ಕೋಚ್ ಮತ್ತು ಸ್ಥಾಪಕರು',
    category: 'Trainer',
    kannadaCategory: 'ತರಬೇತುದಾರ',
    description: '9+ years coaching elite athletes and beginners in Kengeri. Specialist in posture correction & body transformation.',
    kannadaDescription: '೯+ ವರ್ಷಗಳ ಅನುಭವ, ದೇಹ ಪರಿವರ್ತನೆ ಮತ್ತು ಭಂಗಿ ತಿದ್ದುಪಡಿಯ ತಜ್ಞರು.',
    path: '/trainers',
    keywords: ['prashanth', 'head coach', 'founder', 'master trainer', 'ಪ್ರಶಾಂತ್'],
  },
  {
    id: 'trainer-chethan',
    title: 'Chethan Kumar - Senior Transformation Coach',
    kannadaTitle: 'ಚೇತನ್ ಕುಮಾರ್ - ಸೀನಿಯರ್ ಟ್ರಾನ್ಸ್‌ಫಾರ್ಮೇಶನ್ ಕೋಚ್',
    category: 'Trainer',
    kannadaCategory: 'ತರಬೇತುದಾರ',
    description: 'Specialist in hypertrophy, contest prep, sports conditioning, and progressive overload.',
    kannadaDescription: 'ಮಸಲ್ ಹೈಪರ್ಟ್ರೋಫಿ, ಸ್ಪೋರ್ಟ್ಸ್ ಕಂಡೀಷನಿಂಗ್ ಮತ್ತು ಡಯಟ್ ತಜ್ಞರು.',
    path: '/trainers',
    keywords: ['chethan', 'chethan kumar', 'senior trainer', 'ಚೇತನ್'],
  },
  {
    id: 'certified-trainers',
    title: 'Certified Personal Trainers Team',
    kannadaTitle: 'ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರ ತಂಡ',
    category: 'Trainer',
    kannadaCategory: 'ತರಬೇತುದಾರ',
    description: 'Full roster of certified fitness trainers with proven member transformation track records.',
    kannadaDescription: 'ನಮ್ಮ ಎಲ್ಲಾ ನುರಿತ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ಫಿಟ್‌ನೆಸ್ ತರಬೇತುದಾರರು.',
    path: '/trainers',
    keywords: ['trainers', 'coaches', 'instructors', 'staff', 'ತರಬೇತುದಾರರು'],
  },

  // Interactive Tools & Sections
  {
    id: 'bmi-calculator',
    title: 'Interactive BMI Calculator',
    kannadaTitle: 'ಬಿಎಂಐ ಕ್ಯಾಲ್ಕುಲೇಟರ್ (BMI Calculator)',
    category: 'Tool',
    kannadaCategory: 'ಉಪಕರಣ',
    description: 'Check your Body Mass Index (BMI), ideal weight range, and get tailored calorie guidance.',
    kannadaDescription: 'ನಿಮ್ಮ ದೇಹ ತೂಕದ ಸೂಚ್ಯಂಕ (BMI) ಮತ್ತು ಆದರ್ಶ ತೂಕವನ್ನು ಲೆಕ್ಕಹಾಕಿ.',
    path: '/',
    sectionId: 'bmi-calculator',
    keywords: ['bmi', 'calculator', 'height', 'weight', 'body mass index', 'ಕ್ಯಾಲ್ಕುಲೇಟರ್', 'ತೂಕ ಪರೀಕ್ಷೆ'],
  },
  {
    id: 'transformation-gallery',
    title: 'Member Transformations & Results',
    kannadaTitle: 'ಸದಸ್ಯರ ದೇಹ ಪರಿವರ್ತನೆಗಳು ಮತ್ತು ಫಲಿತಾಂಶ',
    category: 'Page',
    kannadaCategory: 'ಪುಟ',
    description: 'Real before-and-after transformations, weight loss results, and member stories.',
    kannadaDescription: 'ಕೆಂಗೇರಿ ಸದಸ್ಯರ ನೈಜ ಬಿಫೋರ್-ಆಫ್ಟರ್ ಫೋಟೋಗಳು ಮತ್ತು ಕಥೆಗಳು.',
    path: '/transformations',
    keywords: ['transformations', 'before after', 'results', 'success stories', 'ಪರಿವರ್ತನೆಗಳು', 'ಫಲಿತಾಂಶ'],
  },
  {
    id: 'gym-facility-gallery',
    title: 'Gym Facility & Equipment Photos',
    kannadaTitle: 'ಜಿಮ್ ಉಪಕರಣಗಳು ಮತ್ತು ಫೋಟೋ ಗ್ಯಾಲರಿ',
    category: 'Facility',
    kannadaCategory: 'ಸೌಲಭ್ಯ',
    description: 'Tour our 3-floor setup, imported strength equipment, dumbbells, steam room, and locker facilities.',
    kannadaDescription: '೩ ಮಹಡಿಗಳ ಜಿಮ್, ಆಮದು ಯಂತ್ರೋಪಕರಣಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳು.',
    path: '/',
    sectionId: 'gallery',
    keywords: ['gallery', 'photos', 'equipment', 'facility', 'steam bath', 'lockers', 'ಗ್ಯಾಲರಿ', 'ಚಿತ್ರಗಳು'],
  },
  {
    id: 'membership-plans',
    title: 'Membership Plans & Pricing',
    kannadaTitle: 'ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳು ಮತ್ತು ಶುಲ್ಕ',
    category: 'Page',
    kannadaCategory: 'ಪುಟ',
    description: 'Monthly, Quarterly, Half-Yearly, and Annual membership plans in INR.',
    kannadaDescription: 'ಮಾಸಿಕ, ತ್ರೈಮಾಸಿಕ ಮತ್ತು ವಾರ್ಷಿಕ ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ವಿವರಗಳು.',
    path: '/about',
    sectionId: 'plans',
    keywords: ['price', 'pricing', 'plans', 'fees', 'cost', 'membership', 'quarterly', 'annual', 'ಶುಲ್ಕ', 'ಯೋಜನೆಗಳು'],
  },
  {
    id: 'contact-location',
    title: 'Gym Address, Timings & Google Maps',
    kannadaTitle: 'ವಿಳಾಸ, ಜಿಮ್ ಸಮಯ ಮತ್ತು ಗೂಗಲ್ ಮ್ಯಾಪ್',
    category: 'Page',
    kannadaCategory: 'ಪುಟ',
    description: 'Hoysala Circle, Kengeri Satellite Town, Bengaluru. 5:30 AM - 10:00 PM Mon-Sat.',
    kannadaDescription: 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಉಪನಗರ, ಬೆಂಗಳೂರು. ಸಂಪರ್ಕಿಸಿ: +91 9740018911.',
    path: '/contact',
    keywords: ['address', 'location', 'phone', 'timing', 'hours', 'map', 'kengeri', 'hoysala circle', 'ವಿಳಾಸ', 'ಸ್ಥಳ', 'ಸಮಯ'],
  },
  {
    id: 'faq-section',
    title: 'Frequently Asked Questions (FAQ)',
    kannadaTitle: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು (FAQ)',
    category: 'Page',
    kannadaCategory: 'ಪುಟ',
    description: 'Answers about membership duration, trainer guidance, trial passes, and diet planning.',
    kannadaDescription: 'ಜಿಮ್ ಸದಸ್ಯತ್ವ, ಉಚಿತ ಟ್ರಯಲ್ ಮತ್ತು ಡಯಟ್ ಬಗ್ಗೆ ಮಾಹಿತಿ.',
    path: '/',
    sectionId: 'faq',
    keywords: ['faq', 'questions', 'answers', 'trial', 'timing', 'lockers', 'ಪ್ರಶ್ನೆಗಳು'],
  },
];

/**
 * Filter search index by query term in English and Kannada
 */
export function searchGymContent(query: string): SearchItem[] {
  if (!query || !query.trim()) return [];
  const clean = query.toLowerCase().trim();

  return SEARCH_INDEX.filter((item) => {
    return (
      item.title.toLowerCase().includes(clean) ||
      item.kannadaTitle.toLowerCase().includes(clean) ||
      item.description.toLowerCase().includes(clean) ||
      item.kannadaDescription.toLowerCase().includes(clean) ||
      item.category.toLowerCase().includes(clean) ||
      item.keywords.some((k) => k.toLowerCase().includes(clean))
    );
  });
}
