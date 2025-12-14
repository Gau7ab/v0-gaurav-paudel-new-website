"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
  rotation: number
  rotationSpeed: number
  stuck: boolean
  stuckY: number
  meltProgress: number
  type: "crystal" | "dot" | "star"
}

interface StuckFlake {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  drip: number
  dripSpeed: number
  melting: boolean
}

export function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snowflakesRef = useRef<Snowflake[]>([])
  const stuckFlakesRef = useRef<StuckFlake[]>([])
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isWinterSeason, setIsWinterSeason] = useState(false)

  const createSnowflake = useCallback(
    (id: number, startFromTop = true): Snowflake => ({
      id,
      x: Math.random() * dimensions.width,
      y: startFromTop ? -10 : Math.random() * dimensions.height * 0.5,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.4,
      wobble: 0,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      stuck: false,
      stuckY: 0,
      meltProgress: 0,
      type: ["crystal", "dot", "star"][Math.floor(Math.random() * 3)] as "crystal" | "dot" | "star",
    }),
    [dimensions.width, dimensions.height],
  )

  useEffect(() => {
    const checkWinterSeason = () => {
      const now = new Date()
      const month = now.getMonth() // 0 = January, 1 = February, etc.

      // Display snow effect from December (11) through January (0)
      const isWinter = month === 0 || month === 11
      setIsWinterSeason(isWinter)
    }

    checkWinterSeason()
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!isWinterSeason || dimensions.width === 0) return

    // Initialize snowflakes
    snowflakesRef.current = Array.from({ length: 60 }, (_, i) => createSnowflake(i, false))

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const drawCrystal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
      ctx.lineWidth = 1

      // Draw 6-pointed crystal
      for (let i = 0; i < 6; i++) {
        ctx.save()
        ctx.rotate((i * Math.PI) / 3)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -size)
        // Add branches
        ctx.moveTo(0, -size * 0.4)
        ctx.lineTo(-size * 0.3, -size * 0.6)
        ctx.moveTo(0, -size * 0.4)
        ctx.lineTo(size * 0.3, -size * 0.6)
        ctx.stroke()
        ctx.restore()
      }
      ctx.restore()
    }

    const drawStar = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4
        const r = i % 2 === 0 ? size : size * 0.4
        const px = Math.cos(angle) * r
        const py = Math.sin(angle) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawDot = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
      // Add subtle glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.5})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const drawStuckFlake = (flake: StuckFlake) => {
      // Draw the stuck snowflake with drip effect
      ctx.globalAlpha = flake.opacity * (1 - flake.drip / 50)

      // Main stuck part
      ctx.beginPath()
      ctx.arc(flake.x, flake.y, flake.size * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.fill()

      // Drip/melt trail
      if (flake.drip > 0) {
        ctx.beginPath()
        ctx.moveTo(flake.x - flake.size * 0.3, flake.y)
        ctx.quadraticCurveTo(flake.x, flake.y + flake.drip * 0.5, flake.x, flake.y + flake.drip)
        ctx.quadraticCurveTo(flake.x, flake.y + flake.drip * 0.5, flake.x + flake.size * 0.3, flake.y)
        ctx.fillStyle = `rgba(200, 220, 255, ${0.4 * (1 - flake.drip / 50)})`
        ctx.fill()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw falling snowflakes
      snowflakesRef.current.forEach((flake, index) => {
        // Update position
        flake.wobble += flake.wobbleSpeed
        flake.x += Math.sin(flake.wobble) * 0.5
        flake.y += flake.speed
        flake.rotation += flake.rotationSpeed

        // Check if snowflake should stick to screen edge (top 5% of screen)
        if (flake.y > 0 && flake.y < dimensions.height * 0.05 && Math.random() < 0.001) {
          stuckFlakesRef.current.push({
            id: Date.now() + Math.random(),
            x: flake.x,
            y: flake.y,
            size: flake.size,
            opacity: flake.opacity,
            drip: 0,
            dripSpeed: Math.random() * 0.1 + 0.05,
            melting: false,
          })
          // Reset this snowflake
          snowflakesRef.current[index] = createSnowflake(flake.id, true)
          return
        }

        // Reset if out of bounds
        if (flake.y > dimensions.height || flake.x < -20 || flake.x > dimensions.width + 20) {
          snowflakesRef.current[index] = createSnowflake(flake.id, true)
          return
        }

        // Draw based on type
        switch (flake.type) {
          case "crystal":
            drawCrystal(flake.x, flake.y, flake.size, flake.rotation, flake.opacity)
            break
          case "star":
            drawStar(flake.x, flake.y, flake.size, flake.rotation, flake.opacity)
            break
          default:
            drawDot(flake.x, flake.y, flake.size, flake.opacity)
        }
      })

      // Update and draw stuck flakes
      stuckFlakesRef.current = stuckFlakesRef.current.filter((flake) => {
        // Start melting after a delay
        if (!flake.melting && Math.random() < 0.005) {
          flake.melting = true
        }

        if (flake.melting) {
          flake.drip += flake.dripSpeed
          flake.opacity -= 0.002
        }

        if (flake.drip > 50 || flake.opacity <= 0) {
          return false // Remove this flake
        }

        drawStuckFlake(flake)
        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, createSnowflake, isWinterSeason])

  if (!isWinterSeason) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
