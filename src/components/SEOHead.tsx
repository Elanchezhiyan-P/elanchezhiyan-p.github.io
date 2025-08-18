import React from "react";
import { Helmet } from "react-helmet-async";
import { calculateYearsOfExperience } from "@/utils/dateUtils";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = "/Elan.jpg",
  url,
  type = "website",
  author = "Elanchezhiyan P",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  structuredData,
}) => {
  const yearsOfExperience = calculateYearsOfExperience();
  const baseUrl = "https://codebyelan.in";

  // Default values
  const defaultTitle = `Elanchezhiyan P - Senior .NET & Azure Developer | ${yearsOfExperience}+ Years Experience`;
  const defaultDescription = `Elanchezhiyan P - Seasoned Software Developer with ${yearsOfExperience}+ years experience in .NET, Azure, CRM integrations, and cloud architecture. Expert in building scalable applications and providing tech mentorship.`;
  const defaultKeywords =
    "Elanchezhiyan P, .NET Developer, Azure Developer, Cloud Solutions, DevOps Engineer, Full Stack Developer, React Developer, Software Architect, C# Developer, Microsoft Azure, Cloud Architecture, CRM Integration, API Development, Database Design, Microservices, Docker, Kubernetes, CI/CD, Software Consulting, Tech Mentor";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalUrl = url || baseUrl;
  const finalImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  // Default structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Elanchezhiyan P",
    jobTitle: "Senior .NET & Azure Developer",
    description: `Senior .NET & Azure Developer with ${yearsOfExperience}+ years of experience in cloud architecture, DevOps, and modern web technologies.`,
    url: baseUrl,
    image: `${baseUrl}/Elan.jpg`,
    sameAs: [
      "https://github.com/elanchezhiyan",
      "https://linkedin.com/in/elanchezhiyan",
      "https://twitter.com/always_elan_p",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance/Consultant",
    },
    knowsAbout: [
      ".NET Development",
      "Microsoft Azure",
      "Cloud Architecture",
      "DevOps",
      "React Development",
      "Full Stack Development",
      "API Development",
      "Database Design",
      "Microservices",
      "Docker",
      "Kubernetes",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationLocation: {
        "@type": "Place",
        name: "Remote/Worldwide",
      },
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Elanchezhiyan P - Senior .NET & Azure Developer"
      />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Elanchezhiyan P Portfolio" />
      <meta property="og:locale" content="en_US" />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@always_elan_p" />
      <meta name="twitter:creator" content="@always_elan_p" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta
        name="twitter:image:alt"
        content="Elanchezhiyan P - Senior .NET & Azure Developer"
      />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Elanchezhiyan P" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      {/* Additional WebSite Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Elanchezhiyan P Portfolio",
          url: baseUrl,
          description:
            "Personal portfolio of Elanchezhiyan P, Senior .NET & Azure Developer",
          author: {
            "@type": "Person",
            name: "Elanchezhiyan P",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
