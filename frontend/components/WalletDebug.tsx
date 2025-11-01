'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useGameState } from '@/hooks/useGameState'

export function WalletDebug() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { executeTick, tickCooldown, loading } = useGameState()

  const handleConnect = () => {
    const injectedConnector = connectors.find(c => c.id === 'injected')
    if (injectedConnector) {
      connect({ connector: injectedConnector })
    }
  }

  const handleDirectTick = async () => {
    console.log('🔧 Direct tick test')
    if (!window.ethereum) {
      alert('MetaMask not found')
      return
    }

    try {
      // Direct MetaMask call
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      console.log('Accounts:', accounts)
      
      // Call our hook function
      executeTick()
    } catch (error) {
      console.error('Direct tick failed:', error)
      alert('Direct tick failed: ' + (error as Error).message)
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-blue-900/90 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50 border border-blue-600">
      <h3 className="font-bold mb-2 text-blue-400">🔧 Wallet Debug</h3>
      <div className="space-y-2">
        <div><span className="text-gray-400">Address:</span> {address ? `${address.slice(0, 8)}...` : 'None'}</div>
        <div><span className="text-gray-400">Connected:</span> {isConnected ? '✅' : '❌'}</div>
        <div><span className="text-gray-400">Chain:</span> {chain?.name || 'None'}</div>
        <div><span className="text-gray-400">Connectors:</span> {connectors.length}</div>
        
        {connectError && (
          <div className="text-red-400 text-xs">
            Error: {connectError.message}
          </div>
        )}
        
        <div className="space-y-1">
          {!isConnected ? (
            <button 
              onClick={handleConnect}
              className="w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
            >
              Connect Wallet
            </button>
          ) : (
            <button 
              onClick={() => disconnect()}
              className="w-full bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
            >
              Disconnect
            </button>
          )}
          
          {isConnected && (
            <button 
              onClick={handleDirectTick}
              disabled={loading || Number(tickCooldown) > 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-2 py-1 rounded text-xs"
            >
              Direct Tick Test
            </button>
          )}
        </div>
      </div>
    </div>
  )
}