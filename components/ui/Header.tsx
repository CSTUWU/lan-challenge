'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, ArrowRight, ShieldCheck, Home, Trophy, Lock, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenModal: () => void;
}

export function Header({ isAudioEnabled, onToggleAudio, onOpenModal }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'COMMAND CENTER', href: '/', icon: Home },
    { label: 'RULES & MAPS', href: '/rules', icon: ShieldCheck },
    { label: 'LEADERBOARD', href: '/leaderboard', icon: Trophy },
    { label: 'ADMIN PORTAL', href: '/admin', icon: Lock },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 backdrop-blur-xl bg-[#050709]/85 border-b border-[#00ff66]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-[#00ff66] animate-ping opacity-75 rounded-sm absolute"></div>
            <div className="w-3 h-3 bg-[#00ff66] rounded-sm shadow-[0_0_10px_#00ff66]"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl md:text-2xl tracking-wider text-white group-hover:text-[#00ff66] transition-colors leading-none">
              LAN<span className="text-[#00ff66] font-light">:</span>CHALLENGE
            </span>
            <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase mt-0.5">
              CST DEGREE PROGRAM // COD4
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center space-x-2 px-3.5 py-2 rounded transition-all duration-200 border ${
                  isActive
                    ? 'border-[#00ff66]/60 bg-[#00ff66]/15 text-[#00ff66] font-bold shadow-[0_0_12px_rgba(0,255,102,0.2)]'
                    : 'border-transparent text-gray-300 hover:text-white hover:bg-[#1a1f26]/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00ff66]' : 'text-gray-400'}`} />
                <span className="tracking-wider uppercase">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Audio Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs tracking-wider font-mono border transition-all ${
              isAudioEnabled
                ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                : 'border-[#00ff66]/40 hover:border-[#00ff66] bg-[#1a1f26]/60 hover:bg-[#00ff66]/20 text-gray-300'
            }`}
          >
            {isAudioEnabled ? (
              <Volume2 className="w-4 h-4 text-[#00ff66] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
            <span className="hidden sm:inline">
              {isAudioEnabled ? 'SFX: ON' : 'SFX: OFF'}
            </span>
          </button>

          {/* Enlist CTA */}
          <button
            onClick={onOpenModal}
            className="hidden sm:inline-flex items-center space-x-2 px-4 md:px-5 py-2 font-display text-xs md:text-sm font-black tracking-widest text-black bg-[#00ff66] hover:bg-emerald-400 rounded transition-all shadow-[0_0_16px_rgba(0,255,102,0.5)] hover:scale-105 active:scale-95 uppercase"
          >
            <span>ENLIST SQUAD</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-[#00ff66] border border-[#00ff66]/30 rounded bg-[#0b0e14]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#00ff66]/20 flex flex-col space-y-2 font-mono text-xs">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 rounded bg-[#0b0e14] border border-[#00ff66]/20 text-gray-200 hover:text-[#00ff66]"
            >
              <item.icon className="w-4 h-4 text-[#00ff66]" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenModal();
            }}
            className="w-full mt-2 py-2.5 bg-[#00ff66] text-black font-display font-bold uppercase rounded text-center tracking-wider"
          >
            ENLIST SQUAD NOW
          </button>
        </div>
      )}
    </header>
  );
}
