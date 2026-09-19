'use client';

import { Trophy } from 'lucide-react';

export function PrizePoolCard() {
  return (
    <div className="hud-border bg-[#1a1f26]/40 backdrop-blur p-6 rounded hover:border-[#00ff66] transition-all duration-300 group">
      <div className="w-10 h-10 rounded bg-emerald-500/20 text-[#00ff66] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
        <Trophy className="w-6 h-6 text-[#00ff66]" />
      </div>
      <div className="text-xs font-mono text-emerald-400 tracking-wider">PRIZE BOUNTY</div>
      <div className="text-3xl font-display font-black text-white mt-1">LKR 150,000</div>
      <div className="text-xs text-gray-400 mt-2 space-y-1 font-mono">
        <div className="flex justify-between">
          <span>1ST PLACE:</span>
          <span className="text-white font-bold">LKR 85,000 + CHAMPION TROPHY</span>
        </div>
        <div className="flex justify-between">
          <span>2ND PLACE:</span>
          <span className="text-white font-bold">LKR 45,000 + MEDALS</span>
        </div>
        <div className="flex justify-between">
          <span>3RD PLACE:</span>
          <span className="text-white font-bold">LKR 20,000 + PERIPHERALS</span>
        </div>
      </div>
    </div>
  );
}
