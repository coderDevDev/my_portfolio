"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Mail, Github, Linkedin, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:dexter.miranda@example.com",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/dextermiranda",
      color: "bg-gray-700 hover:bg-gray-800",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/dextermiranda",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+1234567890",
      color: "bg-green-500 hover:bg-green-600",
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 left-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { delay: index * 0.1 },
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                  scale: 0.8,
                  transition: { delay: (actions.length - index) * 0.05 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="sm" className={`${action.color} text-white shadow-lg group relative`}>
                  <a href={action.href} target="_blank" rel="noopener noreferrer">
                    <action.icon className="w-4 h-4" />
                    <span className="absolute right-full mr-3 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {action.label}
                    </span>
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-colors ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        }`}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </div>
  )
}
