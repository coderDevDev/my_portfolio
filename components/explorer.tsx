'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/vs-code-layout';
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
  X
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ExplorerProps {
  activePath: string;
  onClose: () => void;
}

export function Explorer({ activePath, onClose }: ExplorerProps) {
  const { theme } = useTheme();
  const [openFolders, setOpenFolders] = useState({
    portfolio: true,
    about: true,
    projects: true,
    skills: false,
    contact: false
  });
  const pathname = usePathname();

  useEffect(() => {
    // Update open folders based on path changes
    setOpenFolders(prev => ({
      ...prev,
      projects: activePath.startsWith('/projects'),
      skills: activePath.startsWith('/skills'),
      contact: activePath.startsWith('/contact')
    }));
  }, [activePath]);

  const toggleFolder = (folder: keyof typeof openFolders) => {
    setOpenFolders({
      ...openFolders,
      [folder]: !openFolders[folder]
    });
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const sidebarBg = theme === 'dark' ? 'bg-[#252526]' : 'bg-[#f3f3f3]';
  const hoverBg =
    theme === 'dark' ? 'hover:bg-[#2a2d2e]' : 'hover:bg-[#e8e8e9]';
  const activeBg = theme === 'dark' ? 'bg-[#37373d]' : 'bg-[#e4e6f1]';
  const borderColor =
    theme === 'dark' ? 'border-[#3e3e3e]' : 'border-[#e5e5e6]';
  const textColor = theme === 'dark' ? 'text-[#cccccc]' : 'text-[#383a42]';

  // Developer insights for different file types and folders
  const developerInsights = {
    portfolio:
      '🚀 Root Directory: The foundation of every project. Keep it clean and organized!',
    about:
      '📖 About Section: Tell your story. Developers are humans too, show your personality!',
    projects:
      '💼 Projects Folder: Your digital portfolio. Each project should solve a real problem.',
    skills:
      '🛠️ Skills Inventory: Technology changes fast. Keep learning, keep growing.',
    contact:
      '🤝 Networking: Great developers build great relationships. Stay connected!',
    readme: '📝 README.md: The first impression of your code. Make it count!',
    resume:
      '📄 Resume: Your professional story in one page. Keep it updated and relevant.',
    typescript:
      '🔷 TypeScript: Type safety prevents runtime errors. Embrace the compiler!',
    javascript:
      "⚡ JavaScript: The language of the web. Master async/await and you'll go far.",
    react:
      '⚛️ React: Component thinking changes everything. Think in reusable pieces.',
    config:
      '⚙️ Configuration: The backbone of any project. Document your setup well!'
  };

  return (
    <TooltipProvider delayDuration={500}>
      <div
        className={`w-64 ${sidebarBg} ${borderColor} border-r flex flex-col h-full ${textColor}`}>
        {/* Header */}
        <div
          className={`flex items-center justify-between p-3 ${borderColor} border-b`}>
          <span className="text-sm font-medium">EXPLORER</span>
          <button
            onClick={onClose}
            className={`md:hidden p-1 ${hoverBg} rounded`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-auto p-2">
          {/* Portfolio Root */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex items-center py-1 px-2 rounded cursor-pointer ${hoverBg}`}
                onClick={() => toggleFolder('portfolio')}>
                {openFolders.portfolio ? (
                  <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
                ) : (
                  <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
                )}
                <span className="text-sm font-medium">PORTFOLIO</span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
              <p className="text-sm">{developerInsights.portfolio}</p>
            </TooltipContent>
          </Tooltip>

          {openFolders.portfolio && (
            <div className="ml-4 mt-1 space-y-1">
              {/* About Folder */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center py-1 px-2 rounded cursor-pointer ${hoverBg}`}
                    onClick={() => toggleFolder('about')}>
                    <ChevronRight
                      className={`w-3 h-3 mr-1 transition-transform ${
                        openFolders.about ? 'rotate-90' : ''
                      }`}
                    />
                    {openFolders.about ? (
                      <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
                    ) : (
                      <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
                    )}
                    <span className="text-sm">about</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                  <p className="text-sm">{developerInsights.about}</p>
                </TooltipContent>
              </Tooltip>

              {openFolders.about && (
                <div className="ml-6 mt-1 space-y-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/"
                        className={`flex items-center px-2 py-1 rounded ${
                          isActive('/') ? activeBg : hoverBg
                        }`}>
                        <FileText className="w-4 h-4 mr-2 text-[#cccccc]" />
                        <span>README.md</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">{developerInsights.readme}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/resume"
                        className={`flex items-center px-2 py-1 rounded ${
                          isActive('/resume') ? activeBg : hoverBg
                        }`}>
                        <FileText className="w-4 h-4 mr-2 text-[#f14c4c]" />
                        <span>resume.pdf</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">{developerInsights.resume}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {/* Projects Folder */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center py-1 px-2 rounded cursor-pointer ${hoverBg}`}
                    onClick={() => toggleFolder('projects')}>
                    <ChevronRight
                      className={`w-3 h-3 mr-1 transition-transform ${
                        openFolders.projects ? 'rotate-90' : ''
                      }`}
                    />
                    {openFolders.projects ? (
                      <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
                    ) : (
                      <FolderClosed className="w-4 h-4 mr-2 text-[#dcb67a]" />
                    )}
                    <span className="text-sm">projects</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                  <p className="text-sm">{developerInsights.projects}</p>
                </TooltipContent>
              </Tooltip>

              {openFolders.projects && (
                <div className="ml-6 mt-1 space-y-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/projects"
                        className={`flex items-center px-2 py-1 rounded ${
                          isActive('/projects') ? activeBg : hoverBg
                        }`}>
                        <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                        <span>index.tsx</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">{developerInsights.react}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/projects/efurnish"
                        className={`flex items-center px-2 py-1 rounded ${
                          isActive('/projects/efurnish') ? activeBg : hoverBg
                        }`}>
                        <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                        <span>efurnish.tsx</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">
                        🛋️ E-commerce Platform: Building user-friendly shopping
                        experiences
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/projects/intern-trail"
                        className={`flex items-center px-2 py-1 rounded ${
                          isActive('/projects/intern-trail')
                            ? activeBg
                            : hoverBg
                        }`}>
                        <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                        <span>intern-trail.tsx</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">
                        🎯 Career Platform: Connecting talent with opportunities
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/projects/stay-well"
                        className={`flex items-center px-2 py-1 rounded ${
                          isActive('/projects/stay-well') ? activeBg : hoverBg
                        }`}>
                        <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                        <span>stay-well.tsx</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                      <p className="text-sm">
                        🏥 Healthcare App: Technology improving lives
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {/* Skills File */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/skills"
                    className={`flex items-center px-2 py-1 rounded ${
                      isActive('/skills') ? activeBg : hoverBg
                    }`}>
                    <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                    <span>skills.tsx</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                  <p className="text-sm">{developerInsights.skills}</p>
                </TooltipContent>
              </Tooltip>

              {/* Contact File */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/contact"
                    className={`flex items-center px-2 py-1 rounded ${
                      isActive('/contact') ? activeBg : hoverBg
                    }`}>
                    <FileCode className="w-4 h-4 mr-2 text-[#569cd6]" />
                    <span>contact.tsx</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                  <p className="text-sm">{developerInsights.contact}</p>
                </TooltipContent>
              </Tooltip>

              {/* Config Files */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center px-2 py-1 rounded opacity-60">
                    <FileCog className="w-4 h-4 mr-2 text-[#6d8086]" />
                    <span>package.json</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                  <p className="text-sm">{developerInsights.config}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Bottom Icons */}
        <div
          className={`absolute bottom-0 left-0 w-full border-t ${borderColor} ${sidebarBg}`}>
          <div className="flex justify-around py-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className={`p-2 ${hoverBg} rounded`}>
                  <Settings className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                <p className="text-sm">
                  ⚙️ Settings: Customize your development environment
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className={`p-2 ${hoverBg} rounded`}>
                  <Terminal className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                <p className="text-sm">
                  💻 Terminal: Where developers feel most at home
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className={`p-2 ${hoverBg} rounded`}>
                  <Github className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#2d2d30] border-[#454545] text-[#cccccc]">
                <p className="text-sm">
                  🐙 GitHub: Your code's home. Commit often, push regularly!
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
