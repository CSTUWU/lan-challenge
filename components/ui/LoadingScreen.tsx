'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  statusText?: string;
  isComplete: boolean;
}

const MIN_LOADING_TIME = 3200;

// Log lines matching the left side terminal in the target image
const LEFT_CONSOLE_LOGS = [
  '[SYS_INIT]: Connecting to network...',
  '[SYS_INIT]: Connecting to network...',
  '[SYS_INIT]: Connecting to network...',
  '[PROTOCOL]: Handshake [OK]',
  '[SYS_INIT]: Handshake neagicaved...',
  '[SYS_INIT]: Handshaketevaie..dutes..',
  '[PROTOCOL]: Handshake [OK]',
  '[PROTOCOL]: Handshake [OK]',
  '[MAP_LOAD]: de_arena_main.cst',
  '[SYS_INIT]: Connecting to network...',
  '',
  '[PROTOCOL]: Handshake [OK]',
  '[PROTOCOL]: Handshake [OK]',
  '[PROTOCOL]: Handshake [OK]',
  '',
  '[SYS_INIT]: Connecting network...',
  'Passwed!',
  '',
  '[MAP_LOAD]: de_arena_main.cst',
  '[MAP_LOAD]: eembared',
  '[MAP_LOAD]: de_arena_main.cst',
  '[MAP_LOAD]: de_arena_main.cst',
  '',
  '[SYS_INIT]: Connecting to network...',
  '[PROTOCOL]: Handshake [OK]',
  '[SYS_INIT]: Connectan data_data',
  '[SYS_INIT]: Raooostnafloat_sreeamAt..',
  '[PROTOCOL]: Handshake [OK]',
  '[PROTOCOL]: Handshake [OK]',
  '[PROTOCOL]: Handshake [OK]',
  '',
  '[SYS_INIT]: Connecting to network...',
  '[PROTOCOL]:',
  '',
  '[MAP_LOAD]: de_arena_main.cst',
  '[PROTOCOL]: Handshake [OK]',
  '[MAP_LOAD]: Handshake [OK]',
  '[MAP_LOAD]: de_arena_main.cst',
];

// Log lines matching the right side terminal in the target image
const RIGHT_CONSOLE_LOGS = [
  '[MAP_LOAD]: de_arena_main.cst',
  '[MAP_LOAD]: aoox...',
  '',
  '[MARP_LOAD]: de_arena_main.cst',
  '',
  '[MAP_LOAD]: de_arena_main.cst',
  '[MAP_HGARG]: de:arena_woost',
  '[MAP_LOADS]: packet',
  '',
  '[MARP_LOAD]: .texmninate!add',
  '[MAP_HORRD]: packtet_shoea.nead',
  '[MAP_NOARE]: success',
  '',
  '[MAP_LOAD]: de_arena_main.cst',
];

