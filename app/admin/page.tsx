'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Trophy,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Key,
  ShieldCheck,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';
import { LeaderboardTeam } from '../leaderboard/page';

interface RegisteredSquad {
  id: string;
  teamName: string;
  captainName: string;
  contactNo: string;
  campus: string;
  members: string[];
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  dateRegistered: string;
}

const DEFAULT_SQUADS: RegisteredSquad[] = [
  {
    id: 'squad-1',
    teamName: 'GHOST REAPERS',
    captainName: 'Kasun Perera',
    contactNo: '+94 77 123 4567',
    campus: 'CST Degree Program',
    members: ['Kasun (Captain)', 'Nimal (Sniper)', 'Sunil (Assault)', 'Kamal (SMG)', 'Ruwan (Demo)'],
    status: 'VERIFIED',
    dateRegistered: '2026-09-18',
  },
  {
    id: 'squad-2',
    teamName: 'TITAN STRIKERS',
    captainName: 'Dinesh Fernando',
    contactNo: '+94 71 987 6543',
    campus: 'Computer Science Faculty',
    members: ['Dinesh (Captain)', 'Pathum (Sniper)', 'Amila (Assault)', 'Sahan (SMG)', 'Janith (Demo)'],
    status: 'VERIFIED',
    dateRegistered: '2026-09-19',
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'registrations'>('leaderboard');
  const [teams, setTeams] = useState<LeaderboardTeam[]>([]);
  const [squads, setSquads] = useState<RegisteredSquad[]>(DEFAULT_SQUADS);

  // Form states for adding/editing a team in Leaderboard
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

  // Load Leaderboard state from LocalStorage
  useEffect(() => {
    const storedLb = localStorage.getItem('cod4_lan_leaderboard');
    if (storedLb) {
      try {
        setTeams(JSON.parse(storedLb));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save Leaderboard to LocalStorage
  const saveLeaderboard = (updated: LeaderboardTeam[]) => {
    setTeams(updated);
    localStorage.setItem('cod4_lan_leaderboard', JSON.stringify(updated));
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
      // Update team
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
      // Add new team
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

    // Reset form
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

  const handleToggleSquadStatus = (squadId: string) => {
    setSquads(
      squads.map((s) => {
        if (s.id === squadId) {
          const nextStatus = s.status === 'VERIFIED' ? 'PENDING' : 'VERIFIED';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
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
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        {/* PIN Authentication Gate */}
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
            {/* Admin Header Banner */}
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

              {/* Tab Switcher */}
              <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded transition-all border ${
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded transition-all border ${
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

            {/* TAB 1: LEADERBOARD MANAGER */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-8">
                {/* Form to Add / Edit Team */}
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

                {/* Leaderboard Table List */}
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

            {/* TAB 2: SQUAD REGISTRATIONS MANAGER */}
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
                          onClick={() => handleToggleSquadStatus(squad.id)}
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
