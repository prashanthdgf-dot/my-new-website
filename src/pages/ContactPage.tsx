import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Clock, CheckCircle2, RefreshCw, Send, Navigation, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { submitInquiry } from '../lib/supabase';
import { CONTACT_INFO } from '../data';
import { updateMetaTags } from '../lib/seo';
import ScrollReveal from '../components/ScrollReveal';
import SocialLinksBar from '../components/SocialIcons';

export default function ContactPage() {
  const { language } = useLanguage();

  useEffect(() => {
    updateMetaTags(
      language === 'en' ? 'Contact Dhanus Gold Fitness | Kengeri Bengaluru' : 'ಸಂಪರ್ಕಿಸಿ | ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್‌ನೆಸ್ ಕೆಂಗೇರಿ ಬೆಂಗಳೂರು',
      language === 'en' 
        ? 'Contact Dhanus Gold Fitness at Hoysala Circle, Kengeri Satellite Town, Bengaluru. Call +91 9740018911 or visit for membership inquiries.'
        : 'ಹೊಯ್ಸಳ ಸರ್ಕಲ್, ಕೆಂಗೇರಿ ಉಪನಗರ, ಬೆಂಗಳೂರಿನ ಧನುಸ್ ಗೋಲ್ಡ್ ಜಿಮ್ ಸಂಪರ್ಕಿಸಿ. ಕರೆ ಮಾಡಿ +91 9740018911 ಅಥವಾ ಸದಸ್ಯತ್ವ ವಿಚಾರಣೆಗೆ ಭೇಟಿ ನೀಡಿ.',
      'https://res.cloudinary.com/dnnfzhrbd/image/upload/f_auto,q_auto,w_800/v1782845589/_A0A5520_ewwv0e.jpg',
      '/contact'
    );
  }, [language]);

  const [formState, setFormState] = useState({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = language === 'en' ? 'Name is required' : 'ಹೆಸರು ಅಗತ್ಯವಿದೆ';
    if (!formState.phone.trim() || !/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ''))) newErrors.phone = language === 'en' ? 'Valid 10-digit phone is required' : '೧೦ ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ';
    if (!formState.message.trim()) newErrors.message = language === 'en' ? 'Message is required' : 'ಸಂದೇಶ ಅಗತ್ಯವಿದೆ';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setSubmitError('');
    const result = await submitInquiry({
      name: formState.name.trim(),
      phone: formState.phone.replace(/[^0-9]/g, ''),
      email: formState.email.trim() || undefined,
      plan: formState.subject,
      message: formState.message.trim(),
    });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setFormState({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
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
              <Mail className="w-3.5 h-3.5 text-[#FFC400]" />
              <span className="text-[10px] font-mono font-bold text-[#FFC400] tracking-widest uppercase">
                {language === 'en' ? 'GET IN TOUCH' : 'ಸಂಪರ್ಕಿಸಿ'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              {language === 'en' ? 'CONTACT' : 'ನಮ್ಮನ್ನು'}{' '}
              <span className="text-[#FFC400]">
                {language === 'en' ? 'DHANUS GOLD' : 'ಸಂಪರ್ಕಿಸಿ'}
              </span>
            </h1>
            <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {language === 'en' 
                ? 'Have questions about memberships, training, or corporate plans? Reach out to our team.' 
                : 'ಸದಸ್ಯತ್ವಗಳು, ತರಬೇತಿ ಅಥವಾ ಕಾರ್ಪೊರೇಟ್ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಮ್ಮ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Info Block */}
          <div className="space-y-8">
            <div className="bg-[#070707] border border-zinc-900 rounded-2xl p-8 space-y-8 shadow-2xl">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 border border-[#FFC400]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#FFC400]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">{language === 'en' ? 'Location' : 'ಸ್ಥಳ'}</h4>
                  <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                    Near Hoysala Circle, Kengeri Satellite Town,<br />
                    Bengaluru, Karnataka 560060
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 border border-[#FFC400]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#FFC400]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">{language === 'en' ? 'Mobile' : 'ಮೊಬೈಲ್'}</h4>
                  <p className="text-sm text-zinc-300 font-medium">{CONTACT_INFO.phoneNumber}</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 border border-[#FFC400]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#FFC400]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">{language === 'en' ? 'Email' : 'ಇಮೇಲ್'}</h4>
                  <p className="text-sm text-zinc-300 font-medium">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/10 border border-[#FFC400]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#FFC400]" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">{language === 'en' ? 'Gym Hours' : 'ಜಿಮ್ ಸಮಯ'}</h4>
                  <p className="text-sm text-zinc-300 font-medium">{CONTACT_INFO.operatingHours[0].hours}</p>
                </div>
              </div>

              {/* Direct Social Media Links */}
              <div className="pt-6 border-t border-zinc-900">
                <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  {language === 'en' ? 'Official Social Handles' : 'ಅಧಿಕೃತ ಸಾಮಾಜಿಕ ತಾಣಗಳು'}
                </h4>
                <SocialLinksBar className="flex flex-wrap items-center gap-2.5" />
              </div>
            </div>

            {/* Map & Locator Plus Hub */}
            <div className="bg-[#0B0B0B] border border-zinc-850 rounded-2xl p-5 relative shadow-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFC400] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Hoysala Circle Kengeri</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">12.9247° N, 77.4855° E</span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                {language === 'en' 
                  ? 'Access live turn-by-turn directions, real-time distance matrix, and place details.' 
                  : 'ನಿಖರವಾದ ದಾರಿ, ನೈಜ ಸಮಯದ ಅಂತರ ಮತ್ತು ಸಂಪೂರ್ಣ ಸ್ಥಳ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a 
                  href="/locator.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] px-4 py-2.5 bg-gradient-gold text-black font-sans font-black text-xs uppercase rounded-xl tracking-wider shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Locator Plus' : 'ಲೊಕೇಟರ್ ಪ್ಲಸ್'}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                <a 
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-sans font-bold text-xs uppercase rounded-xl tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>{language === 'en' ? 'Directions' : 'ದಾರಿ'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#070707] border border-[#FFC400]/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {success ? (
              <div className="text-center py-12 space-y-6">
                <CheckCircle2 className="w-16 h-16 text-[#FFC400] mx-auto animate-bounce" />
                <h3 className="font-display font-black text-2xl uppercase text-white">{language === 'en' ? 'Message Sent!' : 'ಸಂದೇಶ ರವಾನೆಯಾಗಿದೆ!'}</h3>
                <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  {language === 'en' ? 'Thank you for reaching out. Our support coordinator will get back to you within 24 hours.' : 'ಧನ್ಯವಾದಗಳು. ನಮ್ಮ ತಂಡವು ಮುಂದಿನ ೨೪ ಗಂಟೆಗಳ ಒಳಗಾಗಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದೆ.'}
                </p>
                <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors">{language === 'en' ? 'Send Another' : 'ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ'}</button>
              </div>
            ) : (
              <form onSubmit={handleContact} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">{language === 'en' ? 'Full Name' : 'ಪೂರ್ಣ ಹೆಸರು'}</label>
                    <input 
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={language === 'en' ? 'John Doe' : 'ರಾಹುಲ್ ಗೌಡ'}
                      className={`w-full bg-black border rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-zinc-850 focus:border-[#FFC400]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">{language === 'en' ? 'Phone Number' : 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'}</label>
                    <input 
                      type="tel" 
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="10-Digit Mobile"
                      className={`w-full bg-black border rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-zinc-850 focus:border-[#FFC400]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">{language === 'en' ? 'Subject' : 'ವಿಷಯ'}</label>
                    <select 
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-black border border-zinc-850 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#FFC400] appearance-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Plans">Membership Plans</option>
                      <option value="Corporate Training">Corporate Training</option>
                      <option value="Personal Coaching">Personal Coaching</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">{language === 'en' ? 'Message' : 'ಸಂದೇಶ'}</label>
                    <textarea 
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder={language === 'en' ? 'Type your message here...' : 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...'}
                      className={`w-full bg-black border rounded-xl p-5 text-sm text-white focus:outline-none h-32 resize-none transition-colors ${
                        errors.message ? 'border-red-500' : 'border-zinc-850 focus:border-[#FFC400]'
                      }`}
                    />
                  </div>
                </div>

                {submitError && (
                  <p role="alert" className="text-xs text-red-400 text-center">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-gold text-black font-sans font-black text-sm uppercase rounded-xl tracking-wider hover:shadow-2xl hover:shadow-[#FFC400]/20 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  <span>{loading ? (language === 'en' ? 'Sending...' : 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...') : (language === 'en' ? 'Send Message' : 'ಸಂದೇಶ ಕಳುಹಿಸಿ')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>

      </div>
    </div>
  );
}

export { ContactPage };
