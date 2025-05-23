"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/vs-code-layout"
import {
  ChevronRight,
  Code,
  FileCode,
  FileCog,
  FileText,
  FolderClosed,
  FolderOpen,
  Github,
  Mail,
  Settings,
  Terminal,
  X,
} from "lucide-react"

interface ExplorerProps {
  activePath: string
  onClose: () => void
}

export function Explorer({ activePath, onClose }: ExplorerProps) {
  const { theme } = useTheme()
  const [openFolders, setOpenFolders] = useState({
    about: true,
    projects: activePath.startsWith("/projects"),
    skills: activePath.startsWith("/skills"),
    contact: activePath.startsWith("/contact"),
  })
  const pathname = usePathname()

  useEffect(() => {
    // Update open folders based on path changes
    setOpenFolders((prev) => ({
      ...prev,
      projects: activePath.startsWith("/projects"),
      skills: activePath.startsWith("/skills"),
      contact: activePath.startsWith("/contact"),
    }))
  }, [activePath])

  const toggleFolder = (folder: keyof typeof openFolders) => {
    setOpenFolders({
      ...openFolders,
      [folder]: !openFolders[folder],
    })
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const sidebarBg = theme === "dark" ? "bg-[#252526]" : "bg-[#f8f8f8]"
  const hoverBg = theme === "dark" ? "hover:bg-[#2a2d2e]" : "hover:bg-[#e0e0e0]"
  const activeBg = theme === "dark" ? "bg-[#37373d]" : "bg-[#e0e0e0]"
  const borderColor = theme === "dark" ? "border-[#3e3e3e]" : "border-[#e5e5e6]"

  return (
    <div
      className={`w-64 border-r ${borderColor} overflow-y-auto ${sidebarBg} relative md:static fixed top-0 left-0 h-full z-10`}
    >
      <div className="flex items-center justify-between p-2 text-sm uppercase font-semibold text-[#bbbbbb]">
        <span>Explorer</span>
        <button className={`md:hidden p-1 ${hoverBg} rounded`} onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-2 py-1">
        <div className="text-sm text-[#bbbbbb] mb-1">PORTFOLIO</div>

        {/* About Section */}
        <div>
          <button
            className={`flex items-center w-full text-left px-2 py-1 ${hoverBg} rounded`}
            onClick={() => toggleFolder("about")}
          >
            <ChevronRight className={`w-4 h-4 mr-1 transition-transform ${openFolders.about ? "rotate-90" : ""}`} />
            {openFolders.about ? (
              <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
            ) : (
              <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
            )}
            <span>About</span>
          </button>

          {openFolders.about && (
            <div className="ml-6 mt-1 space-y-1">
              <Link href="/" className={`flex items-center px-2 py-1 rounded ${isActive("/") ? activeBg : hoverBg}`}>
                <FileText className="w-4 h-4 mr-2 text-[#cccccc]" />
                <span>README.md</span>
              </Link>
              <Link href="#" className={`flex items-center px-2 py-1 rounded ${hoverBg}`}>
                <FileText className="w-4 h-4 mr-2 text-[#cccccc]" />
                <span>resume.pdf</span>
              </Link>
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div>
          <button
            className={`flex items-center w-full text-left px-2 py-1 ${hoverBg} rounded`}
            onClick={() => toggleFolder("projects")}
          >
            <ChevronRight className={`w-4 h-4 mr-1 transition-transform ${openFolders.projects ? "rotate-90" : ""}`} />
            {openFolders.projects ? (
              <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
            ) : (
              <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
            )}
            <span>Projects</span>
          </button>

          {openFolders.projects && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                href="/projects"
                className={`flex items-center px-2 py-1 rounded ${pathname === "/projects" ? activeBg : hoverBg}`}
              >
                <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                <span>projects.tsx</span>
              </Link>
              <Link
                href="/projects/e-commerce"
                className={`flex items-center px-2 py-1 rounded ${
                  pathname === "/projects/e-commerce" ? activeBg : hoverBg
                }`}
              >
                <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                <span>e-commerce.tsx</span>
              </Link>
              <Link
                href="/projects/task-manager"
                className={`flex items-center px-2 py-1 rounded ${
                  pathname === "/projects/task-manager" ? activeBg : hoverBg
                }`}
              >
                <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                <span>task-manager.tsx</span>
              </Link>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <button
            className={`flex items-center w-full text-left px-2 py-1 ${hoverBg} rounded`}
            onClick={() => toggleFolder("skills")}
          >
            <ChevronRight className={`w-4 h-4 mr-1 transition-transform ${openFolders.skills ? "rotate-90" : ""}`} />
            {openFolders.skills ? (
              <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
            ) : (
              <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
            )}
            <span>Skills</span>
          </button>

          {openFolders.skills && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                href="/skills"
                className={`flex items-center px-2 py-1 rounded ${pathname === "/skills" ? activeBg : hoverBg}`}
              >
                <Code className="w-4 h-4 mr-2 text-[#ce9178]" />
                <span>skills.tsx</span>
              </Link>
              <Link href="/skills#frontend" className={`flex items-center px-2 py-1 rounded ${hoverBg}`}>
                <Code className="w-4 h-4 mr-2 text-[#ce9178]" />
                <span>frontend.js</span>
              </Link>
              <Link href="/skills#backend" className={`flex items-center px-2 py-1 rounded ${hoverBg}`}>
                <Code className="w-4 h-4 mr-2 text-[#339933]" />
                <span>backend.js</span>
              </Link>
              <Link href="/skills#tools" className={`flex items-center px-2 py-1 rounded ${hoverBg}`}>
                <FileCog className="w-4 h-4 mr-2 text-[#cccccc]" />
                <span>tools.json</span>
              </Link>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div>
          <button
            className={`flex items-center w-full text-left px-2 py-1 ${hoverBg} rounded`}
            onClick={() => toggleFolder("contact")}
          >
            <ChevronRight className={`w-4 h-4 mr-1 transition-transform ${openFolders.contact ? "rotate-90" : ""}`} />
            {openFolders.contact ? (
              <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
            ) : (
              <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
            )}
            <span>Contact</span>
          </button>

          {openFolders.contact && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                href="/contact"
                className={`flex items-center px-2 py-1 rounded ${pathname === "/contact" ? activeBg : hoverBg}`}
              >
                <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                <span>contact.tsx</span>
              </Link>
              <Link href="/contact#email" className={`flex items-center px-2 py-1 rounded ${hoverBg}`}>
                <Mail className="w-4 h-4 mr-2 text-[#cccccc]" />
                <span>email.md</span>
              </Link>
              <Link href="/contact#social" className={`flex items-center px-2 py-1 rounded ${hoverBg}`}>
                <Github className="w-4 h-4 mr-2 text-[#cccccc]" />
                <span>social.md</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Icons */}
      <div className={`absolute bottom-0 left-0 w-full border-t ${borderColor} ${sidebarBg}`}>
        <div className="flex justify-around py-2">
          <button className={`p-2 ${hoverBg} rounded`}>
            <Settings className="w-5 h-5" />
          </button>
          <button className={`p-2 ${hoverBg} rounded`}>
            <Terminal className="w-5 h-5" />
          </button>
          <button className={`p-2 ${hoverBg} rounded`}>
            <Github className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
