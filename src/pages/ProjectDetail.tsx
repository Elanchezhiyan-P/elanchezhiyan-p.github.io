import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Package } from "lucide-react";
import { getProjectById } from "@/data/projects";
import { ProjectCardProps } from "@/components/ProjectCard";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectCardProps | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedProject = getProjectById(id);
      if (fetchedProject) {
        setProject(fetchedProject);
      } else {
        navigate("/projects", { replace: true });
      }
    }
  }, [id, navigate]);

  if (!project) return null;

  return (
    <>
      <NavBar />

      <main className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Button
            asChild
            variant="ghost"
            className="mb-6 px-0 hover:px-2 transition-all text-sm md:text-base"
          >
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-xl md:text-3xl font-bold mb-4 text-center md:text-left">
              {project.title}
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              {project.type === "opensource" && (
                <Badge className="bg-azure-100 text-azure-700 border-azure-200">
                  Open Source
                </Badge>
              )}
              {project.type === "nuget" && (
                <Badge className="bg-azure-100 text-azure-700 border-azure-200">
                  NuGet Package
                </Badge>
              )}
              {project.type === "client" && (
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  Client Project
                </Badge>
              )}
              {project.type === "personal" && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Personal Project
                </Badge>
              )}
            </div>

            <p className="text-base text-muted-foreground mx-auto md:mx-0">
              {project.description}
            </p>
          </div>

          {/* Project Image */}
          {project.image && (
            <div className="mb-10 rounded-md overflow-hidden shadow-sm">
              <img
                src={project.image}
                alt={project.title || "Project Image"}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  About This Project
                </h2>
                {project.technicalImplementation && (
                  <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-md shadow border space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      Technical Implementation
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.technicalImplementation}
                    </p>
                  </div>
                )}
              </div>

              {project.keyFeatures && (
                <div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-md shadow border space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      Key Features
                    </h3>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white dark:bg-slate-900 rounded-md p-6 border border-border shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-5 text-sm">
                  <div>
                    <h4 className="text-muted-foreground font-medium">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2 py-1 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-muted-foreground font-medium">Links</h4>
                    <div className="space-y-1 mt-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Github className="h-4 w-4" /> GitHub Repository
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      )}
                      {project.links.nuget && (
                        <a
                          href={project.links.nuget}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Package className="h-4 w-4" /> NuGet Package
                        </a>
                      )}
                      {project.links.medium && (
                        <a
                          href={project.links.medium}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Package className="h-4 w-4" /> Medium
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
