'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
  group?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
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

  // Normalize options list
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedItem = normalizedOptions.find((opt) => opt.value === value);

  // Group options if any option has a group property
  const grouped: Record<string, SelectOption[]> = {};
  let hasGroups = false;

  normalizedOptions.forEach((opt) => {
    if (opt.group) {
      hasGroups = true;
      if (!grouped[opt.group]) grouped[opt.group] = [];
      grouped[opt.group].push(opt);
    } else {
      if (!grouped['DEFAULT']) grouped['DEFAULT'] = [];
      grouped['DEFAULT'].push(opt);
    }
  });

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Select trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0b0e14] border border-emerald-500/40 hover:border-[#00ff66] rounded px-3 py-2.5 text-left font-tactical focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] text-xs flex items-center justify-between transition-all shadow-sm"
      >
        <span className={value ? 'text-white font-medium truncate' : 'text-gray-400 font-normal truncate'}>
          {selectedItem ? selectedItem.label : value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#00ff66]' : ''}`} />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0b0e14] border-2 border-[#00ff66] rounded-md shadow-[0_0_20px_rgba(0,255,102,0.3)] overflow-hidden animate-fade-in max-h-64 overflow-y-auto">
          {hasGroups ? (
            Object.entries(grouped).map(([groupName, groupOpts]) => (
              <div key={groupName} className="border-b border-[#00ff66]/10 last:border-0">
                {groupName !== 'DEFAULT' && (
                  <div className="px-3 py-1.5 bg-[#151a21] text-[10px] font-mono font-bold text-[#00ff66] tracking-wider uppercase border-b border-[#00ff66]/20">
                    {groupName}
                  </div>
                )}
                {groupOpts.map((opt) => {
                  const isSelected = value === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        onChange(opt.value);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-2.5 text-xs font-mono cursor-pointer transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#00ff66] text-black font-bold'
                          : 'text-gray-200 hover:bg-[#00ff66]/20 hover:text-[#00ff66]'
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-black flex-shrink-0 ml-2" />}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            normalizedOptions.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2.5 text-xs font-mono cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#00ff66] text-black font-bold'
                      : 'text-gray-200 hover:bg-[#00ff66]/20 hover:text-[#00ff66]'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black flex-shrink-0 ml-2" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
