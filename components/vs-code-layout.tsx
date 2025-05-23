'use client';

import type React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Explorer } from '@/components/explorer';
import { Tabs } from '@/components/tabs';
import { CommandPalette } from '@/components/command-palette';
import { LoadingScreen } from '@/components/loading-screen';
import { MoreHorizontal, X, Sun, Moon, FileText, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

// Theme Context
const ThemeContext = createContext<{
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

// Tab interface
interface Tab {
  id: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Menu item interface with developer insights
interface MenuItem {
  label: string;
  tooltip: string;
  action?: () => void;
  shortcut?: string;
}

export function VSCodeLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Developer menu items with meaningful tooltips
  const menuItems: MenuItem[] = [
    {
      label: 'File',
      tooltip:
        '💡 Dev Lesson: File management is the foundation of any project. Like organizing your codebase, a well-structured file system leads to better productivity and fewer bugs.',
      shortcut: 'Alt+F'
    },
    {
      label: 'Edit',
      tooltip:
        '✏️ Dev Wisdom: Great code is rewritten, not just written. Every edit is an opportunity to improve readability, performance, and maintainability.',
      shortcut: 'Alt+E'
    },
    {
      label: 'View',
      tooltip:
        '👁️ Perspective Matters: Different views reveal different insights. In development, switching between code, design, and user perspectives leads to better solutions.',
      shortcut: 'Alt+V'
    },
    {
      label: 'Go',
      tooltip:
        "🚀 Navigation is Key: Quick navigation saves hours. Master your shortcuts, use jump-to-definition, and always know where you're going in your codebase.",
      shortcut: 'Alt+G'
    },
    {
      label: 'Run',
      tooltip:
        "⚡ Execution Excellence: Code that doesn't run is just text. Testing early and often prevents late-night debugging sessions.",
      shortcut: 'Alt+R'
    },
    {
      label: 'Terminal',
      tooltip:
        "💻 Command Line Mastery: The terminal is a developer's best friend. It's where the magic happens - from git commits to deployment scripts.",
      shortcut: 'Alt+T'
    },
    {
      label: 'Help',
      tooltip:
        '🤝 Never Stop Learning: Even senior developers need help. Documentation, Stack Overflow, and asking questions are signs of wisdom, not weakness.',
      shortcut: 'Alt+H'
    }
  ];

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Tab management
  useEffect(() => {
    const tabConfig: Record<string, Tab> = {
      '/': { id: 'README.md', path: '/', icon: FileText, color: '#cccccc' },
      '/projects': {
        id: 'projects.tsx',
        path: '/projects',
        icon: FileCode,
        color: '#569cd6'
      },
      '/skills': {
        id: 'skills.tsx',
        path: '/skills',
        icon: FileCode,
        color: '#569cd6'
      },
      '/contact': {
        id: 'contact.tsx',
        path: '/contact',
        icon: FileCode,
        color: '#569cd6'
      },
      '/resume': {
        id: 'resume.pdf',
        path: '/resume',
        icon: FileText,
        color: '#f14c4c'
      }
    };

    // Handle project detail pages
    if (pathname.startsWith('/projects/')) {
      const projectId = pathname.split('/')[2];
      tabConfig[pathname] = {
        id: `${projectId}.tsx`,
        path: pathname,
        icon: FileCode,
        color: '#569cd6'
      };
    }

    const currentTab = tabConfig[pathname];
    if (currentTab && !tabs.find(tab => tab.path === pathname)) {
      setTabs(prev => [...prev, currentTab]);
    }
  }, [pathname, tabs]);

  // Close tab function
  const closeTab = (tabPath: string) => {
    setTabs(prev => prev.filter(tab => tab.path !== tabPath));
    if (pathname === tabPath) {
      const remainingTabs = tabs.filter(tab => tab.path !== tabPath);
      if (remainingTabs.length > 0) {
        router.push(remainingTabs[remainingTabs.length - 1].path);
      } else {
        router.push('/');
      }
    }
  };

  // Get active tab
  const getActiveTab = () => {
    return tabs.find(tab => tab.path === pathname)?.id || '';
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      } else if (e.key === 'Escape' && showCommandPalette) {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette]);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  //

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TooltipProvider delayDuration={300}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
          ) : (
            <div
              key="main"
              className={`flex flex-col h-screen font-mono ${
                theme === 'dark'
                  ? 'bg-[#1e1e1e] text-[#d4d4d4]'
                  : 'bg-[#f3f3f3] text-[#383a42]'
              }`}>
              {/* Title Bar */}
              <div
                className={`flex items-center justify-between px-4 py-2 text-[#cccccc] ${
                  theme === 'dark' ? 'bg-[#323233]' : 'bg-[#e5e5e6]'
                }`}>
                <div className="flex items-center space-x-4">
                  <button
                    className="md:hidden p-1 hover:bg-[#505050] rounded"
                    onClick={() => setShowSidebar(!showSidebar)}>
                    ☰
                  </button>

                  {/* Menu items with tooltips */}
                  {menuItems.map((item, index) => (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>
                        <button
                          className={`text-sm hover:bg-[#505050] px-2 py-1 rounded transition-colors ${
                            index > 1 ? 'hidden sm:inline-block' : ''
                          } ${index > 3 ? 'hidden md:inline-block' : ''}`}
                          onClick={item.action}>
                          {item.label}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="max-w-xs bg-[#2d2d30] border-[#454545] text-[#cccccc] p-3">
                        <div className="space-y-2">
                          <p className="text-sm leading-relaxed">
                            {item.tooltip}
                          </p>
                          {item.shortcut && (
                            <div className="flex items-center gap-2 text-xs opacity-70">
                              <span>Shortcut:</span>
                              <kbd className="px-1.5 py-0.5 bg-[#3c3c3c] rounded text-xs">
                                {item.shortcut}
                              </kbd>
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <div className="text-sm font-semibold truncate">
                  Developer Portfolio - Visual Studio Code
                </div>

                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="p-1 hover:bg-[#505050]">
                        {theme === 'dark' ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <div className="space-y-1">
                        <p className="text-sm">
                          🌓 Switch to {theme === 'dark' ? 'Light' : 'Dark'}{' '}
                          Theme
                        </p>
                        <p className="text-xs opacity-70">
                          Good developers adapt to any environment
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="hover:bg-[#505050] p-1 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">⚙️ More Options</p>
                      <p className="text-xs opacity-70">
                        Customization is key to productivity
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="hover:bg-[#505050] p-1 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">❌ Close Window</p>
                      <p className="text-xs opacity-70">
                        Always save your work first!
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {(showSidebar || window.innerWidth >= 768) && (
                  <Explorer
                    activePath={pathname}
                    onClose={() => setShowSidebar(false)}
                  />
                )}

                {/* Main Content */}
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Tabs
                    tabs={tabs}
                    activeTab={getActiveTab()}
                    onCloseTab={closeTab}
                  />
                  {children}
                </div>
              </div>

              {/* Command Palette */}
              {showCommandPalette && (
                <CommandPalette onClose={() => setShowCommandPalette(false)} />
              )}
            </div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </ThemeContext.Provider>
  );
}
