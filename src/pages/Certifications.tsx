
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotWidget from "../components/ChatbotWidget";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Award, ExternalLink } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      date: "2023",
      credentialId: "AZ-204",
      description: "Demonstrates expertise in developing applications and services on Microsoft Azure platform, including compute solutions, storage, security, and monitoring.",
      skills: ["Azure App Service", "Azure Functions", "Cosmos DB", "Azure Storage", "Azure Key Vault"],
      badge: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "2022",
      credentialId: "AZ-900",
      description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
      skills: ["Cloud Concepts", "Azure Services", "Security", "Compliance", "Pricing"],
      badge: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
      credentialId: "META-REACT-2023",
      description: "Comprehensive understanding of React development, including hooks, state management, and modern React patterns.",
      skills: ["React Hooks", "State Management", "Component Architecture", "Testing", "Performance"],
      badge: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2022",
      credentialId: "AWS-CCP-2022",
      description: "Foundational understanding of AWS Cloud, including services, security, architecture, and pricing models.",
      skills: ["AWS Services", "Cloud Security", "AWS Pricing", "Support Models", "Shared Responsibility"],
      badge: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
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
      
      <main className="container mx-auto px-4 py-8 pt-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Professional Certifications
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my professional achievements and continuous learning journey in cloud technologies, 
            web development, and enterprise solutions.
          </p>
        </motion.section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Award className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{cert.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>{cert.issuer}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.date}</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {cert.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>ID: {cert.credentialId}</span>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400">
                      <ExternalLink className="w-3 h-3" />
                      <span>Verify</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Continuous Learning</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm committed to staying current with the latest technologies and best practices. 
              Currently pursuing additional certifications in advanced Azure services and modern JavaScript frameworks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{certifications.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Certifications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cloud Platforms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Certifications;
