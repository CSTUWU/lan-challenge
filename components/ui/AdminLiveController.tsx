'use client';

import { useState } from 'react';
import { Radio } from 'lucide-react';
import { LeaderboardTeam, LiveMatchData, RegisteredSquad } from '@/types/tournament';
import { SelectOption } from './CustomSelect';
import { MatchConfigPanel } from './admin/MatchConfigPanel';
import { TeamRosterCard } from './admin/TeamRosterCard';
import { WinnerDeclarationPanel } from './admin/WinnerDeclarationPanel';

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

  // Group A and Group B team options for CustomSelect
  const teamOptions: SelectOption[] = teams.map((t) => ({
    label: `${t.name} (${t.group})`,
    value: t.name,
    group: t.group === 'Group A' ? 'GROUP A TEAMS' : t.group === 'Group B' ? 'GROUP B TEAMS' : 'PLAYOFF TEAMS',
  }));

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

  const handleUpdateTeam1Player = (index: number, name: string) => {
    const newPlayers = [...liveMatch.team1.players];
    newPlayers[index] = name;
    onSaveLiveMatch({
      ...liveMatch,
      team1: { ...liveMatch.team1, players: newPlayers },
    });
  };

  const handleUpdateTeam2Player = (index: number, name: string) => {
    const newPlayers = [...liveMatch.team2.players];
    newPlayers[index] = name;
    onSaveLiveMatch({
      ...liveMatch,
      team2: { ...liveMatch.team2, players: newPlayers },
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

      {/* Modularized Match Configuration Panel */}
      <MatchConfigPanel
        liveMatch={liveMatch}
        onSaveLiveMatch={onSaveLiveMatch}
      />

      {/* TEAM 1 & TEAM 2 SELECTION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <TeamRosterCard
          title="TEAM 1 (ATTACKERS / LEFT)"
          teamName={liveMatch.team1.name}
          score={liveMatch.team1.score}
          players={liveMatch.team1.players}
          teamOptions={teamOptions}
          themeColor="green"
          onSelectTeam={handleSelectTeam1}
          onUpdateScore={(newScore) =>
            onSaveLiveMatch({
              ...liveMatch,
              team1: { ...liveMatch.team1, score: newScore },
            })
          }
          onUpdatePlayer={handleUpdateTeam1Player}
        />

        <TeamRosterCard
          title="TEAM 2 (DEFENDERS / RIGHT)"
          teamName={liveMatch.team2.name}
          score={liveMatch.team2.score}
          players={liveMatch.team2.players}
          teamOptions={teamOptions}
          themeColor="teal"
          onSelectTeam={handleSelectTeam2}
          onUpdateScore={(newScore) =>
            onSaveLiveMatch({
              ...liveMatch,
              team2: { ...liveMatch.team2, score: newScore },
            })
          }
          onUpdatePlayer={handleUpdateTeam2Player}
        />
      </div>

      {/* Modularized Winner Declaration Panel */}
      <WinnerDeclarationPanel
        team1Name={liveMatch.team1.name}
        team1Score={liveMatch.team1.score}
        team2Name={liveMatch.team2.name}
        team2Score={liveMatch.team2.score}
        selectedWinner={selectedWinner}
        matchSubmitted={matchSubmitted}
        onSelectWinner={setSelectedWinner}
        onDeclareWinner={handleDeclareWinner}
      />
    </div>
  );
}
