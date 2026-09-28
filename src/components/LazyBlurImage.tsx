import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell } from 'lucide-react';

export interface LazyBlurImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderSrc?: string;
  aspectRatio?: string; // e.g. "4/3", "3/2", "16/9", "1/1"
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Generate a Cloudinary micro Low-Quality Image Placeholder (LQIP) URL
 * Transforming the image to 32px width, heavy blur, and compressed quality.
 */
export function getCloudinaryLqipUrl(url: string, width = 32, blur = 400): string | null {
  if (!url || typeof url !== 'string') return null;
  if (!url.includes('res.cloudinary.com') || !url.includes('/image/upload/')) {
    return null;
  }
  return url.replace(
    /\/image\/upload\/(v\d+\/)?/,
    `/image/upload/w_${width},q_10,e_blur:${blur},f_auto/$1`
  );
}

export function getOptimizedCloudinaryUrl(url: string, width?: number): string {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com') || !url.includes('/image/upload/')) {
    return url;
  }
  const transform = width ? `f_auto,q_auto,w_${width}/` : 'f_auto,q_auto/';
  return url.replace(/\/image\/upload\/(v\d+\/)?/, `/image/upload/${transform}$1`);
}

/**
 * Computes default width and height based on aspect ratio string to prevent CLS
 */
function getDefaultDimensions(aspectRatio?: string, explicitWidth?: number, explicitHeight?: number): { width: number; height: number } {
  if (explicitWidth && explicitHeight) {
    return { width: explicitWidth, height: explicitHeight };
  }
  if (!aspectRatio) {
    return { width: explicitWidth || 800, height: explicitHeight || 600 };
  }

  const cleanRatio = aspectRatio.replace(/\s+/g, '');
  if (cleanRatio === '4/3') return { width: explicitWidth || 800, height: explicitHeight || 600 };
  if (cleanRatio === '3/2') return { width: explicitWidth || 900, height: explicitHeight || 600 };
  if (cleanRatio === '16/9') return { width: explicitWidth || 1200, height: explicitHeight || 675 };
  if (cleanRatio === '1/1') return { width: explicitWidth || 800, height: explicitHeight || 800 };
  if (cleanRatio === '16/10') return { width: explicitWidth || 1200, height: explicitHeight || 750 };

  const parts = cleanRatio.split('/').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] !== 0) {
    const w = explicitWidth || 800;
    const h = explicitHeight || Math.round((w * parts[1]) / parts[0]);
    return { width: w, height: h };
  }

  return { width: explicitWidth || 800, height: explicitHeight || 600 };
}

export default function LazyBlurImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderSrc,
  aspectRatio,
  width,
  height,
  objectFit = 'cover',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  onLoad,
  onClick
}: LazyBlurImageProps) {
  const [isInView, setIsInView] = useState(priority);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [isLqipLoaded, setIsLqipLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { width: computedWidth, height: computedHeight } = getDefaultDimensions(aspectRatio, width, height);
  const formattedAspectRatio = aspectRatio ? (aspectRatio.includes('/') ? aspectRatio.replace('/', ' / ') : aspectRatio) : undefined;
  const lqipUrl = placeholderSrc || getCloudinaryLqipUrl(src);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '300px 0px', // Pre-fetch 300px before scrolling into view to avoid lag
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Reset states if src changes
  useEffect(() => {
    setIsHighResLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      style={formattedAspectRatio ? { aspectRatio: formattedAspectRatio } : undefined}
      className={`relative overflow-hidden bg-zinc-950 select-none ${containerClassName}`}
    >
      {/* 1. Base Shimmering Dark & Gold Loading Skeleton (Strictly maintaining aspect-ratio) */}
      {!isHighResLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFC400]/8 to-transparent animate-shimmer" />
          <div className="w-8 h-8 rounded-full bg-[#FFC400]/10 border border-[#FFC400]/20 flex items-center justify-center mb-1.5 animate-pulse">
            <Dumbbell className="w-4 h-4 text-[#FFC400]/60" />
          </div>
          <span className="text-[8px] font-mono tracking-widest text-[#FFC400]/40 font-bold uppercase">
            DHANUS GOLD
          </span>
        </div>
      )}

      {/* 2. Low-Quality Image Placeholder (LQIP) Blur-up layer */}
      {lqipUrl && !hasError && (
        <img
          src={lqipUrl}
          alt=""
          width={computedWidth}
          height={computedHeight}
          aria-hidden="true"
          loading="eager"
          decoding="async"
          onLoad={() => setIsLqipLoaded(true)}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out z-1 ${
            objectFit === 'contain' ? 'object-contain' : 'object-cover'
          } ${isHighResLoaded ? 'opacity-0' : isLqipLoaded ? 'opacity-100' : 'opacity-0'} scale-110 filter blur-lg`}
          referrerPolicy="no-referrer"
        />
      )}

      {/* 3. Full-Resolution High-Quality Image */}
      {isInView && !hasError && (() => {
        const isCloudinary = src && src.includes('res.cloudinary.com');
        const optimizedSrc = isCloudinary ? getOptimizedCloudinaryUrl(src, 800) : src;
        const srcSet = isCloudinary
          ? `${getOptimizedCloudinaryUrl(src, 400)} 400w, ${getOptimizedCloudinaryUrl(src, 800)} 800w, ${getOptimizedCloudinaryUrl(src, 1200)} 1200w`
          : undefined;

        return (
          <img
            src={optimizedSrc}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={computedWidth}
            height={computedHeight}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => {
              setIsHighResLoaded(true);
              onLoad?.();
            }}
            onError={() => setHasError(true)}
            className={`relative z-2 w-full h-full transition-all duration-700 ease-out ${
              objectFit === 'contain' ? 'object-contain' : 'object-cover'
            } ${
              isHighResLoaded
                ? 'opacity-100 filter blur-0 scale-100'
                : 'opacity-0 filter blur-sm scale-[1.02]'
            } ${className}`}
          />
        );
      })()}

      {/* 4. Error Fallback State */}
      {hasError && (
        <div className="absolute inset-0 bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center p-4 text-center z-10">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-2 text-[#FFC400]">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span className="text-xs font-display font-bold uppercase text-white tracking-wide">
            Dhanus Gold Fitness
          </span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
            Image Offline
          </span>
        </div>
      )}
    </div>
  );
}
