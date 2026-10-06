'use client';

import Image from 'next/image';

interface HelmetCanvasFallbackProps {
  isLoaded: boolean;
}

export function HelmetCanvasFallback({ isLoaded }: HelmetCanvasFallbackProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Image
        src="/models/ghost_placeholder.webp"
        alt="Ghost Helmet Loading Placeholder"
        width={400}
        height={400}
        priority
        className="w-[280px] sm:w-[360px] md:w-[420px] h-auto object-contain filter drop-shadow-[0_0_35px_rgba(0,255,102,0.4)] animate-pulse"
      />
    </div>
  );
}
