'use client';

import { X } from 'lucide-react';
import { RegistrationForm } from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegistrationModal({ isOpen, onClose, onSuccess }: RegistrationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300 opacity-100 overflow-y-auto"
    >
      <div className="hud-border bg-[#0b0e14] text-white w-full max-w-xl p-6 sm:p-8 rounded-lg glow-box-green border border-[#00ff66]/60 relative my-8 max-h-[90vh] overflow-y-auto">
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

        <h3 className="text-2xl font-display font-black text-white uppercase tracking-wider mb-6">
          ARENA REGISTRATION
        </h3>

        <RegistrationForm
          isModal={true}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
