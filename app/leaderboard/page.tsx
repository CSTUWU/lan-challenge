'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Award,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Radio,
  Crosshair,
  Users,
  Activity,
  X,
  ExternalLink,
  Maximize2,
} from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

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

const DEFAULT_LEADERBOARD: LeaderboardTeam[] = [
  {
    id: 'team-1',
    rank: 1,
    name: 'GHOST REAPERS',
    group: 'Group A',
    played: 5,
    wins: 5,
    losses: 0,
    roundsWon: 65,
    roundsLost: 20,
    points: 15,
    status: 'CHAMPIONS',
  },
  {
    id: 'team-2',
    rank: 2,
    name: 'TITAN STRIKERS',
    group: 'Group A',
    played: 5,
    wins: 4,
    losses: 1,
    roundsWon: 58,
    roundsLost: 31,
    points: 12,
    status: 'QUALIFIED',
  },
  {
    id: 'team-3',
    rank: 3,
    name: 'VIPER TACTICAL',
    group: 'Group B',
    played: 5,
    wins: 4,
    losses: 1,
    roundsWon: 54,
    roundsLost: 35,
    points: 12,
    status: 'QUALIFIED',
  },
  {
    id: 'team-4',
    rank: 4,
    name: 'SHADOW SQUAD',
    group: 'Group B',
    played: 5,
    wins: 3,
    losses: 2,
    roundsWon: 48,
    roundsLost: 40,
    points: 9,
    status: 'CONTENDER',
  },
  {
    id: 'team-5',
    rank: 5,
    name: 'ALPHA PROTOCOL',
    group: 'Group A',
    played: 5,
    wins: 2,
    losses: 3,
    roundsWon: 39,
    roundsLost: 49,
    points: 6,
    status: 'CONTENDER',
  },
  {
    id: 'team-6',
    rank: 6,
    name: 'BRAVO SPECTRES',
    group: 'Group B',
    played: 5,
    wins: 1,
    losses: 4,
    roundsWon: 28,
    roundsLost: 56,
    points: 3,
    status: 'ELIMINATED',
  },
];

