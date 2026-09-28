import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function PromoVideo() {
  return (
    <section className="py-16 lg:py-20 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFC400]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="w-full max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,196,0,0.1)] border border-zinc-900/50 bg-zinc-950">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/mDZ4asOgOy0?autoplay=1&mute=1&loop=1&playlist=mDZ4asOgOy0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="Dhanus Gold Fitness Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            {/* Overlay to prevent clicking if we just want it as background/display, though user might want to interact. Wait, YouTube TOS usually requires controls if not purely background, but we muted it. */}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
