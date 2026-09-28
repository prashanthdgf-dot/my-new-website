import React from 'react';
import { CONTACT_INFO } from '../data';

// ============================================================================
// OFFICIAL BRAND LOGOS (High-Resolution Pixel-Perfect Vectors)
// ============================================================================

/**
 * Official Instagram Brand Logo
 * Standard Instagram gradient: Yellow (#FCAF45) -> Red-Orange (#FF543E) -> Pink-Purple (#E1306C) -> Purple (#C13584) -> Blue (#833AB4)
 */
export const InstagramLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-brand-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#FCAF45" />
        <stop offset="50%" stopColor="#F77737" />
        <stop offset="70%" stopColor="#F56040" />
        <stop offset="85%" stopColor="#FD1D1D" />
        <stop offset="95%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#C13584" />
      </linearGradient>
    </defs>
    {/* Outer Gradient Rounded Square */}
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-brand-gradient)" />
    {/* White Camera Outline */}
    <rect x="4" y="4" width="16" height="16" rx="4.2" fill="none" stroke="#FFFFFF" strokeWidth="1.75" />
    {/* Camera Lens */}
    <circle cx="12" cy="12" r="3.75" fill="none" stroke="#FFFFFF" strokeWidth="1.75" />
    {/* Camera Flash */}
    <circle cx="16.5" cy="7.5" r="1.15" fill="#FFFFFF" />
  </svg>
);

/**
 * Official Facebook Brand Logo
 * Meta Blue (#1877F2) circle with precise offset 'f' mark
 */
export const FacebookLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="11" fill="#1877F2" />
    <path
      d="M13.5 22V13.85H16.24L16.65 10.65H13.5V8.6C13.5 7.68 13.76 7.05 15.08 7.05H16.78V4.18C16.48 4.14 15.46 4.05 14.26 4.05C11.75 4.05 10.04 5.58 10.04 8.4V10.65H7.28V13.85H10.04V22H13.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Official YouTube Brand Logo
 * Official YouTube Red (#FF0000) rounded rectangle with centered white equilateral play button
 */
export const YouTubeLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      fill="#FF0000"
    />
    <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FFFFFF" />
  </svg>
);

/**
 * Official LinkedIn Brand Logo
 * Official LinkedIn Blue (#0A66C2) square badge with white 'in' logotype
 */
export const LinkedInLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#0A66C2" />
    <path
      d="M7.78 6.55a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0zM4.74 9.5h3.04v9.25H4.74V9.5zm4.94 0h2.92v1.27h.04c.41-.77 1.4-1.58 2.88-1.58 3.08 0 3.65 2.03 3.65 4.67v4.89h-3.04v-4.34c0-1.03-.02-2.37-1.44-2.37-1.44 0-1.66 1.13-1.66 2.29v4.42H9.68V9.5z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Official WhatsApp Brand Logo
 * Official WhatsApp Green (#25D366) circle with speech bubble & handset
 */
export const WhatsAppLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="11" fill="#25D366" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 14.6C17.2 14.4 15.7 13.7 15.4 13.6C15.1 13.5 14.9 13.4 14.7 13.7C14.5 14 14 14.6 13.8 14.8C13.6 15 13.4 15 13.1 14.8C12.8 14.7 11.8 14.4 10.7 13.4C9.8 12.6 9.2 11.6 9 11.3C8.8 11 9 10.9 9.1 10.7C9.2 10.6 9.4 10.4 9.5 10.2C9.6 10 9.7 9.9 9.8 9.7C9.9 9.5 9.8 9.3 9.7 9.2C9.6 9.1 9.1 7.8 8.8 7.3C8.6 6.8 8.4 6.9 8.2 6.9H7.7C7.5 6.9 7.2 7 7 7.2C6.8 7.4 6.1 8 6.1 9.4C6.1 10.8 7.1 12.1 7.3 12.3C7.5 12.5 9.3 15.3 12.1 16.5C12.8 16.8 13.3 17 13.7 17.1C14.4 17.3 15 17.3 15.5 17.2C16.1 17.1 17.3 16.5 17.6 15.7C17.9 14.9 17.9 14.2 17.8 14.1C17.7 14 17.8 14.7 17.5 14.6Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Official Google Maps Brand Pin
 */
export const GoogleMapsLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2Z"
      fill="#EA4335"
    />
    <circle cx="12" cy="10" r="3.5" fill="#FFFFFF" />
    <path
      d="M12 6.5C10.07 6.5 8.5 8.07 8.5 10C8.5 11.93 10.07 13.5 12 13.5C13.93 13.5 15.5 11.93 15.5 10C15.5 8.07 13.93 6.5 12 6.5Z"
      fill="#4285F4"
    />
  </svg>
);

