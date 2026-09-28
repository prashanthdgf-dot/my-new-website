import { MembershipPlan, Trainer, Testimonial, GalleryItem } from './types';

export type Language = 'en' | 'kn';

export interface FAQItemType {
  question: string;
  answer: string;
}

// Static Strings Translation Dictionary
export const TRANSLATIONS = {
  en: {
    // Header & Navigation
    announcementBar: 'Kengeri’s Premium Strength & Transformation Destination',
    navFeatures: 'Features',
    navPlans: 'Memberships',
    navTrainers: 'Coaches',
    navBmi: 'BMI',
    navGallery: 'Gallery',
    navTestimonials: 'Results',
    navFaq: 'FAQ',
    navContact: 'Contact',
    ctaWhatsApp: 'JOIN DHANUS GOLD',
    ctaCall: 'Call Now',

    // Hero Section
    heroBadge: '🏆 KENGERI’S TRUSTED TRANSFORMATION GYM',
    heroTitlePart1: 'DHANUS GOLD FITNESS —',
    heroTitlePart2: 'GYM & PERSONAL TRAINING IN KENGERI',
    heroSubtitle: 'Transform your fitness with professional training at Dhanus Gold Fitness in Kengeri, Bengaluru. Explore Personal Training, Group Fitness, Women\'s Fitness, Strength Training, Weight Loss programs and structured fitness guidance.',
    heroCtaJoin: 'JOIN DHANUS GOLD FITNESS',
    heroCtaTour: 'EXPLORE MEMBERSHIP PLANS',
    heroStatsTitle: '9+ Years of Fitness Excellence',
    statCapacity: '9+ YEARS',
    statSize: 'TRUSTED SERVICE',
    statEquip: 'Professional gym floor with separate cardio zones for men & women.',
    statSteam: '7 EXPERT TRAINERS',

    // Hero USP Section (New/Updated)
    usp1Title: '9+ YEARS',
    usp1Sub: 'TRUSTED SERVICE',
    usp1Desc: 'Professional gym and personal training excellence in Kengeri since 9+ years.',
    usp2Title: '4,000+ CLIENTS',
    usp2Sub: 'TRAINED PROFESSIONALLY',
    usp2Desc: 'From beginners to celebrities, we have trained thousands of fitness enthusiasts.',
    usp3Title: '600+ RESULTS',
    usp3Sub: 'BODY TRANSFORMATIONS',
    usp3Desc: 'Achieve visible results through our structured workout and nutrition programs.',
    usp4Title: '7 EXPERT TRAINERS',
    usp4Sub: 'PROFESSIONAL COACHING',
    usp4Desc: 'Personalised attention from experienced coaches for every member.',

    // Features Section (Why Choose Us)
    featuresTag: 'WHY CHOOSE DHANUS GOLD FITNESS?',
    featuresTitle: 'SPACIOUS THREE-FLOOR GYM',
    featuresTitleGold: 'IN KENGERI',
    featuresSubtitle: 'Our professionally designed three-floor fitness centre features dedicated areas for strength training, bodybuilding, and separate cardio sections for men and women.',
    feat1Title: 'THREE-FLOOR FACILITY',
    feat1Desc: 'Dedicated zones for bodybuilding, cardio, and personal training across three floors.',
    feat2Title: 'SEPARATE CARDIO ZONES',
    feat2Desc: 'Privacy and comfort with separate cardio areas and changing rooms for men and women.',
    feat3Title: '7 EXPERT COACHES',
    feat3Desc: 'A team of seven experienced coaches providing personalised coaching and diet plans.',
    feat4Title: 'PROVEN TRANSFORMATIONS',
    feat4Desc: 'Join over 600 successful members who achieved their body goals with us.',
    feat5Title: 'DEDICATED STRENGTH AREA',
    feat5Desc: 'Professional quality strength and bodybuilding equipment for serious results.',
    feat6Title: 'BIOMETRIC ASSESSMENT',
    feat6Desc: 'Personalised body assessment and progress tracking for every member.',

    // BMI Section
    bmiTag: '⚖️ METRIC ASSESSMENT',
    bmiTitle: 'Calculate Your',
    bmiTitleGold: 'Body Mass Index (BMI)',
    bmiSubtitle: 'A simple non-invasive metric tool to quickly estimate your body mass category. Speak with our certified personal trainers for deep bio-electrical composition mapping.',
    bmiWeightLabel: 'Weight (kg)',
    bmiHeightLabel: 'Height (cm)',
    bmiBtnCalculate: 'Calculate My BMI',
    bmiResultTitle: 'Your BMI Result',
    bmiResultCategory: 'Category',
    bmiInterpretation: 'Interpretation',
    bmiResetBtn: 'Recalculate',
    bmiUnderweight: 'Underweight',
    bmiNormal: 'Normal weight',
    bmiOverweight: 'Overweight',
    bmiObese: 'Obese',
    bmiUnderweightDesc: 'You are currently below the healthy range. Our customized mass gain plans and premium coaching can help you build clean muscle safely.',
    bmiNormalDesc: 'Excellent! You are in a healthy range. Stay consistent with your training and recovery. Consider our advanced conditioning plans to optimize performance.',
    bmiOverweightDesc: 'You are slightly above the standard range. Our targeted fat loss conditioning, structural strength training, and custom diet designs are perfect for you.',
    bmiObeseDesc: 'Your BMI indicates high body fat levels. Let our medical-fitness experts guide you on a safe, structured, and sustainable wellness transformation journey.',

    // Hero Transformation Panel
    transfSmallTitle: 'REAL MEMBER TRANSFORMATIONS',
    transfLabelBefore: 'BEFORE',
    transfLabelAfter: 'AFTER',
    transfCardTitle: 'MEMBER PROGRESS STORY',
    transfSupporting: 'DISCIPLINE • CONSISTENCY • STRENGTH',
    transfDuration: '24-WEEK JOURNEY',
    transfResult: 'STRONGER BODY | IMPROVED FITNESS | GREATER CONFIDENCE',
    transfBtnShare: 'SHARE THIS TRANSFORMATION',
    transfBtnGallery: 'VIEW COMPLETE TRANSFORMATION GALLERY',
    transfSupportingSmall: 'Explore real progress stories from the Dhanus Gold Fitness community.',
    transfDisclaimer: 'Individual results vary depending on training consistency, nutrition, recovery, lifestyle and starting condition.',

    // About Page
    aboutBadge: 'ABOUT DHANUS GOLD FITNESS',
    aboutTitle: '9+ YEARS OF FITNESS',
    aboutTitleGold: 'EXCELLENCE IN KENGERI',
    aboutIntro: 'Dhanus Gold Fitness is a professionally designed three-floor gym in Kengeri, Bengaluru. For more than 9 years, we have helped thousands of people become stronger, healthier and more confident through structured workouts and expert coaching.',
    aboutMission: 'We provide a safe, motivating and results-focused training environment for beginners, working professionals, athletes, men and women.',
    
    aboutMissionTitle: 'Our Mission',
    aboutMissionText: 'To provide professional fitness guidance, quality training facilities and a supportive environment where every member can achieve their personal fitness goals.',
    
    aboutVisionTitle: 'Our Vision',
    aboutVisionText: 'To be the most trusted fitness destination in Kengeri, known for expert coaching, visible results, and a supportive community.',
    
    aboutPhilosophyTitle: 'Our Philosophy',
    aboutPhilosophyText: 'You do not need to wait until you feel ready. Begin at your current level, remain consistent and allow every workout to move you closer to your goal.',
    
    aboutValuesTitle: 'Our Values',
    aboutVal1: 'DISCIPLINE',
    aboutVal1Desc: 'Progress starts by showing up consistently.',
    aboutVal2: 'INTEGRITY',
    aboutVal2Desc: 'We provide honest guidance and realistic expectations.',
    aboutVal3: 'SAFETY',
    aboutVal3Desc: 'Correct form and responsible training always come first.',
    aboutVal4: 'SUPPORT',
    aboutVal4Desc: 'Every member deserves encouragement and respect.',
    aboutVal5: 'PROGRESS',
    aboutVal5Desc: 'We recognise every improvement, not only major transformations.',
    aboutVal6: 'COMMUNITY',
    aboutVal6Desc: 'We become stronger when we support one another.',
    
    aboutCtaTitle: 'EXPERIENCE THE DHANUS GOLD DIFFERENCE',
    aboutCtaBtn: 'BOOK A GYM VISIT',

    // Training Page
    trainPageBadge: 'TRAINING PROGRAMS',
    trainPageTitle: 'TRAINING DESIGNED',
    trainPageTitleGold: 'AROUND YOUR GOAL',
    trainPageDesc: 'Every fitness journey is different. Your training should reflect your ability, lifestyle, experience and desired outcome.',
    
    train1Title: 'General Gym Training',
    train1Desc: 'Suitable for members who already understand exercise form, equipment usage and workout planning. General membership is not recommended for complete beginners.',
    
    train2Title: 'Beginner Foundation Training',
    train2Desc: 'Understand equipment settings, basic movement patterns, exercise posture, gym safety and workout structure.',
    
    train3Title: 'Strength and Muscle Training',
    train3Desc: 'Improve strength and muscular development through progressive resistance exercises using free weights, machines and compound movements.',
    
    train4Title: 'Weight Management Training',
    train4Desc: 'Combine strength training, cardio and lifestyle improvements to support healthy body composition and better fitness.',
    
    train5Title: 'Personal Training',
    train5Desc: 'Work directly with a dedicated trainer who plans, supervises and adjusts your workouts according to your goals.',
    
    train6Title: 'Functional Fitness',
    train6Desc: 'Improve balance, core strength, mobility, coordination and full-body conditioning.',
    
    train7Title: 'Cardio and Endurance',
    train7Desc: 'Improve cardiovascular performance through treadmills, cycles, cross-trainers and structured conditioning sessions.',
    
    trainCtaTitle: 'CONFUSED ABOUT WHERE TO BEGIN?',
    trainCtaBtn: 'SPEAK WITH A COACH',

    // AI Fitness Section
    aiSmallTitle: 'SMARTER FITNESS WITH DGF AI',
    aiMainTitle: 'YOUR FITNESS JOURNEY, CONNECTED',
    aiDesc: 'Manage your membership, attendance, payments, workout information and progress through the DGF AI Fitness platform.',
    aiFeat1: 'Digital Attendance',
    aiFeat1Desc: 'Track gym visits through our digital attendance system.',
    aiFeat2: 'Membership Management',
    aiFeat2Desc: 'View membership dates, renewal status and important account information.',
    aiFeat3: 'Progress Monitoring',
    aiFeat3Desc: 'Track attendance consistency, measurements and fitness updates.',
    aiFeat4: 'Smart Reminders',
    aiFeat4Desc: 'Receive membership, payment and renewal notifications.',
    aiFeat5: 'Trainer Support',
    aiFeat5Desc: 'Access available workout guidance and trainer updates.',
    aiPortalBtn: 'ACCESS MEMBER PORTAL',

    // Contact Page
    contactBadge: 'CONTACT US TODAY',
    contactTitle: 'START YOUR',
    contactTitleGold: 'FITNESS JOURNEY',
    contactIntro: 'Whether you want to enquire about memberships, book a gym tour or speak with a trainer, our team is here to assist you.',
    
    contactInfoTitle: 'Gym Information',
    contactAddrTitle: 'Location',
    contactAddrText: '3rd & 4th Floor, No. 18, Hoysala Circle, Outer Ring Road, above Trends Junior, opposite Shoppers Choice, Valagerahalli, Gnanabharathi Stage II, Kengeri Satellite Town, Bengaluru, Karnataka – 560060',
    contactPhoneTitle: 'Phone',
    contactEmailTitle: 'Email',
    
    contactHoursTitle: 'Operating Hours',
    contactHoursWeek: 'Mon – Sat: 5:30 AM – 10:00 PM',
    contactHoursSun: 'Sun: 5:00 PM – 9:00 PM',
    
    contactFormTitle: 'SEND US A MESSAGE',
    contactFormName: 'Your Full Name',
    contactFormEmail: 'Email Address',
    contactFormPhone: 'Phone Number',
    contactFormGoal: 'Primary Fitness Goal',
    contactFormMsg: 'How can we help you?',
    contactFormBtn: 'SUBMIT ENQUIRY',

    // Portal Page
    portalBadge: 'DGF AI MEMBER PORTAL',
    portalTitle: 'MANAGE YOUR',
    portalTitleGold: 'FITNESS ACCOUNT',
    portalDesc: 'Login to view your membership details, attendance history and workout progress.',
    portalLoginBtn: 'LOGIN TO PORTAL',
    portalSignupBtn: 'NEW MEMBER REGISTRATION',

    // Footer Content
    footerDesc: 'Kengeri’s premium destination for strength training, body transformation and professional fitness guidance. Build your body. Transform your life.',
    footerQuickLinks: 'Quick Links',
    footerLegal: 'Legal',
    footerCopyright: '© 2024 Dhanus Gold Fitness. All Rights Reserved.',
    footerCredits: 'Designed for Strength. Built for Transformation.',

    // Floating WhatsApp & Pop-up Offer
    whatsappGreeting: 'Hi! Ready to start your fitness journey at Dhanus Gold?',
    whatsappAction: 'CHAT WITH A COACH',
    popupTitle: 'JOIN KENGERI’S PREMIUM GYM',
    popupDesc: 'Start your transformation with advanced equipment and expert coaching.',
    popupCta: 'INQUIRE ABOUT MEMBERSHIPS',
    popupClose: 'Maybe Later',

    // Training Programs Section
    trainingTag: 'TRAIN WITH PURPOSE',
    trainingTitle: 'CHOOSE THE RIGHT PROGRAM',
    trainingTitleGold: 'FOR YOUR GOAL',
    trainingSubtitle: 'Whether you are a complete beginner or an experienced fitness enthusiast, our training options help you follow a more focused and structured fitness journey.',
    
    prog1Title: 'Strength Training',
    prog1Sub: 'BUILD REAL STRENGTH',
    prog1Desc: 'Develop muscular strength, improve performance and build a powerful physique through structured resistance training.',
    prog1Btn: 'EXPLORE STRENGTH TRAINING',

    prog2Title: 'Weight Management',
    prog2Sub: 'FEEL LIGHTER. MOVE BETTER.',
    prog2Desc: 'Combine resistance training, cardio and practical lifestyle guidance to support sustainable weight management.',
    prog2Btn: 'START WEIGHT MANAGEMENT',

    prog3Title: 'Personal Training',
    prog3Sub: 'YOUR GOAL. YOUR COACH. YOUR PLAN.',
    prog3Desc: 'Work one-to-one with a dedicated trainer for personalised workouts, technique correction and regular progress monitoring.',
    prog3Btn: 'EXPLORE PERSONAL TRAINING',

    prog4Title: 'Functional Fitness',
    prog4Sub: 'TRAIN FOR REAL-LIFE PERFORMANCE',
    prog4Desc: 'Improve mobility, coordination, balance, endurance and complete-body movement.',
    prog4Btn: 'DISCOVER FUNCTIONAL FITNESS',

    prog5Title: 'Beginner Fitness',
    prog5Sub: 'START WITH CONFIDENCE',
    prog5Desc: 'Learn correct equipment usage, exercise form and workout fundamentals with professional guidance.',
    prog5Btn: 'BEGIN YOUR FITNESS JOURNEY',

    prog6Title: 'Body Transformation',
    prog6Sub: 'TURN EFFORT INTO VISIBLE PROGRESS',
    prog6Desc: 'Follow a structured combination of strength training, conditioning and consistent lifestyle habits.',
    prog6Btn: 'START YOUR TRANSFORMATION',

    trainingAllBtn: 'VIEW ALL TRAINING PROGRAMS',

    // Membership Section
    plansTag: 'MEMBERSHIP OPTIONS',
    plansTitle: 'CHOOSE THE SUPPORT',
    plansTitleGold: 'YOUR JOURNEY NEEDS',
    plansSubtitle: 'Some members prefer independent workouts, while others progress better with regular coaching. Select a membership based on your experience and required level of support.',
    
    plan1Name: 'General Membership',
    plan1Sub: 'TRAIN INDEPENDENTLY',
    plan1Desc: 'Best suited for experienced members who already understand exercise techniques, workout planning and equipment usage.',
    plan1Includes: 'Gym access, equipment usage and basic floor assistance when available.',
    plan1Btn: 'CHOOSE GENERAL MEMBERSHIP',

    plan2Name: 'Silver Guided Training',
    plan2Sub: 'BUILD A STRONG FOUNDATION',
    plan2Desc: 'Suitable for beginners and members who need basic observation, equipment guidance and regular exercise support.',
    plan2Btn: 'CHOOSE SILVER',

    plan3Name: 'Gold 1+1 Training',
    plan3Sub: 'MORE GUIDANCE. BETTER ACCOUNTABILITY.',
    plan3Desc: 'Receive closer workout supervision, exercise correction and structured support in a limited-member coaching format.',
    plan3Btn: 'CHOOSE GOLD TRAINING',

    plan4Name: 'Premium Personal Training',
    plan4Sub: 'COMPLETE ONE-TO-ONE ATTENTION',
    plan4Desc: 'Get personalised workout programming, dedicated trainer supervision, progress reviews and goal-based adjustments.',
    plan4Btn: 'BOOK PERSONAL TRAINING',

    plansCtaTitle: 'NOT SURE WHICH MEMBERSHIP TO CHOOSE?',
    plansCtaDesc: 'Speak with our team and receive guidance based on your fitness level, goals and training experience.',
    plansCtaBtn: 'GET MEMBERSHIP GUIDANCE',

    // Trainers Section
    trainersTag: '🏋️‍♂️ ELITE COACHING',
    trainersTitle: 'Train With',
    trainersTitleGold: 'Certified Champions',
    trainersSubtitle: 'Our personal trainers aren\'t just instructors—they are certified industry champions, local powerlifters, and wellness specialists dedicated to your success.',
    trainersCertTitle: 'Elite Credentials',
    trainersSpecialtyTitle: 'Key Expertise',

    // Testimonials Section
    testimonialsTag: '📝 MEMBER JOURNAL',
    testimonialsTitle: 'Real Transformations,',
    testimonialsTitleGold: 'Real Local Results',
    testimonialsSubtitle: 'Read authentic journals and feedback from corporate professionals, university students, and local business owners in Kengeri Satellite Town.',
    testimonialsVerified: 'Verified Gold Member',

    // Gallery Section
    galleryTag: '📸 GYM TOUR',
    galleryTitle: 'Our State-of-the-Art',
    galleryTitleGold: 'Luxury Facility',
    gallerySubtitle: 'Take a virtual look inside Dhanus Gold Fitness. Cleanliness, state-of-the-art layout, and premium ambiance designed to inspire every single day.',
    galleryAll: 'All Areas',
    galleryStrength: 'Strength Floor',
    galleryCardio: 'Cardio Zone',
    galleryCrossfit: 'CrossFit Turf',
    galleryWellness: 'Coaching & Diet',
    galleryZumba: 'Zumba Floor',
    galleryDance: 'Kids Dance Floor',
    galleryMMA: 'MMA Floor',

    // FAQ Section
    faqTag: 'FREQUENTLY ASKED QUESTIONS',
    faqTitle: 'COMMON FITNESS',
    faqTitleGold: 'ENQUIRIES',
    faqSubtitle: 'Find answers to common questions about our gym in Kengeri, personal training programs, and facilities.',
    faqCtaText: 'Have more questions? Book a free consultation today!',
    faqWhatsAppBtn: 'Consult a Coach →',

    // SEO Meta
    metaTitle: 'Best Gym in Kengeri | Personal Training | Dhanus Gold Fitness',
    metaDescription: 'Dhanus Gold Fitness is a premium gym in Kengeri, Bengaluru offering personal training, strength training, bodybuilding, fat loss and body transformation programs.',

  },
  kn: {
    // Header & Navigation
    announcementBar: 'ಕೆಂಗೇರಿಯ ಪ್ರೀಮಿಯಂ ಸ್ಟ್ರೆಂತ್ ಮತ್ತು ಪರಿವರ್ತನೆಯ ತಾಣ',
    navFeatures: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    navPlans: 'ಸದಸ್ಯತ್ವ',
    navTrainers: 'ತರಬೇತುದಾರರು',
    navBmi: 'ಬಿಎಂಐ (BMI)',
    navGallery: 'ಗ್ಯಾಲರಿ',
    navTestimonials: 'ಫಲಿತಾಂಶಗಳು',
    navFaq: 'ಪ್ರಶ್ನೆಗಳು',
    navContact: 'ಸಂಪರ್ಕಿಸಿ',
    ctaWhatsApp: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಸೇರಿ',
    ctaCall: 'ಕರೆ ಮಾಡಿ',

    // Hero Section
    heroBadge: '🏆 ಕೆಂಗೇರಿಯ ವಿಶ್ವಾಸಾರ್ಹ ಫಿಟ್ನೆಸ್ ಕೇಂದ್ರ',
    heroTitlePart1: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ —',
    heroTitlePart2: 'ಕೆಂಗೇರಿಯ ಜಿಮ್ ಮತ್ತು ವೈಯಕ್ತಿಕ ತರಬೇತಿ',
    heroSubtitle: 'ಕೆಂಗೇರಿ ಬೆಂಗಳೂರಿನಲ್ಲಿ ವೃತ್ತಿಪರ ತರಬೇತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಫಿಟ್‌ನೆಸ್ ಪರಿವರ್ತಿಸಿ. ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್, ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್, ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ ಮತ್ತು ತೂಕ ಇಳಿಕೆ ಕಾರ್ಯಕ್ರಮಗಳು.',
    heroCtaJoin: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸೇರಿ',
    heroCtaTour: 'ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    heroStatsTitle: '೯+ ವರ್ಷಗಳ ಫಿಟ್ನೆಸ್ ಶ್ರೇಷ್ಠತೆ',
    statCapacity: '೯+ ವರ್ಷಗಳು',
    statSize: 'ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ',
    statEquip: 'ಪುರುಷರು ಮತ್ತು ಮಹಿಳೆಯರಿಗಾಗಿ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ವಲಯಗಳಿರುವ ವೃತ್ತಿಪರ ಜಿಮ್.',
    statSteam: '೭ ಪರಿಣಿತ ತರಬೇತುದಾರರು',

    // Hero USP Section
    usp1Title: '೯+ ವರ್ಷಗಳು',
    usp1Sub: 'ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ',
    usp1Desc: 'ಕೆಂಗೇರಿಯಲ್ಲಿ ೯+ ವರ್ಷಗಳಿಂದ ವೃತ್ತಿಪರ ಜಿಮ್ ಮತ್ತು ವೈಯಕ್ತಿಕ ತರಬೇತಿಯ ಶ್ರೇಷ್ಠತೆ.',
    usp2Title: '೪,೦೦೦+ ಗ್ರಾಹಕರು',
    usp2Sub: 'ವೃತ್ತಿಪರವಾಗಿ ತರಬೇತಿ ಪಡೆದವರು',
    usp2Desc: 'ಹರಿಕಾರರಿಂದ ಹಿಡಿದು ಸೆಲೆಬ್ರಿಟಿಗಳವರೆಗೆ, ನಾವು ಸಾವಿರಾರು ಫಿಟ್ನೆಸ್ ಉತ್ಸಾಹಿಗಳಿಗೆ ತರಬೇತಿ ನೀಡಿದ್ದೇವೆ.',
    usp3Title: '೬೦೦+ ಫಲಿತಾಂಶಗಳು',
    usp3Sub: 'ದೇಹದ ಪರಿವರ್ತನೆಗಳು',
    usp3Desc: 'ನಮ್ಮ ವ್ಯವಸ್ಥಿತ ವರ್ಕೌಟ್ ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶದ ಪ್ರೋಗ್ರಾಂಗಳ ಮೂಲಕ ಗಮನಾರ್ಹ ಫಲಿತಾಂಶಗಳನ್ನು ಪಡೆಯಿರಿ.',
    usp4Title: '೭ ಪರಿಣಿತ ತರಬೇತುದಾರರು',
    usp4Sub: 'ವೃತ್ತಿಪರ ಕೋಚಿಂಗ್',
    usp4Desc: 'ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರಿಗೂ ಅನುಭವಿ ಕೋಚ್‌ಗಳಿಂದ ವೈಯಕ್ತಿಕ ಗಮನ.',

    // Features Section (Why Choose Us)
    featuresTag: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಏಕೆ ಆರಿಸಿಕೊಳ್ಳಬೇಕು?',
    featuresTitle: 'ವಿಶಾಲವಾದ ಮೂರು ಅಂತಸ್ತಿನ ಜಿಮ್',
    featuresTitleGold: 'ಕೆಂಗೇರಿಯಲ್ಲಿ',
    featuresSubtitle: 'ನಮ್ಮ ವೃತ್ತಿಪರವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಮೂರು ಅಂತಸ್ತಿನ ಫಿಟ್ನೆಸ್ ಕೇಂದ್ರವು ಸ್ಟ್ರೆಂತ್ ಟ್ರೈನಿಂಗ್, ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಪುರುಷರು ಹಾಗೂ ಮಹಿಳೆಯರಿಗಾಗಿ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ವಿಭಾಗಗಳನ್ನು ಹೊಂದಿದೆ.',
    feat1Title: 'ಮೂರು ಅಂತಸ್ತಿನ ಸೌಲಭ್ಯ',
    feat1Desc: 'ಮೂರು ಅಂತಸ್ತುಗಳಲ್ಲಿ ಬಾಡಿಬಿಲ್ಡಿಂಗ್, ಕಾರ್ಡಿಯೋ ಮತ್ತು ವೈಯಕ್ತಿಕ ತರಬೇತಿಗಾಗಿ ಮೀಸಲಾದ ವಲಯಗಳು.',
    feat2Title: 'ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ವಲಯಗಳು',
    feat2Desc: 'ಪುರುಷರು ಮತ್ತು ಮಹಿಳೆಯರಿಗಾಗಿ ಪ್ರತ್ಯೇಕ ಕಾರ್ಡಿಯೋ ಪ್ರದೇಶಗಳು ಮತ್ತು ಚೇಂಜಿಂಗ್ ರೂಮ್‌ಗಳೊಂದಿಗೆ ಗೌಪ್ಯತೆ ಮತ್ತು ಆರಾಮ.',
    feat3Title: '೭ ಪರಿಣಿತ ತರಬೇತುದಾರರು',
    feat3Desc: 'ವೈಯಕ್ತಿಕ ಕೋಚಿಂಗ್ ಮತ್ತು ಡಯಟ್ ಪ್ಲಾನ್ ಒದಗಿಸುವ ಏಳು ಅನುಭವಿ ಕೋಚ್‌ಗಳ ತಂಡ.',
    feat4Title: 'ಸಾಬೀತಾದ ಪರಿವರ್ತನೆಗಳು',
    feat4Desc: 'ನಮ್ಮೊಂದಿಗೆ ತಮ್ಮ ದೇಹದ ಗುರಿಗಳನ್ನು ತಲುಪಿದ ೬೦೦ ಕ್ಕೂ ಹೆಚ್ಚು ಯಶಸ್ವಿ ಸದಸ್ಯರು.',
    feat5Title: 'ಮೀಸಲಾದ ಸ್ಟ್ರೆಂತ್ ಏರಿಯಾ',
    feat5Desc: 'ಗಂಭೀರ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ವೃತ್ತಿಪರ ಗುಣಮಟ್ಟದ ಸ್ಟ್ರೆಂತ್ ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಉಪಕರಣಗಳು.',
    feat6Title: 'ಬಯೋಮೆಟ್ರಿಕ್ ಮೌಲ್ಯಮಾಪನ',
    feat6Desc: 'ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರಿಗೂ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ದೇಹದ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಪ್ರಗತಿಯ ಟ್ರ್ಯಾಕಿಂಗ್.',

    // BMI Section
    bmiTag: '⚖️ ದೇಹದ ಅಳತೆ',
    bmiTitle: 'ನಿಮ್ಮ ದೇಹದ',
    bmiTitleGold: 'ಬಿಎಂಐ (BMI) ಲೆಕ್ಕ ಹಾಕಿ',
    bmiSubtitle: 'ನಿಮ್ಮ ದೇಹದ ತೂಕದ ವರ್ಗವನ್ನು ತ್ವರಿತವಾಗಿ ತಿಳಿಯಲು ಸರಳ ಸಾಧನ. ವಿವರವಾದ ದೇಹ ರಚನೆ ಪರೀಕ್ಷೆಗೆ ನಮ್ಮ ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    bmiWeightLabel: 'ತೂಕ (ಕೆಜಿ)',
    bmiHeightLabel: 'ಎತ್ತರ (ಸೆಂ.ಮೀ)',
    bmiBtnCalculate: 'ಬಿಎಂಐ ಲೆಕ್ಕ ಹಾಕಿ',
    bmiResultTitle: 'ನಿಮ್ಮ ಬಿಎಂಐ ಫಲಿತಾಂಶ',
    bmiResultCategory: 'ವರ್ಗ',
    bmiInterpretation: 'ವಿವರಣೆ',
    bmiResetBtn: 'ಮತ್ತೆ ಲೆಕ್ಕ ಹಾಕಿ',
    bmiUnderweight: 'ಕಡಿಮೆ ತೂಕ',
    bmiNormal: 'ಸಾಮಾನ್ಯ ತೂಕ',
    bmiOverweight: 'ಅತಿಯಾದ ತೂಕ',
    bmiObese: 'ಬಹಳ ಅತಿಯಾದ ತೂಕ (ಸ್ಥೂಲಕಾಯ)',
    bmiUnderweightDesc: 'ನೀವು ಪ್ರಸ್ತುತ ಆರೋಗ್ಯಕರ ಮಿತಿಗಿಂತ ಕೆಳಗಿದ್ದೀರಿ. ನಮ್ಮ ತೂಕ ಹೆಚ್ಚಿಸುವ ಯೋಜನೆಗಳು ಮತ್ತು ಪ್ರೀಮಿಯಂ ತರಬೇತಿಯು ನಿಮಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಸ್ನಾಯು ಬೆಳೆಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    bmiNormalDesc: 'ಅದ್ಭುತ! ನೀವು ಆರೋಗ್ಯಕರ ಮಿತಿಯಲ್ಲಿದ್ದೀರಿ. ನಿಮ್ಮ ತರಬೇತಿ ಮತ್ತು ಆಹಾರ ಕ್ರಮವನ್ನು ಹೀಗೆಯೇ ಮುಂದುವರಿಸಿ.',
    bmiOverweightDesc: 'ನೀವು ಸಾಮಾನ್ಯ ಮಿತಿಗಿಂತ ಸ್ವಲ್ಪ ಮೇಲಿದ್ದೀರಿ. ನಮ್ಮ ತೂಕ ಇಳಿಸುವ ವಿಶೇಷ ವ್ಯಾಯಾಮಗಳು ಮತ್ತು ಪ್ರತ್ಯೇಕ ಆಹಾರ ಪದ್ಧತಿಗಳು ನಿಮಗೆ ಸೂಕ್ತವಾಗಿವೆ.',
    bmiObeseDesc: 'ನಿಮ್ಮ ಬಿಎಂಐ ಅತ್ಯಂತ ಅಧಿಕ ದೇಹದ ಕೊಬ್ಬನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಆರೋಗ್ಯಕರ ಮತ್ತು ಶಾಶ್ವತ ಪರಿವರ್ತನೆಗಾಗಿ ನಮ್ಮ ತರಬೇತುದಾರರ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',

    // Hero Transformation Panel
    transfSmallTitle: 'ನಿಜವಾದ ಸದಸ್ಯರ ಪರಿವರ್ತನೆಗಳು',
    transfLabelBefore: 'ಮೊದಲು',
    transfLabelAfter: 'ನಂತರ',
    transfCardTitle: 'ಸದಸ್ಯರ ಪ್ರಗತಿಯ ಕಥೆ',
    transfSupporting: 'ಶಿಸ್ತು • ಸ್ಥಿರತೆ • ಶಕ್ತಿ',
    transfDuration: '೨೪-ವಾರಗಳ ಪಯಣ',
    transfResult: 'ಬಲವಾದ ಶರೀರ | ಸುಧಾರಿತ ಫಿಟ್ನೆಸ್ | ಹೆಚ್ಚಿನ ಆತ್ಮವಿಶ್ವಾಸ',
    transfBtnShare: 'ಈ ಪರಿವರ್ತನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    transfBtnGallery: 'ಸಂಪೂರ್ಣ ಗ್ಯಾಲರಿ ನೋಡಿ',
    transfSupportingSmall: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸಮುದಾಯದ ನೈಜ ಪ್ರಗತಿಯ ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    transfDisclaimer: 'ವೈಯಕ್ತಿಕ ಫಲಿತಾಂಶಗಳು ತರಬೇತಿಯ ಸ್ಥಿರತೆ, ಪೋಷಣೆ, ಜೀವನಶೈಲಿ ಮತ್ತು ಆರಂಭಿಕ ಸ್ಥಿತಿಯನ್ನು ಅವಲಂಬಿಸಿ ಬದಲಾಗುತ್ತವೆ.',

    // About Page
    aboutBadge: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಬಗ್ಗೆ',
    aboutTitle: 'ಎಲ್ಲಿ ಶಿಸ್ತು ಶಕ್ತಿಯನ್ನು',
    aboutTitleGold: 'ನಿರ್ಮಿಸುತ್ತದೆ',
    aboutIntro: 'ಕೆಂಗೇರಿಗೆ ವೃತ್ತಿಪರ ಮತ್ತು ಸ್ಪೂರ್ತಿದಾಯಕ ಫಿಟ್ನೆಸ್ ವಾತಾವರಣವನ್ನು ಒದಗಿಸಲು ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಅನ್ನು ಸ್ಥಾಪಿಸಲಾಯಿತು.',
    aboutMission: 'ನಮ್ಮ ಉದ್ದೇಶ ಕೇವಲ ವ್ಯಾಯಾಮಕ್ಕೆ ಸಹಾಯ ಮಾಡುವುದಲ್ಲ, ಸದಸ್ಯರಲ್ಲಿ ಆತ್ಮವಿಶ್ವಾಸ ಮತ್ತು ಶಿಸ್ತನ್ನು ಬೆಳೆಸುವುದು.',
    
    aboutMissionTitle: 'ನಮ್ಮ ಧ್ಯೇಯ',
    aboutMissionText: 'ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರು ಸುರಕ್ಷಿತವಾಗಿ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮುನ್ನಡೆಯಲು ವೃತ್ತಿಪರ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಗುಣಮಟ್ಟದ ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುವುದು.',
    
    aboutVisionTitle: 'ನಮ್ಮ ದೃಷ್ಟಿ',
    aboutVisionText: 'ಕೆಂಗೇರಿಯ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಫಿಟ್ನೆಸ್ ತಾಣವಾಗಿ ಹೊರಹೊಮ್ಮುವುದು.',
    
    aboutPhilosophyTitle: 'ನಮ್ಮ ತತ್ವಶಾಸ್ತ್ರ',
    aboutPhilosophyText: 'ನೀವು ಸಿದ್ಧರಾಗುವವರೆಗೆ ಕಾಯುವ ಅಗತ್ಯವಿಲ್ಲ. ಈಗಲೇ ಆರಂಭಿಸಿ ಮತ್ತು ಸ್ಥಿರವಾಗಿರಿ.',
    
    aboutValuesTitle: 'ನಮ್ಮ ಮೌಲ್ಯಗಳು',
    aboutVal1: 'ಶಿಸ್ತು',
    aboutVal1Desc: 'ಸ್ಥಿರವಾದ ಪ್ರಯತ್ನದಿಂದ ಪ್ರಗತಿ ಆರಂಭವಾಗುತ್ತದೆ.',
    aboutVal2: 'ಪ್ರಾಮಾಣಿಕತೆ',
    aboutVal2Desc: 'ನಾವು ಪ್ರಾಮಾಣಿಕ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ವಾಸ್ತವಿಕ ನಿರೀಕ್ಷೆಗಳನ್ನು ನೀಡುತ್ತೇವೆ.',
    aboutVal3: 'ಸುರಕ್ಷತೆ',
    aboutVal3Desc: 'ಸರಿಯಾದ ತಂತ್ರ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ತರಬೇತಿಗೆ ಮೊದಲ ಆದ್ಯತೆ.',
    aboutVal4: 'ಬೆಂಬಲ',
    aboutVal4Desc: 'ಪ್ರತಿಯೊಬ್ಬ ಸದಸ್ಯರೂ ಗೌರವ ಮತ್ತು ಪ್ರೋತ್ಸಾಹಕ್ಕೆ ಅರ್ಹರು.',
    aboutVal5: 'ಪ್ರಗತಿ',
    aboutVal5Desc: 'ನಾವು ಪ್ರತಿಯೊಂದು ಸಣ್ಣ ಸುಧಾರಣೆಯನ್ನು ಗುರುತಿಸುತ್ತೇವೆ.',
    aboutVal6: 'ಸಮುದಾಯ',
    aboutVal6Desc: 'ಒಬ್ಬರಿಗೊಬ್ಬರು ಬೆಂಬಲ ನೀಡಿದಾಗ ನಾವು ಬಲಶಾಲಿಯಾಗುತ್ತೇವೆ.',
    
    aboutCtaTitle: 'ಧನುಸ್ ಗೋಲ್ಡ್ ವ್ಯತ್ಯಾಸವನ್ನು ಅನುಭವಿಸಿ',
    aboutCtaBtn: 'ಜಿಮ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',

    // Training Page
    trainPageBadge: 'ತರಬೇತಿ ಪ್ರೋಗ್ರಾಂಗಳು',
    trainPageTitle: 'ನಿಮ್ಮ ಗುರಿಗಾಗಿ',
    trainPageTitleGold: 'ವಿನ್ಯಾಸಗೊಳಿಸಿದ ತರಬೇತಿ',
    trainPageDesc: 'ಪ್ರತಿಯೊಂದು ಫಿಟ್ನೆಸ್ ಪಯಣವೂ ವಿಭಿನ್ನವಾಗಿದೆ. ನಿಮ್ಮ ತರಬೇತಿಯು ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ಗುರಿಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸಬೇಕು.',
    
    train1Title: 'ಸಾಮಾನ್ಯ ಜಿಮ್ ತರಬೇತಿ',
    train1Desc: 'ವ್ಯಾಯಾಮದ ರೂಪ ಮತ್ತು ಉಪಕರಣಗಳ ಬಳಕೆಯನ್ನು ಈಗಾಗಲೇ ತಿಳಿದಿರುವ ಸದಸ್ಯರಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.',
    
    train2Title: 'ಹರಿಕಾರರ ಅಡಿಪಾಯ ತರಬೇತಿ',
    train2Desc: 'ಉಪಕರಣಗಳ ಸೆಟ್ಟಿಂಗ್‌ಗಳು, ಮೂಲಭೂತ ಚಲನೆಗಳು ಮತ್ತು ಜಿಮ್ ಸುರಕ್ಷತೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    
    train3Title: 'ಶಕ್ತಿ ಮತ್ತು ಸ್ನಾಯು ತರಬೇತಿ',
    train3Desc: 'ರೆಸಿಸ್ಟೆನ್ಸ್ ವ್ಯಾಯಾಮಗಳ ಮೂಲಕ ಶಕ್ತಿ ಮತ್ತು ಸ್ನಾಯುವಿನ ಬೆಳವಣಿಗೆಯನ್ನು ಸುಧಾರಿಸಿ.',
    
    train4Title: 'ತೂಕ ನಿರ್ವಹಣೆ ತರಬೇತಿ',
    train4Desc: 'ಆರೋಗ್ಯಕರ ದೇಹದ ರಚನೆಯನ್ನು ಬೆಂಬಲಿಸಲು ಶಕ್ತಿ ತರಬೇತಿ ಮತ್ತು ಕಾರ್ಡಿಯೋವನ್ನು ಸಂಯೋಜಿಸಿ.',
    
    train5Title: 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ',
    train5Desc: 'ನಿಮ್ಮ ಗುರಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ವರ್ಕೌಟ್‌ಗಳನ್ನು ಯೋಜಿಸುವ ತರಬೇತುದಾರರೊಂದಿಗೆ ನೇರವಾಗಿ ಕೆಲಸ ಮಾಡಿ.',
    
    train6Title: 'ಫಂಕ್ಷನಲ್ ಫಿಟ್ನೆಸ್',
    train6Desc: 'ಸಮತೋಲನ, ಕೋರ್ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ಚಲನಶೀಲತೆಯನ್ನು ಸುಧಾರಿಸಿ.',
    
    train7Title: 'ಕಾರ್ಡಿಯೋ ಮತ್ತು ಸಹಿಷ್ಣುತೆ',
    train7Desc: 'ಟ್ರೆಡ್‌ಮಿಲ್‌ಗಳು ಮತ್ತು ಸೈಕಲ್‌ಗಳ ಮೂಲಕ ಹೃದಯದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಸುಧಾರಿಸಿ.',
    
    trainCtaTitle: 'ಎಲ್ಲಿಂದ ಆರಂಭಿಸಬೇಕೆಂದು ಗೊಂದಲವಿದೆಯೇ?',
    trainCtaBtn: 'ಕೋಚ್ ಜೊತೆ ಮಾತನಾಡಿ',

    // AI Fitness Section
    aiSmallTitle: 'SMARTER FITNESS WITH DGF AI',
    aiMainTitle: 'YOUR FITNESS JOURNEY, CONNECTED',
    aiDesc: 'Manage your membership, attendance, payments, workout information and progress through the DGF AI Fitness platform.',
    aiFeat1: 'Digital Attendance',
    aiFeat1Desc: 'Track gym visits through our digital attendance system.',
    aiFeat2: 'Membership Management',
    aiFeat2Desc: 'View membership dates, renewal status and important account information.',
    aiFeat3: 'Progress Monitoring',
    aiFeat3Desc: 'Track attendance consistency, measurements and fitness updates.',
    aiFeat4: 'Smart Reminders',
    aiFeat4Desc: 'Receive membership, payment and renewal notifications.',
    aiFeat5: 'Trainer Support',
    aiFeat5Desc: 'Access available workout guidance and trainer updates.',
    aiPortalBtn: 'ACCESS MEMBER PORTAL',

    // Contact Page
    contactBadge: 'ಈಗಲೇ ಸಂಪರ್ಕಿಸಿ',
    contactTitle: 'ನಿಮ್ಮ ಫಿಟ್ನೆಸ್',
    contactTitleGold: 'ಪಯಣ ಆರಂಭಿಸಿ',
    contactIntro: 'ಸದಸ್ಯತ್ವದ ಬಗ್ಗೆ ವಿಚಾರಿಸಲು ಅಥವಾ ಕೋಚ್ ಜೊತೆ ಮಾತನಾಡಲು ನಮ್ಮ ತಂಡ ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    
    contactInfoTitle: 'ಜಿಮ್ ಮಾಹಿತಿ',
    contactAddrTitle: 'ಸ್ಥಳ',
    contactAddrText: '೩ ಮತ್ತು ೪ನೇ ಮಹಡಿ, ನಂ. ೧೮, ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಔಟರ್ ರಿಂಗ್ ರೋಡ್, ಟ್ರೆಂಡ್ಸ್ ಜೂನಿಯರ್ ಮೇಲೆ, ಶಾಪರ್ಸ್ ಚಾಯ್ಸ್ ಎದುರು, ವಲಗೆರೆಹಳ್ಳಿ, ಜ್ಞಾನಭಾರತಿ ಹಂತ ೨, ಕೆಂಗೇರಿ ಉಪನಗರ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ – ೫೬೦೦೬೦',
    contactPhoneTitle: 'ಫೋನ್',
    contactEmailTitle: 'ಇಮೇಲ್',
    
    contactHoursTitle: 'ಕಾರ್ಯನಿರ್ವಹಣೆಯ ಸಮಯ',
    contactHoursWeek: 'ಸೋಮ – ಶನಿ: ಬೆಳಗ್ಗೆ ೫:೩೦ – ರಾತ್ರಿ ೧೦:೦೦',
    contactHoursSun: 'ಭಾನು: ಸಂಜೆ ೫:೦೦ – ರಾತ್ರಿ ೯:೦೦',
    
    contactFormTitle: 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ',
    contactFormName: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು',
    contactFormEmail: 'ಇಮೇಲ್ ವಿಳಾಸ',
    contactFormPhone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    contactFormGoal: 'ಮುಖ್ಯ ಫಿಟ್ನೆಸ್ ಗುರಿ',
    contactFormMsg: 'ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    contactFormBtn: 'ಸಲ್ಲಿಸಿ',

    // Portal Page
    portalBadge: 'DGF AI ಮೆಂಬರ್ ಪೋರ್ಟಲ್',
    portalTitle: 'ನಿಮ್ಮ ಫಿಟ್ನೆಸ್',
    portalTitleGold: 'ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಿ',
    portalDesc: 'ನಿಮ್ಮ ಸದಸ್ಯತ್ವದ ವಿವರಗಳು, ಹಾಜರಾತಿ ಮತ್ತು ಪ್ರಗತಿಯನ್ನು ವೀಕ್ಷಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ.',
    portalLoginBtn: 'ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
    portalSignupBtn: 'ಹೊಸ ಸದಸ್ಯರ ನೋಂದಣಿ',

    // Footer Content
    footerDesc: 'ಕೆಂಗೇರಿಯ ಪ್ರೀಮಿಯಂ ಸ್ಟ್ರೆಂತ್ ಟ್ರೈನಿಂಗ್ ಮತ್ತು ಶರೀರ ಪರಿವರ್ತನೆಯ ತಾಣ. ನಿಮ್ಮ ಶರೀರವನ್ನು ನಿರ್ಮಿಸಿ. ಜೀವನವನ್ನು ಬದಲಿಸಿ.',
    footerQuickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    footerLegal: 'ಕಾನೂನು',
    footerCopyright: '© ೨೦೨೪ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    footerCredits: 'ಸಾಮರ್ಥ್ಯಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಪರಿವರ್ತನೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',

    // Floating WhatsApp & Pop-up Offer
    whatsappGreeting: 'ನಮಸ್ಕಾರ! ಧನುಸ್ ಗೋಲ್ಡ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಫಿಟ್ನೆಸ್ ಪಯಣ ಆರಂಭಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    whatsappAction: 'ಕೋಚ್ ಜೊತೆ ಚಾಟ್ ಮಾಡಿ',
    popupTitle: 'ಕೆಂಗೇರಿಯ ಪ್ರೀಮಿಯಂ ಜಿಮ್ ಸೇರಿ',
    popupDesc: 'ಆಧುನಿಕ ಉಪಕರಣಗಳು ಮತ್ತು ಪರಿಣಿತ ತರಬೇತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಪರಿವರ್ತನೆಯನ್ನು ಆರಂಭಿಸಿ.',
    popupCta: 'ಸದಸ್ಯತ್ವದ ಬಗ್ಗೆ ವಿಚಾರಿಸಿ',
    popupClose: 'ನಂತರ ನೋಡೋಣ',

    // Training Programs Section
    trainingTag: 'ಸ್ಪೂರ್ತಿಯೊಂದಿಗೆ ತರಬೇತಿ ನೀಡಿ',
    trainingTitle: 'ನಿಮ್ಮ ಗುರಿಗೆ ಸರಿಯಾದ',
    trainingTitleGold: 'ಪ್ರೋಗ್ರಾಂ ಅನ್ನು ಆರಿಸಿ',
    trainingSubtitle: 'ನೀವು ಹರಿಕಾರರಾಗಿರಲಿ ಅಥವಾ ಅನುಭವಿ ಫಿಟ್‌ನೆಸ್ ಉತ್ಸಾಹಿಯಾಗಿರಲಿ, ನಮ್ಮ ತರಬೇತಿ ಆಯ್ಕೆಗಳು ನಿಮಗೆ ಹೆಚ್ಚು ವ್ಯವಸ್ಥಿತವಾದ ಫಿಟ್‌ನೆಸ್ ಪಯಣವನ್ನು ಅನುಸರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    
    prog1Title: 'ಸ್ಟ್ರೆಂತ್ ಟ್ರೈನಿಂಗ್',
    prog1Sub: 'ಬಲವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ',
    prog1Desc: 'ವ್ಯವಸ್ಥಿತ ರೆಸಿಸ್ಟೆನ್ಸ್ ತರಬೇತಿಯ ಮೂಲಕ ಸ್ನಾಯುವಿನ ಬಲವನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿ ಮತ್ತು ಉತ್ತಮ ಶರೀರವನ್ನು ನಿರ್ಮಿಸಿ.',
    prog1Btn: 'ಅನ್ವೇಷಿಸಿ',

    prog2Title: 'ತೂಕ ನಿರ್ವಹಣೆ',
    prog2Sub: 'ಹಗುರವಾಗಿರಿ. ಉತ್ತಮವಾಗಿ ಚಲಿಸಿ.',
    prog2Desc: 'ಸುಸ್ಥಿರ ತೂಕ ನಿರ್ವಹಣೆಯನ್ನು ಬೆಂಬಲಿಸಲು ರೆಸಿಸ್ಟೆನ್ಸ್ ತರಬೇತಿ, ಕಾರ್ಡಿಯೋ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಜೀವನಶೈಲಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಸಂಯೋಜಿಸಿ.',
    prog2Btn: 'ಆರಂಭಿಸಿ',

    prog3Title: 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ',
    prog3Sub: 'ನಿಮ್ಮ ಗುರಿ. ನಿಮ್ಮ ಕೋಚ್. ನಿಮ್ಮ ಯೋಜನೆ.',
    prog3Desc: 'ವೈಯಕ್ತಿಕ ವರ್ಕೌಟ್‌ಗಳು, ತಂತ್ರ ತಿದ್ದುಪಡಿ ಮತ್ತು ನಿಯಮಿತ ಪ್ರಗತಿಯ ಮೇಲ್ವಿಚಾರಣೆಗಾಗಿ ಮೀಸಲಾದ ತರಬೇತುದಾರರೊಂದಿಗೆ ಒಬ್ಬರಿಗೊಬ್ಬರು ಕೆಲಸ ಮಾಡಿ.',
    prog3Btn: 'ಅನ್ವೇಷಿಸಿ',

    prog4Title: 'ಫಂಕ್ಷನಲ್ ಫಿಟ್ನೆಸ್',
    prog4Sub: 'ನಿಜ ಜೀವನದ ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ ತರಬೇತಿ',
    prog4Desc: 'ಚಲನಶೀಲತೆ, ಸಮನ್ವಯ, ಸಮತೋಲನ, ಸಹಿಷ್ಣುತೆ ಮತ್ತು ಸಂಪೂರ್ಣ ದೇಹದ ಚಲನೆಯನ್ನು ಸುಧಾರಿಸಿ.',
    prog4Btn: 'ಅನ್ವೇಷಿಸಿ',

    prog5Title: 'ಹರಿಕಾರರ ಫಿಟ್ನೆಸ್',
    prog5Sub: 'ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಆರಂಭಿಸಿ',
    prog5Desc: 'ವೃತ್ತಿಪರ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಸರಿಯಾದ ಉಪಕರಣಗಳ ಬಳಕೆ, ವ್ಯಾಯಾಮದ ರೂಪ ಮತ್ತು ವರ್ಕೌಟ್ ಮೂಲಭೂತ ಅಂಶಗಳನ್ನು ಕಲಿಯಿರಿ.',
    prog5Btn: 'ಆರಂಭಿಸಿ',

    prog6Title: 'ಶರೀರ ಪರಿವರ್ತನೆ',
    prog6Sub: 'visible ಪ್ರಗತಿಯನ್ನು ಸಾಧಿಸಿ',
    prog6Desc: 'ಸ್ಟ್ರೆಂತ್ ಟ್ರೈನಿಂಗ್, ಕಂಡೀಷನಿಂಗ್ ಮತ್ತು ಸ್ಥಿರವಾದ ಜೀವನಶೈಲಿ ಅಭ್ಯಾಸಗಳ ವ್ಯವಸ್ಥಿತ ಸಂಯೋಜನೆಯನ್ನು ಅನುಸರಿಸಿ.',
    prog6Btn: 'ಆರಂಭಿಸಿ',

    trainingAllBtn: 'ಎಲ್ಲಾ ತರಬೇತಿ ಪ್ರೋಗ್ರಾಂಗಳನ್ನು ನೋಡಿ',

    // Membership Section
    plansTag: 'ಸದಸ್ಯತ್ವದ ಆಯ್ಕೆಗಳು',
    plansTitle: 'ನಿಮ್ಮ ಪಯಣಕ್ಕೆ ಅಗತ್ಯವಿರುವ',
    plansTitleGold: 'ಬೆಂಬಲವನ್ನು ಆರಿಸಿ',
    plansSubtitle: 'ಕೆಲವು ಸದಸ್ಯರು ಸ್ವತಂತ್ರ ವರ್ಕೌಟ್‌ಗಳನ್ನು ಇಷ್ಟಪಡುತ್ತಾರೆ, ಆದರೆ ಇತರರು ನಿಯಮಿತ ಕೋಚಿಂಗ್‌ನೊಂದಿಗೆ ಉತ್ತಮವಾಗಿ ಪ್ರಗತಿ ಸಾಧಿಸುತ್ತಾರೆ. ನಿಮ್ಮ ಅನುಭವ ಮತ್ತು ಅಗತ್ಯವಿರುವ ಬೆಂಬಲದ ಮಟ್ಟಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸದಸ್ಯತ್ವವನ್ನು ಆರಿಸಿ.',
    
    plan1Name: 'ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವ',
    plan1Sub: 'ಸ್ವತಂತ್ರವಾಗಿ ತರಬೇತಿ ನೀಡಿ',
    plan1Desc: 'ವ್ಯಾಯಾಮ ತಂತ್ರಗಳು, ವರ್ಕೌಟ್ ಯೋಜನೆ ಮತ್ತು ಉಪಕರಣಗಳ ಬಳಕೆಯನ್ನು ಈಗಾಗಲೇ ಅರ್ಥಮಾಡಿಕೊಂಡಿರುವ ಅನುಭವಿ ಸದಸ್ಯರಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.',
    plan1Includes: 'ಜಿಮ್ ಪ್ರವೇಶ, ಉಪಕರಣಗಳ ಬಳಕೆ ಮತ್ತು ಲಭ್ಯವಿದ್ದಾಗ ಮೂಲಭೂತ ಮಾರ್ಗದರ್ಶನ.',
    plan1Btn: 'ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವ ಆರಿಸಿ',

    plan2Name: 'ಸಿಲ್ವರ್ ಗೈಡೆಡ್ ತರಬೇತಿ',
    plan2Sub: 'ಬಲವಾದ ಅಡಿಪಾಯ ನಿರ್ಮಿಸಿ',
    plan2Desc: 'ಆರಂಭಿಕರಿಗಾಗಿ ಮತ್ತು ಮೂಲಭೂತ ವೀಕ್ಷಣೆ, ಉಪಕರಣಗಳ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನಿಯಮಿತ ವ್ಯಾಯಾಮ ಬೆಂಬಲ ಅಗತ್ಯವಿರುವ ಸದಸ್ಯರಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.',
    plan2Btn: 'ಸಿಲ್ವರ್ ಆರಿಸಿ',

    plan3Name: 'ಗೋಲ್ಡ್ ೧+೧ ತರಬೇತಿ',
    plan3Sub: 'ಹೆಚ್ಚಿನ ಮಾರ್ಗದರ್ಶನ. ಉತ್ತಮ ಹೊಣೆಗಾರಿಕೆ.',
    plan3Desc: 'ಸೀಮಿತ ಸದಸ್ಯರ ಕೋಚಿಂಗ್ ಫಾರ್ಮ್ಯಾಟ್‌ನಲ್ಲಿ ಹತ್ತಿರದ ವರ್ಕೌಟ್ ಮೇಲ್ವಿಚಾರಣೆ, ವ್ಯಾಯಾಮ ತಿದ್ದುಪಡಿ ಮತ್ತು ವ್ಯವಸ್ಥಿತ ಬೆಂಬಲವನ್ನು ಪಡೆಯಿರಿ.',
    plan3Btn: 'ಗೋಲ್ಡ್ ತರಬೇತಿ ಆರಿಸಿ',

    plan4Name: 'ಪ್ರೀಮಿಯಂ ವೈಯಕ್ತಿಕ ತರಬೇತಿ',
    plan4Sub: 'ಸಂಪೂರ್ಣ ವೈಯಕ್ತಿಕ ಗಮನ',
    plan4Desc: 'ವೈಯಕ್ತಿಕ ವರ್ಕೌಟ್ ಪ್ರೋಗ್ರಾಮಿಂಗ್, ಮೀಸಲಾದ ತರಬೇತುದಾರರ ಮೇಲ್ವಿಚಾರಣೆ, ಪ್ರಗತಿ ವಿಮರ್ಶೆಗಳು ಮತ್ತು ಗುರಿ-ಆಧಾರಿತ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    plan4Btn: 'ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್ ಬುಕ್ ಮಾಡಿ',

    plansCtaTitle: 'ಯಾವ ಸದಸ್ಯತ್ವವನ್ನು ಆರಿಸಬೇಕೆಂದು ತಿಳಿದಿಲ್ಲವೇ?',
    plansCtaDesc: 'ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಫಿಟ್ನೆಸ್ ಮಟ್ಟ, ಗುರಿಗಳು ಮತ್ತು ತರಬೇತಿ ಅನುಭವದ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    plansCtaBtn: 'ಸದಸ್ಯತ್ವ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ',

    // Trainers Section
    trainersTag: '🏋️‍♂️ ಪ್ರಮುಖ ತರಬೇತುದಾರರು',
    trainersTitle: 'ವಿಜೇತರಿಂದ',
    trainersTitleGold: 'ತರಬೇತಿ ಪಡೆಯಿರಿ',
    trainersSubtitle: 'ನಮ್ಮ ತರಬೇತುದಾರರು ಕೇವಲ ಶಿಕ್ಷಕರಲ್ಲ—ಅವರು ರಾಜ್ಯ ಮಟ್ಟದ ಪ್ರಶಸ್ತಿ ವಿಜೇತರು, ಬಾಡಿಬಿಲ್ಡರ್ಸ್ ಮತ್ತು ನಿಮ್ಮ ಯಶಸ್ಸಿಗೆ ಶ್ರಮಿಸುವ ಪರಿಣಿತರು.',
    trainersCertTitle: 'ತರಬೇತುದಾರರ ಅರ್ಹತೆಗಳು',
    trainersSpecialtyTitle: 'ಪ್ರಮುಖ ಪರಿಣತಿ',

    // Testimonials Section
    testimonialsTag: '📝 ಗ್ರಾಹಕರ ಜರ್ನಲ್',
    testimonialsTitle: 'ನಿಜವಾದ ಪರಿವರ್ತನೆಗಳು,',
    testimonialsTitleGold: 'ನಮ್ಮ ಸ್ಥಳೀಯ ಫಲಿತಾಂಶಗಳು',
    testimonialsSubtitle: 'ಕೆಂಗೇರಿ ಉಪನಗರದ ಐಟಿ ಉದ್ಯೋಗಿಗಳು, ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಉದ್ಯಮಿಗಳಿಂದ ಬಂದಿರುವ ನೈಜ ಅನುಭವಗಳನ್ನು ಓದಿ.',
    testimonialsVerified: 'ದೃಢೀಕೃತ ಗೋಲ್ಡ್ ಸದಸ್ಯ',

    // Gallery Section
    galleryTag: '📸 ಜಿಮ್ ಪ್ರವಾಸ',
    galleryTitle: 'ನಮ್ಮ ಅತ್ಯಾಧುನಿಕ',
    galleryTitleGold: 'ಐಷಾರಾಮಿ ಸೌಲಭ್ಯಗಳು',
    gallerySubtitle: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಒಳಗಿನ ನೋಟ. ನಿಮ್ಮ ದಿನನಿತ್ಯದ ವ್ಯಾಯಾಮಕ್ಕೆ ಸ್ಪೂರ್ತಿ ನೀಡುವ ಸ್ವಚ್ಛತೆ ಮತ್ತು ಪ್ರೀಮಿಯಂ ವಾತಾವರಣ.',
    galleryAll: 'ಎಲ್ಲಾ ಭಾಗಗಳು',
    galleryStrength: 'ಸ್ಟ್ರೆಂತ್ ಫ್ಲೋರ್',
    galleryCardio: 'ಕಾರ್ಡಿಯೋ ಜೋನ್',
    galleryCrossfit: 'ಕ್ರಾಸ್‌ಫಿಟ್ ಟರ್ಫ್',
    galleryWellness: 'ತರಬೇತಿ ಮತ್ತು ಡಯಟ್',
    galleryZumba: 'ಜುಂಬಾ ಫ್ಲೋರ್',
    galleryDance: 'ಮಕ್ಕಳ ನೃತ್ಯ ವಿಭಾಗ',
    galleryMMA: 'MMA ಫ್ಲೋರ್',

    // FAQ Section
    faqTag: '💬 ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
    faqTitle: 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?',
    faqTitleGold: 'ನಮ್ಮಲ್ಲಿ ಉತ್ತರಗಳಿವೆ',
    faqSubtitle: 'ಕೆಂಗೇರಿ ಉಪನಗರ ಜಿಮ್‌ನ ಸಮಯ, ಪಾರ್ಕಿಂಗ್, ಸ್ಥಳ ಮತ್ತು ಸದಸ್ಯತ್ವಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳಿಗೆ ಇಲ್ಲಿ ಉತ್ತರಗಳಿವೆ.',
    faqCtaText: 'ಇಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡದಿರುವ ಬೇರೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನೇರವಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ!',
    faqWhatsAppBtn: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕೇಳಿ →',

    // SEO Meta
    metaTitle: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ | ಕೆಂಗೇರಿಯ ಅತ್ಯುತ್ತಮ ಜಿಮ್ ಮತ್ತು ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೇಂದ್ರ',
    metaDescription: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸೇರಿ, ಕೆಂಗೇರಿಯ ವೃತ್ತಿಪರ ಮೂರು ಅಂತಸ್ತಿನ ಜಿಮ್. ೯+ ವರ್ಷಗಳ ಸೇವೆ, ೪,೦೦೦+ ಗ್ರಾಹಕರಿಗೆ ತರಬೇತಿ ಮತ್ತು ೬೦೦+ ಪರಿವರ್ತನೆಗಳು. ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಸ್ಟ್ರೆಂತ್ ಟ್ರೈನಿಂಗ್, ಕಾರ್ಡಿಯೋ, ಕೊಬ್ಬು ಇಳಿಕೆ, ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಮಹಿಳೆಯರ ಫಿಟ್ನೆಸ್ ಪ್ರೋಗ್ರಾಂಗಳು.',
  }
};

