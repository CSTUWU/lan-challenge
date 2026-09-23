'use client';

import { X, Users } from 'lucide-react';
import { LiveMatchData } from '@/types/tournament';

interface LiveMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  liveMatch: LiveMatchData;
}

export function LiveMatchModal({ isOpen, onClose, liveMatch }: LiveMatchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl hud-border bg-[#070a0e]/95 p-6 md:p-10 rounded-2xl border-2 border-[#00ff66] shadow-[0_0_50px_rgba(0,255,102,0.35)] glow-box-green my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#00ff66] border border-[#00ff66]/30 rounded-full bg-[#0b0e14] hover:bg-[#00ff66]/20 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#00ff66]/30 pb-4 mb-8">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase animate-pulse">
              ● {liveMatch.isLive ? 'LIVE ARENA BROADCAST' : 'MATCH UPCOMING'}
            </span>
            <span className="text-gray-500 text-xs font-mono">|</span>
            <span className="text-[#00ff66] font-mono text-xs font-bold tracking-widest uppercase">
              {liveMatch.stageTitle}
            </span>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center space-x-3 font-mono text-xs">
            <div className="px-3 py-1 bg-[#151a21] border border-[#00ff66]/40 rounded text-[#00ff66] font-bold uppercase">
              MAP: {liveMatch.mapName}
            </div>
            <div className="text-gray-300 font-bold">{liveMatch.roundInfo}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          <div className="lg:col-span-4 bg-[#0d1117] p-6 rounded-xl border-2 border-[#00ff66]/40 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#00ff66] font-bold tracking-widest uppercase">
                {liveMatch.team1.side}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wide glow-text-green">
              {liveMatch.team1.name}
            </h3>

            <div className="mt-5 pt-4 border-t border-gray-800">
              <div className="text-[11px] font-mono text-[#00ff66] uppercase tracking-widest mb-3 flex items-center space-x-1.5 font-bold">
                <Users className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>SQUAD ROSTER (5 PLAYERS):</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-gray-200">
                {liveMatch.team1.players.map((p, i) => (
                  <li key={i} className="flex items-center space-x-2 bg-[#161c24] px-3 py-1.5 rounded border border-[#00ff66]/20">
                    <span className="w-2 h-2 bg-[#00ff66] rounded-full"></span>
                    <span className="truncate font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 text-center py-6 bg-[#0a0d12] rounded-xl border-2 border-[#00ff66]/40 my-2 lg:my-0 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 font-bold">
              LIVE MATCH SCORE
            </div>

            <div className="flex items-center justify-center space-x-4">
              <span className="text-6xl md:text-8xl font-display font-black text-white glow-text-green">
                {liveMatch.team1.score}
              </span>
              <span className="text-3xl font-display text-gray-500 font-bold">:</span>
              <span className="text-6xl md:text-8xl font-display font-black text-white glow-text-green">
                {liveMatch.team2.score}
              </span>
            </div>

            <div className="mt-3 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">
              PROMOD S&D // MR12
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0d1117] p-6 rounded-xl border-2 border-teal-500/40 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-teal-400 font-bold tracking-widest uppercase">
                {liveMatch.team2.side}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#00e65c]" />
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wide">
              {liveMatch.team2.name}
            </h3>

            <div className="mt-5 pt-4 border-t border-gray-800">
              <div className="text-[11px] font-mono text-teal-400 uppercase tracking-widest mb-3 flex items-center space-x-1.5 font-bold">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span>SQUAD ROSTER (5 PLAYERS):</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-gray-200">
                {liveMatch.team2.players.map((p, i) => (
                  <li key={i} className="flex items-center space-x-2 bg-[#161c24] px-3 py-1.5 rounded border border-teal-500/20">
                    <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                    <span className="truncate font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center font-mono text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CST DEGREE PROGRAM // COD4 LAN CHALLENGE LIVE ARENA</span>
          <span className="text-[#00ff66] font-bold">REAL-TIME OVERWATCH SYNC: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
