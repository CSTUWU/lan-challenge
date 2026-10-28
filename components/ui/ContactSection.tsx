'use client';

import { Phone, MessageCircle, Globe, ExternalLink, Mail, MapPin, ShieldCheck, Zap } from 'lucide-react';

import Link from 'next/link';

export function ContactSection() {
  const whatsappNumber = "+94771111111";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello!%20I%20have%20an%20inquiry%20regarding%20the%20CoD4%20LAN%20Challenge.`;
  const facebookLink = "https://facebook.com/CSTDegreeProgram";
  const hotlinePhone = "+94 77 123 1111";
  const hotlineTelLink = "tel:+94771231111";

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
            <h3 className="text-2xl font-display font-[#00ff66] font-black text-white uppercase tracking-wider">
              LAN<span className="text-[#00ff66] font-light">:</span>CHALLENGE 2026
            </h3>
            <p className="text-xs text-gray-400 font-tactical leading-relaxed">
              Official LAN Challenge Tournament organized by Computer Science & Technology Degree Program Students. Reach out for squad inquiries, referee support, and arena details.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <MapPin className="w-4 h-4 text-[#00ff66]" />
              <span>Uwa Wellassa University</span>
            </div>
          </div>

          {/* Column 2: Direct Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 flex items-center space-x-2">
              <span>DIRECT COMMUNICATIONS</span>
            </h4>

            <div className="space-y-3 text-xs text-gray-300">
              {/* WhatsApp Item */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 text-white hover:text-[#00ff66] transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase">WHATSAPP DISPATCH</span>
                    <span className="font-bold text-[#00ff66] group-hover:underline">{whatsappNumber}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Phone/Hotline Item */}
              <a
                href={hotlineTelLink}
                className="flex items-center justify-between py-2 text-white hover:text-[#00ff66] transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase">HELPLINE / HOTLINE</span>
                    <span className="font-bold text-white group-hover:text-[#00ff66]">{hotlinePhone}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 3: Official Social Channels */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider border-b border-emerald-500/30 pb-2 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
              <span>TACTICAL CHANNELS</span>
            </h4>

            <div className="space-y-3 text-xs">
              {/* Facebook Button */}
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 text-white hover:text-[#00ff66] transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.582 9 4.75V8z"/>
                  </svg>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase">OFFICIAL PAGE</span>
                    <span className="font-bold text-white group-hover:text-[#00ff66]">FACEBOOK</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Email Direct Contact */}
            <div className="pt-2">
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
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © 2026 <strong className="text-gray-200">COMPUTER SCIENCE & TECHNOLOGY DEGREE PROGRAM</strong>. LAN CHALLENGE.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-mono">
            <Link href="/" className="px-2 py-1 text-gray-300 hover:text-[#00ff66] transition-colors inline-block">
              HOME
            </Link>
            <span>•</span>
            <Link href="/register" className="px-2 py-1 text-gray-300 hover:text-[#00ff66] transition-colors inline-block">
              REGISTER
            </Link>
            <span>•</span>
            <Link href="/leaderboard" className="px-2 py-1 text-gray-300 hover:text-[#00ff66] transition-colors inline-block">
              LEADERBOARD
            </Link>
            <span>•</span>
            <Link href="/rules" className="px-2 py-1 text-gray-300 hover:text-[#00ff66] transition-colors inline-block">
              RULES
            </Link>
            <span>•</span>
            <Link href="/about" className="px-2 py-1 text-gray-300 hover:text-[#00ff66] transition-colors inline-block">
              ABOUT
            </Link>
            <span>•</span>
            <Link href="/admin" className="px-2 py-1 text-gray-400 hover:text-[#00ff66] transition-colors inline-block">
              REFEREE PORTAL
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
