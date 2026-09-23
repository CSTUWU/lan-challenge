'use client';

import { Award } from 'lucide-react';
import { LeaderboardTeam } from '@/types/tournament';

interface LeaderboardPodiumProps {
  top3: LeaderboardTeam[];
}

export function LeaderboardPodium({ top3 }: LeaderboardPodiumProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-2 mb-6">
        <Award className="w-5 h-5 text-[#00ff66]" />
        <h2 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-wider">
          TOURNAMENT CHAMPIONS PODIUM
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1st Place */}
        {top3[0] && (
          <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border-2 border-[#00ff66] shadow-[0_0_25px_rgba(0,255,102,0.3)] relative overflow-hidden order-1 md:order-2">
            <div className="absolute top-3 right-3 px-3 py-1 bg-[#00ff66] text-black font-display font-black text-xs uppercase rounded">
              1ST PLACE
            </div>
            <div className="text-4xl font-display font-black text-[#00ff66] mb-1">#1</div>
            <h3 className="text-2xl font-display font-black text-white uppercase tracking-wide">
              {top3[0].name}
            </h3>
            <div className="text-xs font-mono text-emerald-400 mt-1 uppercase">{top3[0].group}</div>
            <div className="mt-4 pt-4 border-t border-[#00ff66]/20 flex justify-between font-mono text-xs text-gray-300">
              <span>POINTS: <strong className="text-[#00ff66]">{top3[0].points} PTS</strong></span>
              <span>W/L: <strong className="text-white">{top3[0].wins}-{top3[0].losses}</strong></span>
            </div>
          </div>
        )}

        {/* 2nd Place */}
        {top3[1] && (
          <div className="hud-border bg-[#0b0e14]/80 p-6 rounded-xl border border-teal-500/40 relative overflow-hidden order-2 md:order-1">
            <div className="absolute top-3 right-3 px-3 py-1 bg-teal-500/20 border border-teal-400 text-teal-300 font-display font-bold text-xs uppercase rounded">
              2ND PLACE
            </div>
            <div className="text-3xl font-display font-black text-teal-400 mb-1">#2</div>
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
              {top3[1].name}
            </h3>
            <div className="text-xs font-mono text-teal-400 mt-1 uppercase">{top3[1].group}</div>
            <div className="mt-4 pt-4 border-t border-teal-500/20 flex justify-between font-mono text-xs text-gray-300">
              <span>POINTS: <strong className="text-teal-400">{top3[1].points} PTS</strong></span>
              <span>W/L: <strong className="text-white">{top3[1].wins}-{top3[1].losses}</strong></span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="hud-border bg-[#0b0e14]/80 p-6 rounded-xl border border-emerald-500/30 relative overflow-hidden order-3">
            <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-display font-bold text-xs uppercase rounded">
              3RD PLACE
            </div>
            <div className="text-3xl font-display font-black text-emerald-400 mb-1">#3</div>
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
              {top3[2].name}
            </h3>
            <div className="text-xs font-mono text-emerald-400 mt-1 uppercase">{top3[2].group}</div>
            <div className="mt-4 pt-4 border-t border-emerald-500/20 flex justify-between font-mono text-xs text-gray-300">
              <span>POINTS: <strong className="text-emerald-400">{top3[2].points} PTS</strong></span>
              <span>W/L: <strong className="text-white">{top3[2].wins}-{top3[2].losses}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
