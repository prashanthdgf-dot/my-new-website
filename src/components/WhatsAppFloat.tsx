import { WhatsAppLogo } from './SocialIcons';
import { CONTACT_INFO } from '../data';

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hi%20Dhanus%20Gold%20Fitness%2C%20I%20am%20viewing%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20joining%20offers%20and%20gym%20timings%20in%20Kengeri!`;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Glow Rings */}
      <span className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-md opacity-75 animate-ping" />
      <span className="absolute -inset-2 rounded-full bg-emerald-400/10 blur-xl opacity-50" />

      {/* Main Floating Button */}
      <a
        id="whatsapp-floating-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        aria-label="Inquire on WhatsApp (+91 97400 18911)"
      >
        <WhatsAppLogo className="w-8 h-8 drop-shadow-md" />
        
        {/* Simulative Active Notification Badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-mono font-bold items-center justify-center text-white leading-none">
            1
          </span>
        </span>
      </a>

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-zinc-900 border border-white/10 text-white font-sans text-xs font-bold px-3 py-2 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        🟢 Coach Online • Chat on WhatsApp
      </div>
    </div>
  );
}
