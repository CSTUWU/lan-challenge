'use client';

import { Trophy, Swords, Zap } from 'lucide-react';

interface BracketTeam {
  name: string;
}

const colorThemes = {
  purple: {
    bg: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]',
    border: 'border-[#c084fc]',
    glow: 'shadow-[0_4px_14px_rgba(168,85,247,0.4)]',
    text: 'text-white',
  },
  orange: {
    bg: 'from-[#fb923c] via-[#f97316] to-[#ea580c]',
    border: 'border-[#fdba74]',
    glow: 'shadow-[0_4px_14px_rgba(249,115,22,0.4)]',
    text: 'text-white',
  },
  blue: {
    bg: 'from-[#38bdf8] via-[#0ea5e9] to-[#0284c7]',
    border: 'border-[#7dd3fc]',
    glow: 'shadow-[0_4px_14px_rgba(14,165,233,0.4)]',
    text: 'text-white',
  },
  red: {
    bg: 'from-[#f87171] via-[#ef4444] to-[#dc2626]',
    border: 'border-[#fca5a5]',
    glow: 'shadow-[0_4px_14px_rgba(239,68,68,0.4)]',
    text: 'text-white',
  },
};

function Box({
  team,
  theme,
  isLarge = false,
  subLabel,
}: {
  team: BracketTeam;
  theme: 'purple' | 'orange' | 'blue' | 'red';
  isLarge?: boolean;
  subLabel?: string;
}) {
  const t = colorThemes[theme];
  return (
    <div
      className={`relative rounded-md bg-gradient-to-r ${t.bg} border-t-2 border-l border-r border-b-2 ${t.border} ${t.glow} flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer select-none ${
        isLarge ? 'w-28 sm:w-36 h-9 sm:h-11' : 'w-20 sm:w-24 h-6 sm:h-7'
      }`}
    >
      <span className="font-mono text-[9px] sm:text-[11px] font-black tracking-wider text-white truncate px-1 text-center drop-shadow-sm">
        {team.name}
      </span>
      {subLabel && (
        <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-widest text-white/80 -mt-0.5">
          {subLabel}
        </span>
      )}
    </div>
  );
}