/**
 * Official Google 4-Color 'G' Icon
 */
export const GoogleLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

/**
 * Official Gmail Brand Logo
 */
export const GmailLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
      fill="#EA4335"
    />
  </svg>
);

/**
 * Official Website Globe Icon
 */
export const WebsiteLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke="#FFC400" strokeWidth="1.8" />
    <path
      d="M2.5 12h19M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="#FFC400"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// SOCIAL LINKS DATA SETS
// ============================================================================

export interface SocialLinkItem {
  name: string;
  url: string;
  ariaLabel: string;
  icon: React.ReactNode;
  brandColor?: string;
  badge?: string;
}

/** Core Social Media Profiles */
export const CORE_FOUR_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'Instagram',
    url: CONTACT_INFO.social.instagram,
    ariaLabel: 'Follow Dhanus Gold Fitness on Instagram (@dhanus_goldfitness)',
    icon: <InstagramLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.35)]',
  },
  {
    name: 'YouTube',
    url: CONTACT_INFO.social.youtube,
    ariaLabel: 'Subscribe to Dhanus Gold Fitness on YouTube (@dhanusgoldfitnesskengeri)',
    icon: <YouTubeLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.35)]',
  },
  {
    name: 'Facebook',
    url: CONTACT_INFO.social.facebookPage,
    ariaLabel: 'Visit Dhanus Gold Fitness Official Facebook Page',
    icon: <FacebookLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.35)]',
  },
  {
    name: 'WhatsApp',
    url: CONTACT_INFO.social.whatsapp,
    ariaLabel: 'Chat directly on WhatsApp (+91 97400 18911)',
    icon: <WhatsAppLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.35)]',
  },
];

/** Full List of Verified Official Channels & Contacts */
export const OFFICIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'Instagram',
    url: CONTACT_INFO.social.instagram,
    ariaLabel: 'Follow Dhanus Gold Fitness on Instagram (@dhanus_goldfitness)',
    icon: <InstagramLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.35)]',
  },
  {
    name: 'YouTube',
    url: CONTACT_INFO.social.youtube,
    ariaLabel: 'Subscribe to Dhanus Gold Fitness on YouTube (@dhanusgoldfitnesskengeri)',
    icon: <YouTubeLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.35)]',
  },
  {
    name: 'Facebook',
    url: CONTACT_INFO.social.facebookPage,
    ariaLabel: 'Visit Dhanus Gold Fitness Official Facebook Page',
    icon: <FacebookLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.35)]',
  },
  {
    name: 'WhatsApp',
    url: CONTACT_INFO.social.whatsapp,
    ariaLabel: 'Chat directly on WhatsApp (+91 97400 18911)',
    icon: <WhatsAppLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.35)]',
  },
  {
    name: 'Google Maps',
    url: CONTACT_INFO.social.map,
    ariaLabel: 'Find Dhanus Gold Fitness on Google Maps (Kengeri Satellite Town)',
    icon: <GoogleMapsLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#4285F4] hover:shadow-[0_0_15px_rgba(66,133,244,0.35)]',
  },
  {
    name: 'Email (Gmail)',
    url: CONTACT_INFO.social.email,
    ariaLabel: 'Email Dhanus Gold Fitness (dhanusgoldfitness@gmail.com)',
    icon: <GmailLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#EA4335] hover:shadow-[0_0_15px_rgba(234,67,53,0.35)]',
  },
  {
    name: 'Official Website',
    url: CONTACT_INFO.social.website,
    ariaLabel: 'Visit Official Dhanus Gold Fitness Website (www.dhanusgoldfitness.com)',
    icon: <WebsiteLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    brandColor: 'hover:border-[#FFC400] hover:shadow-[0_0_15px_rgba(255,196,0,0.35)]',
  },
];

interface SocialLinksBarProps {
  className?: string;
  itemClassName?: string;
  showLabels?: boolean;
  links?: SocialLinkItem[];
}

export default function SocialLinksBar({
  className = 'flex flex-wrap items-center gap-3',
  itemClassName = '',
  showLabels = false,
  links = OFFICIAL_SOCIAL_LINKS,
}: SocialLinksBarProps) {
  return (
    <div className={className}>
      {links.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          title={item.name}
          className={`group relative flex items-center justify-center p-2.5 bg-zinc-900/90 border border-white/10 rounded-xl transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-0.5 active:scale-95 ${item.brandColor} ${itemClassName}`}
        >
          {item.icon}
          {showLabels && (
            <span className="ml-2 text-xs font-sans font-semibold text-zinc-300 group-hover:text-white transition-colors">
              {item.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}

