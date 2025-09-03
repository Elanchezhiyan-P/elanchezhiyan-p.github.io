import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/Layout";
import { PageTransition } from "./components/PageTransition";
import { RouteLoader } from "./components/RouteLoader";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Book = lazy(() => import("./pages/Book"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { useEffect } from "react";
import { calculateYearsOfExperience } from "@/utils/dateUtils";

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
    const baseUrl = "https://codebyelan.in";

    // Dynamic title and description based on route
    let title = `Elanchezhiyan P - Senior .NET & Azure Developer | ${yearsOfExperience}+ Years Experience`;
    let description = `Elanchezhiyan P - Seasoned Software Developer with ${yearsOfExperience}+ years experience in .NET, Azure, CRM integrations, and cloud architecture. Expert in building scalable applications and providing tech mentorship.`;
    let canonical = `${baseUrl}${pathname}`;
    let ogImage = `${baseUrl}/Elan.jpg`;
    let keywords =
      "Elanchezhiyan P, .NET Developer, Azure Developer, Cloud Solutions, DevOps Engineer, Full Stack Developer, React Developer, Software Architect, C# Developer, Microsoft Azure, Cloud Architecture, CRM Integration, API Development, Database Design, Microservices, Docker, Kubernetes, CI/CD, Software Consulting, Tech Mentor";

    if (pathname === "/about") {
      title = `About Elanchezhiyan P | Senior .NET & Azure Developer (${yearsOfExperience}+ Years)`;
      description = `Learn about Elanchezhiyan P, a senior .NET & Azure developer with ${yearsOfExperience}+ years of experience in cloud architecture, DevOps, and modern web technologies.`;
      keywords =
        "About Elanchezhiyan P, .NET Developer Background, Azure Expert, Software Development Experience, Cloud Architecture, DevOps Engineer, Tech Professional";
    } else if (pathname === "/projects") {
      title = `Projects Portfolio | Elanchezhiyan P - ${yearsOfExperience}+ Years of Development Work`;
      description = `Explore projects by Elanchezhiyan P, showcasing ${yearsOfExperience}+ years of software development expertise in .NET, Azure, React, and cloud solutions.`;
      keywords =
        "Elanchezhiyan P Projects, .NET Projects, Azure Projects, React Projects, Software Development Portfolio, Cloud Solutions, Web Applications, Mobile Apps, API Development";
    } else if (pathname === "/blog") {
      title = `Blog & Articles | Elanchezhiyan P - Tech Insights & Development Tips`;
      description = `Read blog articles by Elanchezhiyan P on .NET, Azure, software engineering best practices, and modern development techniques.`;
      keywords =
        "Elanchezhiyan P Blog, .NET Blog, Azure Blog, Software Development Blog, Tech Articles, Programming Tips, Development Best Practices, Cloud Computing Blog";
    } else if (pathname === "/testimonials") {
      title = `Client Testimonials | Elanchezhiyan P - Trusted .NET & Azure Expert`;
      description = `See testimonials and reviews for Elanchezhiyan P, a trusted .NET & Azure expert with ${yearsOfExperience}+ years experience delivering quality software solutions.`;
      keywords =
        "Elanchezhiyan P Testimonials, Client Reviews, .NET Developer Reviews, Azure Expert Feedback, Software Development Testimonials, Professional References";
    } else if (pathname === "/contact") {
      title = `Contact Elanchezhiyan P | .NET & Azure Development Services`;
      description = `Contact Elanchezhiyan P for software development, .NET, and Azure consulting. Get in touch for collaboration, mentorship, or project inquiries.`;
      keywords =
        "Contact Elanchezhiyan P, .NET Development Services, Azure Consulting, Software Development Contact, Tech Mentor Contact, Development Collaboration";
    } else if (pathname === "/book") {
      title = `Book Consultation | Elanchezhiyan P - Tech Mentorship & Development Services`;
      description = `Book a consultation or mentorship session with Elanchezhiyan P. Get expert guidance on .NET, Azure, software architecture, and career development.`;
      keywords =
        "Book Elanchezhiyan P, Tech Consultation, Development Mentorship, .NET Mentoring, Azure Consulting, Software Architecture Consultation, Career Development";
    } else if (pathname === "/") {
      title = `Elanchezhiyan P - Senior .NET & Azure Developer | ${yearsOfExperience}+ Years Experience`;
      description = `Welcome to Elanchezhiyan P's portfolio. ${yearsOfExperience}+ years of .NET & Azure expertise. Expert in cloud architecture, DevOps, React, and building scalable applications.`;
      keywords =
        "Elanchezhiyan P, Senior .NET Developer, Azure Expert, Cloud Architect, DevOps Engineer, Full Stack Developer, Software Consultant, Tech Mentor";
    }

    // Update document title
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

    // Helper to set or update property tag
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

    // Update meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("author", "Elanchezhiyan P");
    setMetaTag(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // Open Graph tags
    setPropertyTag("og:title", title);
    setPropertyTag("og:description", description);
    setPropertyTag("og:type", "website");
    setPropertyTag("og:url", canonical);
    setPropertyTag("og:image", ogImage);
    setPropertyTag("og:image:width", "1200");
    setPropertyTag("og:image:height", "630");
    setPropertyTag(
      "og:image:alt",
      "Elanchezhiyan P - Senior .NET & Azure Developer"
    );
    setPropertyTag("og:site_name", "Elanchezhiyan P Portfolio");
    setPropertyTag("og:locale", "en_US");

    // Twitter tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:site", "@always_elan_p");
    setMetaTag("twitter:creator", "@always_elan_p");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);
    setMetaTag(
      "twitter:image:alt",
      "Elanchezhiyan P - Senior .NET & Azure Developer"
    );

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

    // Add structured data for the current page
    addStructuredData(pathname, yearsOfExperience);
  }, [pathname]);
  return null;
};

