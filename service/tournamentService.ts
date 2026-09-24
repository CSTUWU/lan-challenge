import { LeaderboardTeam, LiveMatchData } from '@/types/tournament';
import { DEFAULT_LEADERBOARD, DEFAULT_LIVE_MATCH } from '@/lib/constants';

let inMemoryLeaderboard: LeaderboardTeam[] = [...DEFAULT_LEADERBOARD];
let inMemoryLiveMatch: LiveMatchData = { ...DEFAULT_LIVE_MATCH };

export const tournamentService = {
  getLeaderboard: (): LeaderboardTeam[] => {
    return inMemoryLeaderboard;
  },

  saveLeaderboard: (teams: LeaderboardTeam[]) => {
    inMemoryLeaderboard = teams;
  },

  getLiveMatch: (): LiveMatchData => {
    return inMemoryLiveMatch;
  },

  saveLiveMatch: (data: LiveMatchData) => {
    inMemoryLiveMatch = data;
  },
};
