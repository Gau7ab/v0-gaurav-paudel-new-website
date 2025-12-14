"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface HeroProfileProps {
  imageSrc: string
  alt: string
}

export function HeroProfile({ imageSrc, alt }: HeroProfileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-40 h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(245,179,72,0.35) 0%,
              rgba(74,198,233,0.25) 30%,
              rgba(245,179,72,0.15) 60%,
              transparent 80%
            )
          `,
          filter: "blur(24px)",
          transform: "scale(1.6)",
        }}
        animate={{
          scale: [1.55, 1.65, 1.55],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(245,179,72,0.4) 0deg,
            rgba(74,198,233,0.3) 90deg,
            rgba(245,179,72,0.2) 180deg,
            rgba(74,198,233,0.4) 270deg,
            rgba(245,179,72,0.4) 360deg
          )`,
          filter: "blur(16px)",
          transform: "scale(1.25)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {[0, 90, 180, 270].map((angle, i) => (
        <motion.div
          key={`accent-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            background: "radial-gradient(circle, rgba(245,179,72,0.8), transparent)",
            transform: `rotate(${angle}deg) translateY(-${isHovered ? 90 : 85}px)`,
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-primary/80 via-secondary/60 to-primary/80">
          <div className="absolute inset-[2px] rounded-full p-[1px] bg-gradient-to-tl from-secondary/40 via-primary/30 to-secondary/40">
            <div className="w-full h-full rounded-full overflow-hidden bg-card/95 backdrop-blur-sm">
              {/* Profile image */}
              <div className="relative w-full h-full">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out"
                  style={{
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                  priority
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 176px, 192px"
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
                  animate={{
                    opacity: isHovered ? 0.3 : 0.15,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] pointer-events-none" />
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/50"
          style={{
            top: "50%",
            left: "50%",
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [Math.cos((i * Math.PI * 2) / 6) * 70, Math.cos((i * Math.PI * 2) / 6 + Math.PI * 2) * 70],
            y: [Math.sin((i * Math.PI * 2) / 6) * 70, Math.sin((i * Math.PI * 2) / 6 + Math.PI * 2) * 70],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  )
}
