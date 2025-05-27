
import { motion } from "framer-motion";
import { Users, FolderOpen, Award, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: "Manage Projects",
      description: "Add, edit, and delete projects",
      icon: FolderOpen,
      link: "/admin/projects",
      count: "6 projects"
    },
    {
      title: "Manage Testimonials", 
      description: "Add, edit, and delete testimonials",
      icon: Users,
      link: "/admin/testimonials",
      count: "3 testimonials"
    },
    {
      title: "Manage Certifications",
      description: "Add, edit, and delete certifications", 
      icon: Award,
      link: "/admin/certifications",
      count: "8 certifications"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Manage your portfolio content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dashboardItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit">
                      <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.description}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">
                      {item.count}
                    </p>
                    <Button asChild className="w-full">
                      <Link to={item.link}>
                        <Plus className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
