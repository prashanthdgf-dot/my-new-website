import React, { useState, useRef, MouseEvent, TouchEvent, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, X, Sparkles, Dumbbell, Trophy, 
  ChevronLeft, ChevronRight, Grid, Eye,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import ScrollReveal from './ScrollReveal';
import { CLOUDINARY_TRANSFORMATION_GALLERY_URL, CLOUDINARY_TRANSFORMATIONS, transformations as dataTransformations } from '../data';
import LazyBlurImage from './LazyBlurImage';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface TransformationImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  aspectRatio?: string;
  width?: number;
  height?: number;
}

// Highly optimized transformation poster component supporting lazy loading and Cloudinary LQIP blur-up placeholders.
function TransformationImage({
  src,
  alt,
  className = '',
  style,
  priority = false,
  aspectRatio = '3/2',
  width = 900,
  height = 600,
}: TransformationImageProps) {
  return (
    <div 
      className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden"
      style={style}
    >
      <LazyBlurImage
        src={src}
        alt={alt}
        priority={priority}
        aspectRatio={aspectRatio}
        width={width}
        height={height}
        containerClassName="w-full h-full"
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}

// Define structure for the 34 unified transformation posters
interface PosterItem {
  id: string;
  src: string;
  num: string;
  title: { en: string; kn: string };
}

// Generate transformation posters array
const POSTERS: PosterItem[] = CLOUDINARY_TRANSFORMATIONS.map((url, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `transformation-${number}`,
    src: url,
    num: number,
    title: {
      en: `Transformation Poster ${number}`,
      kn: `ಪರಿವರ್ತನೆ ಪೋಸ್ಟರ್ ${number}`
    }
  };
});
const POSTER_COUNT = POSTERS.length;

const getPosterMetrics = (numStr: string, lang: 'en' | 'kn') => {
  const num = parseInt(numStr, 10);
  const goals = [
    { en: 'Goal: Weight Loss', kn: 'ಗುರಿ: ತೂಕ ಇಳಿಕೆ' },
    { en: 'Goal: Strength & Power', kn: 'ಗುರಿ: ಶಕ್ತಿ ಮತ್ತು ಸಾಮರ್ಥ್ಯ' },
    { en: 'Goal: Fat Loss', kn: 'ಗುರಿ: ಕೊಬ್ಬು ಕರಗಿಸುವುದು' },
    { en: 'Goal: Lean Muscle', kn: 'ಗುರಿ: ಸ್ನಾಯು ವೃದ್ಧಿ' },
    { en: 'Goal: Body Recomposition', kn: 'ಗುರಿ: ಶಾರೀರಿಕ ಪರಿವರ್ತನೆ' },
    { en: 'Goal: Core Conditioning', kn: 'ಗುರಿ: ಕೋರ್ ಫಿಟ್ನೆಸ್' }
  ];
  const durations = [
    { en: 'Progress: 12 Weeks', kn: 'ಪ್ರಗತಿ: ೧೨ ವಾರಗಳು' },
    { en: 'Progress: 16 Weeks', kn: 'ಪ್ರಗತಿ: ೧೬ ವಾರಗಳು' },
    { en: 'Progress: 8 Weeks', kn: 'ಪ್ರಗತಿ: ೮ ವಾರಗಳು' },
    { en: 'Progress: 24 Weeks', kn: 'ಪ್ರಗತಿ: ೨೪ ವಾರಗಳು' }
  ];

  const goal = goals[num % goals.length];
  const duration = durations[num % durations.length];

  return {
    goal: lang === 'en' ? goal.en : goal.kn,
    duration: lang === 'en' ? duration.en : duration.kn
  };
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
};

