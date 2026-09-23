'use client';

import { Target } from 'lucide-react';

interface MapItem {
  name: string;
  desc: string;
}

interface MapPoolSectionProps {
  maps: MapItem[];
}

export function MapPoolSection({ maps }: MapPoolSectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/30 pb-3">
        <Target className="w-6 h-6 text-[#00ff66]" />
        <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-wider uppercase">
          OFFICIAL MAP ROTATION POOL
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {maps.map((map) => (
          <div
            key={map.name}
            className="hud-border bg-[#0b0e14]/80 p-5 rounded border border-[#00ff66]/30 hover:border-[#00ff66] transition-all group"
          >
            <div className="text-[10px] font-mono text-[#00ff66] tracking-widest uppercase mb-1">
              OFFICIAL MAP
            </div>
            <div className="text-xl font-display font-black text-white group-hover:text-[#00ff66] transition-colors">
              {map.name}
            </div>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed font-tactical">
              {map.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
