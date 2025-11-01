'use client'

import { useMemo } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, GRID_SIZE } from '@/lib/contract'

export function useGameState() {
  const { address } = useAccount()
  const pollInterval = 3000

  // Read player team
  const { data: playerTeam = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'playerTeam',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: pollInterval,
    },
  }) as { data: number }

  // Read grid
  const { data: gridData, refetch: refetchGrid } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getGrid',
    query: {
      refetchInterval: pollInterval,
    },
  })

  // Read player cooldown
  const { data: playerCooldown = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerCooldown',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 1000,
    },
  }) as { data: bigint }

  // Read tick cooldown
  const { data: tickCooldown = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'timeUntilNextTick',
    query: {
      refetchInterval: 1000,
    },
  }) as { data: bigint }

  // Read team cell counts
  const { data: fireCount = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'teamCellCount',
    args: [1],
    query: {
      refetchInterval: pollInterval,
    },
  }) as { data: bigint }

  const { data: waterCount = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'teamCellCount',
    args: [2],
    query: {
      refetchInterval: pollInterval,
    },
  }) as { data: bigint }

  const { data: plantCount = 0 } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'teamCellCount',
    args: [3],
    query: {
      refetchInterval: pollInterval,
    },
  }) as { data: bigint }

  // Write functions
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

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
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'tick',
    })
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
