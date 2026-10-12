import { memo } from 'react';

interface SvgAnnotationOverlayProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  visibility: number;
  color?: string;
}

export const SvgAnnotationOverlay = memo(function SvgAnnotationOverlay({
  x1,
  y1,
  x2,
  y2,
  visibility,
  color = '#00ff66',
}: SvgAnnotationOverlayProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: visibility }}
      aria-hidden="true"
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1"
        strokeDasharray="6 4"
        style={{
          filter: `drop-shadow(0 0 4px ${color})`,
          strokeDashoffset: (1 - visibility) * 120,
        }}
      />
      <circle
        cx={x2}
        cy={y2}
        r={4 * visibility}
        fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <circle
        cx={x1}
        cy={y1}
        r={3 * visibility}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
});
