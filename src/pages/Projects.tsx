import React, { useState } from "react";
import { ExternalLink, Github, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import projectsData from "../data/projects.json";
import { projectImageMap } from "@/utils/imageMap";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {

  const [filter, setFilter] = useState("all");
  const [projects] = useState(projectsData);

  // Extract unique technologies from the projects
  const allprojectType = Array.from(
    new Set(projects.flatMap((p) => p.projectType))
  );

  // Filter projects by selected technology or show all
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.projectType.includes(filter));

  return (
    <>
      <Helmet>
        <title>Projects - Elanchezhiyan P | Portfolio & Case Studies</title>
        <meta
          name="description"
          content="Explore Elanchezhiyan P's portfolio of enterprise-grade applications including .NET applications, Azure cloud solutions, CRM integrations, and modern web technologies. 30+ projects completed."
        />
        <meta
          name="keywords"
          content="Elanchezhiyan P, Projects, Portfolio, .NET Projects, Azure Projects, CRM Integration, Web Applications, Software Development"
        />
        <meta
          property="og:title"
          content="Projects - Elanchezhiyan P | Portfolio & Case Studies"
        />
        <meta
          property="og:description"
          content="Explore a portfolio of enterprise-grade applications built for scalability, performance, and impact."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/projects" />
      </Helmet>
      <div className="container mx-auto px-4 py-8 md:py-20">
        <div className="text-center mb-8 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Projects</h1>
        <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore a portfolio of enterprise-grade applications built for
          scalability, performance, and impact.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="group relative">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-t-blue-500 group-hover:border-l-blue-500 theme-green:group-hover:border-t-green-500 theme-green:group-hover:border-l-green-500 transition-all duration-300 rounded-md" />
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
              className={`relative z-10 transition-all duration-300 ${
                filter === "all"
                  ? ""
                  : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 theme-green:hover:bg-green-50 theme-green:hover:text-green-700 theme-green:dark:hover:bg-green-950 theme-green:dark:hover:text-green-300 theme-green:hover:border-green-300 theme-green:dark:hover:border-green-600"
              }`}
            >
              <Filter className="h-4 w-4" />
              All Projects
            </Button>
          </div>
          {allprojectType
            .slice(0, 100)
            .sort((a, b) => a.localeCompare(b))
            .map((tech) => (
              <div key={tech} className="group relative">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-t-blue-500 group-hover:border-l-blue-500 theme-green:group-hover:border-t-green-500 theme-green:group-hover:border-l-green-500 transition-all duration-300 rounded-md" />
                <Button
                  variant={filter === tech ? "default" : "outline"}
                  onClick={() => setFilter(tech)}
                  size="sm"
                  className={`relative z-10 transition-all duration-300 ${
                    filter === tech
                      ? ""
                      : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-600 theme-green:hover:bg-green-50 theme-green:hover:text-green-700 theme-green:dark:hover:bg-green-950 theme-green:dark:hover:text-green-300 theme-green:hover:border-green-300 theme-green:dark:hover:border-green-600"
                  }`}
                >
                  {tech}
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* All Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <Card
            key={project.id}
            className={`group overflow-hidden hover:shadow-xl transition-all duration-500 relative ${
              project.featured
                ? "ring-2 ring-blue-500 ring-opacity-50 dark:ring-blue-400 theme-green:ring-green-500 theme-green:dark:ring-green-400 shadow-lg"
                : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {project.featured && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-blue-500 theme-green:bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
            )}
            <div className="relative overflow-hidden aspect-video">
              <img
                src={projectImageMap[project.id] || "/placeholder.svg"}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-t-blue-500 group-hover:border-l-blue-500 theme-green:group-hover:border-t-green-500 theme-green:group-hover:border-l-green-500 transition-all duration-300" />
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">
                  {project.projectType[0]}
                </Badge>
                {project.featured && (
                  <Badge
                    variant="default"
                    className="text-xs bg-blue-500 hover:bg-blue-600 theme-green:bg-green-500 theme-green:hover:bg-green-600"
                  >
                    Featured
                  </Badge>
                )}
              </div>

              <h3 className="font-bold mb-3 group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors line-clamp-2">
                {project.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant={project.links?.github ? "outline" : "secondary"}
                  asChild={!!project.links?.github}
                  disabled={!project.links?.github}
                  className={`flex-1 group/btn transition-all duration-300 ${
                    project.links?.github
                      ? "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      : "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {project.links?.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 justify-center py-2.5"
                    >
                      <Github className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        View Code
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 justify-center py-2.5">
                      <Github className="h-4 w-4" />
                      <span className="font-semibold">View Code</span>
                    </div>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant={project.links?.live ? "default" : "secondary"}
                  asChild={!!project.links?.live}
                  disabled={!project.links?.live}
                  className={`flex-1 transition-all duration-300 ${
                    project.links?.live
                      ? "bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white shadow-sm hover:shadow-md transform hover:scale-105"
                      : "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {project.links?.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 justify-center py-2.5 font-semibold"
                    >
                      <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 justify-center py-2.5 font-semibold">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
};

export default Projects;
