'use client';

import { Shield } from 'lucide-react';
import { CustomSelect, SelectOption } from '../CustomSelect';

interface TeamRosterCardProps {
  title: string;
  teamName: string;
  score: number;
  players: string[];
  teamOptions: SelectOption[];
  themeColor: 'green' | 'teal';
  onSelectTeam: (teamName: string) => void;
  onUpdateScore: (score: number) => void;
  onUpdatePlayer: (index: number, name: string) => void;
}

export function TeamRosterCard({
  title,
  teamName,
  score,
  players,
  teamOptions,
  themeColor,
  onSelectTeam,
  onUpdateScore,
  onUpdatePlayer,
}: TeamRosterCardProps) {
  const isGreen = themeColor === 'green';
  const textColor = isGreen ? 'text-[#00ff66]' : 'text-teal-400';
  const borderColor = isGreen ? 'border-[#00ff66]/40' : 'border-teal-500/40';
  const badgeBg = isGreen ? 'bg-[#00ff66]/10 border-[#00ff66]/30' : 'bg-teal-500/10 border-teal-500/30';
  const focusBorder = isGreen ? 'focus:border-[#00ff66]' : 'focus:border-teal-400';

  return (
    <div className={`p-5 bg-[#151a21] rounded-xl border ${borderColor} space-y-4 shadow-lg font-mono text-xs`}>
      <div className={`flex items-center justify-between border-b ${isGreen ? 'border-[#00ff66]/20' : 'border-teal-500/20'} pb-2`}>
        <h4 className={`text-base font-display font-bold ${textColor} uppercase flex items-center space-x-2`}>
          <Shield className={`w-4 h-4 ${textColor}`} />
          <span>{title}</span>
        </h4>
        <span className={`text-[10px] ${textColor} ${badgeBg} px-2 py-0.5 rounded border font-bold`}>
          ROSTER SYNCED
        </span>
      </div>

      <div>
        <label className="block text-gray-300 font-bold mb-1">SELECT REGISTERED TEAM (GROUP A / B):</label>
        <CustomSelect
          value={teamName}
          onChange={onSelectTeam}
          options={teamOptions}
          placeholder={`Select ${title}`}
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-1">LIVE MATCH SCORE:</label>
        <input
          type="number"
          min="0"
          value={score}
          onChange={(e) => onUpdateScore(parseInt(e.target.value) || 0)}
          className={`w-full px-3 py-2 bg-[#0b0e14] border ${borderColor} rounded ${textColor} text-xl font-black text-center focus:outline-none`}
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-2 font-bold flex items-center space-x-1">
          <span>PLAYERS (5 ROSTER MEMBERS FROM DATABASE):</span>
        </label>
        <div className="space-y-1.5">
          {players.map((player, pIdx) => (
            <div key={pIdx} className="flex items-center space-x-2">
              <span className="w-5 text-gray-500 text-center font-bold">{pIdx + 1}.</span>
              <input
                type="text"
                value={player}
                onChange={(e) => onUpdatePlayer(pIdx, e.target.value)}
                className={`w-full px-3 py-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 ${focusBorder} focus:outline-none`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
