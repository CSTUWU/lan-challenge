'use client';

import { useState } from 'react';
import { Radio, Trophy, CheckCircle, Shield, MapPin, Award } from 'lucide-react';
import { LeaderboardTeam, LiveMatchData, RegisteredSquad } from '@/types/tournament';

interface AdminLiveControllerProps {
  liveMatch: LiveMatchData;
  teams: LeaderboardTeam[];
  squads: RegisteredSquad[];
  onSaveLiveMatch: (updated: LiveMatchData) => void;
  onUpdateLeaderboard: (updatedTeams: LeaderboardTeam[]) => void;
}

const DEFAULT_ROSTERS: Record<string, string[]> = {
  'GHOST REAPERS': ['Spectre (Captain)', 'Wraith (Sniper)', 'Shade (Assault)', 'Ember (SMG)', 'Onyx (Demo)'],
  'TITAN STRIKERS': ['Vortex (Captain)', 'Blitz (Sniper)', 'Nova (Assault)', 'Pulse (SMG)', 'Rift (Demo)'],
  'VIPER TACTICAL': ['Viper (Captain)', 'Venom (Sniper)', 'Cobra (Assault)', 'Fang (SMG)', 'Toxin (Demo)'],
  'SHADOW SQUAD': ['Shadow (Captain)', 'Ghost (Sniper)', 'Phantom (Assault)', 'Mirage (SMG)', 'Spectre (Demo)'],
  'ALPHA PROTOCOL': ['Alpha (Captain)', 'Ares (Sniper)', 'Titan (Assault)', 'Zeus (SMG)', 'Hades (Demo)'],
  'BRAVO SPECTRES': ['Bravo (Captain)', 'Echo (Sniper)', 'Foxtrot (Assault)', 'Sierra (SMG)', 'Tango (Demo)'],
};

