'use client';

import { useCountdown } from '@/hooks/useCountdown';

export function CountdownTimer() {
  const { days, hours, mins, secs } = useCountdown(4, 18);

  return (
    <div className="hud-border bg-black/70 p-4 mt-95 sm:mt-6 max-w-md backdrop-blur-sm rounded">
      <div className="text-xs text-emerald-400 tracking-wider font-mono mb-2 uppercase flex justify-between">
        <span>TOURNAMENT COMMENCES IN:</span>
        <span className="text-white font-bold animate-pulse">● LIVE LAN SERVER</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-[#1a1f26]/70 p-2 rounded border border-emerald-500/20">
          <div className="text-2xl sm:text-3xl font-display font-black text-white">{days}</div>
          <div className="text-[10px] text-gray-400 tracking-widest uppercase">DAYS</div>
        </div>
        <div className="bg-[#1a1f26]/70 p-2 rounded border border-emerald-500/20">
          <div className="text-2xl sm:text-3xl font-display font-black text-white">{hours}</div>
          <div className="text-[10px] text-gray-400 tracking-widest uppercase">HOURS</div>
        </div>
        <div className="bg-[#1a1f26]/70 p-2 rounded border border-emerald-500/20">
          <div className="text-2xl sm:text-3xl font-display font-black text-white">{mins}</div>
          <div className="text-[10px] text-gray-400 tracking-widest uppercase">MINS</div>
        </div>
        <div className="bg-[#1a1f26]/70 p-2 rounded border border-emerald-500/20">
          <div className="text-2xl sm:text-3xl font-display font-black text-[#00ff66]">{secs}</div>
          <div className="text-[10px] text-gray-400 tracking-widest uppercase">SECS</div>
        </div>
      </div>
    </div>
  );
}
