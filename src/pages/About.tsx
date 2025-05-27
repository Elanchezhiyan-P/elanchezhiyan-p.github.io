import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotWidget from "../components/ChatbotWidget";
import ProfileImage from "../components/ProfileImage";

const About = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const skillsCategories = [
    {
      name: "Languages & Frameworks",
      skills: ["C#", ".NET Core", "ReactJS", "NestJS", "JavaScript/TypeScript", "SQL"]
    },
    {
      name: "Azure Services",
      skills: ["App Service", "Key Vault", "Blob Storage", "Azure SQL", "Power BI", "Power Automate", "App Registrations", "VNet configurations", "Elastic Pools"]
    },
    {
      name: "Tools & Practices",
      skills: ["Automation", "CI/CD", "Git", "Docker", "Microservices", "Testing"]
    }
  ];

  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "Enterprise Solutions Inc.",
      period: "2021 - Present",
      description: "Led development of Azure-based enterprise applications, architected scalable solutions, and mentored junior developers. Continuously explore and implement emerging technologies to enhance project outcomes.",
      technologies: ["Azure", ".NET Core", "ReactJS", "SQL Server"],
      icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=50&h=50&fit=crop"
    },
    {
      role: "Full Stack Developer",
      company: "Tech Innovations Ltd.",
      period: "2019 - 2021",
      description: "Developed and maintained web applications using .NET Core and React, implemented CI/CD pipelines, and optimized database performance. Actively researched and adopted new frameworks and tools.",
      technologies: [".NET Core", "React", "Azure DevOps"],
      icon: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=50&h=50&fit=crop"
    },
    {
      role: "Software Developer",
      company: "Digital Solutions",
      period: "2018 - 2019",
      description: "Built and maintained web applications, collaborated with design and product teams, and participated in code reviews. Focused on learning and implementing modern development practices.",
      technologies: ["C#", "ASP.NET MVC", "jQuery", "SQL Server"],
      icon: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=50&h=50&fit=crop"
    }
  ];

  const personalStats = [
    {
      title: "Years of Experience",
      value: "6+",
      description: "Building enterprise solutions"
    },
    {
      title: "Projects Completed",
      value: "50+",
      description: "From startups to enterprise"
    },
    {
      title: "Technologies Mastered",
      value: "15+",
      description: "Across full stack development"
    },
    {
      title: "Certifications",
      value: "4",
      description: "Azure and React certified"
    }
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "Constantly exploring new technologies and approaches to solve complex problems efficiently."
    },
    {
      title: "Quality",
      description: "Writing clean, maintainable code with comprehensive testing and documentation."
    },
    {
      title: "Collaboration",
      description: "Working closely with teams to deliver solutions that exceed expectations."
    },
    {
      title: "Growth",
      description: "Committed to continuous learning and staying current with industry trends."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="w-full px-4 py-8 pt-20">
        {/* Hero Section with Profile Image */}
        <section className="py-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <ProfileImage 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop"
                alt="Developer Profile"
                fallback="JS" 
                size="xl"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                A passionate .NET Full Stack Developer with 6+ years of experience, 
                specializing in Azure-based solutions, and proficient with both ReactJS and NestJS.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                I have a strong passion for continuous learning and technology adoption. I actively familiarize 
                myself with emerging technologies and frameworks, incorporating them into new projects to deliver 
                innovative and efficient solutions. My approach combines proven methodologies with cutting-edge 
                tools to create robust, scalable applications that drive business success.
              </p>
              <div className="flex gap-4">
                <motion.button 
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.button>
                <motion.button 
                  className="px-6 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {personalStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">{stat.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Core Values Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide my approach to development and collaboration
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-bold text-lg mb-3 text-blue-600">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Tabs */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="flex justify-center mb-8">
            <motion.div className="inline-flex p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
              {["experience", "skills", "education"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2 rounded-md text-sm font-medium capitalize ${
                    activeTab === tab ? "text-white" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {activeTab === "experience" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12 relative"
              >
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                
                {experiences.map((exp, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative pl-14">
                    <div className="absolute left-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center z-10">
                      <motion.img 
                        src={exp.icon} 
                        alt={exp.company} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex items-center mb-3">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === "skills" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {skillsCategories.map((category, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="mb-8 last:mb-0"
                  >
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === "education" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Master's in Computer Science
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      University of Technology
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      2014 - 2016
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Specialized in Software Engineering with focus on cloud technologies and distributed systems.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Bachelor's in Computer Engineering
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      State Technical University
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      2010 - 2014
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Core curriculum covering software development, algorithms, data structures, and computer architecture.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default About;
