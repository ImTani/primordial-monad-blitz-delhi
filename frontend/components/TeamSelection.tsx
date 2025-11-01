'use client'

import { TEAM_NAMES, TEAM_COLORS, TEAM_EMOJI } from '@/lib/contract'

interface TeamSelectionProps {
  onSelectTeam: (teamId: number) => void
  loading: boolean
}

export function TeamSelection({ onSelectTeam, loading }: TeamSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8 slide-in">
      {/* Header */}
      <div className="pixel-borders pixel-borders-hover bg-[#1a1a2e] p-8 rounded-lg scale-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-wider retro-text-shadow">SELECT ELEMENT</h2>
        <p className="text-sm text-gray-400 uppercase tracking-widest">Choose your faction and dominate the battlefield</p>
      </div>

      {/* Team Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((teamId, index) => (
          <button
            key={teamId}
            onClick={() => onSelectTeam(teamId)}
            disabled={loading}
            className={`pixel-borders pixel-borders-hover p-8 rounded-lg font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${
              teamId === 1 ? 'glow-fire' : teamId === 2 ? 'glow-water' : 'glow-plant'
            }`}
            style={{
              backgroundColor: TEAM_COLORS[teamId as keyof typeof TEAM_COLORS],
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="relative z-10 space-y-4">
              <div className="text-6xl pulse-slow">{TEAM_EMOJI[teamId as keyof typeof TEAM_EMOJI]}</div>
              <div className="text-lg tracking-widest uppercase retro-text-shadow">
                {TEAM_NAMES[teamId as keyof typeof TEAM_NAMES]}
              </div>
              {/* Element description */}
              <div className="text-xs opacity-90 leading-relaxed">
                {teamId === 1 && "Aggressive • Burns Plant • Vulnerable to Water"}
                {teamId === 2 && "Balanced • Quenches Fire • Absorbed by Plant"}
                {teamId === 3 && "Defensive • Absorbs Water • Burned by Fire"}
              </div>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-focus:opacity-20 transition-opacity"></div>
            
            {/* Loading state */}
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-2xl animate-spin">⏳</div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Rules Section */}
      <div className="pixel-borders pixel-borders-hover bg-black/50 p-8 rounded-lg fade-in">
        <h3 className="text-xl font-bold mb-6 text-center tracking-wider retro-text-shadow">⚔️ COMBAT RULES</h3>
        
        {/* Visual Combat Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="pixel-borders bg-red-900/20 p-4 rounded-lg text-center">
            <p className="flex items-center justify-center gap-2 text-base mb-2">
              <span className="text-3xl">🔥</span>
              <span className="text-gray-300 font-bold">BURNS</span>
              <span className="text-3xl">🌱</span>
            </p>
            <p className="text-xs text-gray-400">Fire dominates Plant</p>
          </div>
          <div className="pixel-borders bg-blue-900/20 p-4 rounded-lg text-center">
            <p className="flex items-center justify-center gap-2 text-base mb-2">
              <span className="text-3xl">💧</span>
              <span className="text-gray-300 font-bold">QUENCHES</span>
              <span className="text-3xl">🔥</span>
            </p>
            <p className="text-xs text-gray-400">Water dominates Fire</p>
          </div>
          <div className="pixel-borders bg-green-900/20 p-4 rounded-lg text-center">
            <p className="flex items-center justify-center gap-2 text-base mb-2">
              <span className="text-3xl">🌱</span>
              <span className="text-gray-300 font-bold">ABSORBS</span>
              <span className="text-3xl">💧</span>
            </p>
            <p className="text-xs text-gray-400">Plant dominates Water</p>
          </div>
        </div>

        {/* Cellular Automaton Rules */}
        <div className="border-t border-gray-700 pt-6">
          <h4 className="text-sm font-bold mb-4 text-center uppercase tracking-wider text-gray-300">Cellular Automaton</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="pixel-borders bg-green-900/20 p-4 rounded text-center">
              <p className="text-green-300 font-bold mb-2">🌟 Cell Spawns</p>
              <p className="text-xs text-gray-400">3+ friendly neighbors</p>
            </div>
            <div className="pixel-borders bg-red-900/20 p-4 rounded text-center">
              <p className="text-red-300 font-bold mb-2">⚡ Cell Converts</p>
              <p className="text-xs text-gray-400">3+ enemy counters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
