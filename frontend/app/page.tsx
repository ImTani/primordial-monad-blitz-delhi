'use client'

import { useAccount } from 'wagmi'
import { useGameState } from '@/hooks/useGameState'
import { WalletConnect } from '@/components/WalletConnect'
import { TeamSelection } from '@/components/TeamSelection'
import { Grid } from '@/components/Grid'
import { GameControls } from '@/components/GameControls'
import { monadTestnet } from '@/lib/wagmi'

export default function Home() {
  const { isConnected, chain } = useAccount()
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

  const isWrongNetwork = isConnected && chain && chain.id !== monadTestnet.id

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23] text-white p-4 sm:p-8 scanline">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
          animation: 'scroll 20s linear infinite'
        }}></div>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left slide-in">
            <h1 className="text-3xl sm:text-5xl font-bold mb-2 tracking-wider" style={{
              textShadow: '4px 4px 0px #ff6b35, 6px 6px 0px rgba(0,0,0,0.5)'
            }}>
              ⚔️ PRIMORDIAL
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
              Cellular Automaton Battle Arena
            </p>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto relative z-10">
        {!isConnected ? (
          <div className="text-center py-20 slide-in">
            <div className="pixel-borders bg-[#1a1a2e] p-8 rounded-lg max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-wider">CONNECT WALLET</h2>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                MetaMask • Coinbase Wallet • Browser Wallets
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Auto-Switch to Monad Testnet
              </p>
            </div>
          </div>
        ) : isWrongNetwork ? (
          <div className="text-center py-20 slide-in">
            <div className="pixel-borders bg-[#1a1a2e] p-8 rounded-lg max-w-2xl mx-auto border-2 border-yellow-600">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 tracking-wider">
                ⚠️ WRONG NETWORK
              </h2>
              <p className="text-gray-400 mb-4 text-sm">
                Connected to: <strong className="text-white">{chain?.name || 'Unknown'}</strong>
              </p>
              <p className="text-gray-400 mb-8 text-sm">
                Switch to <strong className="text-yellow-400">MONAD TESTNET</strong>
              </p>
              <div className="bg-black/50 p-6 rounded-lg text-left text-xs space-y-2">
                <p><span className="text-gray-500">NETWORK:</span> <span className="text-white">Monad Testnet</span></p>
                <p><span className="text-gray-500">RPC URL:</span> <span className="text-white">https://testnet-rpc.monad.xyz</span></p>
                <p><span className="text-gray-500">CHAIN ID:</span> <span className="text-white">10143 (0x279f)</span></p>
                <p><span className="text-gray-500">CURRENCY:</span> <span className="text-white">MON</span></p>
              </div>
            </div>
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
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 pixel-borders">
          <div className="text-6xl animate-spin mb-4">⏳</div>
          <p className="text-xl uppercase tracking-widest pulse-glow">Transaction Pending...</p>
        </div>
      )}
    </div>
  );
}
