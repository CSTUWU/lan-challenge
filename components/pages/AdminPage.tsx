'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Trophy,
  Users,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Save,
  Radio,
} from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';
import { LeaderboardTeam, LiveMatchData, RegisteredSquad } from '@/types/tournament';
import { DEFAULT_SQUADS, DEFAULT_LIVE_MATCH } from '@/lib/constants';
import { tournamentService } from '@/service/tournamentService';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'live' | 'leaderboard' | 'registrations'>('live');
  const [teams, setTeams] = useState<LeaderboardTeam[]>([]);
  const [squads, setSquads] = useState<RegisteredSquad[]>(DEFAULT_SQUADS);
  const [liveMatch, setLiveMatch] = useState<LiveMatchData>(DEFAULT_LIVE_MATCH);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    group: 'Group A' | 'Group B' | 'Playoffs';
    played: number;
    wins: number;
    losses: number;
    roundsWon: number;
    roundsLost: number;
    points: number;
    status: 'CHAMPIONS' | 'QUALIFIED' | 'CONTENDER' | 'ELIMINATED';
  }>({
    name: '',
    group: 'Group A',
    played: 0,
    wins: 0,
    losses: 0,
    roundsWon: 0,
    roundsLost: 0,
    points: 0,
    status: 'CONTENDER',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  useEffect(() => {
    setTeams(tournamentService.getLeaderboard());
    setLiveMatch(tournamentService.getLiveMatch());
  }, []);

  const saveLeaderboard = (updated: LeaderboardTeam[]) => {
    setTeams(updated);
    tournamentService.saveLeaderboard(updated);
  };

  const saveLiveMatch = (updated: LiveMatchData) => {
    setLiveMatch(updated);
    tournamentService.saveLiveMatch(updated);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1337' || pinInput === 'admin2026') {
      setIsAuthenticated(true);
      setPinError(false);
      playGunCockSound();
    } else {
      setPinError(true);
    }
  };

  const handleSaveTeam = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      const updated = teams.map((t) =>
        t.id === editingId
          ? {
              ...t,
              name: formData.name.toUpperCase(),
              group: formData.group,
              played: formData.played,
              wins: formData.wins,
              losses: formData.losses,
              roundsWon: formData.roundsWon,
              roundsLost: formData.roundsLost,
              points: formData.points,
              status: formData.status,
            }
          : t
      );
      saveLeaderboard(updated);
      setEditingId(null);
    } else {
      const newTeam: LeaderboardTeam = {
        id: `team-${Date.now()}`,
        rank: teams.length + 1,
        name: formData.name.toUpperCase(),
        group: formData.group,
        played: formData.played,
        wins: formData.wins,
        losses: formData.losses,
        roundsWon: formData.roundsWon,
        roundsLost: formData.roundsLost,
        points: formData.points,
        status: formData.status,
      };
      saveLeaderboard([...teams, newTeam]);
    }

    setFormData({
      name: '',
      group: 'Group A',
      played: 0,
      wins: 0,
      losses: 0,
      roundsWon: 0,
      roundsLost: 0,
      points: 0,
      status: 'CONTENDER',
    });
    playGunCockSound();
  };

  const handleEditClick = (team: LeaderboardTeam) => {
    setEditingId(team.id);
    setFormData({
      name: team.name,
      group: team.group,
      played: team.played,
      wins: team.wins,
      losses: team.losses,
      roundsWon: team.roundsWon,
      roundsLost: team.roundsLost,
      points: team.points,
      status: team.status,
    });
  };

  const handleDeleteTeam = (id: string) => {
    const updated = teams.filter((t) => t.id !== id);
    saveLeaderboard(updated);
  };

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
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        {!isAuthenticated ? (
          <div className="max-w-md mx-auto hud-border bg-[#0b0e14]/90 p-8 rounded-xl border border-[#00ff66]/40 glow-box-green my-12 text-center">
            <div className="w-12 h-12 bg-[#00ff66]/20 border border-[#00ff66] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-[#00ff66]" />
            </div>
            <h1 className="text-2xl font-display font-black text-white uppercase tracking-wider mb-2">
              ADMINISTRATOR AUTHENTICATION
            </h1>
            <p className="text-xs font-mono text-gray-400 mb-6 uppercase">
              ENTER MATCH REFEREE PASSCODE TO ACCESS CONTROL PORTAL
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4 font-mono text-xs">
              <input
                type="password"
                placeholder="ENTER ADMIN PIN (e.g. 1337)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#151a21] border border-[#00ff66]/40 rounded text-center text-white text-base tracking-widest placeholder-gray-500 focus:outline-none focus:border-[#00ff66]"
              />

              {pinError && (
                <div className="text-red-400 text-xs font-mono">
                  [!] ACCESS DENIED: INVALID ADMIN PASSCODE
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)]"
              >
                AUTHORIZE ACCESS
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 mb-8 glow-box-green flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-1">
                  <span className="w-2.5 h-2.5 bg-[#00ff66] animate-ping"></span>
                  <span>MATCH REFEREE PORTAL // ACTIVE SESSION</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-wider">
                  TOURNAMENT CONTROL CENTER
                </h1>
              </div>

              <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('live')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded transition-all border ${
                    activeTab === 'live'
                      ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] font-bold shadow-[0_0_12px_rgba(0,255,102,0.3)]'
                      : 'border-[#00ff66]/30 bg-[#1a1f26]/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>LIVE MATCH CONTROL</span>
                </button>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded transition-all border ${
                    activeTab === 'leaderboard'
                      ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] font-bold shadow-[0_0_12px_rgba(0,255,102,0.3)]'
                      : 'border-[#00ff66]/30 bg-[#1a1f26]/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>LEADERBOARD MANAGER</span>
                </button>
                <button
                  onClick={() => setActiveTab('registrations')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded transition-all border ${
                    activeTab === 'registrations'
                      ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] font-bold shadow-[0_0_12px_rgba(0,255,102,0.3)]'
                      : 'border-[#00ff66]/30 bg-[#1a1f26]/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>SQUAD REGISTRATIONS</span>
                </button>
              </div>
            </div>

            {activeTab === 'live' && (
              <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 glow-box-green space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#00ff66]/30 pb-4">
                  <div className="flex items-center space-x-3">
                    <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                    <h3 className="text-xl font-display font-bold text-white uppercase">
                      LIVE MATCH ARENA OVERLAY CONTROLLER
                    </h3>
                  </div>

                  <button
                    onClick={() => saveLiveMatch({ ...liveMatch, isLive: !liveMatch.isLive })}
                    className={`px-4 py-2 rounded font-bold uppercase tracking-wider border transition-all ${
                      liveMatch.isLive
                        ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                        : 'border-[#00ff66]/40 bg-gray-800 text-gray-400'
                    }`}
                  >
                    STATUS: {liveMatch.isLive ? 'BROADCASTING LIVE' : 'OFFLINE'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1">STAGE TITLE</label>
                    <input
                      type="text"
                      value={liveMatch.stageTitle}
                      onChange={(e) => saveLiveMatch({ ...liveMatch, stageTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">MAP NAME</label>
                    <select
                      value={liveMatch.mapName}
                      onChange={(e) => saveLiveMatch({ ...liveMatch, mapName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                    >
                      <option value="mp_crash">mp_crash</option>
                      <option value="mp_crossfire">mp_crossfire</option>
                      <option value="mp_backlot">mp_backlot</option>
                      <option value="mp_strike">mp_strike</option>
                      <option value="mp_citystreets">mp_citystreets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">ROUND INFO</label>
                    <input
                      type="text"
                      value={liveMatch.roundInfo}
                      onChange={(e) => saveLiveMatch({ ...liveMatch, roundInfo: e.target.value })}
                      className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                  <div className="p-4 bg-[#151a21] rounded border border-[#00ff66]/30 space-y-4">
                    <h4 className="text-base font-display font-bold text-[#00ff66] uppercase">
                      TEAM 1 (LEFT SIDE)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">TEAM NAME</label>
                        <input
                          type="text"
                          value={liveMatch.team1.name}
                          onChange={(e) =>
                            saveLiveMatch({
                              ...liveMatch,
                              team1: { ...liveMatch.team1, name: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white font-bold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">SCORE</label>
                        <input
                          type="number"
                          value={liveMatch.team1.score}
                          onChange={(e) =>
                            saveLiveMatch({
                              ...liveMatch,
                              team1: { ...liveMatch.team1, score: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-[#00ff66] text-lg font-black text-center focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">PLAYERS (5 ROSTER NAMES):</label>
                      {liveMatch.team1.players.map((player, pIdx) => (
                        <input
                          key={pIdx}
                          type="text"
                          value={player}
                          onChange={(e) => {
                            const newPlayers = [...liveMatch.team1.players];
                            newPlayers[pIdx] = e.target.value;
                            saveLiveMatch({
                              ...liveMatch,
                              team1: { ...liveMatch.team1, players: newPlayers },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 mb-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 focus:border-[#00ff66] focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#151a21] rounded border border-teal-500/30 space-y-4">
                    <h4 className="text-base font-display font-bold text-teal-400 uppercase">
                      TEAM 2 (RIGHT SIDE)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">TEAM NAME</label>
                        <input
                          type="text"
                          value={liveMatch.team2.name}
                          onChange={(e) =>
                            saveLiveMatch({
                              ...liveMatch,
                              team2: { ...liveMatch.team2, name: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#0b0e14] border border-teal-500/30 rounded text-white font-bold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">SCORE</label>
                        <input
                          type="number"
                          value={liveMatch.team2.score}
                          onChange={(e) =>
                            saveLiveMatch({
                              ...liveMatch,
                              team2: { ...liveMatch.team2, score: parseInt(e.target.value) || 0 },
                            })
                          }
                          className="w-full px-3 py-2 bg-[#0b0e14] border border-teal-500/30 rounded text-teal-400 text-lg font-black text-center focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">PLAYERS (5 ROSTER NAMES):</label>
                      {liveMatch.team2.players.map((player, pIdx) => (
                        <input
                          key={pIdx}
                          type="text"
                          value={player}
                          onChange={(e) => {
                            const newPlayers = [...liveMatch.team2.players];
                            newPlayers[pIdx] = e.target.value;
                            saveLiveMatch({
                              ...liveMatch,
                              team2: { ...liveMatch.team2, players: newPlayers },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 mb-1.5 bg-[#0b0e14] border border-gray-700 rounded text-gray-200 focus:border-teal-400 focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="space-y-8">
                <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border border-[#00ff66]/30 font-mono text-xs">
                  <h3 className="text-lg font-display font-bold text-white uppercase mb-4 text-[#00ff66]">
                    {editingId ? 'EDIT SQUAD STATS' : 'ADD NEW SQUAD TO LEADERBOARD'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-1">SQUAD NAME</label>
                      <input
                        type="text"
                        placeholder="e.g. GHOST REAPERS"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">GROUP</label>
                      <select
                        value={formData.group}
                        onChange={(e) => setFormData({ ...formData, group: e.target.value as any })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      >
                        <option value="Group A">Group A</option>
                        <option value="Group B">Group B</option>
                        <option value="Playoffs">Playoffs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">STATUS BADGE</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      >
                        <option value="CHAMPIONS">CHAMPIONS</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CONTENDER">CONTENDER</option>
                        <option value="ELIMINATED">ELIMINATED</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">TOTAL POINTS</label>
                      <input
                        type="number"
                        value={formData.points}
                        onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-1">MATCHES PLAYED</label>
                      <input
                        type="number"
                        value={formData.played}
                        onChange={(e) => setFormData({ ...formData, played: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">WINS</label>
                      <input
                        type="number"
                        value={formData.wins}
                        onChange={(e) => setFormData({ ...formData, wins: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">LOSSES</label>
                      <input
                        type="number"
                        value={formData.losses}
                        onChange={(e) => setFormData({ ...formData, losses: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">ROUNDS WON / LOST</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="WON"
                          value={formData.roundsWon}
                          onChange={(e) => setFormData({ ...formData, roundsWon: parseInt(e.target.value) || 0 })}
                          className="w-1/2 px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                        />
                        <input
                          type="number"
                          placeholder="LOST"
                          value={formData.roundsLost}
                          onChange={(e) => setFormData({ ...formData, roundsLost: parseInt(e.target.value) || 0 })}
                          className="w-1/2 px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSaveTeam}
                      className="px-6 py-2.5 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold uppercase tracking-wider rounded transition-all flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingId ? 'UPDATE STANDINGS' : 'ADD TO LEADERBOARD'}</span>
                    </button>
                    {editingId && (
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({
                            name: '',
                            group: 'Group A',
                            played: 0,
                            wins: 0,
                            losses: 0,
                            roundsWon: 0,
                            roundsLost: 0,
                            points: 0,
                            status: 'CONTENDER',
                          });
                        }}
                        className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs uppercase rounded"
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                </div>

                <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border border-[#00ff66]/30">
                  <h3 className="text-lg font-display font-bold text-white uppercase mb-4">
                    CURRENT LEADERBOARD ENTRIES
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-[#00ff66]/20 text-[#00ff66] uppercase">
                          <th className="py-2 px-3">SQUAD</th>
                          <th className="py-2 px-3">GROUP</th>
                          <th className="py-2 px-3 text-center">P</th>
                          <th className="py-2 px-3 text-center">W</th>
                          <th className="py-2 px-3 text-center">L</th>
                          <th className="py-2 px-3 text-center">PTS</th>
                          <th className="py-2 px-3 text-center">STATUS</th>
                          <th className="py-2 px-3 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60">
                        {teams.map((t) => (
                          <tr key={t.id} className="hover:bg-[#00ff66]/5">
                            <td className="py-3 px-3 font-bold text-white">{t.name}</td>
                            <td className="py-3 px-3 text-gray-400">{t.group}</td>
                            <td className="py-3 px-3 text-center">{t.played}</td>
                            <td className="py-3 px-3 text-center text-emerald-400">{t.wins}</td>
                            <td className="py-3 px-3 text-center text-red-400">{t.losses}</td>
                            <td className="py-3 px-3 text-center font-black text-[#00ff66]">{t.points}</td>
                            <td className="py-3 px-3 text-center">
                              <span className="px-2 py-0.5 text-[10px] border border-[#00ff66]/40 rounded text-[#00ff66]">
                                {t.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right space-x-2">
                              <button
                                onClick={() => handleEditClick(t)}
                                className="p-1.5 bg-[#00ff66]/20 text-[#00ff66] hover:bg-[#00ff66]/40 rounded border border-[#00ff66]/40"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteTeam(t.id)}
                                className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded border border-red-500/40"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'registrations' && (
              <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border border-[#00ff66]/30">
                <h3 className="text-lg font-display font-bold text-white uppercase mb-4 text-[#00ff66]">
                  REGISTERED SQUADS & PAYMENT VERIFICATION
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  {squads.map((squad) => (
                    <div
                      key={squad.id}
                      className="p-4 bg-[#151a21] rounded border border-[#00ff66]/20 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-base font-display font-bold text-white">{squad.teamName}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 rounded">
                            {squad.campus}
                          </span>
                        </div>
                        <div className="text-gray-400 mt-1">
                          Captain: <strong className="text-white">{squad.captainName}</strong> | Phone: {squad.contactNo}
                        </div>
                        <div className="text-gray-500 text-[11px] mt-1">
                          Squad Members: {squad.members.join(', ')}
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setSquads(
                              squads.map((s) =>
                                s.id === squad.id
                                  ? { ...s, status: s.status === 'VERIFIED' ? 'PENDING' : 'VERIFIED' }
                                  : s
                              )
                            );
                          }}
                          className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider border flex items-center space-x-1.5 ${
                            squad.status === 'VERIFIED'
                              ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66]'
                              : 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {squad.status === 'VERIFIED' ? (
                            <CheckCircle className="w-4 h-4 text-[#00ff66]" />
                          ) : (
                            <XCircle className="w-4 h-4 text-yellow-400" />
                          )}
                          <span>{squad.status}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={playGunCockSound}
      />
    </div>
  );
}
