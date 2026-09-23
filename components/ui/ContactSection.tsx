'use client';

import { Phone, MessageSquare, Globe, ExternalLink, Mail, MapPin, ShieldCheck, Zap } from 'lucide-react';

export function ContactSection() {
  const whatsappNumber = "+94771234567";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello!%20I%20have%20an%20inquiry%20regarding%20the%20CoD4%20Promod%20LAN%20Challenge.`;
  const facebookLink = "https://facebook.com/CSTDegreeProgram";
  const discordLink = "https://discord.gg/cod4lan2026";

  return (
    <footer className="relative z-20 w-full bg-[#070a0e] border-t border-[#00ff66]/30 pt-16 pb-12 font-mono">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-emerald-500/20">
          {/* Column 1: Tactical Brand / Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase">
              <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
              <span>COMMAND DISPATCH // CONTACT HEADQUARTERS</span>
            </div>
            <h3 className="text-2xl font-display font-black text-white uppercase tracking-wider">
              LAN<span className="text-[#00ff66] font-light">:</span>CHALLENGE 2026
            </h3>
            <p className="text-xs text-gray-400 font-tactical leading-relaxed">
              Official Call of Duty 4 Promod Esports Tournament organized by CST Degree Program Students. Reach out for squad inquiries, referee support, and arena details.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <MapPin className="w-4 h-4 text-[#00ff66]" />
              <span>CST Campus Arena // Main IT Auditorium</span>
            </div>
          </div>

          {/* Column 2: Direct Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#00ff66]" />
              <span>DIRECT COMMUNICATIONS</span>
            </h4>

            <div className="space-y-3 text-xs text-gray-300">
              {/* WhatsApp Item */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded bg-[#0b0e14] border border-emerald-500/30 hover:border-[#00ff66] hover:bg-[#00ff66]/10 text-white transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-[#00ff66]/20 border border-[#00ff66] flex items-center justify-center text-[#00ff66] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase">WHATSAPP DISPATCH</span>
                    <span className="font-bold text-[#00ff66] group-hover:underline">{whatsappNumber}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Phone Item */}
              <div className="flex items-center space-x-3 p-3 rounded bg-[#0b0e14] border border-emerald-500/20 text-white">
                <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase">HELPLINE / HOTLINE</span>
                  <span className="font-bold text-white">+94 77 123 4567 / +94 71 987 6543</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Official Social Channels */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
              <span>TACTICAL CHANNELS</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Facebook Button */}
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-[#0b0e14] border border-emerald-500/30 hover:border-[#00ff66] hover:bg-[#00ff66]/10 text-white transition-all group"
              >
                <div className="w-7 h-7 rounded bg-blue-600/20 border border-blue-500 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Globe className="w-4 h-4 text-blue-400" /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-white group-hover:text-[#00ff66]">FACEBOOK</span>
                  <span className="text-[10px] text-gray-400 uppercase">OFFICIAL PAGE</span>
                </div>
              </a>

              {/* Discord Button */}
              <a
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-[#0b0e14] border border-emerald-500/30 hover:border-[#00ff66] hover:bg-[#00ff66]/10 text-white transition-all group"
              >
                <div className="w-7 h-7 rounded bg-indigo-600/20 border border-indigo-500 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white group-hover:text-[#00ff66]">DISCORD</span>
                  <span className="text-[10px] text-gray-400 uppercase">SERVER ARENA</span>
                </div>
              </a>
            </div>

            {/* Email Direct Contact */}
            <div className="pt-1">
              <a
                href="mailto:contact@cstlan2026.lk"
                className="inline-flex items-center space-x-2 text-xs text-gray-400 hover:text-[#00ff66] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00ff66]" />
                <span>contact@cstlan2026.lk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © 2026 <strong className="text-gray-300">CST DEGREE PROGRAM</strong>. CALL OF DUTY 4 PROMOD LAN CHALLENGE.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-emerald-400 cursor-pointer">PRIVACY PROTOCOL</span>
            <span>•</span>
            <span className="hover:text-emerald-400 cursor-pointer">TERMS OF DISPATCH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
