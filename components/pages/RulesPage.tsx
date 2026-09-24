'use client';

import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
import { MapPoolSection } from '@/components/ui/MapPoolSection';
import { RulesSectionGrid } from '@/components/ui/RulesSectionGrid';
import { useState } from 'react';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

export default function RulesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  const maps = [
    { name: 'mp_backlot', desc: 'Urban construction zone with multi-story sniper angles & tight choke points.' },
    { name: 'mp_crash', desc: 'Downed helicopter courtyard. Fast-paced 5v5 S&D engagements.' },
    { name: 'mp_crossfire', desc: 'Central avenue sniper alley requiring tactical smoke & team coordination.' },
    { name: 'mp_citystreets', desc: 'Nighttime tactical warfare with flanking routes & close-quarters combat.' },
    { name: 'mp_strike', desc: 'Classic competitive map featuring balanced bomb sites A & B.' },
  ];

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

        <div className="hud-border bg-[#0b0e14]/90 p-8 rounded-xl border border-[#00ff66]/40 mb-12 glow-box-green relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Zap className="w-48 h-48 text-[#00ff66]" />
          </div>

          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>OFFICIAL TOURNAMENT DIRECTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            OFFICIAL TOURNAMENT RULES & REGULATIONS
          </h1>
          <p className="mt-3 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Standard operating procedure, game server configurations, weapon bans, binding restrictions, and fair-play regulations for Call of Duty 4 Modern Warfare LAN Challenge.
          </p>
        </div>

        {/* Reusable MAP POOL SECTION */}
        <MapPoolSection maps={maps} />

        {/* Reusable RULES SECTIONS GRID */}
        <RulesSectionGrid />

        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setIsModalOpen(true);
              playGunCockSound();
            }}
            className="px-10 py-4 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-black text-sm tracking-widest uppercase rounded shadow-[0_0_24px_rgba(0,255,102,0.6)] transition-all hover:scale-105 active:scale-95"
          >
            REGISTER YOUR SQUAD NOW
          </button>
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
