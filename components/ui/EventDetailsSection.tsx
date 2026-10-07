'use client';

import { memo, useEffect, useState } from 'react';

interface EventDetailsSectionProps {
  scrollProgress: number; // Keeping for compatibility
}

export const EventDetailsSection = memo(function EventDetailsSection({
  scrollProgress,
}: EventDetailsSectionProps) {
  const [vh, setVh] = useState(800);
  const [scrollPx, setScrollPx] = useState(0);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight || 800);
    updateVh();
    window.addEventListener('resize', updateVh, { passive: true });
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPx(window.pageYOffset || document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Section ends at 11.5vh. Animate between 11.0vh and 12.0vh
  const startAnim = vh * 11.0;
  const endAnim = vh * 12.0;
  const progress = Math.min(Math.max((scrollPx - startAnim) / Math.max(endAnim - startAnim, 1), 0), 1);
  
  const contentVisibility = Math.min(Math.max((progress - 0.3) / 0.45, 0), 1);
  const translateX = (1 - contentVisibility) * 120;
  const opacity = contentVisibility;

  return (
    <section
      id="vision-strategy"
      className="relative w-full px-6 md:px-16 py-12 pointer-events-none z-30 overflow-hidden border-t border-emerald-500/20"
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-end">
        <div
          className="relative w-full max-w-xs lg:max-w-sm pointer-events-auto"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity,
          transition: 'none',
        }}
      >
        {/* Content goes here */}
      </div>
      </div>
    </section>
  );
});
