'use client'

import { useAccount } from 'wagmi'
import { useGameState } from '@/hooks/useGameState'
import { WalletConnect } from '@/components/WalletConnect'
import { TeamSelection } from '@/components/TeamSelection'
import { Grid } from '@/components/Grid'
import { GameControls } from '@/components/GameControls'

export default function Home() {
  const { isConnected } = useAccount()
  const {
    grid,
    playerTeam,
    cooldown,
    tickCooldown,
    stats,
    loading,
    joinTeam,
    placeCell,
    executeTick,
  } = useGameState()

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">🎮 Primordial MVP</h1>
            <p className="text-gray-400">Rock-Paper-Scissors Cellular Automaton</p>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {!isConnected ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-6">Connect Your Wallet to Play</h2>
            <p className="text-gray-400 mb-8">
              You&apos;ll need MetaMask connected to Monad Testnet
            </p>
          </div>
        ) : playerTeam === 0 ? (
          <TeamSelection onSelectTeam={joinTeam} loading={loading} />
        ) : (
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left: Game Controls */}
            <div className="order-2 lg:order-1">
              <GameControls
                playerTeam={playerTeam}
                cooldown={cooldown}
                tickCooldown={tickCooldown}
                stats={stats}
                loading={loading}
                onExecuteTick={executeTick}
              />
            </div>

            {/* Right: Grid */}
            <div className="order-1 lg:order-2 flex flex-col items-center gap-4">
              <Grid
                grid={grid}
                onCellClick={placeCell}
                playerTeam={playerTeam}
                cooldown={cooldown}
              />
              <p className="text-gray-400 text-sm text-center max-w-md">
                {cooldown === 0
                  ? 'Click an empty cell or your own cells to place your element'
                  : 'Wait for cooldown to place more cells'}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="text-6xl animate-spin mb-4">⏳</div>
          <p className="text-xl">Transaction pending...</p>
        </div>
      )}
    </div>
  );
}
