import { useState, useEffect } from "react";
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
    <>
      <NavBar />

      {/* Hero Section */}
      <section className="flex items-center pt-16 pb-8 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-azure-400">
                Full-Stack .NET Developer <br />
                <span className="text-azure-600">Azure Cloud Specialist</span>
              </h1>

              <p className="text-lg md:text-xl mb-6 text-muted-foreground max-w-lg">
                Building secure, scalable applications with .NET, C#, and Azure.
                Passionate about cloud technologies and sharing knowledge with
                the community.
              </p>

              <div className="flex flex-wrap gap-4">
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

            <div className="order-1 md:order-2">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden azure-gradient p-6 flex items-center justify-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/29861348?v=4"
                    alt="Elanchezhiyan"
                    className="profile-image w-full h-full object-cover rounded-full transition-all duration-500 ease-in-out transform hover:rotate-3 hover:scale-110 hover:animate-pulse"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-azure-950 shadow-lg rounded-lg p-4">
                  <Code className="text-azure-600" size={40} />
                </div>

                <div className="absolute -top-6 -right-6 bg-white dark:bg-azure-950 shadow-lg rounded-lg p-4">
                  <Package className="text-azure-600" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-8 md:py-12 bg-azure-50 dark:bg-azure-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore some of my recent work, including open-source libraries,
              NuGet packages, and full-stack applications built with .NET and
              Azure.
            </p>
          </div>

          {loadingProjects ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="py-8 md:py-12 bg-azure-50 dark:bg-azure-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I regularly write about .NET, Azure, and software development on
              Medium. Here are some of my recent articles.
            </p>
          </div>

          {loadingPosts ? (
            <div className="text-center">Loading articles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.id} {...post} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
