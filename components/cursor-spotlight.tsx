"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const targetPosition = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const animate = useCallback(() => {
    setPosition((prev) => ({
      x: lerp(prev.x, targetPosition.current.x, 0.15),
      y: lerp(prev.y, targetPosition.current.y, 0.15),
    }))
    animationFrameId.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPosition.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!hasHover || isTouchDevice || prefersReducedMotion) {
      return
    }

    setIsVisible(true)
    animationFrameId.current = requestAnimationFrame(animate)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [animate, handleMouseMove, handleMouseEnter, handleMouseLeave])

  if (!isVisible) {
    return null
  }

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9998] w-[220px] h-[220px] rounded-full transition-opacity duration-300"
        style={{
          left: position.x - 110,
          top: position.y - 110,
          background:
            "radial-gradient(circle, rgba(245, 179, 72, 0.25) 0%, rgba(245, 179, 72, 0.15) 30%, rgba(245, 179, 72, 0.08) 50%, transparent 70%)",
          filter: "blur(20px)",
          willChange: "left, top",
        }}
        aria-hidden="true"
      />

      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          left: position.x,
          top: position.y,
          willChange: "left, top",
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
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
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
    </>
  )
}
