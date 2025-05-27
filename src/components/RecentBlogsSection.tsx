import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "../data/blog-posts";
import BlogPostCard from "./BlogPostCard";

interface RecentBlogsSectionProps {
  recentBlogs: BlogPost[];
}

const RecentBlogsSection = ({ recentBlogs }: RecentBlogsSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-4">Recent Blog Posts</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Latest insights on .NET, Azure, modern web development, and emerging
          technologies
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {recentBlogs.map((post, index) => (
          <motion.div
            key={post.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <BlogPostCard
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt}
              categories={post.categories}
              image={post.image}
              link={post.link}
              source={post.source}
              featured={index === 0}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 font-medium rounded-md text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300"
          >
            Read All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default RecentBlogsSection;
