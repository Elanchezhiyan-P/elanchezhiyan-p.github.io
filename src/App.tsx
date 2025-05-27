
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Certifications from "./pages/Certifications";
import Login from "./pages/Login";
import AddTestimonial from "./pages/AddTestimonial";
import AddProject from "./pages/AddProject";
import AddCertification from "./pages/AddCertification";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminCertifications from "./pages/AdminCertifications";
import FloatingSocials from "./components/FloatingSocials";
import { useState } from "react";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <FloatingSocials />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/projects" element={
                  <ProtectedRoute>
                    <AdminProjects />
                  </ProtectedRoute>
                } />
                <Route path="/admin/projects/add" element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                } />
                <Route path="/admin/testimonials" element={
                  <ProtectedRoute>
                    <AdminTestimonials />
                  </ProtectedRoute>
                } />
                <Route path="/admin/testimonials/add" element={
                  <ProtectedRoute>
                    <AddTestimonial />
                  </ProtectedRoute>
                } />
                <Route path="/admin/certifications" element={
                  <ProtectedRoute>
                    <AdminCertifications />
                  </ProtectedRoute>
                } />
                <Route path="/admin/certifications/add" element={
                  <ProtectedRoute>
                    <AddCertification />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
