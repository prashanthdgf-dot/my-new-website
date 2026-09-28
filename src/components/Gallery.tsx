import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';
import LazyBlurImage from './LazyBlurImage';

export default function Gallery() {
  const { galleryItems, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'strength' | 'cardio' | 'crossfit' | 'wellness' | 'zumba' | 'dance' | 'mma'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const filters: { label: string; value: typeof activeFilter }[] = [
    { label: t('galleryAll'), value: 'all' },
    { label: t('galleryStrength'), value: 'strength' },
    { label: t('galleryCardio'), value: 'cardio' },
    { label: t('galleryCrossfit'), value: 'crossfit' },
    { label: t('galleryWellness'), value: 'wellness' },
    { label: t('galleryZumba'), value: 'zumba' },
    { label: t('galleryDance'), value: 'dance' },
    { label: t('galleryMMA'), value: 'mma' }
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <section id="gallery" className="py-16 lg:py-20 bg-black/40 backdrop-blur-sm relative content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-gold-premium uppercase font-semibold">
            {t('galleryTag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-3 mb-4">
            {t('galleryTitle')} <span className="text-gradient-gold">{t('galleryTitleGold')}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            {t('gallerySubtitle')}
          </p>
        </ScrollReveal>

        {/* Filter Navigation Tabs */}
        <ScrollReveal duration={0.6} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setActiveFilter(filter.value);
                setLightboxIndex(null); // Reset lightbox on filter change
              }}
              className={`font-sans text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-300 focus:outline-none ${
                activeFilter === filter.value
                  ? 'bg-gradient-gold text-black border-gold-premium shadow-[0_4px_15px_rgba(212,175,55,0.25)]'
                  : 'bg-zinc-950 text-gray-400 border-white/5 hover:border-white/15 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Gallery Dynamic Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} duration={0.7} delay={(idx % 3) * 0.15} y={30}>
              <div
                onClick={() => setLightboxIndex(idx)}
                className="group relative w-full aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-premium/40 hover:shadow-[0_10px_35px_rgba(212,175,55,0.06)] cursor-pointer transition-all duration-300"
              >
                <LazyBlurImage
                  src={item.image}
                  alt={item.title}
                  aspectRatio="4/3"
                  width={800}
                  height={600}
                  priority={idx < 3}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono font-bold text-gold-premium uppercase tracking-widest mb-1.5">
                    {item.category === 'strength' ? t('galleryStrength') : 
                     item.category === 'cardio' ? t('galleryCardio') : 
                     item.category === 'crossfit' ? t('galleryCrossfit') : 
                     item.category === 'wellness' ? t('galleryWellness') : 
                     item.category === 'zumba' ? t('galleryZumba') : 
                     item.category === 'dance' ? t('galleryDance') : 
                     item.category === 'mma' ? t('galleryMMA') : 
                     t('galleryAll')}
                  </span>
                  <h3 className="text-lg font-display font-extrabold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-sans mt-1">
                    {item.description}
                  </p>
                  <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full border border-white/10 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Carousel */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 bg-zinc-900 border border-white/10 rounded-full text-white hover:text-gold-premium transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            className="absolute left-6 p-3 bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 rounded-full text-white hover:text-gold-premium transition-all"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-6 p-3 bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 rounded-full text-white hover:text-gold-premium transition-all"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Description Container */}
          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Stop bubbling
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-zinc-950">
              <LazyBlurImage
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                aspectRatio="16/9"
                width={1200}
                height={675}
                priority={true}
                objectFit="contain"
                containerClassName="w-full h-full"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="text-center mt-6 max-w-xl">
              <span className="text-[11px] font-mono font-bold text-gold-premium tracking-[0.2em] uppercase">
                {filteredItems[lightboxIndex].category === 'strength' ? t('galleryStrength') : 
                 filteredItems[lightboxIndex].category === 'cardio' ? t('galleryCardio') : 
                 filteredItems[lightboxIndex].category === 'crossfit' ? t('galleryCrossfit') : 
                 filteredItems[lightboxIndex].category === 'wellness' ? t('galleryWellness') : 
                 filteredItems[lightboxIndex].category === 'zumba' ? t('galleryZumba') : 
                 filteredItems[lightboxIndex].category === 'dance' ? t('galleryDance') : 
                 filteredItems[lightboxIndex].category === 'mma' ? t('galleryMMA') : 
                 t('galleryAll')}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-sm font-sans text-gray-400 mt-2 leading-relaxed">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


