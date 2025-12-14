"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashainAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Check if we should show the animation (until Oct 8, 2025)
    const targetDate = new Date("2025-10-08")
    const currentDate = new Date()

    if (currentDate <= targetDate) {
      // Check if user has seen it today
      const today = currentDate.toDateString()
      const lastShown = localStorage.getItem("dashain-animation-shown")

      if (lastShown !== today) {
        setShouldShow(true)
        setIsVisible(true)
        localStorage.setItem("dashain-animation-shown", today)
      }
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!shouldShow) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotateY: -90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotateY: 90, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.8,
            }}
            className="relative max-w-md mx-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Bunting */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 overflow-hidden">
              <div className="flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    className="w-6 h-8 bg-gradient-to-b from-orange-500 to-red-500 transform rotate-45 -skew-x-12 border-r border-orange-600"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
                  />
                ))}
              </div>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-10 right-4 z-10 text-orange-700 hover:bg-orange-200"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Background Swings (Ping) */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 5}%`,
                  }}
                  animate={{
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {/* Swing Rope */}
                  <div className="w-0.5 h-20 bg-amber-800 mx-auto" />
                  {/* Swing Seat */}
                  <div className="w-8 h-2 bg-amber-700 rounded-full" />
                </motion.div>
              ))}
            </div>

            {/* Firecracker Animations */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 60 + 20}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                >
                  {/* Firecracker Burst */}
                  <div className="relative">
                    {Array.from({ length: 8 }).map((_, rayIndex) => (
                      <motion.div
                        key={rayIndex}
                        className="absolute w-1 h-6 bg-gradient-to-t from-transparent via-yellow-400 to-orange-500 rounded-full"
                        style={{
                          transformOrigin: "bottom center",
                          transform: `rotate(${rayIndex * 45}deg)`,
                        }}
                        animate={{
                          scaleY: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          delay: rayIndex * 0.05,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="relative p-8 pt-16 text-center">
              {/* Title */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-3xl font-bold text-orange-600 mb-2"
              >
                Happy
              </motion.h1>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-4xl font-bold text-orange-700 mb-4 tracking-wider"
              >
                VIJAYADASHAMI
              </motion.h2>

              {/* Circular Frame with Warrior */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="relative mx-auto w-48 h-48 mb-6"
              >
                {/* Decorative Border with Om Symbols */}
                <div className="absolute inset-0 rounded-full border-4 border-orange-300 bg-gradient-to-br from-orange-100 to-red-100">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-6 text-orange-500 text-sm flex items-center justify-center font-bold"
                      style={{
                        left: "50%",
                        top: "50%",
                        transformOrigin: "0 0",
                        transform: `rotate(${i * 30}deg) translate(85px, -12px)`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      ॐ
                    </motion.div>
                  ))}
                </div>

                {/* Warrior Silhouette */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center overflow-hidden">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-6xl"
                  >
                    🏹
                  </motion.div>
                </div>
              </motion.div>

              {/* Nepali Blessing */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-orange-700 mb-4"
              >
                <p className="text-lg font-semibold mb-2">विजया दशमी २०८२ को हार्दिक मंगलमय शुभकामना</p>
                <p className="text-sm">यो पावन अवसरले सबैका जीवनमा शान्ति, समृद्धि, स्वास्थ्य र दीर्घायु</p>
                <p className="text-sm">ल्याओस् भन्ने शुभकामना।</p>
              </motion.div>

              {/* Decorative Devanagari */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, type: "spring" }}
                className="text-2xl font-bold text-orange-600 mb-4"
              >
                श्री विजयादशमी
              </motion.div>

              {/* English Blessing */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-orange-600 text-sm mb-6"
              >
                May this auspicious festival bring joy, prosperity, and victory over all obstacles in your life!
              </motion.p>

              {/* Signature */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-orange-700 font-semibold"
              >
                Gaurav
              </motion.p>

              {/* Floating Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Glowing Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-orange-400"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(251, 146, 60, 0.5)",
                  "0 0 40px rgba(251, 146, 60, 0.8)",
                  "0 0 20px rgba(251, 146, 60, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
