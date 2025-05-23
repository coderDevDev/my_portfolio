'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  FileCode,
  Github,
  Search,
  Filter,
  SortAsc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  projects,
  getProjectsByCategory,
  searchProjects
} from '@/lib/projects-data';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const itemsPerPage = 6;

  // Get unique categories
  const categories = [
    'all',
    ...Array.from(new Set(projects.map(p => p.category)))
  ];

  // Filter and sort projects
  useEffect(() => {
    let filtered = getProjectsByCategory(selectedCategory);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        project =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#569cd6] mb-4 flex items-center">
            <FileCode className="mr-2 h-7 w-7" /> Projects
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Here's a collection of my recent projects. Each project showcases
            different skills and technologies.
          </p>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#252526] border-[#3e3e3e]">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#1e1e1e] border-[#3e3e3e] focus:border-[#007acc] focus:ring-[#007acc]">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#252526] border-[#3e3e3e]">
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="recent">Recent First</SelectItem>
                <SelectItem value="alphabetical">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center text-sm opacity-70">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {paginatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedProjects.map(project => (
              <Card
                key={project.id}
                className="bg-[#252526] border-[#3e3e3e] hover:border-[#007acc] transition-colors overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252526] to-transparent opacity-80"></div>
                  {project.featured && (
                    <Badge className="absolute top-3 right-3 bg-[#007acc]">
                      Featured
                    </Badge>
                  )}
                  <Badge className="absolute top-3 left-3 bg-[#2d2d2d] text-[#4ec9b0] capitalize">
                    {project.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#dcdcaa]">
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
        ) : (
          <div className="text-center py-12">
            <p className="text-lg opacity-70 mb-4">
              No projects found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('featured');
              }}
              variant="outline"
              className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? 'bg-[#007acc] hover:bg-[#007acc]/80'
                      : 'border-[#3e3e3e] hover:bg-[#2a2d2e]'
                  }>
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
