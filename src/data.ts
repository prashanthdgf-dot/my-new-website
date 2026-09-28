import { MembershipPlan, Trainer, Testimonial, GalleryItem } from './types';

// Dhanus Gold Fitness Contact Configuration
export const CONTACT_INFO = {
  phoneNumber: '+91 97400 18911',
  phoneHref: 'tel:+919740018911',
  whatsappNumber: '919740018911', // No spaces, plus sign, or dashes for API
  whatsappUrl: 'https://wa.me/919740018911',
  email: 'dhanusgoldfitness@gmail.com',
  websiteUrl: 'https://www.dhanusgoldfitness.com',
  privacyPolicyUrl: '/privacy-policy',
  callbackUrl: '/api/callback',
  webhookUrl: '/api/webhook',
  integrationsUrl: '/integrations',
  address: '3rd & 4th Floor, No. 18, Hoysala Circle, Outer Ring Road, above Trends Junior, opposite Shoppers Choice, Valagerahalli, Gnanabharathi Stage II, Kengeri Satellite Town, Bengaluru, Karnataka – 560060',
  shortAddress: 'Hoysala Circle, Kengeri Satellite Town, Bengaluru 560060',
  landmark: 'Above Trends Junior, Opposite Shoppers Choice, Hoysala Circle',
  googleBusinessId: (import.meta as any).env.VITE_GOOGLE_BUSINESS_ID || 'dhanus-gold-fitness-kengeri',
  googlePlaceId: (import.meta as any).env.VITE_GOOGLE_PLACE_ID || 'ChIJq-HoQjY_rjsRuCMhDrgVf8o',
  coordinates: { lat: 12.9247426, lng: 77.4855608 },
  locatorUrl: '/locator.html',
  googleBusinessProfileUrl: 'https://maps.app.goo.gl/yB41yXc1GgFDYtwv5',
  googleMapsUrl: 'https://maps.app.goo.gl/yB41yXc1GgFDYtwv5',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJq-HoQjY_rjsRuCMhDrgVf8o',
  gmapsEmbedUrl: 'https://maps.google.com/maps?q=12.9247426,77.4855608&z=17&output=embed',
  operatingHours: [
    { days: 'Monday – Saturday', hours: '5:30 AM – 10:00 PM' },
    { days: 'Sunday', hours: '5:00 PM – 9:00 PM' }
  ],
  permanentLinks: {
    websiteCallbackUrl: 'https://www.dhanusgoldfitness.com/api/callback',
    privacyPolicy: '/privacy-policy',
    instagram: 'https://www.instagram.com/dhanus_goldfitness/',
    whatsapp: 'https://wa.me/919740018911',
    call: 'tel:+919740018911',
    webhookUrl: 'https://www.dhanusgoldfitness.com/api/webhook',
    integrationsUrl: '/integrations',
  },
  social: {
    youtube: 'https://www.youtube.com/@dhanusgoldfitnesskengeri',
    instagram: 'https://www.instagram.com/dhanus_goldfitness/',
    facebookPage: 'https://www.facebook.com/people/Dhanus-Goldfitness/100079558913150/',
    facebookProfile: 'https://www.facebook.com/people/Dhanus-Goldfitness/100079558913150/',
    facebook: 'https://www.facebook.com/people/Dhanus-Goldfitness/100079558913150/',
    email: 'mailto:dhanusgoldfitness@gmail.com',
    website: 'https://www.dhanusgoldfitness.com',
    map: 'https://maps.app.goo.gl/yB41yXc1GgFDYtwv5',
    googleMaps: 'https://maps.app.goo.gl/yB41yXc1GgFDYtwv5',
    whatsapp: 'https://wa.me/919740018911',
    googleBusiness: 'https://maps.app.goo.gl/yB41yXc1GgFDYtwv5'
  }
};

// Membership Plans with optimized pricing in INR (Indian Rupees)
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'general',
    name: 'General Fitness',
    duration: 'Monthly / Quarterly / Annual',
    price: 2499,
    originalPrice: 2999,
    isPopular: false,
    badge: 'Train Independently',
    features: [
      'Access to Cardio & Strength Floor',
      'General Fitness Assessment',
      'Lockers & Shower Access',
      'Free WiFi & Cafeteria Access',
      'Basic floor assistance when available'
    ],
    whatsappMessage: 'Hi Dhanus Gold Fitness, I would like to register for the General Fitness plan in Kengeri. Please guide me with the joining fee and process.'
  },
  {
    id: 'silver',
    name: 'Silver Personal Training',
    duration: 'Guided Training',
    price: 5999,
    originalPrice: 7499,
    isPopular: true,
    badge: 'Build A Strong Foundation',
    features: [
      'Suitable for beginners',
      'Basic observation & equipment guidance',
      'Regular exercise support',
      'Customized Diet & Workout Chart',
      'InBody Composition Analysis (Monthly)'
    ],
    whatsappMessage: 'Hi Dhanus Gold Fitness, I am interested in the Silver Personal Training plan. Are there any special discounts for students or local residents in Kengeri?'
  },
  {
    id: 'gold',
    name: 'Gold Personal Training',
    duration: '1+1 Training',
    price: 14999,
    originalPrice: 21999,
    isPopular: false,
    badge: 'More Guidance & Accountability',
    features: [
      'Closer workout supervision',
      'Exercise correction & structured support',
      'Limited-member coaching format',
      'Free Gym Kit (Dhanus Gold Premium Shaker & Tee)',
      'Unlimited CrossFit Turf access'
    ],
    whatsappMessage: 'Hi Dhanus Gold Fitness, I want to join the Gold Personal Training plan. Please share details on payment plans and card offers at the Kengeri gym.'
  }
];

