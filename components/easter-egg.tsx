"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Code } from "lucide-react"

export function EasterEgg() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.code].slice(-konamiCode.length)
      setKonamiSequence(newSequence)

      if (newSequence.join(",") === konamiCode.join(",")) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 5000)
        setKonamiSequence([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiSequence])

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg shadow-2xl max-w-sm"
        >
          <div className="text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block mb-3"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>

            <h3 className="text-lg font-bold mb-2">🎉 Easter Egg Found!</h3>
            <p className="text-sm mb-3">
              You discovered the secret! Thanks for exploring my portfolio with such attention to detail.
            </p>

            <div className="flex justify-center space-x-2">
              <Heart className="w-4 h-4 text-red-300" />
              <Code className="w-4 h-4 text-blue-300" />
              <Heart className="w-4 h-4 text-red-300" />
            </div>

            <p className="text-xs mt-2 opacity-80">- Dexter Miranda</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
