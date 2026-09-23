'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { RegisteredSquad } from '@/types/tournament';

interface AdminSquadRegistrationsProps {
  squads: RegisteredSquad[];
  onToggleStatus: (squadId: string) => void;
}

export function AdminSquadRegistrations({ squads, onToggleStatus }: AdminSquadRegistrationsProps) {
  return (
    <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border border-[#00ff66]/30">
      <h3 className="text-lg font-display font-bold text-white uppercase mb-4 text-[#00ff66]">
        REGISTERED SQUADS & PAYMENT VERIFICATION
      </h3>

      <div className="space-y-4 font-mono text-xs">
        {squads.map((squad) => (
          <div
            key={squad.id}
            className="p-4 bg-[#151a21] rounded border border-[#00ff66]/20 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-display font-bold text-white">{squad.teamName}</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 rounded">
                  {squad.campus}
                </span>
              </div>
              <div className="text-gray-400 mt-1">
                Captain: <strong className="text-white">{squad.captainName}</strong> | Phone: {squad.contactNo}
              </div>
              <div className="text-gray-500 text-[11px] mt-1">
                Squad Members: {squad.members.join(', ')}
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <button
                onClick={() => onToggleStatus(squad.id)}
                className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider border flex items-center space-x-1.5 ${
                  squad.status === 'VERIFIED'
                    ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66]'
                    : 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
                }`}
              >
                {squad.status === 'VERIFIED' ? (
                  <CheckCircle className="w-4 h-4 text-[#00ff66]" />
                ) : (
                  <XCircle className="w-4 h-4 text-yellow-400" />
                )}
                <span>{squad.status}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
