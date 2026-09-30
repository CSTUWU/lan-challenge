import { LeaderboardTeam, LiveMatchData, RegisteredSquad } from '@/types/tournament';
import { DEFAULT_LEADERBOARD, DEFAULT_LIVE_MATCH, DEFAULT_SQUADS } from '@/lib/constants';

const LEADERBOARD_KEY = 'cod4_lan_leaderboard';
const LIVE_MATCH_KEY = 'cod4_lan_live_match';
const SQUADS_KEY = 'cod4_lan_squads';

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
let inMemorySquads: RegisteredSquad[] = [...DEFAULT_SQUADS];

export function sortLeaderboard(teams: LeaderboardTeam[]): LeaderboardTeam[] {
  return [...teams]
    .sort((a, b) => {
      const diffA = a.roundsWon - a.roundsLost;
      const diffB = b.roundsWon - b.roundsLost;
      return b.points - a.points || diffB - diffA;
    })
    .map((team, idx) => ({ ...team, rank: idx + 1 }));
}

export const tournamentService = {
  getLeaderboard: (): LeaderboardTeam[] => {
    if (isBrowser) {
      inMemoryLeaderboard = getStored<LeaderboardTeam[]>(LEADERBOARD_KEY, inMemoryLeaderboard);
    }
    return inMemoryLeaderboard;
  },

  saveLeaderboard: (teams: LeaderboardTeam[]) => {
    const sorted = sortLeaderboard(teams);
    inMemoryLeaderboard = sorted;
    setStored(LEADERBOARD_KEY, sorted);
    return sorted;
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

  getSquads: (): RegisteredSquad[] => {
    if (isBrowser) {
      inMemorySquads = getStored<RegisteredSquad[]>(SQUADS_KEY, inMemorySquads);
    }
    return inMemorySquads;
  },

  saveSquads: (squads: RegisteredSquad[]) => {
    inMemorySquads = squads;
    setStored(SQUADS_KEY, squads);
  },

  registerSquad: (squadInput: {
    teamName: string;
    captainName: string;
    contactNo: string;
    campus: string;
    members: string[];
  }): RegisteredSquad => {
    const current = tournamentService.getSquads();
    const newSquad: RegisteredSquad = {
      id: `squad-${Date.now()}`,
      teamName: squadInput.teamName.trim().toUpperCase(),
      captainName: squadInput.captainName.trim(),
      contactNo: squadInput.contactNo.trim(),
      campus: squadInput.campus,
      members: squadInput.members,
      status: 'VERIFIED',
      dateRegistered: new Date().toISOString().split('T')[0],
    };
    const updated = [newSquad, ...current];
    tournamentService.saveSquads(updated);
    return newSquad;
  },

  toggleSquadStatus: (squadId: string): RegisteredSquad[] => {
    const current = tournamentService.getSquads();
    const updated = current.map((s) =>
      s.id === squadId
        ? { ...s, status: (s.status === 'VERIFIED' ? 'PENDING' : 'VERIFIED') as RegisteredSquad['status'] }
        : s
    );
    tournamentService.saveSquads(updated);
    return updated;
  },

  verifyAdminPasscode: (passcode: string): boolean => {
    return ['1337', 'admin2026'].includes(passcode.trim());
  },

  isAdminAuthenticated: (): boolean => {
    if (!isBrowser) return false;
    try {
      return sessionStorage.getItem('cod4_lan_admin_auth') === 'true';
    } catch {
      return false;
    }
  },

  setAdminAuthenticated: (auth: boolean): void => {
    if (!isBrowser) return;
    try {
      if (auth) {
        sessionStorage.setItem('cod4_lan_admin_auth', 'true');
      } else {
        sessionStorage.removeItem('cod4_lan_admin_auth');
      }
    } catch {}
  },
};
