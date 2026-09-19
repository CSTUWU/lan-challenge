'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Award, ArrowLeft, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
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

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<LeaderboardTeam[]>(DEFAULT_LEADERBOARD);
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  // Synchronize with LocalStorage state updated from Admin Panel
  useEffect(() => {
    const stored = localStorage.getItem('cod4_lan_leaderboard');
    if (stored) {
      try {
        setTeams(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse leaderboard state', e);
      }
    } else {
      localStorage.setItem('cod4_lan_leaderboard', JSON.stringify(DEFAULT_LEADERBOARD));
    }
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

      <main className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24">
        {/* Top Back Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        {/* Page Hero Header */}
        <div className="hud-border bg-[#0b0e14]/90 p-8 rounded-xl border border-[#00ff66]/40 mb-10 glow-box-green relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-[#00ff66]" />
          </div>

          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>LIVE TOURNAMENT RANKINGS // CST DEGREE PROGRAM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            OFFICIAL LEADERBOARD & STANDINGS
          </h1>
          <p className="mt-3 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Real-time standings, match points, round differentials, and bracket qualifications for Call of Duty 4 Promod LAN Challenge. Managed live by match referees.
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

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={playGunCockSound}
      />
    </div>
  );
}
