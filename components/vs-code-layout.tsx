"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Explorer } from "@/components/explorer"
import { Tabs } from "@/components/tabs"
import { CommandPalette } from "@/components/command-palette"
import { LoadingScreen } from "@/components/loading-screen"
import { MoreHorizontal, X, Sun, Moon, FileText, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"

// Theme Context
const ThemeContext = createContext<{
  theme: "dark" | "light"
  toggleTheme: () => void
}>({
  theme: "dark",
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

// Tab interface
interface Tab {
  id: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export function VSCodeLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [tabs, setTabs] = useState<Tab[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Theme toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.className = theme
  }, [theme])

  // Tab management
  useEffect(() => {
    const tabConfig: Record<string, Tab> = {
      "/": { id: "README.md", path: "/", icon: FileText, color: "#cccccc" },
      "/projects": { id: "projects.tsx", path: "/projects", icon: FileCode, color: "#569cd6" },
      "/skills": { id: "skills.tsx", path: "/skills", icon: FileCode, color: "#569cd6" },
      "/contact": { id: "contact.tsx", path: "/contact", icon: FileCode, color: "#569cd6" },
    }

    // Handle project detail pages
    if (pathname.startsWith("/projects/")) {
      const projectId = pathname.split("/")[2]
      tabConfig[pathname] = {
        id: `${projectId}.tsx`,
        path: pathname,
        icon: FileCode,
        color: "#569cd6",
      }
    }

    const currentTab = tabConfig[pathname]
    if (currentTab && !tabs.find((tab) => tab.path === pathname)) {
      setTabs((prev) => [...prev, currentTab])
    }
  }, [pathname, tabs])

  // Close tab function
  const closeTab = (tabPath: string) => {
    setTabs((prev) => prev.filter((tab) => tab.path !== tabPath))

    // If closing the current tab, navigate to the last remaining tab or home
    if (tabPath === pathname) {
      const remainingTabs = tabs.filter((tab) => tab.path !== tabPath)
      if (remainingTabs.length > 0) {
        router.push(remainingTabs[remainingTabs.length - 1].path)
      } else {
        router.push("/")
      }
    }
  }

  // Get active tab
  const getActiveTab = () => {
    return tabs.find((tab) => tab.path === pathname)?.id || "README.md"
  }

  // Command palette handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault()
        setShowCommandPalette((prev) => !prev)
      } else if (e.key === "Escape" && showCommandPalette) {
        setShowCommandPalette(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showCommandPalette])

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <div
            key="main"
            className={`flex flex-col h-screen font-mono ${theme === "dark" ? "bg-[#1e1e1e] text-[#d4d4d4]" : "bg-[#f3f3f3] text-[#383a42]"}`}
          >
            {/* Title Bar */}
            <div
              className={`flex items-center justify-between px-4 py-2 text-[#cccccc] ${theme === "dark" ? "bg-[#323233]" : "bg-[#e5e5e6]"}`}
            >
              <div className="flex items-center space-x-4">
                <button
                  className="md:hidden p-1 hover:bg-[#505050] rounded"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  ☰
                </button>
                <span className="text-sm">File</span>
                <span className="text-sm hidden sm:inline">Edit</span>
                <span className="text-sm hidden sm:inline">View</span>
                <span className="text-sm hidden sm:inline">Go</span>
                <span className="text-sm hidden md:inline">Run</span>
                <span className="text-sm hidden md:inline">Terminal</span>
                <span className="text-sm hidden md:inline">Help</span>
              </div>
              <div className="text-sm font-semibold truncate">Developer Portfolio - Visual Studio Code</div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-1 hover:bg-[#505050]">
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <button className="hover:bg-[#505050] p-1 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <button className="hover:bg-[#505050] p-1 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              {(showSidebar || window.innerWidth >= 768) && (
                <Explorer activePath={pathname} onClose={() => setShowSidebar(false)} />
              )}

              {/* Main Content */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <Tabs tabs={tabs} activeTab={getActiveTab()} onCloseTab={closeTab} />
                {children}
              </div>
            </div>

            {/* Command Palette */}
            {showCommandPalette && <CommandPalette onClose={() => setShowCommandPalette(false)} />}
          </div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  )
}