// Localized Membership Plans for Kengeri
export const MEMBERSHIP_PLANS_LOC = {
  en: [
    {
      id: 'general',
      name: 'General Fitness',
      price: '1,999',
      period: 'month',
      description: 'Independent training for experienced members.',
      features: [
        'Premium Gym Access (5,100 Sq. Ft.)',
        'Advanced Strength Equipment',
        'Cardio & Functional Zones',
        'Digital Attendance Tracking',
        'Basic Floor Support',
        'Locker & Shower Facilities'
      ],
      popular: false
    },
    {
      id: 'silver',
      name: 'Silver Personal Training',
      price: '5,999',
      period: 'month',
      description: 'Structured guidance for beginners.',
      features: [
        'All General Membership Features',
        'Guided Workout Sessions',
        'Equipment Usage Instruction',
        'Posture & Form Correction',
        'Monthly Body Analysis (InBody)',
        'Basic Nutrition Guidance'
      ],
      popular: true
    },
    {
      id: 'gold',
      name: 'Gold Personal Training',
      price: '14,999',
      period: 'month',
      description: 'Closer supervision and accountability.',
      features: [
        'Semi-Private Coaching (1 Coach : 2 Members)',
        'Targeted Goal Programming',
        'Closer Form Supervision',
        'Progress Accountability',
        'Personalised Diet Design',
        'Priority Coach Access'
      ],
      popular: false
    }
  ],
  kn: [
    {
      id: 'general',
      name: 'ಸಾಮಾನ್ಯ ಫಿಟ್‌ನೆಸ್',
      price: '೧,೯೯೯',
      period: 'ತಿಂಗಳು',
      description: 'ಅನುಭವಿ ಸದಸ್ಯರಿಗೆ ಸ್ವತಂತ್ರ ತರಬೇತಿ.',
      features: [
        'ಪ್ರೀಮಿಯಂ ಜಿಮ್ ಪ್ರವೇಶ (೫,೧೦೦ ಚದರ ಅಡಿ)',
        'ಸುಧಾರಿತ ಸ್ಟ್ರೆಂತ್ ಉಪಕರಣಗಳು',
        'ಕಾರ್ಡಿಯೋ ಮತ್ತು ಫಂಕ್ಷನಲ್ ವಲಯಗಳು',
        'ಡಿಜಿಟಲ್ ಹಾಜರಾತಿ ಟ್ರ್ಯಾಕಿಂಗ್',
        'ಮೂಲಭೂತ ಬೆಂಬಲ',
        'ಲಾಕರ್ ಮತ್ತು ಶವರ್ ಸೌಲಭ್ಯಗಳು'
      ],
      popular: false
    },
    {
      id: 'silver',
      name: 'ಸಿಲ್ವರ್ ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್',
      price: '೫,೯೯೯',
      period: 'ತಿಂಗಳು',
      description: 'ಆರಂಭಿಕರಿಗಾಗಿ ವ್ಯವಸ್ಥಿತ ಮಾರ್ಗದರ್ಶನ.',
      features: [
        'ಎಲ್ಲಾ ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವದ ಸೌಲಭ್ಯಗಳು',
        'ಮಾರ್ಗದರ್ಶಿತ ವರ್ಕೌಟ್ ಸೆಷನ್‌ಗಳು',
        'ಉಪಕರಣಗಳ ಬಳಕೆಯ ಸೂಚನೆ',
        'ಪೋಸ್ಚರ್ ಮತ್ತು ಫಾರ್ಮ್ ತಿದ್ದುಪಡಿ',
        'ಮಾಸಿಕ ದೇಹ ವಿಶ್ಲೇಷಣೆ (InBody)',
        'ಮೂಲಭೂತ ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ'
      ],
      popular: true
    },
    {
      id: 'gold',
      name: 'ಗೋಲ್ಡ್ ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್',
      price: '೧೪,೯೯೯',
      period: 'ತಿಂಗಳು',
      description: 'ಹತ್ತಿರದ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಹೊಣೆಗಾರಿಕೆ.',
      features: [
        'ಅರೆ-ಖಾಸಗಿ ಕೋಚಿಂಗ್ (೧ ಕೋಚ್ : ೨ ಸದಸ್ಯರು)',
        'ಗುರಿ ಆಧಾರಿತ ಪ್ರೋಗ್ರಾಮಿಂಗ್',
        'ಹತ್ತಿರದ ತಂತ್ರದ ಮೇಲ್ವಿಚಾರಣೆ',
        'ಪ್ರಗತಿಯ ಹೊಣೆಗಾರಿಕೆ',
        'ವೈಯಕ್ತಿಕ ಆಹಾರ ಯೋಜನೆ',
        'ಕೋಚ್‌ಗೆ ಆದ್ಯತೆಯ ಪ್ರವೇಶ'
      ],
      popular: false
    }
  ]
};

