"use client"

import { useEffect, useState } from "react"

interface ScoreRingProps {
  score: number
  maxScore?: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
  color?: string
  animate?: boolean
}

export function ScoreRing({
  score,
  maxScore = 100,
  size = 160,
  strokeWidth = 12,
  label,
  sublabel,
  color = "var(--primary)",
  animate = true,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = Math.min((displayScore / maxScore) * 100, 100)
  const offset = circumference - (percentage / 100) * circumference

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score)
      return
    }

    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.round(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score, animate])

  const getScoreColor = () => {
    if (percentage >= 80) return "oklch(0.6 0.18 160)"
    if (percentage >= 60) return "oklch(0.55 0.18 220)"
    if (percentage >= 40) return "oklch(0.7 0.15 70)"
    return "oklch(0.55 0.2 25)"
  }

  const finalColor = color === "auto" ? getScoreColor() : color

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--secondary)"
            strokeWidth={strokeWidth}
            className="opacity-50"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={finalColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${finalColor})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-bold text-foreground">{displayScore}</span>
          {maxScore !== 100 && <span className="text-sm text-muted-foreground">/ {maxScore}</span>}
        </div>
      </div>
      {(label || sublabel) && (
        <div className="text-center">
          {label && <p className="font-semibold text-foreground">{label}</p>}
          {sublabel && <p className="text-sm text-muted-foreground">{sublabel}</p>}
        </div>
      )}
    </div>
  )
}
