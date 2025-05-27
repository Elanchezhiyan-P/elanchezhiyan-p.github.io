
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building Resilient Azure Applications",
    excerpt: "Learn how to develop cloud applications that gracefully handle failures and maintain service availability.",
    date: "June 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 2,
    title: "React Performance Optimization Techniques",
    excerpt: "Discover advanced strategies to make your React applications blazing fast and responsive.",
    date: "May 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    id: 3,
    title: "Microservices with .NET and Docker",
    excerpt: "A practical guide to implementing microservices architecture using .NET Core and Docker containers.",
    date: "May 10, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      type: "spring",
      stiffness: 100
    }
  }
};

const BlogPosts = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {blogPosts.map((post, index) => (
        <motion.div 
          key={post.id} 
          variants={itemVariants}
          whileHover={{ 
            y: -12,
            rotateY: 3,
            transition: { duration: 0.3 }
          }}
        >
          <Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:border-l-6 hover:border-purple-500 relative cursor-pointer">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ scale: 1.02 }}
            />
            
            <div className="overflow-hidden h-48 relative">
              <motion.img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover object-center"
                whileHover={{ 
                  scale: 1.1,
                  filter: "brightness(1.2) contrast(1.1)"
                }}
                transition={{ duration: 0.6 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 flex items-end justify-center p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.span
                  className="text-white font-bold text-lg flex items-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  📖 Read Article
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.span>
              </motion.div>
            </div>
            
            <CardHeader className="pb-2 relative z-10">
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardTitle className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 group-hover:font-bold">
                  {post.title}
                </CardTitle>
              </motion.div>
            </CardHeader>
            
            <CardContent className="pb-2 flex-grow relative z-10">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <CardDescription className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {post.excerpt}
                </CardDescription>
              </motion.div>
            </CardContent>
            
            <CardFooter className="pt-2 relative z-10">
              <motion.a
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm group-hover:font-bold"
                whileHover={{ x: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span
                  whileHover={{ letterSpacing: "0.05em" }}
                  transition={{ duration: 0.2 }}
                >
                  Read Full Article
                </motion.span>
                <motion.div
                  whileHover={{ x: 5, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </motion.a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogPosts;
