import React from 'react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';

export default function Testimonials() {
  const { testimonials, t } = useLanguage();

  return (
    <section id="reviews" className="py-20 lg:py-24 bg-[#060606] relative overflow-hidden text-white content-auto">
      {/* Decorative ambient background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFC400]/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FFC400]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#FFC400]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#FFC400] uppercase font-bold">
              {t('testimonialsTag')}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight leading-tight">
            {t('testimonialsTitle')} <span className="text-[#FFC400]">{t('testimonialsTitleGold')}</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-gold mx-auto my-6 rounded-full" />
          
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative bg-[#0A0A0A] border border-zinc-850 hover:border-[#FFC400]/40 p-7 sm:p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between shadow-2xl hover:shadow-[#FFC400]/5 group"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-zinc-800/40 group-hover:text-[#FFC400]/10 transition-colors pointer-events-none" />

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC400] text-[#FFC400]" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed italic mb-8">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Member Details */}
              <div className="pt-6 border-t border-zinc-850 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#FFC400]/30 bg-zinc-900 shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name || 'DGF Member'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-display font-black text-white truncate">
                      {testimonial.name || t('testimonialsVerified')}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                  </div>
                  <p className="text-xs font-sans text-[#FFC400] font-medium truncate mt-0.5">
                    {testimonial.role}
                  </p>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono mt-0.5">
                    <MapPin className="w-3 h-3 text-[#FFC400] shrink-0" />
                    <span className="truncate">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
