'use client';

import { MapPin } from 'lucide-react';
import { LiveMatchData } from '@/types/tournament';
import { TOURNAMENT_MAPS } from '@/lib/constants';
import { CustomSelect, SelectOption } from '../CustomSelect';

interface MatchConfigPanelProps {
  liveMatch: LiveMatchData;
  onSaveLiveMatch: (updated: LiveMatchData) => void;
}

const MAP_OPTIONS: SelectOption[] = TOURNAMENT_MAPS.map((m) => ({
  label: `${m.name} (${m.displayName})`,
  value: m.name,
}));

export function MatchConfigPanel({ liveMatch, onSaveLiveMatch }: MatchConfigPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#151a21]/80 p-4 rounded-lg border border-[#00ff66]/20 font-mono text-xs">
      <div>
        <label className="block text-emerald-400 font-bold mb-1 uppercase">STAGE TITLE / ROUND</label>
        <input
          type="text"
          value={liveMatch.stageTitle}
          onChange={(e) => onSaveLiveMatch({ ...liveMatch, stageTitle: e.target.value })}
          className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
          placeholder="e.g. GROUP STAGE // MATCH 04"
        />
      </div>
      <div>
        <label className="block text-emerald-400 font-bold mb-1 uppercase flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5 text-[#00ff66]" />
          <span>SELECT MAP</span>
        </label>
        <CustomSelect
          value={liveMatch.mapName}
          onChange={(val) => onSaveLiveMatch({ ...liveMatch, mapName: val })}
          options={MAP_OPTIONS}
          placeholder="Select Map"
        />
      </div>
      <div>
        <label className="block text-emerald-400 font-bold mb-1 uppercase">ROUND / SCORE INFO</label>
        <input
          type="text"
          value={liveMatch.roundInfo}
          onChange={(e) => onSaveLiveMatch({ ...liveMatch, roundInfo: e.target.value })}
          className="w-full px-3 py-2 bg-[#0b0e14] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
          placeholder="e.g. ROUND 12 / 24"
        />
      </div>
    </div>
  );
}
