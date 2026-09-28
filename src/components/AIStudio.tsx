import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { 
  Sparkles, 
  MessageSquare, 
  Music, 
  Video, 
  Image as ImageIcon, 
  MapPin, 
  Brain, 
  Volume2, 
  Play, 
  Pause, 
  Download, 
  Upload, 
  Flame, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Search,
  Eye
} from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export default function AIStudio() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'chat' | 'video' | 'music' | 'image' | 'maps'>('chat');
  
  // File upload drag states
  const [isDragging, setIsDragging] = useState(false);

  // ==========================================
  // TAB 1: AI COACH STATE
  // ==========================================
  const [chatRole, setChatRole] = useState<'general' | 'nutritionist' | 'corrective'>('general');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [useThinking, setUseThinking] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // TAB 2: VIDEO GEN STATE (VEO)
  // ==========================================
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [videoImage, setVideoImage] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoOpName, setVideoOpName] = useState<string | null>(null);

  // ==========================================
  // TAB 3: MUSIC GEN STATE (LYRIA)
  // ==========================================
  const [musicPrompt, setMusicPrompt] = useState('');
  const [musicFull, setMusicFull] = useState(false);
  const [musicImage, setMusicImage] = useState<string | null>(null);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicAudioUrl, setMusicAudioUrl] = useState<string | null>(null);
  const [musicLyrics, setMusicLyrics] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ==========================================
  // TAB 4: IMAGE GEN STATE (IMAGEN)
  // ==========================================
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageAspect, setImageAspect] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [imageQuality, setImageQuality] = useState<'standard' | 'studio'>('studio');
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // ==========================================
  // TAB 5: MAPS GROUNDING STATE
  // ==========================================
  const [mapsPrompt, setMapsPrompt] = useState('');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResponse, setMapsResponse] = useState('');
  const [mapsGrounding, setMapsGrounding] = useState<any>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, chatLoading]);

  // Clean up audio playback on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove mime prefix
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File, target: 'video' | 'music') => {
    try {
      const base64 = await convertFileToBase64(file);
      const mime = file.type;
      const dataUrl = `data:${mime};base64,${base64}`;
      if (target === 'video') {
        setVideoImage(dataUrl);
      } else {
        setMusicImage(dataUrl);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleDrop = (e: React.DragEvent, target: 'video' | 'music') => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0], target);
    }
  };

  // ==========================================
  // SUB-FUNCTION: SEND CHAT
  // ==========================================
  const sendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput;
    setChatInput('');
    
    const newHistory: Message[] = [
      ...chatHistory,
      { role: 'user', parts: [{ text: userMsg }] }
    ];
    setChatHistory(newHistory);
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory,
          role: chatRole,
          useThinking
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setChatHistory([
        ...newHistory,
        { role: 'model', parts: [{ text: data.text }] }
      ]);
    } catch (err: any) {
      console.error(err);
      setChatHistory([
        ...newHistory,
        { role: 'model', parts: [{ text: `⚠️ Error: ${err.message || "Failed to communicate with coach"}` }] }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // ==========================================
  // SUB-FUNCTION: GENERATE VIDEO (VEO)
  // ==========================================
  const triggerVideoGeneration = async () => {
    if (videoLoading) return;
    setVideoLoading(true);
    setVideoUrl(null);
    setVideoStatus(language === 'en' ? 'Starting video generation with Veo...' : 'ವೀಡಿಯೊ ನಿರ್ಮಾಣ ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ...');

    try {
      let imageBytes = '';
      let mimeType = '';
      if (videoImage) {
        const parts = videoImage.split(';base64,');
        mimeType = parts[0].split(':')[1];
        imageBytes = parts[1];
      }

      const response = await fetch('/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt || 'A cinematic loop of fitness athletes executing a clean deadlift inside Dhanus Gold gym with neon lights.',
          imageBytes,
          mimeType,
          aspectRatio: videoAspect,
          resolution: '720p'
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const opName = data.operationName;
      setVideoOpName(opName);

      // Start Polling
      pollVideoStatus(opName);
    } catch (err: any) {
      console.error(err);
      setVideoStatus(`⚠️ ${err.message || 'Failed to start video generation'}`);
      setVideoLoading(false);
    }
  };

  const pollVideoStatus = async (opName: string) => {
    const interval = setInterval(async () => {
      try {
        setVideoStatus(language === 'en' ? 'Veo is generating your high-quality video... (This might take a minute)' : 'ವೀಡಿಯೊ ತಯಾರಾಗುತ್ತಿದೆ... ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ');
        const response = await fetch('/api/ai/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        if (data.done) {
          clearInterval(interval);
          downloadVideo(opName);
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
        setVideoStatus('⚠️ Error polling video status');
        setVideoLoading(false);
      }
    }, 5000);
  };

  const downloadVideo = async (opName: string) => {
    setVideoStatus(language === 'en' ? 'Finalizing video compilation...' : 'ವೀಡಿಯೊ ಪೂರ್ಣಗೊಳ್ಳುತ್ತಿದೆ...');
    try {
      const response = await fetch('/api/ai/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName })
      });

      if (!response.ok) throw new Error('Video download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setVideoStatus(language === 'en' ? '✅ Ready!' : '✅ ವೀಡಿಯೊ ಸಿದ್ಧವಾಗಿದೆ!');
    } catch (err: any) {
      console.error(err);
      setVideoStatus(`⚠️ Error downloading video: ${err.message}`);
    } finally {
      setVideoLoading(false);
    }
  };

  // ==========================================
  // SUB-FUNCTION: GENERATE MUSIC (LYRIA)
  // ==========================================
  const triggerMusicGeneration = async () => {
    if (musicLoading) return;
    setMusicLoading(true);
    setMusicAudioUrl(null);
    setMusicLyrics('');
    setIsPlayingMusic(false);

    try {
      let imageBytes = '';
      let mimeType = '';
      if (musicImage) {
        const parts = musicImage.split(';base64,');
        mimeType = parts[0].split(':')[1];
        imageBytes = parts[1];
      }

      const response = await fetch('/api/ai/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: musicPrompt || 'Generate high-tempo EDM background track for high-intensity cardio workout',
          isFullLength: musicFull,
          imageBytes,
          mimeType
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Convert base64 to blob url
      const binary = atob(data.audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const url = URL.createObjectURL(blob);

      setMusicAudioUrl(url);
      if (data.lyrics) setMusicLyrics(data.lyrics);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to generate music');
    } finally {
      setMusicLoading(false);
    }
  };

  const toggleMusicPlayback = () => {
    if (!musicAudioUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(musicAudioUrl);
      audioRef.current.onended = () => setIsPlayingMusic(false);
    }

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().catch(err => console.error(err));
      setIsPlayingMusic(true);
    }
  };

  // ==========================================
  // SUB-FUNCTION: GENERATE IMAGE (IMAGEN)
  // ==========================================
  const triggerImageGeneration = async () => {
    if (imageLoading) return;
    setImageLoading(true);
    setGeneratedImageUrl(null);

    try {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt || 'A modern photorealistic gold-themed gym poster with heavy weights and dynamic lighting',
          aspectRatio: imageAspect,
          imageSize,
          modelType: imageQuality
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setGeneratedImageUrl(data.imageUrl);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to generate image');
    } finally {
      setImageLoading(false);
    }
  };

  // ==========================================
  // SUB-FUNCTION: MAPS GROUNDING
  // ==========================================
  const triggerMapsSearch = async (preSetPrompt?: string) => {
    if (mapsLoading) return;
    const query = preSetPrompt || mapsPrompt;
    if (!query.trim()) return;
    
    setMapsPrompt(query);
    setMapsLoading(true);
    setMapsResponse('');
    setMapsGrounding(null);

    try {
      const response = await fetch('/api/ai/maps-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMapsResponse(data.text);
      if (data.groundingMetadata) {
        setMapsGrounding(data.groundingMetadata);
      }
    } catch (err: any) {
      console.error(err);
      setMapsResponse(`⚠️ Error: ${err.message || 'Failed to search places'}`);
    } finally {
      setMapsLoading(false);
    }
  };

  return (
    <section id="ai-studio" className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-t border-zinc-950 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FFC400]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFC400]/10 text-[#FFC400] font-mono text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>{language === 'en' ? 'DHANUS GOLD MULTIMEDIA AI LAB' : 'ಧನುಸ್ ಗೋಲ್ಡ್ ಮಲ್ಟಿಮೀಡಿಯಾ ಎಐ ಲ್ಯಾಬ್'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase">
            {language === 'en' ? 'DHANUS GOLD ' : 'ಧನುಸ್ '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC400] via-[#FFE082] to-[#FFB300]">
              {language === 'en' ? 'AI STUDIO' : 'ಎಐ ಸ್ಟುಡಿಯೋ'}
            </span>
          </h2>
          
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'Unleash elite fitness creation. Plan highly tailored routines using High-Thinking AI, synthesize custom workout beats, animate progress videos, or search local wellness hubs.'
              : 'ಗರಿಷ್ಠ ದೈಹಿಕ ಸಾಮರ್ಥ್ಯಕ್ಕೆ ಸುಧಾರಿತ ಎಐ ಬೆಂಬಲ. ನಿಖರ ತರಬೇತಿ ಚಾರ್ಟ್‌ಗಳು, ವರ್ಕೌಟ್ ಮ್ಯೂಸಿಕ್, ಪ್ರಗತಿ ವೀಡಿಯೊಗಳು ಮತ್ತು ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಹುಡುಕಾಟ.'}
          </p>
        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800/50 max-w-4xl mx-auto">
          {[
            { id: 'chat', label: language === 'en' ? 'AI Coach Chat' : 'ಎಐ ಕೋಚ್', icon: MessageSquare },
            { id: 'video', label: language === 'en' ? 'Veo Animate' : 'ವೀಡಿಯೊ ಕ್ರಿಯೇಟರ್', icon: Video },
            { id: 'music', label: language === 'en' ? 'Lyria Beats' : 'ಮ್ಯೂಸಿಕ್ ಮೇಕರ್', icon: Music },
            { id: 'image', label: language === 'en' ? 'Elite Poster' : 'ಪೋಸ್ಟರ್ ಡಿಸೈನರ್', icon: ImageIcon },
            { id: 'maps', label: language === 'en' ? 'Gym Maps' : 'ಮ್ಯಾಪ್ಸ್ ಹುಡುಕಾಟ', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  active 
                    ? 'bg-gradient-to-r from-[#FFC400] to-[#FFB300] text-black shadow-md shadow-[#FFC400]/10' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTAINER CONTENT */}
        <div className="bg-zinc-950/80 rounded-3xl border border-zinc-800/80 p-6 sm:p-8 min-h-[500px] shadow-2xl backdrop-blur-xl relative">
          
          {/* TAB 1: AI COACH CHAT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[520px]">
              
              {/* Coach Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'general', name: language === 'en' ? 'Dhanus Elite Coach' : 'ಧನುಸ್ ಹೆಲ್ಪರ್' },
                    { id: 'nutritionist', name: language === 'en' ? 'Sports Nutritionist' : 'ಪೌಷ್ಟಿಕಾಂಶ ತಜ್ಞ' },
                    { id: 'corrective', name: language === 'en' ? 'Rehab Specialist' : 'ದೈಹಿಕ ಚಿಕಿತ್ಸಕ' }
                  ].map(role => (
                    <button
                      key={role.id}
                      onClick={() => setChatRole(role.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        chatRole === role.id 
                          ? 'bg-[#FFC400]/10 text-[#FFC400] border border-[#FFC400]/30' 
                          : 'bg-zinc-900 text-zinc-400 border border-transparent hover:text-white'
                      }`}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>

                {/* High Thinking Toggle */}
                <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                  <Brain className={`w-4 h-4 ${useThinking ? 'text-[#FFC400] animate-pulse' : 'text-zinc-500'}`} />
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    {language === 'en' ? 'Deep Coaching Mode' : 'ಆಳವಾದ ವಿಶ್ಲೇಷಣೆ'}
                  </span>
                  <button
                    onClick={() => setUseThinking(!useThinking)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      useThinking ? 'bg-[#FFD000]' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-black transition-transform ${
                        useThinking ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-[#FFD000]">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      {language === 'en' ? 'Start Your AI Fitness Session' : 'ನಿಮ್ಮ ಎಐ ಸೆಷನ್ ಪ್ರಾರಂಭಿಸಿ'}
                    </h4>
                    <p className="text-xs text-zinc-500 max-w-md mt-2">
                      {language === 'en' 
                        ? 'Ask about customized muscle gain splits, bio-electrical metabolic rates, posture balance, or premium workout schedules.'
                        : 'ದೇಹದ ದ್ರವ್ಯರಾಶಿ, ಸ್ನಾಯು ನಿರ್ಮಾಣ ಚಾರ್ಟ್‌ಗಳು ಮತ್ತು ವೈಯಕ್ತಿಕ ಪಥ್ಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.'}
                    </p>

                    {/* Pre-set recommendations */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xl">
                      {[
                        language === 'en' 
                          ? 'Design a 4-day muscle hypertrophy program' 
                          : '೪-ದಿನಗಳ ತಾಲೀಮು ಚಾರ್ಟ್ ವಿನ್ಯಾಸಗೊಳಿಸಿ',
                        language === 'en' 
                          ? 'Calculate macro ratio for healthy weight loss' 
                          : 'ತೂಕ ನಷ್ಟಕ್ಕೆ ಆಹಾರ ಮಾರ್ಗದರ್ಶನ',
                        language === 'en' 
                          ? 'Suggest corrective rehabilitation exercises for lower back pain' 
                          : 'ಬೆನ್ನು ನೋವಿಗೆ ನಿವಾರಕ ವ್ಯಾಯಾಮಗಳು'
                      ].map((rec, i) => (
                        <button
                          key={i}
                          onClick={() => setChatInput(rec)}
                          className="px-3 py-1.5 bg-zinc-900/40 hover:bg-zinc-900 text-[10px] text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors text-left cursor-pointer"
                        >
                          {rec}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[#FFC400] text-black font-semibold' 
                          : 'bg-zinc-900 text-zinc-100 border border-zinc-800'
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.parts[0].text}</div>
                      </div>
                    </div>
                  ))
                )}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FFC400]" />
                      <span>
                        {useThinking 
                          ? (language === 'en' ? 'Thinking deeply with Gemini 3.1 Pro...' : 'ಗೆಮಿನಿ 3.1 ಪ್ರೊ ಆಳವಾಗಿ ಆಲೋಚಿಸುತ್ತಿದೆ...')
                          : (language === 'en' ? 'Formulating expert strategy...' : 'ವಿವರಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...')}
                      </span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder={language === 'en' ? 'Ask Coach about exercises, nutrition, or posture...' : 'ವ್ಯಾಯಾಮ, ಪೌಷ್ಟಿಕಾಂಶ ಅಥವಾ ಭಂಗಿಯ ಬಗ್ಗೆ ಕೇಳಿ...'}
                  className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none px-3 py-2"
                />
                <button
                  onClick={sendChatMessage}
                  className="bg-[#FFD000] hover:bg-[#FFC400] text-black font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? 'Send' : 'ಕಳುಹಿಸು'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: VEO VIDEO ANIMATION */}
          {activeTab === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Creation Parameters */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">
                    {language === 'en' ? 'Animate Progress Photo' : 'ಫೋಟೋ ಮೋಷನ್ ಅನಿಮೇಷನ್'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {language === 'en' 
                      ? 'Upload a progress picture, fitness pose, or quote card and let Veo animate it into a cinematic motivational video loop.'
                      : 'ನಿಮ್ಮ ವರ್ಕೌಟ್ ಫೋಟೋವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಅದನ್ನು ಅದ್ಭುತ ವೀಡಿಯೊ ಆಗಿ ಪರಿವರ್ತಿಸಿ.'}
                  </p>
                </div>

                {/* Drag and Drop Box */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'video')}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative ${
                    isDragging 
                      ? 'border-[#FFC400] bg-[#FFC400]/5' 
                      : videoImage 
                        ? 'border-zinc-700 bg-zinc-900/40' 
                        : 'border-zinc-800 bg-transparent hover:border-zinc-700'
                  }`}
                >
                  {videoImage ? (
                    <div className="space-y-3">
                      <img 
                        src={videoImage} 
                        alt="Upload preview" 
                        className="max-h-36 mx-auto rounded-lg object-contain border border-zinc-800" 
                      />
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setVideoImage(null)}
                          className="px-2.5 py-1 bg-red-950/40 hover:bg-red-950 border border-red-800 text-red-400 text-[10px] font-bold rounded-md uppercase tracking-wider cursor-pointer"
                        >
                          {language === 'en' ? 'Remove' : 'ತೆಗೆದುಹಾಕಿ'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="mx-auto w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-zinc-300">
                        <label className="text-[#FFC400] font-bold cursor-pointer hover:underline">
                          {language === 'en' ? 'Choose picture' : 'ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'video')}
                            className="hidden" 
                          />
                        </label>
                        <span className="text-zinc-500"> {language === 'en' ? 'or drag and drop here' : 'ಅಥವಾ ಇಲ್ಲಿಗೆ ಎಳೆದು ಬಿಡಿ'}</span>
                      </div>
                      <p className="text-[10px] text-zinc-600">PNG, JPG or WEBP (Max 10MB)</p>
                    </div>
                  )}
                </div>

                {/* Aspect Ratio Selector */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Aspect Ratio' : 'ಅನುಪಾತ'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['16:9', '9:16'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setVideoAspect(ratio)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          videoAspect === ratio 
                            ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {ratio === '16:9' ? '16:9 Landscape' : '9:16 Story / Reel'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Prompt */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Creative Prompt (Optional)' : 'ಅನಿಮೇಷನ್ ವಿವರಣೆ (ಐಚ್ಛಿಕ)'}
                  </span>
                  <textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. Cinematic slow motion deadlift, epic golden sparks swirling, photorealistic 8k' : 'ಉದಾಹರಣೆಗೆ: ಗೋಲ್ಡನ್ ಬೆಳಕಿನ ತೀವ್ರವಾದ ವರ್ಕೌಟ್ ಅನಿಮೇಷನ್'}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 h-20 resize-none"
                  />
                </div>

                <button
                  onClick={triggerVideoGeneration}
                  disabled={videoLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FFC400] to-[#FFB300] hover:from-[#FFE082] hover:to-[#FFD000] disabled:from-zinc-800 disabled:to-zinc-900 disabled:text-zinc-600 text-black font-sans font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>
                    {videoLoading 
                      ? (language === 'en' ? 'Synthesizing Video...' : 'ವೀಡಿಯೊ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...') 
                      : (language === 'en' ? 'Animate with Veo →' : 'ವೀಡಿಯೊ ರಚಿಸಿ →')}
                  </span>
                </button>
              </div>

              {/* View Output Screen */}
              <div className="flex flex-col justify-center items-center bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 min-h-[350px]">
                {videoLoading ? (
                  <div className="text-center space-y-4">
                    <RefreshCw className="w-10 h-10 animate-spin text-[#FFC400] mx-auto" />
                    <div className="text-xs font-mono text-[#FFC400] max-w-xs leading-relaxed">
                      {videoStatus}
                    </div>
                  </div>
                ) : videoUrl ? (
                  <div className="w-full space-y-4 text-center">
                    <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black aspect-video max-w-md mx-auto">
                      <video 
                        src={videoUrl} 
                        controls 
                        autoPlay 
                        loop 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <a 
                        href={videoUrl} 
                        download="dhanus-workout.mp4"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Download MP4' : 'ಡೌನ್‌ಲೋಡ್'}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      {language === 'en' ? 'Veo Video Console' : 'ವೀಡಿಯೊ ಕನ್ಸೋಲ್'}
                    </h4>
                    <p className="text-[11px] text-zinc-600 max-w-xs mx-auto">
                      {language === 'en' ? 'Your generated video loop will stream here once rendering completes.' : 'ನಿಮ್ಮ ವೀಡಿಯೊ ಅನಿಮೇಷನ್ ಇಲ್ಲಿ ಪ್ಲೇ ಆಗುತ್ತದೆ.'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: LYRIA SOUNDTRACK COMPOSER */}
          {activeTab === 'music' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">
                    {language === 'en' ? 'Gym Soundtrack Composer' : 'ವರ್ಕೌಟ್ ಮ್ಯೂಸಿಕ್ ಕಂಪೋಸರ್'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {language === 'en' 
                      ? 'Create customized audio clips or full coaching tracks using Lyria. Generate energetic beats, yoga meditation music, or heavy lift loops.'
                      : 'ಲೈರಿಯಾ ಬಳಸಿ ತಾಲೀಮಿಗೆ ಕಸ್ಟಮೈಸ್ಡ್ ಮ್ಯೂಸಿಕ್ ಕಂಪೋಸ್ ಮಾಡಿ.'}
                  </p>
                </div>

                {/* Image + Text Music Generation upload block */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Inspire from Image (Optional)' : 'ಚಿತ್ರದಿಂದ ಪ್ರೇರಣೆ (ಐಚ್ಛಿಕ)'}
                  </span>
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'music')}
                    className={`border border-dashed rounded-xl p-4 text-center transition-all ${
                      musicImage ? 'bg-zinc-900/40 border-zinc-700' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {musicImage ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={musicImage} alt="music ref" className="w-12 h-12 object-cover rounded border border-zinc-800" />
                          <span className="text-[11px] text-zinc-300 font-mono">Image reference loaded</span>
                        </div>
                        <button 
                          onClick={() => setMusicImage(null)}
                          className="text-[10px] text-red-400 font-bold hover:underline cursor-pointer"
                        >
                          {language === 'en' ? 'Remove' : 'ತೆಗೆದುಹಾಕಿ'}
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-400 flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4 text-zinc-500" />
                        <label className="text-[#FFC400] font-bold cursor-pointer hover:underline">
                          {language === 'en' ? 'Upload Image' : 'ಚಿತ್ರ ಅಪ್ಲೋಡ್'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'music')}
                            className="hidden" 
                          />
                        </label>
                        <span>{language === 'en' ? 'for visual inspiration' : 'ಹೆಚ್ಚಿನ ಪ್ರೇರಣೆಗಾಗಿ'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Track Duration options */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Track Inclusions' : 'ಮ್ಯೂಸಿಕ್ ಅವಧಿ'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setMusicFull(false)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        !musicFull 
                          ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      30s Motivational Clip (Lyria Clip)
                    </button>
                    <button
                      onClick={() => setMusicFull(true)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        musicFull 
                          ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      Full-Length Gym Track (Lyria Pro)
                    </button>
                  </div>
                </div>

                {/* Prompt & Quick Moods */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Beats Style & Sound Prompt' : 'ಶೈಲಿ ಮತ್ತು ಪ್ರಾಂಪ್ಟ್'}
                  </span>
                  <input
                    type="text"
                    value={musicPrompt}
                    onChange={(e) => setMusicPrompt(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. Industrial phonk beats with heavy brass accents for max power' : 'ಉದಾಹರಣೆಗೆ: ಕಾರ್ಡಿಯೋ ವರ್ಕೌಟ್‌ಗಾಗಿ ವೇಗದ ಟೆಕ್ನೋ ಮ್ಯೂಸಿಕ್'}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                  />
                  
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: '🔥 Phonk Beats', value: 'High tempo gym industrial phonk beats with dark distorted bass' },
                      { name: '⚡ Hardcore Rock', value: 'Heavy distorted metal rock rhythm for squatting sessions' },
                      { name: '🧘 Yoga Meditation', value: 'Warm lush healing frequencies soundscape for steam bath & deep stretching' },
                      { name: '🏃 Cardio Electro', value: 'Upbeat progressive electro house track for long run cardio session' }
                    ].map((mood, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMusicPrompt(mood.value)}
                        className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        {mood.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={triggerMusicGeneration}
                  disabled={musicLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FFC400] to-[#FFB300] hover:from-[#FFE082] hover:to-[#FFD000] disabled:from-zinc-800 disabled:to-zinc-900 disabled:text-zinc-600 text-black font-sans font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Music className="w-4 h-4" />
                  <span>
                    {musicLoading 
                      ? (language === 'en' ? 'Synthesizing Audio via Lyria...' : 'ಸಂಗೀತ ತಯಾರಾಗುತ್ತಿದೆ...') 
                      : (language === 'en' ? 'Compose Soundtrack →' : 'ಮ್ಯೂಸಿಕ್ ಕಂಪೋಸ್ ಮಾಡಿ →')}
                  </span>
                </button>
              </div>

              {/* Soundtrack Console output */}
              <div className="flex flex-col justify-center items-center bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 min-h-[350px]">
                {musicLoading ? (
                  <div className="text-center space-y-3">
                    <RefreshCw className="w-10 h-10 animate-spin text-[#FFC400] mx-auto" />
                    <h4 className="text-xs font-mono text-[#FFC400]">
                      {language === 'en' ? 'Synthesizing with Lyria AI...' : 'ಲೈರಿಯಾ ಎಐ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ...'}
                    </h4>
                  </div>
                ) : musicAudioUrl ? (
                  <div className="w-full space-y-6 text-center">
                    
                    {/* Vinyl player visualizer */}
                    <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-zinc-800 bg-zinc-950 flex items-center justify-center overflow-hidden shadow-2xl">
                      <div className={`absolute inset-0 border border-[#FFC400]/40 rounded-full ${isPlayingMusic ? 'animate-[spin_4s_linear_infinite]' : ''}`} style={{ backgroundImage: `conic-gradient(from 0deg, transparent 40%, #FFC400 50%, transparent 60%)` }} />
                      <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center z-10 border border-zinc-800">
                        <button
                          onClick={toggleMusicPlayback}
                          className="w-12 h-12 rounded-full bg-[#FFD000] text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md cursor-pointer"
                        >
                          {isPlayingMusic ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#FFC400] font-black uppercase bg-[#FFC400]/10 px-2.5 py-1 rounded">
                        {language === 'en' ? 'TRACK COMPOSED SUCCESSFULLY' : 'ಸಂಗೀತ ಯಶಸ್ವಿಯಾಗಿ ಸಿದ್ಧವಾಗಿದೆ'}
                      </span>
                      <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
                        {musicPrompt || 'Custom Dhanus Elite Workout Track'}
                      </p>
                    </div>

                    {musicLyrics && (
                      <div className="bg-zinc-900/50 p-4 rounded-xl max-w-sm mx-auto text-left border border-zinc-850">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FFC400] uppercase tracking-wider mb-2">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Generated Lyrics & Beats Notes' : 'ಸಾಹಿತ್ಯದ ವಿವರಗಳು'}</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-300 leading-relaxed whitespace-pre-line max-h-24 overflow-y-auto pr-1">
                          {musicLyrics}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-center gap-2">
                      <a 
                        href={musicAudioUrl} 
                        download="dhanus-soundtrack.wav"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Download WAV' : 'ಡೌನ್‌ಲೋಡ್'}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto">
                      <Volume2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      {language === 'en' ? 'Lyria Console' : 'ಲೈರಿಯಾ ಕನ್ಸೋಲ್'}
                    </h4>
                    <p className="text-[11px] text-zinc-600 max-w-xs mx-auto">
                      {language === 'en' ? 'Choose custom style beat prompts to synthesize energy soundtracks.' : 'ಹಾಡಿನ ಶೈಲಿಯನ್ನು ಆರಿಸಿ ಇಲ್ಲಿ ಪ್ಲೇ ಮಾಡಿ.'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: IMAGEN POSTER CREATOR */}
          {activeTab === 'image' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">
                    {language === 'en' ? 'Elite Poster & Card Generator' : 'ಪೋಸ್ಟರ್ ಮೇಕರ್'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {language === 'en' 
                      ? 'Generate high-resolution motivational gym posters, coach cards, or luxury flyers. Support standard and pro-studio generation with custom sizes.'
                      : 'ಜಿಮ್ ಪೋಸ್ಟರ್‌ಗಳು ಮತ್ತು ಪ್ರೋತ್ಸಾಹದಾಯಕ ಚಿತ್ರಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಿ.'}
                  </p>
                </div>

                {/* Aspect Ratio Selection */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Aspect Ratio' : 'ಅನುಪಾತ'}
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setImageAspect(ratio)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                          imageAspect === ratio 
                            ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Size Selection */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Image Resolution Size' : 'ಚಿತ್ರದ ಗುಣಮಟ್ಟ/ಅಳತೆ'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {['1K', '2K', '4K'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setImageSize(size)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          imageSize === size 
                            ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {size} Resolution
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Quality Model Selection */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Render Model' : 'ವಿನ್ಯಾಸದ ಮಾಡೆಲ್'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setImageQuality('standard')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        imageQuality === 'standard' 
                          ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      General / Quick (Flash Image)
                    </button>
                    <button
                      onClick={() => setImageQuality('studio')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        imageQuality === 'studio' 
                          ? 'bg-[#FFC400]/10 text-[#FFC400] border-[#FFC400]/30' 
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      Studio Quality (Pro Image)
                    </button>
                  </div>
                </div>

                {/* Image prompt text */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {language === 'en' ? 'Visual Description' : 'ಪೋಸ್ಟರ್ ವಿವರಣೆ'}
                  </span>
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. Minimalist design of a gold weights bar resting on a black podium, luxury smoke' : 'ಉದಾಹರಣೆಗೆ: ಕಪ್ಪು ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಹೊಳೆಯುವ ಚಿನ್ನದ ಡಂಬ್ಬೆಲ್ ಚಿತ್ರ'}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                  />
                  
                  {/* Preset Suggestions */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: '🥇 Champion Poster', value: 'Cinematic photo of a muscular champion standing near squat cage with glowing gold lights' },
                      { name: '🔥 Neon Gym Interior', value: 'Luxury gym interior with state-of-the-art strength equipment and neon yellow branding' },
                      { name: '⚡ Coach Profile Card', value: 'Sleek black professional fitness trainer coach business card design with gold stripes' }
                    ].map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => setImagePrompt(sug.value)}
                        className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        {sug.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={triggerImageGeneration}
                  disabled={imageLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FFC400] to-[#FFB300] hover:from-[#FFE082] hover:to-[#FFD000] disabled:from-zinc-800 disabled:to-zinc-900 disabled:text-zinc-600 text-black font-sans font-black text-xs rounded-xl tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>
                    {imageLoading 
                      ? (language === 'en' ? 'Rendering Poster...' : 'ಚಿತ್ರ ಮೂಡಿಬರುತ್ತಿದೆ...') 
                      : (language === 'en' ? 'Generate Poster →' : 'ಪೋಸ್ಟರ್ ತಯಾರಿಸಿ →')}
                  </span>
                </button>
              </div>

              {/* View Output Screen */}
              <div className="flex flex-col justify-center items-center bg-zinc-900/30 border border-zinc-850 rounded-2xl p-6 min-h-[350px]">
                {imageLoading ? (
                  <div className="text-center space-y-3 animate-pulse">
                    <RefreshCw className="w-10 h-10 animate-spin text-[#FFC400] mx-auto" />
                    <h4 className="text-xs font-mono text-[#FFC400]">
                      {language === 'en' ? 'Synthesizing with Imagen Pro...' : 'ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗುತ್ತಿದೆ...'}
                    </h4>
                  </div>
                ) : generatedImageUrl ? (
                  <div className="w-full space-y-4 text-center">
                    <div className="relative rounded-xl overflow-hidden border border-zinc-850 bg-black max-h-[350px] max-w-sm mx-auto shadow-2xl">
                      <img 
                        src={generatedImageUrl} 
                        alt="Generated poster" 
                        className="w-full h-full object-contain mx-auto" 
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <a 
                        href={generatedImageUrl} 
                        download="dhanus-gold-poster.png"
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Download Image' : 'ಡೌನ್‌ಲೋಡ್'}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      {language === 'en' ? 'Imagen Console' : 'ಚಿತ್ರದ ಕನ್ಸೋಲ್'}
                    </h4>
                    <p className="text-[11px] text-zinc-600 max-w-xs mx-auto">
                      {language === 'en' ? 'Your generated high-resolution poster artwork will be displayed here.' : 'ಚಿತ್ರದ ವಿನ್ಯಾಸ ಪೂರ್ಣಗೊಂಡಾಗ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: MAPS GROUNDING */}
          {activeTab === 'maps' && (
            <div className="space-y-6">
              
              <div>
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">
                  {language === 'en' ? 'Dhanus Local Partner Locator' : 'ಧನುಸ್ ಮ್ಯಾಪ್ಸ್ ಹುಡುಕಾಟ'}
                </h3>
                <p className="text-xs text-zinc-500">
                  {language === 'en' 
                    ? 'Search for nearby fitness shops, healthy supplement stores, run tracks, or health cafes around Kengeri, Bengaluru powered by Google Maps.'
                    : 'ಬೆಂಗಳೂರಿನ ಕೆಂಗೇರಿ ಸಮೀಪದ ಆರೋಗ್ಯಕರ ಆಹಾರ ಮಳಿಗೆಗಳು ಮತ್ತು ಜಿಮ್ ಪರಿಕರಗಳ ಅಂಗಡಿಯನ್ನು ಹುಡುಕಿ.'}
                </p>
              </div>

              {/* Pre-set maps search options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: language === 'en' ? 'Supplement Stores near Kengeri' : 'ಸಪ್ಲಿಮೆಂಟ್ ಅಂಗಡಿಗಳು', query: 'Find fitness supplement stores near Kengeri, Bengaluru' },
                  { name: language === 'en' ? 'Organic Health Food Cafes' : 'ಆರೋಗ್ಯಕರ ಹೋಟೆಲ್‌ಗಳು', query: 'Healthy organic food restaurant cafe near Kengeri Metro Station Bengaluru' },
                  { name: language === 'en' ? 'Running Tracks & Parks' : 'ರನ್ನಿಂಗ್ ಟ್ರ್ಯಾಕ್‌ಗಳು ಮತ್ತು ಪಾರ್ಕ್', query: 'Public running tracks or green parks near Kengeri Bengaluru' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerMapsSearch(item.query)}
                    className="p-4 bg-zinc-900 hover:bg-zinc-850 rounded-2xl border border-zinc-800 hover:border-[#FFC400] text-left transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-1.5 bg-[#FFC400]/10 text-[#FFC400] rounded-lg">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      {language === 'en' ? 'Click to search with Live Maps' : 'ಲೈವ್ ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮೂಲಕ ಹುಡುಕಲು ಕ್ಲಿಕ್ ಮಾಡಿ'}
                    </p>
                  </button>
                ))}
              </div>

              {/* Search bar input */}
              <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
                <input
                  type="text"
                  value={mapsPrompt}
                  onChange={(e) => setMapsPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && triggerMapsSearch()}
                  placeholder={language === 'en' ? 'Type custom location query (e.g. Health food store near Kengeri)...' : 'ಕೆಂಗೇರಿ ಸಮೀಪದ ಜಿಮ್ ಅಥವಾ ಪ್ರೋಟೀನ್ ಅಂಗಡಿ ಬಗ್ಗೆ ಬರೆಯಿರಿ...'}
                  className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none px-3 py-2"
                />
                <button
                  onClick={() => triggerMapsSearch()}
                  className="bg-[#FFD000] hover:bg-[#FFC400] text-black font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Search Maps' : 'ಹುಡುಕು'}</span>
                </button>
              </div>

              {/* Maps Result Area */}
              <AnimatePresence mode="wait">
                {(mapsLoading || mapsResponse) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-zinc-900/50 rounded-2xl border border-zinc-850 p-6 space-y-4"
                  >
                    {mapsLoading ? (
                      <div className="flex items-center gap-3 py-4">
                        <RefreshCw className="w-5 h-5 animate-spin text-[#FFC400]" />
                        <span className="text-xs font-mono text-zinc-400">
                          {language === 'en' ? 'Contacting Google Maps API Grounding...' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಎಪಿಐ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...'}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#FFC400]">
                          <CheckCircle2 className="w-4 h-4" />
                          <h4 className="text-xs font-mono font-black uppercase tracking-wider">
                            {language === 'en' ? 'VERIFIED MAPS SEARCH COMPLETED' : 'ವಿಶ್ವಾಸಾರ್ಹ ಮ್ಯಾಪ್ಸ್ ಹುಡುಕಾಟ ಪೂರ್ಣಗೊಂಡಿದೆ'}
                          </h4>
                        </div>
                        
                        <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                          {mapsResponse}
                        </p>

                        {/* Grounding Metadata Links */}
                        {mapsGrounding?.groundingChunks && (
                          <div className="pt-4 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                              {language === 'en' ? 'Grounding Citations & Map Links' : 'ಮ್ಯಾಪ್ ಲಿಂಕ್ಸ್ ವಿವರಗಳು'}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {mapsGrounding.groundingChunks.map((chunk: any, idx: number) => {
                                if (!chunk.web?.uri) return null;
                                return (
                                  <a
                                    key={idx}
                                    href={chunk.web.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 bg-zinc-950 hover:bg-black text-[#FFD000] text-[10px] font-bold rounded-lg border border-zinc-800 hover:border-[#FFC400] transition-colors inline-flex items-center gap-1"
                                  >
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate max-w-[150px]">{chunk.web.title || (language === 'en' ? 'Location Link' : 'ವಿವರಗಳು')}</span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
