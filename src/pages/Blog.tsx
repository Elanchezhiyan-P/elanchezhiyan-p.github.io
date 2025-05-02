import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import { getRecentBlogPosts } from "@/data/blog-posts";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// Utility function to strip HTML tags
const stripHtmlTags = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(6); // Number of posts to show initially
  const [loading, setLoading] = useState(false); // Loading state for "Load More"

  // Fetch and set blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getRecentBlogPosts(); // Fetch all posts

      // Strip HTML tags from the excerpt field
      const sanitizedPosts = posts.map((post) => ({
        ...post,
        excerpt: stripHtmlTags(post.excerpt),
      }));

      // Extract unique categories
      const categories = Array.from(
        new Set(sanitizedPosts.flatMap((post) => post.categories))
      ).sort();

      setAllCategories(categories);
      setAllPosts(sanitizedPosts);
      setFilteredPosts(sanitizedPosts);
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and selected category
  useEffect(() => {
    let filtered = allPosts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.categories.some((cat) => cat.toLowerCase().includes(term))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.categories.includes(selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, allPosts]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleLoadMore = () => {
    setLoading(true); // Start loading animation
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 6); // Load 6 more posts
      setLoading(false); // Stop loading animation
    }, 1000); // Simulate a 1-second delay
  };

  // Identify the latest post
  const latestPostId = allPosts.length > 0 ? allPosts[0].id : null;

  return (
    <>
      <NavBar />

      <main className="pt-24 pb-16">
        {/* Blog Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & Articles
            </h1>
            <p className="text-xl text-muted-foreground">
              Thoughts, tutorials, and insights on .NET development, Azure cloud
              services, and software architecture.
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="container mx-auto px-4 mb-12">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(0, visiblePosts).map((post) => (
                <BlogPostCard
                  key={post.id}
                  {...post}
                  isLatest={post.id === latestPostId} // Highlight the latest post
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="text-azure-600 hover:text-azure-700 mt-2"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {visiblePosts < filteredPosts.length && (
            <div className="text-center mt-8">
              {loading ? (
                <div className="text-lg text-muted-foreground">Loading...</div>
              ) : (
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-azure-600 text-white rounded hover:bg-azure-700"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
