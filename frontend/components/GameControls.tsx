'use client'

import { TEAM_NAMES, TEAM_COLORS, TEAM_EMOJI } from '@/lib/contract'

interface GameControlsProps {
  playerTeam: number
  cooldown: number
  tickCooldown: number
  stats: {
    fire: number
    water: number
    plant: number
  }
  loading: boolean
  onExecuteTick: () => void
}

export function GameControls({
  playerTeam,
  cooldown,
  tickCooldown,
  stats,
  loading,
  onExecuteTick,
}: GameControlsProps) {
  const totalCells = stats.fire + stats.water + stats.plant;
  const playerStats = stats[Object.keys(TEAM_NAMES)[playerTeam - 1] as keyof typeof stats] || 0;
  const dominancePercentage = totalCells > 0 ? Math.round((playerStats / totalCells) * 100) : 0;

  return (
    <div className="space-y-6 w-full">
      {/* Player Info */}
      <div className="pixel-borders pixel-borders-hover bg-[#1a1a2e] p-6 rounded-lg scale-in">
        <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-gray-400 text-center">Your Element</h3>
        <div className="text-center mb-4 space-y-3">
          <div className="text-6xl pulse-slow">{TEAM_EMOJI[playerTeam as keyof typeof TEAM_EMOJI]}</div>
          <div className="text-xl font-bold tracking-wider uppercase retro-text-shadow">
            {TEAM_NAMES[playerTeam as keyof typeof TEAM_NAMES]}
          </div>
          <div className="text-xs text-gray-400">
            {dominancePercentage}% map control
          </div>
        </div>
        {cooldown > 0 ? (
          <div className="pixel-borders bg-red-900/30 border-2 border-red-600 px-4 py-3 rounded text-red-300 text-xs uppercase tracking-wide text-center">
            ⏱️ Cooldown: {cooldown}s
          </div>
        ) : (
          <div className="pixel-borders bg-green-900/30 border-2 border-green-600 px-4 py-3 rounded text-green-300 text-xs uppercase tracking-wide pulse-glow text-center">
            ✓ Ready to Place
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="pixel-borders pixel-borders-hover bg-[#1a1a2e] p-6 rounded-lg fade-in">
        <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-gray-400 text-center">Territory Status</h3>
        <div className="space-y-4">
          {/* Progress bars for visual representation */}
          <div className="mb-4">
            <div className="h-3 bg-black/50 rounded-lg overflow-hidden pixel-borders">
              <div className="h-full flex">
                <div 
                  className="transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${totalCells > 0 ? (stats.fire / totalCells) * 100 : 0}%`,
                    backgroundColor: TEAM_COLORS[1]
                  }}
                />
                <div 
                  className="transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${totalCells > 0 ? (stats.water / totalCells) * 100 : 0}%`,
                    backgroundColor: TEAM_COLORS[2]
                  }}
                />
                <div 
                  className="transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${totalCells > 0 ? (stats.plant / totalCells) * 100 : 0}%`,
                    backgroundColor: TEAM_COLORS[3]
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pixel-borders bg-black/50 p-3 rounded hover:bg-black/70 transition-all hover:scale-[1.02]">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-2xl">🔥</span>
              <span className="uppercase tracking-wide font-bold">Fire</span>
            </span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: TEAM_COLORS[1] }}>{stats.fire}</span>
          </div>
          <div className="flex justify-between items-center pixel-borders bg-black/50 p-3 rounded hover:bg-black/70 transition-all hover:scale-[1.02]">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-2xl">💧</span>
              <span className="uppercase tracking-wide font-bold">Water</span>
            </span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: TEAM_COLORS[2] }}>{stats.water}</span>
          </div>
          <div className="flex justify-between items-center pixel-borders bg-black/50 p-3 rounded hover:bg-black/70 transition-all hover:scale-[1.02]">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-2xl">🌱</span>
              <span className="uppercase tracking-wide font-bold">Plant</span>
            </span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: TEAM_COLORS[3] }}>{stats.plant}</span>
          </div>
        </div>
      </div>

      {/* Tick Control */}
      <div className="pixel-borders pixel-borders-hover bg-[#1a1a2e] p-6 rounded-lg slide-in">
        <button
          onClick={onExecuteTick}
          disabled={loading || tickCooldown > 0}
          className={`w-full py-4 px-6 rounded-lg font-bold text-base uppercase tracking-widest transition-all pixel-borders ${
            tickCooldown > 0 || loading
              ? 'bg-gray-700 cursor-not-allowed opacity-75'
              : 'bg-purple-600 hover:bg-purple-700 hover:scale-105 pulse-glow hover:shadow-lg'
          }`}
        >
          {loading ? (
            <span className="loading-dots">Processing</span>
          ) : tickCooldown > 0 ? (
            `⏰ Next Tick: ${tickCooldown}s`
          ) : (
            '⚡ Execute Tick'
          )}
        </button>
        <p className="text-gray-400 text-xs text-center mt-4 uppercase tracking-wider leading-relaxed">
          Advance the Simulation
        </p>
      </div>
    </div>
  )
}
