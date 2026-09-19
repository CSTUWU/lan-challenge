'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PrizePoolCard } from './PrizePoolCard';
import { GameplayFormatCard } from './GameplayFormatCard';
import { MapRotationCard } from './MapRotationCard';
import { RegistrationBanner } from './RegistrationBanner';

interface ProtocolsSectionProps {
  onOpenModal: () => void;
}

export function ProtocolsSection({ onOpenModal }: ProtocolsSectionProps) {
  return (
    <section className="relative w-full min-h-screen px-6 md:px-16 py-20 bg-gradient-to-b from-transparent via-[#080b0f]/30 to-[#050709]/60 border-t border-emerald-500/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#00ff66] font-mono tracking-widest text-xs uppercase block mb-1">
              OPERATION BRIEFING // CST DEGREE PROGRAM
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-wide">
              TOURNAMENT PROTOCOLS
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/rules"
              className="inline-flex items-center space-x-2 px-4 py-2 border border-[#00ff66]/50 hover:border-[#00ff66] bg-[#00ff66]/10 hover:bg-[#00ff66]/20 text-[#00ff66] font-mono text-xs uppercase tracking-wider rounded transition-all"
            >
              <span>VIEW FULL RULES & MAP POOL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PrizePoolCard />
          <GameplayFormatCard />
          <MapRotationCard />
        </div>

        <RegistrationBanner onOpenModal={onOpenModal} />

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs font-mono text-gray-400">
          CST DEGREE PROGRAM &copy; 2026 // COD4 MODERN WARFARE LAN CHALLENGE // DESIGNED FOR IMMERSIVE LAN BATTLES
        </div>
      </div>
    </section>
  );
}
