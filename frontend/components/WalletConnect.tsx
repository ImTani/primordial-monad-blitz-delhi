'use client'

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { useEffect, useState } from 'react'
import { monadTestnet } from '@/lib/wagmi'

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [isSwitching, setIsSwitching] = useState(false)

  const isWrongNetwork = isConnected && chain && chain.id !== monadTestnet.id

  // Auto-switch to Monad Testnet when connected
  useEffect(() => {
    const autoSwitch = async () => {
      if (isWrongNetwork && switchChain && !isSwitching) {
        setIsSwitching(true)
        try {
          await switchChain({ chainId: monadTestnet.id })
        } catch (error) {
          console.error('Auto-switch failed:', error)
        } finally {
          setIsSwitching(false)
        }
      }
    }
    autoSwitch()
  }, [isConnected, chain, switchChain, isWrongNetwork, isSwitching])

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

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-4 pixel-borders bg-[#1a1a2e] px-4 py-2 rounded-lg">
          {chain && (
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              {chain.name}
            </p>
          )}
          <p className="text-sm text-white font-bold tracking-wider">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            onClick={() => disconnect()}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-bold uppercase tracking-wide transition-colors"
          >
            Disconnect
          </button>
        </div>
        {isWrongNetwork && (
          <div className="flex flex-col items-end gap-2 slide-in">
            <div className="px-3 py-2 bg-yellow-900/50 border-2 border-yellow-600 rounded text-yellow-200 text-xs pixel-borders uppercase tracking-wide">
              ⚠️ Wrong Network: {chain?.name || 'Unknown'}
            </div>
            <button
              onClick={handleManualSwitch}
              disabled={isSwitching}
              className="pixel-borders px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
            >
              {isSwitching ? 'Switching...' : 'Switch to Monad'}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Connect Wallet:</p>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector, chainId: monadTestnet.id })}
          className="pixel-borders px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all hover:scale-105 text-sm uppercase tracking-wider"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}
