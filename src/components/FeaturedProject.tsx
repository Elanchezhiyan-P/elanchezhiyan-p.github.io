
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FeaturedProject = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <motion.div 
        className="grid md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative overflow-hidden">
          <motion.img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Enterprise Application Interface" 
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <motion.div 
                className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-3"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Featured
              </motion.div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Enterprise Azure Cloud Solution
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A comprehensive enterprise solution leveraging Azure's cloud infrastructure, 
            ReactJS for frontend, and .NET Core for backend services. Features include 
            real-time analytics, secure data management, and scalable architecture 
            designed for high-traffic enterprise environments.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Azure", ".NET Core", "ReactJS", "SQL", "Key Vault", "CI/CD"].map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <motion.a
            href="#"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProject;
