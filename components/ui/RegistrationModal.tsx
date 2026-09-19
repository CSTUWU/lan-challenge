'use client';

import { useState, FormEvent } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegistrationModal({ isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSuccess();

    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 opacity-100"
    >
      <div className="hud-border bg-[#0b0e14] text-white w-full max-w-lg p-6 sm:p-8 rounded-lg glow-box-green border border-[#00ff66]/60 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#00ff66] font-mono text-xl p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest mb-1">
          <span className="w-2 h-2 bg-[#00ff66]"></span>
          <span>SQUAD ENLISTMENT PROTOCOL</span>
        </div>

        <h3 className="text-2xl font-display font-black text-white uppercase tracking-wider">
          CAMPUS ARENA REGISTRATION
        </h3>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Clan / Team Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. TASK FORCE 141"
              className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Team Captain Name
              </label>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Campus / Faculty
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Faculty of Computing"
                className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Captain Mobile (WhatsApp)
              </label>
              <input
                required
                type="tel"
                placeholder="07XXXXXXXX"
                className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Primary Weapon Class
              </label>
              <select className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm">
                <option>Assault (AK47 / M4)</option>
                <option>SMG Rusher (AK-74u / MP5)</option>
                <option>Sniper Specialist (Remington 700)</option>
              </select>
            </div>
          </div>

          {isSuccess && (
            <div className="text-xs font-mono p-3 bg-green-950/60 border border-green-500 text-green-300 rounded flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span>
                MISSION ACCEPTED: Your squad credentials have been recorded. Our event coordinator will confirm via WhatsApp.
              </span>
            </div>
          )}

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold text-xs uppercase tracking-widest rounded transition-transform active:scale-95 ${
                isSubmitting ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              SUBMIT CREDENTIALS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
