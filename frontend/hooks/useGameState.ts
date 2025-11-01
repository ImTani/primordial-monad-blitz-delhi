'use client'

import { useMemo, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, GRID_SIZE } from '@/lib/contract'

export function useGameState() {
  const { address } = useAccount()
  // Drastically reduce polling frequency to prevent RPC spam
  const slowPollInterval = 10000  // 10 seconds for static data
  const fastPollInterval = 5000   // 5 seconds for dynamic data
  
  // Read player team (rarely changes, poll less frequently)
  const { data: playerTeam = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'playerTeam',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: slowPollInterval,
    },
  }) as { data: number }

  // Read grid (changes with ticks, moderate polling)
  const { data: gridData, refetch: refetchGrid } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getGrid',
    query: {
      refetchInterval: fastPollInterval,
    },
  })

  // Read player cooldown (dynamic, but don't need sub-second updates)
  const { data: playerCooldown = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerCooldown',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: fastPollInterval,
    },
  }) as { data: bigint }

  // Read tick cooldown (dynamic, but don't need sub-second updates)
  const { data: tickCooldown = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'timeUntilNextTick',
    query: {
      refetchInterval: fastPollInterval,
    },
  }) as { data: bigint }

  // Read team cell counts (changes with ticks, moderate polling)
  const { data: fireCount = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'teamCellCount',
    args: [1],
    query: {
      refetchInterval: fastPollInterval,
    },
  }) as { data: bigint }

  const { data: waterCount = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'teamCellCount',
    args: [2],
    query: {
      refetchInterval: fastPollInterval,
    },
  }) as { data: bigint }

  const { data: plantCount = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'teamCellCount',
    args: [3],
    query: {
      refetchInterval: fastPollInterval,
    },
  }) as { data: bigint }

  // Write functions
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, error: receiptError, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Track transaction states
  useEffect(() => {
    if (hash) {
      console.log('📝 Transaction hash received:', hash)
    }
  }, [hash])

  useEffect(() => {
    if (isConfirming) {
      console.log('⏳ Transaction confirming...')
    }
  }, [isConfirming])

  useEffect(() => {
    if (isSuccess) {
      console.log('✅ Transaction confirmed successfully!')
      // Refresh data after transaction with small delay
      setTimeout(() => {
        refetchGrid()
      }, 1000)
    }
  }, [isSuccess, refetchGrid])

  useEffect(() => {
    if (error) {
      console.error('❌ Write contract error:', error)
    }
  }, [error])

  useEffect(() => {
    if (receiptError) {
      console.error('❌ Transaction receipt error:', receiptError)
    }
  }, [receiptError])

  // Transform grid data with useMemo to avoid unnecessary re-renders
  const grid = useMemo(() => {
    if (!gridData) {
      return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0))
    }
    return (gridData as number[][]).map(row => row.map(cell => Number(cell)))
  }, [gridData])

  // Actions
  const joinTeam = (teamId: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'joinTeam',
      args: [teamId],
    })
  }

  const placeCell = (x: number, y: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'placeCell',
      args: [x, y],
    })
  }

  const executeTick = () => {
    console.log('🎯 ExecuteTick called')
    console.log('📊 Current state:', {
      tickCooldown: Number(tickCooldown),
      playerTeam: Number(playerTeam),
      loading: isPending || isConfirming,
      contractAddress: CONTRACT_ADDRESS
    })
    
    if (Number(tickCooldown) > 0) {
      console.warn('⚠️ Tick cooldown not expired:', Number(tickCooldown))
      return
    }
    
    console.log('📝 Calling writeContract...')
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'tick',
    })
    console.log('✅ WriteContract call initiated')
  }

  return {
    address,
    grid,
    playerTeam: Number(playerTeam),
    cooldown: Number(playerCooldown),
    tickCooldown: Number(tickCooldown),
    stats: {
      fire: Number(fireCount),
      water: Number(waterCount),
      plant: Number(plantCount),
    },
    loading: isPending || isConfirming,
    joinTeam,
    placeCell,
    executeTick,
    refetchGrid,
  }
}
