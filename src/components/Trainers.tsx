import { useState } from 'react';
import { Award, CheckCircle, Phone, X, Sparkles, Trophy, Instagram, Linkedin } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';
import { Trainer } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TrainerCardProps {
  trainer: Trainer;
  language: string;
  t: (key: any) => string;
  onClick: () => void;
}

const getOptimizedTrainerImg = (url: string, width = 600) => {
  if (url && url.includes('cloudinary.com') && !url.includes('f_auto')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};

function TrainerCard({ trainer, language, t, onClick }: TrainerCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10, rotate: 1, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full h-[600px] cursor-pointer group relative rounded-2xl overflow-hidden bg-[#0B0B0B] border border-zinc-900 hover:border-[#FFC400] flex flex-col shadow-lg hover:shadow-[0_15px_30px_rgba(255,196,0,0.15)] transition-colors duration-300 will-change-transform"
      onClick={onClick}
    >
      {/* Trainer Poster Image */}
      <div className="relative flex-1 w-full overflow-hidden bg-black border-b border-[#FFC400]/10">
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FFC400] border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Loading Coach...</span>
          </div>
        )}
        <img
          src={getOptimizedTrainerImg(trainer.image, 600)}
          alt={`${trainer.name} - ${trainer.role}`}
          width={400}
          height={500}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.04] ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />
        
        {/* Years of Experience Badge */}
        {trainer.experienceYears && (
          <div className="absolute top-4 right-4 bg-[#FFC400] text-black px-3 py-1.5 rounded-lg shadow-lg z-10 flex flex-col items-center justify-center transform transition-transform group-hover:scale-105 border border-yellow-300">
            <span className="text-lg font-black leading-none">{trainer.experienceYears}+</span>
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest leading-none mt-1">{language === 'en' ? 'Yrs Exp' : 'ವರ್ಷದ ಅನುಭವ'}</span>
          </div>
        )}
      </div>

      {/* Name strip */}
      <div className="bg-[#0B0B0B] py-4 px-4 text-center shrink-0">
        <h3 className="text-xl font-display font-black text-[#FFC400] uppercase tracking-wider transition-colors duration-300 group-hover:text-white">
          {trainer.name}
        </h3>
        <p className="text-[10px] font-sans font-bold text-zinc-400 uppercase tracking-widest mt-1">
          {trainer.role}
        </p>
      </div>

      {/* Button */}
      <div className="p-4 pt-0 bg-[#0B0B0B] flex justify-center items-center shrink-0">
        <button
          className="w-full py-2.5 rounded-lg border border-[#FFC400]/30 bg-black text-[#FFC400] text-xs font-mono font-bold tracking-widest transition-all duration-300 group-hover:bg-[#FFC400] group-hover:text-black group-hover:border-[#FFC400] uppercase"
        >
          {language === 'en' ? 'VIEW PROFILE →' : 'ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ →'}
        </button>
      </div>
    </motion.div>
  );
}

interface TrainerModalProps {
  trainer: Trainer;
  language: string;
  onClose: () => void;
}

