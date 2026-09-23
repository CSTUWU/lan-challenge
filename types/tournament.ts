export interface LeaderboardTeam {
  id: string;
  rank: number;
  name: string;
  group: 'Group A' | 'Group B' | 'Playoffs';
  played: number;
  wins: number;
  losses: number;
  roundsWon: number;
  roundsLost: number;
  points: number;
  status: 'CHAMPIONS' | 'QUALIFIED' | 'CONTENDER' | 'ELIMINATED';
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
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  dateRegistered: string;
}