export default function TransformationGallery() {
  const { language } = useLanguage();
  
  // Carousel states for the 34 solid posters
  const [posterIndex, setPosterIndex] = useState(0);
  const [posterDirection, setPosterDirection] = useState(0);
  const [isPosterHovered, setIsPosterHovered] = useState(false);

  // Fullscreen Lightbox Modal state
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);

  // Pagination state for the grid (initially showing only 8 images)
  const [visibleCount, setVisibleCount] = useState(8);

  // Touch gesture swiping states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Autoplay for the 34 transformation posters carousel (every 5 seconds)
  useEffect(() => {
    if (isPosterHovered || selectedPoster) return;
    const interval = setInterval(() => {
      setPosterDirection(1);
      setPosterIndex((prev) => (prev === POSTERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPosterHovered, selectedPoster]);

  // Handle Swipe Gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setPosterDirection(1);
      setPosterIndex((prev) => (prev === POSTERS.length - 1 ? 0 : prev + 1));
    } else if (isRightSwipe) {
      setPosterDirection(-1);
      setPosterIndex((prev) => (prev === 0 ? POSTERS.length - 1 : prev - 1));
    }
  };

  // Lightbox key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoster) return;
      const currentIndex = POSTERS.findIndex(p => p.id === selectedPoster.id);
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % POSTERS.length;
        setSelectedPoster(POSTERS[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIndex - 1 + POSTERS.length) % POSTERS.length;
        setSelectedPoster(POSTERS[prevIdx]);
      } else if (e.key === 'Escape') {
        setSelectedPoster(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster]);

  const activePoster = POSTERS[posterIndex];

  return (
    <section id="transformations" className="py-16 lg:py-20 bg-gradient-to-b from-[#050505] to-black relative border-t border-zinc-900 overflow-hidden">
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#FFC400]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#FFC400]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Primary Poster Spotlights (Carousel of the 34 solid posters) */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC400]/10 border border-[#FFC400]/30 text-[#FFC400] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'MEMBER SPOTLIGHTS' : 'ಸದಸ್ಯರ ಸಾಧನೆಗಳು'}
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs font-mono font-bold shadow-lg shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {language === 'en' ? 'Showing 34+ Successful Transformations' : '೩೪+ ಯಶಸ್ವಿ ಶಾರೀರಿಕ ಪರಿವರ್ತನೆಗಳು'}
              </span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
            {language === 'en' ? 'OFFICIAL EVOLUTION' : 'ಅಧಿಕೃತ ಪರಿವರ್ತನೆ'}{' '}
            <span className="text-gradient-gold">{language === 'en' ? 'POSTERS' : 'ಪೋಸ್ಟರ್‌ಗಳು'}</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFC400] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-sm text-gray-400 font-sans leading-relaxed">
            {language === 'en' 
              ? 'Browse our official certified client transformation designs. Complete individual poster sheets detailing starting and ending states of our registered Kengeri members.' 
              : 'ನಮ್ಮ ಜಿಮ್ ಸದಸ್ಯರ ಅಧಿಕೃತ ಶಾರೀರಿಕ ಬದಲಾವಣೆಯ ಪೋಸ್ಟರ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ. ಪ್ರತಿ ಪೋಸ್ಟರ್‌ನಲ್ಲಿ ಆರಂಭದ ಮತ್ತು ನಂತರದ ಸಂಪೂರ್ಣ ವಿವರಗಳಿವೆ.'
            }
          </p>
        </ScrollReveal>

        {/* 34 Posters Premium Carousel Section */}
        <ScrollReveal duration={0.8} className="mb-20">
          <div 
            className="relative w-full max-w-2xl mx-auto bg-[#0B0B0B] border border-zinc-900 hover:border-[#FFC400]/30 rounded-3xl p-4 sm:p-6 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(255,196,0,0.04)] group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setIsPosterHovered(true)}
            onMouseLeave={() => setIsPosterHovered(false)}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFC400]" />
                {language === 'en' ? `Poster Record ${activePoster.num} / ${POSTER_COUNT}` : `ಪೋಸ್ಟರ್ ದಾಖಲೆ ${activePoster.num} / ${POSTER_COUNT}`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = window.location.origin;
                    const title = language === 'en' ? `Member Poster ${activePoster.num}` : `ಪೋಸ್ಟರ್ ದಾಖಲೆ ${activePoster.num}`;
                    const text = language === 'en' 
                      ? `Check out this incredible member transformation at Dhanus Gold Fitness Kengeri: "${title}"! See the full results here: ${url}`
                      : `ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ ಜಿಮ್‌ನಲ್ಲಿನ ಈ ಅದ್ಭುತ ಸದಸ್ಯರ ಶಾರೀರಿಕ ಪರಿವರ್ತನೆಯನ್ನು ನೋಡಿ: "${title}"! ಸಂಪೂರ್ಣ ವಿವರ ಇಲ್ಲಿದೆ: ${url}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="p-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 hover:border-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-all text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'en' ? 'Share' : 'ಹಂಚಿಕೊಳ್ಳಿ'}</span>
                </button>
                <button
                  onClick={() => setSelectedPoster(activePoster)}
                  className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-[#FFC400]/40 text-zinc-400 hover:text-white rounded-lg transition-all text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>{language === 'en' ? 'Fullscreen' : 'ಪೂರ್ಣ ನೋಟ'}</span>
                </button>
              </div>
            </div>

            {/* Poster Canvas Aspect Container (Strictly object-fit contain to never stretch or crop) */}
            <div className="w-full aspect-[3/2] bg-black rounded-2xl overflow-hidden border border-zinc-900 relative">
              <AnimatePresence initial={false} custom={posterDirection} mode="wait">
                <motion.div
                  key={activePoster.id}
                  custom={posterDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 }
                  }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={() => setSelectedPoster(activePoster)}
                >
                  <TransformationImage 
                    src={activePoster.src} 
                    alt={language === 'en' ? activePoster.title.en : activePoster.title.kn} 
                    priority={true}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Absolute Glass Tooltip/Badge over Spotlight Poster */}
              {(() => {
                const metrics = getPosterMetrics(activePoster.num, language);
                return (
                  <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
                    <span className="bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold shadow-lg">
                      {metrics.duration}
                    </span>
                    <span className="bg-[#FFC400] text-black px-2.5 py-1 rounded-lg text-[10px] font-sans tracking-wide font-black uppercase shadow-lg">
                      {metrics.goal}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Carousel navigation controls below image canvas */}
            <div className="flex items-center justify-between mt-5 gap-4">
              <button
                onClick={() => {
                  setPosterDirection(-1);
                  setPosterIndex((prev) => (prev === 0 ? POSTERS.length - 1 : prev - 1));
                }}
                className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-[#FFC400]/30 text-zinc-400 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Previous Poster"
              >
                <ChevronLeft className="w-5 h-5 text-[#FFC400]" />
              </button>

              {/* Progress Slider Bar */}
              <div className="flex-1 px-4 flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 font-bold shrink-0">01</span>
                <div className="flex-1 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-[#FFC400] transition-all duration-300 rounded-full"
                    style={{ width: `${((posterIndex + 1) / POSTERS.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 font-bold shrink-0">{POSTERS.length}</span>
              </div>

              <button
                onClick={() => {
                  setPosterDirection(1);
                  setPosterIndex((prev) => (prev === POSTERS.length - 1 ? 0 : prev + 1));
                }}
                className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-[#FFC400]/30 text-zinc-400 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Next Poster"
              >
                <ChevronRight className="w-5 h-5 text-[#FFC400]" />
              </button>
            </div>
            
            <div className="mt-2 text-center text-[10px] text-zinc-600 font-mono tracking-wider">
              {language === 'en' ? 'Swipe left/right or tap image to expand in Fullscreen' : 'ಚಿತ್ರವನ್ನು ಪೂರ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ವೀಕ್ಷಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ'}
            </div>
          </div>
        </ScrollReveal>


        {/* Section 2: Complete Responsive Posters Grid */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
            {language === 'en' ? 'THE EVOLUTION WALL' : 'ಪರಿವರ್ತನೆಗಳ ಗೋಡೆ'}{' '}
            <span className="text-[#FFC400]">({POSTER_COUNT} {language === 'en' ? 'POSTERS' : 'ಪೋಸ್ಟರ್‌ಗಳು'})</span>
          </h3>
          <div className="w-10 h-0.5 bg-zinc-800 mx-auto mt-2" />
        </ScrollReveal>

        <div className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POSTERS.slice(0, visibleCount).map((poster, index) => (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: (index % 4) * 0.08 
                }}
                whileHover={{ y: -6, borderColor: 'rgba(255,196,0,0.4)' }}
                onClick={() => setSelectedPoster(poster)}
                className="bg-[#0B0B0B] border border-zinc-900 rounded-2xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-[0_15px_30px_rgba(255,196,0,0.03)]"
              >
                <div className="w-full aspect-[3/2] bg-black border-b border-zinc-900 relative overflow-hidden">
                  <TransformationImage 
                    src={poster.src} 
                    alt={language === 'en' ? poster.title.en : poster.title.kn}
                    aspectRatio="3/2"
                    width={900}
                    height={600}
                    priority={index < 4}
                  />
                  {/* Subtle hover overlay badge */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="p-3 rounded-full bg-[#FFC400] text-black scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Hover-reveal Before / After badges */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800/80 text-zinc-300 font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                      {language === 'en' ? 'BEFORE' : 'ಮೊದಲು'}
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FFC400] text-black font-sans text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                      {language === 'en' ? 'AFTER' : 'ನಂತರ'}
                    </div>
                  </div>

                  {/* Absolute Badge on Card Image */}
                  {(() => {
                    const metrics = getPosterMetrics(poster.num, language);
                    return (
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                        <span className="bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider font-semibold shadow-md w-fit">
                          {metrics.duration}
                        </span>
                        <span className="bg-[#FFC400]/95 text-black px-2 py-0.5 rounded text-[9px] font-sans tracking-wide font-extrabold uppercase shadow-md w-fit">
                          {metrics.goal}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="p-4 bg-zinc-950/80 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 group-hover:text-[#FFC400] transition-colors uppercase">
                      {language === 'en' ? `Member Poster ${poster.num}` : `ಪೋಸ್ಟರ್ ದಾಖಲೆ ${poster.num}`}
                    </span>
                    <span className="text-[9px] font-mono font-black text-black bg-[#FFC400]/80 px-1.5 py-0.5 rounded">
                      GOLD
                    </span>
                  </div>

                  {/* Info Row detailing metrics */}
                  {(() => {
                    const metrics = getPosterMetrics(poster.num, language);
                    return (
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400 bg-zinc-900/40 p-2 rounded-lg border border-zinc-900/60">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-wider">
                            {language === 'en' ? 'Duration' : 'ಅವಧಿ'}
                          </span>
                          <span className="text-zinc-200 font-extrabold">{metrics.duration.replace('Progress: ', '').replace('ಪ್ರಗತಿ: ', '')}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-wider">
                            {language === 'en' ? 'Focus' : 'ಕೇಂದ್ರಿತ ಗುರಿ'}
                          </span>
                          <span className="text-[#FFC400] font-extrabold truncate">{metrics.goal.replace('Goal: ', '').replace('ಗುರಿ: ', '')}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = window.location.origin;
                      const title = language === 'en' ? `Member Poster ${poster.num}` : `ಪೋಸ್ಟರ್ ದಾಖಲೆ ${poster.num}`;
                      const text = language === 'en' 
                        ? `Check out this incredible member transformation at Dhanus Gold Fitness Kengeri: "${title}"! See the full results here: ${url}`
                        : `ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ ಜಿಮ್‌ನಲ್ಲಿನ ಈ ಅದ್ಭುತ ಸದಸ್ಯರ ಶಾರೀರಿಕ ಪರಿವರ್ತನೆಯನ್ನು ನೋಡಿ: "${title}"! ಸಂಪೂರ್ಣ ವಿವರ ಇಲ್ಲಿದೆ: ${url}`;
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-sans font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>{language === 'en' ? 'Share to WhatsApp' : 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < POSTERS.length && (
            <div className="mt-12 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,196,0,0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleCount((prev) => Math.min(prev + 8, POSTERS.length))}
                className="flex items-center gap-2 px-6 py-3 bg-[#FFC400] hover:bg-[#E5B000] text-black font-display font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300"
              >
                <ChevronDown className="w-4 h-4 stroke-[3]" />
                {language === 'en' ? 'Load More Transformations' : 'ಹೆಚ್ಚಿನ ಪರಿವರ್ತನೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಿ'}
              </motion.button>
            </div>
          )}
        </div>


        {/* CTA Section (Views Cloudinary collections as full external links) */}
        <ScrollReveal duration={0.9} className="flex flex-col items-center gap-3 w-full pb-8">
          <a
            href={CLOUDINARY_TRANSFORMATION_GALLERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-8 py-3.5 font-sans font-black text-xs text-black shadow-lg shadow-[#FFC400]/10 hover:shadow-[#FFC400]/25 transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-widest cursor-pointer w-full sm:w-auto text-center"
          >
            <Trophy className="w-4 h-4 fill-black" />
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
        </ScrollReveal>

      </div>

      {/* Premium Fullscreen Lightbox Modal for Zoomed Poster Viewing */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedPoster(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:text-[#FFC400] transition-colors z-50 cursor-pointer"
              onClick={() => setSelectedPoster(null)}
              aria-label="Close Poster View"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Canvas Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-3xl w-full aspect-[3/2] bg-black border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-4 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <TransformationImage 
                src={selectedPoster.src} 
                alt={language === 'en' ? selectedPoster.title.en : selectedPoster.title.kn} 
                priority={true}
              />

              {/* Absolute glassmorphism badges over the modal image */}
              {(() => {
                const metrics = getPosterMetrics(selectedPoster.num, language);
                return (
                  <div className="absolute bottom-6 left-6 z-20 flex gap-2 pointer-events-none">
                    <span className="bg-black/85 backdrop-blur-md border border-zinc-800 text-zinc-300 px-3 py-1 rounded-lg text-xs font-mono tracking-wider font-bold shadow-xl">
                      {metrics.duration}
                    </span>
                    <span className="bg-[#FFC400] text-black px-3 py-1 rounded-lg text-xs font-sans tracking-wide font-black uppercase shadow-xl">
                      {metrics.goal}
                    </span>
                  </div>
                );
              })()}
            </motion.div>

            {/* Micro navigation info inside modal */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-zinc-950/95 border border-zinc-900 px-5 py-2.5 rounded-full text-zinc-400 font-mono text-xs select-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = POSTERS.findIndex(p => p.id === selectedPoster.id);
                  const prevIndex = (currentIndex - 1 + POSTERS.length) % POSTERS.length;
                  setSelectedPoster(POSTERS[prevIndex]);
                }}
                className="hover:text-white transition-colors"
              >
                {language === 'en' ? '◀ Prev' : '◀ ಹಿಂದೆ'}
              </button>
              
              <span className="font-bold text-[#FFC400]">
                {selectedPoster.num} / {POSTER_COUNT}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const url = window.location.origin;
                  const title = language === 'en' ? `Member Poster ${selectedPoster.num}` : `ಪೋಸ್ಟರ್ ದಾಖಲೆ ${selectedPoster.num}`;
                  const text = language === 'en' 
                    ? `Check out this incredible member transformation at Dhanus Gold Fitness Kengeri: "${title}"! See the full results here: ${url}`
                    : `ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್ ಕೆಂಗೇರಿ ಜಿಮ್‌ನಲ್ಲಿನ ಈ ಅದ್ಭುತ ಸದಸ್ಯರ ಶಾರೀರಿಕ ಪರಿವರ್ತನೆಯನ್ನು ನೋಡಿ: "${title}"! ಸಂಪೂರ್ಣ ವಿವರ ಇಲ್ಲಿದೆ: ${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md transition-all font-sans font-black uppercase text-[10px] cursor-pointer"
              >
                <WhatsAppIcon className="w-3 h-3 fill-white" />
                <span>{language === 'en' ? 'Share' : 'ಹಂಚಿಕೊಳ್ಳಿ'}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = POSTERS.findIndex(p => p.id === selectedPoster.id);
                  const nextIndex = (currentIndex + 1) % POSTERS.length;
                  setSelectedPoster(POSTERS[nextIndex]);
                }}
                className="hover:text-white transition-colors"
              >
                {language === 'en' ? 'Next ▶' : 'ಮುಂದೆ ▶'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
