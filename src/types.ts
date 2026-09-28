export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  features: string[];
  isPopular: boolean;
  whatsappMessage: string;
  badge?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  certifications: string[];
  instagramUrl?: string;
  linkedinUrl?: string;
  experienceYears?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'strength' | 'cardio' | 'crossfit' | 'wellness' | 'zumba' | 'dance' | 'mma';
  image: string;
  description: string;
}
