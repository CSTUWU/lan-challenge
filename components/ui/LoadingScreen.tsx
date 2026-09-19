'use client';

interface LoadingScreenProps {
  progress: number;
  statusText: string;
  isComplete: boolean;
}

export function LoadingScreen({ progress, statusText, isComplete }: LoadingScreenProps) {
  if (isComplete) return null;

  return (
    <div
      id="loader-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050709] text-white transition-opacity duration-700 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="hud-border p-8 bg-black/90 max-w-md w-11/12 text-center relative glow-box-green backdrop-blur-md rounded-lg">
        <div className="flex items-center justify-center space-x-2 text-[#00ff66] font-mono text-xs tracking-widest uppercase mb-3 animate-pulse">
          <span className="w-2.5 h-2.5 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"></span>
          <span>INITIALIZING TACTICAL 3D MESH</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black tracking-wider text-white mb-1 uppercase">
          CLASSIC GHOST GLB
        </h2>
        <p className="text-xs text-gray-400 font-mono mb-5 uppercase tracking-wide">
          LOADING 3D ASSETS: models/classic_ghost.glb
        </p>

        <div className="w-full bg-[#1a1f26] h-3.5 rounded overflow-hidden border border-[#00ff66]/50 p-0.5 mb-3 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-[#00ff66] to-green-400 rounded transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-xs text-gray-400">
          <span className="text-gray-300">{statusText}</span>
          <span className="text-[#00ff66] font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
