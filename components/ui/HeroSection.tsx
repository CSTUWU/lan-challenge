import { memo, useEffect, useState } from 'react';
import { CountdownTimer } from './CountdownTimer';

interface HeroSectionProps {
  stancePercentage: number;
  isReady?: boolean;
}

export const HeroSection = memo(function HeroSection({ stancePercentage, isReady = false }: HeroSectionProps) {
  let stanceText = 'HELMET SCAN: PATROL MODE';
  let stanceClass = 'text-gray-400 font-bold';

  if (stancePercentage >= 70) {
    stanceText = 'GHOST HELMET: TARGET LOCKED';
    stanceClass = 'text-[#00ff66] font-black glow-text-green';
  } else if (stancePercentage >= 30) {
    stanceText = '360° OPTICAL INSPECTION...';
    stanceClass = 'text-emerald-400 font-bold';
  }

  // Dynamically compute scroll thresholds based on viewport height
  const [vh, setVh] = useState(800);
  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight || 800);
    updateVh();
    window.addEventListener('resize', updateVh, { passive: true });
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // Use raw scrollY for precise pixel-based text timing
  const scrollPx = typeof window !== 'undefined' ? (window.pageYOffset || document.documentElement.scrollTop) : 0;

  // === THRESHOLDS SCALED BY VIEWPORT HEIGHT ===
  const T1_IN_START   = 0;
  const T1_IN_END     = vh * 1.0;
  const T1_OUT_START  = vh * 2.0;
  const T1_OUT_END    = vh * 2.9;

  const T2_IN_START   = vh * 3.9;
  const T2_IN_END     = vh * 5.0;
  const T2_OUT_START  = vh * 6.0;
  const T2_OUT_END    = vh * 7.0;

  const T3_IN_START   = vh * 6.8;
  const T3_IN_END     = vh * 7.8;
  const T3_OUT_START  = vh * 8.8;
  const T3_OUT_END    = vh * 9.7;

  const STANCE_FADE_START = vh * 8.0;
  const SECTION_HEIGHT = vh * 10.0;

  // Vision & Strategy text
  const slideXPhase    = Math.min(Math.max((scrollPx - T1_IN_START) / Math.max(T1_IN_END - T1_IN_START, 1), 0), 1);
  const slideXOutPhase = Math.min(Math.max((scrollPx - T1_OUT_START) / Math.max(T1_OUT_END - T1_OUT_START, 1), 0), 1);
  const detailOpacity    = slideXPhase - slideXOutPhase;
  const detailTranslateX = (1 - detailOpacity) * -80;

  // Core Event text
  const coreSlideInPhase  = Math.min(Math.max((scrollPx - T2_IN_START) / Math.max(T2_IN_END - T2_IN_START, 1), 0), 1);
  const coreSlideOutPhase = Math.min(Math.max((scrollPx - T2_OUT_START) / Math.max(T2_OUT_END - T2_OUT_START, 1), 0), 1);
  const coreOpacity      = coreSlideInPhase - coreSlideOutPhase;
  const coreTranslateX   = (1 - coreSlideInPhase) * 80 + (coreSlideOutPhase * 80);

  // Split texts
  const splitSlideInPhase  = Math.min(Math.max((scrollPx - T3_IN_START) / Math.max(T3_IN_END - T3_IN_START, 1), 0), 1);
  const splitSlideOutPhase = Math.min(Math.max((scrollPx - T3_OUT_START) / Math.max(T3_OUT_END - T3_OUT_START, 1), 0), 1);
  const splitOpacity = splitSlideInPhase - splitSlideOutPhase;
  const splitLeftTranslateX  = (1 - splitSlideInPhase) * 80  + (splitSlideOutPhase * 80);
  const splitRightTranslateX = (1 - splitSlideInPhase) * -80 - (splitSlideOutPhase * 80);

  // Image Reveals (Scan animations)
  const img1In = Math.min(Math.max((scrollPx - T1_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img1Out = Math.min(Math.max((scrollPx - T1_OUT_START) / Math.max(T1_OUT_END - T1_OUT_START, 1), 0), 1);
  const img1Reveal = img1In - img1Out;

  const img2In = Math.min(Math.max((scrollPx - T2_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img2Out = Math.min(Math.max((scrollPx - T2_OUT_START) / Math.max(T2_OUT_END - T2_OUT_START, 1), 0), 1);
  const img2Reveal = img2In - img2Out;

  const img34In = Math.min(Math.max((scrollPx - T3_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img34Out = Math.min(Math.max((scrollPx - T3_OUT_START) / Math.max(T3_OUT_END - T3_OUT_START, 1), 0), 1);
  const img34Reveal = img34In - img34Out;

  // Stance bar fade out
  const stanceFadeOutPhase = Math.min(Math.max((scrollPx - STANCE_FADE_START) / Math.max(vh * 0.3, 1), 0), 1);
  const stanceOpacity = 1 - stanceFadeOutPhase;

  return (
    <section
      id="hero-trigger"
      className="relative w-full pt-20 sm:pt-24 pb-12 px-4 sm:px-6 md:px-12 pointer-events-none flex flex-col justify-start"
      style={{ height: `${SECTION_HEIGHT}px` }}
    >

      {/* Main content block */}
      <div className="relative z-30 pointer-events-auto max-w-xs sm:max-w-sm md:max-w-xl">

        <div className={`flex items-center space-x-2 text-[#00ff66] text-[10px] sm:text-xs tracking-widest mb-1 font-mono transition-all duration-[2000ms] delay-[800ms] ease-out transform ${isReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <span className="inline-block w-2 h-2 bg-[#00ff66]"></span>
          <span>SYSTEM READY // CST // COD4 PROTOCOL</span>
        </div>
        <h1 className={`mt-8 sm:mt-16 font-display text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tight text-white glow-text-green leading-none transition-all duration-[2500ms] delay-[1200ms] ease-out transform ${isReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          LAN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-emerald-400 to-teal-200">
            CHALLENGE
          </span>
        </h1>
        <p className={`mt-4 sm:mt-8 text-gray-300 max-w-xs sm:max-w-md text-xs sm:text-sm md:text-base leading-relaxed font-tactical transition-all duration-[2500ms] delay-[1600ms] ease-out transform ${isReady ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          Engage in zero-latency 5v5 tactical warfare. Organized by Computer Science &amp; Technology Degree Program.
        </p>

        <div className={`mt-4 sm:mt-6 transition-all duration-[2500ms] delay-[2000ms] ease-out transform ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CountdownTimer />
        </div>

      </div>

      {/* Vision & Strategy detail block */}
      <div
        className="fixed top-1/2 right-3 sm:right-6 md:right-12 w-[calc(50vw-1.5rem)] sm:w-full sm:max-w-xs md:max-w-sm pointer-events-auto flex flex-col items-end text-right"
        style={{
          opacity: detailOpacity,
          transform: `translate(${detailTranslateX}px, -50%)`,
          zIndex: 10,
          willChange: 'transform, opacity',
          pointerEvents: detailOpacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="pr-3 sm:pr-4 border-r-2 border-[#00ff66]/50">
          <div className="text-[9px] sm:text-xs font-mono tracking-widest text-[#00ff66] mb-1 sm:mb-2 uppercase">
            SYSTEM LOG // OBJECTIVE
          </div>
          <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
            Vision &amp; <span className="text-[#00ff66] glow-text-green">Strategy</span>
          </h2>
          <p className="text-gray-200 font-tactical text-[10px] sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md">
            Focus on the primary objective. Align your tactics with the core theme of the tournament, and maintain sharp awareness on the battlefield to secure victory.
          </p>
          <div className="flex items-center justify-end gap-2 mt-1 sm:mt-2">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#00ff66]/80 tracking-widest uppercase hidden sm:block">
              LINKED: GHOST OPTICAL SENSOR
            </span>
            <div className="w-6 sm:w-8 h-px bg-[#00ff66]/40" />
          </div>
          
          {/* Image 1: Vision & Strategy */}
          {img1Reveal > 0 && (
            <div className="relative w-full h-32 sm:h-48 md:h-56 mt-4 border border-[#00ff66]/30 overflow-hidden" style={{ clipPath: `inset(0 0 ${100 - img1Reveal * 100}% 0)` }}>
              <img src="/models/sniper.jpg" alt="Sniper" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
              <div className="absolute inset-0 bg-[#00ff66]/30 mix-blend-color"></div>
              <div className="absolute left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_8px_#00ff66]" style={{ top: `${img1Reveal * 100}%` }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Core Event detail block */}
      <div
        className="fixed top-1/2 left-3 sm:left-6 md:left-12 w-[calc(50vw-1.5rem)] sm:w-full sm:max-w-xs md:max-w-sm pointer-events-auto flex flex-col items-start text-left"
        style={{
          opacity: coreOpacity,
          transform: `translate(${coreTranslateX}px, -50%)`,
          zIndex: 10,
          willChange: 'transform, opacity',
          pointerEvents: coreOpacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="pl-3 sm:pl-4 border-l-2 border-emerald-400/50">
          <div className="text-[9px] sm:text-xs font-mono tracking-widest text-emerald-400 mb-1 sm:mb-2 uppercase">
            HEART OF THE BATTLE //
          </div>
          <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
            The <span className="text-emerald-400 glow-text-green">Core</span> Event
          </h2>
          <p className="text-gray-200 font-tactical text-[10px] sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md">
            Enter the central arena where the stakes are highest. Secure the prize pool and establish dominance supported by our primary sponsors.
          </p>
          <div className="flex items-center justify-start gap-2 mt-1 sm:mt-2">
            <div className="w-6 sm:w-8 h-px bg-emerald-400/40" />
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400/80 tracking-widest uppercase hidden sm:block">
              ARMOR PLATING SECURED
            </span>
          </div>

          {/* Image 2: Core Event */}
          {img2Reveal > 0 && (
            <div className="relative w-full h-32 sm:h-48 md:h-56 mt-4 border border-emerald-400/30 overflow-hidden" style={{ clipPath: `inset(0 0 ${100 - img2Reveal * 100}% 0)` }}>
              <img src="/models/gaming_event.jpg" alt="Event" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
              <div className="absolute inset-0 bg-emerald-400/30 mix-blend-color"></div>
              <div className="absolute left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_8px_#34d399]" style={{ top: `${img2Reveal * 100}%` }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Left Text Block (Arsenal) */}
      <div
        className="fixed top-1/2 left-3 sm:left-6 md:left-12 w-[calc(45vw-1rem)] sm:w-full sm:max-w-[220px] md:max-w-[300px] pointer-events-auto flex flex-col items-start text-left"
        style={{
          opacity: splitOpacity,
          transform: `translate(${splitLeftTranslateX}px, -50%)`,
          zIndex: 10,
          willChange: 'transform, opacity',
          pointerEvents: splitOpacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="pl-3 sm:pl-4 border-l-2 border-[#00ff66]/50">
          <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00ff66] mb-1 uppercase">
            LOADOUT // PREP
          </div>
          <h2 className="font-display text-base sm:text-xl md:text-3xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
            Tactical <span className="text-[#00ff66] glow-text-green">Arsenal</span>
          </h2>
          <p className="text-gray-200 font-tactical text-[10px] sm:text-xs leading-relaxed drop-shadow-md hidden sm:block">
            Equip the latest combat gear. Master your loadout and dominate the arena with superior firepower.
          </p>

          {/* Image 3: Tactical Arsenal */}
          {img34Reveal > 0 && (
            <div className="relative w-full h-28 sm:h-40 md:h-48 mt-4 border border-[#00ff66]/30 overflow-hidden" style={{ clipPath: `inset(0 0 ${100 - img34Reveal * 100}% 0)` }}>
              <img src="/models/wepons.jpg" alt="Weapons" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
              <div className="absolute inset-0 bg-[#00ff66]/30 mix-blend-color"></div>
              <div className="absolute left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_8px_#00ff66]" style={{ top: `${img34Reveal * 100}%` }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Right Text Block (Zones) */}
      <div
        className="fixed top-1/2 right-3 sm:right-6 md:right-12 w-[calc(45vw-1rem)] sm:w-full sm:max-w-[220px] md:max-w-[300px] pointer-events-auto flex flex-col items-end text-right"
        style={{
          opacity: splitOpacity,
          transform: `translate(${splitRightTranslateX}px, -50%)`,
          zIndex: 10,
          willChange: 'transform, opacity',
          pointerEvents: splitOpacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="pr-3 sm:pr-4 border-r-2 border-emerald-400/50">
          <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-emerald-400 mb-1 uppercase">
            MAPS // TERRAIN
          </div>
          <h2 className="font-display text-base sm:text-xl md:text-3xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
            Battle <span className="text-emerald-400 glow-text-green">Zones</span>
          </h2>
          <p className="text-gray-200 font-tactical text-[10px] sm:text-xs leading-relaxed drop-shadow-md hidden sm:block">
            Navigate complex environments. Use the terrain to your advantage and outmaneuver your opponents.
          </p>

          {/* Image 4: Battle Zones */}
          {img34Reveal > 0 && (
            <div className="relative w-full h-28 sm:h-40 md:h-48 mt-4 border border-emerald-400/30 overflow-hidden" style={{ clipPath: `inset(0 0 ${100 - img34Reveal * 100}% 0)` }}>
              <img src="/models/map_overheadwebp.jpg" alt="Map Overhead" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
              <div className="absolute inset-0 bg-emerald-400/30 mix-blend-color"></div>
              <div className="absolute left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_8px_#34d399]" style={{ top: `${img34Reveal * 100}%` }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll prompt and stance bar */}
      <div
        className={`absolute top-[78vh] left-1/2 transform -translate-x-1/2 text-center pointer-events-auto z-30 w-full px-4 sm:px-6 flex flex-col items-center transition-all duration-[2500ms] delay-[2400ms] ease-out ${isReady ? 'scale-100 opacity-100' : 'opacity-0 scale-95'}`}
        style={{ opacity: isReady ? stanceOpacity : 0 }}
      >
        <div className="text-[9px] sm:text-xs font-mono tracking-widest text-emerald-400 mb-2 animate-bounce uppercase">
          ▼ SCROLL DOWN TO READY WEAPONS ▼
        </div>
        <div className="w-44 sm:w-64 md:w-96 h-2 bg-gray-900 rounded-full overflow-hidden border border-emerald-500/40 p-0.5 mx-auto">
          <div
            id="stance-progress"
            className="h-full bg-gradient-to-r from-teal-500 via-[#00ff66] to-emerald-500 rounded-full transition-all duration-75"
            style={{ width: `${stancePercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-gray-400 w-44 sm:w-64 md:w-96 mx-auto mt-1">
          <span>CROUCH</span>
          <span className={stanceClass}>{stanceText}</span>
          <span>READY</span>
        </div>
      </div>

    </section>
  );
});
