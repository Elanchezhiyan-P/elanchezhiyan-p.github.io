import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://codebyelan.in";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Elanchezhiyan P",
  url: BASE_URL,
  image: `${BASE_URL}/Elan.jpg`,
  jobTitle: "Senior Software Developer",
  description:
    "B.E (Bachelor of Engineering) graduate and Seasoned Software Developer with 5+ years of experience in .NET, Azure, CRM integrations, and cloud architecture.",
  email: "elanche97@gmail.com",
  telephone: "+919942644999",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/elanchezhiyan-p",
    "https://linkedin.com/in/elanchezhiyan-p",
    "https://medium.com/@elanchezhiyan",
  ],
  knowsAbout: [
    ".NET Core",
    "Azure",
    "React",
    "TypeScript",
    "SQL Server",
    "Docker",
    "DevOps",
    "Cloud Architecture",
    "CRM Integration",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Bachelor of Engineering",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Elanchezhiyan P - Portfolio",
  url: BASE_URL,
  description:
    "Portfolio of Elanchezhiyan P, a Seasoned Software Developer specializing in .NET, Azure, and cloud architecture.",
  author: {
    "@type": "Person",
    name: "Elanchezhiyan P",
  },
};

const breadcrumbMap: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/blog": "Blog",
  "/testimonials": "Testimonials",
  "/contact": "Contact",
};

export const JsonLd = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPageName = breadcrumbMap[currentPath] || "Page";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...(currentPath !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: currentPageName,
              item: `${BASE_URL}${currentPath}`,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
