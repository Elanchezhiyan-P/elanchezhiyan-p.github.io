import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import Book from "./pages/Book";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const DynamicMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const yearsOfExperience = calculateYearsOfExperience();
    // Dynamic title based on route
    let title = `Elanchezhiyan P - ${yearsOfExperience}+ Years Experience | .NET & Azure Expert`;
    let description = `Elanchezhiyan P - Seasoned Software Developer with ${yearsOfExperience}+ years experience in .NET, Azure, CRM integrations, and cloud architecture. Expert in building scalable applications.`;
    let canonical = `https://elanchezhiyan.dev${pathname}`;
    let ogImage = window.location.origin + "/public/Elan.jpg";
    if (pathname === "/about") {
      title = `About | Elanchezhiyan P (${yearsOfExperience}+ Years)`;
      description = `Learn about Elanchezhiyan P, a senior .NET & Azure developer with ${yearsOfExperience}+ years of experience.`;
    } else if (pathname === "/projects") {
      title = `Projects | Elanchezhiyan P (${yearsOfExperience}+ Years)`;
      description = `Explore projects by Elanchezhiyan P, showcasing ${yearsOfExperience}+ years of software development expertise.`;
    } else if (pathname === "/blog") {
      title = `Blog & Articles | Elanchezhiyan P (${yearsOfExperience}+ Years)`;
      description = `Read blog articles by Elanchezhiyan P on .NET, Azure, and software engineering best practices.`;
    } else if (pathname === "/testimonials") {
      title = `Testimonials | Elanchezhiyan P (${yearsOfExperience}+ Years)`;
      description = `See testimonials for Elanchezhiyan P, a trusted .NET & Azure expert with ${yearsOfExperience}+ years experience.`;
    } else if (pathname === "/contact") {
      title = `Contact | Elanchezhiyan P (${yearsOfExperience}+ Years)`;
      description = `Contact Elanchezhiyan P for software development, .NET, and Azure consulting.`;
    } else if (pathname === "/") {
      title = `Home | Elanchezhiyan P (${yearsOfExperience}+ Years)`;
      description = `Welcome to Elanchezhiyan P's portfolio. ${yearsOfExperience}+ years of .NET & Azure expertise.`;
    }
    document.title = title;

    // Helper to set or update meta tag
    function setMetaTag(name: string, content: string) {
      let tag = document.querySelector(
        `meta[name='${name}']`
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta") as HTMLMetaElement;
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    }
    setMetaTag("description", description);
    setMetaTag(
      "keywords",
      "Elanchezhiyan P, Software Developer, .NET Developer, Azure Expert, CRM Integration, Cloud Architecture, Full Stack Developer, Seasoned Developer"
    );
    setMetaTag("author", "Elanchezhiyan P");

    // Open Graph tags
    function setPropertyTag(property: string, content: string) {
      let tag = document.querySelector(
        `meta[property='${property}']`
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta") as HTMLMetaElement;
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    }
    setPropertyTag("og:title", title);
    setPropertyTag("og:description", description);
    setPropertyTag("og:type", "website");
    setPropertyTag("og:url", canonical);
    setPropertyTag("og:image", ogImage);

    // Twitter tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);

    // Canonical link
    let linkTag = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement | null;
    if (!linkTag) {
      linkTag = document.createElement("link") as HTMLLinkElement;
      linkTag.rel = "canonical";
      document.head.appendChild(linkTag);
    }
    linkTag.href = canonical;
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <DynamicMeta />
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book" element={<Book />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
