"use client"

import React from "react"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: "fadeIn" | "slideUp" | "slideRight" | "slideLeft" | "slideDown" | "zoomIn" | "bounce" | "rotate"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function AnimateOnScroll({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, once])

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    bounce: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 15 } },
    },
    rotate: {
      initial: { opacity: 0, rotate: -5 },
      animate: { opacity: 1, rotate: 0 },
    },
  }

  const selectedAnimation = animations[animation]

  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.initial}
      animate={isVisible ? selectedAnimation.animate : selectedAnimation.initial}
      transition={selectedAnimation.transition || { duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimateLines({
  text,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
}: { text: string; delay?: number; duration?: number; threshold?: number }) {
  const lines = text.split(". ")

  return (
    <>
      {lines.map((line, index) => (
        <AnimateOnScroll
          key={index}
          animation="slideUp"
          delay={delay + index * 0.15}
          duration={duration}
          threshold={threshold}
          className="mb-2"
        >
          {line}
          {index < lines.length - 1 ? "." : ""}
        </AnimateOnScroll>
      ))}
    </>
  )
}

export function AnimateStagger({
  children,
  delay = 0.1,
  staggerDelay = 0.1,
  animation = "fadeIn",
  threshold = 0.1,
}: {
  children: ReactNode[]
  delay?: number
  staggerDelay?: number
  animation?: AnimateOnScrollProps["animation"]
  threshold?: number
}) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <AnimateOnScroll key={index} animation={animation} delay={delay + index * staggerDelay} threshold={threshold}>
          {child}
        </AnimateOnScroll>
      ))}
    </>
  )
}
