
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
  featured?: boolean;
}

export interface ProjectsData {
  projects: Project[];
  categories: string[];
}

import { getAllProjects } from '../utils/dataManager';

export const fetchProjects = async (): Promise<ProjectsData> => {
  try {
    const data = getAllProjects();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Return fallback data if fetch fails
    return {
      projects: [],
      categories: ["All Projects"]
    };
  }
};

export const getProjectsByCategory = (projects: Project[], category: string): Project[] => {
  if (category === "All Projects") {
    return projects;
  }
  return projects.filter(project => project.category === category);
};
