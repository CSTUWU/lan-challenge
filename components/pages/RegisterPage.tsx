'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Shield, Cpu, MessageSquare } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationForm } from '@/components/ui/RegistrationForm';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

export default function RegisterPage() {
  const { isAudioEnabled, toggleAudio, playGunCockSound } = useTacticalAudio();

  return (
    <div className="relative min-h-screen bg-[#050709] text-white">
      <div className="screen-overlay fixed inset-0 z-10 pointer-events-none" />

      <Header
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={toggleAudio}
      />

      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-24">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30 self-start"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        {/* Page Hero Header */}
        <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 mb-10 glow-box-green relative overflow-hidden">
          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>SQUAD ENLISTMENT PROTOCOL // ARENA CLEARANCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            OFFICIAL SQUAD REGISTRATION
          </h1>
          <p className="mt-2 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Enlist your 5-member roster for Call of Duty 4: Modern Warfare LAN Challenge. Open to all university faculties. Zero-latency gigabit network and mechanical tournament gear provided on-site.
          </p>
        </div>

        {/* Tactical Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 font-mono text-xs">
          <div className="bg-[#0e131a] p-4 rounded-lg border border-[#00ff66]/30">
            <div className="flex items-center space-x-2 text-[#00ff66] mb-2 font-bold uppercase">
              <Users className="w-4 h-4" />
              <span>5-MAN ROSTER</span>
            </div>
            <p className="text-gray-400">Team Captain + 4 starting players required. Faculty identity verification upon check-in.</p>
          </div>

          <div className="bg-[#0e131a] p-4 rounded-lg border border-[#00ff66]/30">
            <div className="flex items-center space-x-2 text-[#00ff66] mb-2 font-bold uppercase">
              <Shield className="w-4 h-4" />
              <span>PROMOD MR12</span>
            </div>
            <p className="text-gray-400">Standard Promod 2.11 competitive knockout ruleset with overtime protocol enabled.</p>
          </div>

          <div className="bg-[#0e131a] p-4 rounded-lg border border-[#00ff66]/30">
            <div className="flex items-center space-x-2 text-[#00ff66] mb-2 font-bold uppercase">
              <Cpu className="w-4 h-4" />
              <span>ON-SITE HARDWARE</span>
            </div>
            <p className="text-gray-400">Pre-configured tournament PCs, mechanical peripherals, and high-refresh panels provided.</p>
          </div>

          <div className="bg-[#0e131a] p-4 rounded-lg border border-[#00ff66]/30">
            <div className="flex items-center space-x-2 text-[#00ff66] mb-2 font-bold uppercase">
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP DISPATCH</span>
            </div>
            <p className="text-gray-400">Captain contact will receive bracket fixtures, server IDs, and schedule alerts via WhatsApp.</p>
          </div>
        </div>

        {/* Dedicated Registration Form Container */}
        <div className="max-w-3xl mx-auto hud-border bg-[#0b0e14]/95 p-6 sm:p-10 rounded-xl border border-[#00ff66]/60 glow-box-green">
          <div className="border-b border-[#00ff66]/30 pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wider">
              ENTER SQUAD CREDENTIALS
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-1 uppercase">
              ALL FIELDS ARE MANDATORY FOR OFFICIAL TOURNAMENT SEEDING
            </p>
          </div>

          <RegistrationForm
            isModal={false}
            onSuccess={playGunCockSound}
          />
        </div>
      </main>
    </div>
  );
}