export function LoadingScreen({ progress, isComplete }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [visibleLeftCount, setVisibleLeftCount] = useState(6);
  const [visibleRightCount, setVisibleRightCount] = useState(3);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
    const interval = setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
      const timeTarget = Math.min(95, Math.round((elapsed / MIN_LOADING_TIME) * 95));
      const target = isComplete ? 100 : Math.max(timeTarget, Math.min(progress, 95));

      setDisplayProgress((current) => {
        if (current >= target) return current;
        const step = Math.max(1, Math.round((target - current) * 0.16));
        return Math.min(target, current + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [progress, isComplete]);

  // Reveal log lines progressively as loading percentage increments
  useEffect(() => {
    const totalLeft = LEFT_CONSOLE_LOGS.length;
    const totalRight = RIGHT_CONSOLE_LOGS.length;
    const fraction = displayProgress / 100;

    setVisibleLeftCount(Math.min(totalLeft, Math.max(8, Math.floor(fraction * totalLeft * 1.25))));
    setVisibleRightCount(Math.min(totalRight, Math.max(4, Math.floor(fraction * totalRight * 1.35))));
  }, [displayProgress]);

  useEffect(() => {
    if (!isComplete) return;

    const fadeTimer = setTimeout(() => setIsFading(true), 600);
    const unmountTimer = setTimeout(() => setIsMounted(false), 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [isComplete]);

  if (!isMounted) return null;

  return (
    <div
      id="loader-screen"
      className={`fixed inset-0 z-[100] overflow-hidden select-none bg-[#030706] text-[#00ff66] transition-opacity duration-700 font-mono ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Esports Arena Scene */}
      <Image
        src="/models/gaming_event.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="loader-bg object-cover opacity-20 filter saturate-[0.6] contrast-125"
      />

      {/* Deep dark green military/cyber tint overlays */}
      <div className="absolute inset-0 bg-[#020704]/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020704]/90 via-transparent to-[#010603]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,102,0.09)_0%,transparent_70%)] pointer-events-none" />

      {/* CRT Scanline overlay effect with soft opacity */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0, 255, 102, 0.05) 0px, rgba(0, 255, 102, 0.05) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Moving scan beam */}
      <div className="loader-scanline absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#00ff66]/10 to-transparent pointer-events-none" />

      {/* Top Header Label: "COMPUTER SCIENCE & TECHNOLOGY" */}
      <div className="absolute top-6 left-0 right-0 z-20 text-center">
        <h2 className="text-[11px] sm:text-xs md:text-sm tracking-[0.45em] sm:tracking-[0.55em] font-mono uppercase text-[#38b26e] opacity-90 drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]">
          COMPUTER SCIENCE &amp; TECHNOLOGY
        </h2>
      </div>

      {/* Main Center Stage: Big LAN CHALLENGE Title + Subtle Circuit Traces + Center Podium */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-6xl h-[75vh] flex items-center justify-center px-4">
          {/* Prominent LAN CHALLENGE center title */}
          <div className="relative z-30 flex flex-col items-center justify-center text-center select-none">
            {/* Center Glowing Trophy / Crest Icon Silhouette (subtle above text) */}
            <div className="mb-3 opacity-60 filter drop-shadow-[0_0_12px_rgba(0,255,102,0.6)]">
              <svg
                width="48"
                height="56"
                viewBox="0 0 72 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#55f899] text-[#22c55e]"
              >
                <path
                  d="M36 4L14 14V38C14 56 24 69 36 78C48 69 58 56 58 38V14L36 4Z"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                  fill="url(#podiumGlow)"
                  fillOpacity="0.25"
                />
                <path
                  d="M26 28C26 22.4772 30.4772 18 36 18C41.5228 18 46 22.4772 46 28C46 32.5 43.5 36 41 38V44H31V38C28.5 36 26 32.5 26 28Z"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                />
                <circle cx="31" cy="27" r="2" fill="#a7f3d0" />
                <circle cx="41" cy="27" r="2" fill="#a7f3d0" />
                <path d="M33 37H39M32 41H40" strokeWidth="1" strokeLinecap="round" />
                <path d="M36 44V56M28 56H44" strokeWidth="1.2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="podiumGlow" x1="36" y1="4" x2="36" y2="78" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00ff66" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#022c15" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* BIG LAN CHALLENGE HEADER */}
            <h1
              className="font-display font-black tracking-[0.08em] sm:tracking-[0.14em] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#00ff66] transition-all duration-300"
              style={{
                textShadow:
                  '0 0 10px rgba(0, 255, 102, 0.9), 0 0 25px rgba(0, 255, 102, 0.5), 0 0 50px rgba(0, 255, 102, 0.25)',
              }}
            >
              LAN<span className="text-[#38b26e] font-light mx-1">:</span>CHALLENGE
            </h1>

            {/* Subtle subline */}
            <div className="mt-2 flex items-center justify-center space-x-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.45em] text-[#00ff66]/70">
              <span className="w-6 sm:w-10 h-[1px] bg-[#00ff66]/40" />
              <span>Tactical Warfare System</span>
              <span className="w-6 sm:w-10 h-[1px] bg-[#00ff66]/40" />
            </div>

            {/* Ambient radiating green glow behind title */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,255,102,0.18)_0%,transparent_70%)] blur-2xl" />
          </div>

          {/* Symmetrical Circuit Board Traces with reduced opacity */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-45">
            <svg
              viewBox="0 0 1000 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[520px] stroke-[#00ff66] drop-shadow-[0_0_4px_rgba(0,255,102,0.4)]"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="traceGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ff66" stopOpacity="0.2" />
                  <stop offset="60%" stopColor="#00ff66" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#86efac" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="traceGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00ff66" stopOpacity="0.2" />
                  <stop offset="60%" stopColor="#00ff66" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#86efac" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Central Hexagonal Core Frame */}
              <g stroke="#00ff66" strokeWidth="1.2" opacity="0.6">
                <polygon points="460,180 540,180 575,260 540,340 460,340 425,260" fill="none" strokeDasharray="3 3" />
                <rect x="445" y="160" width="110" height="200" stroke="#00ff66" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="425" y1="260" x2="400" y2="260" strokeWidth="1.5" />
                <line x1="575" y1="260" x2="600" y2="260" strokeWidth="1.5" />
              </g>

              {/* LEFT SIDE CIRCUIT BUS LINES (Spanning outwards towards the left terminal logs) */}
              <g stroke="url(#traceGradLeft)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                {/* Circuit Line 1 */}
                <path d="M 440 190 L 410 190 L 380 160 L 260 160 L 230 130 L 150 130" />
                <circle cx="150" cy="130" r="2.5" fill="#00ff66" />
                <circle cx="260" cy="160" r="1.5" fill="#00ff66" />

                {/* Circuit Line 2 */}
                <path d="M 435 205 L 395 205 L 365 175 L 290 175 L 260 145 L 180 145" />
                <circle cx="180" cy="145" r="2" fill="#00ff66" />

                {/* Circuit Line 3 */}
                <path d="M 430 220 L 380 220 L 350 190 L 270 190 L 240 160 L 170 160 L 140 190 L 100 190" />
                <circle cx="100" cy="190" r="2.5" fill="#00ff66" />

                {/* Circuit Line 4 */}
                <path d="M 425 235 L 370 235 L 340 205 L 280 205 L 250 220 L 190 220" />
                <circle cx="190" cy="220" r="2" fill="#00ff66" />

                {/* Circuit Line 5 (Horizontal Spine) */}
                <path d="M 425 260 L 360 260 L 330 240 L 240 240 L 210 270 L 130 270" />
                <circle cx="130" cy="270" r="2.5" fill="#00ff66" />
                <circle cx="330" cy="240" r="1.5" fill="#00ff66" />

                {/* Circuit Line 6 */}
                <path d="M 425 285 L 365 285 L 335 305 L 255 305 L 225 335 L 150 335" />
                <circle cx="150" cy="335" r="2" fill="#00ff66" />

                {/* Circuit Line 7 */}
                <path d="M 430 300 L 380 300 L 350 330 L 280 330 L 250 360 L 170 360" />
                <circle cx="170" cy="360" r="2.5" fill="#00ff66" />

                {/* Circuit Line 8 */}
                <path d="M 435 315 L 390 315 L 360 345 L 300 345 L 270 375 L 190 375 L 160 405 L 120 405" />
                <circle cx="120" cy="405" r="2" fill="#00ff66" />

                {/* Circuit Line 9 */}
                <path d="M 440 330 L 410 330 L 375 365 L 320 365 L 290 395 L 210 395" />
                <circle cx="210" cy="395" r="2.5" fill="#00ff66" />

                {/* Stepped vertical connection nodes */}
                <line x1="380" y1="160" x2="380" y2="180" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="290" y1="175" x2="290" y2="195" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="255" y1="305" x2="255" y2="325" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="350" y1="330" x2="350" y2="350" strokeWidth="0.8" strokeOpacity="0.5" />
              </g>

              {/* RIGHT SIDE CIRCUIT BUS LINES (Spanning outwards towards the right terminal logs) */}
              <g stroke="url(#traceGradRight)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                {/* Circuit Line 1 */}
                <path d="M 560 190 L 590 190 L 620 160 L 740 160 L 770 130 L 850 130" />
                <circle cx="850" cy="130" r="2.5" fill="#00ff66" />
                <circle cx="740" cy="160" r="1.5" fill="#00ff66" />

                {/* Circuit Line 2 */}
                <path d="M 565 205 L 605 205 L 635 175 L 710 175 L 740 145 L 820 145" />
                <circle cx="820" cy="145" r="2" fill="#00ff66" />

                {/* Circuit Line 3 */}
                <path d="M 570 220 L 620 220 L 650 190 L 730 190 L 760 160 L 830 160 L 860 190 L 900 190" />
                <circle cx="900" cy="190" r="2.5" fill="#00ff66" />

                {/* Circuit Line 4 */}
                <path d="M 575 235 L 630 235 L 660 205 L 720 205 L 750 220 L 810 220" />
                <circle cx="810" cy="220" r="2" fill="#00ff66" />

                {/* Circuit Line 5 (Horizontal Spine) */}
                <path d="M 575 260 L 640 260 L 670 240 L 760 240 L 790 270 L 870 270" />
                <circle cx="870" cy="270" r="2.5" fill="#00ff66" />
                <circle cx="670" cy="240" r="1.5" fill="#00ff66" />

                {/* Circuit Line 6 */}
                <path d="M 575 285 L 635 285 L 665 305 L 745 305 L 775 335 L 850 335" />
                <circle cx="850" cy="335" r="2" fill="#00ff66" />

                {/* Circuit Line 7 */}
                <path d="M 570 300 L 620 300 L 650 330 L 720 330 L 750 360 L 830 360" />
                <circle cx="830" cy="360" r="2.5" fill="#00ff66" />

                {/* Circuit Line 8 */}
                <path d="M 565 315 L 610 315 L 640 345 L 700 345 L 730 375 L 810 375 L 840 405 L 880 405" />
                <circle cx="880" cy="405" r="2" fill="#00ff66" />

                {/* Circuit Line 9 */}
                <path d="M 560 330 L 590 330 L 625 365 L 680 365 L 710 395 L 790 395" />
                <circle cx="790" cy="395" r="2.5" fill="#00ff66" />

                {/* Stepped vertical connection nodes */}
                <line x1="620" y1="160" x2="620" y2="180" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="710" y1="175" x2="710" y2="195" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="745" y1="305" x2="745" y2="325" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="650" y1="330" x2="650" y2="350" strokeWidth="0.8" strokeOpacity="0.5" />
              </g>

              {/* Data pulse nodes blinking along lines */}
              <circle cx="340" cy="205" r="2" fill="#86efac" className="loader-blink" />
              <circle cx="660" cy="205" r="2" fill="#86efac" className="loader-blink" />
              <circle cx="210" cy="270" r="2" fill="#86efac" className="loader-blink" />
              <circle cx="790" cy="270" r="2" fill="#86efac" className="loader-blink" />
            </svg>
          </div>
        </div>
      </div>

      {/* LEFT TERMINAL LOG COLUMN (Identical to image) */}
      <div className="absolute left-4 sm:left-8 md:left-14 top-16 sm:top-20 bottom-24 z-20 w-72 sm:w-80 md:w-96 overflow-hidden pointer-events-none flex flex-col justify-start">
        <div className="space-y-0.5 text-[10px] sm:text-[11px] md:text-[12px] leading-[1.35] tracking-wide text-[#34d399]/85 font-mono drop-shadow-[0_0_6px_rgba(0,255,102,0.5)]">
          {LEFT_CONSOLE_LOGS.slice(0, visibleLeftCount).map((log, idx) => {
            const isOk = log.includes('[OK]');
            const isMap = log.includes('[MAP_LOAD]');
            const isPass = log.includes('Passwed!') || log.includes('success');

            return (
              <div
                key={`left-log-${idx}`}
                className={`transition-opacity duration-200 ${
                  log === '' ? 'h-2' : ''
                } ${
                  isOk
                    ? 'text-[#00ff66]'
                    : isPass
                    ? 'text-[#a7f3d0] font-bold'
                    : isMap
                    ? 'text-[#4ade80]'
                    : 'text-[#10b981]/80'
                }`}
              >
                {log}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT TERMINAL LOG COLUMN (Identical to image) */}
      <div className="absolute right-4 sm:right-8 md:right-14 top-24 sm:top-28 bottom-24 z-20 w-64 sm:w-72 md:w-88 overflow-hidden pointer-events-none flex flex-col justify-start items-end text-right">
        <div className="space-y-0.5 text-[10px] sm:text-[11px] md:text-[12px] leading-[1.35] tracking-wide text-[#34d399]/85 font-mono drop-shadow-[0_0_6px_rgba(0,255,102,0.5)]">
          {RIGHT_CONSOLE_LOGS.slice(0, visibleRightCount).map((log, idx) => {
            const isSuccess = log.includes('success');
            return (
              <div
                key={`right-log-${idx}`}
                className={`transition-opacity duration-200 ${log === '' ? 'h-2' : ''} ${
                  isSuccess ? 'text-[#a7f3d0] font-bold' : 'text-[#34d399]/80'
                }`}
              >
                {log}
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER BOTTOM PROGRESS READOUT & SLIM PROGRESS BAR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center w-full max-w-sm px-6">
        {/* Large Digital Glowing Percentage Counter (e.g. "0%", "45%", "100%") */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-wider text-[#00ff66] drop-shadow-[0_0_16px_rgba(0,255,102,0.85)] mb-3">
          {displayProgress}%
        </div>

        {/* Minimal horizontal progress bar */}
        <div className="relative w-full h-[3px] bg-[#0d2818] rounded-none overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#00ff66] shadow-[0_0_10px_#00ff66] transition-[width] duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Subtle sub-percentage echo directly below bar as in the reference image */}
        <div className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#00ff66]/70">
          {displayProgress}%
        </div>
      </div>

      {/* Bottom Left Watermark / Logo Circle (N Badge as seen in reference image) */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-[#00ff66]/40 bg-[#030d07]/80 flex items-center justify-center text-[#00ff66] text-xs font-mono font-bold shadow-[0_0_10px_rgba(0,255,102,0.2)]">
          N
        </div>
      </div>
    </div>
  );
}
