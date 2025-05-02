
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { useEffect } from "react";
import EnhancedNavBar from "@/components/EnhancedNavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <EnhancedNavBar />
      
      <main className="min-h-screen flex items-center py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-azure-600 to-azure-800 p-6 rounded-full text-white text-7xl font-bold mb-4">
              404
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">
                <Search className="mr-2 h-5 w-5" />
                Browse Projects
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
