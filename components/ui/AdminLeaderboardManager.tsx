'use client';

import { Edit2, Trash2, Save } from 'lucide-react';
import { LeaderboardTeam } from '@/types/tournament';

interface TeamFormData {
  name: string;
  group: 'Group A' | 'Group B' | 'Playoffs';
  played: number;
  wins: number;
  losses: number;
  roundsWon: number;
  roundsLost: number;
  points: number;
  status: 'CHAMPIONS' | 'QUALIFIED' | 'CONTENDER' | 'ELIMINATED';
}

interface AdminLeaderboardManagerProps {
  teams: LeaderboardTeam[];
  editingId: string | null;
  formData: TeamFormData;
  setFormData: (data: TeamFormData) => void;
  onSaveTeam: () => void;
  onEditClick: (team: LeaderboardTeam) => void;
  onDeleteTeam: (id: string) => void;
  onCancelEdit: () => void;
}

export function AdminLeaderboardManager({
  teams,
  editingId,
  formData,
  setFormData,
  onSaveTeam,
  onEditClick,
  onDeleteTeam,
  onCancelEdit,
}: AdminLeaderboardManagerProps) {
  return (
    <div className="space-y-8">
      <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border border-[#00ff66]/30 font-mono text-xs">
        <h3 className="text-lg font-display font-bold text-white uppercase mb-4 text-[#00ff66]">
          {editingId ? 'EDIT SQUAD STATS' : 'ADD NEW SQUAD TO LEADERBOARD'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-1">SQUAD NAME</label>
            <input
              type="text"
              placeholder="e.g. GHOST REAPERS"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">GROUP</label>
            <select
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value as any })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            >
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Playoffs">Playoffs</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">STATUS BADGE</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            >
              <option value="CHAMPIONS">CHAMPIONS</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="CONTENDER">CONTENDER</option>
              <option value="ELIMINATED">ELIMINATED</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">TOTAL POINTS</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-1">MATCHES PLAYED</label>
            <input
              type="number"
              value={formData.played}
              onChange={(e) => setFormData({ ...formData, played: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">WINS</label>
            <input
              type="number"
              value={formData.wins}
              onChange={(e) => setFormData({ ...formData, wins: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">LOSSES</label>
            <input
              type="number"
              value={formData.losses}
              onChange={(e) => setFormData({ ...formData, losses: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">ROUNDS WON / LOST</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="WON"
                value={formData.roundsWon}
                onChange={(e) => setFormData({ ...formData, roundsWon: parseInt(e.target.value) || 0 })}
                className="w-1/2 px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
              />
              <input
                type="number"
                placeholder="LOST"
                value={formData.roundsLost}
                onChange={(e) => setFormData({ ...formData, roundsLost: parseInt(e.target.value) || 0 })}
                className="w-1/2 px-3 py-2 bg-[#151a21] border border-[#00ff66]/30 rounded text-white focus:outline-none focus:border-[#00ff66]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onSaveTeam}
            className="px-6 py-2.5 bg-[#00ff66] hover:bg-emerald-400 text-black font-display font-bold uppercase tracking-wider rounded transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{editingId ? 'UPDATE STANDINGS' : 'ADD TO LEADERBOARD'}</span>
          </button>
          {editingId && (
            <button
              onClick={onCancelEdit}
              className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs uppercase rounded"
            >
              CANCEL
            </button>
          )}
        </div>
      </div>

      <div className="hud-border bg-[#0b0e14]/90 p-6 rounded-xl border border-[#00ff66]/30">
        <h3 className="text-lg font-display font-bold text-white uppercase mb-4">
          CURRENT LEADERBOARD ENTRIES
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#00ff66]/20 text-[#00ff66] uppercase">
                <th className="py-2 px-3">SQUAD</th>
                <th className="py-2 px-3">GROUP</th>
                <th className="py-2 px-3 text-center">P</th>
                <th className="py-2 px-3 text-center">W</th>
                <th className="py-2 px-3 text-center">L</th>
                <th className="py-2 px-3 text-center">PTS</th>
                <th className="py-2 px-3 text-center">STATUS</th>
                <th className="py-2 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {teams.map((t) => (
                <tr key={t.id} className="hover:bg-[#00ff66]/5">
                  <td className="py-3 px-3 font-bold text-white">{t.name}</td>
                  <td className="py-3 px-3 text-gray-400">{t.group}</td>
                  <td className="py-3 px-3 text-center">{t.played}</td>
                  <td className="py-3 px-3 text-center text-emerald-400">{t.wins}</td>
                  <td className="py-3 px-3 text-center text-red-400">{t.losses}</td>
                  <td className="py-3 px-3 text-center font-black text-[#00ff66]">{t.points}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 text-[10px] border border-[#00ff66]/40 rounded text-[#00ff66]">
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button
                      onClick={() => onEditClick(t)}
                      className="p-1.5 bg-[#00ff66]/20 text-[#00ff66] hover:bg-[#00ff66]/40 rounded border border-[#00ff66]/40"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTeam(t.id)}
                      className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded border border-red-500/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
