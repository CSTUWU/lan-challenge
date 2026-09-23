'use client';

import { Radio } from 'lucide-react';
import { LiveMatchData } from '@/types/tournament';

interface AdminLiveControllerProps {
  liveMatch: LiveMatchData;
  onSaveLiveMatch: (updated: LiveMatchData) => void;
}

export function AdminLiveController({ liveMatch, onSaveLiveMatch }: AdminLiveControllerProps) {
  return (
    <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 glow-box-green space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#00ff66]/30 pb-4">
        <div className="flex items-center space-x-3">
          <Radio className="w-5 h-5 text-red-500 animate-pulse" />
          <h3 className="text-xl font-display font-bold text-white uppercase">
            LIVE MATCH ARENA OVERLAY CONTROLLER
          </h3>
        </div>

        <button
          onClick={() => onSaveLiveMatch({ ...liveMatch, isLive: !liveMatch.isLive })}
          className={`px-4 py-2 rounded font-bold uppercase tracking-wider border transition-all ${
            liveMatch.isLive
              ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'border-[#00ff66]/40 bg-gray-800 text-gray-400'
          }`}
        >
          STATUS: {liveMatch.isLive ? 'BROADCASTING LIVE' : 'OFFLINE'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 mb-1">STAGE TITLE</label>
          <input
            type="text"
            value={liveMatch.stageTitle}
            onChange={(e) => onSaveLiveMatch({ ...liveMatch, stageTitle: e.target.value })}
            className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">MAP NAME</label>
          <select
            value={liveMatch.mapName}
            onChange={(e) => onSaveLiveMatch({ ...liveMatch, mapName: e.target.value })}
            className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
          >
            <option value="mp_crash">mp_crash</option>
            <option value="mp_crossfire">mp_crossfire</option>
            <option value="mp_backlot">mp_backlot</option>
            <option value="mp_strike">mp_strike</option>
            <option value="mp_citystreets">mp_citystreets</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">ROUND INFO</label>
          <input
            type="text"
            value={liveMatch.roundInfo}
            onChange={(e) => onSaveLiveMatch({ ...liveMatch, roundInfo: e.target.value })}
            className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
        {/* TEAM 1 */}
        <div className="p-4 bg-[#151a21] rounded border border-[#00ff66]/30 space-y-4">
          <h4 className="text-base font-display font-bold text-[#00ff66] uppercase">
            TEAM 1 (LEFT SIDE)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">TEAM NAME</label>
              <input
                type="text"
                value={liveMatch.team1.name}
                onChange={(e) =>
                  onSaveLiveMatch({
                    ...liveMatch,
                    team1: { ...liveMatch.team1, name: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">SCORE</label>
              <input
                type="number"
                value={liveMatch.team1.score}
                onChange={(e) =>
                  onSaveLiveMatch({
                    ...liveMatch,
                    team1: { ...liveMatch.team1, score: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-[#00ff66] text-lg font-black text-center focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">PLAYERS (5 ROSTER NAMES):</label>
            {liveMatch.team1.players.map((player, pIdx) => (
              <input
                key={pIdx}
                type="text"
                value={player}
                onChange={(e) => {
                  const newPlayers = [...liveMatch.team1.players];
                  newPlayers[pIdx] = e.target.value;
                  onSaveLiveMatch({
                    ...liveMatch,
                    team1: { ...liveMatch.team1, players: newPlayers },
                  });
                }}
                className="w-full px-2.5 py-1.5 mb-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 focus:border-[#00ff66] focus:outline-none"
              />
            ))}
          </div>
        </div>

        {/* TEAM 2 */}
        <div className="p-4 bg-[#151a21] rounded border border-teal-500/30 space-y-4">
          <h4 className="text-base font-display font-bold text-teal-400 uppercase">
            TEAM 2 (RIGHT SIDE)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">TEAM NAME</label>
              <input
                type="text"
                value={liveMatch.team2.name}
                onChange={(e) =>
                  onSaveLiveMatch({
                    ...liveMatch,
                    team2: { ...liveMatch.team2, name: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-[#0b0e14] border border-teal-500/30 rounded text-white font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">SCORE</label>
              <input
                type="number"
                value={liveMatch.team2.score}
                onChange={(e) =>
                  onSaveLiveMatch({
                    ...liveMatch,
                    team2: { ...liveMatch.team2, score: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full px-3 py-2 bg-[#0b0e14] border border-teal-500/30 rounded text-teal-400 text-lg font-black text-center focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">PLAYERS (5 ROSTER NAMES):</label>
            {liveMatch.team2.players.map((player, pIdx) => (
              <input
                key={pIdx}
                type="text"
                value={player}
                onChange={(e) => {
                  const newPlayers = [...liveMatch.team2.players];
                  newPlayers[pIdx] = e.target.value;
                  onSaveLiveMatch({
                    ...liveMatch,
                    team2: { ...liveMatch.team2, players: newPlayers },
                  });
                }}
                className="w-full px-2.5 py-1.5 mb-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 focus:border-teal-400 focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