const addStructuredData = (pathname: string, yearsOfExperience: number) => {
  const baseUrl = "https://codebyelan.in";

  // Remove existing structured data
  const existingScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );
  existingScripts.forEach((script) => {
    if (script.textContent && !script.textContent.includes('"@context"')) {
      script.remove();
    }
  });

  let structuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: document.title,
    description: document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content"),
    url: `${baseUrl}${pathname}`,
    author: {
      "@type": "Person",
      name: "Elanchezhiyan P",
      jobTitle: "Senior .NET & Azure Developer",
      description: `Senior .NET & Azure Developer with ${yearsOfExperience}+ years of experience`,
      url: baseUrl,
      image: `${baseUrl}/Elan.jpg`,
      sameAs: [
        "https://github.com/elanchezhiyan",
        "https://linkedin.com/in/elanchezhiyan",
        "https://twitter.com/always_elan_p",
      ],
    },
  };

  // Add page-specific structured data
  if (pathname === "/projects") {
    structuredData["@type"] = "CollectionPage";
    structuredData.name = "Projects Portfolio";
    structuredData.description = `Portfolio of software development projects by Elanchezhiyan P, showcasing ${yearsOfExperience}+ years of expertise`;
  } else if (pathname === "/blog") {
    structuredData["@type"] = "Blog";
    structuredData.name = "Tech Blog";
    structuredData.description =
      "Blog articles about .NET, Azure, and software development";
  } else if (pathname === "/contact") {
    structuredData["@type"] = "ContactPage";
    structuredData.name = "Contact";
    structuredData.description =
      "Contact Elanchezhiyan P for software development services";
  } else if (pathname === "/book") {
    structuredData["@type"] = "Service";
    structuredData.name = "Consultation Services";
    structuredData.description =
      "Book consultation and mentorship services with Elanchezhiyan P";
    structuredData.provider = {
      "@type": "Person",
      name: "Elanchezhiyan P",
      jobTitle: "Senior .NET & Azure Developer",
    };
  }

  // Add the structured data to the page
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
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
              <Suspense fallback={<RouteLoader />}>
                <PageTransition>
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
                </PageTransition>
              </Suspense>
            </Layout>
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
