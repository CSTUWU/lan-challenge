'use client';

import Link from 'next/link';
import {
  ShieldAlert,
  Target,
  Award,
  ArrowLeft,
  CheckCircle,
  FileText,
  Users,
  Ban,
  Sliders,
  Cpu,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { RegistrationModal } from '@/components/ui/RegistrationModal';
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
        {/* Top Back Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#00ff66] hover:text-emerald-300 transition-colors mb-6 group bg-[#0b0e14] px-3 py-1.5 rounded border border-[#00ff66]/30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>

        {/* Page Hero Header */}
        <div className="hud-border bg-[#0b0e14]/90 p-8 rounded-xl border border-[#00ff66]/40 mb-12 glow-box-green relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Zap className="w-48 h-48 text-[#00ff66]" />
          </div>

          <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
            <span>CST DEGREE PROGRAM // OFFICIAL TOURNAMENT DIRECTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white glow-text-green uppercase tracking-wide">
            OFFICIAL TOURNAMENT RULES & REGULATIONS
          </h1>
          <p className="mt-3 text-gray-300 font-tactical text-sm md:text-base max-w-3xl leading-relaxed">
            Standard operating procedure, game server configurations, weapon bans, binding restrictions, and fair-play regulations for Call of Duty 4 Modern Warfare Promod LAN Challenge.
          </p>
        </div>

        {/* Official Map Pool Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/30 pb-3">
            <Target className="w-6 h-6 text-[#00ff66]" />
            <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-wider uppercase">
              OFFICIAL MAP ROTATION POOL
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {maps.map((map) => (
              <div
                key={map.name}
                className="hud-border bg-[#0b0e14]/80 p-5 rounded border border-[#00ff66]/30 hover:border-[#00ff66] transition-all group"
              >
                <div className="text-[10px] font-mono text-[#00ff66] tracking-widest uppercase mb-1">
                  OFFICIAL MAP
                </div>
                <div className="text-xl font-display font-black text-white group-hover:text-[#00ff66] transition-colors">
                  {map.name}
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed font-tactical">
                  {map.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Rules Section Grid */}
        <div className="space-y-12">
          {/* SECTION 1: Tournament & Team Structure */}
          <section className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/30">
            <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/20 pb-3">
              <Users className="w-6 h-6 text-[#00ff66]" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase">
                1. Tournament & Team Roster Structure
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-gray-300">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#00ff66] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Registration Cap:</strong> Strictly limited to maximum 34 registered teams.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#00ff66] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Team Size:</strong> Each squad must consist of exactly FIVE (5) active players.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#00ff66] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Roster Changes:</strong> Any squad roster modification must be communicated to organizers at least 2 days prior.</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#00ff66] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Shorthanded Matches:</strong> A team MAY start a match with a minimum of 4 players (1 shorthanded). If missing 2+ players, the match is forfeited.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#00ff66] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Voice Communication:</strong> Teamspeak 3 Client software is mandatory for squad tactical comms. Server IP provided on-site.</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: Promod Match Settings */}
          <section className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/30">
            <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/20 pb-3">
              <FileText className="w-6 h-6 text-[#00ff66]" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase">
                2. Promod Server & Match Settings
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              <div className="bg-[#151a21] p-4 rounded border border-[#00ff66]/20">
                <span className="text-[#00ff66] font-bold block mb-2 uppercase">Match Victory</span>
                <p className="text-gray-300 leading-relaxed">First team to win 13 rounds wins the map match.</p>
              </div>
              <div className="bg-[#151a21] p-4 rounded border border-[#00ff66]/20">
                <span className="text-[#00ff66] font-bold block mb-2 uppercase">Promod Configuration</span>
                <p className="text-gray-300 leading-relaxed"><code className="text-emerald-300">promod_mode lan_knockout_mr12</code> (24 total rounds, side swap at round 12).</p>
              </div>
              <div className="bg-[#151a21] p-4 rounded border border-[#00ff66]/20">
                <span className="text-[#00ff66] font-bold block mb-2 uppercase">Round Timers</span>
                <p className="text-gray-300 leading-relaxed">Round Time: 1.45 mins | Bomb Timer: 45s | Defuse: 7s | Plant: 5s.</p>
              </div>
              <div className="bg-[#151a21] p-4 rounded border border-[#00ff66]/20">
                <span className="text-[#00ff66] font-bold block mb-2 uppercase">Map & Side Selection</span>
                <p className="text-gray-300 leading-relaxed">Coin toss determines map/side choice. Winner picks map or side; opponent picks remaining.</p>
              </div>
              <div className="bg-[#151a21] p-4 rounded border border-[#00ff66]/20">
                <span className="text-[#00ff66] font-bold block mb-2 uppercase">Tie-Breaker (MR3 Overtime)</span>
                <p className="text-gray-300 leading-relaxed">In case of a 12-12 draw, MR3 overtime is played with side swap at half-time until winner emerges.</p>
              </div>
              <div className="bg-[#151a21] p-4 rounded border border-[#00ff66]/20">
                <span className="text-[#00ff66] font-bold block mb-2 uppercase">Match Pauses</span>
                <p className="text-gray-300 leading-relaxed">Allowed for technical issues via in-game chat. Resuming requires referee authorization.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: Class Limits & Banned Loadouts */}
          <section className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/30">
            <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/20 pb-3">
              <Ban className="w-6 h-6 text-[#00ff66]" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase">
                3. Weapon Restrictions & Squad Class Limits
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
              <div className="bg-[#151a21] p-5 rounded border border-red-500/30">
                <h3 className="text-red-400 font-bold text-sm uppercase mb-3 flex items-center space-x-2">
                  <span>STRICTLY BANNED WEAPONS & ATTACHMENTS</span>
                </h3>
                <ul className="space-y-2 text-gray-300 list-disc list-inside">
                  <li>P90 SMG</li>
                  <li>Skorpion SMG</li>
                  <li>M21 Sniper Rifle</li>
                  <li>Dragunov Sniper Rifle</li>
                  <li>Barrett .50cal Sniper Rifle</li>
                  <li>All LMGs (Light Machine Guns)</li>
                  <li><strong className="text-red-300">ALL Weapon Attachments</strong> (Red Dot, Silencer, ACOG, Grenade Launcher) are banned</li>
                </ul>
              </div>

              <div className="bg-[#151a21] p-5 rounded border border-[#00ff66]/30">
                <h3 className="text-[#00ff66] font-bold text-sm uppercase mb-3 flex items-center space-x-2">
                  <span>MAXIMUM CLASS LIMITS PER SQUAD (5 PLAYERS)</span>
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between border-b border-gray-800 pb-1">
                    <span>Sniper Class:</span>
                    <strong className="text-white">Maximum One (1) Sniper</strong>
                  </li>
                  <li className="flex justify-between border-b border-gray-800 pb-1">
                    <span>Demolition Class:</span>
                    <strong className="text-white">Maximum One (1) Demolition</strong>
                  </li>
                  <li className="flex justify-between border-b border-gray-800 pb-1">
                    <span>SMG Rusher:</span>
                    <strong className="text-white">Maximum Two (2) SMG</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Assault Class:</span>
                    <strong className="text-white">Up to Five (5) Assault</strong>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: Bindings & Game File Integrity */}
          <section className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-[#00ff66]/30">
            <div className="flex items-center space-x-3 mb-6 border-b border-[#00ff66]/20 pb-3">
              <Sliders className="w-6 h-6 text-[#00ff66]" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase">
                4. Key Bindings & Software Regulations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-gray-300">
              <div>
                <h3 className="text-red-400 font-bold uppercase mb-2">PROHIBITED BINDINGS:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Binding 3 or more keys to a single command.</li>
                  <li>Binds that alter map visual model (e.g. no-fog, no-foliage scripts).</li>
                  <li>Binds pointing to programs outside the CoD4 directory.</li>
                  <li>Scripts containing <code className="text-red-300">'lookdown'</code> or <code className="text-red-300">'wait'</code>.</li>
                  <li>Combining <code className="text-red-300">'attack'</code>, <code className="text-red-300">'frag'</code>, or <code className="text-red-300">'weapnext'</code> with other commands.</li>
                  <li>Binding <code className="text-red-300">'attack'</code> to Mouse Wheel Up/Down.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#00ff66] font-bold uppercase mb-2">PERMITTED BINDINGS & RULES:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Stock single-key gameplay reassignment.</li>
                  <li>Binding max 2 motion keys (e.g. <code className="text-emerald-300">bind a +leanright;+moveright</code>).</li>
                  <li>Namebinds, Demoscripts, and Volume toggle binds.</li>
                  <li><strong className="text-white">In-Game Names (IGNs):</strong> Player IGN must match registered nickname. Clan tags and sponsor tags permitted. Profanity prohibited.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 5: Exploits, Hacks & Referee Authority */}
          <section className="hud-border bg-[#0b0e14]/90 p-6 md:p-8 rounded-xl border border-red-500/40 glow-box-green">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase">
                5. Abuses, Exploits & Game Integrity Policy
              </h2>
            </div>
            <div className="space-y-3 font-mono text-xs text-gray-300 leading-relaxed">
              <p>
                • <strong className="text-white">Map Exploits:</strong> Leaning through walls/windows, see-through textures, map clipping, or out-of-bounds boosting are strictly forbidden. Infractions result in immediate loss of points or tournament expulsion.
              </p>
              <p>
                • <strong className="text-white">Game File Modifications:</strong> Any altered game files, custom DLLs, or wrappers altering game functionality result in instant forfeit loss and permanent ban.
              </p>
              <p>
                • <strong className="text-white">Designated Spectators:</strong> Each team is allowed ONE (1) designated team spectator in the match server for fair play oversight.
              </p>
              <p>
                • <strong className="text-white">Referee Decisions:</strong> The organizing committee reserves final decision authority regarding any unlisted exploits or disputes supported by video/demo evidence.
              </p>
            </div>
          </section>
        </div>

        {/* Bottom CTA Enlist Button */}
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
