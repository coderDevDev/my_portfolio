import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  Code,
  Download,
  FileCode,
  Github,
  Linkedin,
  Mail,
  User
} from 'lucide-react';
import { StatusBar } from '@/components/status-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Hero3D } from '@/components/hero-3d';
import { TypewriterEffect } from '@/components/typewriter-effect';
import { getFeaturedProjects } from '@/lib/projects-data';

export default function Home() {
  const words = [
    { text: 'Build.' },
    { text: 'Design.' },
    { text: 'Develop.' },
    { text: 'Deploy.' },
    { text: 'Innovate.' }
  ];

  // Get featured projects for the home page
  const featuredProjects = getFeaturedProjects(3);

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono overflow-hidden dark:bg-[#1e1e1e] dark:text-[#d4d4d4] light:bg-[#f3f3f3] light:text-[#383a42]">
      <div className="flex-1 overflow-auto">
        {/* 3D Hero Section */}
        <div className="relative">
          <Hero3D />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-b from-transparent via-transparent to-[#1e1e1e] dark:to-[#1e1e1e] light:to-[#f3f3f3]">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2] mb-4 drop-shadow-lg">
                Dexter Miranda
              </h1>
              <div className="h-16">
                <TypewriterEffect words={words} />
              </div>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 mb-8 bg-[#1e1e1e]/70 dark:bg-[#1e1e1e]/70 light:bg-[#f3f3f3]/70 p-4 rounded-lg backdrop-blur-sm">
                Full Stack Developer specializing in creating elegant solutions
                with modern web technologies.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#007acc] hover:bg-[#007acc]/80">
                  <Link href="/projects">
                    View My Work <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                  <Link href="/contact">
                    <Mail className="mr-2 h-5 w-5" /> Contact Me
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6 md:p-8">
          {/* About Section */}
          <section className="mb-16 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc] flex items-center">
                <User className="mr-2 h-6 w-6" /> About Me
              </h2>
              <Button
                asChild
                variant="outline"
                className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                <Link href="#">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </div>

            <Card className="bg-[#252526] border-[#3e3e3e] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-lg mb-4 text-white">
                      I'm a passionate Full Stack Developer with 5+ years of
                      experience building scalable web applications. I
                      specialize in React, Next.js, and Node.js, with a strong
                      focus on creating user-centered solutions that drive
                      business growth.
                    </p>
                    <p className="mb-4 text-white">
                      My expertise spans from frontend development with modern
                      frameworks to backend architecture and database design.
                      I'm committed to writing clean, maintainable code and
                      staying up-to-date with the latest industry trends and
                      best practices.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#2d2d2d] text-[#4ec9b0] hover:bg-[#2d2d2d]/80">
                        5+ Years Experience
                      </Badge>
                      <Badge className="bg-[#2d2d2d] text-[#569cd6] hover:bg-[#2d2d2d]/80">
                        50+ Projects
                      </Badge>
                      <Badge className="bg-[#2d2d2d] text-[#ce9178] hover:bg-[#2d2d2d]/80">
                        Remote Ready
                      </Badge>
                    </div>
                  </div>
                  <div className="relative w-full h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image
                      src="https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others//DEX.JPG"
                      alt="Dexter Miranda"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Featured Projects */}
          <section className="mb-16 animate-fadeIn animation-delay-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc] flex items-center">
                <FileCode className="mr-2 h-6 w-6" /> Featured Projects
              </h2>
              <Button
                asChild
                variant="link"
                className="text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2]">
                <Link href="/projects">
                  View all projects <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <Card
                  key={project.id}
                  className="bg-[#252526] border-[#3e3e3e] hover:border-[#007acc] transition-all duration-300 hover:translate-y-[-5px] overflow-hidden group dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6] light:hover:border-[#007acc]">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#252526] to-transparent opacity-80 dark:from-[#252526] light:from-[#ffffff]"></div>
                    <Badge className="absolute top-3 right-3 bg-[#007acc]">
                      Featured
                    </Badge>
                    <Badge className="absolute top-3 left-3 bg-[#2d2d2d] text-[#4ec9b0] capitalize">
                      {project.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#dcdcaa] dark:text-[#dcdcaa] light:text-[#a626a4]">
                        {project.title}
                      </h3>
                      <span className="text-sm opacity-70">{project.year}</span>
                    </div>
                    <p className="text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <Badge
                          key={tag}
                          className="bg-[#2d2d2d] text-[#569cd6] hover:bg-[#2d2d2d]/80">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge className="bg-[#2d2d2d] text-[#569cd6] hover:bg-[#2d2d2d]/80">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#007acc] hover:bg-[#007acc]/80">
                        <Link href={project.demoUrl}>
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer">
                          <Github className="mr-1 h-4 w-4" /> Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16 animate-fadeIn animation-delay-600">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc] flex items-center">
                <Activity className="mr-2 h-6 w-6" /> Skills & Technologies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend Skills */}
              <Card className="bg-[#252526] border-[#3e3e3e] hover:border-[#007acc] transition-all duration-300 hover:translate-y-[-5px] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6] light:hover:border-[#007acc]">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-[#dcdcaa] dark:text-[#dcdcaa] light:text-[#a626a4] mb-3">
                    Frontend
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">React/Next.js</span>
                        <span className="text-sm text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2]">
                          95%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#569cd6] rounded-full dark:bg-[#569cd6] light:bg-[#4078f2] transition-all duration-1000"
                          style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">TypeScript</span>
                        <span className="text-sm text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2]">
                          90%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#569cd6] rounded-full dark:bg-[#569cd6] light:bg-[#4078f2] transition-all duration-1000"
                          style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Tailwind CSS</span>
                        <span className="text-sm text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2]">
                          85%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#569cd6] rounded-full dark:bg-[#569cd6] light:bg-[#4078f2] transition-all duration-1000"
                          style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backend Skills */}
              <Card className="bg-[#252526] border-[#3e3e3e] hover:border-[#007acc] transition-all duration-300 hover:translate-y-[-5px] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6] light:hover:border-[#007acc]">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-[#dcdcaa] dark:text-[#dcdcaa] light:text-[#a626a4] mb-3">
                    Backend
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Node.js</span>
                        <span className="text-sm text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc]">
                          90%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#4ec9b0] rounded-full dark:bg-[#4ec9b0] light:bg-[#0184bc] transition-all duration-1000"
                          style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Express</span>
                        <span className="text-sm text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc]">
                          85%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#4ec9b0] rounded-full dark:bg-[#4ec9b0] light:bg-[#0184bc] transition-all duration-1000"
                          style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">MongoDB</span>
                        <span className="text-sm text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc]">
                          80%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#4ec9b0] rounded-full dark:bg-[#4ec9b0] light:bg-[#0184bc] transition-all duration-1000"
                          style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tools & DevOps */}
              <Card className="bg-[#252526] border-[#3e3e3e] hover:border-[#007acc] transition-all duration-300 hover:translate-y-[-5px] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6] light:hover:border-[#007acc]">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-[#dcdcaa] dark:text-[#dcdcaa] light:text-[#a626a4] mb-3">
                    Tools & DevOps
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Git</span>
                        <span className="text-sm text-[#ce9178] dark:text-[#ce9178] light:text-[#e45649]">
                          95%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#ce9178] rounded-full dark:bg-[#ce9178] light:bg-[#e45649] transition-all duration-1000"
                          style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Docker</span>
                        <span className="text-sm text-[#ce9178] dark:text-[#ce9178] light:text-[#e45649]">
                          75%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#ce9178] rounded-full dark:bg-[#ce9178] light:bg-[#e45649] transition-all duration-1000"
                          style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">CI/CD</span>
                        <span className="text-sm text-[#ce9178] dark:text-[#ce9178] light:text-[#e45649]">
                          80%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden dark:bg-[#2d2d2d] light:bg-[#f5f5f5]">
                        <div
                          className="h-full bg-[#ce9178] rounded-full dark:bg-[#ce9178] light:bg-[#e45649] transition-all duration-1000"
                          style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Preview */}
          <section className="mb-8 animate-fadeIn animation-delay-900">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#4ec9b0] dark:text-[#4ec9b0] light:text-[#0184bc] flex items-center">
                <User className="mr-2 h-6 w-6" /> Get In Touch
              </h2>
              <Button
                asChild
                variant="link"
                className="text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2]">
                <Link href="/contact">
                  Contact me <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Card className="bg-[#252526] border-[#3e3e3e] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    href="mailto:dexter.miranda@example.com"
                    className="flex flex-col items-center p-4 bg-[#2d2d2d] rounded-lg hover:bg-[#3e3e3e] transition-colors dark:bg-[#2d2d2d] dark:hover:bg-[#3e3e3e] light:bg-[#f5f5f5] light:hover:bg-[#e0e0e0]">
                    <Mail className="h-10 w-10 text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2] mb-3" />
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-sm text-center">
                      dexter.miranda@example.com
                    </p>
                  </Link>

                  <a
                    href="https://github.com/dextermiranda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-[#2d2d2d] rounded-lg hover:bg-[#3e3e3e] transition-colors dark:bg-[#2d2d2d] dark:hover:bg-[#3e3e3e] light:bg-[#f5f5f5] light:hover:bg-[#e0e0e0]">
                    <Github className="h-10 w-10 text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2] mb-3" />
                    <h3 className="font-medium mb-1">GitHub</h3>
                    <p className="text-sm text-center">
                      github.com/dextermiranda
                    </p>
                  </a>

                  <a
                    href="https://linkedin.com/in/dextermiranda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-[#2d2d2d] rounded-lg hover:bg-[#3e3e3e] transition-colors dark:bg-[#2d2d2d] dark:hover:bg-[#3e3e3e] light:bg-[#f5f5f5] light:hover:bg-[#e0e0e0]">
                    <Linkedin className="h-10 w-10 text-[#569cd6] dark:text-[#569cd6] light:text-[#4078f2] mb-3" />
                    <h3 className="font-medium mb-1">LinkedIn</h3>
                    <p className="text-sm text-center">
                      linkedin.com/in/dextermiranda
                    </p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}
