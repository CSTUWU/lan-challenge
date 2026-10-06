import { memo, ReactNode } from 'react';

interface TacticalCardProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  accentCorners?: boolean;
}

export const TacticalCard = memo(function TacticalCard({
  children,
  className = '',
  borderColor = 'border-[#00ff66]/60',
  glowColor = 'rgba(0,255,102,0.08)',
  accentCorners = true,
}: TacticalCardProps) {
  return (
    <div
      className={`relative border rounded-sm p-6 ${borderColor} ${className}`}
      style={{ boxShadow: `0 0 24px ${glowColor}, inset 0 0 20px ${glowColor}` }}
    >
      {accentCorners && (
        <>
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff66]" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff66]" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff66]" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff66]" />
        </>
      )}
      {children}
    </div>
  );
});
