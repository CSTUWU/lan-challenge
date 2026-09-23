'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playGunCockSound();
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

      <main className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24 flex flex-col items-center">
        <Link
          href="/"
          className="self-start inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        <div className="w-full max-w-md hud-border bg-[#0b0e14]/90 p-8 rounded-xl border border-[#00ff66]/40 glow-box-green my-12 text-center font-mono">
          <div className="w-12 h-12 bg-[#00ff66]/20 border border-[#00ff66] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#00ff66]" />
          </div>
          <h1 className="text-2xl font-display font-black text-white uppercase tracking-wider mb-2">
            TACTICAL OPERATIVE LOGIN
          </h1>
          <p className="text-xs font-mono text-gray-400 mb-6 uppercase">
            AUTHENTICATE CREDENTIALS TO ACCESS OPERATIVE DASHBOARD
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
            <div>
              <label className="block text-gray-400 mb-1">OPERATIVE CALLSIGN / EMAIL</label>
              <input
                type="text"
                placeholder="CALLSIGN OR EMAIL"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#151a21] border border-[#00ff66]/40 rounded text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">ACCESS SECURITY CODE</label>
              <input
                type="password"
                placeholder="SECURITY PASSCODE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#151a21] border border-[#00ff66]/40 rounded text-white text-sm focus:outline-none focus:border-[#00ff66]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] mt-2"
            >
              AUTHENTICATE SQUAD ACCESS
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-800 text-[11px] text-gray-400 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
            <span>ENCRYPTED COMMAND PORTAL // PROMOD LAN 2026</span>
          </div>
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