// Localized Kengeri Trainers
export const TRAINERS_LOC = {
  en: [
    {
      id: 'prashanth',
      name: 'Prashanth',
      role: 'Founder & Head Bodybuilding Trainer',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr1_ek1a4i.png',
      specialties: ['Bodybuilding Coaching', 'Strength Mastery', 'Elite Transformations'],
      certifications: [
        'Founder of Dhanus Gold Fitness',
        'Expert Strength Coach',
        'Mr. Karnataka Medalist'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'dhananjay',
      name: 'Dhananjay',
      role: 'Founder & Head Bodybuilding Trainer',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901528/tr2_v2ndpk.png',
      specialties: ['Bodybuilding Coaching', 'Strength Mastery', 'Elite Transformations'],
      certifications: [
        'Founder of Dhanus Gold Fitness',
        'Expert Strength Coach',
        'Mr. Karnataka Medalist'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'balaji',
      name: 'Balaji',
      role: 'Professional Personal Trainer',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr3_x80itq.png',
      specialties: ['Personal Training', 'Fat Loss', 'Muscle Building'],
      certifications: [
        'Level 4 Fitness Specialist',
        'Certified Strength Coach',
        'Nutrition & Wellness Expert'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'kiran',
      name: 'Kiran',
      role: 'Professional Personal Trainer',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr5_nji6id.png',
      specialties: ['Personal Training', 'Weight Management', 'Strength Training'],
      certifications: [
        'Certified Fitness Professional',
        'Biomechanics Specialist',
        'Corrective Exercise Expert'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'manju',
      name: 'Manjunath',
      role: 'Professional Personal Trainer',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901528/tr6_eqcaud.png',
      specialties: ['Personal Training', 'Functional Training', 'Mobility'],
      certifications: [
        'Strength & Conditioning Expert',
        'Body Recomposition Coach',
        'Performance Enhancement Specialist'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'vinay',
      name: 'Vinay',
      role: 'Professional Personal Trainer',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr7_fhfjsv.png',
      specialties: ['Personal Training', 'Powerlifting', 'Strength Training'],
      certifications: [
        'Certified Powerlifting Coach',
        'Strength & Performance Specialist',
        'Clinical Nutritionist'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    }
  ],
  kn: [
    {
      id: 'prashanth',
      name: 'ಪ್ರಶಾಂತ್',
      role: 'ಸ್ಥಾಪಕರು ಮತ್ತು ಮುಖ್ಯ ತರಬೇತುದಾರರು',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr1_ek1a4i.png',
      specialties: ['ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಕೋಚಿಂಗ್', 'ಸ್ಟ್ರೆಂತ್ ಮಾಸ್ಟರಿ', 'ಎಲೈಟ್ ಪರಿವರ್ತನೆಗಳು'],
      certifications: [
        'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸ್ಥಾಪಕರು',
        'ಪರಿಣಿತ ಸ್ಟ್ರೆಂತ್ ಕೋಚ್',
        'ಮಿಸ್ಟರ್ ಕರ್ನಾಟಕ ಪದಕ ವಿಜೇತರು'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'dhananjay',
      name: 'ಧನಂಜಯ್',
      role: 'ಸ್ಥಾಪಕರು ಮತ್ತು ಮುಖ್ಯ ತರಬೇತುದಾರರು',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901528/tr2_v2ndpk.png',
      specialties: ['ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಕೋಚಿಂಗ್', 'ಸ್ಟ್ರೆಂತ್ ಮಾಸ್ಟರಿ', 'ಎಲೈಟ್ ಪರಿವರ್ತನೆಗಳು'],
      certifications: [
        'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಸ್ಥಾಪಕರು',
        'ಪರಿಣಿತ ಸ್ಟ್ರೆಂತ್ ಕೋಚ್',
        'ಮಿಸ್ಟರ್ ಕರ್ನಾಟಕ ಪದಕ ವಿಜೇತರು'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'balaji',
      name: 'ಬಾಲಾಜಿ',
      role: 'ವೃತ್ತಿಪರ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr3_x80itq.png',
      specialties: ['ವೈಯಕ್ತಿಕ ತರಬೇತಿ', 'ಕೊಬ್ಬು ಇಳಿಕೆ', 'ಸ್ನಾಯು ಅಭಿವೃದ್ಧಿ'],
      certifications: [
        'ಲೆವೆಲ್ ೪ ಫಿಟ್ನೆಸ್ ತಜ್ಞರು',
        'ಪ್ರಮಾಣೀಕೃತ ಸ್ಟ್ರೆಂತ್ ಕೋಚ್',
        'ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಕ್ಷೇಮ ತಜ್ಞರು'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'kiran',
      name: 'ಕಿರಣ್',
      role: 'ವೃತ್ತಿಪರ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr5_nji6id.png',
      specialties: ['ವೈಯಕ್ತಿಕ ತರಬೇತಿ', 'ತೂಕ ನಿರ್ವಹಣೆ', 'ಶಕ್ತಿ ತರಬೇತಿ'],
      certifications: [
        'ಪ್ರಮಾಣೀಕೃತ ಫಿಟ್ನೆಸ್ ವೃತ್ತಿಪರ',
        'ಬಯೋಮೆಕಾನಿಕ್ಸ್ ತಜ್ಞರು',
        'ಕರೆಕ್ಟಿವ್ ಎಕ್ಸರ್ಸೈಜ್ ಎಕ್ಸ್‌ಪರ್ಟ್'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'manju',
      name: 'ಮಂಜುನಾಥ್',
      role: 'ವೃತ್ತಿಪರ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901528/tr6_eqcaud.png',
      specialties: ['ವೈಯಕ್ತಿಕ ತರಬೇತಿ', 'ಫಂಕ್ಷನಲ್ ತರಬೇತಿ', 'ಮೊಬಿಲಿಟಿ'],
      certifications: [
        'ಸ್ಟ್ರೆಂತ್ ಮತ್ತು ಕಂಡೀಷನಿಂಗ್ ತಜ್ಞರು',
        'ಬಾಡಿ ರಿಕಂಪೊಸಿಷನ್ ಕೋಚ್',
        'ಪರ್ಫಾರ್ಮೆನ್ಸ್ ಎನ್ಹಾನ್ಸ್‌ಮೆಂಟ್ ತಜ್ಞರು'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    },
    {
      id: 'vinay',
      name: 'ವಿನಯ್',
      role: 'ವೃತ್ತಿಪರ ವೈಯಕ್ತಿಕ ತರಬೇತುದಾರ',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1784901526/tr7_fhfjsv.png',
      specialties: ['ವೈಯಕ್ತಿಕ ತರಬೇತಿ', 'ಪವರ್‌ಲಿಫ್ಟಿಂಗ್', 'ಶಕ್ತಿ ತರಬೇತಿ'],
      certifications: [
        'ಪ್ರಮಾಣೀಕೃತ ಪವರ್‌ಲಿಫ್ಟಿಂಗ್ ಕೋಚ್',
        'ಸ್ಟ್ರೆಂತ್ ಮತ್ತು ಪರ್ಫಾರ್ಮೆನ್ಸ್ ತಜ್ಞರು',
        'ಕ್ಲಿನಿಕಲ್ ನ್ಯೂಟ್ರಿಷನಿಸ್ಟ್'
      ],
      instagramUrl: 'https://instagram.com/dhanush_gold_fitness'
    }
  ]
};

// Localized Testimonials
export const TESTIMONIALS_LOC = {
  en: [
    {
      id: 'manoj_k',
      name: 'DGF Member',
      role: 'Lead Architect',
      location: 'Kengeri Satellite Town',
      rating: 5,
      text: "Dhanus Gold Fitness is by far the best gym near Kengeri Metro Station. The strength equipment is world-class and imported, not local. Dhanush sir's personalized transformation program helped me gain 6kg of lean muscle in 3 months! Highly recommended for working professionals looking for elite timing flexibility.",
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg'
    },
    {
      id: 'sneha_r',
      name: 'DGF Member',
      role: 'Research Student',
      location: 'Bangalore University Campus',
      rating: 5,
      text: "As a student at Bangalore University, I wanted an affordable yet premium gym in Kengeri. Priya mam designed an incredible diet plan and home/gym workout schedule. The gym is extremely clean, very safe for women, and the steam bath facility is absolute bliss after high-intensity training!",
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845390/_A0A4944_djqbto.jpg'
    },
    {
      id: 'abhishek_m',
      name: 'DGF Member',
      role: 'Local Business Owner',
      location: 'Kengeri Club Road',
      rating: 5,
      text: "Superb gym floor layout! No waiting for benches or cables even during peak hours. The trainers actually guide you and don't push commercial supplements unnecessarily. The 3-Month Gold Plan is priced so reasonably for the luxury they offer. Clean lockers, amazing steam, and superb parking space.",
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845316/_A0A5580_dbtzio.jpg'
    }
  ],
  kn: [
    {
      id: 'manoj_k',
      name: 'ಡಿಜಿಎಫ್ ಸದಸ್ಯರು',
      role: 'ಮುಖ್ಯ ವಾಸ್ತುಶಿಲ್ಪಿ',
      location: 'ಕೆಂಗೇರಿ ಉಪನಗರ',
      rating: 5,
      text: "ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ ಮೆಟ್ರೋ ನಿಲ್ದಾಣದ ಬಳಿ ಇರುವ ಅತ್ಯುತ್ತಮ ಜಿಮ್ ಆಗಿದೆ. ಇಲ್ಲಿರುವ ಸಾಮರ್ಥ್ಯದ ಉಪಕರಣಗಳು ಜಾಗತಿಕ ಗುಣಮಟ್ಟದಾಗಿದ್ದು ಸಂಪೂರ್ಣ ಆಮದು ಮಾಡಿಕೊಂಡವುಗಳಾಗಿವೆ. ಧನುಷ್ ಸರ್ ಅವರ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮವು ಕೇವಲ ೩ ತಿಂಗಳಲ್ಲಿ ೬ ಕೆಜಿ ಸ್ನಾಯು ತೂಕವನ್ನು ಹೆಚ್ಚಿಸಲು ನನಗೆ ಸಹಾಯ ಮಾಡಿತು! ಉದ್ಯೋಗಿಗಳಿಗೆ ಇದು ಹೆಚ್ಚು ಸೂಕ್ತವಾಗಿದೆ.",
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg'
    },
    {
      id: 'sneha_r',
      name: 'ಡಿಜಿಎಫ್ ಸದಸ್ಯರು',
      role: 'ಸಂಶೋಧನಾ ವಿದ್ಯಾರ್ಥಿನಿ',
      location: 'ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ಆವರಣ',
      rating: 5,
      text: "ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದ ವಿದ್ಯಾರ್ಥಿನಿಯಾಗಿ ನನಗೆ ಕೆಂಗೇರಿಯಲ್ಲಿ ಕೈಗೆಟುಕುವ ಮತ್ತು ಗುಣಮಟ್ಟದ ಜಿಮ್ ಬೇಕಿತ್ತು. ಪ್ರಿಯಾ ಮ್ಯಾಮ್ ಅತ್ಯುತ್ತಮ ಡಯಟ್ ಪ್ಲಾನ್ ಮತ್ತು ವರ್ಕೌಟ್ ಚಾರ್ಟ್ ಸಿದ್ಧಪಡಿಸಿದರು. ಈ ಜಿಮ್ ತುಂಬಾ ಸ್ವಚ್ಛವಾಗಿದೆ, ಮಹಿಳೆಯರಿಗೆ ಅತ್ಯಂತ ಸುರಕ್ಷಿತವಾಗಿದೆ ಮತ್ತು ಜಿಮ್ ಮುಗಿದ ನಂತರ ಸ್ಟೀಮ್ ಬಾತ್ ಸೌಲಭ್ಯ ಅದ್ಭುತ ಆನಂದ ನೀಡುತ್ತದೆ!",
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845390/_A0A4944_djqbto.jpg'
    },
    {
      id: 'abhishek_m',
      name: 'ಡಿಜಿಎಫ್ ಸದಸ್ಯರು',
      role: 'ಸ್ಥಳೀಯ ಉದ್ಯಮಿ',
      location: 'ಕೆಂಗೇರಿ ಕ್ಲಬ್ ರಸ್ತೆ',
      rating: 5,
      text: "ಅತ್ಯುತ್ತಮ ಜಿಮ್ ಫ್ಲೋರ್ ವಿನ್ಯಾಸ! ಜನದಟ್ಟಣೆ ಇರುವ ಸಮಯದಲ್ಲೂ ಯಂತ್ರಗಳಿಗಾಗಿ ಕಾಯುವ ಅಗತ್ಯವಿಲ್ಲ. ತರಬೇತುದಾರರು ನಿಜವಾಗಿಯೂ ಸಹಾಯ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ಕೃತಕ ಸಪ್ಲಿಮೆಂಟ್‌ಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಒತ್ತಾಯಿಸುವುದಿಲ್ಲ. ಈ ಐಷಾರಾಮಿತನಕ್ಕೆ ಹೋಲಿಸಿದರೆ ಪ್ಯಾಕೇಜ್ ಬೆಲೆಗಳು ಅತ್ಯಂತ ಕಡಿಮೆ. ಕ್ಲೀನ್ ಲಾಕರ್‌ಗಳು ಮತ್ತು ಪ್ರತ್ಯೇಕ ಪಾರ್ಕಿಂಗ್ ಅದ್ಭುತವಾಗಿದೆ.",
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845316/_A0A5580_dbtzio.jpg'
    }
  ]
};

// Localized Gallery Items
export const GALLERY_ITEMS_LOC = {
  en: [
    {
      id: 'gal_1',
      title: 'Premium Plate-Loaded Strength Floor',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845575/_A0A5476_nr9fab.jpg',
      description: 'Biometrically optimized plate-loaded machines for maximum muscle contraction and safety.'
    },
    {
      id: 'gal_2',
      title: 'Elite Dumbbell & Free-Weights Rack',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845577/_A0A5475_re44az.jpg',
      description: 'Rubber-coated hex dumbbells ranging from 2kg to 50kg, with multi-angle luxury adjustable benches.'
    },
    {
      id: 'gal_3',
      title: 'Smart Cardio Interactive Zone',
      category: 'cardio',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg',
      description: 'Equipped with commercial interactive treadmills, spin bikes, and elliptical trainers with private screens.'
    },
    {
      id: 'gal_4',
      title: 'Zumba & Aerobics High-Energy Floor',
      category: 'zumba',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845424/_A0A4976_rhdscw.jpg',
      description: 'Spacious, high-energy environment for Zumba, Aerobics and group fitness classes.'
    },
    {
      id: 'gal_5',
      title: 'Kids Dance & Yoga Studio',
      category: 'dance',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845383/_A0A4924_axh86z.jpg',
      description: 'Vibrant and safe space dedicated to kids dance, flexibility and mindful yoga.'
    },
    {
      id: 'gal_6',
      title: 'MMA & Combat Training Zone',
      category: 'mma',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845507/_A0A5199_gvwzbr.jpg',
      description: 'Professional grade combat mats for Mixed Martial Arts, wrestling and self-defense training.'
    },
    {
      id: 'gal_7',
      title: 'Advanced Strength Mastery Section',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845567/_A0A5452_b1urhk.jpg',
      description: 'High-performance strength equipment designed for professional athletes and bodybuilders.'
    },
    {
      id: 'gal_8',
      title: 'Dumbbell Precision Rack',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845571/_A0A5460_r4ao61.jpg',
      description: 'Extensive range of free weights for precision hypertrophy and strength work.'
    },
    {
      id: 'gal_9',
      title: 'MMA Training & Conditioning',
      category: 'mma',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845505/_A0A5197_cdplpm.jpg',
      description: 'Dedicated combat zone for functional conditioning and professional MMA drills.'
    },
    {
      id: 'gal_10',
      title: 'Professional Combat Arena',
      category: 'mma',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845501/_A0A5173_z7pkbv.jpg',
      description: 'Elite MMA floor with professional mats for grappling and striking.'
    },
    {
      id: 'gal_11',
      title: 'Heavy Duty Strength Rack',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845563/_A0A5446_vcnszj.jpg',
      description: 'Rugged strength infrastructure for maximum weight capacity and performance.'
    },
    {
      id: 'gal_12',
      title: 'Commercial Strength Circuits',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845557/_A0A5428_exzdrp.jpg',
      description: 'Advanced biomechanical machines for full-body strength conditioning.'
    },
    {
      id: 'gal_13',
      title: 'Precision Leg Press Station',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845554/_A0A5421_bcwcu9.jpg',
      description: 'Targeted lower-body strength engineering for explosive power.'
    },
    {
      id: 'gal_14',
      title: 'Luxury Eucalyptus Steam Bath',
      category: 'wellness',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845317/_A0A5586_qldntf.jpg',
      description: 'Spacious high-temperature steam baths for post-workout recovery and detoxification.'
    },
    {
      id: 'gal_15',
      title: 'Functional Crossfit Turf',
      category: 'crossfit',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg',
      description: 'Agility tracks and functional equipment for high-intensity CrossFit training.'
    }
  ],
  kn: [
    {
      id: 'gal_1',
      title: 'ಪ್ರೀಮಿಯಂ ಪ್ಲೇಟ್-ಲೋಡೆಡ್ ಸ್ಟ್ರೆಂತ್ ಫ್ಲೋರ್',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845575/_A0A5476_nr9fab.jpg',
      description: 'ಗರಿಷ್ಠ ಸ್ನಾಯು ಆಕುಂಚನ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಜೈವಿಕವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಪ್ಲೇಟ್-ಲೋಡೆಡ್ ಅತ್ಯಾಧುನಿಕ ಯಂತ್ರಗಳು.'
    },
    {
      id: 'gal_2',
      title: 'ಡಂಬ್ಬೆಲ್ ಮತ್ತು ಮುಕ್ತ ತೂಕದ ವಿಭಾಗ',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845577/_A0A5475_re44az.jpg',
      description: '೨ ಕೆಜಿಯಿಂದ ೫೦ ಕೆಜಿವರೆಗಿನ ಉನ್ನತ ದರ್ಜೆಯ ರಬ್ಬರ್ ಲೇಪಿತ ಹೆಕ್ಸ್ ಡಂಬ್ಬೆಲ್ಗಳು ಮತ್ತು ಬಹು-ಕೋನಗಳ ಬೆಂಚುಗಳು.'
    },
    {
      id: 'gal_3',
      title: 'ಸ್ಮಾರ್ಟ್ ಕಾರ್ಡಿಯೋ ವಿಭಾಗ',
      category: 'cardio',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg',
      description: 'ಪ್ರತ್ಯೇಕ ಪರದೆಗಳನ್ನು ಹೊಂದಿರುವ ಕಮರ್ಷಿಯಲ್ ಟ್ರೆಡ್‌ಮಿಲ್‌ಗಳು, ಸ್ಪಿನ್ ಬೈಕ್‌ಗಳು ಮತ್ತು ಎಲಿಪ್ಟಿಕಲ್ ತರಬೇತುದಾರರು.'
    },
    {
      id: 'gal_4',
      title: 'ಜುಂಬಾ ಮತ್ತು ಏರೋಬಿಕ್ಸ್ ಹೈ-ಎನರ್ಜಿ ಫ್ಲೋರ್',
      category: 'zumba',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845424/_A0A4976_rhdscw.jpg',
      description: 'ಜುಂಬಾ, ಏರೋಬಿಕ್ಸ್ ಮತ್ತು ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್ ತರಗತಿಗಳಿಗಾಗಿ ವಿಶಾಲವಾದ ಮತ್ತು ಶಕ್ತಿಯುತವಾದ ಸ್ಥಳ.'
    },
    {
      id: 'gal_5',
      title: 'ಮಕ್ಕಳ ನೃತ್ಯ ಮತ್ತು ಯೋಗ ಸ್ಟುಡಿಯೋ',
      category: 'dance',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845383/_A0A4924_axh86z.jpg',
      description: 'ಮಕ್ಕಳ ನೃತ್ಯ, ನಮ್ಯತೆ ಮತ್ತು ಯೋಗದ ಅವಧಿಗಳಿಗಾಗಿ ಮೀಸಲಾದ ಸುರಕ್ಷಿತ ಸ್ಥಳ.'
    },
    {
      id: 'gal_6',
      title: 'MMA ಮತ್ತು ಕಾಂಬ್ಯಾಟ್ ತರಬೇತಿ ವಲಯ',
      category: 'mma',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845507/_A0A5199_gvwzbr.jpg',
      description: 'ಮಿಶ್ರ ಸಮರ ಕಲೆಗಳು (MMA), ಕುಸ್ತಿ ಮತ್ತು ಆತ್ಮರಕ್ಷಣೆ ತರಬೇತಿಗಾಗಿ ವೃತ್ತಿಪರ ದರ್ಜೆಯ ಮ್ಯಾಟ್ಸ್ ಮತ್ತು ಉಪಕರಣಗಳು.'
    },
    {
      id: 'gal_7',
      title: 'ಸುಧಾರಿತ ಸ್ಟ್ರೆಂತ್ ಮಾಸ್ಟರಿ ವಿಭಾಗ',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845567/_A0A5452_b1urhk.jpg',
      description: 'ವೃತ್ತಿಪರ ಅಥ್ಲೀಟ್‌ಗಳು ಮತ್ತು ಬಾಡಿಬಿಲ್ಡರ್‌ಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಹೈ-ಪರ್ಫಾರ್ಮೆನ್ಸ್ ಸ್ಟ್ರೆಂತ್ ಯಂತ್ರಗಳು.'
    },
    {
      id: 'gal_8',
      title: 'ಡಂಬ್ಬೆಲ್ ಪ್ರೆಸಿಶನ್ ರಾಕ್',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845571/_A0A5460_r4ao61.jpg',
      description: 'ಸ್ನಾಯುಗಳ ನಿಖರವಾದ ಬೆಳವಣಿಗೆಗಾಗಿ ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ವರ್ಕೌಟ್‌ಗಾಗಿ ವೈವಿಧ್ಯಮಯ ಡಂಬ್ಬೆಲ್‌ಗಳು.'
    },
    {
      id: 'gal_9',
      title: 'MMA ತರಬೇತಿ ಮತ್ತು ಕಂಡೀಷನಿಂಗ್',
      category: 'mma',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845505/_A0A5197_cdplpm.jpg',
      description: 'ವೃತ್ತಿಪರ MMA ಅಭ್ಯಾಸಕ್ಕಾಗಿ ಮೀಸಲಾದ ಕಾಂಬ್ಯಾಟ್ ವಲಯ.'
    },
    {
      id: 'gal_10',
      title: 'ವೃತ್ತಿಪರ ಕಾಂಬ್ಯಾಟ್ ಅಖಾಡ',
      category: 'mma',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845501/_A0A5173_z7pkbv.jpg',
      description: 'ವೃತ್ತಿಪರ ಮ್ಯಾಟ್‌ಗಳನ್ನು ಹೊಂದಿರುವ ಉನ್ನತ ದರ್ಜೆಯ MMA ಫ್ಲೋರ್.'
    },
    {
      id: 'gal_11',
      title: 'ಹೆವಿ ಡ್ಯೂಟಿ ಸ್ಟ್ರೆಂತ್ ರಾಕ್',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845563/_A0A5446_vcnszj.jpg',
      description: 'ಗರಿಷ್ಠ ತೂಕದ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ ಗಟ್ಟಿಯಾದ ಸ್ಟ್ರೆಂತ್ ವಿಭಾಗ.'
    },
    {
      id: 'gal_12',
      title: 'ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ರೆಂತ್ ಸರ್ಕ್ಯೂಟ್‌ಗಳು',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845557/_A0A5428_exzdrp.jpg',
      description: 'ಪೂರ್ಣ ದೇಹದ ಸ್ಟ್ರೆಂತ್ ಕಂಡೀಷನಿಂಗ್‌ಗಾಗಿ ಸುಧಾರಿತ ಯಂತ್ರಗಳು.'
    },
    {
      id: 'gal_13',
      title: 'ಪ್ರೆಸಿಶನ್ ಲೆಗ್ ಪ್ರೆಸ್ ಸ್ಟೇಷನ್',
      category: 'strength',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845554/_A0A5421_bcwcu9.jpg',
      description: 'ಸ್ಫೋಟಕ ಶಕ್ತಿಗಾಗಿ ವಿಶೇಷ ಲೆಗ್ ಪ್ರೆಸ್ ಎಂಜಿನಿಯರಿಂಗ್.'
    },
    {
      id: 'gal_14',
      title: 'ಪ್ರೀಮಿಯಂ ಯುಕೆಲಿಪ್ಟಸ್ ಸ್ಟೀಮ್ ಬಾತ್',
      category: 'wellness',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845317/_A0A5586_qldntf.jpg',
      description: 'ದೇಹಕ್ಕೆ ತಕ್ಷಣದ ವಿಶ್ರಾಂತಿ ನೀಡಲು ಪ್ರೀಮಿಯಂ ಯುಕೆಲಿಪ್ಟಸ್ ಸುವಾಸಿತವಾದ ಉಗಿ ಸ್ನಾನ.'
    },
    {
      id: 'gal_15',
      title: 'ಫಂಕ್ಷನಲ್ ಕ್ರಾಸ್‌ಫಿಟ್ ಟರ್ಫ್',
      category: 'crossfit',
      image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg',
      description: 'ಹೈ-ಇಂಟೆನ್ಸಿಟಿ ಕ್ರಾಸ್‌ಫಿಟ್ ತರಬೇತಿಗಾಗಿ ಅಜಿಲಿಟಿ ಟ್ರ್ಯಾಕ್‌ಗಳು ಮತ್ತು ಉಪಕರಣಗಳು.'
    }
  ]
};


// Localized FAQs
export const FAQS_LOC = {
  en: [
    {
      question: 'What are the gym timings at Dhanus Gold Fitness Kengeri?',
      answer: 'Our gym is open Monday to Saturday from 5:30 AM to 10:00 PM. On Sundays, we are open from 5:00 PM to 9:00 PM.'
    },
    {
      question: 'What are the membership options available?',
      answer: 'We offer flexible membership plans including 1 Month, 3 Months, 6 Months, and 1 Year packages. Each plan includes access to our premium facilities and equipment.'
    },
    {
      question: 'Is personal training available at your gym?',
      answer: 'Yes, we have a team of 6 expert trainers who provide professional personal training. We offer tailored programs for fat loss, muscle gain, bodybuilding, and general fitness.'
    },
    {
      question: 'Do you offer group classes?',
      answer: 'Yes, we provide a variety of group sessions including Yoga, Zumba, HIIT, Cardio, and more, designed to keep your workouts engaging and effective.'
    },
    {
      question: 'Are there special fitness programs for women?',
      answer: 'Absolutely. We have dedicated programs for women focused on weight management, toning, and overall wellness in a safe and supportive environment.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes, we provide special discounts for students. Please bring a valid student ID to our Kengeri branch to learn more about our student-exclusive offers.'
    }
  ],
  kn: [
    {
      question: 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ ಜಿಮ್ ಸಮಯ ಯಾವುದು?',
      answer: 'ನಮ್ಮ ಜಿಮ್ ಸೋಮವಾರದಿಂದ ಶನಿವಾರದವರೆಗೆ ಬೆಳಗ್ಗೆ ೫:೩೦ ರಿಂದ ರಾತ್ರಿ ೧೦:೦೦ ರವರೆಗೆ ತೆರೆದಿರುತ್ತದೆ. ಭಾನುವಾರಗಳಂದು ಸಂಜೆ ೫:೦೦ ರಿಂದ ರಾತ್ರಿ ೯:೦೦ ರವರೆಗೆ ತೆರೆದಿರುತ್ತದೆ.'
    },
    {
      question: 'ಯಾವ ರೀತಿಯ ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳು ಲಭ್ಯವಿವೆ?',
      answer: 'ನಾವು ೧ ತಿಂಗಳು, ೩ ತಿಂಗಳು, ೬ ತಿಂಗಳು ಮತ್ತು ೧ ವರ್ಷದ ಸದಸ್ಯತ್ವ ಯೋಜನೆಗಳನ್ನು ಹೊಂದಿದ್ದೇವೆ. ಪ್ರತಿಯೊಂದು ಯೋಜನೆಯು ನಮ್ಮ ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳ ಬಳಕೆಯನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.'
    },
    {
      question: 'ನಿಮ್ಮ ಜಿಮ್‌ನಲ್ಲಿ ವೈಯಕ್ತಿಕ ತರಬೇತಿ (Personal Training) ಲಭ್ಯವಿದೆಯೇ?',
      answer: 'ಹೌದು, ನಮ್ಮಲ್ಲಿ ೬ ಪರಿಣಿತ ತರಬೇತುದಾರರ ತಂಡವಿದೆ. ತೂಕ ಇಳಿಕೆ, ಸ್ನಾಯು ಹೆಚ್ಚಳ, ಮತ್ತು ಬಾಡಿಬಿಲ್ಡಿಂಗ್‌ಗಾಗಿ ನಾವು ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ತರಬೇತಿಯನ್ನು ನೀಡುತ್ತೇವೆ.'
    },
    {
      question: 'ನೀವು ಗ್ರೂಪ್ ಕ್ಲಾಸ್‌ಗಳನ್ನು ನಡೆಸುತ್ತೀರಾ?',
      answer: 'ಹೌದು, ನಾವು ಯೋಗ, ಜುಂಬಾ, HIIT, ಕಾರ್ಡಿಯೋ ಮತ್ತು ಇನ್ನಿತರ ಗ್ರೂಪ್ ಸೆಷನ್‌ಗಳನ್ನು ನಡೆಸುತ್ತೇವೆ.'
    },
    {
      question: 'ಮಹಿಳೆಯರಿಗಾಗಿ ವಿಶೇಷ ಫಿಟ್ನೆಸ್ ಪ್ರೋಗ್ರಾಂಗಳು ಇವೆಯೇ?',
      answer: 'ಖಂಡಿತವಾಗಿಯೂ. ಮಹಿಳೆಯರ ಆರೋಗ್ಯ, ಬಾಡಿ ಟೋನಿಂಗ್ ಮತ್ತು ತೂಕ ನಿರ್ವಹಣೆಗಾಗಿ ನಾವು ವಿಶೇಷ ಮತ್ತು ಸುರಕ್ಷಿತ ಪ್ರೋಗ್ರಾಂಗಳನ್ನು ಹೊಂದಿದ್ದೇವೆ.'
    },
    {
      question: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಿಯಾಯಿತಿ ಇದೆಯೇ?',
      answer: 'ಹೌದು, ನಾವು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿಶೇಷ ರಿಯಾಯಿತಿಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ಶಾಲಾ/ಕಾಲೇಜು ಐಡಿ ಕಾರ್ಡ್‌ನೊಂದಿಗೆ ನಮ್ಮ ಕೆಂಗೇರಿ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.'
    }
  ]
};
