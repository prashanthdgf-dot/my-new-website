import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (barRef.current) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          const ratio = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
          barRef.current.style.transform = `scaleX(${ratio})`;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Run once on load to initialize
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-950/10 dark:bg-black/20 z-[9999] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[#FFC400] via-[#FFD000] to-[#FFC400] shadow-[0_1px_8px_rgba(255,196,0,0.6)] origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
