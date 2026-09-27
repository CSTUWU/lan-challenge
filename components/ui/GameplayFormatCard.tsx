import { Settings } from 'lucide-react';

export function GameplayFormatCard() {
  return (
    <div className="hud-border bg-[#1a1f26]/40 backdrop-blur p-6 rounded hover:border-[#00ff66] transition-all duration-300 group">
      <div className="w-10 h-10 rounded bg-emerald-500/20 text-[#00ff66] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
        <Settings className="w-6 h-6 text-[#00ff66]" />
      </div>
      <div className="text-xs font-mono text-emerald-400 tracking-wider">GAMEPLAY FORMAT</div>
      <div className="text-xs text-gray-400 mt-2 space-y-1 font-mono">
        <div className="flex justify-between">
          <span>MODE:</span>
          <span className="text-white">SEARCH & DESTROY (S&D)</span>
        </div>
        <div className="flex justify-between">
          <span>ROUNDS:</span>
          <span className="text-white">MR12 (FIRST TO 13)</span>
        </div>
        <div className="flex justify-between">
          <span>TIE-BREAKER:</span>
          <span className="text-white">MR3 OVERTIME PROTOCOL</span>
        </div>
        <div className="flex justify-between">
          <span>BRACKET:</span>
          <span className="text-white">DOUBLE ELIMINATION</span>
        </div>
      </div>
    </div>
  );
}
