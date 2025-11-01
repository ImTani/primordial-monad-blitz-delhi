'use client'

import { TEAM_NAMES, TEAM_COLORS, TEAM_EMOJI } from '@/lib/contract'

interface TeamSelectionProps {
  onSelectTeam: (teamId: number) => void
  loading: boolean
}

export function TeamSelection({ onSelectTeam, loading }: TeamSelectionProps) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-4">Choose Your Element</h2>
        <p className="text-gray-400">Join a team and start claiming territory</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {[1, 2, 3].map((teamId) => (
          <button
            key={teamId}
            onClick={() => onSelectTeam(teamId)}
            disabled={loading}
            className="px-8 py-6 rounded-xl font-bold text-2xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: TEAM_COLORS[teamId as keyof typeof TEAM_COLORS],
            }}
          >
            {TEAM_EMOJI[teamId as keyof typeof TEAM_EMOJI]}{' '}
            {TEAM_NAMES[teamId as keyof typeof TEAM_NAMES]}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-xl text-left space-y-3">
        <h3 className="text-xl font-bold mb-4">Rules:</h3>
        <p className="text-lg">🔥 Fire burns 🌱 Plant</p>
        <p className="text-lg">💧 Water extinguishes 🔥 Fire</p>
        <p className="text-lg">🌱 Plant absorbs 💧 Water</p>
        <p className="text-gray-400 mt-4">
          Empty cells with 3+ neighbors spawn that element
        </p>
        <p className="text-gray-400">
          Cells with 3+ counter-element neighbors get converted
        </p>
      </div>
    </div>
  )
}
