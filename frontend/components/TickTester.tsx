'use client'

import { useGameState } from '@/hooks/useGameState'

export function TickTester() {
  const { tickCooldown, loading, executeTick } = useGameState()

  const handleForceTickTest = () => {
    console.log('🧪 Force tick test - bypassing all checks')
    executeTick()
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50 border border-gray-600">
      <h3 className="font-bold mb-2 text-red-400">🧪 Tick Tester</h3>
      <div className="space-y-2">
        <div><span className="text-gray-400">Cooldown:</span> {Number(tickCooldown)}s</div>
        <div><span className="text-gray-400">Loading:</span> {loading ? '⏳' : '✅'}</div>
        
        <button 
          onClick={handleForceTickTest}
          className="w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white font-bold"
        >
          FORCE TICK
        </button>
        
        <div className="text-xs text-gray-500">
          Bypasses UI checks
        </div>
      </div>
    </div>
  )
}