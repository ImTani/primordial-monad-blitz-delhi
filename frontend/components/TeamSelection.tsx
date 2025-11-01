'use client'

import { TEAM_NAMES, TEAM_COLORS, TEAM_EMOJI } from '@/lib/contract'

interface TeamSelectionProps {
  onSelectTeam: (teamId: number) => void
  loading: boolean
}

export function TeamSelection({ onSelectTeam, loading }: TeamSelectionProps) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 slide-in">
      <div className="pixel-borders bg-[#1a1a2e] p-8 rounded-lg">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-wider">SELECT ELEMENT</h2>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Choose your faction</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((teamId) => (
          <button
            key={teamId}
            onClick={() => onSelectTeam(teamId)}
            disabled={loading}
            className={`pixel-borders p-6 rounded-lg font-bold text-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${
              teamId === 1 ? 'glow-fire' : teamId === 2 ? 'glow-water' : 'glow-plant'
            }`}
            style={{
              backgroundColor: TEAM_COLORS[teamId as keyof typeof TEAM_COLORS],
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
            }}
          >
            <div className="relative z-10">
              <div className="text-5xl mb-3">{TEAM_EMOJI[teamId as keyof typeof TEAM_EMOJI]}</div>
              <div className="text-sm tracking-widest uppercase">
                {TEAM_NAMES[teamId as keyof typeof TEAM_NAMES]}
              </div>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        ))}
      </div>

      <div className="pixel-borders bg-black/50 p-6 rounded-lg text-left space-y-3 text-xs">
        <h3 className="text-lg font-bold mb-4 text-center tracking-wider">⚔️ COMBAT RULES</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <p className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="text-gray-400">BURNS</span>
            <span className="text-2xl">🌱</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-2xl">💧</span>
            <span className="text-gray-400">QUENCHES</span>
            <span className="text-2xl">🔥</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-gray-400">ABSORBS</span>
            <span className="text-2xl">💧</span>
          </p>
        </div>
        <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
          <p className="text-gray-400">• 3+ neighbors → Cell spawns</p>
          <p className="text-gray-400">• 3+ counters → Cell converts</p>
        </div>
      </div>
    </div>
  )
}
