import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';
import { triggerSideCannons } from '../utils/confetti';
import { submitInquiry } from '../lib/supabase';
import SocialLinksBar from './SocialIcons';
import GymGoogleMap from './GymGoogleMap';

export default function ContactAndLocation() {
  const { language, membershipPlans, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: 'quarterly',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on write
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = language === 'en' ? 'Full Name is required' : 'ಪೂರ್ಣ ಹೆಸರು ಅಗತ್ಯವಿದೆ';
    }
    if (!formData.phone.trim()) {
      errors.phone = language === 'en' ? 'Phone number is required' : 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim().replace(/\s+/g, ''))) {
      errors.phone = language === 'en' 
        ? 'Please enter a valid 10-digit Indian phone number' 
        : 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ';
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === 'en' 
        ? 'Please enter a valid email address' 
        : 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ';
    }
    return errors;
  };

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setSendError('');
    setIsSending(true);
    const result = await submitInquiry({
      name: formData.name.trim(),
      phone: formData.phone.replace(/\s+/g, ''),
      email: formData.email.trim(),
      plan: formData.plan,
      message: formData.message,
    });
    setIsSending(false);
    if (result.success) {
      setIsSubmitted(true);
      triggerSideCannons();
    } else {
      setSendError(
        language === 'en'
          ? 'Sorry, we could not send your inquiry. Please call or WhatsApp us on +91 97400 18911.'
          : 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು +91 97400 18911 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.'
      );
    }
  };

  const getSelectedPlanName = () => {
    const planObj = membershipPlans.find((p) => p.id === formData.plan);
    if (planObj) return planObj.name;
    if (formData.plan === 'general') return language === 'en' ? 'General Inquiry' : 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆ';
    return language === 'en' ? 'Membership Pack' : 'ಸದಸ್ಯತ್ವ ಯೋಜನೆ';
  };

  // Generate WhatsApp text from contact form
  const getWhatsAppFromForm = () => {
    const selectedPlanName = getSelectedPlanName();
    const text = language === 'en'
      ? `Hi Dhanus Gold Fitness! I just submitted a web inquiry:\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n📧 *Email:* ${formData.email || 'N/A'}\n💎 *Plan:* ${selectedPlanName}\n💬 *Message:* ${formData.message || 'No additional message.'}`
      : `ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್! ನಾನು ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ವಿಚಾರಣೆ ಕಳುಹಿಸಿದ್ದೇನೆ:\n\n👤 *ಹೆಸರು:* ${formData.name}\n📞 *ಮೊಬೈಲ್:* ${formData.phone}\n📧 *ಇಮೇಲ್:* ${formData.email || 'ಲಭ್ಯವಿಲ್ಲ'}\n💎 *ಯೋಜನೆ:* ${selectedPlanName}\n💬 *ಸಂದೇಶ:* ${formData.message || 'ಯಾವುದೇ ಸಂದೇಶವಿಲ್ಲ.'}`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getDaysTranslation = (days: string) => {
    if (language === 'en') return days;
    if (days.toLowerCase().includes('monday') && days.toLowerCase().includes('saturday')) {
      return 'ಸೋಮವಾರ - ಶನಿವಾರ';
    }
    if (days.toLowerCase().includes('sunday')) {
      return 'ಭಾನುವಾರ';
    }
    return days;
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-black/40 backdrop-blur-sm relative content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-gold-premium uppercase font-semibold">
            {t('contactTag')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-3 mb-4">
            {t('contactTitle')} <span className="text-gradient-gold">{t('contactTitleGold')}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </ScrollReveal>

        {/* Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info & Google Map (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal delay={0.1} y={30}>
              <div className="bg-zinc-950 border border-white/5 p-6 sm:p-8 rounded-2xl space-y-6">
                <h3 className="text-xl font-display font-bold text-white border-b border-white/5 pb-4">
                  {language === 'en' ? 'Gym Information' : 'ಜಿಮ್ ಮಾಹಿತಿ'}
                </h3>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-gold-premium flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-gray-400 uppercase">
                      {language === 'en' ? 'Physical Address' : 'ವಿಳಾಸ'}
                    </h4>
                    <p className="text-sm font-sans text-gray-200 mt-1 leading-relaxed">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Call */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-gold-premium flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-gray-400 uppercase">
                      {language === 'en' ? 'Phone & WhatsApp' : 'ಫೋನ್ ಮತ್ತು ವಾಟ್ಸಾಪ್'}
                    </h4>
                    <p className="text-sm font-mono text-gray-200 mt-1 hover:text-gold-premium transition-colors">
                      <a href={`tel:${CONTACT_INFO.phoneNumber.replace(/\s+/g, '')}`}>
                        {CONTACT_INFO.phoneNumber}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-gold-premium flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-wider text-gray-400 uppercase">
                      {language === 'en' ? 'Email Support' : 'ಇಮೇಲ್ ಸಹಾಯ'}
                    </h4>
                    <p className="text-sm font-mono text-gray-200 mt-1 hover:text-gold-premium transition-colors">
                      <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex gap-4 items-start border-t border-white/5 pt-6">
                  <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-gold-premium flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h4 className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-2">
                      {language === 'en' ? 'Gym Timings' : 'ಜಿಮ್ ಸಮಯ'}
                    </h4>
                    <div className="space-y-1.5 w-full">
                      {CONTACT_INFO.operatingHours.map((hours, i) => (
                        <div key={i} className="flex justify-between text-xs sm:text-sm font-sans">
                          <span className="text-gray-400 font-medium">
                            {getDaysTranslation(hours.days)}
                          </span>
                          <span className="text-white font-mono font-bold">{hours.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Social Media Links */}
                <div className="border-t border-white/5 pt-6">
                  <h4 className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-3">
                    {language === 'en' ? 'Official Social Handles' : 'ಅಧಿಕೃತ ಸಾಮಾಜಿಕ ತಾಣಗಳು'}
                  </h4>
                  <SocialLinksBar className="flex flex-wrap items-center gap-2.5" />
                </div>
              </div>
            </ScrollReveal>

            {/* Google Map Container with Google Maps Platform */}
            <ScrollReveal delay={0.2} y={30}>
              <GymGoogleMap />
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Inquiry Form (7 columns) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15} y={35} className="h-full">
              <div className="bg-zinc-950 border border-white/5 p-6 sm:p-10 rounded-2xl shadow-xl min-h-[500px] flex flex-col justify-center h-full">
                
                {!isSubmitted ? (
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-white mb-2">
                        {language === 'en' ? 'Inquire Online' : 'ವೆಬ್ ವಿಚಾರಣೆ'}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-sans">
                        {language === 'en' 
                          ? 'Fill out the details to unlock special student, corporate, or couple discount offerings!' 
                          : 'ವಿಶೇಷ ವಿದ್ಯಾರ್ಥಿ, ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಜೋಡಿ ರಿಯಾಯಿತಿಗಳನ್ನು ಪಡೆಯಲು ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ!'}
                      </p>
                    </div>

                    {/* Name field */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                        {language === 'en' ? 'Your Full Name' : 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು'} <span className="text-gold-premium">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Gowda"
                        className={`w-full bg-zinc-900 border ${
                          formErrors.name ? 'border-rose-500' : 'border-white/10 focus:border-gold-premium'
                        } rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-sans`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-rose-400 font-sans mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Grid for Phone and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                          {language === 'en' ? 'Phone Number' : 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'} <span className="text-gold-premium">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 9900123456"
                          className={`w-full bg-zinc-900 border ${
                            formErrors.phone ? 'border-rose-500' : 'border-white/10 focus:border-gold-premium'
                          } rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-mono`}
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-rose-400 font-sans mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                          {language === 'en' ? 'Email Address (Optional)' : 'ಇಮೇಲ್ ವಿಳಾಸ (ಐಚ್ಛಿಕ)'}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. rahul@gmail.com"
                          className={`w-full bg-zinc-900 border ${
                            formErrors.email ? 'border-rose-500' : 'border-white/10 focus:border-gold-premium'
                          } rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-sans`}
                        />
                        {formErrors.email && (
                          <p className="text-xs text-rose-400 font-sans mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Plan Preference Selector */}
                    <div className="space-y-1.5">
                      <label htmlFor="plan" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                        {language === 'en' ? 'Membership Plan of Interest' : 'ನಿಮಗೆ ಆಸಕ್ತಿಯಿರುವ ಯೋಜನೆ'}
                      </label>
                      <select
                        id="plan"
                        name="plan"
                        value={formData.plan}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-white/10 focus:border-gold-premium rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-sans"
                      >
                        <option value="general">
                          {language === 'en' ? 'General Fitness' : 'ಸಾಮಾನ್ಯ ಫಿಟ್‌ನೆಸ್'}
                        </option>
                        <option value="silver">
                          {language === 'en' ? 'Silver Personal Training' : 'ಸಿಲ್ವರ್ ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್'}
                        </option>
                        <option value="gold">
                          {language === 'en' ? 'Gold Personal Training' : 'ಗೋಲ್ಡ್ ಪರ್ಸನಲ್ ಟ್ರೈನಿಂಗ್'}
                        </option>
                        <option value="other">
                          {language === 'en' ? 'General Inquiry / Other' : 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆ / ಇತರೆ'}
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                        {language === 'en' ? 'Your Goals or Questions' : 'ನಿಮ್ಮ ಗುರಿಗಳು ಅಥವಾ ಪ್ರಶ್ನೆಗಳು'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder={
                          language === 'en'
                            ? 'Tell us about your fitness goals (weight loss, muscle gain) or any queries you have.'
                            : 'ನಿಮ್ಮ ಫಿಟ್ನೆಸ್ ಗುರಿಗಳು (ತೂಕ ಇಳಿಕೆ, ಸ್ನಾಯುಗಳ ಬೆಳವಣಿಗೆ) ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ.'
                        }
                        className="w-full bg-zinc-900 border border-white/10 focus:border-gold-premium rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-sans resize-none"
                      />
                    </div>

                    {sendError && (
                      <p role="alert" className="text-sm text-red-400 text-center">{sendError}</p>
                    )}

                    {/* Form Submission Button */}
                    <button
                      id="submit-contact"
                      type="submit"
                      disabled={isSending}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-gold text-black font-sans font-extrabold text-base py-4 rounded-xl shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-[1.01] active:scale-95 transition-all duration-200 cursor-pointer animate-gold-pulse"
                    >
                      <Send className="w-5 h-5 text-black" />
                      <span>{isSending ? (language === 'en' ? 'Sending...' : 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...') : (language === 'en' ? 'Submit Inquiry' : 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿ')}</span>
                    </button>
                  </form>
                ) : (
                  /* Success Presentation block */
                  <div id="contact-success-screen" className="text-center py-12 space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-3xl font-display font-extrabold text-white">
                        {language === 'en' ? 'Inquiry Received!' : 'ವಿಚಾರಣೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ!'}
                      </h3>
                      <p className="text-sm font-sans text-gray-400 max-w-md mx-auto leading-relaxed">
                        {language === 'en' ? (
                          <span>Thanks for connecting with <span className="text-gold-premium font-semibold">Dhanus Gold Fitness</span>, <strong>{formData.name}</strong>! Your inquiry for the {getSelectedPlanName()} is registered.</span>
                        ) : (
                          <span><span className="text-gold-premium font-semibold">ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್</span> ಜೊತೆ ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು, <strong>{formData.name}</strong>! {getSelectedPlanName()} ಯೋಜನೆಗಾಗಿ ನಿಮ್ಮ ವಿಚಾರಣೆ ದಾಖಲಾಗಿದೆ.</span>
                        )}
                      </p>
                    </div>

                    <div className="w-full max-w-sm h-px bg-white/10 mx-auto" />

                    <div className="space-y-4 max-w-sm mx-auto">
                      <p className="text-xs text-gray-400 leading-normal font-sans">
                        {language === 'en' 
                          ? 'Want to connect even faster and book your slot immediately? Click below to dispatch your submission details directly to our WhatsApp support line!'
                          : 'ಇನ್ನೂ ವೇಗವಾಗಿ ಸಂಪರ್ಕ ಹೊಂದಲು ಮತ್ತು ನಿಮ್ಮ ಸ್ಲಾಟ್ ಅನ್ನು ತಕ್ಷಣ ಬುಕ್ ಮಾಡಲು ಬಯಸುವಿರಾ? ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನೇರವಾಗಿ ನಮ್ಮ ವಾಟ್ಸಾಪ್ ಬೆಂಬಲ ಲೈನ್‌ಗೆ ಕಳುಹಿಸಲು ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ!'}
                      </p>
                      
                      <a
                        id="success-whatsapp-dispatch"
                        href={getWhatsAppFromForm()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-bold text-sm py-3.5 rounded-xl transition-colors shadow-md"
                      >
                        <MessageSquare className="w-5 h-5 fill-current" />
                        <span>{language === 'en' ? 'Dispatch to WhatsApp' : 'ವಾಟ್ಸಾಪ್‌ಗೆ ಕಳುಹಿಸಿ'}</span>
                      </a>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            plan: 'quarterly',
                            message: '',
                          });
                        }}
                        className="text-xs font-mono font-bold tracking-wider text-gray-400 hover:text-gold-premium uppercase transition-colors"
                      >
                        {language === 'en' ? '← Submit Another Query' : '← ಇನ್ನೊಂದು ವಿಚಾರಣೆ ಕಳುಹಿಸಿ'}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}


