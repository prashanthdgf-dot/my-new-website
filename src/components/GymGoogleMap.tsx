// Source: Google Maps Platform Code Assist
import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, ExternalLink, Sparkles, Clock, Phone, Compass, Layers, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { useLanguage } from '../LanguageContext';

// Verified Google Maps geographic coordinates for Dhanus Gold Fitness at Hoysala Circle, Kengeri
const GYM_LOCATION = {
  lat: 12.9247426,
  lng: 77.4855608,
};

export default function GymGoogleMap() {
  const { language } = useLanguage();
  // Never hard-code the key: anything in the bundle is public. Set VITE_GOOGLE_MAPS_API_KEY and
  // restrict the key to your domain (HTTP referrers) in Google Cloud Console.
  const apiKey: string = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || '';

  const [activeTab, setActiveTab] = useState<'map' | 'locator'>('map');
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#FFC400]/20 bg-zinc-950 shadow-2xl flex flex-col">
      {/* Top Header Strip with View Mode Switcher */}
      <div className="bg-zinc-900/90 border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFC400] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
            Hoysala Circle, Kengeri
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'map'
                ? 'bg-[#FFC400] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Interactive Map' : 'ಇಂಟರಾಕ್ಟಿವ್ ಮ್ಯಾಪ್'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('locator')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'locator'
                ? 'bg-[#FFC400] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Locator Plus' : 'ಲೊಕೇಟರ್ ಪ್ಲಸ್'}</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px]">
        {activeTab === 'locator' ? (
          /* Google Maps Extended Component Library - Locator Plus View */
          <div className="relative w-full h-full bg-[#09090b]">
            <iframe
              title="Dhanus Gold Fitness - Google Maps Locator Plus"
              src="/locator.html"
              className="w-full h-full border-0"
              loading="lazy"
              allow="geolocation 'self' https://*.googleapis.com"
            />
            {/* Quick overlay helper */}
            <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2">
              <a
                href="/locator.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[#FFC400] hover:text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg transition-colors"
              >
                <span>Fullscreen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : !apiKey ? (
          /* No API key configured: fall back to the keyless Google Maps embed so the map still works */
          <iframe
            title="Dhanus Gold Fitness location map"
            src={CONTACT_INFO.gmapsEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          /* Interactive Google Map via @vis.gl/react-google-maps */
          <APIProvider apiKey={apiKey} libraries={['marker']}>
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={GYM_LOCATION}
              defaultZoom={16}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              <AdvancedMarker
                position={GYM_LOCATION}
                title="Dhanus Gold Fitness"
                onClick={() => setIsInfoWindowOpen(true)}
              >
                <Pin
                  background="#FFC400"
                  borderColor="#8B6914"
                  glyphColor="#000000"
                />
              </AdvancedMarker>

              {isInfoWindowOpen && (
                <InfoWindow
                  position={GYM_LOCATION}
                  onCloseClick={() => setIsInfoWindowOpen(false)}
                  headerContent={
                    <div className="font-display font-bold text-sm text-zinc-900 flex items-center gap-1.5 pr-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
                      Dhanus Gold Fitness
                    </div>
                  }
                >
                  <div className="text-zinc-800 text-xs p-1 max-w-[250px] space-y-2 font-sans">
                    <p className="font-medium text-zinc-600">
                      {CONTACT_INFO.shortAddress}
                    </p>
                    <div className="flex items-center gap-1 text-amber-700 font-semibold text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>5:30 AM – 10:00 PM (Mon-Sat)</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-600 text-[11px]">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{CONTACT_INFO.phoneNumber}</span>
                    </div>
                    <div className="pt-1 flex gap-2">
                      <a
                        href={CONTACT_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 flex-1 px-2.5 py-1.5 bg-[#FFC400] hover:bg-[#e0ad00] text-black font-bold rounded-lg text-xs transition-colors shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        {language === 'en' ? 'Directions' : 'ದಾರಿ'}
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveTab('locator')}
                        className="inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[#FFC400] font-mono text-[11px] rounded-lg transition-colors border border-zinc-700"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Locator+</span>
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        )}
      </div>

      {/* Bottom Information & Action Bar */}
      <div className="bg-zinc-900/90 border-t border-white/10 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
          <MapPin className="w-4 h-4 text-[#FFC400] flex-shrink-0" />
          <span className="truncate max-w-[280px] sm:max-w-md">
            12.9247426° N, 77.4855608° E • Hoysala Circle
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <a
            href="/locator.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[#FFC400] text-xs font-mono font-bold rounded-xl border border-white/10 transition-colors"
          >
            <span>Locator Plus View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={CONTACT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-gold text-black text-xs font-sans font-bold rounded-xl shadow-lg hover:brightness-110 transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Get Directions' : 'ದಾರಿ ತೋರಿಸಿ'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
