import { LeaderboardTeam, LiveMatchData } from '@/types/tournament';
import { DEFAULT_LEADERBOARD, DEFAULT_LIVE_MATCH } from '@/lib/constants';

const LEADERBOARD_KEY = 'cod4_lan_leaderboard';
const LIVE_MATCH_KEY = 'cod4_lan_live_match';

const isBrowser = typeof window !== 'undefined';

function getStored<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('tournament_data_updated'));
  } catch {}
}

let inMemoryLeaderboard: LeaderboardTeam[] = [...DEFAULT_LEADERBOARD];
let inMemoryLiveMatch: LiveMatchData = { ...DEFAULT_LIVE_MATCH };

export const tournamentService = {
  getLeaderboard: (): LeaderboardTeam[] => {
    if (isBrowser) {
      inMemoryLeaderboard = getStored<LeaderboardTeam[]>(LEADERBOARD_KEY, inMemoryLeaderboard);
    }
    return inMemoryLeaderboard;
  },

  saveLeaderboard: (teams: LeaderboardTeam[]) => {
    inMemoryLeaderboard = teams;
    setStored(LEADERBOARD_KEY, teams);
  },

  getLiveMatch: (): LiveMatchData => {
    if (isBrowser) {
      inMemoryLiveMatch = getStored<LiveMatchData>(LIVE_MATCH_KEY, inMemoryLiveMatch);
    }
    return inMemoryLiveMatch;
  },

  saveLiveMatch: (data: LiveMatchData) => {
    inMemoryLiveMatch = data;
    setStored(LIVE_MATCH_KEY, data);
  },
};
