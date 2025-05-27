
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cloud, Database } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";

const HeroSection = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full Stack Development",
      description: "Expert in .NET Core, React, and modern web technologies"
    },
    {
      icon: Cloud,
      title: "Azure Cloud Solutions",
      description: "Certified Azure developer with enterprise-grade solutions"
    },
    {
      icon: Database,
      title: "Scalable Architecture",
      description: "Designing robust, maintainable, and performant applications"
    }
  ];

  return (
    <motion.section 
      className="py-16 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProfileImage 
            src="/lovable-uploads/e0bfa469-4fc1-4fca-ab3a-a3fd6aef3458.png" 
            alt="Developer Profile" 
            fallback="EP"
            size="xl"
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          .NET Full Stack Developer
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Transforming ideas into scalable enterprise solutions with 6+ years of expertise
        </motion.p>
        
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Passionate about exploring and implementing cutting-edge technologies in enterprise projects. 
          I continuously familiarize myself with emerging tools and frameworks to deliver innovative solutions 
          that drive business growth and enhance user experiences. From Azure cloud architectures to modern 
          React applications, I bridge the gap between complex business requirements and elegant technical solutions.
        </motion.p>
        
        {/* Highlights Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <highlight.icon className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{highlight.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/about" 
              className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Learn More About Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-blue-600 bg-white border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
