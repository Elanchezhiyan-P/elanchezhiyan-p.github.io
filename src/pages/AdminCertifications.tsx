
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllCertifications, deleteCertification, Certification } from "../utils/certificationsManager";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";

const AdminCertifications = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertifications = async () => {
      setLoading(true);
      try {
        const data = getAllCertifications();
        setCertifications(data);
      } catch (error) {
        console.error("Error loading certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/admin/certifications/add?edit=${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      const success = deleteCertification(id);
      if (success) {
        setCertifications(prev => prev.filter(cert => cert.id !== id));
        toast({
          title: "Success",
          description: "Certification deleted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete certification.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex justify-between items-center">
            <Link 
              to="/admin/dashboard" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <Button asChild>
              <Link to="/admin/certifications/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Manage Certifications</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Edit, delete, or reorder your certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certification) => (
              <motion.div
                key={certification.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-l-4 hover:border-b-4 hover:border-blue-500">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/90"
                      onClick={() => handleEdit(certification.id)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/90 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDelete(certification.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={certification.image} 
                      alt={certification.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{certification.title}</CardTitle>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {certification.issuer}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Issued: {new Date(certification.date).toLocaleDateString()}
                    </p>
                    
                    {certification.credentialId && (
                      <p className="text-xs text-gray-500 mb-4">
                        ID: {certification.credentialId}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {certification.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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

export default AdminCertifications;
