
import { Project } from '../data/projects';

// Simulated data storage (in a real app, this would be API calls)
let projectsData = {
  "projects": [
    {
      "id": 1,
      "title": "Seahorse Analytics",
      "description": "A high-performance analytics platform designed for Seahorse metabolic analyzers. Delivers real-time data visualization and interactive dashboards for biological assay insights.",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "category": "Client Work",
      "technologies": ["C#", ".NET Core", "Azure", "React", "D3.js"],
      "link": "#",
      "featured": true
    },
    {
      "id": 2,
      "title": "MPS Applications - Finance",
      "description": "Enterprise-grade financial module within the MPS platform enabling seamless transaction control, live reporting, and data-driven decision-making for clients.",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "category": "Client Work",
      "technologies": ["ASP.NET MVC", "SQL Server", "Azure DevOps", "TypeScript"],
      "link": "#",
      "featured": false
    },
    {
      "id": 3,
      "title": "Query Builder",
      "description": "A Windows-based GUI application enabling users to construct and test SQL queries visually with drag-and-drop capabilities, syntax validation, and result preview.",
      "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      "category": "Personal Projects",
      "technologies": ["WPF", "C#", "LINQ", "SQL"],
      "link": "#",
      "featured": false
    },
    {
      "id": 4,
      "title": "Azure Resource Manager",
      "description": "Open-source utility for managing Azure resources efficiently. Provides templates and automation for resource deployment and management.",
      "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      "category": "Open Source",
      "technologies": ["Azure CLI", "PowerShell", "Terraform", "ARM Templates"],
      "link": "#",
      "featured": false
    },
    {
      "id": 5,
      "title": "Entity Framework Extensions",
      "description": "A collection of NuGet packages extending Entity Framework Core with additional functionality for improved performance and developer experience.",
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      "category": "NuGet Packages",
      "technologies": [".NET Core", "Entity Framework", "C#"],
      "link": "#",
      "featured": false
    },
    {
      "id": 6,
      "title": "Data Validation Framework",
      "description": "A comprehensive framework for data validation in .NET applications with a focus on performance and flexibility.",
      "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
      "category": "NuGet Packages",
      "technologies": [".NET Standard", "C#", "Reflection"],
      "link": "#",
      "featured": false
    }
  ],
  "categories": [
    "All Projects",
    "Open Source",
    "NuGet Packages",
    "Client Work",
    "Personal Projects"
  ]
};

export const getProjectById = (id: number): Project | undefined => {
  return projectsData.projects.find(project => project.id === id);
};

export const getAllProjects = () => {
  return projectsData;
};

export const addProject = (project: Omit<Project, 'id'>): Project => {
  const newId = Math.max(...projectsData.projects.map(p => p.id)) + 1;
  const newProject = { 
    ...project, 
    id: newId,
    featured: project.featured ?? false
  };
  projectsData.projects.push(newProject);
  console.log('Project added:', newProject);
  return newProject;
};

export const updateProject = (id: number, updatedProject: Omit<Project, 'id'>): Project | undefined => {
  const index = projectsData.projects.findIndex(project => project.id === id);
  if (index !== -1) {
    projectsData.projects[index] = { 
      ...updatedProject, 
      id,
      featured: updatedProject.featured ?? false
    };
    console.log('Project updated:', projectsData.projects[index]);
    return projectsData.projects[index];
  }
  return undefined;
};

export const deleteProject = (id: number): boolean => {
  const index = projectsData.projects.findIndex(project => project.id === id);
  if (index !== -1) {
    projectsData.projects.splice(index, 1);
    console.log('Project deleted with id:', id);
    return true;
  }
  return false;
};
