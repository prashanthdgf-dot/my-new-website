import React from 'react';
import { ArrowUp, Award, MapPin, Mail, Phone, ShieldCheck, Zap } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';
import SocialLinksBar, { WhatsAppLogo, InstagramLogo } from './SocialIcons';

interface FooterProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export default function Footer({ currentPath = '/', onNavigate }: FooterProps) {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      if (href.startsWith('#')) {
        if (currentPath !== '/') {
          onNavigate('/');
          setTimeout(() => {
            const el = document.getElementById(href.substring(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const el = document.getElementById(href.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onNavigate(href);
      }
    }
  };

  return (
    <footer id="footer" className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info (4 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center gap-3 group">
              {/* Original Brand Logo */}
              <img
                src="https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782844122/facebook_profile_ijvgug.png"
                alt="Dhanus Gold Fitness"
                className="h-16 w-auto object-contain transition-all duration-300 transform group-hover:scale-105 rounded-xl"
                referrerPolicy="no-referrer"
              />
            </a>
            
            <p className="text-sm font-sans text-gray-400 leading-relaxed max-w-sm">
              {language === 'en' 
                ? "Dhanus Gold Fitness is Kengeri's trusted three-floor professional gym with 9+ years of service, 4,000+ clients trained, and 600+ successful transformations. We specialize in personal training, strength mastery, and women-focused fitness."
                : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿಯ ವಿಶ್ವಾಸಾರ್ಹ ಮೂರು ಅಂತಸ್ತಿನ ವೃತ್ತಿಪರ ಜಿಮ್ ಆಗಿದೆ. ೯+ ವರ್ಷಗಳ ಸೇವೆ, ೪,೦೦೦+ ಗ್ರಾಹಕರಿಗೆ ತರಬೇತಿ ಮತ್ತು ೬೦೦+ ಯಶಸ್ವಿ ಪರಿವರ್ತನೆಗಳೊಂದಿಗೆ ನಾವು ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಮತ್ತು ಮಹಿಳೆಯರ ಫಿಟ್ನೆಸ್‌ನಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿದ್ದೇವೆ.'}
            </p>

            {/* Contact Details */}
            <div className="space-y-2.5 pb-2">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-gold-premium shrink-0" />
                <a href={CONTACT_INFO.social.email} className="text-xs hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-gold-premium shrink-0" />
                <a href={CONTACT_INFO.phoneHref} className="text-xs hover:text-[#FFC400] transition-colors font-mono">
                  {CONTACT_INFO.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <WhatsAppLogo className="w-4 h-4 shrink-0" />
                <a 
                  href={CONTACT_INFO.permanentLinks.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: +91 97400 18911
                </a>
              </div>
            </div>

            {/* Social Links with Original Brand Logos */}
            <div className="pt-2">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block mb-2.5">
                {language === 'en' ? 'Official Social Handles' : 'ಅಧಿಕೃತ ಸಾಮಾಜಿಕ ತಾಣಗಳು'}
              </span>
              <SocialLinksBar className="flex flex-wrap items-center gap-2.5" />
            </div>
          </div>

          {/* Quick Links Map (3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              {language === 'en' ? 'Explore Spaces' : 'ಅನ್ವೇಷಿಸಿ'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Home' : 'ಮುಖ್ಯ ಪುಟ'}
                </a>
              </li>
              <li>
                <a href="/gym-in-kengeri" onClick={(e) => handleLinkClick(e, '/gym-in-kengeri')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Gym in Kengeri' : 'ಕೆಂಗೇರಿ ಜಿಮ್'}
                </a>
              </li>
              <li>
                <a href="/personal-training-kengeri" onClick={(e) => handleLinkClick(e, '/personal-training-kengeri')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Personal Training' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ'}
                </a>
              </li>
              <li>
                <a href="/weight-loss-training-kengeri" onClick={(e) => handleLinkClick(e, '/weight-loss-training-kengeri')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Weight Loss Training' : 'ತೂಕ ಇಳಿಕೆ ತರಬೇತಿ'}
                </a>
              </li>
              <li>
                <a href="/muscle-building-kengeri" onClick={(e) => handleLinkClick(e, '/muscle-building-kengeri')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Muscle Building' : 'ಸ್ನಾಯು ತರಬೇತಿ'}
                </a>
              </li>
              <li>
                <a href="/womens-fitness-kengeri" onClick={(e) => handleLinkClick(e, '/womens-fitness-kengeri')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? "Women's Fitness" : 'ಮಹಿಳೆಯರ ಫಿಟ್‌ನೆಸ್'}
                </a>
              </li>
              <li>
                <a href="/group-fitness" onClick={(e) => handleLinkClick(e, '/group-fitness')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Group Fitness & Zumba' : 'ಗ್ರೂಪ್ ಫಿಟ್‌ನೆಸ್'}
                </a>
              </li>
              <li>
                <a href="/nutrition-guidance" onClick={(e) => handleLinkClick(e, '/nutrition-guidance')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Nutrition Guidance' : 'ಪೌಷ್ಟಿಕಾಂಶ ಯೋಜನೆ'}
                </a>
              </li>
              <li>
                <a href="/reviews" onClick={(e) => handleLinkClick(e, '/reviews')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'Member Reviews' : 'ಸದಸ್ಯರ ವಿಮರ್ಶೆಗಳು'}
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleLinkClick(e, '/faq')} className="text-xs font-sans text-gray-400 hover:text-gold-premium transition-colors">
                  {language === 'en' ? 'FAQ' : 'ಪ್ರಶ್ನೋತ್ತರಗಳು'}
                </a>
              </li>
              <li className="pt-1 border-t border-white/5">
                <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, '/privacy-policy')} className="text-xs font-sans text-[#FFC400] hover:underline transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Privacy Policy' : 'ಗೌಪ್ಯತಾ ನೀತಿ'}</span>
                </a>
              </li>
              <li>
                <a href="/integrations" onClick={(e) => handleLinkClick(e, '/integrations')} className="text-xs font-sans text-zinc-400 hover:text-[#FFC400] transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>{language === 'en' ? 'Webhooks & Integrations' : 'ವೆಬ್‌ಹುಕ್ಸ್ & ಏಕೀಕರಣ'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SEO Local Support (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold-premium" />
              <span>{language === 'en' ? 'Kengeri Local SEO' : 'ಸೇವೆಗಳು'}</span>
            </h4>
            <p className="text-xs font-sans text-gray-400 leading-relaxed">
              {language === 'en'
                ? 'We serve fitness enthusiasts across Kengeri, Kengeri Satellite Town, Bangalore University Area, RV College campus, Gnanabharathi, Mailasandra, and RR Nagar. Convenient parking, metro connectivity, and spacious hours ensure an elite workout lifestyle.'
                : 'ನಾವು ಕೆಂಗೇರಿ, ಕೆಂಗೇರಿ ಉಪನಗರ, ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ಪ್ರದೇಶ, ಆರ್‌ವಿ ಕಾಲೇಜು ಕ್ಯಾಂಪಸ್, ಜ್ಞಾನಭಾರತಿ, ಮೈಲಸಂದ್ರ ಮತ್ತು ಆರ್‌ಆರ್ ನಗರದ ಕ್ರೀಡಾಸಕ್ತರಿಗೆ ಸೇವೆ ಒದಗಿಸುತ್ತೇವೆ. ಉಚಿತ ಪಾರ್ಕಿಂಗ್ ಮತ್ತು ಮೆಟ್ರೋ ಸಂಪರ್ಕ ಹೊಂದಿದೆ.'}
            </p>
            <div className="text-xs text-gold-300 font-mono font-medium">
              {language === 'en' ? '📍 Near Kengeri Metro Station, Bengaluru' : '📍 ಕೆಂಗೇರಿ ಮೆಟ್ರೋ ನಿಲ್ದಾಣದ ಹತ್ತಿರ, ಬೆಂಗಳೂರು'}
            </div>

            {/* Permanent Quick Connect Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-white hover:text-[#FFC400] transition-colors"
                title="Direct Phone Call"
              >
                <Phone className="w-3 h-3 text-[#FFC400]" />
                <span>Call Gym</span>
              </a>
              <a
                href={CONTACT_INFO.permanentLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-white hover:text-[#25D366] transition-colors"
                title="WhatsApp Direct"
              >
                <WhatsAppLogo className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <a
                href={CONTACT_INFO.permanentLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-white hover:text-[#E1306C] transition-colors"
                title="Instagram Profile"
              >
                <InstagramLogo className="w-3 h-3" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-sans text-gray-500 text-center sm:text-left">
            <p>© {currentYear} Dhanus Gold Fitness. All rights reserved.</p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <div className="flex items-center gap-3">
              <a 
                href="/privacy-policy" 
                onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                className="text-zinc-400 hover:text-gold-premium transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </a>
              <span className="text-zinc-700">•</span>
              <a 
                href="/integrations" 
                onClick={(e) => handleLinkClick(e, '/integrations')}
                className="text-zinc-400 hover:text-gold-premium transition-colors underline-offset-4 hover:underline"
              >
                Webhooks & APIs
              </a>
              <span className="text-zinc-700">•</span>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-gold-premium transition-colors underline-offset-4 hover:underline"
              >
                Sitemap
              </a>
              <span className="text-zinc-700">•</span>
              <a 
                href={CONTACT_INFO.phoneHref}
                className="text-zinc-400 hover:text-gold-premium transition-colors"
              >
                tel:+919740018911
              </a>
            </div>
          </div>
          
          {/* Back to Top */}
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-gray-400 hover:text-gold-premium transition-colors uppercase focus:outline-none"
          >
            <span>{language === 'en' ? 'Back to top' : 'ಮೇಲಕ್ಕೆ ಹೋಗಿ'}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

