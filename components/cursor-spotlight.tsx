"use client"

import { useEffect, useRef } from "react"

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)

  const animate = () => {
    position.current.x += (targetPosition.current.x - position.current.x) * 0.25
    position.current.y += (targetPosition.current.y - position.current.y) * 0.25

    if (spotlightRef.current) {
      spotlightRef.current.style.transform = `translate3d(${position.current.x - 140}px, ${position.current.y - 140}px, 0)`
    }

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
    }

    animationFrameId.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    targetPosition.current = { x: e.clientX, y: e.clientY }
  }

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!hasHover || isTouchDevice || prefersReducedMotion) {
      return
    }

    animationFrameId.current = requestAnimationFrame(animate)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="print:hidden">
      <div
        ref={spotlightRef}
        className="fixed pointer-events-none z-[9998] w-[280px] h-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 179, 72, 0.4) 0%, rgba(245, 179, 72, 0.2) 30%, transparent 70%)",
          filter: "blur(45px)",
          willChange: "left, top",
          backfaceVisibility: "hidden",
        }}
        aria-hidden="true"
      />

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="-translate-x-[2px] -translate-y-[2px]"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        >
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
            fill="#ffffff"
            stroke="#0A1A2F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
