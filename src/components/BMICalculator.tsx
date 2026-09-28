import React, { useState } from 'react';
import { Calculator, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../LanguageContext';
import { submitBMILog } from '../lib/supabase';

export default function BMICalculator() {
  const { language, t } = useLanguage();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [advice, setAdvice] = useState('');
  const [recommendedPlan, setRecommendedPlan] = useState('');

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert(language === 'en' ? 'Please enter valid positive numbers for weight and height.' : 'ದಯವಿಟ್ಟು ತೂಕ ಮತ್ತು ಎತ್ತರಕ್ಕೆ ಸರಿಯಾದ ಧನಾತ್ಮಕ ಸಂಖ್ಯೆಗಳನ್ನು ನಮೂದಿಸಿ.');
      return;
    }

    const calculatedBmi = parseFloat((w / (h * h)).toFixed(1));
    setBmi(calculatedBmi);

    let bmiStatus = '';
    let bmiAdvice = '';
    let plan = '';

    if (calculatedBmi < 18.5) {
      bmiStatus = t('bmiUnderweight');
      bmiAdvice = t('bmiUnderweightDesc');
      plan = language === 'en' 
        ? '3-Month Gold Pack (with custom diet charts)' 
        : '೩-ತಿಂಗಳ ಗೋಲ್ಡ್ ಪ್ಯಾಕ್ (ಕಸ್ಟಮ್ ಡಯಟ್ ಚಾರ್ಟ್)';
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      bmiStatus = t('bmiNormal');
      bmiAdvice = t('bmiNormalDesc');
      plan = language === 'en' 
        ? '12-Month Platinum Elite (includes Free Personal Training)' 
        : '೧೨-ತಿಂಗಳ ಪ್ಲಾಟಿನಂ ಎಲೈಟ್ (ಉಚಿತ ವೈಯಕ್ತಿಕ ತರಬೇತಿ)';
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      bmiStatus = t('bmiOverweight');
      bmiAdvice = t('bmiOverweightDesc');
      plan = language === 'en' 
        ? '3-Month Gold Pack (includes dynamic fat-loss diet charts)' 
        : '೩-ತಿಂಗಳ ಗೋಲ್ಡ್ ಪ್ಯಾಕ್ (ಕೊಬ್ಬು ಇಳಿಸುವ ಡಯಟ್ ಚಾರ್ಟ್)';
    } else {
      bmiStatus = t('bmiObese');
      bmiAdvice = t('bmiObeseDesc');
      plan = language === 'en' 
        ? 'Executive Couple/Individual Personal Training consultation' 
        : 'ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಸಮಾಲೋಚನೆ (Personal Training)';
    }

    setStatus(bmiStatus);
    setAdvice(bmiAdvice);
    setRecommendedPlan(plan);

    submitBMILog({
      gender: 'unspecified',
      heightCm: parseFloat(height),
      weightKg: w,
      bmi: calculatedBmi,
      category: bmiStatus,
    });
  };

  const getWhatsAppMessage = () => {
    if (!bmi) return '';
    const text = language === 'en' 
      ? `Hi Dhanus Gold Fitness! I calculated my BMI on your Kengeri website:\n\n⚖️ *Weight:* ${weight} kg\n📏 *Height:* ${height} cm\n📊 *Calculated BMI:* ${bmi} (${status})\n🎯 *Goal Plan:* ${recommendedPlan}\n\nCan I schedule a free InBody scan and visit the gym?`
      : `ನಮಸ್ಕಾರ ಧನುಸ್ ಗೋಲ್ಡ್ ಫಿಟ್ನೆಸ್! ನಾನು ನಿಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಬಿಎಂಐ (BMI) ಲೆಕ್ಕ ಹಾಕಿದ್ದೇನೆ:\n\n⚖️ *ತೂಕ:* ${weight} ಕೆಜಿ\n📏 *ಎತ್ತರ:* ${height} ಸೆಂ.ಮೀ\n📊 *ಬಿಎಂಐ:* ${bmi} (${status})\n🎯 *ಶಿಫಾರಸು ಮಾಡಿದ ಯೋಜನೆ:* ${recommendedPlan}\n\nನನಗಾಗಿ ಉಚಿತ ಇನ್‌ಬಾಡಿ ಪರೀಕ್ಷೆ ಮತ್ತು ಜಿಮ್ ಭೇಟಿ ನಿಗದಿಪಡಿಸಬಹುದೇ?`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="bmi" className="py-16 lg:py-20 bg-zinc-950/40 backdrop-blur-sm relative overflow-hidden content-auto">
      {/* Absolute glow decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-gold-premium/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-gold-premium uppercase font-semibold">
            {language === 'en' ? '📊 SMART FITNESS ANALYSIS' : '📊 ದೈಹಿಕ ಸಾಮರ್ಥ್ಯದ ವಿಶ್ಲೇಷಣೆ'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-3 mb-4">
            {t('bmiTitle')} <span className="text-gradient-gold">{t('bmiTitleGold')}</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-base text-gray-400 font-sans leading-relaxed">
            {t('bmiSubtitle')}
          </p>
        </ScrollReveal>

        {/* Dynamic Interactive Box */}
        <ScrollReveal duration={1.0}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto bg-zinc-900/40 border border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            
            {/* Left: Input Form (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2.5">
                  <Calculator className="w-6 h-6 text-gold-premium" />
                  <span>{t('bmiTitleGold')}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {language === 'en' 
                    ? 'Input your weight and height below to calculate. All measurements are confidential.' 
                    : 'ನಿಮ್ಮ ತೂಕ ಮತ್ತು ಎತ್ತರವನ್ನು ನಮೂದಿಸಿ. ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಗೌಪ್ಯವಾಗಿಡಲಾಗುತ್ತದೆ.'}
                </p>
              </div>

              <form onSubmit={calculateBMI} className="space-y-5">
                {/* Weight input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                    {t('bmiWeightLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 74"
                      className="w-full bg-zinc-950 border border-white/10 focus:border-gold-premium rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-sans"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 font-bold">KG</span>
                  </div>
                </div>

                {/* Height input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                    {t('bmiHeightLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      className="w-full bg-zinc-950 border border-white/10 focus:border-gold-premium rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors font-sans"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500 font-bold">CM</span>
                  </div>
                </div>

                <button
                  id="calculate-bmi-btn"
                  type="submit"
                  className="w-full bg-gradient-gold text-black font-sans font-extrabold text-sm py-3.5 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-[1.01] active:scale-95 transition-all duration-200 cursor-pointer text-center"
                >
                  {t('bmiBtnCalculate')}
                </button>
              </form>
            </div>

            {/* Right: Results Dashboard (7 columns) */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center">
              {bmi === null ? (
                <div className="text-center py-12 px-6 border-2 border-dashed border-white/5 rounded-2xl bg-zinc-950/40">
                  <Sparkles className="w-10 h-10 text-gold-premium/40 mx-auto mb-4 animate-pulse" />
                  <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                    {language === 'en' ? 'Awaiting Input' : 'ಮಾಹಿತಿಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ'}
                  </h4>
                  <p className="text-xs text-gray-500 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                    {language === 'en'
                      ? 'Fill in your weight and height on the left panel to discover your BMI classification and customized workout pathways!'
                      : 'ಬಿಎಂಐ ಶ್ರೇಣಿ ಮತ್ತು ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ವರ್ಕೌಟ್ ಮಾರ್ಗಗಳನ್ನು ತಿಳಿಯಲು ಎಡಭಾಗದಲ್ಲಿ ನಿಮ್ಮ ತೂಕ ಮತ್ತು ಎತ್ತರವನ್ನು ನಮೂದಿಸಿ!'}
                  </p>
                </div>
              ) : (
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-white/5 pb-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
                        {t('bmiResultTitle')}
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                        BMI: <span className="text-gradient-gold">{bmi}</span>
                      </h4>
                    </div>
                    
                    <span className="inline-block bg-gradient-gold text-black text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                      {status}
                    </span>
                  </div>

                  {/* Customized Advice */}
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-mono font-bold text-gold-premium tracking-wider uppercase">
                      🎯 {t('bmiInterpretation')}
                    </h5>
                    <p className="text-sm font-sans text-gray-300 leading-relaxed">
                      {advice}
                    </p>
                  </div>

                  {/* Recommended Plan */}
                  <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono tracking-wider text-gray-500 uppercase block">
                        {language === 'en' ? 'RECOMMENDED MEMBERSHIP' : 'ಶಿಫಾರಸು ಮಾಡಿದ ಸದಸ್ಯತ್ವ'}
                      </span>
                      <span className="text-sm font-display font-bold text-white mt-0.5 block">{recommendedPlan}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold-premium shrink-0" />
                  </div>

                  {/* Call to Action WhatsApp Button */}
                  <div className="pt-2">
                    <a
                      id="bmi-whatsapp-cta"
                      href={getWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-bold text-sm py-3.5 rounded-xl transition-all shadow-md"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      <span>{language === 'en' ? 'Inquire on WhatsApp with BMI' : 'ಬಿಎಂಐ ವಿವರಗಳೊಂದಿಗೆ ವಾಟ್ಸಾಪ್ ವಿಚಾರಣೆ'}</span>
                    </a>
                    <p className="text-[10px] text-gray-500 text-center mt-2.5 font-sans leading-normal">
                      {language === 'en' 
                        ? '💡 This recommendation is indicative. Join us for a comprehensive 8-point InBody bio-electrical test free with any membership!'
                        : '💡 ಈ ಶಿಫಾರಸು ಕೇವಲ ಸೂಚಕವಾಗಿದೆ. ಯಾವುದೇ ಸದಸ್ಯತ್ವದೊಂದಿಗೆ ಉಚಿತವಾಗಿ ೮-ಪಾಯಿಂಟ್ ಇನ್‌ಬಾಡಿ ಪರೀಕ್ಷೆಯನ್ನು ಪಡೆಯಿರಿ!'}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

