import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GoldLoader({ theme }: { theme?: 'dark' | 'light' }) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('dhanus_initial_loaded');
    }
    return true;
  });
  const isLightMode = theme === 'light' || document.body.classList.contains('golden-light');

  useEffect(() => {
    if (!isVisible) return;

    // Swift, elegant branding entrance that clears quickly for sub-second LCP
    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('dhanus_initial_loaded', 'true');
      } catch (e) {
        // ignore in private browsing
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Generate coordinates for random floating gold-dust particles
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // relative movement x
    y: Math.random() * -120 - 40, // relative movement y (always upwards)
    startX: Math.random() * 100 - 50,
    startY: Math.random() * 40 - 10,
    size: Math.random() * 2.5 + 1, // random gold flake size
    delay: Math.random() * 0.8,
    duration: Math.random() * 1.5 + 1.2,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="premium-gold-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 pointer-events-none ${
            isLightMode ? 'bg-[#FAF8F2]' : 'bg-black'
          }`}
        >
          {/* Subtle Ambient Gold Radiance Background */}
          <div className={`absolute inset-0 pointer-events-none ${
            isLightMode 
              ? 'bg-[radial-gradient(circle_at_center,rgba(138,100,15,0.05)_0%,transparent_70%)]' 
              : 'bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]'
          }`} />

          {/* HUD Scanning Line Effect */}
          <motion.div 
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-premium/40 to-transparent z-10 pointer-events-none"
            style={{ boxShadow: '0 0 15px rgba(255, 196, 0, 0.4)' }}
          />

          {/* Central Logo Ring & Shimmer */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Spinning Outer Ring */}
            <motion.div
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              animate={{ 
                rotate: 360, 
                scale: 1, 
                opacity: 1,
                transition: { 
                  scale: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 1 },
                  rotate: { repeat: Infinity, duration: 10, ease: "linear" }
                }
              }}
              className={`w-20 h-20 rounded-full border border-dashed flex items-center justify-center ${
                isLightMode ? 'border-[#8A640F]/30' : 'border-gold-premium/40'
              }`}
            />

            {/* Glowing Inner Solid Ring */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                opacity: [0.7, 1, 0.7],
                transition: { 
                  duration: 2.2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              className={`absolute w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                isLightMode 
                  ? 'border-[#8A640F] shadow-[0_0_20px_rgba(138,100,15,0.15)]' 
                  : 'border-gold-premium shadow-[0_0_20px_rgba(212,175,55,0.35)]'
              }`}
            >
              {/* Premium Brand Monogram */}
              <span className={`font-display font-black text-base tracking-widest pl-[1px] ${
                isLightMode ? 'text-[#1A150D]' : 'text-white'
              }`}>D</span>
            </motion.div>

            {/* Floating Gold-Dust Particles Container */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ 
                    x: p.startX, 
                    y: p.startY, 
                    opacity: 0, 
                    scale: 0.2 
                  }}
                  animate={{
                    x: p.startX + p.x,
                    y: p.startY + p.y,
                    opacity: [0, 0.9, 0.9, 0],
                    scale: [0.2, 1.2, 0.8, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute left-1/2 top-1/2 rounded-full bg-gradient-to-r from-gold-premium via-amber-300 to-yellow-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Elegant Text Entrance with Letter Spacing Expansion */}
          <div className="text-center relative z-10 select-none px-4">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ 
                opacity: [0, 1], 
                letterSpacing: ["0.2em", "0.45em"],
                transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
              }}
              className={`font-display font-black text-xl sm:text-2xl uppercase tracking-[0.45em] pl-[0.45em] ${
                isLightMode 
                  ? 'text-[#1A150D]' 
                  : 'text-white bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-400'
              }`}
            >
              DHANUS
            </motion.h1>
            
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: ["0%", "60%"], 
                opacity: [0, 0.6],
                transition: { delay: 0.4, duration: 1.2, ease: "easeInOut" }
              }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold-premium to-transparent mx-auto my-3"
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ 
                opacity: 0.8, 
                y: 0,
                transition: { delay: 0.8, duration: 1, ease: "easeOut" }
              }}
              className="font-mono text-[9px] sm:text-xs text-gold-premium tracking-[0.3em] uppercase pl-[0.3em]"
            >
              ELITE FITNESS CENTER
            </motion.p>
          </div>

          {/* Premium Footer Accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.3,
              transition: { delay: 1.2, duration: 1 }
            }}
            className="absolute bottom-8 font-mono text-[8px] text-gray-500 tracking-[0.25em] uppercase"
          >
            © 2026 DHANUS GOLD
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
