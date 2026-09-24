'use client';

import { Trophy, CheckCircle, Award } from 'lucide-react';

interface WinnerDeclarationPanelProps {
  team1Name: string;
  team1Score: number;
  team2Name: string;
  team2Score: number;
  selectedWinner: 'team1' | 'team2' | null;
  matchSubmitted: boolean;
  onSelectWinner: (winner: 'team1' | 'team2') => void;
  onDeclareWinner: () => void;
}

export function WinnerDeclarationPanel({
  team1Name,
  team1Score,
  team2Name,
  team2Score,
  selectedWinner,
  matchSubmitted,
  onSelectWinner,
  onDeclareWinner,
}: WinnerDeclarationPanelProps) {
  return (
    <div className="hud-border bg-[#11161d] p-6 rounded-xl border-2 border-emerald-500/50 space-y-4 font-mono text-xs">
      <div className="flex items-center space-x-2 text-[#00ff66]">
        <Award className="w-5 h-5 text-[#00ff66]" />
        <h4 className="text-base font-display font-bold uppercase tracking-wide">
          MATCH COMPLETION & LEADERBOARD AUTO-UPDATE
        </h4>
      </div>

      <p className="text-gray-300 text-xs font-tactical">
        Select the winning team below and click &quot;SUBMIT RESULT&quot;. The leaderboard will automatically compute points, wins, losses, and round differentials.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label
          onClick={() => onSelectWinner('team1')}
          className={`flex items-center space-x-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
            selectedWinner === 'team1'
              ? 'border-[#00ff66] bg-[#00ff66]/15 text-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
              : 'border-gray-800 bg-[#0b0e14] text-gray-400 hover:border-gray-600'
          }`}
        >
          <input
            type="radio"
            name="winner"
            checked={selectedWinner === 'team1'}
            onChange={() => onSelectWinner('team1')}
            className="accent-[#00ff66]"
          />
          <div>
            <div className="font-bold text-sm text-white uppercase">{team1Name}</div>
            <div className="text-[11px] text-emerald-400">Score: {team1Score} Rounds</div>
          </div>
        </label>

        <label
          onClick={() => onSelectWinner('team2')}
          className={`flex items-center space-x-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
            selectedWinner === 'team2'
              ? 'border-teal-400 bg-teal-500/15 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
              : 'border-gray-800 bg-[#0b0e14] text-gray-400 hover:border-gray-600'
          }`}
        >
          <input
            type="radio"
            name="winner"
            checked={selectedWinner === 'team2'}
            onChange={() => onSelectWinner('team2')}
            className="accent-teal-400"
          />
          <div>
            <div className="font-bold text-sm text-white uppercase">{team2Name}</div>
            <div className="text-[11px] text-teal-300">Score: {team2Score} Rounds</div>
          </div>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          disabled={!selectedWinner}
          onClick={onDeclareWinner}
          className={`w-full sm:w-auto px-8 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
            selectedWinner
              ? 'bg-[#00ff66] text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(0,255,102,0.4)] cursor-pointer'
              : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>DECLARE WINNER & AUTO-UPDATE LEADERBOARD</span>
        </button>

        {matchSubmitted && (
          <div className="flex items-center space-x-2 text-[#00ff66] font-bold text-xs animate-bounce">
            <CheckCircle className="w-4 h-4" />
            <span>LEADERBOARD AUTOMATICALLY UPDATED!</span>
          </div>
        )}
      </div>
    </div>
  );
}
