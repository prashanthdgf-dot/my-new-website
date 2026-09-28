import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, RefreshCw, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { submitInquiry } from '../lib/supabase';
import { updateMetaTags } from '../lib/seo';
import ScrollReveal from '../components/ScrollReveal';

export default function TrainersPage() {
  const { language, trainers, t } = useLanguage();

  useEffect(() => {
    updateMetaTags(
      language === 'en' ? 'Personal Trainers in Kengeri | Dhanus Gold Fitness' : 'ಪ್ರಮಾಣೀಕೃತ ತರಬೇತುದಾರರು ಕೆಂಗೇರಿ | ಧನುಸ್ ಗೋಲ್ಡ್',
      language === 'en' 
        ? 'Meet certified fitness coaches and personal trainers at Dhanus Gold Fitness Kengeri. Expert guidance in bodybuilding, fat loss, and strength training.'
        : 'ಕೆಂಗೇರಿಯ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್‌ನ ಪ್ರಮಾಣೀಕೃತ ಕೋಚ್‌ಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ. ಬಾಡಿಬಿಲ್ಡಿಂಗ್, ತೂಕ ಇಳಿಕೆ ಮತ್ತು ಸ್ಟ್ರೆಂತ್ ಟ್ರೈನಿಂಗ್‌ನಲ್ಲಿ ಪರಿಣಿತ ಮಾರ್ಗದರ್ಶನ.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845316/_A0A5580_dbtzio.jpg',
      '/trainers'
    );
  }, [language]);

  const [trainerInquiryState, setTrainerInquiryState] = useState({ name: '', phone: '', trainer: 'Dhanush Gowda' });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};
    if (!trainerInquiryState.name.trim()) newErrors.name = language === 'en' ? 'Name is required' : 'ಹೆಸರು ಅಗತ್ಯವಿದೆ';
    if (!trainerInquiryState.phone.trim() || !/^\d{10}$/.test(trainerInquiryState.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = language === 'en' ? 'Valid 10-digit phone number is required' : '೧೦ ಅಂಕಿಗಳ ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setSubmitError('');
    const result = await submitInquiry({
      name: trainerInquiryState.name.trim(),
      phone: trainerInquiryState.phone.replace(/[^0-9]/g, ''),
      plan: 'trainer-inquiry',
      message: `Trainer requested: ${trainerInquiryState.trainer}`,
    });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTrainerInquiryState({ name: '', phone: '', trainer: 'Dhanush Gowda' });
    } else {
      setSubmitError(language === 'en' ? 'Sorry, we could not send your details. Please call or WhatsApp us on +91 97400 18911.' : 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು +91 97400 18911 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <ScrollReveal y={20}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {t('trainersTag')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {t('trainersTitle')}{' '}
              <span className="text-[#FFC400]">
                {t('trainersTitleGold')}
              </span>
            </h1>
            <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t('trainersSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Profile cards list */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {trainers.map((coach) => {
            const coachImg = coach.image.includes('cloudinary.com') && !coach.image.includes('f_auto')
              ? coach.image.replace('/upload/', '/upload/f_auto,q_auto,w_600/')
              : coach.image;

            return (
              <div key={coach.id} className="bg-[#070707] border border-zinc-900 hover:border-[#FFC400]/20 rounded-2xl overflow-hidden group transition-all flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                    <img 
                      src={coachImg} 
                      alt={coach.name} 
                      width={400}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-90 pointer-events-none" />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-mono text-[#FFC400] uppercase font-bold tracking-[0.2em]">{coach.role}</span>
                    <h3 className="text-2xl font-display font-black uppercase text-white mt-2">{coach.name}</h3>
                    <div className="h-1 w-12 bg-gradient-gold my-5" />
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">{t('trainersSpecialtyTitle')}</span>
                        <div className="flex flex-wrap gap-2">
                          {coach.specialties.map((spec, i) => (
                            <span key={i} className="text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-900">
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-2">{t('trainersCertTitle')}</span>
                        <ul className="text-xs text-zinc-400 space-y-2">
                          {coach.certifications.map((cert, i) => (
                            <li key={i} className="flex gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC400] shrink-0 mt-0.5" />
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 pt-0">
                  <button 
                    onClick={() => {
                      setTrainerInquiryState({ ...trainerInquiryState, trainer: coach.name });
                      setSuccess(false);
                      document.getElementById('trainer-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-4 bg-zinc-900 hover:bg-[#FFC400] hover:text-black text-white text-xs font-mono font-bold tracking-widest transition-all uppercase rounded-xl cursor-pointer shadow-lg"
                  >
                    {language === 'en' ? 'Inquire with Coach' : 'ತರಬೇತುದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ'}
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </ScrollReveal>

        {/* Coach Inquiry Form anchor */}
        <ScrollReveal>
          <div id="trainer-form-anchor" className="max-w-3xl mx-auto bg-[#070707] border border-zinc-900 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white leading-tight">
              {language === 'en' ? 'INQUIRE WITH COACH' : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಸಮಾಲೋಚನೆ'}
            </h2>
            <p className="text-sm text-zinc-500 mt-3 max-w-lg mx-auto">
              {language === 'en' ? 'Request a private diagnostic call back session.' : 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ತರಬೇತುದಾರರೊಂದಿಗೆ ಉಚಿತ ಸಮಾಲೋಚನೆಗೆ ಅರ್ಜಿ ಹಾಕಿ.'}
            </p>
          </div>

          {success ? (
            <div className="bg-[#FFC400]/5 border border-[#FFC400]/20 rounded-2xl p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-[#FFC400]/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#FFC400] animate-bounce" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-[#FFC400]">{language === 'en' ? 'Inquiry Submitted!' : 'ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!'}</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                {language === 'en' 
                  ? `Excellent choice! Your training request for ${trainerInquiryState.trainer} has been registered.` 
                  : `ಅದ್ಭುತ ಆಯ್ಕೆ! ${trainerInquiryState.trainer} ಅವರ ಸಮಾಲೋಚನೆಗಾಗಿ ನಿಮ್ಮ ವಿನಂತಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ.`}
              </p>
              <button onClick={() => setSuccess(false)} className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors">Close</button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">{language === 'en' ? 'Your Name' : 'ನಿಮ್ಮ ಹೆಸರು'}</label>
                  <input 
                    type="text" 
                    value={trainerInquiryState.name}
                    onChange={(e) => setTrainerInquiryState({ ...trainerInquiryState, name: e.target.value })}
                    placeholder={language === 'en' ? 'e.g. Anand Gowda' : 'ರಾಹುಲ್ ಶರ್ಮಾ'}
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
                    value={trainerInquiryState.phone}
                    onChange={(e) => setTrainerInquiryState({ ...trainerInquiryState, phone: e.target.value })}
                    placeholder={language === 'en' ? '10-Digit Mobile Number' : '೧೦ ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'}
                    className={`w-full bg-black border rounded-xl px-5 py-4 text-sm text-white focus:outline-none placeholder-zinc-800 transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-zinc-850 focus:border-[#FFC400]'
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 mt-2 block font-bold">{errors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">{language === 'en' ? 'Select Trainer' : 'ತರಬೇತುದಾರರನ್ನು ಆರಿಸಿ'}</label>
                <select 
                  value={trainerInquiryState.trainer}
                  onChange={(e) => setTrainerInquiryState({ ...trainerInquiryState, trainer: e.target.value })}
                  className="w-full bg-black border border-zinc-850 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#FFC400] appearance-none transition-colors"
                >
                  {trainers.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
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
                <span>{loading ? (language === 'en' ? 'Submitting...' : 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...') : (language === 'en' ? 'Submit Inquiry' : 'ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ')}</span>
              </button>
            </form>
          )}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

export { TrainersPage };
