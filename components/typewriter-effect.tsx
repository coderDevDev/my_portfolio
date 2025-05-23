"use client"

import { useEffect, useState } from "react"

interface Word {
  text: string
  className?: string
}

export function TypewriterEffect({
  words,
  className = "",
  cursorClassName = "",
}: {
  words: Word[]
  className?: string
  cursorClassName?: string
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const word = words[currentWordIndex].text

    // Handle typing and deleting
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(word.substring(0, currentText.length + 1))

        // If word is complete, pause then start deleting
        if (currentText.length === word.length) {
          setTimeout(() => {
            setIsDeleting(true)
            setTypingSpeed(75) // Faster when deleting
          }, 1500)
        }
      } else {
        // Deleting
        setCurrentText(word.substring(0, currentText.length - 1))

        // If deletion is complete, move to next word
        if (currentText.length === 0) {
          setIsDeleting(false)
          setTypingSpeed(150) // Normal speed when typing
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words])

  return (
    <div className={`flex items-center text-2xl md:text-4xl font-bold ${className}`}>
      <div className="text-[#dcdcaa] dark:text-[#dcdcaa] light:text-[#a626a4]">{currentText}</div>
      <span
        className={`ml-1 inline-block h-6 w-[3px] bg-[#569cd6] dark:bg-[#569cd6] light:bg-[#4078f2] ${cursorClassName}`}
        style={{
          animation: "blink 1s infinite",
        }}
      />
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
