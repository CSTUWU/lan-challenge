'use client';

import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatusAlertModalProps {
  type: 'error' | 'success';
  title: string;
  message: string;
  footerTagline?: string;
  confirmText?: string;
  onClose: () => void;
}

export function StatusAlertModal({
  type,
  title,
  message,
  footerTagline,
  confirmText = 'ACKNOWLEDGE',
  onClose,
}: StatusAlertModalProps) {
  const isError = type === 'error';
  const borderColor = isError ? 'border-red-500' : 'border-[#00ff66]';
  const shadowColor = isError ? 'shadow-[0_0_35px_rgba(239,68,68,0.4)]' : 'shadow-[0_0_40px_rgba(0,255,102,0.4)]';
  const iconBg = isError ? 'bg-red-500/20 border-red-500' : 'bg-[#00ff66]/20 border-[#00ff66]';
  const textColor = isError ? 'text-red-400' : 'text-[#00ff66]';
  const buttonBg = isError
    ? 'bg-red-500 hover:bg-red-400 text-black shadow-[0_0_12px_rgba(239,68,68,0.4)]'
    : 'bg-[#00ff66] hover:bg-emerald-400 text-black shadow-[0_0_12px_rgba(0,255,102,0.4)]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full ${
          isError ? 'max-w-sm' : 'max-w-md'
        } hud-border bg-[#0d1117] p-6 sm:p-8 rounded-xl border-2 ${borderColor} ${shadowColor} text-center font-mono`}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 text-gray-400 ${
            isError ? 'hover:text-red-400 border-red-500/30' : 'hover:text-[#00ff66] border-[#00ff66]/30'
          } p-1 rounded-full border bg-[#151a21]`}
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className={`w-14 h-14 ${iconBg} border-2 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isError ? '' : 'animate-bounce'
          }`}
        >
          {isError ? (
            <AlertCircle className="w-7 h-7 text-red-500" />
          ) : (
            <CheckCircle2 className="w-8 h-8 text-[#00ff66]" />
          )}
        </div>

        <h4 className={`text-base font-display font-black ${textColor} uppercase tracking-wider mb-2`}>
          {title}
        </h4>

        <p className="text-xs text-gray-200 leading-relaxed font-tactical">{message}</p>

        {isError && (
          <button
            onClick={onClose}
            className={`mt-5 px-6 py-2 ${buttonBg} font-display font-bold text-xs uppercase tracking-wider rounded transition-all`}
          >
            {confirmText}
          </button>
        )}

        {footerTagline && (
          <div className="mt-6 pt-3 border-t border-emerald-500/20 text-[10px] text-gray-400 uppercase tracking-widest">
            {footerTagline}
          </div>
        )}
      </div>
    </div>
  );
}
