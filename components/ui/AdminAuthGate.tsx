'use client';

import { Lock } from 'lucide-react';

interface AdminAuthGateProps {
  pinInput: string;
  setPinInput: (val: string) => void;
  pinError: boolean;
  onAuthorize: (e: React.FormEvent) => void;
}

export function AdminAuthGate({ pinInput, setPinInput, pinError, onAuthorize }: AdminAuthGateProps) {
  return (
    <div className="max-w-md mx-auto hud-border bg-[#0b0e14]/90 p-8 rounded-xl border border-[#00ff66]/40 glow-box-green my-12 text-center">
      <div className="w-12 h-12 bg-[#00ff66]/20 border border-[#00ff66] rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-6 h-6 text-[#00ff66]" />
      </div>
      <h1 className="text-2xl font-display font-black text-white uppercase tracking-wider mb-2">
        ADMINISTRATOR AUTHENTICATION
      </h1>
      <p className="text-xs font-mono text-gray-400 mb-6 uppercase">
        ENTER MATCH REFEREE PASSCODE TO ACCESS CONTROL PORTAL
      </p>

      <form onSubmit={onAuthorize} className="space-y-4 font-mono text-xs">
        <input
          type="password"
          placeholder="ENTER ADMIN PIN (e.g. 1337)"
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          className="w-full px-4 py-3 bg-[#151a21] border border-[#00ff66]/40 rounded text-center text-white text-base tracking-widest placeholder-gray-500 focus:outline-none focus:border-[#00ff66]"
        />

        {pinError && (
          <div className="text-red-400 text-xs font-mono">
            [!] ACCESS DENIED: INVALID ADMIN PASSCODE
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)]"
        >
          AUTHORIZE ACCESS
        </button>
      </form>
    </div>
  );
}
