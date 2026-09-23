'use client';

import { LeaderboardTeam } from '@/types/tournament';

interface LeaderboardTableProps {
  teams: LeaderboardTeam[];
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
}

export function LeaderboardTable({ teams, selectedGroup, onSelectGroup }: LeaderboardTableProps) {
  const filteredTeams =
    selectedGroup === 'ALL'
      ? teams
      : teams.filter((t) => t.group === selectedGroup);

  return (
    <section className="hud-border bg-[#0b0e14]/90 rounded-xl border border-[#00ff66]/30 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-[#00ff66]/20 pb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-white uppercase">
            FULL SQUAD STANDINGS
          </h3>
          <p className="text-xs font-mono text-gray-400 mt-1 uppercase">
            AUTOMATICALLY SYNCHRONIZED WITH MATCH REFEREE DATA
          </p>
        </div>

        {/* Group Filter Buttons */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0 font-mono text-xs">
          {['ALL', 'Group A', 'Group B', 'Playoffs'].map((group) => (
            <button
              key={group}
              onClick={() => onSelectGroup(group)}
              className={`px-3 py-1.5 rounded transition-all border ${
                selectedGroup === group
                  ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] font-bold'
                  : 'border-[#00ff66]/30 bg-[#1a1f26]/60 text-gray-400 hover:text-white'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[#00ff66]/20 text-[#00ff66] uppercase tracking-wider">
              <th className="py-3 px-4">RANK</th>
              <th className="py-3 px-4">SQUAD NAME</th>
              <th className="py-3 px-4">GROUP</th>
              <th className="py-3 px-4 text-center">PLAYED</th>
              <th className="py-3 px-4 text-center">WINS</th>
              <th className="py-3 px-4 text-center">LOSSES</th>
              <th className="py-3 px-4 text-center">RD DIFF</th>
              <th className="py-3 px-4 text-center">POINTS</th>
              <th className="py-3 px-4 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {filteredTeams.map((team, idx) => {
              const rdDiff = team.roundsWon - team.roundsLost;
              return (
                <tr
                  key={team.id}
                  className="hover:bg-[#00ff66]/5 transition-colors group"
                >
                  <td className="py-4 px-4 font-bold text-[#00ff66]">
                    #{idx + 1}
                  </td>
                  <td className="py-4 px-4 font-display font-bold text-white text-sm group-hover:text-[#00ff66] transition-colors">
                    {team.name}
                  </td>
                  <td className="py-4 px-4 text-gray-400 uppercase">{team.group}</td>
                  <td className="py-4 px-4 text-center text-gray-300">{team.played}</td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-bold">{team.wins}</td>
                  <td className="py-4 px-4 text-center text-red-400">{team.losses}</td>
                  <td className={`py-4 px-4 text-center font-bold ${rdDiff >= 0 ? 'text-[#00ff66]' : 'text-red-400'}`}>
                    {rdDiff > 0 ? `+${rdDiff}` : rdDiff}
                  </td>
                  <td className="py-4 px-4 text-center text-lg font-black text-white glow-text-green">
                    {team.points}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] uppercase font-bold rounded border ${
                        team.status === 'CHAMPIONS'
                          ? 'border-[#00ff66] bg-[#00ff66]/20 text-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.3)]'
                          : team.status === 'QUALIFIED'
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                          : team.status === 'CONTENDER'
                          ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
                          : 'border-red-500 bg-red-500/20 text-red-400'
                      }`}
                    >
                      {team.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
