'use client'

import { useAccount } from 'wagmi'
import { useGameState } from '@/hooks/useGameState'
import { Navbar } from '@/components/Navbar'
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
    <div className="min-h-screen bg-linear-to-b from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23] text-white scanline">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
          animation: 'scroll 20s linear infinite'
        }}></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 py-12">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center slide-in space-y-12">
            {/* Centered Hero Section */}
            <div className="w-full max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider leading-tight pulse-slow mx-auto" style={{
                textShadow: '6px 6px 0px #ff6b35, 8px 8px 0px rgba(0,0,0,0.5)'
              }}>
                ⚔️ PRIMORDIAL
              </h1>
              <div className="space-y-4">
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 uppercase tracking-widest retro-text-shadow">
                  Cellular Automaton Battle Arena
                </p>
                <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed px-4">
                  Engage in strategic warfare where Fire burns Plant, Water quenches Fire, 
                  and Plant absorbs Water. Watch your territory evolve through cellular automaton rules.
                </p>
              </div>
            </div>

            {/* Connection Instructions */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="pixel-borders pixel-borders-hover bg-[#1a1a2e] p-8 rounded-lg scale-in">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 tracking-wider text-center retro-text-shadow">GET STARTED</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pixel-borders bg-black/30 p-4 rounded-lg hover:bg-black/50 transition-colors">
                    <span className="text-2xl shrink-0">1️⃣</span>
                    <div className="space-y-1">
                      <p className="text-base font-bold">Connect Wallet</p>
                      <p className="text-sm text-gray-400">Use the dropdown in the top-right corner</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pixel-borders bg-black/30 p-4 rounded-lg hover:bg-black/50 transition-colors">
                    <span className="text-2xl shrink-0">2️⃣</span>
                    <div className="space-y-1">
                      <p className="text-base font-bold">Switch Network</p>
                      <p className="text-sm text-gray-400">Auto-switch to Monad Testnet (Chain ID: 10143)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pixel-borders bg-black/30 p-4 rounded-lg hover:bg-black/50 transition-colors">
                    <span className="text-2xl shrink-0">3️⃣</span>
                    <div className="space-y-1">
                      <p className="text-base font-bold">Choose Element</p>
                      <p className="text-sm text-gray-400">Select your faction and start conquering!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isWrongNetwork ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center slide-in max-w-2xl mx-auto">
              <div className="pixel-borders bg-[#1a1a2e] p-8 rounded-lg border-2 border-yellow-600">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 tracking-wider retro-text-shadow">
                  ⚠️ WRONG NETWORK
                </h2>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-400">
                    Connected to: <strong className="text-white">{chain?.name || 'Unknown'}</strong>
                  </p>
                  <p className="text-gray-400">
                    Please switch to <strong className="text-yellow-400">MONAD TESTNET</strong> using the navbar button
                  </p>
                </div>
                <div className="bg-black/50 p-6 rounded-lg text-left text-sm space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-500">NETWORK:</span> 
                    <span className="text-white">Monad Testnet</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">RPC URL:</span> 
                    <span className="text-white break-all ml-4">https://testnet-rpc.monad.xyz</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">CHAIN ID:</span> 
                    <span className="text-white">10143 (0x279f)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">CURRENCY:</span> 
                    <span className="text-white">MON</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : playerTeam === 0 ? (
          <div className="max-w-6xl mx-auto">
            <TeamSelection onSelectTeam={joinTeam} loading={loading} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Mobile-first responsive layout */}
            <div className="flex flex-col xl:grid xl:grid-cols-[400px_1fr] gap-8 items-start">
              {/* Game Controls - Mobile: Top, Desktop: Left */}
              <div className="w-full xl:sticky xl:top-8 space-y-6 slide-in">
                <GameControls
                  playerTeam={playerTeam}
                  cooldown={cooldown}
                  tickCooldown={tickCooldown}
                  stats={stats}
                  loading={loading}
                  onExecuteTick={executeTick}
                />
              </div>

              {/* Grid Section - Mobile: Bottom, Desktop: Right */}
              <div className="flex flex-col items-center gap-6 w-full slide-in-right">
                {/* Game Status Bar */}
                <div className="w-full max-w-2xl">
                  <div className="pixel-borders bg-black/50 px-6 py-4 rounded-lg text-center">
                    <p className="text-sm uppercase tracking-wider">
                      {cooldown === 0
                        ? '🎯 Click cells to expand your territory'
                        : `⏳ Cooldown: ${cooldown}s remaining`}
                    </p>
                  </div>
                </div>

                {/* Grid Container */}
                <div className="pixel-borders pixel-borders-hover bg-[#1a1a2e] p-6 rounded-lg">
                  <Grid
                    grid={grid}
                    onCellClick={placeCell}
                    playerTeam={playerTeam}
                    cooldown={cooldown}
                  />
                </div>

                {/* Quick Rules Reminder */}
                <div className="w-full max-w-2xl">
                  <div className="pixel-borders bg-black/30 px-6 py-4 rounded-lg">
                    <div className="flex flex-wrap justify-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="text-lg">🔥</span>
                        <span className="text-gray-400">burns</span>
                        <span className="text-lg">🌱</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-lg">💧</span>
                        <span className="text-gray-400">quenches</span>
                        <span className="text-lg">🔥</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-lg">🌱</span>
                        <span className="text-gray-400">absorbs</span>
                        <span className="text-lg">💧</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 pixel-borders">
          <div className="pixel-borders bg-[#1a1a2e] p-8 rounded-lg text-center scale-in">
            <div className="text-6xl animate-spin mb-6">⏳</div>
            <p className="text-xl uppercase tracking-widest pulse-glow mb-4">Transaction Pending</p>
            <div className="w-48 h-2 bg-black/50 rounded-lg overflow-hidden">
              <div className="h-full bg-blue-500 animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-400 mt-4 uppercase tracking-wider">
              Please confirm in your wallet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