export function TournamentPlayoffBracket() {
  return (
    <section className="mt-12 hud-border bg-[#0b0e14]/90 rounded-xl border border-[#00ff66]/30 p-6 md:p-8 relative overflow-hidden">
      {/* Main SVG & HTML Interactive Diagram */}
      <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-emerald-500/40">
        <div className="min-w-[940px] max-w-[1080px] mx-auto relative px-2">
          
          {/* Exact Connector Line SVG Canvas matching the reference image layout */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="blueGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="redGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f87171" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* ====== LEFT: PURPLE (TOP) ====== */}
            {/* Box 1 (y=40) & Box 2 (y=84) -> Branch to Quarter 1 (y=62) */}
            <path d="M 120 40 H 145 V 84 H 120 M 145 62 H 170" fill="none" stroke="url(#purpleGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Box 3 (y=128) & Box 4 (y=172) -> Branch to Quarter 2 (y=150) */}
            <path d="M 120 128 H 145 V 172 H 120 M 145 150 H 170" fill="none" stroke="url(#purpleGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Quarter 1 (y=62) & Quarter 2 (y=150) -> Branch to Purple Semifinal (y=210) */}
            <path d="M 270 62 H 300 V 150 H 270 M 300 106 H 320 V 210 H 345" fill="none" stroke="url(#purpleGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* ====== LEFT: ORANGE (BOTTOM) ====== */}
            {/* Box 5 (y=276) & Box 6 (y=320) -> Branch to Quarter 3 (y=298) */}
            <path d="M 120 276 H 145 V 320 H 120 M 145 298 H 170" fill="none" stroke="url(#orangeGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Box 7 (y=364) & Box 8 (y=408) -> Branch to Quarter 4 (y=386) */}
            <path d="M 120 364 H 145 V 408 H 120 M 145 386 H 170" fill="none" stroke="url(#orangeGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Quarter 3 (y=298) & Quarter 4 (y=386) -> Branch to Orange Semifinal (y=265) */}
            <path d="M 270 298 H 300 V 386 H 270 M 300 342 H 320 V 265 H 345" fill="none" stroke="url(#orangeGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* ====== LEFT SEMIS TO FINAL ====== */}
            {/* Purple Semi (x=465, y=210) & Orange Semi (x=465, y=265) -> Left Finalist slot */}
            <path d="M 465 210 H 480 V 237 H 495" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 465 265 H 480 V 237" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />

            {/* ====== RIGHT: BLUE (TOP) ====== */}
            {/* Box 9 (y=40) & Box 10 (y=84) -> Branch to Quarter 5 (y=62) */}
            <path d="M 880 40 H 855 V 84 H 880 M 855 62 H 830" fill="none" stroke="url(#blueGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Box 11 (y=128) & Box 12 (y=172) -> Branch to Quarter 6 (y=150) */}
            <path d="M 880 128 H 855 V 172 H 880 M 855 150 H 830" fill="none" stroke="url(#blueGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Quarter 5 (y=62) & Quarter 6 (y=150) -> Branch to Blue Semifinal (y=210) */}
            <path d="M 730 62 H 700 V 150 H 730 M 700 106 H 680 V 210 H 655" fill="none" stroke="url(#blueGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* ====== RIGHT: RED (BOTTOM) ====== */}
            {/* Box 13 (y=276) & Box 14 (y=320) -> Branch to Quarter 7 (y=298) */}
            <path d="M 880 276 H 855 V 320 H 880 M 855 298 H 830" fill="none" stroke="url(#redGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Box 15 (y=364) & Box 16 (y=408) -> Branch to Quarter 8 (y=386) */}
            <path d="M 880 364 H 855 V 408 H 880 M 855 386 H 830" fill="none" stroke="url(#redGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Quarter 7 (y=298) & Quarter 8 (y=386) -> Branch to Red Semifinal (y=265) */}
            <path d="M 730 298 H 700 V 386 H 730 M 700 342 H 680 V 265 H 655" fill="none" stroke="url(#redGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* ====== RIGHT SEMIS TO FINAL ====== */}
            {/* Blue Semi (x=535, y=210) & Red Semi (x=535, y=265) -> Right Finalist slot */}
            <path d="M 535 210 H 520 V 237 H 505" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 535 265 H 520 V 237" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

            {/* Finals connector between finalist 1 and finalist 2 */}
            <line x1="500" y1="210" x2="500" y2="280" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3 3" />
          </svg>

          {/* HTML Bracket Node Elements placed with exact percentage coordinates matching the SVG paths */}
          <div className="relative h-[500px] w-full z-10">

            {/* ====== COLUMN 1 (LEFT OUTER): 8 TEAMS (4 PURPLE, 4 ORANGE) ====== */}
            {/* Purple R1 */}
            <div className="absolute left-[2%] top-[25px]"><Box team={{ name: 'GHOST REAPERS' }} theme="purple" /></div>
            <div className="absolute left-[2%] top-[68px]"><Box team={{ name: 'SHADOW VIPERS' }} theme="purple" /></div>
            <div className="absolute left-[2%] top-[112px]"><Box team={{ name: 'NIGHT SPECTRES' }} theme="purple" /></div>
            <div className="absolute left-[2%] top-[156px]"><Box team={{ name: 'VALKYRIE 5' }} theme="purple" /></div>

            {/* Orange R1 */}
            <div className="absolute left-[2%] top-[260px]"><Box team={{ name: 'APEX HUNTERS' }} theme="orange" /></div>
            <div className="absolute left-[2%] top-[304px]"><Box team={{ name: 'DESERT FOXES' }} theme="orange" /></div>
            <div className="absolute left-[2%] top-[348px]"><Box team={{ name: 'TITAN SQUAD' }} theme="orange" /></div>
            <div className="absolute left-[2%] top-[392px]"><Box team={{ name: 'CYBER FORCE' }} theme="orange" /></div>


            {/* ====== COLUMN 2 (LEFT QUARTER-FINALS): 2 PURPLE, 2 ORANGE ====== */}
            <div className="absolute left-[17%] top-[46px]"><Box team={{ name: 'GHOST REAPERS' }} theme="purple" /></div>
            <div className="absolute left-[17%] top-[134px]"><Box team={{ name: 'NIGHT SPECTRES' }} theme="purple" /></div>

            <div className="absolute left-[17%] top-[282px]"><Box team={{ name: 'APEX HUNTERS' }} theme="orange" /></div>
            <div className="absolute left-[17%] top-[370px]"><Box team={{ name: 'TITAN SQUAD' }} theme="orange" /></div>


            {/* ====== COLUMN 3 (LEFT SEMI-FINALS): 1 PURPLE, 1 ORANGE ====== */}
            <div className="absolute left-[34%] top-[192px]"><Box team={{ name: 'GHOST REAPERS' }} theme="purple" subLabel="SEMIFINAL" /></div>
            <div className="absolute left-[34%] top-[248px]"><Box team={{ name: 'TITAN SQUAD' }} theme="orange" subLabel="SEMIFINAL" /></div>


            {/* ====== CENTER: TROPHY + GRAND FINAL MATCHUP ====== */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[80px] flex flex-col items-center z-20">
              {/* Silver Trophy Image / Icon */}
              <div className="relative flex flex-col items-center group mb-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                  <Trophy className="w-9 h-9 text-slate-100 drop-shadow-[0_0_12px_#ffffff]" />
                </div>
                <span className="font-display font-black text-sm tracking-widest text-white uppercase mt-1 glow-text-green">
                  FINAL
                </span>
              </div>

              {/* Finals Top Slot (Orange / Left Winner) */}
              <div className="mb-2">
                <Box team={{ name: 'GHOST REAPERS' }} theme="orange" isLarge subLabel="CHAMPIONSHIP" />
              </div>

              {/* Finals Bottom Slot (Blue / Right Winner) */}
              <div>
                <Box team={{ name: 'ALPHA PROTOCOL' }} theme="blue" isLarge subLabel="CHAMPIONSHIP" />
              </div>
            </div>


            {/* ====== COLUMN 4 (RIGHT SEMI-FINALS): 1 BLUE, 1 RED ====== */}
            <div className="absolute right-[34%] top-[192px]"><Box team={{ name: 'ALPHA PROTOCOL' }} theme="blue" subLabel="SEMIFINAL" /></div>
            <div className="absolute right-[34%] top-[248px]"><Box team={{ name: 'BRAVO SPECTRES' }} theme="red" subLabel="SEMIFINAL" /></div>


            {/* ====== COLUMN 5 (RIGHT QUARTER-FINALS): 2 BLUE, 2 RED ====== */}
            <div className="absolute right-[17%] top-[46px]"><Box team={{ name: 'ALPHA PROTOCOL' }} theme="blue" /></div>
            <div className="absolute right-[17%] top-[134px]"><Box team={{ name: 'DELTA FORCES' }} theme="blue" /></div>

            <div className="absolute right-[17%] top-[282px]"><Box team={{ name: 'BRAVO SPECTRES' }} theme="red" /></div>
            <div className="absolute right-[17%] top-[370px]"><Box team={{ name: 'OMEGA PROTOCOL' }} theme="red" /></div>


            {/* ====== COLUMN 6 (RIGHT OUTER): 8 TEAMS (4 BLUE, 4 RED) ====== */}
            {/* Blue R1 */}
            <div className="absolute right-[2%] top-[25px]"><Box team={{ name: 'ALPHA PROTOCOL' }} theme="blue" /></div>
            <div className="absolute right-[2%] top-[68px]"><Box team={{ name: 'VORTEX CREW' }} theme="blue" /></div>
            <div className="absolute right-[2%] top-[112px]"><Box team={{ name: 'DELTA FORCES' }} theme="blue" /></div>
            <div className="absolute right-[2%] top-[156px]"><Box team={{ name: 'IRON CLAD 5' }} theme="blue" /></div>

            {/* Red R1 */}
            <div className="absolute right-[2%] top-[260px]"><Box team={{ name: 'BRAVO SPECTRES' }} theme="red" /></div>
            <div className="absolute right-[2%] top-[304px]"><Box team={{ name: 'PHANTOM UNIT' }} theme="red" /></div>
            <div className="absolute right-[2%] top-[348px]"><Box team={{ name: 'OMEGA PROTOCOL' }} theme="red" /></div>
            <div className="absolute right-[2%] top-[392px]"><Box team={{ name: 'RAVEN CLAN' }} theme="red" /></div>

          </div>
        </div>
      </div>


    </section>
  );
}
