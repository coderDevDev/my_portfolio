export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots?: string[];
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  year: number;
  status?: 'completed' | 'in-progress' | 'planned';
  client?: string;
  role?: string;
  duration?: string;
  challenges?: string[];
  learnings?: string[];
}

export const projects: Project[] = [
  {
    id: 'efurnish',
    title: 'E.Furnish',
    description:
      'A full-featured e-commerce platform with modern UI, secure payments, and admin dashboard.',
    longDescription:
      'Built with Next.js, TypeScript, and Stripe integration, this platform offers a complete shopping experience with cart management, secure checkout, user accounts, and an admin dashboard for product management. Features include real-time inventory tracking, order management, and analytics dashboard.',
    image:
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/Screenshot%202025-05-23%20132637.jpg',
    screenshots: [
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/1.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/2.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/Screenshot%202025-05-23%20132637.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/Screenshot%202025-05-23%20132052.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/Screenshot%202025-05-23%20132317.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/Screenshot%202025-05-23%20132335.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/screencapture-e-furnish-final-vercel-app-checkout-2025-05-23-13_23_46.png',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/efurnish/3.png'
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Stripe',
      'Tailwind CSS',
      'MongoDB',
      'Prisma'
    ],
    category: 'fullstack',
    demoUrl: '/projects/efurnish',
    githubUrl: 'https://github.com/dextermiranda/efurnish',
    featured: true,
    year: 2025,
    status: 'completed',
    client: 'E.Furnish',
    role: 'Full Stack Developer',
    duration: '5 months',
    challenges: [
      'Scaling the platform',
      'Integrating with third-party services'
    ],
    learnings: [
      'Effective communication with clients',
      'Handling large-scale data'
    ]
  },
  {
    id: 'intern-trail',
    title: 'InternTrail',
    description:
      'With InternTrail, you can seamlessly track and manage trainee records, making the internship experience smoother and more efficient than ever before!',
    longDescription:
      'InternTrail offers essential tools for managing trainees, including a dashboard for tracking their progress, a system for assigning tasks, and a way to store and share documents. It also includes features for creating and managing training programs, and for tracking the trainees who have completed them.',
    image:
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/intern_trail/App_Preview-Ca8yW2tF.png',
    screenshots: [
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/intern_trail/App_Preview-Ca8yW2tF.png',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/intern_trail/App_Preview-Ca8yW2tF.png',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/intern_trail/App_Preview-Ca8yW2tF.png'
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Stripe',
      'Tailwind CSS',
      'MongoDB',
      'Prisma'
    ],
    category: 'fullstack',
    demoUrl: '/projects/intern-trail',
    githubUrl: 'https://github.com/dextermiranda/efurnish',
    featured: true,
    year: 2024,
    status: 'completed',
    client: 'InternTrail',
    role: 'Full Stack Developer',
    duration: '3 months',
    challenges: ['Integrating with external APIs', 'Scaling the platform'],
    learnings: ['Effective team collaboration', 'Handling complex data']
  },
  {
    id: 'stay-well',
    title: 'StayWell',
    description:
      'Dental clinic management system that provides dental services and booking system for patients.',
    longDescription:
      'Stay Well Dental Clinic offers essential tools for managing dental patients, including a dashboard for tracking their progress, a system for assigning tasks, and a way to store and share documents. It also includes features for creating and managing training programs, and for tracking the trainees who have completed them.',
    image:
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/staywell/Screenshot%202025-05-23%20124956.jpg',
    screenshots: [
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/staywell/Screenshot%202025-05-23%20124956.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/staywell/Screenshot%202025-05-23%20124956.jpg',
      'https://btmcdhltlvydssuebwir.supabase.co/storage/v1/object/public/others/dexter_miranda_portfolio/staywell/Screenshot%202025-05-23%20124956.jpg'
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Stripe',
      'Tailwind CSS',
      'MongoDB',
      'Prisma'
    ],
    category: 'fullstack',
    demoUrl: '/projects/stay-well',
    githubUrl: 'https://github.com/dextermiranda/efurnish',
    featured: true,
    year: 2024,
    status: 'completed',
    client: 'StayWell Dental Clinic',
    role: 'Full Stack Developer',
    duration: '4 months',
    challenges: ['Integrating with external APIs', 'Handling large-scale data'],
    learnings: ['Effective team collaboration', 'Handling complex data']
  }
];

// Helper functions
export const getFeaturedProjects = (limit?: number): Project[] => {
  const featured = projects.filter(project => project.featured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getRecentProjects = (limit: number = 6): Project[] => {
  return [...projects].sort((a, b) => b.year - a.year).slice(0, limit);
};

export const searchProjects = (query: string): Project[] => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(
    project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