const DEFAULT_LIVE_MATCH: LiveMatchData = {
  isLive: true,
  stageTitle: 'GRAND FINALS // BEST OF 3',
  mapName: 'mp_crash',
  roundInfo: 'ROUND 14 / 24 (HALF-TIME)',
  team1: {
    name: 'GHOST REAPERS',
    score: 8,
    side: 'ATTACKERS',
    players: ['Kasun (Sniper)', 'Nimal (Assault)', 'Sunil (Assault)', 'Kamal (SMG)', 'Ruwan (Demo)'],
  },
  team2: {
    name: 'TITAN STRIKERS',
    score: 6,
    side: 'DEFENDERS',
    players: ['Dinesh (Sniper)', 'Pathum (Assault)', 'Amila (Assault)', 'Sahan (SMG)', 'Janith (Demo)'],
  },
};

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<LeaderboardTeam[]>(DEFAULT_LEADERBOARD);
  const [liveMatch, setLiveMatch] = useState<LiveMatchData>(DEFAULT_LIVE_MATCH);
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  // Synchronize with LocalStorage state updated from Admin Panel
  useEffect(() => {
    const storedLb = localStorage.getItem('cod4_lan_leaderboard');
    if (storedLb) {
      try {
        setTeams(JSON.parse(storedLb));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('cod4_lan_leaderboard', JSON.stringify(DEFAULT_LEADERBOARD));
    }

    const storedLive = localStorage.getItem('cod4_lan_live_match');
    if (storedLive) {
      try {
        setLiveMatch(JSON.parse(storedLive));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('cod4_lan_live_match', JSON.stringify(DEFAULT_LIVE_MATCH));
    }

    // Auto polling for live match state sync
    const interval = setInterval(() => {
      const latestLive = localStorage.getItem('cod4_lan_live_match');
      if (latestLive) {
        try {
          setLiveMatch(JSON.parse(latestLive));
        } catch (e) {
          console.error(e);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredTeams = selectedGroup === 'ALL'
    ? teams
    : teams.filter((t) => t.group === selectedGroup);

  const top3 = [...teams].sort((a, b) => b.points - a.points || (b.roundsWon - b.roundsLost) - (a.roundsWon - a.roundsLost)).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#050709] text-white">
      <div className="screen-overlay fixed inset-0 z-10 pointer-events-none" />

      <Header
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={toggleAudio}
        onOpenModal={() => {
          setIsModalOpen(true);
          playGunCockSound();
        }}
      />

      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-24">
        {/* Top Navigation & Live Match Modal Trigger Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30 self-start"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO COMMAND CENTER</span>
          </Link>

          {/* LIVE MATCH POPUP MODAL BUTTON */}
          <button
            onClick={() => {
              setIsLiveModalOpen(true);
              playGunCockSound();
            }}
            className="inline-flex items-center justify-center space-x-2.5 px-5 py-2.5 bg-[#0b0e14] border-2 border-red-500 hover:border-[#00ff66] text-white rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_25px_rgba(0,255,102,0.4)] transition-all group font-mono text-xs"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-bold tracking-widest text-red-400 group-hover:text-[#00ff66] uppercase">
              LAUNCH LIVE MATCH BROADCAST OVERLAY
            </span>
            <Maximize2 className="w-4 h-4 text-red-400 group-hover:text-[#00ff66]" />
          </button>
        </div>

        {/* Page Hero Header */}
        <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 mb-10 glow-box-green relative overflow-hidden">
          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>LIVE TOURNAMENT RANKINGS // CST DEGREE PROGRAM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            OFFICIAL LEADERBOARD & STANDINGS
          </h1>
          <p className="mt-2 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Real-time standings, match points, round differentials, and bracket qualifications for Call of Duty 4 Promod LAN Challenge. Click the broadcast button above to view live match details.
          </p>
        </div>

        {/* TOP 3 PODIUM */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-[#00ff66]" />
            <h2 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-wider">
              TOURNAMENT CHAMPIONS PODIUM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1st Place */}
            {top3[0] && (
              <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border-2 border-[#00ff66] shadow-[0_0_25px_rgba(0,255,102,0.3)] relative overflow-hidden order-1 md:order-2">
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#00ff66] text-black font-display font-black text-xs uppercase rounded">
                  1ST PLACE
                </div>
                <div className="text-4xl font-display font-black text-[#00ff66] mb-1">#1</div>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-wide">
                  {top3[0].name}
                </h3>
                <div className="text-xs font-mono text-emerald-400 mt-1 uppercase">{top3[0].group}</div>
                <div className="mt-4 pt-4 border-t border-[#00ff66]/20 flex justify-between font-mono text-xs text-gray-300">
                  <span>POINTS: <strong className="text-[#00ff66]">{top3[0].points} PTS</strong></span>
                  <span>W/L: <strong className="text-white">{top3[0].wins}-{top3[0].losses}</strong></span>
                </div>
              </div>
            )}

            {/* 2nd Place */}
            {top3[1] && (
              <div className="hud-border bg-[#0b0e14]/80 p-6 rounded-xl border border-teal-500/40 relative overflow-hidden order-2 md:order-1">
                <div className="absolute top-3 right-3 px-3 py-1 bg-teal-500/20 border border-teal-400 text-teal-300 font-display font-bold text-xs uppercase rounded">
                  2ND PLACE
                </div>
                <div className="text-3xl font-display font-black text-teal-400 mb-1">#2</div>
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
                  {top3[1].name}
                </h3>
                <div className="text-xs font-mono text-teal-400 mt-1 uppercase">{top3[1].group}</div>
                <div className="mt-4 pt-4 border-t border-teal-500/20 flex justify-between font-mono text-xs text-gray-300">
                  <span>POINTS: <strong className="text-teal-400">{top3[1].points} PTS</strong></span>
                  <span>W/L: <strong className="text-white">{top3[1].wins}-{top3[1].losses}</strong></span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="hud-border bg-[#0b0e14]/80 p-6 rounded-xl border border-emerald-500/30 relative overflow-hidden order-3">
                <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-display font-bold text-xs uppercase rounded">
                  3RD PLACE
                </div>
                <div className="text-3xl font-display font-black text-emerald-400 mb-1">#3</div>
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
                  {top3[2].name}
                </h3>
                <div className="text-xs font-mono text-emerald-400 mt-1 uppercase">{top3[2].group}</div>
                <div className="mt-4 pt-4 border-t border-emerald-500/20 flex justify-between font-mono text-xs text-gray-300">
                  <span>POINTS: <strong className="text-emerald-400">{top3[2].points} PTS</strong></span>
                  <span>W/L: <strong className="text-white">{top3[2].wins}-{top3[2].losses}</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FULL LEADERBOARD TABLE */}
        <section className="hud-border bg-[#0b0e14]/90 rounded-xl border border-[#00ff66]/30 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-[#00ff66]/20 pb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white uppercase">
                FULL SQUAD STANDINGS
              </h3>
              <p className="text-xs font-mono text-gray-400 mt-1 uppercase">
                AUTOMATICALLY SYNCHRONIZED WITH MATCH REFEREE DATA
              </p>
            </div>

            {/* Group Filter Buttons */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
              {['ALL', 'Group A', 'Group B', 'Playoffs'].map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1.5 rounded transition-all border ${
                    selectedGroup === group
                      ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] font-bold'
                      : 'border-[#00ff66]/30 bg-[#1a1f26]/60 text-gray-400 hover:text-white'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#00ff66]/20 text-[#00ff66] uppercase tracking-wider">
                  <th className="py-3 px-4">RANK</th>
                  <th className="py-3 px-4">SQUAD NAME</th>
                  <th className="py-3 px-4">GROUP</th>
                  <th className="py-3 px-4 text-center">PLAYED</th>
                  <th className="py-3 px-4 text-center">WINS</th>
                  <th className="py-3 px-4 text-center">LOSSES</th>
                  <th className="py-3 px-4 text-center">RD DIFF</th>
                  <th className="py-3 px-4 text-center">POINTS</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredTeams.map((team, idx) => {
                  const rdDiff = team.roundsWon - team.roundsLost;
                  return (
                    <tr
                      key={team.id}
                      className="hover:bg-[#00ff66]/5 transition-colors group"
                    >
                      <td className="py-4 px-4 font-bold text-[#00ff66]">
                        #{idx + 1}
                      </td>
                      <td className="py-4 px-4 font-display font-bold text-white text-sm group-hover:text-[#00ff66] transition-colors">
                        {team.name}
                      </td>
                      <td className="py-4 px-4 text-gray-400 uppercase">{team.group}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{team.played}</td>
                      <td className="py-4 px-4 text-center text-emerald-400 font-bold">{team.wins}</td>
                      <td className="py-4 px-4 text-center text-red-400">{team.losses}</td>
                      <td className={`py-4 px-4 text-center font-bold ${rdDiff >= 0 ? 'text-[#00ff66]' : 'text-red-400'}`}>
                        {rdDiff > 0 ? `+${rdDiff}` : rdDiff}
                      </td>
                      <td className="py-4 px-4 text-center text-lg font-black text-white glow-text-green">
                        {team.points}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-1 text-[10px] uppercase font-bold rounded border ${
                            team.status === 'CHAMPIONS'
                              ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                              : team.status === 'QUALIFIED'
                              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                              : team.status === 'CONTENDER'
                              ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
                              : 'border-red-500 bg-red-500/20 text-red-400'
                          }`}
                        >
                          {team.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Link to Admin Panel for referees */}
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-[#00ff66] transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>MATCH REFEREE LOGIN // ACCESS ADMIN PORTAL</span>
          </Link>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* POPUP MODAL: LIVE MATCH BROADCAST SCOREBOARD (PROJECTOR & MULTI-SCREEN) */}
      {/* ========================================================================= */}
      {isLiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-5xl hud-border bg-[#070a0e]/95 p-6 md:p-10 rounded-2xl border-2 border-[#00ff66] shadow-[0_0_50px_rgba(0,255,102,0.35)] glow-box-green my-8">
            {/* Modal Close Button */}
            <button
              onClick={() => setIsLiveModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#00ff66] border border-[#00ff66]/30 rounded-full bg-[#0b0e14] hover:bg-[#00ff66]/20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#00ff66]/30 pb-4 mb-8">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
                </span>
                <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase animate-pulse">
                  ● {liveMatch.isLive ? 'LIVE ARENA BROADCAST' : 'MATCH UPCOMING'}
                </span>
                <span className="text-gray-500 text-xs font-mono">|</span>
                <span className="text-[#00ff66] font-mono text-xs font-bold tracking-widest uppercase">
                  {liveMatch.stageTitle}
                </span>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center space-x-3 font-mono text-xs">
                <div className="px-3 py-1 bg-[#151a21] border border-[#00ff66]/40 rounded text-[#00ff66] font-bold uppercase">
                  MAP: {liveMatch.mapName}
                </div>
                <div className="text-gray-300 font-bold">{liveMatch.roundInfo}</div>
              </div>
            </div>

            {/* Main Arena Score Board Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
              {/* Team 1 Card (Attackers) */}
              <div className="lg:col-span-4 bg-[#0d1117] p-6 rounded-xl border-2 border-[#00ff66]/40 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#00ff66] font-bold tracking-widest uppercase">
                    {liveMatch.team1.side}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wide glow-text-green">
                  {liveMatch.team1.name}
                </h3>

                {/* Player Roster List */}
                <div className="mt-5 pt-4 border-t border-gray-800">
                  <div className="text-[11px] font-mono text-[#00ff66] uppercase tracking-widest mb-3 flex items-center space-x-1.5 font-bold">
                    <Users className="w-3.5 h-3.5 text-[#00ff66]" />
                    <span>SQUAD ROSTER (5 PLAYERS):</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-gray-200">
                    {liveMatch.team1.players.map((p, i) => (
                      <li key={i} className="flex items-center space-x-2 bg-[#161c24] px-3 py-1.5 rounded border border-[#00ff66]/20">
                        <span className="w-2 h-2 bg-[#00ff66] rounded-full"></span>
                        <span className="truncate font-semibold">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center Score Display */}
              <div className="lg:col-span-3 text-center py-6 bg-[#0a0d12] rounded-xl border-2 border-[#00ff66]/40 my-2 lg:my-0 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
                <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 font-bold">
                  LIVE MATCH SCORE
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <span className="text-6xl md:text-8xl font-display font-black text-white glow-text-green">
                    {liveMatch.team1.score}
                  </span>
                  <span className="text-3xl font-display text-gray-500 font-bold">:</span>
                  <span className="text-6xl md:text-8xl font-display font-black text-white glow-text-green">
                    {liveMatch.team2.score}
                  </span>
                </div>

                <div className="mt-3 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">
                  PROMOD S&D // MR12
                </div>
              </div>

              {/* Team 2 Card (Defenders) */}
              <div className="lg:col-span-4 bg-[#0d1117] p-6 rounded-xl border-2 border-teal-500/40 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-teal-400 font-bold tracking-widest uppercase">
                    {liveMatch.team2.side}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#00e65c]" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wide">
                  {liveMatch.team2.name}
                </h3>

                {/* Player Roster List */}
                <div className="mt-5 pt-4 border-t border-gray-800">
                  <div className="text-[11px] font-mono text-teal-400 uppercase tracking-widest mb-3 flex items-center space-x-1.5 font-bold">
                    <Users className="w-3.5 h-3.5 text-teal-400" />
                    <span>SQUAD ROSTER (5 PLAYERS):</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-gray-200">
                    {liveMatch.team2.players.map((p, i) => (
                      <li key={i} className="flex items-center space-x-2 bg-[#161c24] px-3 py-1.5 rounded border border-teal-500/20">
                        <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                        <span className="truncate font-semibold">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="mt-8 pt-4 border-t border-gray-800 text-center font-mono text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>CST DEGREE PROGRAM // COD4 LAN CHALLENGE LIVE ARENA</span>
              <span className="text-[#00ff66] font-bold">REAL-TIME OVERWATCH SYNC: ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={playGunCockSound}
      />
    </div>
  );
}
