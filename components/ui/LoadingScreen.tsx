'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  statusText: string;
  isComplete: boolean;
}

const MIN_LOADING_TIME = 3000;

export function LoadingScreen({ progress, isComplete }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
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
        const step = Math.max(1, Math.round((target - current) * 0.18));
        return Math.min(target, current + step);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress, isComplete]);

  useEffect(() => {
    if (!isComplete) return;

    const fadeTimer = setTimeout(() => setIsFading(true), 500);
    const unmountTimer = setTimeout(() => setIsMounted(false), 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [isComplete]);

  if (!isMounted) return null;

  return (
    <div
      id="loader-screen"
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#050709] text-white transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Esports arena texture backdrop */}
      <Image
        src="/models/gaming_event.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="loader-bg object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[#050709]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050709]/80 via-transparent to-[#050709]" />

      {/* Clean radial green vignette background without harsh grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,102,0.08),transparent_70%)]" />

      {/* Slow drifting ambient glow */}
      <div className="loader-glow absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,255,102,0.16),transparent_65%)]" />

      {/* Faint moving scanline */}
      <div className="loader-scanline absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#00ff66]/8 to-transparent" />

      {/* Center brand */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <h1 className="glow-text-green text-center font-display text-4xl font-black uppercase tracking-wider text-[#00ff66] sm:text-6xl md:text-7xl lg:text-8xl">
          LAN<span className="font-light">:</span>CHALLENGE
        </h1>

        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[#00ff66]/70 sm:text-xs">
          Computer Science &amp; Technology
        </p>
      </div>

      {/* Minimal progress readout */}
      <div className="absolute bottom-12 left-1/2 z-10 w-full max-w-xs -translate-x-1/2 px-6">
        <div className="relative h-1 overflow-hidden rounded-full bg-[#0b0e14]">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 via-[#00ff66] to-emerald-300 transition-[width] duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <div className="mt-2 text-center font-mono text-[10px] tracking-[0.3em] text-[#00ff66]/80">
          {displayProgress}%
        </div>
      </div>
    </div>
  );
}
