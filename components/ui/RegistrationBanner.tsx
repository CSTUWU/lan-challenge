import Link from 'next/link';

interface RegistrationBannerProps {
  onOpenModal?: () => void;
}

export function RegistrationBanner({ onOpenModal }: RegistrationBannerProps) {
  return (
    <div
      id="register-section"
      className="mt-16 hud-border bg-gradient-to-r from-emerald-950/40 via-black to-emerald-950/40 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 glow-box-green"
    >
      <div>
        <div className="text-[#00ff66] font-mono text-xs tracking-widest uppercase">
          REGISTRATION OPEN // LIMITED 16 SLOTS
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mt-1">
          ENLIST YOUR 5-MAN SQUAD TODAY
        </h3>
        <p className="text-sm text-gray-300 mt-2 max-w-xl">
          Registration is open to all university and campus faculties. LAN computers and mechanical gear will be provided on-site.
        </p>
      </div>
      {onOpenModal ? (
        <button
          onClick={onOpenModal}
          className="w-full md:w-auto px-8 py-4 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-black text-base tracking-widest uppercase rounded shadow-[0_0_20px_rgba(0,255,102,0.6)] transition-all hover:scale-105 active:scale-95"
        >
          REGISTER TEAM NOW
        </button>
      ) : (
        <Link
          href="/register"
          className="w-full md:w-auto px-8 py-4 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-black text-base tracking-widest uppercase rounded shadow-[0_0_20px_rgba(0,255,102,0.6)] transition-all hover:scale-105 active:scale-95 text-center"
        >
          REGISTER TEAM NOW
        </Link>
      )}
    </div>
  );
}
