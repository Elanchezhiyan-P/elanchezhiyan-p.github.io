import React, { useState, useEffect } from "react";

interface SkillCardProps {
  title: string;
  skills: any[];
  icon: any;
  gradient: string;
  description: string;
  isCrm?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  skills,
  icon: Icon,
  gradient,
  description,
  isCrm = false,
}) => (
  <Card
    data-particle-mask
    className="group overflow-hidden hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-400 transition-all duration-500 relative hover:scale-105 glass backdrop-blur-xl border border-white/20 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80"
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            {description}
          </p>
        </div>
      </div>
      {isCrm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((crm, index) => (
            <div
              key={index}
              className="group relative rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{crm.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-base md:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {crm.name}
                  </h4>
                  {crm.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {crm.description}
                    </p>
                  )}
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
              className="rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <span className="text-gray-800 dark:text-gray-200 text-base md:text-lg font-medium leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {typeof skill === "string" ? (
                  skill
                ) : (
                  <>
                    {skill.icon && <span className="mr-2">{skill.icon}</span>}
                    {skill.name}
                    {skill.description && (
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {skill.description}
                      </span>
                    )}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);
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
import { Badge } from "@/components/ui/badge";
import { topmateServices } from "@/data/topmateServices";

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
      year: "2024 May",
      startDate: "May 2024",
      endDate: "Present",
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
    {
      year: "2022 Sept",
      startDate: "Sept 2022",
      endDate: "May 2024",
      title: "Technical Lead",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "promotion" as const,
      intro:
        "Took on leadership responsibilities including code reviews, technical mentoring, and architecture decisions.",
      description:
        "Led technical architecture decisions and drove innovation in cloud-native applications, mentoring junior developers and ensuring code quality standards.",
      companyWebsite: "https://aitechindia.com",
    },
    {
      year: "2021 Apr",
      startDate: "Apr 2021",
      endDate: "Sept 2022",
      title: "Software Developer",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "job" as const,
      intro:
        "Focused on .NET Core and Azure to develop scalable web applications and REST APIs for business clients.",
      description:
        "Developed scalable cloud solutions and contributed to architectural decisions, working with .NET Core, Azure services, and modern web technologies.",
      companyWebsite: "https://aitechindia.com",
    },
    {
      year: "2019 Aug",
      startDate: "Aug 2019",
      endDate: "Apr 2021",
      title: "Technical Associate",
      company: "ThemePro Technologies (Unicia)",
      location: "Chennai, India",
      type: "job" as const,
      intro:
        "Joined a growing tech team, contributing to enterprise support systems and client-facing integrations.",
      description:
        "Delivered end-to-end technical support, collaborated cross-functionally to enhance product performance, and enabled client success through troubleshooting, training, and documentation.",
      companyWebsite: "https://uncia.ai",
    },
    {
      year: "2018 May",
      startDate: "May 2018",
      endDate: "Jan 2019",
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
    link.href = "/resume/Elanchezhiyan_P.pdf"; // Correct path for GitHub Pages
    link.download = "Elanchezhiyan_P_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>{`About Elanchezhiyan P - Senior .NET & Azure Developer | ${yearsOfExperience}+ Years Experience`}</title>
        <meta
          name="description"
          content={`Learn about Elanchezhiyan P, a seasoned software developer with ${yearsOfExperience}+ years of experience in .NET Core, Azure Cloud, CRM integrations, and modern web technologies. Expert in building scalable, secure applications.`}
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
          content="Seasoned software developer with expertise in .NET, Azure, CRM integrations, and modern web development."
        />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://elanchezhiyan.dev/about" />
      </Helmet>

      <div className="container mx-auto px-2 py-8 space-y-16 relative z-10">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="rounded-2xl p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a{" "}
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                seasoned software developer
              </span>{" "}
              with
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                {" "}
                {yearsOfExperience}+ years
              </span>{" "}
              of experience building scalable, secure cloud applications. My
              expertise includes .NET technologies,{" "}
              <span className="font-bold text-indigo-600 theme-green:text-emerald-600">
                Azure cloud services
              </span>
              , CRM integrations, and modern web development frameworks. I'm
              passionate about continuous learning and currently expanding my
              skills in{" "}
              <span className="font-bold text-purple-600 theme-green:text-green-600">
                AI and machine learning
              </span>
              .
            </p>
          </div>
        </section>

        {/* Resume Download Section */}
        <section className="text-center">
          <div className="rounded-2xl p-6 max-w-xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 shadow border border-blue-100 dark:border-blue-900">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Resume
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get a detailed overview of my experience, skills, and
              achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-6 py-2 text-base font-semibold rounded-xl shadow transition-all duration-300 hover:scale-105"
              >
                <a
                  href="/resume/Elanchezhiyan_P.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Resume PDF
                </a>
              </Button>
              <Button
                onClick={handleResumeDownload}
                variant="outline"
                className="border-2 border-blue-600 theme-green:border-green-600 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 px-6 py-2 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume PDF
              </Button>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          {isMobile ? (
            <MobileTimeline experiences={experiences} />
          ) : (
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-500 to-blue-800 theme-green:from-green-200 theme-green:via-green-500 theme-green:to-green-800 rounded-full shadow-lg"></div>
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    } relative`}
                  >
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 border-4 border-white dark:border-gray-900 bg-gradient-to-br ${
                        index === 0
                          ? "from-green-500 via-emerald-500 to-teal-600 animate-pulse"
                          : "from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold">
                          {exp.year.split(" ")[0]}
                        </div>
                        <div className="text-xs opacity-90">
                          {exp.year.split(" ")[1]}
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? "pr-12" : "pl-12"
                      }`}
                    >
                      <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow border border-blue-100 dark:border-blue-900">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
                            {exp.title}
                          </h3>
                          {exp.type === "promotion" && (
                            <Trophy className="w-5 h-5 text-yellow-500 animate-pulse" />
                          )}
                          {index === 0 && (
                            <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        {exp.companyWebsite && (
                          <div className="mb-3">
                            <a
                              href={exp.companyWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 theme-green:border-green-200 theme-green:dark:border-green-700 hover:bg-gradient-to-r hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 theme-green:hover:from-green-200 theme-green:hover:to-emerald-200 theme-green:dark:hover:from-green-800/30 theme-green:dark:hover:to-emerald-800/30 transition-all duration-300 hover:scale-105"
                            >
                              <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400" />
                              <span className="text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 font-semibold">
                                {exp.company}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Visit Website →
                              </span>
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500 text-xs">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500 text-xs">
                            {exp.location}
                          </span>
                        </div>
                        {exp.intro && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 italic">
                            {exp.intro}
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 theme-green:from-green-500 theme-green:to-emerald-500 text-white shadow transition-all duration-300 hover:scale-105">
                          {exp.type === "promotion"
                            ? "🚀 Promoted"
                            : "🎯 New Role"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Technical Expertise Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-300 to-purple-600 theme-green:from-green-300 theme-green:to-emerald-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="space-y-8">
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
          </div>
        </section>

        {/* Freelance Services Section */}
        <section>
          <div className="rounded-2xl p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-indigo-900/10 shadow border border-purple-100 dark:border-purple-900">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Available for Freelance Projects
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto text-center">
              I offer comprehensive software development services including .NET
              applications, Azure cloud solutions, CRM integrations, and custom
              web applications. Check out my portfolio to see my recent work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-6 py-2 text-base font-semibold rounded-xl shadow transition-all duration-300 hover:scale-105"
              >
                <a href="/projects">View My Projects</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-blue-600 theme-green:border-green-600 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 px-6 py-2 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <a href="/contact">Hire Me</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, index) => (
              <Card
                data-particle-mask
                key={cert.name}
                className="group overflow-hidden hover:shadow-xl transition-all duration-500 relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 theme-green:from-green-500 theme-green:to-emerald-500 rounded-t-2xl"></div>
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600 flex items-center justify-center shadow">
                        <span className="text-lg">{cert.icon}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 theme-green:dark:group-hover:text-green-400 transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 theme-green:dark:group-hover:text-green-400 transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
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
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 theme-green:from-green-50 theme-green:to-emerald-50 theme-green:dark:from-green-900/10 theme-green:dark:to-emerald-900/10 border border-blue-100 dark:border-blue-700 theme-green:border-green-100 theme-green:dark:border-green-700">
              <span className="text-xl">🎓</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {certifications.length} Professional Certifications
              </span>
            </div>
          </div>
        </section>

        {/* Professional Services Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Professional Services & Mentorship
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Beyond development, I offer personalized guidance and support to
            help you grow in your career and projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {topmateServices.slice(0, 6).map((service) => (
              <Card
                data-particle-mask
                key={service.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-500 relative hover:scale-105 glass backdrop-blur-xl border border-white/20 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    {service.badge && (
                      <Badge
                        className={`ml-2 text-xs px-2 py-1 ${
                          service.badge === "Free"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : service.badge === "Popular"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                            : service.badge === "Best Deal"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                        }`}
                      >
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {service.type}
                      </span>
                      {service.duration && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {service.duration}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      {service.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${service.discountPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${service.price}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`text-lg font-bold ${
                            service.price === 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {service.price === 0 ? "Free" : `$${service.price}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white transition-all duration-300 hover:scale-105"
                  >
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Brain className="w-4 h-4" />
                      Book Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-2 border-blue-600 theme-green:border-green-600 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 px-6 py-2 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <a
                href="https://topmate.io/elanchezhiyan_poosamani"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
                aria-label="View all services on Topmate"
              >
                View All Services
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10 shadow border-2 border-blue-500 dark:border-blue-400 theme-green:border-green-500 theme-green:dark:border-green-400">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
              With extensive experience across multiple technologies and
              industries, I'm ready to help bring your vision to life.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-6 py-2 text-base font-semibold rounded-xl shadow transition-all duration-300 hover:scale-105">
              Let's Connect
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
