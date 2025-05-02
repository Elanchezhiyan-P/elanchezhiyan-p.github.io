
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { getBlogPostById } from "@/data/blog-posts";

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getBlogPostById(id) : null;
  
  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
    }
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }

  // If it's a Medium article, redirect to the original post
  useEffect(() => {
    if (post.source === "medium") {
      window.location.href = post.link;
    }
  }, [post]);

  // For Medium posts, we'll redirect, but we'll still render the page in case the redirect fails
  return (
    <>
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Button 
            asChild 
            variant="ghost" 
            className="mb-6 pl-0 hover:pl-2 transition-all"
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Calendar size={14} className="mr-1" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "MMMM d, yyyy")}
              </time>
              
              {post.source === "medium" && (
                <div className="ml-4 flex items-center">
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Medium Article
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto"
              />
            </div>
          )}
          
          {/* Post Content */}
          {post.source === "medium" ? (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p>
                {post.excerpt}
              </p>
              <div className="my-8 text-center">
                <p className="mb-4">
                  This article is published on Medium. You'll be redirected automatically, or you can click the button below.
                </p>
                <Button asChild>
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Read on Medium
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p>
                {post.excerpt}
              </p>
              <p>
                This is a full blog post that would contain a complete technical article about {post.title}.
                The content would include code examples, detailed explanations, diagrams, and best practices
                related to {post.categories.join(", ")}.
              </p>
              <h2>Introduction</h2>
              <p>
                In this article, we'll dive deep into various aspects of {post.title} and explore how
                to implement effective solutions using .NET and Azure technologies.
              </p>
              <h2>Core Concepts</h2>
              <p>
                Let's start by understanding the fundamental concepts and why they matter for 
                building robust applications.
              </p>
              <h2>Implementation Details</h2>
              <p>
                Here we would provide code examples, configuration snippets, and step-by-step
                instructions for implementing the solution.
              </p>
              <h2>Best Practices</h2>
              <p>
                This section would cover security considerations, performance optimizations, and
                maintenance strategies.
              </p>
              <h2>Conclusion</h2>
              <p>
                In conclusion, we've explored {post.title} and how to effectively implement it
                in your .NET applications. By following these patterns and practices, you can build
                more maintainable, scalable, and robust solutions.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostDetail;
