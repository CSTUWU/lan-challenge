'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Shield, Award, Terminal, Cpu, MapPin, Users, Globe, ExternalLink } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

export default function AboutPage() {
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
        <div className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/40 mb-12 glow-box-green relative overflow-hidden">
          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>OPERATION INTEL // ABOUT THE ARENA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            MISSION & TOURNAMENT DIRECTIVE
          </h1>
          <p className="mt-3 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Sri Lanka&apos;s premier collegiate esports arena organized by the Computer Science &amp; Technology Degree Program at Uva Wellassa University. Celebrating tactical teamwork, zero-latency Promod competition, and university gaming culture.
          </p>
        </div>

        {/* SECTION 1: Host Institution & CST Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="hud-border bg-[#0b0e14]/80 p-6 md:p-8 rounded-xl border border-[#00ff66]/30">
            <div className="flex items-center space-x-3 text-[#00ff66] mb-3">
              <Globe className="w-6 h-6 text-[#00ff66]" />
              <h2 className="text-xl font-display font-bold uppercase tracking-wide text-white">
                Uva Wellassa University
              </h2>
            </div>
            <p className="text-xs font-mono text-emerald-400 mb-4 uppercase">
              CENTER OF EXCELLENCE FOR ENTREPRENEURIAL &amp; VALUE-ADDITION EDUCATION
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-tactical mb-4">
              Uva Wellassa University is renowned for producing agile, forward-thinking graduates equipped with cutting-edge technical capabilities. The LAN Challenge represents a fusion of technological infrastructure, event management, and collegiate sportsmanship.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 border-t border-emerald-500/20 pt-3">
              <MapPin className="w-4 h-4 text-[#00ff66]" />
              <span>Passara Road, Badulla, Sri Lanka</span>
            </div>
          </div>

          <div className="hud-border bg-[#0b0e14]/80 p-6 md:p-8 rounded-xl border border-[#00ff66]/30">
            <div className="flex items-center space-x-3 text-[#00ff66] mb-3">
              <Terminal className="w-6 h-6 text-[#00ff66]" />
              <h2 className="text-xl font-display font-bold uppercase tracking-wide text-white">
                CST Degree Program
              </h2>
            </div>
            <p className="text-xs font-mono text-emerald-400 mb-4 uppercase">
              COMPUTER SCIENCE &amp; TECHNOLOGY // BATCH OF 2026
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-tactical mb-4">
              Organized entirely by Computer Science &amp; Technology undergraduates. The tournament demonstrates enterprise LAN network architecture, low-latency WebGL telemetry, and full-stack automated tournament controllers engineered by university developers.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 border-t border-emerald-500/20 pt-3">
              <Users className="w-4 h-4 text-[#00ff66]" />
              <span>Department of Computer Science &amp; Informatics</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Tournament Core Pillars */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/30 pb-3">
            <Shield className="w-6 h-6 text-[#00ff66]" />
            <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-wider uppercase">
              TOURNAMENT PILLARS &amp; TECH MATRIX
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            <div className="bg-[#0e131a] p-5 rounded-lg border border-[#00ff66]/30 hover:border-[#00ff66] transition-all">
              <Cpu className="w-6 h-6 text-[#00ff66] mb-3" />
              <h3 className="font-display font-bold text-sm text-white uppercase mb-2">
                ZERO-LATENCY GIGABIT LAN
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Dedicated local area network with isolated server subnets, delivering authentic 0ms LAN ping and zero packet drop.
              </p>
            </div>

            <div className="bg-[#0e131a] p-5 rounded-lg border border-[#00ff66]/30 hover:border-[#00ff66] transition-all">
              <Award className="w-6 h-6 text-[#00ff66] mb-3" />
              <h3 className="font-display font-bold text-sm text-white uppercase mb-2">
                PROMOD 2.11 INTEGRITY
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Clean, competitive Call of Duty 4 Promod ruleset. Pure mechanical skill, tactical positioning, and team coordination without gimmicks.
              </p>
            </div>

            <div className="bg-[#0e131a] p-5 rounded-lg border border-[#00ff66]/30 hover:border-[#00ff66] transition-all">
              <Terminal className="w-6 h-6 text-[#00ff66] mb-3" />
              <h3 className="font-display font-bold text-sm text-white uppercase mb-2">
                LIVE ARENA OVERLAY
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Referee-operated live match broadcaster, automated round calculation, and real-time synchronized scoreboard telemetry.
              </p>
            </div>

            <div className="bg-[#0e131a] p-5 rounded-lg border border-[#00ff66]/30 hover:border-[#00ff66] transition-all">
              <Users className="w-6 h-6 text-[#00ff66] mb-3" />
              <h3 className="font-display font-bold text-sm text-white uppercase mb-2">
                INTER-FACULTY ESPORTS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Fostering healthy rivalry, collegiate unity, and strategic leadership across all academic faculties and degree programs.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Enlistment CTA Banner */}
        <div className="hud-border bg-gradient-to-r from-emerald-950/40 via-black to-emerald-950/40 p-8 rounded-xl border border-[#00ff66]/60 glow-box-green flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-1">
              REGISTRATION ACTIVE // LIMITED 16 SQUAD SLOTS
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase">
              ENLIST YOUR SQUAD IN THE ARENA
            </h3>
            <p className="text-sm text-gray-300 mt-1 max-w-xl font-tactical">
              Review official Promod regulations, assemble your 5-member roster, and lock in your faculty spot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/rules"
              className="px-5 py-3 border border-[#00ff66]/50 hover:border-[#00ff66] bg-[#0b0e14] hover:bg-[#00ff66]/10 text-[#00ff66] font-mono text-xs uppercase tracking-wider rounded transition-all"
            >
              VIEW RULES &amp; MAPS
            </Link>
            <Link
              href="/register"
              onClick={() => playGunCockSound()}
              className="px-6 py-3 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-black text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_20px_rgba(0,255,102,0.5)] flex items-center space-x-2"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
