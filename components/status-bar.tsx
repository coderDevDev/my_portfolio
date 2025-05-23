"use client"

import { usePathname } from "next/navigation"
import { BellDot, GitBranch, GitCommit, GitMerge, Wifi } from "lucide-react"
import { useTheme } from "@/components/vs-code-layout"

export function StatusBar() {
  const pathname = usePathname()
  const { theme } = useTheme()

  // Get current section based on pathname
  const getCurrentSection = () => {
    if (pathname === "/") return "Home"
    if (pathname.startsWith("/projects")) return "Projects"
    if (pathname.startsWith("/skills")) return "Skills"
    if (pathname.startsWith("/contact")) return "Contact"
    return "Portfolio"
  }

  return (
    <div
      className={`flex items-center justify-between px-3 py-1 text-xs text-white ${theme === "dark" ? "bg-[#007acc]" : "bg-[#0078d7]"}`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <GitBranch className="w-3.5 h-3.5 mr-1" />
          <span>main</span>
        </div>
        <div className="flex items-center">
          <GitCommit className="w-3.5 h-3.5 mr-1" />
          <span>0 ↓</span>
        </div>
        <div className="flex items-center">
          <GitMerge className="w-3.5 h-3.5 mr-1" />
          <span>0 ↑</span>
        </div>
      </div>

      <div className="hidden sm:block">{getCurrentSection()}</div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:block">Ln 42, Col 18</div>
        <div className="hidden md:block">Spaces: 2</div>
        <div className="hidden sm:block">UTF-8</div>
        <div className="flex items-center">
          <Wifi className="w-3.5 h-3.5 mr-1" />
          <span className="hidden sm:inline">Connected</span>
        </div>
        <div className="flex items-center">
          <BellDot className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  )
}