// Local Certified Trainers with real qualifications
export const TRAINERS: Trainer[] = [
  {
    id: 'prashanth',
    name: 'Prashanth',
    role: 'Founder & Head Bodybuilding Trainer',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1785136389/prashanth_e9qrto.png',
    specialties: ['Bodybuilding Coaching', 'Strength Mastery', 'Elite Transformations'],
    certifications: [
      'Founder of Dhanus Gold Fitness',
      'Expert Strength Coach',
      'Mr. Karnataka Medalist'
    ],
    instagramUrl: 'https://www.instagram.com/dhanus_goldfitness/',
    experienceYears: 12
  },
  {
    id: 'dhananjay',
    name: 'Dhananjay',
    role: 'Founder & Head Bodybuilding Trainer',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1785136389/dhanu_ontn0w.png',
    specialties: ['Bodybuilding Coaching', 'Strength Mastery', 'Elite Transformations'],
    certifications: [
      'Founder of Dhanus Gold Fitness',
      'Expert Strength Coach',
      'Mr. Karnataka Medalist'
    ],
    instagramUrl: 'https://www.instagram.com/dhanus_goldfitness/',
    experienceYears: 12
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
    instagramUrl: 'https://www.instagram.com/dhanus_goldfitness/',
    experienceYears: 7
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
    instagramUrl: 'https://www.instagram.com/dhanus_goldfitness/',
    experienceYears: 6
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
    instagramUrl: 'https://www.instagram.com/dhanus_goldfitness/',
    experienceYears: 7
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
    instagramUrl: 'https://www.instagram.com/dhanus_goldfitness/',
    experienceYears: 6
  }
];

// Local Kengeri Testimonials referencing landmarks
export const TESTIMONIALS: Testimonial[] = [
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
];

// Premium Gallery categories
export const GALLERY_ITEMS: GalleryItem[] = [
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
    title: 'Luxury Eucalyptus Steam Bath',
    category: 'wellness',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845317/_A0A5586_qldntf.jpg',
    description: 'Spacious high-temperature steam baths for post-workout recovery and detoxification.'
  },
  {
    id: 'gal_11',
    title: 'Functional Crossfit Turf',
    category: 'crossfit',
    image: 'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845411/_A0A4965_whk1hl.jpg',
    description: 'Agility tracks and functional equipment for high-intensity CrossFit training.'
  }
];

export const CLOUDINARY_TRANSFORMATION_GALLERY_URL =
  "https://collection.cloudinary.com/dnnfzhrbd/abdaf309bd25a09c0ec0016e5de2a117";

export interface Transformation {
  id: string;
  title: string;
  image: string;
}

export const CLOUDINARY_TRANSFORMATIONS = [
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529608/transformation-01_w1ep3t.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529613/transformation-02_h9b6n4.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529606/transformation-03_p5igdi.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529641/transformation-04_esdbxe.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529614/transformation-05_zmyhr3.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529606/transformation-06_vxg6c8.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529627/transformation-07_nzwql3.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529618/transformation-08_yhvmig.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529643/transformation-09_otwxlt.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529624/transformation-10_zfax1q.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529600/transformation-11_hgcmpv.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529605/transformation-12_ne9fyx.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529600/transformation-13_oz9sjs.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529610/transformation-14_zynoqf.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529612/transformation-15_sdpsvd.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529624/transformation-16_k8hsmz.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529641/transformation-17_kplern.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529630/transformation-18_ovyzfv.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529635/transformation-19_opxt0v.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529635/transformation-20_voqfhq.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529636/transformation-21_xitrqk.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529647/transformation-22_akler2.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529641/transformation-23_qntx6b.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529660/transformation-24_jau2di.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529645/transformation-25_sh7i9k.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529674/transformation-26_vcvxsu.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529653/transformation-27_ueoazj.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529654/transformation-28_zduxgu.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529652/transformation-29_yrfmdm.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529657/transformation-30_fmkcmo.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529656/transformation-31_g5vb23.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529659/transformation-32_lhbbuo.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529666/transformation-33_bbqdvf.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529660/transformation-34_wmdrww.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529672/transformation-35_epgrfx.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529669/transformation-36_huzph9.png',
  'https://res.cloudinary.com/dnnfzhrbd/image/upload/v1783529675/transformation-37_arlnsd.png'
];

export const transformations: Transformation[] = CLOUDINARY_TRANSFORMATIONS.map((url, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: `transformation-${num}`,
    title: `Transformation ${num}`,
    image: url
  };
});

