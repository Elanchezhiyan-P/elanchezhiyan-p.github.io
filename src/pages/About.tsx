import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Award,
  Code,
  Cloud,
  Database,
  Server,
  Trophy,
  ExternalLink,
  Zap,
  Wrench,
  Brain,
  Download,
  Monitor,
  BarChart3,
  Activity,
  GitBranch,
  Layers,
  TestTube,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import { MobileTimeline } from "@/components/MobileTimeline";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const yearsOfExperience = calculateYearsOfExperience();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const experiences = [
    {
      year: "2018 May",
      title: "Android Developer (Internship)",
      company: "LepoCube Technologies",
      location: "Erode, Tamilnadu, India",
      type: "job" as const,
      intro:
        "Built real-world Android apps as part of a hands-on internship, focusing on code quality and performance.",
      description:
        "Designed and optimized Android applications across diverse domains, enhancing performance, compatibility, and user experience through efficient coding, third-party integrations, and data-driven improvements.",
      companyWebsite: "https://lepocube-assistech.in",
    },
    {
      year: "2019 Aug",
      title: "Technical Associate",
      company: "ThemePro Technologies (Uncia)",
      location: "Chennai, India",
      type: "job" as const,
      intro:
        "Joined a growing tech team, contributing to enterprise support systems and client-facing integrations.",
      description:
        "Delivered end-to-end technical support, collaborated cross-functionally to enhance product performance, and enabled client success through troubleshooting, training, and documentation.",
      companyWebsite: "https://uncia.ai",
    },
    {
      year: "2021 Apr",
      title: "Software Developer",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "job" as const,
      intro:
        "Focused on .NET Core and Azure to develop scalable web applications and REST APIs for business clients.",
      description:
        "Advanced to Senior Developer role, architecting scalable cloud solutions and mentoring junior developers.",
      companyWebsite: "https://aitechindia.com",
    },
    {
      year: "2022 Jun",
      title: "Technical Lead",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "promotion" as const,
      intro:
        "Took on leadership responsibilities including code reviews, technical mentoring, and architecture decisions.",
      description:
        "Currently leading technical architecture decisions and driving innovation in cloud-native applications.",
      companyWebsite: "https://aitechindia.com",
    },
    {
      year: "2024 Jun",
      title: "Senior Software Developer",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "promotion" as const,
      intro:
        "Elevated to a senior role, specializing in cloud architecture, performance optimization, and DevOps practices.",
      description:
        "Currently leading technical architecture decisions and driving innovation in cloud-native applications.",
      companyWebsite: "https://aitechindia.com",
    },
  ];

  const crmIntegrations = [
    {
      name: "NetSuite",
      description: "ERP & CRM integration",
      icon: "🏢",
      category: "Enterprise",
    },
    {
      name: "HubSpot",
      description: "Marketing & Sales CRM",
      icon: "🎯",
      category: "Marketing",
    },
    {
      name: "ConnectWise",
      description: "IT Service Management",
      icon: "🔧",
      category: "IT Services",
    },
    {
      name: "EverFi",
      description: "Education & Compliance",
      icon: "📚",
      category: "Education",
    },
    {
      name: "ServiceNow",
      description: "Enterprise Service Management",
      icon: "⚡",
      category: "Enterprise",
    },
    {
      name: "Zego Cloud",
      description: "Cloud-based CRM",
      icon: "☁️",
      category: "Cloud",
    },
    {
      name: "ProcessMaker",
      description: "Business Process Automation",
      icon: "🔄",
      category: "Automation",
    },
    {
      name: "QuestionPro",
      description: "Survey & Research Platform",
      icon: "📊",
      category: "Research",
    },
  ];

  const dotnetSkills = [
    {
      name: ".NET MAUI",
      description: "Cross-platform mobile & desktop apps",
      icon: "📱",
      category: "Mobile",
    },
    {
      name: ".NET Core Web Applications",
      description: "Modern web applications & APIs",
      icon: "🌐",
      category: "Web",
    },
    {
      name: ".NET Core with PLC Integration",
      description: "Industrial automation systems",
      icon: "⚙️",
      category: "Industrial",
    },
    {
      name: ".NET Core with RFID Readers",
      description: "IoT & hardware integration",
      icon: "📡",
      category: "IoT",
    },
    {
      name: ".NET Core API Development",
      description: "RESTful & GraphQL APIs",
      icon: "🔌",
      category: "API",
    },
    {
      name: ".NET Framework Applications",
      description: "Legacy & enterprise systems",
      icon: "🏛️",
      category: "Enterprise",
    },
    {
      name: ".NET with NHibernate",
      description: "Object-relational mapping",
      icon: "🗄️",
      category: "ORM",
    },
    {
      name: ".NET with IoC Pattern",
      description: "Dependency injection & DI containers",
      icon: "🔧",
      category: "Architecture",
    },
    {
      name: ".NET MVC with Stripe",
      description: "Payment processing integration",
      icon: "💳",
      category: "Payments",
    },
    {
      name: ".NET MVC with Azure",
      description: "Cloud-native applications",
      icon: "☁️",
      category: "Cloud",
    },
    {
      name: ".NET API Applications",
      description: "Microservices & API gateways",
      icon: "🔗",
      category: "Microservices",
    },
    {
      name: ".NET with Selenium Automation",
      description: "Test automation & web scraping",
      icon: "🤖",
      category: "Testing",
    },
    {
      name: ".NET with PhantomJS Scraping",
      description: "Web scraping & data extraction",
      icon: "🕷️",
      category: "Data",
    },
    {
      name: ".NET with ReactJS",
      description: "Full-stack React integration",
      icon: "⚛️",
      category: "Frontend",
    },
    {
      name: "Windows Applications",
      description: "Desktop & system applications",
      icon: "🖥️",
      category: "Desktop",
    },
    {
      name: "Windows Services",
      description: "Background services & daemons",
      icon: "⚙️",
      category: "Services",
    },
    {
      name: "SSO Integration",
      description: "Microsoft, Google, Facebook, LinkedIn",
      icon: "🔐",
      category: "Security",
    },
    {
      name: ".NET Core with iOS",
      description: "iOS app development",
      icon: "🍎",
      category: "Mobile",
    },
    {
      name: ".NET with AI/ML Integration",
      description: "Machine learning & AI services",
      icon: "🧠",
      category: "AI/ML",
    },
    {
      name: "Angular with .NET",
      description: "Angular frontend integration",
      icon: "🅰️",
      category: "Frontend",
    },
    {
      name: "React with .NET",
      description: "React frontend integration",
      icon: "⚛️",
      category: "Frontend",
    },
    {
      name: "Next.Js",
      description: "React framework & SSR",
      icon: "⚡",
      category: "Frontend",
    },
    {
      name: "Nest.Js",
      description: "Node.js backend framework",
      icon: "🪺",
      category: "Backend",
    },
    {
      name: "Node.js",
      description: "JavaScript runtime & server",
      icon: "🟢",
      category: "Backend",
    },
    {
      name: "PHP",
      description: "Server-side scripting",
      icon: "🐘",
      category: "Backend",
    },
    {
      name: "Adobe ColdFusion",
      description: "Enterprise web development",
      icon: "❄️",
      category: "Enterprise",
    },
  ];

  const tools = [
    {
      name: "PowerBI",
      description: "Business intelligence & analytics",
      icon: "📊",
      category: "Analytics",
    },
    {
      name: "Power Automate",
      description: "Workflow automation",
      icon: "🔄",
      category: "Automation",
    },
    {
      name: "SSRS",
      description: "SQL Server Reporting Services",
      icon: "📋",
      category: "Reporting",
    },
    {
      name: "SSIS",
      description: "SQL Server Integration Services",
      icon: "🔗",
      category: "ETL",
    },
    {
      name: "ETL Process",
      description: "Data extraction & transformation",
      icon: "🔄",
      category: "Data",
    },
    {
      name: "Redis Cache",
      description: "In-memory data store",
      icon: "⚡",
      category: "Caching",
    },
    {
      name: "AmChart",
      description: "Interactive charts & graphs",
      icon: "📈",
      category: "Visualization",
    },
    {
      name: "CanvasJs",
      description: "JavaScript charting library",
      icon: "🎨",
      category: "Visualization",
    },
    {
      name: "Chart.js",
      description: "Simple chart library",
      icon: "📊",
      category: "Visualization",
    },
    {
      name: "Aspose Document Editors",
      description: "Document processing & editing",
      icon: "📄",
      category: "Documents",
    },
    {
      name: "Firebase",
      description: "Google's app development platform",
      icon: "🔥",
      category: "Backend",
    },
    {
      name: "Zego Cloud",
      description: "Cloud-based solutions",
      icon: "☁️",
      category: "Cloud",
    },
    {
      name: "ProcessMaker",
      description: "Business process automation",
      icon: "⚙️",
      category: "Automation",
    },
    {
      name: "QuestionPro",
      description: "Survey & research platform",
      icon: "📝",
      category: "Research",
    },
    {
      name: "Selenium Automation",
      description: "Web testing automation",
      icon: "🤖",
      category: "Testing",
    },
    {
      name: "PhantomJS Scraping",
      description: "Headless browser automation",
      icon: "👻",
      category: "Automation",
    },
    {
      name: "HTML2Canvas",
      description: "Screenshot & PDF generation",
      icon: "📸",
      category: "Utilities",
    },
    {
      name: "NetiMobileDevice",
      description: "Mobile device management",
      icon: "📱",
      category: "Mobile",
    },
  ];

  const databases = [
    {
      name: "SQL Server",
      description: "Microsoft's relational database",
      icon: "🗄️",
      category: "Relational",
    },
    {
      name: "SQL Server Profiler",
      description: "Database performance monitoring",
      icon: "📊",
      category: "Monitoring",
    },
    {
      name: "Azure SQL",
      description: "Cloud-based SQL database",
      icon: "☁️",
      category: "Cloud",
    },
    {
      name: "Azure Storage Table",
      description: "NoSQL data storage",
      icon: "📋",
      category: "NoSQL",
    },
    {
      name: "MySQL",
      description: "Open-source relational database",
      icon: "🐬",
      category: "Relational",
    },
    {
      name: "PostgreSQL",
      description: "Advanced open-source database",
      icon: "🐘",
      category: "Relational",
    },
    {
      name: "AS400",
      description: "IBM's enterprise system",
      icon: "💻",
      category: "Legacy",
    },
    {
      name: "SQLite",
      description: "Lightweight embedded database",
      icon: "💾",
      category: "Embedded",
    },
    {
      name: "CosmosDB",
      description: "Microsoft's NoSQL database",
      icon: "🌌",
      category: "NoSQL",
    },
    {
      name: "MongoDB",
      description: "Document-oriented database",
      icon: "🍃",
      category: "NoSQL",
    },
    {
      name: "Firebird",
      description: "Open-source relational database",
      icon: "🔥",
      category: "Relational",
    },
    {
      name: "Oracle",
      description: "Enterprise database system",
      icon: "🏛️",
      category: "Enterprise",
    },
  ];

  const collaborationAndOtherSkills = [
    {
      name: "Android & iOS Development",
      description: "Cross-platform mobile collaboration",
      icon: "📱",
      category: "Mobile",
    },
    {
      name: "Client Interaction",
      description: "Requirement gathering & communication",
      icon: "🤝",
      category: "Communication",
    },
    {
      name: "Team Leadership",
      description: "Mentoring & project management",
      icon: "👥",
      category: "Leadership",
    },
    {
      name: "Continuous Learning",
      description: "Adaptability & skill development",
      icon: "📚",
      category: "Growth",
    },
    {
      name: "Open Source Contributions",
      description: "Community involvement & sharing",
      icon: "🌟",
      category: "Community",
    },
    {
      name: "Technical Documentation",
      description: "Code documentation & guides",
      icon: "📝",
      category: "Documentation",
    },
    {
      name: "Agile/Scrum Methodologies",
      description: "Project management frameworks",
      icon: "🔄",
      category: "Methodology",
    },
  ];

  const backendPlatformSkills = [
    {
      name: "ASP.NET Core Web API",
      description: "Production-grade API development",
      icon: "🔌",
      category: "API",
    },
    {
      name: "Node.js (TypeScript) Services",
      description: "Type-safe backend services",
      icon: "🟢",
      category: "Backend",
    },
    {
      name: "RESTful API Design & Versioning",
      description: "Scalable API architecture patterns",
      icon: "📐",
      category: "Architecture",
    },
    {
      name: "JWT & Role-Based Access Control",
      description: "Authentication & authorization",
      icon: "🔐",
      category: "Security",
    },
    {
      name: "Middleware & Request Pipelines",
      description: "Custom middleware & request flow",
      icon: "🔗",
      category: "Backend",
    },
    {
      name: "Environment-Based Configuration",
      description: "Dev / Staging / Prod config management",
      icon: "⚙️",
      category: "DevOps",
    },
  ];

  const analyticsTrackingSkills = [
    {
      name: "Google Analytics 4 (GA4)",
      description: "Implementation & key events tracking",
      icon: "📊",
      category: "Analytics",
    },
    {
      name: "Google Tag Manager (GTM)",
      description: "Tag setup, debugging & deployment",
      icon: "🏷️",
      category: "Tag Management",
    },
    {
      name: "Event-Based Analytics Design",
      description: "Custom event schemas & tracking plans",
      icon: "🎯",
      category: "Analytics",
    },
    {
      name: "Funnel & User Journey Tracking",
      description: "Conversion funnel analysis",
      icon: "🔄",
      category: "Analytics",
    },
    {
      name: "HubSpot Forms & Lead Tracking",
      description: "Marketing automation integration",
      icon: "📋",
      category: "Marketing",
    },
    {
      name: "Cross-Domain Tracking",
      description: "Embedded form & multi-domain tracking",
      icon: "🌐",
      category: "Analytics",
    },
  ];

  const observabilitySkills = [
    {
      name: "New Relic APM for .NET",
      description: "Application performance monitoring",
      icon: "📈",
      category: "APM",
    },
    {
      name: "Centralized Logging",
      description: "Log aggregation & error correlation",
      icon: "📝",
      category: "Logging",
    },
    {
      name: "Distributed Tracing",
      description: "End-to-end request tracking",
      icon: "🔍",
      category: "Tracing",
    },
    {
      name: "Production Debugging",
      description: "Root cause analysis & diagnostics",
      icon: "🐛",
      category: "Debugging",
    },
    {
      name: "Performance Profiling",
      description: "Latency, throughput & bottleneck analysis",
      icon: "⚡",
      category: "Performance",
    },
  ];

  const devopsSkills = [
    {
      name: "CI/CD Pipelines",
      description: "GitHub Actions & Azure DevOps",
      icon: "🚀",
      category: "CI/CD",
    },
    {
      name: "Dockerized Backend Services",
      description: "Containerization & deployment",
      icon: "🐳",
      category: "Containers",
    },
    {
      name: "Secrets & Config Management",
      description: "Environment variables & vault management",
      icon: "🔒",
      category: "Security",
    },
    {
      name: "Production Rollouts & Hotfixes",
      description: "Zero-downtime deployment strategies",
      icon: "📦",
      category: "Deployment",
    },
    {
      name: "Incident Response & Postmortems",
      description: "On-call troubleshooting & analysis",
      icon: "🚨",
      category: "Reliability",
    },
  ];

  const architectureSkills = [
    {
      name: "SaaS Application Architecture",
      description: "Multi-tenant cloud-native design",
      icon: "🏗️",
      category: "Architecture",
    },
    {
      name: "Scalable API Design",
      description: "High-traffic API architecture",
      icon: "📐",
      category: "Design",
    },
    {
      name: "Event-Driven Architecture",
      description: "Message queues & pub/sub patterns",
      icon: "⚡",
      category: "Patterns",
    },
    {
      name: "Microservices vs Modular Monolith",
      description: "Architecture trade-off decisions",
      icon: "🧩",
      category: "Strategy",
    },
    {
      name: "High-Availability & Fault Tolerance",
      description: "Resilient system design patterns",
      icon: "🛡️",
      category: "Reliability",
    },
  ];

  const testingQASkills = [
    {
      name: "API Testing (Postman)",
      description: "Automated API test suites",
      icon: "🧪",
      category: "API Testing",
    },
    {
      name: "Integration Testing",
      description: "End-to-end system validation",
      icon: "🔗",
      category: "Testing",
    },
    {
      name: "Analytics Validation & Event QA",
      description: "Tracking accuracy verification",
      icon: "✅",
      category: "QA",
    },
    {
      name: "Production vs Staging Verification",
      description: "Environment parity checks",
      icon: "🔄",
      category: "Verification",
    },
    {
      name: "Regression Testing",
      description: "Tracking & integration regression suites",
      icon: "🔁",
      category: "Testing",
    },
  ];

  const productOwnershipSkills = [
    {
      name: "Client Requirement Analysis",
      description: "Translating business needs to tech specs",
      icon: "📋",
      category: "Analysis",
    },
    {
      name: "Stakeholder Communication",
      description: "Technical & non-technical reporting",
      icon: "💬",
      category: "Communication",
    },
    {
      name: "End-to-End Feature Ownership",
      description: "From design to deployment & monitoring",
      icon: "🎯",
      category: "Ownership",
    },
    {
      name: "Cross-Functional Collaboration",
      description: "Tech + Marketing + Product alignment",
      icon: "🤝",
      category: "Collaboration",
    },
  ];

  const certifications = [
    {
      name: ".NET Full Stack Developer - C# Corner",
      issuer: "C# Corner",
      date: "May 2025",
      link: "https://www.c-sharpcorner.com/uploadfile/certification-exam/rzmmaqtc/certification.pdf?trk=public_profile_see-credential",
      icon: "💻",
      category: "Development",
    },
    {
      name: "Foundational C# with Microsoft",
      issuer: "freeCodeCamp",
      date: "Feb 2025",
      credentialId: "elanchezhiyan-p-fcswm",
      link: "https://freecodecamp.org/certification/Elanchezhiyan-P/foundational-c-sharp-with-microsoft?trk=public_profile_see-credential",
      icon: "🔷",
      category: "Programming",
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "Feb 2025",
      credentialId: "elanchezhiyan-p-rwd",
      link: "https://www.freecodecamp.org/certification/Elanchezhiyan-P/responsive-web-design?trk=public_profile_see-credential",
      icon: "📱",
      category: "Web Design",
    },
    {
      name: "Jira Fundamentals Badge",
      issuer: "Atlassian",
      date: "Feb 2024",
      credentialId: "299136941",
      link: "https://university.atlassian.com/student/award/17WcnErMoSR8bgZ9hsN3hSTw?trk=public_profile_see-credential",
      icon: "🎯",
      category: "Project Management",
    },
    {
      name: "cPanel User Interface Proficiency",
      issuer: "cPanel University",
      date: "Jan 2025",
      credentialId: "851a-2616-8f92-f311",
      link: "https://university.cpanel.net/?trk=public_profile_see-credential",
      icon: "⚙️",
      category: "System Administration",
    },
  ];

  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume/Elanchezhiyan_P.pdf"; // Files in public folder are served from root
    link.download = "Elanchezhiyan_P_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SkillCard = ({
    title,
    skills,
    icon: Icon,
    gradient,
    description,
    isCrm = false,
  }: {
    title: string;
    skills: any[];
    icon: any;
    gradient: string;
    description: string;
    isCrm?: boolean;
  }) => (
    <Card className="group overflow-hidden hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-400 transition-all duration-500 relative hover:scale-105 glass backdrop-blur-xl border-2 border-blue-400/60 dark:border-blue-500/60 theme-green:border-green-400/60 theme-green:dark:border-green-500/60 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 shadow-lg">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}
          >
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs md:text-sm">
              {description}
            </p>
          </div>
        </div>

        {isCrm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((crm, index) => (
              <div
                key={index}
                className="group relative rounded-xl p-4 border-2 border-blue-300/70 dark:border-blue-500/70 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{crm.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {crm.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {crm.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {crm.category}
                  </Badge>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="rounded-xl p-4 border-2 border-blue-300/70 dark:border-blue-500/70 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <span className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>
          About Elanchezhiyan P - Senior .NET & Azure Developer | 5+ Years
          Experience
        </title>
        <meta
          name="description"
          content="Learn about Elanchezhiyan P, a B.E (Bachelor of Engineering) graduate and seasoned software developer with 5+ years of experience in .NET Core, Azure Cloud, CRM integrations, and modern web technologies. Expert in building scalable, secure applications."
        />
        <meta
          name="keywords"
          content="Elanchezhiyan P, .NET Developer, Azure Expert, CRM Integration, Full Stack Developer, Software Developer, Tamil Nadu, India"
        />
        <meta
          property="og:title"
          content="About Elanchezhiyan P - Senior .NET & Azure Developer"
        />
        <meta
          property="og:description"
          content="B.E (Bachelor of Engineering) graduate and seasoned software developer with expertise in .NET, Azure, CRM integrations, and modern web development."
        />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://codebyelan.in/about" />
      </Helmet>

      <div className="container mx-auto px-4 pt-8 pb-4 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-4xl mx-auto backdrop-blur-xl border border-white/20">
            <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a seasoned software developer with{" "}
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                {yearsOfExperience}+ years
              </span>{" "}
              of experience in building scalable, secure cloud applications. I hold a{" "}
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                B.E (Bachelor of Engineering)
              </span>{" "}
              degree. My expertise spans across .NET technologies, Azure cloud services,
              CRM integrations, and modern web development frameworks.
            </p>
          </div>
        </section>

        {/* Resume Download Section */}
        <section className="text-center mb-6 md:mb-12">
          <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-2xl mx-auto backdrop-blur-xl border border-white/20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Resume
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
              Get a detailed overview of my experience, skills, and achievements
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-5 md:px-8 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a
                  href="/resume/Elanchezhiyan_P.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  View Resume PDF
                </a>
              </Button>
              <Button
                onClick={handleResumeDownload}
                variant="outline"
                className="border-2 border-blue-600 theme-green:border-green-600 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 px-5 md:px-8 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Download Resume PDF
              </Button>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>

          {isMobile ? (
            <MobileTimeline experiences={experiences} />
          ) : (
            <div className="relative max-w-6xl mx-auto">
              <div className="relative">
                {/* Enhanced Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-blue-200 via-blue-400 via-purple-500 to-indigo-700 theme-green:from-green-200 theme-green:via-green-400 theme-green:via-emerald-500 theme-green:to-teal-700 rounded-full shadow-xl"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-300/50 via-purple-400/50 to-indigo-600/50 theme-green:from-green-300/50 theme-green:via-emerald-400/50 theme-green:to-teal-600/50 rounded-full blur-sm"></div>

                <div className="space-y-12 md:space-y-20">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      } relative`}
                    >
                      {/* Enhanced Timeline Node */}
                      <div
                        className={`absolute left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full flex items-center justify-center text-white font-bold shadow-2xl z-10 border-4 border-white dark:border-gray-900 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:rotate-3 ${
                          index === experiences.length - 1
                            ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 animate-pulse shadow-green-300 dark:shadow-green-500 ring-4 ring-green-200 dark:ring-green-800"
                            : "bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 ring-2 ring-blue-200 dark:ring-blue-800 theme-green:ring-green-200 theme-green:dark:ring-green-800"
                        }`}
                      >
                        <div className="text-center relative z-10">
                          <div className="text-base font-bold">
                            {exp.year.split(" ")[0]}
                          </div>
                          <div className="text-xs opacity-95 font-medium">
                            {exp.year.split(" ")[1]}
                          </div>
                        </div>
                        {index === experiences.length - 1 && (
                          <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white transform translate-x-1 -translate-y-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                            <div className="absolute w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${
                          index === experiences.length - 1
                            ? "bg-green-400"
                            : "bg-blue-400 theme-green:bg-green-400"
                        }`}></div>
                      </div>

                      <div
                        className={`w-5/12 ${
                          index % 2 === 0 ? "pr-28" : "pl-28"
                        }`}
                      >
                        <div className="group relative glass rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] backdrop-blur-xl border-2 border-blue-400/60 dark:border-blue-500/60 theme-green:border-green-400/60 theme-green:dark:border-green-500/60 shadow-xl hover:shadow-2xl hover:shadow-blue-300/50 dark:hover:shadow-blue-500/50 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 overflow-hidden">
                          {/* Animated background gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:via-emerald-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500 rounded-3xl"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 flex-wrap">
                              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                {exp.title}
                              </h3>
                              {exp.type === "promotion" && (
                                <div className="flex items-center gap-1">
                                  <Trophy className="w-6 h-6 text-yellow-500 animate-pulse" />
                                  <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">Promoted</span>
                                </div>
                              )}
                              {index === experiences.length - 1 && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                  <div className="w-2 h-2 bg-white rounded-full absolute"></div>
                                  <span>Current</span>
                                </div>
                              )}
                            </div>

                            {exp.companyWebsite && (
                              <div className="mb-6">
                                <a
                                  href={exp.companyWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-100/90 to-indigo-100/90 dark:from-blue-900/40 dark:to-indigo-900/40 theme-green:from-green-100/90 theme-green:to-emerald-100/90 theme-green:dark:from-green-900/40 theme-green:dark:to-emerald-900/40 border-2 border-blue-300/70 dark:border-blue-600/70 theme-green:border-green-300/70 theme-green:dark:border-green-600/70 hover:bg-gradient-to-r hover:from-blue-200/90 hover:to-indigo-200/90 dark:hover:from-blue-800/50 dark:hover:to-indigo-800/50 theme-green:hover:from-green-200/90 theme-green:hover:to-emerald-200/90 theme-green:dark:hover:from-green-800/50 theme-green:dark:hover:to-emerald-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group/link"
                                >
                                  <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400 group-hover/link:rotate-12 transition-transform duration-300" />
                                  <span className="text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 font-semibold group-hover/link:underline">
                                    {exp.company}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Visit Website →
                                  </span>
                                </a>
                              </div>
                            )}

                            <div className="flex items-center gap-2 mb-4">
                              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400" />
                              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {exp.location}
                              </span>
                            </div>
                            
                            {exp.intro && (
                              <p className="text-sm text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400 mb-3 italic font-medium border-l-4 border-blue-300 dark:border-blue-600 theme-green:border-green-300 theme-green:dark:border-green-600 pl-4 py-2 bg-blue-50/50 dark:bg-blue-900/20 theme-green:bg-green-50/50 theme-green:dark:bg-green-900/20 rounded-r-lg">
                                {exp.intro}
                              </p>
                            )}
                            
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                              {exp.description}
                            </p>

                            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 theme-green:from-green-500 theme-green:to-emerald-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:from-blue-600 hover:to-purple-600 theme-green:hover:from-green-600 theme-green:hover:to-emerald-600">
                              <span>
                                {exp.type === "promotion"
                                  ? "🚀"
                                  : "🎯"}
                              </span>
                              <span>
                                {exp.type === "promotion"
                                  ? "Promoted"
                                  : "New Role"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Technical Expertise Section */}
        <section>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-16 bg-gradient-to-r from-blue-300 to-purple-600 theme-green:from-green-300 theme-green:to-emerald-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>

          <div className="space-y-6 md:space-y-12">
            <SkillCard
              title="CRM Integrations"
              description="Seamless integration with leading CRM platforms across industries"
              skills={crmIntegrations}
              icon={Zap}
              gradient="from-orange-500 to-red-600"
              isCrm={true}
            />

            <SkillCard
              title=".NET Applications"
              description="Comprehensive .NET ecosystem development across platforms"
              skills={dotnetSkills}
              icon={Code}
              gradient="from-blue-500 to-purple-600"
              isCrm={true}
            />

            <SkillCard
              title="Tools & Technologies"
              description="Modern development and integration tools ecosystem"
              skills={tools}
              icon={Wrench}
              gradient="from-green-500 to-teal-600"
              isCrm={true}
            />

            <SkillCard
              title="Databases"
              description="Multi-database expertise and management across platforms"
              skills={databases}
              icon={Database}
              gradient="from-yellow-500 to-orange-600"
              isCrm={true}
            />

            <SkillCard
              title="Collaboration & Soft Skills"
              description="Effective communication, leadership, and team collaboration"
              skills={collaborationAndOtherSkills}
              icon={Brain}
              gradient="from-pink-500 to-purple-600"
              isCrm={true}
            />

            <SkillCard
              title="Backend & Platform Engineering"
              description="Production-grade API development, authentication & configuration management"
              skills={backendPlatformSkills}
              icon={Monitor}
              gradient="from-slate-600 to-blue-700"
              isCrm={true}
            />

            <SkillCard
              title="Analytics, Tracking & Marketing Tech"
              description="GA4, GTM, event tracking, funnel analysis & marketing automation"
              skills={analyticsTrackingSkills}
              icon={BarChart3}
              gradient="from-amber-500 to-orange-600"
              isCrm={true}
            />

            <SkillCard
              title="Observability, Monitoring & Debugging"
              description="APM, logging, distributed tracing & performance profiling"
              skills={observabilitySkills}
              icon={Activity}
              gradient="from-cyan-500 to-blue-600"
              isCrm={true}
            />

            <SkillCard
              title="DevOps, Deployment & Reliability"
              description="CI/CD, Docker, secrets management & incident response"
              skills={devopsSkills}
              icon={GitBranch}
              gradient="from-emerald-500 to-green-700"
              isCrm={true}
            />

            <SkillCard
              title="Architecture & System Design"
              description="SaaS architecture, scalable APIs, event-driven & resilient systems"
              skills={architectureSkills}
              icon={Layers}
              gradient="from-violet-500 to-purple-700"
              isCrm={true}
            />

            <SkillCard
              title="Testing, Validation & Quality"
              description="API testing, integration testing, analytics QA & regression suites"
              skills={testingQASkills}
              icon={TestTube}
              gradient="from-rose-500 to-red-600"
              isCrm={true}
            />

            <SkillCard
              title="Product, Client & Ownership Skills"
              description="Requirement analysis, stakeholder communication & end-to-end ownership"
              skills={productOwnershipSkills}
              icon={Users}
              gradient="from-indigo-500 to-blue-600"
              isCrm={true}
            />
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent pt-4 md:pt-10">
            Certifications & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={cert.name}
                className="group overflow-hidden hover:shadow-xl transition-all duration-500 relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 theme-green:from-green-500 theme-green:to-emerald-500 rounded-t-2xl"></div>

                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {/* Header with icon and external link */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600 flex items-center justify-center shadow-lg">
                        <span className="text-lg md:text-xl">{cert.icon}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 theme-green:dark:group-hover:text-green-400 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base md:text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 theme-green:dark:group-hover:text-green-400 transition-colors duration-300">
                        {cert.name}
                      </h3>

                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {cert.issuer}
                      </p>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {cert.category}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {cert.date}
                        </span>
                      </div>

                      {cert.credentialId && (
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {cert.credentialId}
                          </span>
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`View ${cert.name} certification`}
                />
              </Card>
            ))}
          </div>

          {/* Summary section */}
          <div className="mt-6 md:mt-12 text-center pb-4 md:pb-10">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 theme-green:from-green-50 theme-green:to-emerald-50 theme-green:dark:from-green-900/20 theme-green:dark:to-emerald-900/20 border border-blue-200 dark:border-blue-700 theme-green:border-green-200 theme-green:dark:border-green-700">
              <span className="text-xl md:text-2xl">🎓</span>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {certifications.length} Professional Certifications
              </span>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-12 backdrop-blur-xl border-2 md:border-4 border-blue-500 dark:border-blue-400 theme-green:border-green-500 theme-green:dark:border-green-400 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              With extensive experience across multiple technologies and
              industries, I'm ready to help bring your vision to life.
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-105">
              <Link to="/contact">Let's Connect</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
