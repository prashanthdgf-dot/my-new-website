import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Dumbbell, Calendar, Shield, Users, Trophy } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { CLOUDINARY_TRANSFORMATION_GALLERY_URL, CLOUDINARY_TRANSFORMATIONS } from '../data';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ClientTransformation {
  id: number;
  image: string;
  name: { en: string; kn: string };
  metrics: { en: string; kn: string };
  duration: { en: string; kn: string };
  focus: { en: string; kn: string };
}

const TRANSFORMATIONS: ClientTransformation[] = CLOUDINARY_TRANSFORMATIONS.map((url, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: i + 1,
    image: url,
    name: { en: `Transformation Poster ${num}`, kn: `ಪರಿವರ್ತನೆ ಪೋಸ್ಟರ್ ${num}` },
    metrics: { en: `Member Poster #${num}`, kn: `ಸದಸ್ಯರ ಪೋಸ್ಟರ್ #${num}` },
    duration: { en: 'Certified DGF Member', kn: 'ಪ್ರಮಾಣೀಕೃತ ಡಿಜಿಎಫ್ ಸದಸ್ಯರು' },
    focus: { en: 'Physical Transformation', kn: 'ಶಾರೀರಿಕ ಪರಿವರ್ತನೆ' }
  };
});

// Helper hook to track screen width breakpoints with resize debouncing
function useResponsiveMode() {
  const [mode, setMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateMode = () => {
      const w = window.innerWidth;
      if (w < 640) setMode('mobile');
      else if (w < 1024) setMode('tablet');
      else setMode('desktop');
    };

    updateMode();
    let timer: any = null;
    const debouncedResize = () => {
      clearTimeout(timer);
      timer = setTimeout(updateMode, 100);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return mode;
}

const getOptimizedTransformationUrl = (url: string, width = 800) => {
  if (url && url.includes('cloudinary.com') && !url.includes('f_auto')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

export default function TransformationCarousel() {
  const { language } = useLanguage();
  const screenMode = useResponsiveMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = TRANSFORMATIONS.length;

  // Auto-slide logic
  useEffect(() => {
    if (isPaused || total === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  if (total === 0) {
    return (
      <div id="transformation-carousel" className="w-full flex flex-col items-center">
        <div className="w-full max-w-[460px] mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 shadow-xl backdrop-blur-md">
          <Dumbbell className="w-10 h-10 text-[#FFC400]" />
          <h3 className="text-lg font-display font-black text-white">
            {language === 'en' ? 'Showcase Gallery Ready' : 'ಶೋಕೇಸ್ ಗ್ಯಾಲರಿ ಸಿದ್ಧವಾಗಿದೆ'}
          </h3>
          <p className="text-xs font-sans text-zinc-400 max-w-xs">
            {language === 'en' 
              ? 'Old before/after photos removed. Provide your new image to display here!' 
              : 'ಹಳೆಯ ಫೋಟೋಗಳನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ. ಇಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲು ನಿಮ್ಮ ಹೊಸ ಚಿತ್ರವನ್ನು ನೀಡಿ!'}
          </p>
        </div>
      </div>
    );
  }

  const activeClient = TRANSFORMATIONS[currentIndex];

  // Helper to calculate wrapping circular difference
  const getDiff = (idx: number) => {
    let d = idx - currentIndex;
    if (d < -total / 2) d += total;
    if (d > total / 2) d -= total;
    return d;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Determine responsive visual translations to prevent mobile viewport clipping
  const isMobile = screenMode === 'mobile';
  const isTablet = screenMode === 'tablet';

  let xOffset = '52%';
  let sideScale = 0.85;
  if (isMobile) {
    xOffset = '32%';
    sideScale = 0.78;
  } else if (isTablet) {
    xOffset = '45%';
    sideScale = 0.82;
  }

  // Filter list to only render cards in neighborhood of currentIndex for clean performance
  const visibleCards = TRANSFORMATIONS.map((client, idx) => ({
    client,
    idx,
    diff: getDiff(idx)
  }))
  .filter((item) => Math.abs(item.diff) <= 2)
  // Render far background cards first, and active center card last so it is on top of stacking order
  .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  return (
    <div 
      id="transformation-carousel" 
      className="w-full flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 3D Perspective Card Deck Container */}
      <div 
        className="relative w-full aspect-[2000/1414] max-w-[460px] mx-auto overflow-visible mb-8 select-none"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {visibleCards.map(({ client, idx, diff }) => {
          const isActive = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;
          const isFarLeft = diff === -2;
          const isFarRight = diff === 2;

          // Compute dynamic 3D transform matrices based on relative deck index offsets
          let scale = 1;
          let x = '0%';
          let rotateY = 0;
          let z = 0;
          let opacity = 0;
          let zIndex = 10;

          if (isActive) {
            scale = 1;
            x = '0%';
            rotateY = 0;
            z = 0;
            opacity = 1;
            zIndex = 30;
          } else if (isLeft) {
            scale = sideScale;
            x = `-${xOffset}`;
            rotateY = 25;
            z = -140;
            opacity = 0.65;
            zIndex = 20;
          } else if (isRight) {
            scale = sideScale;
            x = xOffset;
            rotateY = -25;
            z = -140;
            opacity = 0.65;
            zIndex = 20;
          } else if (isFarLeft) {
            scale = sideScale * 0.85;
            x = `-${parseFloat(xOffset) * 1.8}%`;
            rotateY = 40;
            z = -280;
            opacity = 0.15;
            zIndex = 10;
          } else if (isFarRight) {
            scale = sideScale * 0.85;
            x = `${parseFloat(xOffset) * 1.8}%`;
            rotateY = -40;
            z = -280;
            opacity = 0.15;
            zIndex = 10;
          }

          // Subtle horizontal image parallax based on card shift distance
          const parallaxX = -diff * 35;

          return (
            <motion.div
              key={client.id}
              ref={isActive ? containerRef : null}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex,
                transformStyle: 'preserve-3d'
              }}
              animate={{
                scale,
                x,
                rotateY,
                z,
                opacity
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28
              }}
              onClick={() => {
                if (!isActive) {
                  setCurrentIndex(idx);
                }
              }}
              className={`rounded-2xl border-2 overflow-hidden bg-zinc-950 shadow-[0_20px_45px_rgba(0,0,0,0.85)] ${
                isActive 
                  ? 'border-zinc-800/90 cursor-default' 
                  : 'border-zinc-900/60 cursor-pointer hover:border-zinc-800/80 transition-colors'
              }`}
              // Allow swipe swappings only on active center card
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                const swipeThreshold = 60;
                if (info.offset.x < -swipeThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
            >
              {/* Card visual contents */}
              <div className="relative w-full h-full overflow-hidden">
                {/* Background shadow overlay to dim background cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/60 hover:bg-black/45 transition-colors duration-300 z-15" />
                )}

                {/* Luxury Cinematic Linear Gradient Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/95 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-black/35 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-black/35 to-transparent z-10 pointer-events-none" />

                {/* Single Image Display with crossfade (No split-screen clipping defect) */}
                <div className="absolute inset-0 select-none pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={client.image}
                      src={getOptimizedTransformationUrl(client.image, 800)}
                      srcSet={`${getOptimizedTransformationUrl(client.image, 480)} 480w, ${getOptimizedTransformationUrl(client.image, 800)} 800w`}
                      sizes="(max-width: 640px) 90vw, 460px"
                      alt={client.name[language === 'en' ? 'en' : 'kn']}
                      width={800}
                      height={566}
                      className="w-full h-full object-cover pointer-events-none select-none origin-center"
                      style={{ x: parallaxX, scale: 1.15 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Client Highlight Panel underneath the deck */}
      <div className="w-full max-w-[460px] mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeClient.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FFC400]/10 border border-[#FFC400]/25 rounded-xl">
                <Dumbbell className="w-5 h-5 text-[#FFC400]" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-display font-black text-white leading-tight">
                  {activeClient.name[language === 'en' ? 'en' : 'kn']}
                </h4>
                <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase mt-0.5">
                  {activeClient.focus[language === 'en' ? 'en' : 'kn']}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2.5 w-full sm:w-auto border-t border-zinc-800/40 sm:border-0 pt-3 sm:pt-0">
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono bg-zinc-950/80 px-2.5 py-1.5 border border-zinc-850 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>{activeClient.duration[language === 'en' ? 'en' : 'kn']}</span>
                </div>
                <div className="text-xs sm:text-sm font-display font-black text-[#FFC400] drop-shadow-[0_0_8px_rgba(255,196,0,0.25)] bg-[#FFC400]/5 px-2.5 py-1.5 border border-[#FFC400]/20 rounded-xl whitespace-nowrap">
                  {activeClient.metrics[language === 'en' ? 'en' : 'kn']}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const url = window.location.origin;
                  const name = activeClient.name[language === 'en' ? 'en' : 'kn'];
                  const duration = activeClient.duration[language === 'en' ? 'en' : 'kn'];
                  const focus = activeClient.focus[language === 'en' ? 'en' : 'kn'];
                  const metrics = activeClient.metrics[language === 'en' ? 'en' : 'kn'];
                  const text = language === 'en' 
                    ? `Check out this incredible physical transformation: "${name}" (${focus}) in ${duration}! Results: ${metrics}. Dhanus Gold Fitness Kengeri is top-tier. View more here: ${url}`
                    : `ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ ಜಿಮ್‌ನಲ್ಲಿನ ಈ ಅದ್ಭುತ ಶಾರೀರಿಕ ಪರಿವರ್ತನೆಯನ್ನು ನೋಡಿ: "${name}" (${focus}), ${duration}! ಫಲಿತಾಂಶ: ${metrics}. ಹೆಚ್ಚಿನ ವಿವರ ಇಲ್ಲಿದೆ: ${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-sans font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-emerald-600/10 cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>{language === 'en' ? 'Share to WhatsApp' : 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ'}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selector Navigation Buttons */}
      <div className="flex items-center justify-between w-full max-w-[460px] gap-3 font-sans">
        {/* Left Control Arrow */}
        <button
          onClick={handlePrev}
          className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-[#FFC400]/30 text-white transition-all duration-300 active:scale-95"
          aria-label="Previous transformation"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Thumbnail Dots Indicators with Scrolling container */}
        <div className="flex-grow overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center justify-center gap-1.5 min-w-max mx-auto px-4">
            {TRANSFORMATIONS.map((client, idx) => (
              <button
                key={client.id}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  idx === currentIndex
                    ? 'bg-[#FFC400] w-6 shadow-[0_0_10px_rgba(255,196,0,0.6)]'
                    : 'bg-zinc-700 hover:bg-zinc-500 w-2.5'
                }`}
                aria-label={`Go to client ${client.id}`}
              />
            ))}
          </div>
        </div>

        {/* Right Control Arrow */}
        <button
          onClick={handleNext}
          className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-[#FFC400]/30 text-white transition-all duration-300 active:scale-95"
          aria-label="Next transformation"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Total Count and User Guide Tip Label */}
      <div className="mt-3 flex items-center justify-between w-full max-w-[460px] px-1 text-[11px] text-zinc-500 font-mono">
        <span>
          {language === 'en' ? 'MEMBER' : 'ಸದಸ್ಯರು'}: {currentIndex + 1} / {total}
        </span>
        <span className="animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
          {language === 'en' ? 'Auto-fades one by one. Tap tabs to swap.' : 'ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬದಲಾಗುತ್ತದೆ. ಮ್ಯಾನುಯಲ್ ಬದಲಾಯಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ.'}
        </span>
      </div>

      {/* Cloudinary Gallery CTA Links */}
      <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-[460px]">
        <a
          href={CLOUDINARY_TRANSFORMATION_GALLERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 font-sans font-black text-xs text-black shadow-lg shadow-[#FFC400]/10 hover:shadow-[#FFC400]/25 transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-widest cursor-pointer w-full text-center"
        >
          <Trophy className="w-3.5 h-3.5 fill-black" />
          <span>
            {language === 'en' ? 'View Full Transformation Gallery' : 'ಪೂರ್ಣ ಪರಿವರ್ತನೆ ಗ್ಯಾಲರಿ ವೀಕ್ಷಿಸಿ'}
          </span>
        </a>
        <a
          href={CLOUDINARY_TRANSFORMATION_GALLERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-sans font-bold text-zinc-500 hover:text-[#FFC400] transition-colors tracking-wide underline decoration-zinc-800 hover:decoration-[#FFC400]/50 underline-offset-4 cursor-pointer"
        >
          {language === 'en' ? 'See more real member results' : 'ಇನ್ನಷ್ಟು ನೈಜ ಸದಸ್ಯರ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ'}
        </a>
      </div>
    </div>
  );
}
