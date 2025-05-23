import {
  Code,
  Database,
  FileCode,
  Server,
  Settings,
  Smartphone
} from 'lucide-react';
import { StatusBar } from '@/components/status-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillRadarChart } from '@/components/skill-radar-chart';
import { SkillBarChart } from '@/components/skill-bar-chart';

export default function SkillsPage() {
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Code,
      color: '#569cd6',
      skills: [
        {
          name: 'React',
          level: 95,
          description: 'Building complex UIs with React and its ecosystem'
        },
        {
          name: 'Next.js',
          level: 90,
          description: 'Creating server-rendered React applications'
        },
        {
          name: 'TypeScript',
          level: 85,
          description: 'Developing type-safe JavaScript applications'
        },
        {
          name: 'HTML/CSS',
          level: 95,
          description: 'Creating responsive and accessible web pages'
        },
        {
          name: 'Tailwind CSS',
          level: 90,
          description: 'Rapidly building custom designs with utility classes'
        },
        {
          name: 'Redux',
          level: 80,
          description: 'Managing application state with Redux'
        }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      color: '#4ec9b0',
      skills: [
        {
          name: 'Node.js',
          level: 90,
          description: 'Building server-side applications with Node.js'
        },
        {
          name: 'Express',
          level: 85,
          description: 'Creating RESTful APIs with Express'
        },
        {
          name: 'MongoDB',
          level: 80,
          description: 'Working with NoSQL databases'
        },
        {
          name: 'PostgreSQL',
          level: 75,
          description: 'Designing and querying relational databases'
        },
        {
          name: 'GraphQL',
          level: 70,
          description: 'Building efficient APIs with GraphQL'
        },
        {
          name: 'Firebase',
          level: 85,
          description: 'Utilizing Firebase for backend services'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      icon: Settings,
      color: '#ce9178',
      skills: [
        {
          name: 'Git',
          level: 95,
          description: 'Version control and collaboration with Git'
        },
        {
          name: 'Docker',
          level: 75,
          description: 'Containerizing applications with Docker'
        },
        {
          name: 'CI/CD',
          level: 80,
          description:
            'Setting up continuous integration and deployment pipelines'
        },
        {
          name: 'Jest',
          level: 85,
          description: 'Writing and running tests with Jest'
        },
        {
          name: 'Webpack',
          level: 70,
          description: 'Configuring and optimizing build processes'
        },
        {
          name: 'AWS',
          level: 65,
          description: 'Deploying and managing applications on AWS'
        }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: Smartphone,
      color: '#dcdcaa',
      skills: [
        {
          name: 'React Native',
          level: 80,
          description: 'Building cross-platform mobile apps'
        },
        {
          name: 'Expo',
          level: 85,
          description: 'Rapid mobile app development with Expo'
        },
        {
          name: 'iOS/Android',
          level: 60,
          description: 'Understanding platform-specific requirements'
        },
        {
          name: 'Mobile UI/UX',
          level: 75,
          description: 'Designing for mobile interfaces'
        }
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: Database,
      color: '#b5cea8',
      skills: [
        {
          name: 'MongoDB',
          level: 85,
          description: 'Designing NoSQL database schemas'
        },
        {
          name: 'PostgreSQL',
          level: 80,
          description: 'Working with relational databases'
        },
        {
          name: 'Redis',
          level: 70,
          description: 'Implementing caching with Redis'
        },
        {
          name: 'Firebase Firestore',
          level: 85,
          description: 'Real-time database management'
        },
        { name: 'SQL', level: 80, description: 'Writing complex SQL queries' }
      ]
    },
    {
      id: 'other',
      title: 'Other Skills',
      icon: FileCode,
      color: '#d7ba7d',
      skills: [
        {
          name: 'UI/UX Design',
          level: 75,
          description: 'Creating user-centered designs'
        },
        {
          name: 'Agile/Scrum',
          level: 85,
          description: 'Working in agile development environments'
        },
        {
          name: 'Technical Writing',
          level: 80,
          description: 'Documenting code and processes'
        },
        {
          name: 'Problem Solving',
          level: 90,
          description: 'Analytical thinking and debugging'
        },
        {
          name: 'Team Collaboration',
          level: 95,
          description: 'Working effectively in development teams'
        }
      ]
    }
  ];

  // Prepare data for charts
  const radarChartData = skillCategories.map(category => ({
    category: category.title.split(' ')[0], // Use first word for shorter labels
    value: Math.round(
      category.skills.reduce((acc, skill) => acc + skill.level, 0) /
        category.skills.length
    ),
    color: category.color
  }));

  const barChartData = skillCategories.map(category => ({
    category: category.title,
    value: Math.round(
      category.skills.reduce((acc, skill) => acc + skill.level, 0) /
        category.skills.length
    ),
    color: category.color
  }));

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#569cd6] mb-4 flex items-center">
            <Code className="mr-2 h-7 w-7" /> Skills & Expertise
          </h1>
          <p className="text-lg opacity-90">
            Here's an overview of my technical skills and expertise across
            different domains. Each skill is rated based on my proficiency and
            experience.
          </p>
        </div>

        {/* Skill Charts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#4ec9b0] mb-6">
            Skill Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Radar Chart */}
            <Card className="bg-[#252526] border-[#3e3e3e]">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#dcdcaa] mb-4">
                  Skill Radar
                </h3>
                <div className="h-[300px] relative">
                  <SkillRadarChart data={radarChartData} />
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-[#252526] border-[#3e3e3e]">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#dcdcaa] mb-4">
                  Category Averages
                </h3>
                <div className="h-[300px] flex items-center">
                  <div className="w-full">
                    <SkillBarChart data={barChartData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="space-y-12">
          {skillCategories.map(category => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-16">
              <div className="flex items-center mb-6">
                <category.icon
                  className="mr-2 h-6 w-6"
                  style={{ color: category.color }}
                />
                <h2
                  className="text-2xl font-bold"
                  style={{ color: category.color }}>
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map(skill => (
                  <Card
                    key={skill.name}
                    className="bg-[#252526] border-[#3e3e3e] hover:border-[#007acc] transition-colors">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-[#d4d4d4]">
                          {skill.name}
                        </h3>
                        <Badge
                          className="bg-[#2d2d2d] hover:bg-[#2d2d2d]/80"
                          style={{ color: category.color }}>
                          {skill.level}%
                        </Badge>
                      </div>
                      <p className="text-sm mb-3 opacity-80">
                        {skill.description}
                      </p>
                      <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: category.color
                          }}></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
