'use client'

import { useAccount, useReadContract } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { useState, useEffect } from 'react'

export function Debug() {
  const { address } = useAccount()
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const updateTime = () => setCurrentTime(Math.floor(Date.now() / 1000))
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Read current timestamp comparison (reduced polling)
  const { data: lastTick } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'lastTick',
    query: {
      refetchInterval: 5000, // Only poll every 5 seconds
    },
  }) as { data: bigint }

  const { data: timeUntilNextTick } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'timeUntilNextTick',
    query: {
      refetchInterval: 5000, // Reduced from 1000ms to 5000ms
    },
  }) as { data: bigint }
  const lastTickTime = lastTick ? Number(lastTick) : 0
  const timeSinceLastTick = currentTime - lastTickTime
  const canTick = timeSinceLastTick >= 60

  return (
    <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50 border border-gray-600">
      <h3 className="font-bold mb-2 text-yellow-400">🐛 Debug Info</h3>
      <div className="space-y-1">
        <div><span className="text-gray-400">Contract:</span> {CONTRACT_ADDRESS.slice(0, 10)}...</div>
        <div><span className="text-gray-400">Connected:</span> {address ? '✅ Yes' : '❌ No'}</div>
        <div><span className="text-gray-400">Current Time:</span> {currentTime}</div>
        <div><span className="text-gray-400">Last Tick:</span> {lastTickTime}</div>
        <div><span className="text-gray-400">Time Since:</span> {timeSinceLastTick}s / 60s</div>
        <div><span className="text-gray-400">Frontend Says:</span> {Number(timeUntilNextTick || 0)}s left</div>
        <div className={canTick ? 'text-green-400' : 'text-red-400'}>
          <span className="text-gray-400">Can Tick:</span> {canTick ? '✅ READY' : '⏱️ WAITING'}
        </div>
        {lastTick && (
          <div className="text-xs text-gray-500 mt-2">
            Next tick at: {lastTickTime + 60}
          </div>
        )}
      </div>
    </div>
  )
}