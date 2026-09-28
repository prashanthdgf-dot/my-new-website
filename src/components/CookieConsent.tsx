import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export const CONSENT_KEY = 'dhanus-cookie-consent';

export function readConsent(): 'granted' | 'denied' | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

/** Asks before Google Analytics loads. Shown only when an analytics ID is configured. */
export default function CookieConsent({ onChoice }: { onChoice: (choice: 'granted' | 'denied') => void }) {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(() => readConsent() === null);
  if (!visible) return null;

  const choose = (choice: 'granted' | 'denied') => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* storage unavailable - choice applies for this visit only */
    }
    setVisible(false);
    onChoice(choice);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[60] rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur p-4 shadow-2xl"
    >
      <p className="text-xs text-gray-300 leading-relaxed">
        {language === 'en'
          ? 'We use Google Analytics cookies to understand how visitors use this site. You can accept or decline.'
          : 'ಸಂದರ್ಶಕರು ಈ ಸೈಟ್ ಅನ್ನು ಹೇಗೆ ಬಳಸುತ್ತಾರೆ ಎಂದು ತಿಳಿಯಲು ನಾವು ಗೂಗಲ್ ಅನಾಲಿಟಿಕ್ಸ್ ಕುಕೀಗಳನ್ನು ಬಳಸುತ್ತೇವೆ.'}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose('granted')}
          className="flex-1 rounded-lg bg-[#FFC400] px-3 py-2 text-xs font-bold text-black"
        >
          {language === 'en' ? 'Accept' : 'ಒಪ್ಪುತ್ತೇನೆ'}
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          className="flex-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-gray-200"
        >
          {language === 'en' ? 'Decline' : 'ನಿರಾಕರಿಸು'}
        </button>
      </div>
    </div>
  );
}
