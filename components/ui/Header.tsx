'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onOpenModal?: () => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'REGISTER', href: '/register' },
    { label: 'LEADERBOARD', href: '/leaderboard' },
    { label: 'RULES', href: '/rules' },
    { label: 'ABOUT', href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 backdrop-blur-xl bg-[#050709]/85 border-b border-[#00ff66]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center group">
          <div className="flex flex-col">
            <span className="font-display font-black text-xl md:text-2xl tracking-wider text-white group-hover:text-[#00ff66] transition-colors leading-none">
              LAN<span className="text-[#00ff66] font-light">:</span>CHALLENGE
            </span>
            <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase mt-0.5">
              COMPUTER SCIENCE & TECHNOLOGY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`tracking-wider uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-[#00ff66] font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Enlist CTA */}
          {onOpenModal ? (
            <button
              onClick={onOpenModal}
              className="hidden sm:inline-flex items-center space-x-2 px-4 md:px-5 py-2 font-display text-xs md:text-sm font-black tracking-widest text-black bg-[#00ff66] hover:bg-emerald-400 rounded transition-all shadow-[0_0_16px_rgba(0,255,102,0.5)] hover:scale-105 active:scale-95 uppercase"
            >
              <span>ENLIST SQUAD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center space-x-2 px-4 md:px-5 py-2 font-display text-xs md:text-sm font-black tracking-widest text-black bg-[#00ff66] hover:bg-emerald-400 rounded transition-all shadow-[0_0_16px_rgba(0,255,102,0.5)] hover:scale-105 active:scale-95 uppercase"
            >
              <span>ENLIST SQUAD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
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
              className="flex items-center px-3 py-2 text-gray-200 hover:text-[#00ff66]"
            >
              <span>{item.label}</span>
            </Link>
          ))}
          {onOpenModal ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="w-full mt-2 py-2.5 bg-[#00ff66] text-black font-display font-bold uppercase rounded text-center tracking-wider"
            >
              ENLIST SQUAD NOW
            </button>
          ) : (
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-2 py-2.5 bg-[#00ff66] text-black font-display font-bold uppercase rounded text-center tracking-wider block"
            >
              ENLIST SQUAD NOW
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
