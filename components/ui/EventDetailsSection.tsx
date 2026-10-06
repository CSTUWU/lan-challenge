'use client';

import { memo } from 'react';
import { TacticalBadge } from './common/TacticalBadge';

interface EventDetailsSectionProps {
  scrollProgress: number; // 0 to 2+, passed from parent or hook
}

export const EventDetailsSection = memo(function EventDetailsSection({
  scrollProgress,
}: EventDetailsSectionProps) {
  // Content visible when p2Raw goes 0→1 (progress 1→2)
  const p2Raw = Math.min(Math.max(scrollProgress - 1, 0), 1);
  const contentVisibility = Math.min(Math.max((p2Raw - 0.3) / 0.45, 0), 1);
  const translateX = (1 - contentVisibility) * 120;
  const opacity = contentVisibility;

  return (
    <section
      id="vision-strategy"
      className="relative w-full flex items-center justify-end px-6 md:px-20 py-12 pointer-events-none z-30 overflow-hidden"
    >
      <div
        className="relative w-full max-w-xs lg:max-w-sm pointer-events-auto"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity,
          transition: 'none',
        }}
      >
        <div className="pr-4 border-r-2 border-[#00ff66]/50 flex flex-col items-end text-right">
          <TacticalBadge label="NEXT SECTION // DETAILS" className="mb-4" />
          <p className="text-gray-200 font-tactical text-sm md:text-base leading-relaxed mb-6 drop-shadow-md">
            The core event details will be loaded here.
          </p>
        </div>
      </div>
    </section>
  );
});
