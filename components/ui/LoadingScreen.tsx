'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  progress: number;
  statusText: string;
  isComplete: boolean;
}

const LOADING_IMAGES = [
  { src: '/models/ghost_placeholder.webp', label: 'HELMET MESH' },
  { src: '/models/ghost_placeholder2.webp', label: 'CROSSHAIR HUD' },
  { src: '/models/ghost_placeholder3.webp', label: 'COMMAND EMBLEM' },
];

export function LoadingScreen({ progress, statusText, isComplete }: LoadingScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Rotate tactical theme images every 1.6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LOADING_IMAGES.length);
    }, 1600);
    return () => clearInterval(timer);
  }, []);

  // Smooth realistic progress bar: climbs smoothly up to 90%, holds at 90%, then fills to 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((current) => {
        if (progress >= 100) {
          if (current < 100) return Math.min(100, current + 5);
          return 100;
        } else {
          const target = Math.min(90, Math.max(progress, 90));
          if (current < target) {
            return Math.min(target, current + Math.max(1, Math.round((target - current) * 0.12)));
          }
          return current;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  if (isComplete) return null;

  const currentAsset = LOADING_IMAGES[currentImageIndex];

  return (
    <div
      id="loader-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050709] text-white transition-opacity duration-700 ${
        isComplete || (progress >= 100 && displayProgress >= 100) ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="hud-border p-6 sm:p-8 bg-[#0b0e14]/95 max-w-md w-11/12 text-center relative glow-box-green backdrop-blur-xl rounded-xl border border-[#00ff66]/40 flex flex-col items-center">
        {/* Animated Rotating Image Placeholder */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-3 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#00ff66]/15 rounded-full blur-xl animate-pulse" />
          {LOADING_IMAGES.map((img, idx) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.label}
              width={200}
              height={200}
              priority
              className={`w-full h-full object-contain absolute inset-0 z-10 transition-all duration-700 filter drop-shadow-[0_0_22px_rgba(0,255,102,0.55)] ${
                idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-1">
          <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-ping"></span>
          <span>STREAMING TACTICAL ASSETS [{currentAsset.label}]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-display font-black tracking-wider text-white mb-1 uppercase">
          LAN CHALLENGE ARENA
        </h2>
        <p className="text-[11px] text-gray-400 font-mono mb-4 uppercase tracking-wide">
          DECRYPTION STATUS: {statusText}
        </p>

        {/* Smooth Progressive Loading Bar */}
        <div className="w-full bg-[#1a1f26] h-3.5 rounded overflow-hidden border border-[#00ff66]/50 p-0.5 mb-2 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-[#00ff66] to-green-400 rounded transition-all duration-200"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <div className="w-full flex justify-between font-mono text-[11px] text-gray-400">
          <span className="text-gray-300">
            {displayProgress >= 90 && displayProgress < 100 ? 'INITIALIZING 3D CANVAS...' : statusText}
          </span>
          <span className="text-[#00ff66] font-bold">{displayProgress}%</span>
        </div>
      </div>
    </div>
  );
}
