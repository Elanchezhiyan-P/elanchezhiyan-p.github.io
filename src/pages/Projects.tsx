import React, { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectsData from "../data/projects.json";
import SeahorseImage from "@/assets/project/Seahorse.png";
import MpsImage from "@/assets/project/MPS.jpg";
import QueryBuilderImage from "@/assets/project/Querybuilder.png";
import IcsImage from "@/assets/project/ics.jpg";
import ScoutImage from "@/assets/project/Scout.jpg";
import IOSBackupToolImage from "@/assets/project/Scout-iOS.png";
import Qliq1sImage from "@/assets/project/Qliq1s.jpg";
import ExpertConnectImage from "@/assets/project/expertconnectlegal.png";
import KuralInsightsImage from "@/assets/project/kural-insights.png";
import GitHubUserSearchImage from "@/assets/project/github-user-search.png";
import WorldCountryExplorerImage from "@/assets/project/WorldCountryExplorer.png";
import TamilSongDownloaderImage from "@/assets/project/tamilsongdownloader.png";
import BlogSubscriptionImage from "@/assets/project/BlogSubscriptionSystem.png";
import SSOIntegrationImage from "@/assets/project/SSOIntegration.png";
import NetimobiledeviceImage from "@/assets/project/Netimobiledevice.png";
import HeicJpegToolkitImage from "@/assets/project/HeicJpegToolkit.png";
import ArcticCodeImage from "@/assets/project/arctic-code.png";
import TeleMedixImage from "@/assets/project/telemedix.png";
import InvoicePilotImage from "@/assets/project/invoice-pdf-image.png";
import GoHighLevelImage from "@/assets/project/GoHighLevelImage.png";

const Projects = () => {
  const imageMap = {
    "seahorse-analytics": SeahorseImage,
    "mps-finance": MpsImage,
    "query-builder": QueryBuilderImage,
    ics: IcsImage,
    remotecom: ScoutImage,
    "ios-backup-tool": IOSBackupToolImage,
    qliq1s: Qliq1sImage,
    "expert-connect-legal": ExpertConnectImage,
    "kural-insights": KuralInsightsImage,
    "gitHub-user-search": GitHubUserSearchImage,
    "world-country-explorer": WorldCountryExplorerImage,
    "tamil-song-downloader": TamilSongDownloaderImage,
    "blog-subscription-system": BlogSubscriptionImage,
    SSOIntegrationSolution: SSOIntegrationImage,
    Netimobiledevice: NetimobiledeviceImage,
    HeicJpegToolkit: HeicJpegToolkitImage,
    ArcticCodeVaultContributor: ArcticCodeImage,
    telemedix: TeleMedixImage,
    "invoice-pilot": InvoicePilotImage,
    ghl: GoHighLevelImage,
  };

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

  // Featured projects filter
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore a portfolio of enterprise-grade applications built for
          scalability, performance, and impact.
        </p>
      </div>

      {/* Featured Projects */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded"></span>
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={imageMap[project.id]}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.links?.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.links?.live && (
                    <Button size="sm" asChild>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            <Filter className="h-4 w-4" />
            All Projects
          </Button>
          {allprojectType
            .slice(0, 100)
            .sort((a, b) => a.localeCompare(b))
            .map((tech) => (
              <Button
                key={tech}
                variant={filter === tech ? "default" : "outline"}
                onClick={() => setFilter(tech)}
                size="sm"
              >
                {tech}
              </Button>
            ))}
        </div>
      </div>

      {/* All Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="glass rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={imageMap[project.id]}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.links?.github && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.links?.live && (
                  <Button size="sm" asChild>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
