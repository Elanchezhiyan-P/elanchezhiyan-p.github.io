
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30, rotateX: -15 },
        show: { opacity: 1, y: 0, rotateX: 0 }
      }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -15,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 border-l-0 group hover:border-l-8 hover:border-gradient-to-b hover:from-blue-500 hover:to-purple-500 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          whileHover={{ scale: 1.02 }}
        />
        
        <div className="relative overflow-hidden h-48">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            whileHover={{ 
              scale: 1.1,
              filter: "brightness(1.1) saturate(1.2)"
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div className="absolute top-2 right-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Badge variant="secondary" className="bg-blue-500/90 text-white shadow-lg">
                {project.category}
              </Badge>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 flex items-end justify-center p-6"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h3 
              className="text-white font-bold text-lg text-center"
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              🚀 Explore Project
            </motion.h3>
          </motion.div>
        </div>
        
        <CardHeader className="pb-2 relative z-10">
          <motion.h3 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
          >
            {project.title}
          </motion.h3>
        </CardHeader>
        
        <CardContent className="pb-3 flex-grow relative z-10">
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {project.description}
          </motion.p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  rotate: [0, -2, 2, 0],
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10,
                  rotate: { duration: 0.3 }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transition: `all 0.2s ease ${index * 0.1}s` }}
              >
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-all duration-300 cursor-pointer"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 relative z-10">
          <motion.a
            href="#"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium group-hover:font-bold"
            whileHover={{ x: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              whileHover={{ letterSpacing: "0.05em" }}
              transition={{ duration: 0.2 }}
            >
              View Project Details
            </motion.span>
            <motion.div
              whileHover={{ x: 5, rotate: 45 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
            >
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </motion.div>
          </motion.a>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
