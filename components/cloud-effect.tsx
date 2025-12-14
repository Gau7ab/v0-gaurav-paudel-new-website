"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Cloud {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
  speed: number
  parallaxFactor: number
}

export function CloudEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100
      const y = (e.clientY / window.innerHeight - 0.5) * 50
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const clouds: Cloud[] = [
    { id: 1, x: 5, y: 10, scale: 1.2, opacity: 0.15, speed: 60, parallaxFactor: 0.3 },
    { id: 2, x: 25, y: 5, scale: 0.8, opacity: 0.12, speed: 80, parallaxFactor: 0.2 },
    { id: 3, x: 60, y: 15, scale: 1.5, opacity: 0.18, speed: 50, parallaxFactor: 0.4 },
    { id: 4, x: 80, y: 8, scale: 1, opacity: 0.14, speed: 70, parallaxFactor: 0.25 },
    { id: 5, x: 40, y: 20, scale: 0.9, opacity: 0.1, speed: 90, parallaxFactor: 0.15 },
    { id: 6, x: 15, y: 25, scale: 1.3, opacity: 0.16, speed: 55, parallaxFactor: 0.35 },
  ]

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            x: springX.get() * cloud.parallaxFactor,
            y: springY.get() * cloud.parallaxFactor,
          }}
          animate={{
            x: [
              springX.get() * cloud.parallaxFactor - 20,
              springX.get() * cloud.parallaxFactor + 20,
              springX.get() * cloud.parallaxFactor - 20,
            ],
          }}
          transition={{
            duration: cloud.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 200 100"
            className="w-48 md:w-64 lg:w-80"
            style={{
              transform: `scale(${cloud.scale})`,
              opacity: cloud.opacity,
              filter: "blur(8px)",
            }}
          >
            <defs>
              <linearGradient id={`cloudGrad${cloud.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="60" rx="50" ry="30" fill={`url(#cloudGrad${cloud.id})`} />
            <ellipse cx="100" cy="50" rx="60" ry="35" fill={`url(#cloudGrad${cloud.id})`} />
            <ellipse cx="140" cy="60" rx="45" ry="28" fill={`url(#cloudGrad${cloud.id})`} />
            <ellipse cx="80" cy="70" rx="40" ry="25" fill={`url(#cloudGrad${cloud.id})`} />
            <ellipse cx="120" cy="65" rx="35" ry="22" fill={`url(#cloudGrad${cloud.id})`} />
          </svg>
        </motion.div>
      ))}

      {/* Mist layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/10 to-transparent dark:from-white/5"
        style={{
          x: springX,
          y: springY.get() * 0.1,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent"
        style={{
          x: springX.get() * 0.5,
        }}
      />
    </div>
  )
}
