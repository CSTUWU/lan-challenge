import { memo } from 'react';

interface TacticalBadgeProps {
  label: string;
  className?: string;
  pulse?: boolean;
}

export const TacticalBadge = memo(function TacticalBadge({
  label,
  className = '',
  pulse = true,
}: TacticalBadgeProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {pulse && <span className="inline-block w-2 h-2 bg-[#00ff66] animate-pulse rounded-full" />}
      <span className="text-[10px] font-mono tracking-[0.25em] text-[#00ff66] uppercase">
        {label}
      </span>
    </div>
  );
});
