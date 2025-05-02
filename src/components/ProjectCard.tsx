import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, ExternalLink, Package, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type ProjectType =
  | "opensource"
  | "nuget"
  | "client"
  | "personal"
  | "web";

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    nuget?: string;
    medium?: string;
  };
  type: ProjectType;
  featured?: boolean;
  technicalImplementation?: string;
  keyFeatures?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  technologies,
  links,
  type,
  featured = false,
}) => {
  const hasValidLink = links.live && links.live !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "overflow-hidden card-hover h-full flex flex-col rounded-lg border border-border transition-shadow duration-300 hover:shadow-xl",
          featured && "border-2 border-azure-500 border-azure-500/50"
        )}
      >
        {image ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video w-full flex items-center justify-center bg-gray-100 text-gray-500">
            <span className="text-sm italic">
              No Image or Preview Available
            </span>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold mb-1 leading-snug">
                {title}
              </CardTitle>
              {type === "nuget" && (
                <Badge className="bg-azure-100 text-azure-700 border-azure-200 mb-1">
                  NuGet Package
                </Badge>
              )}
              {type === "opensource" && (
                <Badge className="bg-azure-100 text-azure-700 border-azure-200 mb-1">
                  Open Source
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-2 py-1 text-xs rounded-md"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center mt-auto pt-3 border-t border-border/60">
          <Link
            to={`/projects/${id}`}
            className="text-sm text-azure-600 hover:text-azure-700 transition-colors"
          >
            View Details
          </Link>

          <div className="flex space-x-4 items-center">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub repository"
                className="text-foreground/80 hover:text-azure-600 transition-colors flex items-center"
              >
                <Github size={18} />
              </a>
            )}

            {links.nuget && (
              <a
                href={links.nuget}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View NuGet package"
                className="text-foreground/80 hover:text-azure-600 transition-colors flex items-center"
              >
                <Package size={18} />
              </a>
            )}

            {links.medium && (
              <a
                href={links.medium}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Medium article"
                className="text-foreground/80 hover:text-azure-600 transition-colors flex items-center"
              >
                <FileText size={18} />
              </a>
            )}

            {hasValidLink && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live project"
                className="text-foreground/80 hover:text-azure-600 transition-colors flex items-center"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
