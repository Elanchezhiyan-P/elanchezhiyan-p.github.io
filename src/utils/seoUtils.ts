import { calculateYearsOfExperience } from './dateUtils';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export interface StructuredDataConfig {
  type: 'Person' | 'WebPage' | 'Article' | 'BlogPosting' | 'Organization' | 'Service' | 'CollectionPage' | 'ContactPage';
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  additionalData?: Record<string, any>;
}

const BASE_URL = 'https://elanchezhiyan-p.is-a.dev';
const YEARS_OF_EXPERIENCE = calculateYearsOfExperience();

export const generateStructuredData = (config: StructuredDataConfig) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": config.type,
    "name": config.title || `Elanchezhiyan P - Senior .NET & Azure Developer`,
    "description": config.description || `Senior .NET & Azure Developer with ${YEARS_OF_EXPERIENCE}+ years of experience`,
    "url": config.url || BASE_URL,
    "image": config.image || `${BASE_URL}/Elan.jpg`,
    "author": {
      "@type": "Person",
      "name": "Elanchezhiyan P",
      "jobTitle": "Senior .NET & Azure Developer",
      "description": `Senior .NET & Azure Developer with ${YEARS_OF_EXPERIENCE}+ years of experience`,
      "url": BASE_URL,
      "image": `${BASE_URL}/Elan.jpg`,
      "sameAs": [
        "https://github.com/elanchezhiyan",
        "https://linkedin.com/in/elanchezhiyan",
        "https://twitter.com/always_elan_p"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance/Consultant"
      },
      "knowsAbout": [
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
        "Kubernetes"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Software Developer",
        "occupationLocation": {
          "@type": "Place",
          "name": "Remote/Worldwide"
        }
      }
    }
  };

  // Add type-specific data
  switch (config.type) {
    case 'Article':
    case 'BlogPosting':
      return {
        ...baseData,
        "headline": config.title,
        "datePublished": config.publishedTime,
        "dateModified": config.modifiedTime,
        "articleSection": config.section,
        "keywords": config.tags?.join(', '),
        "publisher": {
          "@type": "Person",
          "name": "Elanchezhiyan P"
        }
      };
    
    case 'Service':
      return {
        ...baseData,
        "provider": {
          "@type": "Person",
          "name": "Elanchezhiyan P",
          "jobTitle": "Senior .NET & Azure Developer"
        },
        "serviceType": "Software Development Consultation",
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": `${BASE_URL}/contact`
        }
      };
    
    case 'CollectionPage':
      return {
        ...baseData,
        "name": "Projects Portfolio",
        "description": `Portfolio of software development projects by Elanchezhiyan P, showcasing ${YEARS_OF_EXPERIENCE}+ years of expertise`
      };
    
    case 'ContactPage':
      return {
        ...baseData,
        "name": "Contact",
        "description": "Contact Elanchezhiyan P for software development services"
      };
    
    default:
      return baseData;
  }
};

export const getDefaultSEOConfig = (): SEOConfig => {
  return {
    title: `Elanchezhiyan P - Senior .NET & Azure Developer | ${YEARS_OF_EXPERIENCE}+ Years Experience`,
    description: `Elanchezhiyan P - Seasoned Software Developer with ${YEARS_OF_EXPERIENCE}+ years experience in .NET, Azure, CRM integrations, and cloud architecture. Expert in building scalable applications and providing tech mentorship.`,
    keywords: 'Elanchezhiyan P, .NET Developer, Azure Developer, Cloud Solutions, DevOps Engineer, Full Stack Developer, React Developer, Software Architect, C# Developer, Microsoft Azure, Cloud Architecture, CRM Integration, API Development, Database Design, Microservices, Docker, Kubernetes, CI/CD, Software Consulting, Tech Mentor',
    image: '/Elan.jpg',
    url: BASE_URL,
    type: 'website',
    author: 'Elanchezhiyan P'
  };
};

