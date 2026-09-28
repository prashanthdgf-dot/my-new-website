import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Dumbbell, Sparkles, CheckCircle2, RefreshCw, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { submitFreeTrialPass } from '../lib/supabase';
import { updateMetaTags } from '../lib/seo';
import ScrollReveal from '../components/ScrollReveal';

export default function TrainingPage() {
  const { language, t } = useLanguage();

  useEffect(() => {
    updateMetaTags(
      language === 'en' ? 'Personal Training in Kengeri | Dhanus Gold Fitness' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್',
      language === 'en' 
        ? 'Explore personal training, strength training, bodybuilding, fat loss, and customized workout programs at Dhanus Gold Fitness in Kengeri, Bengaluru.'
        : 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನಲ್ಲಿ ವೈಯಕ್ತಿಕ ತರಬೇತಿ, ಸ್ಟ್ರೆಂತ್ ತರಬೇತಿ, ಬಾಡಿಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ತೂಕ ಇಳಿಕೆ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845411/_A0A4965_whk1hl.jpg',
      '/training'
    );
  }, [language]);

  const [activeTab, setActiveTab] = useState('general');
  const [formState, setFormState] = useState({ name: '', phone: '', program: 'General Gym Training' });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const programs: any[] = [
    {
      id: 'general',
      title: t('train1Title'),
      desc: t('train1Desc'),
      focus: language === 'en' ? ['Modern Equipment', 'Spacious Layout', 'Independent Workouts'] : ['ಆಧುನಿಕ ಉಪಕರಣಗಳು', 'ವಿಶಾಲವಾದ ವಿನ್ಯಾಸ', 'ಸ್ವತಂತ್ರ ವರ್ಕೌಟ್‌ಗಳು']
    },
    {
      id: 'beginner',
      title: t('train2Title'),
      desc: t('train2Desc'),
      focus: language === 'en' ? ['Equipment Instruction', 'Form Foundation', 'Gym Safety'] : ['ಉಪಕರಣಗಳ ಸೂಚನೆ', 'ಅಡಿಪಾಯ ತರಬೇತಿ', 'ಜಿಮ್ ಸುರಕ್ಷತೆ']
    },
    {
      id: 'strength',
      title: t('train3Title'),
      desc: t('train3Desc'),
      focus: language === 'en' ? ['Muscle Growth', 'Progressive Load', 'Compound Lifts'] : ['ಸ್ನಾಯು ಬೆಳವಣಿಗೆ', 'ಪ್ರೋಗ್ರೆಸಿವ್ ಲೋಡ್', 'ಕಾಂಪೌಂಡ್ ಲಿಫ್ಟ್ಸ್']
    },
    {
      id: 'weight',
      title: t('train4Title'),
      desc: t('train4Desc'),
      focus: language === 'en' ? ['Fat Loss', 'Metabolic Boost', 'Nutrition Sync'] : ['ಕೊಬ್ಬು ನಷ್ಟ', 'ಮೆಟಬಾಲಿಕ್ ಬೂಸ್ಟ್', 'ಡಯಟ್ ಸಿಂಕ್']
    },
    {
      id: 'pt',
      title: t('train5Title'),
      desc: t('train5Desc'),
      focus: language === 'en' ? ['1-on-1 Coaching', 'Custom Blueprint', 'Elite Results'] : ['ಒಬ್ಬರಿಗೊಬ್ಬರು ಕೋಚಿಂಗ್', 'ವೈಯಕ್ತಿಕ ಯೋಜನೆ', 'ಉನ್ನತ ಫಲಿತಾಂಶಗಳು']
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};
    if (!formState.name.trim()) newErrors.name = language === 'en' ? 'Name is required' : 'ಹೆಸರು ಅಗತ್ಯವಿದೆ';
    if (!formState.phone.trim() || !/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = language === 'en' ? 'Valid 10-digit phone number is required' : '೧೦ ಅಂಕಿಗಳ ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setSubmitError('');
    const result = await submitFreeTrialPass({
      name: formState.name.trim(),
      phone: formState.phone.replace(/[^0-9]/g, ''),
      fitnessGoal: formState.program,
    });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setFormState({ name: '', phone: '', program: 'General Gym Training' });
    } else {
      setSubmitError(language === 'en' ? 'Sorry, we could not send your details. Please call or WhatsApp us on +91 97400 18911.' : 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು +91 97400 18911 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.');
    }
  };

  const selectedProgram = programs.find(p => p.id === activeTab) || programs[0];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <ScrollReveal y={20}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Flame className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {t('trainPageBadge')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {t('trainPageTitle')}{' '}
              <span className="text-[#FFC400]">
                {t('trainPageTitleGold')}
              </span>
            </h1>
            <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('trainPageDesc')}
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Layout */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
            
            {/* Tab Selector Links */}
            <div className="lg:col-span-4 flex flex-col gap-2 bg-[#070707] p-4 border border-zinc-900 rounded-2xl">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => { setActiveTab(program.id); setSuccess(false); }}
                  className={`w-full text-left py-4 px-5 rounded-xl text-xs sm:text-sm font-display font-black transition-all uppercase cursor-pointer flex justify-between items-center group ${
                    activeTab === program.id 
                      ? 'bg-[#FFC400] text-black shadow-xl shadow-[#FFC400]/10' 
                      : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <span className="truncate pr-4">{program.title}</span>
                  <Dumbbell className={`w-4 h-4 shrink-0 ${activeTab === program.id ? 'text-black' : 'text-zinc-700 group-hover:text-zinc-400'}`} />
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className="lg:col-span-8 bg-[#070707] border border-zinc-900 rounded-3xl p-8 sm:p-12 relative min-h-[400px] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProgram.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#FFC400] uppercase tracking-widest">
                    <Sparkles className="w-5 h-5" />
                    <span>{language === 'en' ? 'TRAINING FOCUS' : 'ತರಬೇತಿ ನೈಪುಣ್ಯತೆ'}</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white leading-tight">
                    {selectedProgram.title}
                  </h2>
                  
                  <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed max-w-2xl">
                    {selectedProgram.desc}
                  </p>

                  <div className="border-t border-zinc-900 pt-8 mt-8">
                    <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">
                      {language === 'en' ? 'CORE PROGRAM OUTCOMES' : 'ತರಬೇತಿಯ ಪ್ರಮುಖ ಪ್ರಯೋಜನಗಳು'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(selectedProgram.focus as string[]).map((f, i) => (
                        <div key={i} className="flex gap-3 items-center bg-black/40 border border-zinc-900 p-4 rounded-xl text-xs font-bold text-zinc-300">
                          <CheckCircle2 className="w-5 h-5 text-[#FFC400] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </ScrollReveal>

        {/* Inquire Inquiry Form */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto bg-[#070707] border border-[#FFC400]/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
              {t('trainCtaTitle')}
            </h2>
            <p className="text-sm text-zinc-500 mt-3 max-w-lg mx-auto">
              {language === 'en' ? 'Submit details to schedule a call back with head coach Prashanth.' : 'ಹೆಡ್ ಕೋಚ್ ಪ್ರಶಾಂತ್ ಅವರೊಂದಿಗೆ ಉಚಿತ ಸಮಾಲೋಚನೆಗಾಗಿ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ.'}
            </p>
          </div>

          {success ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#FFC400]/5 border border-[#FFC400]/20 rounded-2xl p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-[#FFC400]/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#FFC400] animate-bounce" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-[#FFC400]">
                {language === 'en' ? 'Inquiry Submitted!' : 'ವಿಚಾರಣೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!'}
              </h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                {language === 'en' 
                  ? 'Thank you! We received your request. Coach Prashanth will contact you within 2 business hours.'
                  : 'ಧನ್ಯವಾದಗಳು! ಹೆಡ್ ಕೋಚ್ ಪ್ರಶಾಂತ್ ಅವರು ಮುಂದಿನ ೨ ಗಂಟೆಗಳ ಒಳಗಾಗಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದ್ದಾರೆ.'}
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors"
              >
                {language === 'en' ? 'Inquire Another' : 'ಮತ್ತೊಂದು ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ'}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">{language === 'en' ? 'Your Name' : 'ನಿಮ್ಮ ಹೆಸರು'}</label>
                  <input 
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={language === 'en' ? 'e.g. Rahul Sharma' : 'ಉದಾಹರಣೆಗೆ: ರಾಹುಲ್ ಶರ್ಮಾ'}
                    className={`w-full bg-black border rounded-xl px-5 py-4 text-sm text-white focus:outline-none placeholder-zinc-800 transition-colors ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-zinc-850 focus:border-[#FFC400]'
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-500 mt-2 block font-bold">{errors.name}</span>}
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">{language === 'en' ? 'Mobile Number' : 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'}</label>
                  <input 
                    type="tel" 
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder={language === 'en' ? '10-Digit Mobile Number' : '೧೦ ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'}
                    className={`w-full bg-black border rounded-xl px-5 py-4 text-sm text-white focus:outline-none placeholder-zinc-800 transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-zinc-850 focus:border-[#FFC400]'
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 mt-2 block font-bold">{errors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">{language === 'en' ? 'Select Program' : 'ತರಬೇತಿ ಪ್ರೋಗ್ರಾಂ'}</label>
                <select 
                  value={formState.program}
                  onChange={(e) => setFormState({ ...formState, program: e.target.value })}
                  className="w-full bg-black border border-zinc-850 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#FFC400] appearance-none transition-colors"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              {submitError && (
                <p role="alert" className="text-xs text-red-400 text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-gold text-black font-sans font-black text-sm uppercase rounded-xl tracking-[0.1em] hover:shadow-2xl hover:shadow-[#FFC400]/20 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                <span>{loading ? (language === 'en' ? 'Submitting...' : 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...') : t('trainCtaBtn')}</span>
              </button>
            </form>
          )}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

export { TrainingPage };
