'use client';

import { CountdownTimer } from './CountdownTimer';

interface HeroSectionProps {
  stancePercentage: number;
}

export function HeroSection({ stancePercentage }: HeroSectionProps) {
  let stanceText = 'HELMET SCAN: PATROL MODE';
  let stanceClass = 'text-gray-400 font-bold';

  if (stancePercentage >= 70) {
    stanceText = 'GHOST HELMET: TARGET LOCKED';
    stanceClass = 'text-[#00ff66] font-black glow-text-green';
  } else if (stancePercentage >= 30) {
    stanceText = '360° OPTICAL INSPECTION...';
    stanceClass = 'text-emerald-400 font-bold';
  }

  return (
    <section id="hero-trigger" className="relative w-full h-[140vh] flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 pointer-events-none">

      {/* Top content block */}
      <div className="relative z-10 pointer-events-auto max-w-xl">
        <div className="flex items-center space-x-2 text-[#00ff66] text-xs tracking-widest mb-1 font-mono">
          <span className="inline-block w-2 h-2 bg-[#00ff66]"></span>
          <span>SYSTEM READY // CST DEGREE PROGRAM // COD4 PROTOCOL</span>
        </div>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight text-white glow-text-green leading-none">
          LAN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] via-emerald-400 to-teal-200">
            CHALLENGE
          </span>
        </h1>
        <p className="mt-4 text-gray-300 max-w-md text-sm sm:text-base leading-relaxed font-tactical">
          Engage in zero-latency 5v5 tactical warfare. Organized by CST Degree Program. Crash, Crossfire, Backlot. Pure skill, zero excuses.
        </p>

        <CountdownTimer />
      </div>

      {/* Scroll prompt pinned at the bottom of the section */}
      <div className="relative z-10 absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-auto">
        <div className="text-xs font-mono tracking-widest text-emerald-400 mb-2 animate-bounce uppercase">
          ▼ SCROLL DOWN TO READY WEAPONS ▼
        </div>
        <div className="w-56 md:w-80 h-2 bg-gray-900 rounded-full overflow-hidden border border-emerald-500/40 p-0.5 mx-auto">
          <div
            id="stance-progress"
            className="h-full bg-gradient-to-r from-teal-500 via-[#00ff66] to-emerald-500 rounded-full transition-all duration-75"
            style={{ width: `${stancePercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-gray-400 w-56 md:w-80 mx-auto mt-1">
          <span>STANCE: CROUCH</span>
          <span className={stanceClass}>{stanceText}</span>
          <span>STANCE: COMBAT READY</span>
        </div>
      </div>
    </section>
  );
}

