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
  return (
    <div className="space-y-6">
      {/* Player Info */}
      <div className="pixel-borders bg-[#1a1a2e] p-6 rounded-lg slide-in">
        <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-gray-400">Your Team</h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{TEAM_EMOJI[playerTeam as keyof typeof TEAM_EMOJI]}</span>
          <span className="text-xl font-bold tracking-wider uppercase">
            {TEAM_NAMES[playerTeam as keyof typeof TEAM_NAMES]}
          </span>
        </div>
        {cooldown > 0 ? (
          <div className="pixel-borders bg-red-900/30 border-2 border-red-600 px-3 py-2 rounded text-red-300 text-xs uppercase tracking-wide">
            Cooldown: {cooldown}s
          </div>
        ) : (
          <div className="pixel-borders bg-green-900/30 border-2 border-green-600 px-3 py-2 rounded text-green-300 text-xs uppercase tracking-wide pulse-glow">
            ✓ Ready to Place
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="pixel-borders bg-[#1a1a2e] p-6 rounded-lg slide-in">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">Territory</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pixel-borders bg-black/50 p-3 rounded">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-2xl">🔥</span>
              <span className="uppercase tracking-wide">Fire</span>
            </span>
            <span className="text-2xl font-bold" style={{ color: TEAM_COLORS[1] }}>{stats.fire}</span>
          </div>
          <div className="flex justify-between items-center pixel-borders bg-black/50 p-3 rounded">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-2xl">💧</span>
              <span className="uppercase tracking-wide">Water</span>
            </span>
            <span className="text-2xl font-bold" style={{ color: TEAM_COLORS[2] }}>{stats.water}</span>
          </div>
          <div className="flex justify-between items-center pixel-borders bg-black/50 p-3 rounded">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-2xl">🌱</span>
              <span className="uppercase tracking-wide">Plant</span>
            </span>
            <span className="text-2xl font-bold" style={{ color: TEAM_COLORS[3] }}>{stats.plant}</span>
          </div>
        </div>
      </div>

      {/* Tick Control */}
      <div className="pixel-borders bg-[#1a1a2e] p-6 rounded-lg slide-in">
        <button
          onClick={onExecuteTick}
          disabled={loading || tickCooldown > 0}
          className={`w-full py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider transition-all pixel-borders ${
            tickCooldown > 0 || loading
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 hover:scale-105 pulse-glow'
          }`}
        >
          {tickCooldown > 0 ? `Next Tick: ${tickCooldown}s` : '⚡ Execute Tick'}
        </button>
        <p className="text-gray-400 text-xs text-center mt-3 uppercase tracking-wide">
          Advance Simulation
        </p>
      </div>
    </div>
  )
}
