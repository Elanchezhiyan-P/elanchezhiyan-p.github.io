import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/Layout";
import { JsonLd } from "./components/JsonLd";
import React, { Suspense, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { preloadBlogData } from "./utils/blogService";
import { initGA, trackPageView } from "./utils/analytics";
import { calculateYearsOfExperience } from "./utils/dateUtils";
import { Helmet } from "react-helmet-async";

// Lazy-load pages for code splitting
const Index = React.lazy(() => import("./pages/Index"));
const About = React.lazy(() => import("./pages/About"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Testimonials = React.lazy(() => import("./pages/Testimonials"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const RECAPTCHA_SITE_KEY = "6Lc-fmUsAAAAALqxveilpOVKZge1pyF9cEdlymOu";

const queryClient = new QueryClient();

// Page loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
};

const App = () => {
  const yearsOfExperience = calculateYearsOfExperience();

  useEffect(() => {
    // Initialize Google Analytics
    initGA();

    // Preload blog data in the background
    preloadBlogData();
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Helmet>
                <title>Elanchezhiyan P - Seasoned Software Developer | .NET &amp; Azure Expert</title>
                <meta name="description" content={`B.E (Bachelor of Engineering) graduate and Senior .NET & Azure Developer with ${yearsOfExperience}+ years of experience architecting scalable and secure cloud applications. Specializing in DevOps, automation, and modern web technologies.`} />
              </Helmet>
              <JsonLd />
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </GoogleReCaptchaProvider>
  );
};

export default App;
