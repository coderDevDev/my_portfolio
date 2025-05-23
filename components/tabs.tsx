"use client"

import type React from "react"

import Link from "next/link"
import { X } from "lucide-react"

interface Tab {
  id: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onCloseTab: (path: string) => void
}

export function Tabs({ tabs, activeTab, onCloseTab }: TabsProps) {
  if (tabs.length === 0) return null

  return (
    <div className="flex bg-[#252526] border-b border-[#3e3e3e] overflow-x-auto dark:bg-[#252526] light:bg-[#f8f8f8] light:border-[#e5e5e6]">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`flex items-center border-r border-[#3e3e3e] min-w-[150px] group relative ${
            activeTab === tab.id
              ? "bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-[#ffffff]"
              : "bg-[#2d2d2d] hover:bg-[#2a2d2e] dark:bg-[#2d2d2d] light:bg-[#ececec] light:hover:bg-[#e0e0e0]"
          }`}
        >
          <Link href={tab.path} className="flex items-center px-3 py-2 text-sm flex-1">
            <tab.icon className="w-4 h-4 mr-2" style={{ color: tab.color }} />
            <span className="truncate">{tab.id}</span>
          </Link>
          <button
            className="w-6 h-6 mr-1 opacity-0 group-hover:opacity-100 hover:bg-[#505050] rounded flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onCloseTab(tab.path)
            }}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
