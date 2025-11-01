import { Address } from 'viem'
import ABI from './abi.json'

export const CONTRACT_ADDRESS: Address = '0xeA7A96e1a4c58Ff73a80b3a1603ec6290ee31bbf'
export const CONTRACT_ABI = ABI

export const TEAM_NAMES = {
  0: 'None',
  1: 'Fire',
  2: 'Water',
  3: 'Plant',
} as const

export const TEAM_COLORS = {
  0: '#1a1a1a',
  1: '#ff4444',
  2: '#4444ff',
  3: '#44ff44',
} as const

export const TEAM_EMOJI = {
  0: '❓',
  1: '🔥',
  2: '💧',
  3: '🌱',
} as const

export type TeamId = keyof typeof TEAM_NAMES

export const GRID_SIZE = 20
export const TICK_INTERVAL = 60
export const ACTION_COOLDOWN = 10