export function AdminLiveController({
  liveMatch,
  teams,
  squads,
  onSaveLiveMatch,
  onUpdateLeaderboard,
}: AdminLiveControllerProps) {
  const [selectedWinner, setSelectedWinner] = useState<'team1' | 'team2' | null>(null);
  const [matchSubmitted, setMatchSubmitted] = useState(false);

  // Group A and Group B teams from Leaderboard or Squads
  const groupATeams = teams.filter((t) => t.group === 'Group A');
  const groupBTeams = teams.filter((t) => t.group === 'Group B');

  const getTeamRoster = (teamName: string): string[] => {
    const squadMatch = squads.find((s) => s.teamName.toUpperCase() === teamName.toUpperCase());
    if (squadMatch && squadMatch.members.length >= 5) {
      return squadMatch.members.slice(0, 5);
    }
    return DEFAULT_ROSTERS[teamName.toUpperCase()] || [
      `${teamName} Player 1 (Capt)`,
      `${teamName} Player 2`,
      `${teamName} Player 3`,
      `${teamName} Player 4`,
      `${teamName} Player 5`,
    ];
  };

  const handleSelectTeam1 = (teamName: string) => {
    const players = getTeamRoster(teamName);
    onSaveLiveMatch({
      ...liveMatch,
      team1: {
        ...liveMatch.team1,
        name: teamName,
        players,
      },
    });
  };

  const handleSelectTeam2 = (teamName: string) => {
    const players = getTeamRoster(teamName);
    onSaveLiveMatch({
      ...liveMatch,
      team2: {
        ...liveMatch.team2,
        name: teamName,
        players,
      },
    });
  };

  const handleDeclareWinner = () => {
    if (!selectedWinner) return;

    const winnerName = selectedWinner === 'team1' ? liveMatch.team1.name : liveMatch.team2.name;
    const loserName = selectedWinner === 'team1' ? liveMatch.team2.name : liveMatch.team1.name;
    const winnerScore = selectedWinner === 'team1' ? liveMatch.team1.score : liveMatch.team2.score;
    const loserScore = selectedWinner === 'team1' ? liveMatch.team2.score : liveMatch.team1.score;

    // Auto-update Leaderboard Teams
    const updatedTeams = teams.map((team) => {
      if (team.name.toUpperCase() === winnerName.toUpperCase()) {
        return {
          ...team,
          played: team.played + 1,
          wins: team.wins + 1,
          roundsWon: team.roundsWon + winnerScore,
          roundsLost: team.roundsLost + loserScore,
          points: team.points + 3,
        };
      }
      if (team.name.toUpperCase() === loserName.toUpperCase()) {
        return {
          ...team,
          played: team.played + 1,
          losses: team.losses + 1,
          roundsWon: team.roundsWon + loserScore,
          roundsLost: team.roundsLost + winnerScore,
        };
      }
      return team;
    });

    // Sort updated teams by points desc, then round diff desc
    const sortedTeams = [...updatedTeams]
      .sort((a, b) => {
        const diffA = a.roundsWon - a.roundsLost;
        const diffB = b.roundsWon - b.roundsLost;
        return b.points - a.points || diffB - diffA;
      })
      .map((t, idx) => ({ ...t, rank: idx + 1 }));

    onUpdateLeaderboard(sortedTeams);

    // Save live match as offline / completed
    onSaveLiveMatch({
      ...liveMatch,
      isLive: false,
      stageTitle: `FINISHED: ${winnerName} DEFEATED ${loserName} (${winnerScore}-${loserScore})`,
    });

    setMatchSubmitted(true);
    setTimeout(() => setMatchSubmitted(false), 4000);
  };

  return (
    <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 glow-box-green space-y-6 font-mono text-xs">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#00ff66]/30 pb-4 gap-4">
        <div className="flex items-center space-x-3">
          <Radio className="w-5 h-5 text-red-500 animate-pulse" />
          <div>
            <h3 className="text-xl font-display font-bold text-white uppercase">
              LIVE MATCH ARENA OVERLAY CONTROLLER
            </h3>
            <p className="text-[11px] text-gray-400 font-tactical mt-0.5">
              Select Group A / Group B Teams, select map, broadcast match live & declare winner to auto-update Leaderboard.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSaveLiveMatch({ ...liveMatch, isLive: !liveMatch.isLive })}
          className={`px-5 py-2.5 rounded font-bold uppercase tracking-wider border transition-all flex items-center space-x-2 ${
            liveMatch.isLive
              ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'border-[#00ff66]/40 bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${liveMatch.isLive ? 'bg-red-500 animate-ping' : 'bg-gray-500'}`}></span>
          <span>STATUS: {liveMatch.isLive ? 'BROADCASTING LIVE' : 'OFFLINE'}</span>
        </button>
      </div>

      {/* Match Configuration Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#151a21]/80 p-4 rounded-lg border border-[#00ff66]/20">
        <div>
          <label className="block text-emerald-400 font-bold mb-1 uppercase">STAGE TITLE / ROUND</label>
          <input
            type="text"
            value={liveMatch.stageTitle}
            onChange={(e) => onSaveLiveMatch({ ...liveMatch, stageTitle: e.target.value })}
            className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            placeholder="e.g. GROUP STAGE // MATCH 04"
          />
        </div>
        <div>
          <label className="block text-emerald-400 font-bold mb-1 uppercase flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>SELECT MAP</span>
          </label>
          <select
            value={liveMatch.mapName}
            onChange={(e) => onSaveLiveMatch({ ...liveMatch, mapName: e.target.value })}
            className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white font-bold focus:outline-none focus:border-[#00ff66]"
          >
            <option value="mp_crash">mp_crash (Crash)</option>
            <option value="mp_crossfire">mp_crossfire (Crossfire)</option>
            <option value="mp_backlot">mp_backlot (Backlot)</option>
            <option value="mp_strike">mp_strike (Strike)</option>
            <option value="mp_citystreets">mp_citystreets (District)</option>
          </select>
        </div>
        <div>
          <label className="block text-emerald-400 font-bold mb-1 uppercase">ROUND / SCORE INFO</label>
          <input
            type="text"
            value={liveMatch.roundInfo}
            onChange={(e) => onSaveLiveMatch({ ...liveMatch, roundInfo: e.target.value })}
            className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            placeholder="e.g. ROUND 12 / 24"
          />
        </div>
      </div>

      {/* TEAM 1 & TEAM 2 SELECTION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* TEAM 1 PANEL */}
        <div className="p-5 bg-[#151a21] rounded-xl border border-[#00ff66]/40 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-2">
            <h4 className="text-base font-display font-bold text-[#00ff66] uppercase flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#00ff66]" />
              <span>TEAM 1 (ATTACKERS / LEFT)</span>
            </h4>
            <span className="text-[10px] text-emerald-400 bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/30 font-bold">
              ROSTER SYNCED
            </span>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">SELECT REGISTERED TEAM (GROUP A / B):</label>
            <select
              value={liveMatch.team1.name}
              onChange={(e) => handleSelectTeam1(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0b0e14] border border-[#00ff66]/40 rounded text-white font-bold focus:outline-none focus:border-[#00ff66]"
            >
              <optgroup label="--- GROUP A TEAMS ---">
                {groupATeams.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} (Group A)
                  </option>
                ))}
              </optgroup>
              <optgroup label="--- GROUP B TEAMS ---">
                {groupBTeams.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} (Group B)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">LIVE MATCH SCORE:</label>
            <input
              type="number"
              min="0"
              value={liveMatch.team1.score}
              onChange={(e) =>
                onSaveLiveMatch({
                  ...liveMatch,
                  team1: { ...liveMatch.team1, score: parseInt(e.target.value) || 0 },
                })
              }
              className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/40 rounded text-[#00ff66] text-xl font-black text-center focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 font-bold flex items-center space-x-1">
              <span>PLAYERS (5 ROSTER MEMBERS FROM DATABASE):</span>
            </label>
            <div className="space-y-1.5">
              {liveMatch.team1.players.map((player, pIdx) => (
                <div key={pIdx} className="flex items-center space-x-2">
                  <span className="w-5 text-gray-500 text-center font-bold">{pIdx + 1}.</span>
                  <input
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
                    className="w-full px-3 py-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 focus:border-[#00ff66] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TEAM 2 PANEL */}
        <div className="p-5 bg-[#151a21] rounded-xl border border-teal-500/40 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-teal-500/20 pb-2">
            <h4 className="text-base font-display font-bold text-teal-400 uppercase flex items-center space-x-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>TEAM 2 (DEFENDERS / RIGHT)</span>
            </h4>
            <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30 font-bold">
              ROSTER SYNCED
            </span>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">SELECT REGISTERED TEAM (GROUP A / B):</label>
            <select
              value={liveMatch.team2.name}
              onChange={(e) => handleSelectTeam2(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0b0e14] border border-teal-500/40 rounded text-white font-bold focus:outline-none focus:border-teal-400"
            >
              <optgroup label="--- GROUP A TEAMS ---">
                {groupATeams.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} (Group A)
                  </option>
                ))}
              </optgroup>
              <optgroup label="--- GROUP B TEAMS ---">
                {groupBTeams.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} (Group B)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">LIVE MATCH SCORE:</label>
            <input
              type="number"
              min="0"
              value={liveMatch.team2.score}
              onChange={(e) =>
                onSaveLiveMatch({
                  ...liveMatch,
                  team2: { ...liveMatch.team2, score: parseInt(e.target.value) || 0 },
                })
              }
              className="w-full px-3 py-2 bg-[#0b0e14] border border-teal-500/40 rounded text-teal-400 text-xl font-black text-center focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 font-bold flex items-center space-x-1">
              <span>PLAYERS (5 ROSTER MEMBERS FROM DATABASE):</span>
            </label>
            <div className="space-y-1.5">
              {liveMatch.team2.players.map((player, pIdx) => (
                <div key={pIdx} className="flex items-center space-x-2">
                  <span className="w-5 text-gray-500 text-center font-bold">{pIdx + 1}.</span>
                  <input
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
                    className="w-full px-3 py-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 focus:border-teal-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DECLARE WINNER & AUTO-UPDATE LEADERBOARD CONTROL BOX */}
      <div className="hud-border bg-[#11161d] p-6 rounded-xl border-2 border-emerald-500/50 space-y-4">
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
            onClick={() => setSelectedWinner('team1')}
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
              onChange={() => setSelectedWinner('team1')}
              className="accent-[#00ff66]"
            />
            <div>
              <div className="font-bold text-sm text-white uppercase">{liveMatch.team1.name}</div>
              <div className="text-[11px] text-emerald-400">Score: {liveMatch.team1.score} Rounds</div>
            </div>
          </label>

          <label
            onClick={() => setSelectedWinner('team2')}
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
              onChange={() => setSelectedWinner('team2')}
              className="accent-teal-400"
            />
            <div>
              <div className="font-bold text-sm text-white uppercase">{liveMatch.team2.name}</div>
              <div className="text-[11px] text-teal-300">Score: {liveMatch.team2.score} Rounds</div>
            </div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            disabled={!selectedWinner}
            onClick={handleDeclareWinner}
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
    </div>
  );
}
