import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function CrowdMeter() {
  const { language } = useLanguage();
  const [crowdLevel, setCrowdLevel] = useState<'Low' | 'Medium' | 'High'>('Low');
  
  useEffect(() => {
    // Determine crowd level based on typical gym hours
    const hour = new Date().getHours();
    if ((hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 21)) {
      setCrowdLevel('High');
    } else if ((hour >= 9 && hour <= 12) || (hour >= 16 && hour <= 17)) {
      setCrowdLevel('Medium');
    } else {
      setCrowdLevel('Low');
    }
  }, []);

  const getColor = () => {
    switch (crowdLevel) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-[#FFC400]';
      case 'High': return 'bg-rose-500';
    }
  };

  const getPercentage = () => {
    switch (crowdLevel) {
      case 'Low': return 'w-[30%]';
      case 'Medium': return 'w-[65%]';
      case 'High': return 'w-[90%]';
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 w-full sm:max-w-xs mb-8 backdrop-blur-md">
      <div className="flex justify-between items-center">
         <div className="flex items-center gap-2">
           <Users className="w-4 h-4 text-[#FFC400]" />
           <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
             {language === 'en' ? 'Live Crowd Meter' : 'ಲೈವ್ ಕ್ರೌಡ್ ಮೀಟರ್'}
           </span>
         </div>
         <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-black shadow-sm ${getColor()}`}>
           {language === 'en' ? crowdLevel : (crowdLevel === 'Low' ? 'ಕಡಿಮೆ' : crowdLevel === 'Medium' ? 'ಮಧ್ಯಮ' : 'ಹೆಚ್ಚು')}
         </span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex shadow-inner">
        <div className={`h-full ${getColor()} ${getPercentage()} transition-all duration-1000 ease-in-out`}></div>
      </div>
      <p className="text-[10px] font-sans text-zinc-500">
        {language === 'en' ? 'Current occupancy at Kengeri branch.' : 'ಕೆಂಗೇರಿ ಶಾಖೆಯಲ್ಲಿ ಪ್ರಸ್ತುತ ಚೆಕ್-ಇನ್‌ಗಳು.'}
      </p>
    </div>
  );
}
