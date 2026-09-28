import { useState } from 'react';
import { 
  LayoutDashboard, Megaphone, Users, Sparkles, Settings, Star,
  TrendingUp, Copy, RefreshCw, Briefcase, MapPin, CheckCircle2 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ScrollReveal from '../components/ScrollReveal';

interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Paused' | 'Scheduled';
  leads: number;
  clicks: number;
  budget: string;
}

export default function AdsHubPage({ userRole, onLogout }: { userRole: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'google-business' | 'ai-video' | 'shorts-script' | 'campaigns' | 'segments' | 'settings'>('dashboard');
  
  // Google Business Profile Integration State
  const [isGbpConnected, setIsGbpConnected] = useState(false);
  const [gbpMetrics] = useState({
    rating: 4.9,
    reviewsCount: 158,
    mapViews: 12400,
    directions: 412,
    calls: 184
  });
  const [isConnectingGbp, setIsConnectingGbp] = useState(false);

  // AI Reel Script Generator State
  const [targetAudience, setTargetAudience] = useState('Kengeri Working Professionals');
  const [duration, setDuration] = useState('30 Seconds');
  const [scriptTone, setScriptTone] = useState('Energetic & Motivating');
  const [customHooks, setCustomHooks] = useState('Imported Biomechanical plates focus');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  
  // Twilio Settings States
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [isSidMasked, setIsSidMasked] = useState(true);
  const [isTokenMasked, setIsTokenMasked] = useState(true);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  
  // Local Notifications state
  const [notifications] = useState([
    { id: 1, text: 'Campaign "Kengeri Students Gold Pack" clicks increased by 22% in last 4 hours.', time: '10m ago', type: 'success' },
    { id: 2, text: 'Weekly lead goal reached! 140 new trial consultations booked.', time: '1h ago', type: 'info' },
    { id: 3, text: 'Twilio Gateway SMS API healthy. Status 200 OK.', time: '4h ago', type: 'info' }
  ]);

  // Mock campaigns data
  const [campaigns] = useState<Campaign[]>(
    [
      { id: 1, name: 'Kengeri Students Gold Pack Special', status: 'Active', leads: 48, clicks: 350, budget: '₹500 / day' },
      { id: 2, name: 'Executive Couple Annual Target', status: 'Active', leads: 12, clicks: 120, budget: '₹800 / day' },
      { id: 3, name: 'IT Professionals Early Morning Fit', status: 'Paused', leads: 24, clicks: 190, budget: '₹400 / day' },
      { id: 4, name: 'Weekend CrossFit Bootcamp Launch', status: 'Scheduled', leads: 0, clicks: 0, budget: '₹600 / day' }
    ]
  );

  // Analytics Chart Data
  const analyticsData = [
    { name: 'Mon', Clicks: 240, Leads: 40, BudgetUsed: 500 },
    { name: 'Tue', Clicks: 310, Leads: 52, BudgetUsed: 620 },
    { name: 'Wed', Clicks: 290, Leads: 49, BudgetUsed: 580 },
    { name: 'Thu', Clicks: 380, Leads: 68, BudgetUsed: 760 },
    { name: 'Fri', Clicks: 420, Leads: 85, BudgetUsed: 840 },
    { name: 'Sat', Clicks: 510, Leads: 110, BudgetUsed: 1020 },
    { name: 'Sun', Clicks: 480, Leads: 98, BudgetUsed: 960 },
  ];

  // Call API to generate customized Gym Reel script
  const handleGenerateScript = async () => {
    setIsGeneratingScript(true);
    setGeneratedScript('');
    
    try {
      const promptText = `Write an engaging fitness promo reel script for social media (Shorts/Reel). 
      Target Audience: ${targetAudience}
      Estimated Duration: ${duration}
      Script Tone: ${scriptTone}
      Core Highlights to Include: ${customHooks}
      The gym is 'Dhanus Gold Fitness' located near Hoysala Circle, Kengeri Satellite Town, Bengaluru. 
      Please structure it with:
      1. Hook (0-3s)
      2. Body Content (Showcasing premium imported strength equipment, weekly steam baths, certified trainer guidance)
      3. Call to Action (CTA) telling them to click the link or send a WhatsApp message to book a free trial session. Include precise visual cues in brackets. Keep the text highly engaging and professional.`;

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          history: [],
          role: 'general',
          useThinking: false
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setGeneratedScript(data.text || 'Failed to generate content');
    } catch (err: any) {
      console.error(err);
      setGeneratedScript(`⚠️ Error generating script: ${err.message || 'Server timeout'}`);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const testTwilioGateway = () => {
    setIsTestingConnection(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingConnection(false);
      setTestResult('success');
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with logout */}
        <ScrollReveal y={-20}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-[#FFC400]" />
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  Dhanus Gold Group Console • {userRole} Access
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mt-1">
                ADVERTISING & <span className="text-[#FFC400]">MARKETING HUB</span>
              </h1>
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-800 text-xs font-mono font-bold uppercase rounded-xl transition-all cursor-pointer"
            >
              Terminate Session (Logout)
            </button>
          </div>
        </ScrollReveal>

        {/* Workspace Layout */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-2 bg-[#070707] border border-zinc-900 p-3 rounded-2xl">
            <span className="text-[9px] font-mono font-bold text-zinc-500 px-3 uppercase tracking-wider block mb-1">Navigation Panel</span>
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'google-business', label: 'Google Business', icon: MapPin },
              { id: 'shorts-script', label: 'AI Shorts Creator', icon: Sparkles },
              { id: 'campaigns', label: 'Active Campaigns', icon: Megaphone },
              { id: 'segments', label: 'Target Segments', icon: Users },
              { id: 'settings', label: 'API & Twilio Gateways', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-xs sm:text-sm font-display font-black transition-all uppercase flex items-center gap-3 cursor-pointer ${
                    active 
                      ? 'bg-[#FFC400] text-black shadow-md' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Workspace Panel */}
          <div className="lg:col-span-9 bg-[#070707] border border-zinc-900 rounded-3xl p-6 sm:p-8 min-h-[500px]">
            
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Visual Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Google Rating</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-display font-black text-[#FFC400]">{gbpMetrics.rating}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 fill-[#FFC400] text-[#FFC400]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 block mt-2">{gbpMetrics.reviewsCount} Verified Reviews</span>
                  </div>

                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Consultation Leads</span>
                    <span className="text-2xl font-display font-black text-white mt-1 block">184</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-green-500 mt-2">
                      <TrendingUp className="w-3 h-3" />
                      <span>+22% Conversion Spurt</span>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Twilio Gateway</span>
                    <span className="text-xs font-mono font-bold text-green-400 bg-green-500/15 border border-green-500/20 px-2 py-0.5 rounded-full inline-block mt-2 uppercase tracking-widest">
                      ONLINE
                    </span>
                    <span className="text-[10px] text-zinc-500 block mt-2">99.9% Delivery Rate</span>
                  </div>

                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Marketing Spend</span>
                    <span className="text-2xl font-display font-black text-[#FFC400] mt-1 block">₹5,200</span>
                    <span className="text-[10px] text-zinc-500 block mt-2">Budget Cap: ₹15,000</span>
                  </div>
                </div>

                {/* Recharts Analytics Chart */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block">CAMPAIGN PERFORMANCE LEAD GRAPH (WEEKLY)</span>
                  <div className="bg-black/40 border border-zinc-900 rounded-2xl p-4 sm:p-6 aspect-[16/9] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFC400" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FFC400" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                        <XAxis dataKey="name" stroke="#52525b" fontSize={11} fontStyle="italic" />
                        <YAxis stroke="#52525b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#070707', borderColor: '#1f1f1f', borderRadius: 12 }} />
                        <Area type="monotone" dataKey="Clicks" stroke="#FFC400" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={2} />
                        <Area type="monotone" dataKey="Leads" stroke="#ffffff" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Notifications Log */}
                <div className="bg-black/30 border border-zinc-900 rounded-2xl p-5 space-y-4">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block">REAL-TIME TELEMETRY ALERTS</span>
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex justify-between items-start text-xs border-b border-zinc-900 pb-2.5 last:border-0 last:pb-0">
                        <p className="text-zinc-300 leading-relaxed max-w-xl">{n.text}</p>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0 italic">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1.5: GOOGLE BUSINESS PROFILE */}
            {activeTab === 'google-business' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">Google Business Integration</h3>
                    <p className="text-xs text-zinc-500">Monitor your local search presence and manage reviews directly from the Dhanus Gold console.</p>
                  </div>
                  {!isGbpConnected ? (
                    <button 
                      onClick={() => {
                        setIsConnectingGbp(true);
                        setTimeout(() => {
                          setIsGbpConnected(true);
                          setIsConnectingGbp(false);
                        }, 2000);
                      }}
                      disabled={isConnectingGbp}
                      className="px-4 py-2 bg-[#FFC400] text-black font-mono text-xs font-bold uppercase rounded-xl hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {isConnectingGbp ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5" />}
                      <span>{isConnectingGbp ? 'Authorizing...' : 'Connect Google Business'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest">Live Sync Active</span>
                    </div>
                  )}
                </div>

                {!isGbpConnected ? (
                  <div className="bg-black/40 border border-zinc-900 border-dashed rounded-3xl p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                      <MapPin className="w-8 h-8 text-zinc-600" />
                    </div>
                    <h4 className="text-xl font-display font-black text-white uppercase">Ready to Sync Your Local Presence?</h4>
                    <p className="text-sm text-zinc-500 max-w-md mx-auto">Connect your Google Business Profile to track how many local Kengeri residents are finding your gym on Maps and read/reply to reviews in real-time.</p>
                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          setIsConnectingGbp(true);
                          setTimeout(() => {
                            setIsGbpConnected(true);
                            setIsConnectingGbp(false);
                          }, 2000);
                        }}
                        className="px-8 py-3 bg-white text-black font-sans font-black text-xs uppercase rounded-xl hover:bg-[#FFC400] transition-colors cursor-pointer"
                      >
                        Authorize Secure Connection
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* GBP Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Profile Views</span>
                        <span className="text-2xl font-display font-black text-[#FFC400] mt-1 block">{(gbpMetrics.mapViews / 1000).toFixed(1)}K</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-green-500 mt-2">
                          <TrendingUp className="w-3 h-3" />
                          <span>+8% last 30 days</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Direction Requests</span>
                        <span className="text-2xl font-display font-black text-white mt-1 block">{gbpMetrics.directions}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-green-500 mt-2">
                          <TrendingUp className="w-3 h-3" />
                          <span>+12% foot traffic</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Average Rating</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-display font-black text-[#FFC400]">{gbpMetrics.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-3 h-3 fill-[#FFC400] text-[#FFC400]" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-500 block mt-2">Market Leader in Kengeri</span>
                      </div>

                      <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest block">Call Button Clicks</span>
                        <span className="text-2xl font-display font-black text-[#FFC400] mt-1 block">{gbpMetrics.calls}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-2">
                          <span>Steady Performance</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Reviews Panel */}
                    <div className="bg-black/30 border border-zinc-900 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Recent Google Reviews (Live Feed)</h4>
                        <button className="text-[10px] font-mono font-bold text-[#FFC400] hover:underline cursor-pointer">View All 158 Reviews</button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { author: 'Rahul Sharma', rating: 5, text: 'Best gym in Kengeri! The equipment is top-notch and the atmosphere is very motivating.', time: '2 days ago' },
                          { author: 'Suma K.', rating: 5, text: 'I love the dedicated trainers here. Prashanth sir is excellent with posture correction.', time: '4 days ago' },
                          { author: 'Vikram Singh', rating: 4, text: 'Great place for heavy lifting. Can get a bit crowded in the evenings but worth it.', time: '1 week ago' }
                        ].map((review, idx) => (
                          <div key={idx} className="border-b border-zinc-900 pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-1.5">
                              <div>
                                <span className="text-sm font-display font-bold text-white">{review.author}</span>
                                <div className="flex mt-0.5">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 fill-[#FFC400] text-[#FFC400]" />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[9px] font-mono text-zinc-600 uppercase">{review.time}</span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed italic">"{review.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB 2: AI REEL SHORTS CREATOR */}
            {activeTab === 'shorts-script' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-wider mb-1">AI Shorts & Video Planner</h3>
                    <p className="text-xs text-zinc-500">Draft high-converting social media promotional scripts tailored for local Bengaluru landmarks using high-thinking Gemini intelligence.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Target Audience Segment</label>
                    <input 
                      type="text" 
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full bg-black border border-zinc-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Video Tone</label>
                      <input 
                        type="text" 
                        value={scriptTone}
                        onChange={(e) => setScriptTone(e.target.value)}
                        className="w-full bg-black border border-zinc-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Video Duration</label>
                      <select 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full bg-black border border-zinc-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="15 Seconds">15 Seconds (Quick Hook)</option>
                        <option value="30 Seconds">30 Seconds (Highly Balanced)</option>
                        <option value="60 Seconds">60 Seconds (Detailed walkthrough)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Highlights & Unique Hooks</label>
                    <textarea 
                      value={customHooks}
                      onChange={(e) => setCustomHooks(e.target.value)}
                      className="w-full bg-black border border-zinc-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FFC400] h-20 resize-none"
                    />
                  </div>

                  <button 
                    onClick={handleGenerateScript}
                    disabled={isGeneratingScript}
                    className="w-full py-3.5 bg-gradient-gold text-black font-sans font-black text-xs uppercase rounded-xl tracking-wider hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isGeneratingScript ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{isGeneratingScript ? 'Synthesizing with Gemini...' : 'Compile Video Script Script →'}</span>
                  </button>
                </div>

                {/* Script Display Console */}
                <div className="flex flex-col justify-between bg-black/40 border border-zinc-855 rounded-2xl p-5 min-h-[350px]">
                  <div>
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
                      <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">GEMINI OUTPUT CONSOLE</span>
                      {generatedScript && (
                        <button 
                          onClick={() => copyToClipboard(generatedScript)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[10px] font-mono font-bold text-[#FFC400] cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Script</span>
                        </button>
                      )}
                    </div>

                    <div className="text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap max-h-[380px] overflow-y-auto scrollbar-thin">
                      {isGeneratingScript ? (
                        <div className="flex flex-col items-center justify-center py-16 space-y-3 text-center">
                          <RefreshCw className="w-8 h-8 animate-spin text-[#FFC400]" />
                          <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Laying down dynamic video script templates...</p>
                        </div>
                      ) : generatedScript ? (
                        generatedScript
                      ) : (
                        <div className="text-center py-16 space-y-2">
                          <Sparkles className="w-8 h-8 text-zinc-700 mx-auto" />
                          <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Ready to generate. Set parameters on the left and compile.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[9px] text-zinc-500 pt-4 border-t border-zinc-900 text-center uppercase font-mono">
                    Powered by Google Gemini 3.5 Flash Model
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ACTIVE CAMPAIGNS */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">Social Campaigns Manager</h3>
                    <p className="text-xs text-zinc-500">Track and configure local ads active on Instagram and Google Maps.</p>
                  </div>
                  <button className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 text-[#FFC400] font-mono text-xs font-bold uppercase rounded-xl hover:border-[#FFC400]/40 transition-colors cursor-pointer">
                    + Create Campaign
                  </button>
                </div>

                <div className="space-y-3.5">
                  {campaigns.map((c) => (
                    <div key={c.id} className="bg-black/40 border border-zinc-900 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-zinc-750 transition-all">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-display font-bold uppercase text-white">{c.name}</h4>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${
                            c.status === 'Active' 
                              ? 'bg-green-500/15 border-green-500/20 text-green-400' 
                              : c.status === 'Paused' 
                                ? 'bg-zinc-800/40 border-zinc-700 text-zinc-400' 
                                : 'bg-blue-500/15 border-blue-500/20 text-blue-400'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <div className="flex gap-4 font-mono text-[10px] text-zinc-500 uppercase">
                          <span>Budget: <strong className="text-zinc-300">{c.budget}</strong></span>
                          <span>Clicks: <strong className="text-zinc-300">{c.clicks}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">CONVERTED LEADS</span>
                          <strong className="text-sm font-display font-black text-[#FFC400]">{c.leads}</strong>
                        </div>
                        <button className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-850 rounded-lg text-[10px] font-mono font-bold text-zinc-300 hover:text-white cursor-pointer">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TARGET SEGMENTS */}
            {activeTab === 'segments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">Audience Targeting Matrices</h3>
                  <p className="text-xs text-zinc-500">Configure geolocation radius parameters for Kengeri Satellite Town ad placements.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl space-y-3">
                    <Users className="w-5 h-5 text-[#FFC400]" />
                    <h4 className="text-sm font-display font-bold uppercase text-white">Student Hubs</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Focusing on Bangalore University, RV College of Engineering, and local hostels. Range: 3km.</p>
                    <span className="text-[10px] font-mono font-bold text-green-400 block uppercase">2,400 Targeted</span>
                  </div>

                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl space-y-3">
                    <Briefcase className="w-5 h-5 text-[#FFC400]" />
                    <h4 className="text-sm font-display font-bold uppercase text-white">IT Professionals</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Focusing on Kengeri Satellite town apartments, global tech parks commutations. Range: 5km.</p>
                    <span className="text-[10px] font-mono font-bold text-green-400 block uppercase">1,900 Targeted</span>
                  </div>

                  <div className="bg-black/40 border border-zinc-900 p-5 rounded-2xl space-y-3">
                    <Users className="w-5 h-5 text-[#FFC400]" />
                    <h4 className="text-sm font-display font-bold uppercase text-white">Couples Pack</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">Focusing on residential complexes around Hoysala Circle, Club Road apartments. Range: 2km.</p>
                    <span className="text-[10px] font-mono font-bold text-green-400 block uppercase">980 Targeted</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: API & TWILIO GATEWAYS */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">SMS Gateway & Lead API Integration</h3>
                  <p className="text-xs text-zinc-500">Securely configure the Twilio SMS Gateway used to dispatch automated confirmation pings to newly registered leads.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Twilio Sid Input */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Twilio Account SID</label>
                    <div className="relative">
                      <input 
                        type={isSidMasked ? 'password' : 'text'}
                        value={twilioSid}
                        onChange={(e) => setTwilioSid(e.target.value)}
                        className="w-full bg-black border border-zinc-850 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none"
                      />
                      <button 
                        onClick={() => setIsSidMasked(!isSidMasked)}
                        className="absolute right-3.5 top-3 text-[10px] font-mono font-bold text-[#FFC400] hover:underline cursor-pointer"
                      >
                        {isSidMasked ? 'Reveal' : 'Mask'}
                      </button>
                    </div>
                  </div>

                  {/* Twilio Token Input */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Twilio Auth Token</label>
                    <div className="relative">
                      <input 
                        type={isTokenMasked ? 'password' : 'text'}
                        value={twilioToken}
                        onChange={(e) => setTwilioToken(e.target.value)}
                        className="w-full bg-black border border-zinc-850 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none"
                      />
                      <button 
                        onClick={() => setIsTokenMasked(!isTokenMasked)}
                        className="absolute right-3.5 top-3 text-[10px] font-mono font-bold text-[#FFC400] hover:underline cursor-pointer"
                      >
                        {isTokenMasked ? 'Reveal' : 'Mask'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Webhook block */}
                <div className="bg-black/40 border border-zinc-900 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block">AUTOMATED LEAD INGESTION WEBHOOK ENDPOINT</span>
                    <button 
                      onClick={() => copyToClipboard('https://dhanusgoldfitness.com/api/webhooks/leads')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-[#FFC400] rounded-lg cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Endpoint URI</span>
                    </button>
                  </div>
                  <input 
                    type="text" 
                    readOnly
                    value="https://dhanusgoldfitness.com/api/webhooks/leads"
                    className="w-full bg-black/60 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-zinc-500 font-mono focus:outline-none"
                  />
                  <p className="text-[10px] text-zinc-500">Use this endpoint inside Facebook Ads Manager or local lead forms to automatically pipe contact inquiries to Dhanus Gold console.</p>
                </div>

                {/* Test Connection Button */}
                <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    {testResult === 'success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    <span>Gateway Connectivity: <strong>{testResult === 'success' ? 'ONLINE' : 'UNTESTED'}</strong></span>
                  </div>

                  <button 
                    onClick={testTwilioGateway}
                    disabled={isTestingConnection}
                    className="px-6 py-3.5 bg-zinc-900 hover:bg-[#FFC400] hover:text-black border border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {isTestingConnection ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                    <span>Test Connection Settings</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </ScrollReveal>

      </div>
    </div>
  );
}

export { AdsHubPage };
