'use client';

import { useState, FormEvent } from 'react';
import { X, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface TeamMember {
  name: string;
  faculty: string;
}

const FACULTIES = [
  'Faculty of Animal Science and Export Agriculture',
  'Faculty of Applied Sciences',
  'Faculty of Management Studies',
  'Faculty of Technological Studies',
  'Faculty of Medicine',
];

export function RegistrationModal({ isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [captainMobile, setCaptainMobile] = useState('');

  // Roster details (up to 5 players)
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', faculty: '' },
    { name: '', faculty: '' },
    { name: '', faculty: '' },
    { name: '', faculty: '' },
  ]);

  if (!isOpen) return null;

  const handleMemberChange = (index: number, field: 'name' | 'faculty', value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: '', faculty: '' }]);
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 opacity-100 overflow-y-auto"
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

        <h3 className="text-2xl font-display font-black text-white uppercase tracking-wider">
          ARENA REGISTRATION
        </h3>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Team Name */}
          <div>
            <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Clan / Team Name
            </label>
            <input
              required
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. TASK FORCE 141"
              className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
            />
          </div>

          {/* Captain Name & Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Team Captain Name
              </label>
              <input
                required
                type="text"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Faculty
              </label>
              <CustomSelect
                value={faculty}
                onChange={setFaculty}
                options={FACULTIES}
                placeholder="Choose your faculty"
              />
            </div>
          </div>

          {/* Captain Mobile (WhatsApp) */}
          <div>
            <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Captain Mobile (WhatsApp)
            </label>
            <input
              required
              type="tel"
              value={captainMobile}
              onChange={(e) => setCaptainMobile(e.target.value)}
              placeholder="07XXXXXXXX"
              className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
            />
          </div>

          {/* Team Members Roster Details */}
          <div className="pt-2 border-t border-emerald-500/20">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-mono text-[#00ff66] uppercase tracking-wider font-bold">
                Team Members Roster Details
              </label>
              {members.length < 4 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#00ff66] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {members.map((member, idx) => (
                <div key={idx} className="p-3 bg-black/50 border border-emerald-500/30 rounded space-y-2 relative">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>MEMBER #{idx + 2} DETAILS</span>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="text-red-400 hover:text-red-300 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                      placeholder="Member Name"
                      className="bg-black/70 border border-emerald-500/40 rounded px-3 py-1.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-xs"
                    />
                    <CustomSelect
                      value={member.faculty}
                      onChange={(val) => handleMemberChange(idx, 'faculty', val)}
                      options={FACULTIES}
                      placeholder="Choose your faculty"
                    />
                  </div>
                </div>
              ))}
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

          <div className="pt-2 flex justify-end space-x-3 border-t border-emerald-500/20">
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
