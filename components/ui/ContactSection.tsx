'use client';

import { Phone, Mail, MapPin } from 'lucide-react';

import Link from 'next/link';

export function ContactSection() {
  const whatsappNumber = "+94771111111";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello!%20I%20have%20an%20inquiry%20regarding%20the%20CoD4%20LAN%20Challenge.`;
  const facebookLink = "https://facebook.com/CSTDegreeProgram";
  const youtubeLink = "https://youtube.com/@CSTDegreeProgram";
  const hotlinePhone = "+94 77 123 1111";
  const hotlineTelLink = "tel:+94771231111";

  return (
    <footer className="relative z-20 w-full bg-[#070a0e] border-t border-[#00ff66]/30 pt-16 pb-12 font-mono">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-500/20">
          {/* Column 1: Tactical Brand / Info */}
          <div className="space-y-4 md:col-span-5">
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

          {/* Column 2: Direct Communications / Socials matching image */}
          <div className="md:col-span-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-end gap-6 sm:gap-8">
            {/* Divider on left (optional/decorative on desktop) */}
            <div className="hidden lg:block w-[1px] h-20 bg-gray-600/60 self-center"></div>

            {/* GET IN TOUCH block */}
            <div className="flex flex-col justify-center space-y-3 pl-0 sm:pl-2">
              <h4 className="text-xl md:text-2xl font-black text-[#00ff66] uppercase tracking-wider font-display">
                GET IN TOUCH
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm font-mono">
                {/* Phone */}
                <a
                  href={hotlineTelLink}
                  className="flex items-center space-x-3 text-white hover:text-[#00ff66] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#00ff66] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-wider">{hotlinePhone}</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@cstlan2026.lk"
                  className="flex items-center space-x-3 text-white hover:text-[#00ff66] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#00ff66] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-wider">contact@cstlan2026.lk</span>
                </a>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1.5px] h-20 bg-gray-500/50 self-center"></div>

            {/* FOLLOW US block */}
            <div className="flex flex-col justify-center space-y-3 sm:pl-2">
              <h4 className="text-xl md:text-2xl font-black text-[#00ff66] uppercase tracking-wider font-display">
                FOLLOW US
              </h4>

              {/* Social Icons with circular borders */}
              <div className="flex items-center space-x-3 pt-0.5">
                {/* WhatsApp */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-gray-500/60 hover:border-[#25D366] bg-[#0c1219]/80 flex items-center justify-center text-[#25D366] transition-all hover:scale-105 shadow-[0_0_10px_transparent] hover:shadow-[0_0_12px_rgba(37,211,102,0.3)]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-gray-500/60 hover:border-[#1877F2] bg-[#0c1219]/80 flex items-center justify-center text-[#1877F2] transition-all hover:scale-105 shadow-[0_0_10px_transparent] hover:shadow-[0_0_12px_rgba(24,119,242,0.3)]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.582 9 4.75V8z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full border border-gray-500/60 hover:border-[#FF0000] bg-[#0c1219]/80 flex items-center justify-center text-[#FF0000] transition-all hover:scale-105 shadow-[0_0_10px_transparent] hover:shadow-[0_0_12px_rgba(255,0,0,0.3)]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
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
