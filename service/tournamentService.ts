import { LeaderboardTeam, LiveMatchData } from '@/types/tournament';
import { DEFAULT_LEADERBOARD, DEFAULT_LIVE_MATCH } from '@/lib/constants';

const LEADERBOARD_KEY = 'cod4_lan_leaderboard';
const LIVE_MATCH_KEY = 'cod4_lan_live_match';

export const tournamentService = {
  getLeaderboard: (): LeaderboardTeam[] => {
    if (typeof window === 'undefined') return DEFAULT_LEADERBOARD;
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
    return DEFAULT_LEADERBOARD;
  },

  saveLeaderboard: (teams: LeaderboardTeam[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(teams));
  },

  getLiveMatch: (): LiveMatchData => {
    if (typeof window === 'undefined') return DEFAULT_LIVE_MATCH;
    const stored = localStorage.getItem(LIVE_MATCH_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem(LIVE_MATCH_KEY, JSON.stringify(DEFAULT_LIVE_MATCH));
    return DEFAULT_LIVE_MATCH;
  },

  saveLiveMatch: (data: LiveMatchData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LIVE_MATCH_KEY, JSON.stringify(data));
  },
};
