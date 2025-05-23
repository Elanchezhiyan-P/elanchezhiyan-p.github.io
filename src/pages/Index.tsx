import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Github,
  Package,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";
import { getFeaturedProjects } from "@/data/projects";
import { getRecentBlogPosts } from "@/data/blog-posts";
import EnhancedNavBar from "@/components/EnhancedNavBar";

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch Featured Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const projects = await getFeaturedProjects();
        setFeaturedProjects(projects);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch Recent Blog Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const posts = await getRecentBlogPosts(3);
        setRecentPosts(posts);
      } catch (error) {
        console.error("Error fetching recent blog posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-gray-100 min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-6xl mx-auto">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Hi, I'm <span className="text-blue-600">Elanchezhiyan</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            .NET & Azure Developer | Building scalable cloud solutions and
            sharing knowledge.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/projects">View Projects</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="https://avatars.githubusercontent.com/u/29861348?v=4"
            alt="Elanchezhiyan"
            className="w-56 h-56 rounded-full shadow-lg border-4 border-blue-200 object-cover"
          />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-6xl mx-auto px-8 py-12" id="projects">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {loadingProjects ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            featuredProjects
              .slice(0, 3)
              .map((project) => <ProjectCard key={project.id} {...project} />)
          )}
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="max-w-6xl mx-auto px-8 py-12" id="blog">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Latest Blog Posts
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {loadingPosts ? (
            <div className="text-center">Loading articles...</div>
          ) : (
            recentPosts
              .slice(0, 3)
              .map((post) => <BlogPostCard key={post.id} {...post} />)
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        &copy; {new Date().getFullYear()} Elanchezhiyan P. All rights reserved.
      </footer>
    </main>
  );
};

export default Index;
