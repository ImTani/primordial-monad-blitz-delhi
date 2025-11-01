'use client'

import { useEffect, useRef, useState } from 'react'
import { TEAM_COLORS, GRID_SIZE } from '@/lib/contract'

interface GridProps {
  grid: number[][]
  onCellClick: (x: number, y: number) => void
  playerTeam: number
  cooldown: number
}

export function Grid({ grid, onCellClick, playerTeam, cooldown }: GridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null)
  const CELL_SIZE = 30

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw cells
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const cellType = grid[x]?.[y] ?? 0

        // Cell background
        ctx.fillStyle = TEAM_COLORS[cellType as keyof typeof TEAM_COLORS]
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

        // Hover preview
        if (
          hoveredCell?.x === x &&
          hoveredCell?.y === y &&
          (cellType === 0 || cellType === playerTeam) &&
          cooldown === 0 &&
          playerTeam > 0
        ) {
          ctx.fillStyle = TEAM_COLORS[playerTeam as keyof typeof TEAM_COLORS] + '80'
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }

        // Grid lines
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 1
        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      }
    }
  }, [grid, hoveredCell, playerTeam, cooldown])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE)
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE)

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      onCellClick(x, y)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE)
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE)

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      setHoveredCell({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setHoveredCell(null)
  }

  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pixel-borders rounded-lg"
      style={{
        cursor: cooldown === 0 && playerTeam > 0 ? 'crosshair' : 'not-allowed',
        imageRendering: 'pixelated',
      }}
    />
  )
}
