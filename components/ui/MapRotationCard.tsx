'use client';

import { Target } from 'lucide-react';

export function MapRotationCard() {
  const maps = ['mp_crash', 'mp_crossfire', 'mp_backlot', 'mp_strike', 'mp_citystreets'];

  return (
    <div className="hud-border bg-[#1a1f26]/40 backdrop-blur p-6 rounded hover:border-[#00ff66] transition-all duration-300 group">
      <div className="w-10 h-10 rounded bg-emerald-500/20 text-[#00ff66] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
        <Target className="w-6 h-6 text-[#00ff66]" />
      </div>
      <div className="text-xs font-mono text-emerald-400 tracking-wider">OFFICIAL MAP ROTATION</div>
      <div className="flex flex-wrap gap-2 mt-3 font-mono text-xs">
        {maps.map((mapName) => (
          <span
            key={mapName}
            className="px-2.5 py-1 bg-black/60 border border-emerald-500/30 rounded text-emerald-300"
          >
            {mapName}
          </span>
        ))}
      </div>
    </div>
  );
}
