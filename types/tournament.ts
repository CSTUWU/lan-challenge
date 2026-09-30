export type TeamGroup = 'Group A' | 'Group B' | 'Playoffs';
export type TeamStatus = 'CHAMPIONS' | 'QUALIFIED' | 'CONTENDER' | 'ELIMINATED';
export type SquadStatus = 'VERIFIED' | 'PENDING' | 'REJECTED';

export interface TournamentMap {
  id: string;
  name: string;
  displayName: string;
  title: string;
  desc: string;
  tag?: string;
  src?: string;
}

export interface LeaderboardTeam {
  id: string;
  rank: number;
  name: string;
  group: TeamGroup;
  played: number;
  wins: number;
  losses: number;
  roundsWon: number;
  roundsLost: number;
  points: number;
  status: TeamStatus;
}

export interface LiveMatchData {
  isLive: boolean;
  stageTitle: string;
  mapName: string;
  roundInfo: string;
  team1: {
    name: string;
    score: number;
    side: string;
    players: string[];
  };
  team2: {
    name: string;
    score: number;
    side: string;
    players: string[];
  };
}

export interface RegisteredSquad {
  id: string;
  teamName: string;
  captainName: string;
  contactNo: string;
  campus: string;
  members: string[];
  status: SquadStatus;
  dateRegistered: string;
}
