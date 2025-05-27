import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ChatbotWidget from "../components/ChatbotWidget";
import HeroSection from "../components/HeroSection";
import FeaturedProjectsSection from "../components/FeaturedProjectsSection";
import RecentBlogsSection from "../components/RecentBlogsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { fetchProjects, Project } from "../data/projects";
import { fetchBlogPosts, BlogPost } from "../data/blog-posts";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load featured projects
        const projectsData = await fetchProjects();
        const featured = projectsData.projects.filter(
          (project) => project.featured
        );
        setFeaturedProjects(featured);

        // Load recent blog posts (latest 3)
        const blogs = await fetchBlogPosts();
        const sortedBlogs = blogs.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        setRecentBlogs(sortedBlogs.slice(0, 3));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        // Simulate loading time
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <FeaturedProjectsSection featuredProjects={featuredProjects} />
        <RecentBlogsSection recentBlogs={recentBlogs} />
        <TestimonialsSection />
      </main>

      <Footer />
      <ChatbotWidget />
    </motion.div>
  );
};

export default Index;