export const getPageSpecificSEO = (pathname: string): SEOConfig => {
  const baseConfig = getDefaultSEOConfig();
  
  switch (pathname) {
    case '/about':
      return {
        ...baseConfig,
        title: `About Elanchezhiyan P | Senior .NET & Azure Developer (${YEARS_OF_EXPERIENCE}+ Years)`,
        description: `Learn about Elanchezhiyan P, a senior .NET & Azure developer with ${YEARS_OF_EXPERIENCE}+ years of experience in cloud architecture, DevOps, and modern web technologies.`,
        keywords: 'About Elanchezhiyan P, .NET Developer Background, Azure Expert, Software Development Experience, Cloud Architecture, DevOps Engineer, Tech Professional',
        url: `${BASE_URL}/about`
      };
    
    case '/projects':
      return {
        ...baseConfig,
        title: `Projects Portfolio | Elanchezhiyan P - ${YEARS_OF_EXPERIENCE}+ Years of Development Work`,
        description: `Explore projects by Elanchezhiyan P, showcasing ${YEARS_OF_EXPERIENCE}+ years of software development expertise in .NET, Azure, React, and cloud solutions.`,
        keywords: 'Elanchezhiyan P Projects, .NET Projects, Azure Projects, React Projects, Software Development Portfolio, Cloud Solutions, Web Applications, Mobile Apps, API Development',
        url: `${BASE_URL}/projects`
      };
    
    case '/blog':
      return {
        ...baseConfig,
        title: `Blog & Articles | Elanchezhiyan P - Tech Insights & Development Tips`,
        description: `Read blog articles by Elanchezhiyan P on .NET, Azure, software engineering best practices, and modern development techniques.`,
        keywords: 'Elanchezhiyan P Blog, .NET Blog, Azure Blog, Software Development Blog, Tech Articles, Programming Tips, Development Best Practices, Cloud Computing Blog',
        url: `${BASE_URL}/blog`,
        type: 'article'
      };
    
    case '/testimonials':
      return {
        ...baseConfig,
        title: `Client Testimonials | Elanchezhiyan P - Trusted .NET & Azure Expert`,
        description: `See testimonials and reviews for Elanchezhiyan P, a trusted .NET & Azure expert with ${YEARS_OF_EXPERIENCE}+ years experience delivering quality software solutions.`,
        keywords: 'Elanchezhiyan P Testimonials, Client Reviews, .NET Developer Reviews, Azure Expert Feedback, Software Development Testimonials, Professional References',
        url: `${BASE_URL}/testimonials`
      };
    
    case '/contact':
      return {
        ...baseConfig,
        title: `Contact Elanchezhiyan P | .NET & Azure Development Services`,
        description: `Contact Elanchezhiyan P for software development, .NET, and Azure consulting. Get in touch for collaboration, mentorship, or project inquiries.`,
        keywords: 'Contact Elanchezhiyan P, .NET Development Services, Azure Consulting, Software Development Contact, Tech Mentor Contact, Development Collaboration',
        url: `${BASE_URL}/contact`
      };
    
    case '/book':
      return {
        ...baseConfig,
        title: `Book Consultation | Elanchezhiyan P - Tech Mentorship & Development Services`,
        description: `Book a consultation or mentorship session with Elanchezhiyan P. Get expert guidance on .NET, Azure, software architecture, and career development.`,
        keywords: 'Book Elanchezhiyan P, Tech Consultation, Development Mentorship, .NET Mentoring, Azure Consulting, Software Architecture Consultation, Career Development',
        url: `${BASE_URL}/book`,
        type: 'service'
      };
    
    default:
      return baseConfig;
  }
};

export const generateBreadcrumbStructuredData = (pathname: string) => {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    }
  ];

  let position = 2;
  
  switch (pathname) {
    case '/about':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": "About",
        "item": `${BASE_URL}/about`
      });
      break;
    
    case '/projects':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": "Projects",
        "item": `${BASE_URL}/projects`
      });
      break;
    
    case '/blog':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": "Blog",
        "item": `${BASE_URL}/blog`
      });
      break;
    
    case '/testimonials':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": "Testimonials",
        "item": `${BASE_URL}/testimonials`
      });
      break;
    
    case '/contact':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": "Contact",
        "item": `${BASE_URL}/contact`
      });
      break;
    
    case '/book':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": "Book Consultation",
        "item": `${BASE_URL}/book`
      });
      break;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elanchezhiyan P - Software Development Services",
    "url": BASE_URL,
    "logo": `${BASE_URL}/Elan.jpg`,
    "description": `Professional software development services by Elanchezhiyan P, a Senior .NET & Azure Developer with ${YEARS_OF_EXPERIENCE}+ years of experience.`,
    "founder": {
      "@type": "Person",
      "name": "Elanchezhiyan P",
      "jobTitle": "Senior .NET & Azure Developer"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${BASE_URL}/contact`
    },
    "sameAs": [
      "https://github.com/elanchezhiyan",
      "https://linkedin.com/in/elanchezhiyan",
      "https://twitter.com/always_elan_p"
    ]
  };
};

export const updateMetaTags = (config: SEOConfig) => {
  // Update title
  document.title = config.title;
  
  // Helper function to update meta tags
  const updateMetaTag = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = name;
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  const updatePropertyTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  // Update meta tags
  updateMetaTag('description', config.description);
  updateMetaTag('keywords', config.keywords);
  updateMetaTag('author', config.author || 'Elanchezhiyan P');
  
  // Update Open Graph tags
  updatePropertyTag('og:title', config.title);
  updatePropertyTag('og:description', config.description);
  updatePropertyTag('og:type', config.type || 'website');
  updatePropertyTag('og:url', config.url || BASE_URL);
  updatePropertyTag('og:image', config.image ? `${BASE_URL}${config.image}` : `${BASE_URL}/Elan.jpg`);
  
  // Update Twitter tags
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);
  updateMetaTag('twitter:image', config.image ? `${BASE_URL}${config.image}` : `${BASE_URL}/Elan.jpg`);
  
  // Update canonical URL
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.rel = 'canonical';
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.href = config.url || BASE_URL;
};
