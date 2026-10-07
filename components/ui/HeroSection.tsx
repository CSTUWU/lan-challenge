import { memo, useEffect, useState } from 'react';
import { CountdownTimer } from './CountdownTimer';

interface HeroSectionProps {
  stancePercentage: number;
  isReady?: boolean;
  scrollProgress?: number;
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

  // Dynamically compute scroll thresholds based on viewport height and width
  const [vh, setVh] = useState(800);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateDimensions = () => {
      setVh(window.innerHeight || 800);
      setIsMobile((window.innerWidth || 1024) < 640);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Use raw scrollY for precise pixel-based text timing, updated via dedicated listener
  const [scrollPx, setScrollPx] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPx(window.pageYOffset || document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === THRESHOLDS SCALED BY VIEWPORT HEIGHT ===
  // Desktop timeline vs Symmetrical Mobile timeline (Equal duration for all 4 cards)
  const T1_IN_START   = 0;
  const T1_IN_END     = isMobile ? vh * 0.8 : vh * 1.0;
  const T1_OUT_START  = isMobile ? vh * 1.6 : vh * 2.0;
  const T1_OUT_END    = isMobile ? vh * 2.4 : vh * 3.5;

  const T2_IN_START   = isMobile ? vh * 1.7 : vh * 2.3;
  const T2_IN_END     = isMobile ? vh * 2.5 : vh * 3.5;
  const T2_OUT_START  = isMobile ? vh * 3.3 : vh * 4.8;
  const T2_OUT_END    = isMobile ? vh * 4.1 : vh * 6.2;

  const T3_IN_START   = isMobile ? vh * 3.4 : vh * 5.2;
  const T3_IN_END     = isMobile ? vh * 4.2 : vh * 6.5;
  const T3_OUT_START  = isMobile ? vh * 5.0 : vh * 7.5;
  const T3_OUT_END    = isMobile ? vh * 5.8 : vh * 8.8;

  const T4_IN_START   = isMobile ? vh * 5.1 : vh * 5.2;
  const T4_IN_END     = isMobile ? vh * 5.9 : vh * 6.5;
  const T4_OUT_START  = isMobile ? vh * 6.7 : vh * 7.5;
  const T4_OUT_END    = isMobile ? vh * 7.5 : vh * 8.8;

  const STANCE_FADE_START = isMobile ? vh * 7.8 : vh * 8.5;
  const SECTION_HEIGHT    = isMobile ? vh * 7.8 : vh * 9.5;

  // Vision & Strategy text
  const slideXPhase    = Math.min(Math.max((scrollPx - T1_IN_START) / Math.max(T1_IN_END - T1_IN_START, 1), 0), 1);
  const slideXOutPhase = Math.min(Math.max((scrollPx - T1_OUT_START) / Math.max(T1_OUT_END - T1_OUT_START, 1), 0), 1);
  const detailOpacity    = slideXPhase - slideXOutPhase;
  const detailTranslateX = isMobile ? 0 : (1 - detailOpacity) * -80;
  const detailTranslateY = isMobile ? ((1 - slideXPhase) * 160 - slideXOutPhase * 280) : 0;

  // Core Event text
  const coreSlideInPhase  = Math.min(Math.max((scrollPx - T2_IN_START) / Math.max(T2_IN_END - T2_IN_START, 1), 0), 1);
  const coreSlideOutPhase = Math.min(Math.max((scrollPx - T2_OUT_START) / Math.max(T2_OUT_END - T2_OUT_START, 1), 0), 1);
  const coreOpacity      = coreSlideInPhase - coreSlideOutPhase;
  const coreTranslateX   = isMobile ? 0 : ((1 - coreSlideInPhase) * 80 + coreSlideOutPhase * 80);
  const coreTranslateY   = isMobile ? ((1 - coreSlideInPhase) * 160 - coreSlideOutPhase * 280) : 0;

  // Tactical Arsenal (Left text)
  const splitLeftInPhase   = Math.min(Math.max((scrollPx - T3_IN_START) / Math.max(T3_IN_END - T3_IN_START, 1), 0), 1);
  const splitLeftOutPhase  = Math.min(Math.max((scrollPx - T3_OUT_START) / Math.max(T3_OUT_END - T3_OUT_START, 1), 0), 1);
  const splitLeftOpacity   = splitLeftInPhase - splitLeftOutPhase;
  const splitLeftTranslateX = isMobile ? 0 : ((1 - splitLeftInPhase) * 80 + splitLeftOutPhase * 80);
  const splitLeftTranslateY = isMobile ? ((1 - splitLeftInPhase) * 160 - splitLeftOutPhase * 280) : 0;

  // Battle Zones (Right text)
  const splitRightInPhase   = Math.min(Math.max((scrollPx - T4_IN_START) / Math.max(T4_IN_END - T4_IN_START, 1), 0), 1);
  const splitRightOutPhase  = Math.min(Math.max((scrollPx - T4_OUT_START) / Math.max(T4_OUT_END - T4_OUT_START, 1), 0), 1);
  const splitRightOpacity   = splitRightInPhase - splitRightOutPhase;
  const splitRightTranslateX = isMobile ? 0 : ((1 - splitRightInPhase) * -80 - splitRightOutPhase * 80);
  const splitRightTranslateY = isMobile ? ((1 - splitRightInPhase) * 160 - splitRightOutPhase * 280) : 0;

  // Image Reveals (Scan animations)
  const img1In = Math.min(Math.max((scrollPx - T1_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img1Out = Math.min(Math.max((scrollPx - T1_OUT_START) / Math.max(T1_OUT_END - T1_OUT_START, 1), 0), 1);
  const img1Reveal = img1In - img1Out;

  const img2In = Math.min(Math.max((scrollPx - T2_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img2Out = Math.min(Math.max((scrollPx - T2_OUT_START) / Math.max(T2_OUT_END - T2_OUT_START, 1), 0), 1);
  const img2Reveal = img2In - img2Out;

  const img3In = Math.min(Math.max((scrollPx - T3_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img3Out = Math.min(Math.max((scrollPx - T3_OUT_START) / Math.max(T3_OUT_END - T3_OUT_START, 1), 0), 1);
  const img3Reveal = isMobile ? (img3In - img3Out) : (Math.min(Math.max((scrollPx - T3_IN_END) / Math.max(vh * 0.4, 1), 0), 1) - Math.min(Math.max((scrollPx - T3_OUT_START) / Math.max(T3_OUT_END - T3_OUT_START, 1), 0), 1));

  const img4In = Math.min(Math.max((scrollPx - T4_IN_END) / Math.max(vh * 0.4, 1), 0), 1);
  const img4Out = Math.min(Math.max((scrollPx - T4_OUT_START) / Math.max(T4_OUT_END - T4_OUT_START, 1), 0), 1);
  const img4Reveal = isMobile ? (img4In - img4Out) : img3Reveal;

  // Stance bar fade out
  const stanceFadeOutPhase = Math.min(Math.max((scrollPx - STANCE_FADE_START) / Math.max(vh * 0.3, 1), 0), 1);
  const stanceOpacity = 1 - stanceFadeOutPhase;

  return (
    <section
      id="hero-trigger"
      className="relative w-full pt-32 sm:pt-40 pb-12 px-6 md:px-16 pointer-events-none flex flex-col justify-start"
      style={{ height: `${SECTION_HEIGHT}px` }}
    >
      
      {/* Top text container (Matches page max width) */}
      <div className="w-full max-w-6xl mx-auto relative">
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
      </div>

      {/* --- CONTENT CONTAINER (MATCHES PAGE MAX WIDTH) --- */}
      <div className="fixed inset-0 pointer-events-none z-20 flex justify-center px-6 md:px-16">
        <div className="relative w-full max-w-6xl h-full">

          {/* Vision & Strategy detail block */}
          <div
            className="absolute top-[60%] sm:top-1/2 left-1/2 sm:left-auto sm:right-0 w-[calc(100vw-2.5rem)] max-w-[340px] sm:w-80 md:w-96 pointer-events-auto flex flex-col items-start sm:items-end text-left sm:text-right bg-[#050709]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-[#00ff66]/30 sm:border-none p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none"
            style={{
              opacity: detailOpacity,
              transform: isMobile
                ? `translate(calc(-50% + ${detailTranslateX}px), calc(-50% + ${detailTranslateY}px))`
                : `translate(${detailTranslateX}px, -50%)`,
              zIndex: 30,
              willChange: 'transform, opacity',
              pointerEvents: detailOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="pl-3 sm:pl-0 sm:pr-4 border-l-2 sm:border-l-0 sm:border-r-2 border-[#00ff66]/50">
              <div className="text-[10px] sm:text-xs font-mono tracking-widest text-[#00ff66] mb-1 sm:mb-2 uppercase">
                SYSTEM LOG // OBJECTIVE
              </div>
              <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
                Vision &amp; <span className="text-[#00ff66] glow-text-green">Strategy</span>
              </h2>
              <p className="text-gray-200 font-tactical text-xs sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md">
                Focus on the primary objective. Align your tactics with the core theme of the tournament, and maintain sharp awareness on the battlefield to secure victory.
              </p>
              <div className="flex items-center justify-start sm:justify-end gap-2 mt-1 sm:mt-2">
                <span className="text-[9px] sm:text-[10px] font-mono text-[#00ff66]/80 tracking-widest uppercase hidden sm:block">
                  LINKED: GHOST OPTICAL SENSOR
                </span>
                <div className="w-6 sm:w-8 h-px bg-[#00ff66]/40" />
              </div>
              
              {/* Image 1: Vision & Strategy */}
              {img1Reveal > 0 && (
                <div className="relative w-full h-36 sm:h-48 md:h-56 mt-2 sm:mt-4 border border-[#00ff66]/30 overflow-hidden rounded-lg sm:rounded-none" style={{ clipPath: `inset(0 0 ${100 - img1Reveal * 100}% 0)` }}>
                  <img src="/models/sniper.jpg" alt="Sniper" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
                  <div className="absolute inset-0 bg-[#00ff66]/30 mix-blend-color"></div>
                  <div className="absolute left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_8px_#00ff66]" style={{ top: `${img1Reveal * 100}%` }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Core Event detail block */}
          <div
            className="absolute top-[60%] sm:top-1/2 left-1/2 sm:left-0 w-[calc(100vw-2.5rem)] max-w-[340px] sm:w-80 md:w-96 pointer-events-auto flex flex-col items-start text-left bg-[#050709]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-emerald-400/30 sm:border-none p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none"
            style={{
              opacity: coreOpacity,
              transform: isMobile
                ? `translate(calc(-50% + ${coreTranslateX}px), calc(-50% + ${coreTranslateY}px))`
                : `translate(${coreTranslateX}px, -50%)`,
              zIndex: 30,
              willChange: 'transform, opacity',
              pointerEvents: coreOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="pl-3 sm:pl-4 border-l-2 border-emerald-400/50">
              <div className="text-[10px] sm:text-xs font-mono tracking-widest text-emerald-400 mb-1 sm:mb-2 uppercase">
                HEART OF THE BATTLE //
              </div>
              <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
                The <span className="text-emerald-400 glow-text-green">Core</span> Event
              </h2>
              <p className="text-gray-200 font-tactical text-xs sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md">
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
                <div className="relative w-full h-36 sm:h-48 md:h-56 mt-2 sm:mt-4 border border-emerald-400/30 overflow-hidden rounded-lg sm:rounded-none" style={{ clipPath: `inset(0 0 ${100 - img2Reveal * 100}% 0)` }}>
                  <img src="/models/gaming_event.jpg" alt="Event" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
                  <div className="absolute inset-0 bg-emerald-400/30 mix-blend-color"></div>
                  <div className="absolute left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_8px_#34d399]" style={{ top: `${img2Reveal * 100}%` }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Left Text Block (Arsenal) */}
          <div
            className="absolute top-[60%] sm:top-1/2 left-1/2 sm:left-0 w-[calc(100vw-2.5rem)] max-w-[340px] sm:w-80 md:w-96 pointer-events-auto flex flex-col items-start text-left bg-[#050709]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-[#00ff66]/30 sm:border-none p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none"
            style={{
              opacity: splitLeftOpacity,
              transform: isMobile
                ? `translate(calc(-50% + ${splitLeftTranslateX}px), calc(-50% + ${splitLeftTranslateY}px))`
                : `translate(${splitLeftTranslateX}px, -50%)`,
              zIndex: 30,
              willChange: 'transform, opacity',
              pointerEvents: splitLeftOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="pl-3 sm:pl-4 border-l-2 border-[#00ff66]/50">
              <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00ff66] mb-1 uppercase">
                LOADOUT // PREP
              </div>
              <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
                Tactical <span className="text-[#00ff66] glow-text-green">Arsenal</span>
              </h2>
              <p className="text-gray-200 font-tactical text-xs sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md block">
                Equip the latest combat gear. Master your loadout and dominate the arena with superior firepower.
              </p>

              {/* Image 3: Tactical Arsenal */}
              {img3Reveal > 0 && (
                <div className="relative w-full h-32 sm:h-48 md:h-56 mt-2 sm:mt-4 border border-[#00ff66]/30 overflow-hidden rounded-lg sm:rounded-none" style={{ clipPath: `inset(0 0 ${100 - img3Reveal * 100}% 0)` }}>
                  <img src="/models/wepons.jpg" alt="Weapons" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
                  <div className="absolute inset-0 bg-[#00ff66]/30 mix-blend-color"></div>
                  <div className="absolute left-0 w-full h-[2px] bg-[#00ff66] shadow-[0_0_8px_#00ff66]" style={{ top: `${img3Reveal * 100}%` }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Right Text Block (Zones) */}
          <div
            className="absolute top-[60%] sm:top-1/2 left-1/2 sm:left-auto sm:right-0 w-[calc(100vw-2.5rem)] max-w-[340px] sm:w-80 md:w-96 pointer-events-auto flex flex-col items-start sm:items-end text-left sm:text-right bg-[#050709]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-emerald-400/30 sm:border-none p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none"
            style={{
              opacity: splitRightOpacity,
              transform: isMobile
                ? `translate(calc(-50% + ${splitRightTranslateX}px), calc(-50% + ${splitRightTranslateY}px))`
                : `translate(${splitRightTranslateX}px, -50%)`,
              zIndex: 30,
              willChange: 'transform, opacity',
              pointerEvents: splitRightOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
        <div className="pl-3 sm:pl-0 sm:pr-4 border-l-2 sm:border-l-0 sm:border-r-2 border-emerald-400/50">
          <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-emerald-400 mb-1 uppercase">
            MAPS // TERRAIN
          </div>
          <h2 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-1 sm:mb-2 leading-none drop-shadow-md">
            Battle <span className="text-emerald-400 glow-text-green">Zones</span>
          </h2>
          <p className="text-gray-200 font-tactical text-xs sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md block">
            Navigate complex environments. Use the terrain to your advantage and outmaneuver your opponents.
          </p>

          {/* Image 4: Battle Zones */}
          {img4Reveal > 0 && (
            <div className="relative w-full h-32 sm:h-48 md:h-56 mt-2 sm:mt-4 border border-emerald-400/30 overflow-hidden rounded-lg sm:rounded-none" style={{ clipPath: `inset(0 0 ${100 - img4Reveal * 100}% 0)` }}>
              <img src="/models/map_overheadwebp.jpg" alt="Map Overhead" className="w-full h-full object-cover grayscale contrast-125 opacity-80" />
              <div className="absolute inset-0 bg-emerald-400/30 mix-blend-color"></div>
              <div className="absolute left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_8px_#34d399]" style={{ top: `${img4Reveal * 100}%` }}></div>
            </div>
          )}
        </div>
      </div>

        </div>
      </div>

      {/* Scroll prompt and stance bar removed */}

    </section>
  );
});