function TrainerModal({ trainer, language, onClose }: TrainerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#070707] border border-zinc-800 rounded-3xl shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-2/5 h-64 md:h-auto min-h-[300px] relative shrink-0">
          <img 
            src={trainer.image} 
            alt={trainer.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-3/5 p-6 sm:p-10 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider mb-2">
              {trainer.name}
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full">
              <Award className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {trainer.role}
              </span>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            {/* Specializations */}
            <div>
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4 text-[#FFC400]" />
                {language === 'en' ? 'Core Specializations' : 'ಪ್ರಮುಖ ಪರಿಣತಿ'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((spec, i) => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-sans text-xs px-3 py-1.5 rounded-lg">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div>
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
                <Trophy className="w-4 h-4 text-[#FFC400]" />
                {language === 'en' ? 'Professional Achievements' : 'ವೃತ್ತಿಪರ ಸಾಧನೆಗಳು'}
              </h4>
              <ul className="space-y-3">
                {trainer.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                    <CheckCircle className="w-4 h-4 text-[#FFC400] mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-sans text-zinc-300 leading-relaxed">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {trainer.instagramUrl && (
                <a 
                  href={trainer.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFC400] hover:border-[#FFC400] transition-all"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {trainer.linkedinUrl && (
                <a 
                  href={trainer.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFC400] hover:border-[#FFC400] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
             <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                language === 'en'
                  ? `Hi Dhanus Gold Fitness, I want to schedule a personal training consultation with Coach ${trainer.name}.`
                  : `ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್, ನಾನು ತರಬೇತುದಾರರಾದ ${trainer.name} ಅವರೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಲು ಬಯಸುತ್ತೇನೆ.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFC400] hover:bg-[#FFD000] text-black font-sans font-black text-sm rounded-xl transition-all duration-300 shadow-lg uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              {language === 'en' ? 'Book Consultation' : 'ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಿ'}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Trainers() {
  const { language, trainers, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  // Filter Categories
  const filters = [
    { id: 'ALL', label: language === 'en' ? 'ALL COACHES' : 'ಎಲ್ಲಾ ತರಬೇತುದಾರರು' },
    { id: 'FAT LOSS', label: language === 'en' ? 'FAT LOSS' : 'ಕೊಬ್ಬು ನಷ್ಟ' },
    { id: 'MUSCLE BUILDING', label: language === 'en' ? 'MUSCLE BUILDING' : 'ಸ್ನಾಯು ಅಭಿವೃದ್ಧಿ' },
    { id: 'TONING', label: language === 'en' ? 'TONING' : 'ಟೋನಿಂಗ್' },
    { id: 'SPORT SPECIFIC', label: language === 'en' ? 'SPORT SPECIFIC' : 'ಕ್ರೀಡಾ ತರಬೇತಿ' }
  ];

  // Matching algorithm for specialties
  const filteredTrainers = activeFilter === 'ALL'
    ? trainers
    : trainers.filter((trainer) =>
        trainer.specialties.some((spec) => {
          const s = spec.toLowerCase();
          const f = activeFilter.toLowerCase();
          return s.includes(f) || (f === 'sport specific' && s.includes('sport'));
        })
      );

  return (
    <section id="trainers" className="py-16 lg:py-20 bg-[#050505] relative content-auto">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs tracking-[0.2em] text-[#FFC400] uppercase font-bold">
            {t('trainersTag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-3 mb-4 tracking-tight uppercase">
            TRAIN WITH THE <span className="text-[#FFC400]">BEST.</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFC400] mx-auto mb-6 rounded-full" />
          <p className="text-sm text-[#D6D6D6] font-sans leading-relaxed">
            {t('trainersSubtitle')}
          </p>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-lg text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FFC400] text-black font-black uppercase shadow-md shadow-[#FFC400]/10'
                    : 'bg-[#050505] text-[#D6D6D6] border border-zinc-800 hover:border-zinc-700 font-bold uppercase'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 justify-items-center">
          {filteredTrainers.map((trainer, idx) => (
            <ScrollReveal key={trainer.id} delay={idx * 0.08} className="h-full w-full max-w-[360px] flex flex-col">
              <TrainerCard trainer={trainer} language={language} t={t} onClick={() => setSelectedTrainer(trainer)} />
            </ScrollReveal>
          ))}
        </div>

        <AnimatePresence>
          {selectedTrainer && (
            <TrainerModal trainer={selectedTrainer} language={language} onClose={() => setSelectedTrainer(null)} />
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <ScrollReveal className="relative rounded-2xl overflow-hidden bg-black border border-zinc-900 shadow-2xl">
          {/* Gym image background with rich dark overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{ 
              backgroundImage: `url('https://res.cloudinary.com/dnnfzhrbd/image/upload/v1782845439/_A0A4988_k33biw.jpg')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/75" />

          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase leading-tight">
              YOUR GOAL NEEDS <br className="sm:hidden" />
              <span className="text-[#FFC400]">THE RIGHT COACH.</span>
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#D6D6D6] leading-relaxed max-w-xl mx-auto">
              {language === 'en' 
                ? "Connect with Kengeri's ultimate fitness mentors today. Get an InBody analysis and custom strength layout designed exactly for your body type." 
                : "ಇಂದೇ ಕೆಂಗೇರಿಯ ಪ್ರಮುಖ ಫಿಟ್ನೆಸ್ ತರಬೇತುದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಿಮ್ಮ ದೇಹದ ಪ್ರಕಾರಕ್ಕೆ ತಕ್ಕಂತೆ ಇನ್‌ಬಾಡಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ವರ್ಕೌಟ್ ಚಾರ್ಟ್ ಪಡೆಯಿರಿ."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  language === 'en'
                    ? "Hi Dhanus Gold Fitness, I am ready to find the right coach for my goals. Please schedule my body analysis session."
                    : "ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್, ನನ್ನ ಫಿಟ್ನೆಸ್ ಗುರಿಗಳಿಗಾಗಿ ನಾನು ಸರಿಯಾದ ಕೋಚ್ ಆಯ್ಕೆ ಮಾಡಲು ಸಿದ್ಧನಾಗಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ನನ್ನ ದೈಹಿಕ ತಪಾಸಣೆಯನ್ನು ನಿಗದಿಪಡಿಸಿ."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFC400] hover:bg-[#FFD000] text-black font-sans font-black text-sm rounded-xl transition-all duration-300 shadow-lg"
              >
                <span>{language === 'en' ? 'FIND YOUR TRAINER →' : 'ನಿಮ್ಮ ತರಬೇತುದಾರರನ್ನು ಹುಡುಕಿ →'}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

