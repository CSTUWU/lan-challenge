'use client';

import { useState, FormEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CustomSelect } from './CustomSelect';
import { StatusAlertModal } from './modals/StatusAlertModal';

interface RegistrationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

interface TeamMember {
  name: string;
  faculty: string;
}

export const FACULTIES = [
  'Faculty of Animal Science and Export Agriculture',
  'Faculty of Applied Sciences',
  'Faculty of Management Studies',
  'Faculty of Technological Studies',
  'Faculty of Medicine',
];

export function RegistrationForm({ onSuccess, onCancel, isModal = false }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [captainMobile, setCaptainMobile] = useState('');

  // Roster details (up to 5 players total: Captain + 4 members)
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', faculty: '' },
    { name: '', faculty: '' },
    { name: '', faculty: '' },
    { name: '', faculty: '' },
  ]);

  const handleMemberChange = (index: number, field: 'name' | 'faculty', value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
    if (validationError) setValidationError(null);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: '', faculty: '' }]);
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    if (validationError) setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!teamName.trim() || !captainName.trim() || !faculty) {
      setValidationError('All fields are required.');
      return false;
    }

    const phoneClean = captainMobile.replace(/\D/g, '');
    if (!captainMobile.trim() || phoneClean.length !== 10) {
      setValidationError('Enter a valid 10-digit mobile number.');
      return false;
    }

    for (let i = 0; i < members.length; i++) {
      if (!members[i].name.trim() || !members[i].faculty) {
        setValidationError('All squad member names and faculties are required.');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    onSuccess?.();

    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        if (isModal) {
          onCancel?.();
        } else {
          // Reset form on standalone page
          setTeamName('');
          setCaptainName('');
          setFaculty('');
          setCaptainMobile('');
          setMembers([
            { name: '', faculty: '' },
            { name: '', faculty: '' },
            { name: '', faculty: '' },
            { name: '', faculty: '' },
          ]);
        }
      }, 2500);
    }, 500);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Team Name */}
        <div>
          <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            Clan / Team Name *
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="e.g. TASK FORCE 141"
            className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
          />
        </div>

        {/* Captain Name & Faculty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Team Captain Name *
            </label>
            <input
              type="text"
              value={captainName}
              onChange={(e) => {
                setCaptainName(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Full Name"
              className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Faculty *
            </label>
            <CustomSelect
              value={faculty}
              onChange={(val) => {
                setFaculty(val);
                if (validationError) setValidationError(null);
              }}
              options={FACULTIES}
              placeholder="Choose your faculty"
            />
          </div>
        </div>

        {/* Captain Mobile (WhatsApp) */}
        <div>
          <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            Captain Mobile (WhatsApp) *
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={captainMobile}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
              setCaptainMobile(onlyNums);
              if (validationError) setValidationError(null);
            }}
            placeholder="07XXXXXXXX"
            className="w-full bg-black/70 border border-emerald-500/40 rounded px-4 py-2.5 text-white font-tactical focus:outline-none focus:border-[#00ff66] text-sm"
          />
        </div>

        {/* Team Members Roster Details */}
        <div className="pt-2 border-t border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-mono text-[#00ff66] uppercase tracking-wider font-bold">
              Team Members Roster Details (4 Players) *
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

        <div className="pt-2 flex justify-end space-x-3 border-t border-emerald-500/20">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white uppercase tracking-wider"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold text-xs uppercase tracking-widest rounded transition-transform active:scale-95 ${
              isSubmitting ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {isSubmitting ? 'PROCESSING...' : 'SUBMIT CREDENTIALS'}
          </button>
        </div>
      </form>

      {/* VALIDATION ERROR MODAL */}
      {validationError && (
        <StatusAlertModal
          type="error"
          title="VALIDATION ERROR"
          message={validationError}
          onClose={() => setValidationError(null)}
        />
      )}

      {/* REGISTRATION SUCCESS MODAL */}
      {isSuccess && (
        <StatusAlertModal
          type="success"
          title="MISSION ACCEPTED"
          message="Your squad credentials have been successfully recorded in the arena database. Our event coordinator will confirm your registration details via WhatsApp."
          footerTagline="PROMOD LAN CHALLENGE // ARENA DISPATCH"
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
}
