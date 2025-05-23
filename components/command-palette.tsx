"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Command, File, FileCode, FileText, Search } from "lucide-react"

interface CommandPaletteProps {
  onClose: () => void
}

export function CommandPalette({ onClose }: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const commands = [
    { id: 1, icon: Command, label: "Open Settings", shortcut: "Ctrl+,", action: () => {} },
    { id: 2, icon: Command, label: "Toggle Terminal", shortcut: "Ctrl+`", action: () => {} },
  ]

  const files = [
    { id: 3, icon: FileText, label: "README.md", action: () => router.push("/") },
    { id: 4, icon: FileCode, label: "projects.tsx", action: () => router.push("/projects") },
    { id: 5, icon: FileCode, label: "skills.tsx", action: () => router.push("/skills") },
    { id: 6, icon: FileCode, label: "contact.tsx", action: () => router.push("/contact") },
    { id: 7, icon: FileCode, label: "e-commerce.tsx", action: () => router.push("/projects/e-commerce") },
    { id: 8, icon: FileCode, label: "task-manager.tsx", action: () => router.push("/projects/task-manager") },
    { id: 9, icon: File, label: "resume.pdf", action: () => {} },
  ]

  const filteredCommands = commands.filter((cmd) => cmd.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredFiles = files.filter((file) => file.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const allItems = [...filteredCommands, ...filteredFiles]

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus()

    // Reset selected index when search term changes
    setSelectedIndex(0)
  }, [searchTerm])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % allItems.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action()
        onClose()
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-[20vh] z-50" onClick={onClose}>
      <div
        className="bg-[#252526] w-full max-w-xl rounded shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center p-3 border-b border-[#3e3e3e]">
          <Search className="w-5 h-5 mr-2 text-[#cccccc]" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type '>' for commands, or search files..."
            className="flex-1 bg-transparent border-none outline-none text-[#cccccc]"
            autoFocus
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {filteredCommands.length > 0 && (
            <>
              <div className="p-2 text-xs text-[#bbbbbb]">COMMANDS</div>
              <div className="space-y-1 p-1">
                {filteredCommands.map((cmd, index) => (
                  <div
                    key={cmd.id}
                    className={`flex items-center px-3 py-2 rounded cursor-pointer ${
                      selectedIndex === index ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"
                    }`}
                    onClick={() => {
                      cmd.action()
                      onClose()
                    }}
                  >
                    <cmd.icon className="w-4 h-4 mr-3 text-[#cccccc]" />
                    <span>{cmd.label}</span>
                    <span className="ml-auto text-xs text-[#bbbbbb]">{cmd.shortcut}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {filteredFiles.length > 0 && (
            <>
              <div className="p-2 text-xs text-[#bbbbbb]">FILES</div>
              <div className="space-y-1 p-1">
                {filteredFiles.map((file, index) => (
                  <div
                    key={file.id}
                    className={`flex items-center px-3 py-2 rounded cursor-pointer ${
                      selectedIndex === index + filteredCommands.length ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"
                    }`}
                    onClick={() => {
                      file.action()
                      onClose()
                    }}
                  >
                    <file.icon className="w-4 h-4 mr-3 text-[#cccccc]" />
                    <span>{file.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {allItems.length === 0 && (
            <div className="p-4 text-center text-[#bbbbbb]">No results found for "{searchTerm}"</div>
          )}
        </div>
      </div>
    </div>
  )
}
