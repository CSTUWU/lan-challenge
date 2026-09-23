'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, ArrowLeft, Radio } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { AdminAuthGate } from '@/components/ui/AdminAuthGate';
import { AdminLiveController } from '@/components/ui/AdminLiveController';
import { AdminLeaderboardManager } from '@/components/ui/AdminLeaderboardManager';
import { AdminSquadRegistrations } from '@/components/ui/AdminSquadRegistrations';
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

  const handleToggleSquadStatus = (squadId: string) => {
    setSquads(
      squads.map((s) =>
        s.id === squadId
          ? { ...s, status: s.status === 'VERIFIED' ? 'PENDING' : 'VERIFIED' }
          : s
      )
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
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        {!isAuthenticated ? (
          <AdminAuthGate
            pinInput={pinInput}
            setPinInput={setPinInput}
            pinError={pinError}
            onAuthorize={handlePinSubmit}
          />
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
              <AdminLiveController
                liveMatch={liveMatch}
                onSaveLiveMatch={saveLiveMatch}
              />
            )}

            {activeTab === 'leaderboard' && (
              <AdminLeaderboardManager
                teams={teams}
                editingId={editingId}
                formData={formData}
                setFormData={setFormData}
                onSaveTeam={handleSaveTeam}
                onEditClick={handleEditClick}
                onDeleteTeam={handleDeleteTeam}
                onCancelEdit={() => {
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
              />
            )}

            {activeTab === 'registrations' && (
              <AdminSquadRegistrations
                squads={squads}
                onToggleStatus={handleToggleSquadStatus}
              />
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
