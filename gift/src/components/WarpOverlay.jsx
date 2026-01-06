"use client"

import {
  animate,
  AnimatePresence,
  motion,
  useIsPresent,
  useMotionValue,
  useTransform,
} from "motion/react"
import { useEffect, useState } from "react"

export default function WarpOverlay({ open, message, onClose, intensity = 0.1 }) {
  // 1) Track window width/height directly
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", handleResize)
    // Initialize once
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 2) “deform” drives the 3D warp (we still play it on open)
  const deform = useMotionValue(0)
  const rotateX = useTransform(() => deform.get() * -5)
  const skewY = useTransform(() => deform.get() * -1.5)
  const scaleY = useTransform(() => 1 + deform.get() * intensity)
  const scaleX = useTransform(() => 1 - deform.get() * intensity * 0.6)

  useEffect(() => {
    if (open) {
      animate(deform, [0, 1, 0], {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      })
    }
  }, [open, deform])

  return (
    // 3) Fixed wrapper to cover entire viewport
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {open && (
          <>
            {/* ──── Gradient + Blur Circles ──── */}
            <GradientOverlay size={size} />

            {/* ──── Semi-Transparent Backdrop + Centered Message ──── */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.55, 0, 0.1, 1] }}
              style={{
                background: "rgba(245, 183, 177, 0.25)", // soft pink overlay
                backdropFilter: "blur(8px)",            // increased blur
              }}
              onClick={onClose}
            >
              {/* ─── Centered Content: Message + Cancel Button ─── */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center justify-center px-6 py-4 pointer-events-auto"
              >
                {/* ↓ Changed from text-4xl to text-2xl ↓ */}
                <motion.h2
                  className="text-2xl font-semibold text-white text-center mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  {message}
                </motion.h2>
                <button
                  onClick={onClose}
                  className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white font-medium px-5 py-2 rounded-full transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ──── (Optional) Warp-distort the entire viewport behind ──── */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          skewY,
          scaleY,
          scaleX,
          transformPerspective: 500,
          willChange: "transform",
        }}
      />

      {/* ──── Minimal CSS for blur circles, etc. ──── */}
      <StyleSheet />
    </div>
  )
}

// ───────── GradientOverlay now spans full window using “size” from window.innerWidth/innerHeight ─────────
function GradientOverlay({ size }) {
  const breathe = useMotionValue(0)
  const isPresent = useIsPresent()

  useEffect(() => {
    if (!isPresent) {
      animate(breathe, 0, { duration: 0.5, ease: "easeInOut" })
    }
    async function playBreathingAnimation() {
      await animate(breathe, 1, {
        duration: 0.5,
        delay: 0.35,
        ease: [0, 0.55, 0.45, 1],
      })
      animate(breathe, [null, 0.7, 1], {
        duration: 15,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      })
    }
    playBreathingAnimation()
  }, [isPresent, breathe])

  const enterDuration = 0.75
  const exitDuration = 0.5
  const expandingCircleRadius = size.width / 3

  return (
    <div className="absolute inset-0 overflow-hidden z-40">
      {/* Expanding “pink → purple” circle from bottom center */}
      <motion.div
        className="absolute"
        initial={{
          scale: 0,
          opacity: 0.5,
          backgroundColor: "rgb(245, 183, 177)", // soft pink
        }}
        animate={{
          scale: 12,
          opacity: 0.7,
          backgroundColor: "rgb(128, 90, 213)", // light purple
          transition: {
            duration: enterDuration,
            opacity: { duration: enterDuration, ease: "easeInOut" },
          },
        }}
        exit={{
          scale: 0,
          opacity: 1,
          backgroundColor: "rgb(245, 183, 177)",
          transition: { duration: exitDuration },
        }}
        style={{
          left: `calc(50% - ${expandingCircleRadius / 2}px)`,
          top: "100%",
          width: expandingCircleRadius,
          height: expandingCircleRadius,
          transformOrigin: "50% 100%",
          borderRadius: "50%",
          filter: "blur(150px)", // increased blur
          willChange: "transform",
        }}
      />

      {/* Top-left “breathing” circle */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.8,
          transition: { duration: enterDuration },
        }}
        exit={{
          opacity: 0,
          transition: { duration: exitDuration },
        }}
        style={{
          scale: breathe,
          width: size.width * 2,
          height: size.width * 2,
          top: -size.width,
          left: -size.width,
          borderRadius: "50%",
          filter: "blur(150px)", // increased blur
          backgroundColor: "rgba(245, 183, 177, 0.8)", // soft pink
          willChange: "transform",
        }}
      />

      {/* Bottom-right “breathing” circle */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.8,
          transition: { duration: enterDuration },
        }}
        exit={{
          opacity: 0,
          transition: { duration: exitDuration },
        }}
        style={{
          scale: breathe,
          width: size.width * 2,
          height: size.width * 2,
          top: size.height - size.width,
          left: 0,
          borderRadius: "50%",
          filter: "blur(150px)", // increased blur
          backgroundColor: "rgba(128, 90, 213, 0.8)", // light purple
          willChange: "transform",
        }}
      />
    </div>
  )
}

// ─────────────── Core CSS for blur circles & preventing scroll ───────────────
function StyleSheet() {
  return (
    <style>{`
      /* Prevent body scrolling when overlay is open */
      body {
        overflow: hidden;
      }

      .gradient-container,
      .expanding-circle,
      .gradient-circle {
        position: absolute;
      }
    `}</style>
  )
}
