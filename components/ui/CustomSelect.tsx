'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Choose your faculty',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Select trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0b0e14] border border-emerald-500/40 hover:border-[#00ff66] rounded px-3 py-2.5 text-left font-tactical focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] text-xs flex items-center justify-between transition-all"
      >
        <span className={value ? 'text-white font-medium truncate' : 'text-gray-400 font-normal truncate'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#00ff66]' : ''}`} />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0b0e14] border-2 border-[#00ff66] rounded-md shadow-[0_0_20px_rgba(0,255,102,0.25)] overflow-hidden animate-fade-in max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`px-3 py-2.5 text-xs font-mono cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#00ff66] text-black font-bold'
                    : 'text-gray-200 hover:bg-[#00ff66]/20 hover:text-[#00ff66]'
                }`}
              >
                <span className="truncate">{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-black flex-shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
