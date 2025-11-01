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
      <div className="bg-gray-900 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">
          Your Team: {TEAM_EMOJI[playerTeam as keyof typeof TEAM_EMOJI]}{' '}
          {TEAM_NAMES[playerTeam as keyof typeof TEAM_NAMES]}
        </h3>
        {cooldown > 0 ? (
          <p className="text-red-400">Cooldown: {cooldown}s</p>
        ) : (
          <p className="text-green-400">✓ Ready to place</p>
        )}
      </div>

      {/* Stats */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Territory Control</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span style={{ color: TEAM_COLORS[1] }}>🔥 Fire:</span>
            <span className="text-2xl font-bold">{stats.fire}</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: TEAM_COLORS[2] }}>💧 Water:</span>
            <span className="text-2xl font-bold">{stats.water}</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: TEAM_COLORS[3] }}>🌱 Plant:</span>
            <span className="text-2xl font-bold">{stats.plant}</span>
          </div>
        </div>
      </div>

      {/* Tick Control */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <button
          onClick={onExecuteTick}
          disabled={loading || tickCooldown > 0}
          className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition-colors"
        >
          {tickCooldown > 0 ? `Next Tick in ${tickCooldown}s` : '⚡ Execute Tick'}
        </button>
        <p className="text-gray-400 text-sm text-center mt-2">
          Anyone can advance the simulation
        </p>
      </div>
    </div>
  )
}
