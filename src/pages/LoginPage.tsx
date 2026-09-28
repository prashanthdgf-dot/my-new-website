import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, AlertTriangle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import ScrollReveal from '../components/ScrollReveal';

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess: (role: string) => void }) {
  const { language, t } = useLanguage();
  const [role, setRole] = useState<'Owner' | 'Admin' | 'Marketing'>('Owner');
  const [username, setUsername] = useState('owner');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleChange = (selectedRole: 'Owner' | 'Admin' | 'Marketing') => {
    setRole(selectedRole);
    if (selectedRole === 'Owner') setUsername('owner');
    else if (selectedRole === 'Admin') setUsername('admin');
    else setUsername('marketing');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const validPasswords: Record<string, string> = {
        owner: 'dhanusgold',
        admin: 'dhanusgold',
        marketing: 'dhanusgold'
      };

      if (validPasswords[username] === password) {
        onLoginSuccess(role);
      } else {
        setError(language === 'en' ? 'Incorrect credentials combination' : 'ತಪ್ಪಾದ ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್');
      }
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white flex items-center justify-center px-4">
      <ScrollReveal>
        <div className="max-w-md w-full bg-[#070707] border border-zinc-900 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FFC400]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            {/* Clickable Brand Logo directing to Home page */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="inline-flex items-center justify-center mb-4 group cursor-pointer"
              title="Return to Dhanus Gold Fitness Home"
            >
              <img
                src="https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_200/v1782844122/facebook_profile_ijvgug.png"
                alt="Dhanus Gold Fitness"
                width={64}
                height={64}
                className="h-16 w-auto object-contain rounded-xl group-hover:scale-105 transition-transform shadow-lg border border-white/10"
                referrerPolicy="no-referrer"
              />
            </a>

            <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#FFC400] mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              {t('loginTitle')} <span className="text-[#FFC400]">{t('loginTitleGold')}</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-2">{language === 'en' ? 'Dhanus Gold Fitness Management Credentials Check' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ನಿರ್ವಹಣಾ ದೃಢೀಕರಣ'}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-black border border-zinc-900 rounded-xl relative z-10">
            {(['Owner', 'Admin', 'Marketing'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={`py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer ${
                  role === r ? 'bg-[#FFC400] text-black font-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950/20 border border-red-800 text-red-400 text-xs px-3.5 py-2 rounded-lg flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">{language === 'en' ? 'Username Identifier' : 'ಬಳಕೆದಾರ ಹೆಸರು'}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-550" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-zinc-850 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFC400]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">{language === 'en' ? 'Access Password' : 'ಪಾಸ್‌ವರ್ಡ್'}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-550" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-zinc-850 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFC400]"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 py-4 bg-gradient-gold text-black font-sans font-black text-sm uppercase tracking-wider rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              <span>{loading ? (language === 'en' ? 'Validating Token...' : 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...') : (language === 'en' ? 'Establish Secure Connection' : 'ಲಾಗಿನ್ ಮಾಡಿ')}</span>
            </button>
          </form>
        </div>
      </ScrollReveal>
    </div>
  );
}

export { LoginPage };
