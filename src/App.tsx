
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // SEO optimization
    document.title = "Elanchezhiyan P - Seasoned Software Developer | .NET & Azure Expert";
    
    // Add meta tags
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Elanchezhiyan P - Seasoned Software Developer with 5+ years experience in .NET, Azure, CRM integrations, and cloud architecture. Expert in building scalable applications.';
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'Elanchezhiyan P, Software Developer, .NET Developer, Azure Expert, CRM Integration, Cloud Architecture, Full Stack Developer, Seasoned Developer';
    document.head.appendChild(metaKeywords);

    const metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    metaAuthor.content = 'Elanchezhiyan P';
    document.head.appendChild(metaAuthor);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
