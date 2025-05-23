import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileCode,
  Github
} from 'lucide-react';
import { StatusBar } from '@/components/status-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-data';
import { ProjectGallery } from '@/components/project-gallery';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  // Split longDescription into paragraphs and handle markdown-like formatting
  const formatDescription = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="text-lg font-bold text-[#4ec9b0] mt-6 mb-3">
            {paragraph.substring(3)}
          </h2>
        );
      }
      if (paragraph.startsWith('- ')) {
        const listItems = paragraph
          .split('\n')
          .filter(item => item.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-1">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-[#d4d4d4]">
                {item.substring(2)}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="mb-4 text-[#d4d4d4] leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-6 md:p-8">
        <div className="mb-6">
          <Link
            href="/projects"
            className="text-[#569cd6] hover:underline flex items-center mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Projects
          </Link>

          <h1 className="text-3xl font-bold text-[#569cd6] mb-2 flex items-center">
            <FileCode className="mr-2 h-7 w-7" /> {project.title}
          </h1>
          <p className="text-lg opacity-90 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <Badge
                key={tag}
                className="bg-[#2d2d2d] text-[#569cd6] hover:bg-[#2d2d2d]/80">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-lg overflow-hidden border border-[#3e3e3e]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#252526] border-[#3e3e3e] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
            <CardContent className="p-5">
              <h3 className="text-lg font-bold text-[#dcdcaa] mb-3">
                Project Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm opacity-70">Year:</span>
                  <p className="text-[#d4d4d4]">{project.year}</p>
                </div>
                <div>
                  <span className="text-sm opacity-70">Category:</span>
                  <p className="text-[#d4d4d4] capitalize">
                    {project.category}
                  </p>
                </div>
                <div>
                  <span className="text-sm opacity-70">Status:</span>
                  <p className="text-[#d4d4d4] capitalize">
                    {project.status || 'Completed'}
                  </p>
                </div>
                {project.client && (
                  <div>
                    <span className="text-sm opacity-70">Client:</span>
                    <p className="text-[#d4d4d4]">{project.client}</p>
                  </div>
                )}
                {project.role && (
                  <div>
                    <span className="text-sm opacity-70">Role:</span>
                    <p className="text-[#d4d4d4]">{project.role}</p>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <span className="text-sm opacity-70">Duration:</span>
                    <p className="text-[#d4d4d4]">{project.duration}</p>
                  </div>
                )}
                {project.featured && (
                  <div>
                    <Badge className="bg-[#007acc] text-white">
                      Featured Project
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#252526] border-[#3e3e3e] md:col-span-2 dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
            <CardContent className="p-5">
              <h3 className="text-lg font-bold text-[#dcdcaa] mb-3">
                Links & Resources
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.demoUrl !== '#' && (
                  <Button
                    asChild
                    className="bg-[#007acc] hover:bg-[#007acc]/80">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl !== '#' && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </a>
                  </Button>
                )}
                {project.demoUrl === '#' && project.githubUrl === '#' && (
                  <p className="text-sm opacity-70 italic">
                    Links coming soon...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <ProjectGallery
            images={project.screenshots}
            projectTitle={project.title}
          />
        )}

        {/* Project Description */}
        <Card className="bg-[#252526] border-[#3e3e3e] mb-8 dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-[#dcdcaa] mb-4">
              About the Project
            </h3>
            <div className="prose prose-invert max-w-none">
              {formatDescription(project.longDescription)}
            </div>
          </CardContent>
        </Card>

        {/* Challenges & Learnings */}
        {(project.challenges || project.learnings) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {project.challenges && project.challenges.length > 0 && (
              <Card className="bg-[#252526] border-[#3e3e3e] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#f44747] mb-4">
                    Challenges Faced
                  </h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#f44747] mr-2">•</span>
                        <span className="text-[#d4d4d4]">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <Card className="bg-[#252526] border-[#3e3e3e] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#4ec9b0] mb-4">
                    Key Learnings
                  </h3>
                  <ul className="space-y-2">
                    {project.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#4ec9b0] mr-2">•</span>
                        <span className="text-[#d4d4d4]">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Technologies Used */}
        <Card className="bg-[#252526] border-[#3e3e3e] mb-8 dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-[#dcdcaa] mb-4">
              Technologies Used
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {project.tags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center p-3 bg-[#2d2d2d] rounded-lg border border-[#3e3e3e] hover:border-[#569cd6] transition-colors">
                  <span className="text-[#569cd6] font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Projects */}
        <Card className="bg-[#252526] border-[#3e3e3e] dark:bg-[#252526] dark:border-[#3e3e3e] light:bg-[#ffffff] light:border-[#e5e5e6]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#dcdcaa]">
                More Projects
              </h3>
              <Button asChild variant="link" className="text-[#569cd6]">
                <Link href="/projects">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-sm opacity-70">
              Explore more of my work and see how I solve different challenges
              with various technologies.
            </p>
          </CardContent>
        </Card>
      </div>

      <StatusBar />
    </div>
  );
}
