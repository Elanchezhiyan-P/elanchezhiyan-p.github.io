import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BlogPostCard, { BlogPostCardProps } from "./BlogPostCard";
import { fetchBlogPosts } from "../data/blog-posts";

const POSTS_PER_PAGE = 6;

const BlogGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        const posts = await fetchBlogPosts();
        const sortedPosts = posts.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        const postsWithFeatured = sortedPosts.map((post, index) => ({
          ...post,
          featured: index === 0,
        }));
        setBlogPosts(postsWithFeatured);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const filteredPosts =
    searchQuery.trim() === ""
      ? blogPosts
      : blogPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.categories.some((category) =>
              category.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMoreToShow = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Loading blog posts...
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-2xl mx-auto mb-10"
      >
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            className="pl-10 py-6 rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(POSTS_PER_PAGE); // Reset pagination on search
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto [grid-auto-rows:1fr]"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {visiblePosts.map((post) => (
          <BlogPostCard key={post.id} {...post} />
        ))}

        {visiblePosts.length === 0 && !loading && (
          <div className="text-center p-10 col-span-full">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No blog posts found matching your search.
            </p>
          </div>
        )}
      </motion.div>

      {hasMoreToShow && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default BlogGrid;
