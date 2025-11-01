'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { monadTestnet } from '@/lib/wagmi'

export function Navbar() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)

  const isWrongNetwork = isConnected && chain && chain.id !== monadTestnet.id

  const handleManualSwitch = async () => {
    if (switchChain) {
      setIsSwitching(true)
      try {
        await switchChain({ chainId: monadTestnet.id })
      } catch (error) {
        console.error('Manual switch failed:', error)
        alert('Please add Monad Testnet to your wallet manually.\n\nNetwork Name: Monad Testnet\nRPC URL: https://testnet-rpc.monad.xyz\nChain ID: 10143 (0x279f)\nCurrency: MON')
      } finally {
        setIsSwitching(false)
      }
    }
  }

  return (
    <nav className="w-full px-4 sm:px-6 py-6 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider retro-text-shadow" style={{
            textShadow: '3px 3px 0px #ff6b35, 4px 4px 0px rgba(0,0,0,0.5)'
          }}>
            ⚔️ PRIMORDIAL
          </h1>
        </div>

        {/* Wallet Section */}
        <div className="relative">
          {isConnected && address ? (
            <div className="flex items-center gap-4">
              {/* Network Status */}
              {isWrongNetwork && (
                <button
                  onClick={handleManualSwitch}
                  disabled={isSwitching}
                  className="pixel-borders pixel-borders-hover px-3 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:opacity-75 rounded text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                >
                  {isSwitching ? (
                    <span className="loading-dots">Switching</span>
                  ) : (
                    'Switch Network'
                  )}
                </button>
              )}

              {/* Wallet Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="pixel-borders pixel-borders-hover bg-[#1a1a2e] px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider hover:bg-[#2a2a3e] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Wallet menu"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="text-xs text-gray-400 hidden md:inline">
                    {chain?.name || 'Unknown'}
                  </span>
                  <span className="tabular-nums">{address.slice(0, 4)}...{address.slice(-4)}</span>
                  <span className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 pixel-borders bg-[#1a1a2e] rounded-lg p-4 z-50 slide-in">
                    <div className="space-y-4">
                      <div className="px-2 py-1 text-xs text-gray-400 border-b border-gray-700 uppercase tracking-wider">
                        Connected Wallet
                      </div>
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="text-gray-400 mb-1">Address:</div>
                          <div className="font-mono text-white bg-black/50 px-2 py-1 rounded break-all">
                            {address}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 mb-1">Network:</div>
                          <div className="text-white">{chain?.name || 'Unknown'}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          disconnect()
                          setIsDropdownOpen(false)
                        }}
                        className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 pixel-borders rounded text-xs font-bold uppercase tracking-wide transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Connect Wallet Dropdown */
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="pixel-borders pixel-borders-hover bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Connect wallet menu"
                aria-expanded={isDropdownOpen}
              >
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
                <span className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 pixel-borders bg-[#1a1a2e] rounded-lg p-4 z-50 slide-in">
                  <div className="space-y-4">
                    <div className="text-xs text-gray-400 uppercase tracking-wider text-center pb-2 border-b border-gray-700">
                      Choose Wallet
                    </div>
                    {connectors.map((connector, index) => (
                      <button
                        key={connector.id}
                        onClick={() => {
                          connect({ connector, chainId: monadTestnet.id })
                          setIsDropdownOpen(false)
                        }}
                        className="w-full pixel-borders pixel-borders-hover px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {connector.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  )
}