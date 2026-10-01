'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Maximize2, Monitor } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { LeaderboardPodium } from '@/components/ui/LeaderboardPodium';
import { LeaderboardTable } from '@/components/ui/LeaderboardTable';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';
import { LeaderboardTeam, LiveMatchData } from '@/types/tournament';
import { tournamentService, sortLeaderboard } from '@/service/tournamentService';

const RegistrationModal = dynamic(
  () => import('@/components/ui/RegistrationModal').then((mod) => mod.RegistrationModal),
  { ssr: false }
);

const LiveMatchModal = dynamic(
  () => import('@/components/ui/LiveMatchModal').then((mod) => mod.LiveMatchModal),
  { ssr: false }
);

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<LeaderboardTeam[]>(() => tournamentService.getLeaderboard());
  const [liveMatch, setLiveMatch] = useState<LiveMatchData>(() => tournamentService.getLiveMatch());
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  useEffect(() => {
    const syncData = () => {
      if (document.hidden) return;
      setLiveMatch(tournamentService.getLiveMatch());
      setTeams([...tournamentService.getLeaderboard()]);
    };

    const interval = setInterval(syncData, 2000);
    window.addEventListener('storage', syncData);
    window.addEventListener('tournament_data_updated', syncData);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', syncData);
      window.removeEventListener('tournament_data_updated', syncData);
    };
  }, []);

  const toggleKioskFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => { });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => { });
      }
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const top3 = sortLeaderboard(teams).slice(0, 3);

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
        {/* Top Navigation & Kiosk / Live Match Modal Trigger Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30 self-start"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO COMMAND CENTER</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                toggleKioskFullscreen();
                playGunCockSound();
              }}
              aria-label={isFullscreen ? 'Exit kiosk mode' : 'Enter kiosk fullscreen mode'}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#0b0e14] border border-[#00ff66]/50 hover:bg-[#00ff66]/20 text-[#00ff66] rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.25)] transition-all font-mono text-xs group"
            >
              <Monitor className="w-4 h-4 text-[#00ff66] group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-wider">
                {isFullscreen ? 'EXIT KIOSK MODE' : 'KIOSK FULLSCREEN MODE'}
              </span>
            </button>

            <button
              onClick={() => {
                setIsLiveModalOpen(true);
                playGunCockSound();
              }}
              aria-label="Open live match broadcast modal"
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
        </div>

        {/* Page Hero Header */}
        <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 mb-10 glow-box-green relative overflow-hidden">
          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>LIVE TOURNAMENT RANKINGS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            OFFICIAL LEADERBOARD & STANDINGS
          </h1>
          <p className="mt-2 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Real-time standings, match points, round differentials, and bracket qualifications for Call of Duty 4 LAN Challenge. Click the broadcast button above to view live match details.
          </p>
        </div>

        {/* Reusable TOP 3 PODIUM */}
        <LeaderboardPodium top3={top3} />

        {/* Reusable FULL LEADERBOARD TABLE */}
        <LeaderboardTable
          teams={teams}
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />


      </main>

      {/* Reusable POPUP MODAL */}
      <LiveMatchModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        liveMatch={liveMatch}
      />

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={playGunCockSound}
      />
    </div>
  );
}
