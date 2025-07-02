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
    "NetSuite",
    "HubSpot",
    "ConnectWise",
    "EverFi",
    "ServiceNow",
    "Zego Cloud",
    "ProcessMaker",
    "QuestionPro",
  ];

  const dotnetSkills = [
    ".NET MAUI",
    ".NET Core Web Applications",
    ".NET Core with PLC Integration",
    ".NET Core with RFID Readers",
    ".NET Core API Development",
    ".NET Framework Applications",
    ".NET with NHibernate",
    ".NET with IoC Pattern",
    ".NET MVC with Stripe",
    ".NET MVC with Azure",
    ".NET API Applications",
    ".NET with Selenium Automation",
    ".NET with PhantomJS Scraping",
    ".NET with ReactJS",
    "Windows Applications",
    "Windows Services",
    "SSO Integration (Microsoft, Google, Facebook, LinkedIn)",
    ".NET Core with iOS",
    ".NET with AI/ML Integration",
    "Angular with .NET",
    "React with .NET",
    "Next.Js",
    "Nest.Js",
    "Node.js",
    "PHP",
    "Adobe ColdFusion",
  ];

  const tools = [
    "PowerBI",
    "Power Automate",
    "SSRS",
    "SSIS",
    "ETL Process",
    "Redis Cache",
    "AmChart",
    "CanvasJs",
    "Chart.js",
    "Aspose Document Editors",
    "Firebase",
    "Zego Cloud",
    "ProcessMaker",
    "QuestionPro",
    "Selenium Automation",
    "PhantomJS Scraping",
    "HTML2Canvas",
    "NetiMobileDevice",
  ];

  const databases = [
    "SQL Server",
    "SQL Server Profiler",
    "Azure SQL",
    "Azure Storage Table",
    "MySQL",
    "PostgreSQL",
    "AS400",
    "SQLite",
    "CosmosDB",
    "MongoDB",
    "Firebird",
    "Oracle",
  ];

  const collaborationAndOtherSkills = [
    "Android and iOS Development Collaboration",
    "Client Interaction & Requirement Gathering",
    "Team Leadership and Mentoring",
    "Continuous Learning & Adaptability",
    "Open Source Contributions",
    "Technical Documentation",
    "Agile/Scrum Methodologies",
  ];

  const certifications = [
    {
      name: "Microsoft Certified: Azure Solutions Architect Expert",
      link: "https://example.com/azure-architect",
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      link: "https://example.com/azure-developer",
    },
  ];

  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume-elanchezhiyan.pdf"; // You'll need to add this file to the public folder
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
  }: {
    title: string;
    skills: string[];
    icon: any;
    gradient: string;
    description: string;
  }) => (
    <Card className="glass transition-all duration-500 hover:scale-105 border border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-400 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-2">
          <div
            className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-relaxed">
                {skill}
              </span>
            </div>
          ))}
        </div>
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
          content="Learn about Elanchezhiyan P, a seasoned software developer with 5+ years of experience in .NET Core, Azure Cloud, CRM integrations, and modern web technologies. Expert in building scalable, secure applications."
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

      <div className="container mx-auto px-4 py-12 space-y-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto backdrop-blur-xl border border-white/20">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a seasoned software developer with{" "}
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                {yearsOfExperience}+ years
              </span>{" "}
              of experience in building scalable, secure cloud applications. My
              expertise spans across .NET technologies, Azure cloud services,
              CRM integrations, and modern web development frameworks.
            </p>
          </div>
        </section>

        {/* Resume Download Section */}
        <section className="text-center">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto backdrop-blur-xl border border-white/20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Download My Resume
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get a detailed overview of my experience, skills, and achievements
            </p>
            <Button
              onClick={handleResumeDownload}
              className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume PDF
            </Button>
          </div>
        </section>

        {/* Experience Timeline */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>

          {isMobile ? (
            <MobileTimeline experiences={experiences} />
          ) : (
            <div className="relative max-w-6xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-500 to-blue-800 theme-green:from-green-200 theme-green:via-green-500 theme-green:to-green-800 rounded-full shadow-lg"></div>

                <div className="space-y-16">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      } relative`}
                    >
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-2xl z-10 border-4 border-white dark:border-gray-900 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="text-sm font-bold">
                            {exp.year.split(" ")[0]}
                          </div>
                          <div className="text-xs opacity-90">
                            {exp.year.split(" ")[1]}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5/12 ${
                          index % 2 === 0 ? "pr-24" : "pl-24"
                        }`}
                      >
                        <div className="glass rounded-3xl p-8 hover-glow transition-all duration-500 hover:scale-105 backdrop-blur-xl border border-gray-300 dark:border-white/20 shadow-md">
                          <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
                              {exp.title}
                            </h3>
                            {exp.type === "promotion" && (
                              <Trophy className="w-6 h-6 text-yellow-500 animate-pulse" />
                            )}
                          </div>
                          <div className="rounded-2xl p-4 mb-6 border border-gray-300 dark:border-white/20 shadow-md bg-gradient-to-r from-blue-100/60 to-indigo-100/60 dark:from-blue-900/30 dark:to-indigo-900/30 theme-green:from-green-100/60 theme-green:to-emerald-100/60 theme-green:dark:from-green-900/30 theme-green:dark:to-emerald-900/30">
                            {exp.companyWebsite ? (
                              <a
                                href={exp.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 inline-flex items-center gap-2 hover:underline"
                              >
                                <ExternalLink className="w-4 h-4" />
                                {exp.companyWebsite}
                              </a>
                            ) : (
                              <span className="text-lg font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
                                {exp.companyWebsite}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500 text-sm">
                              {exp.location}
                            </span>
                          </div>
                          {exp.intro && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
                              {exp.intro}
                            </p>
                          )}
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 theme-green:from-green-500 theme-green:to-emerald-500 text-white shadow-lg">
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
            </div>
          )}
        </section>

        {/* Technical Expertise Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-300 to-purple-600 theme-green:from-green-300 theme-green:to-emerald-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>

          <div className="space-y-12">
            <SkillCard
              title="CRM Integrations"
              description="Seamless integration with leading CRM platforms"
              skills={crmIntegrations}
              icon={Zap}
              gradient="from-orange-500 to-red-600"
            />

            <SkillCard
              title=".NET Applications"
              description="Full-stack development with Microsoft technologies"
              skills={dotnetSkills}
              icon={Code}
              gradient="from-blue-500 to-purple-600"
            />

            <SkillCard
              title="Tools & Technologies"
              description="Modern development and integration tools"
              skills={tools}
              icon={Wrench}
              gradient="from-green-500 to-teal-600"
            />

            <SkillCard
              title="Databases"
              description="Multi-database expertise and management"
              skills={databases}
              icon={Database}
              gradient="from-yellow-500 to-orange-600"
            />

            <SkillCard
              title="Collaboration & Soft Skills"
              description="Effective communication and team leadership"
              skills={collaborationAndOtherSkills}
              icon={Brain}
              gradient="from-pink-500 to-purple-600"
            />
          </div>
        </section>

        {/* Freelance Services Section */}
        <section>
          <div className="glass rounded-3xl p-12 backdrop-blur-xl border border-white/20 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
            <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Available for Freelance Projects
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto text-center">
              I offer comprehensive software development services including .NET
              applications, Azure cloud solutions, CRM integrations, and custom
              web applications. Check out my portfolio to see my recent work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a href="/projects">View My Projects</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-blue-600 theme-green:border-green-600 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <a href="/contact">Hire Me</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-3xl p-8 flex items-center justify-between hover:scale-105 transition-all duration-500 hover-glow backdrop-blur-xl border border-white/20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20"
              >
                <div className="flex items-center gap-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-500" />
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="glass rounded-3xl p-12 backdrop-blur-xl border border-white/20 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              With extensive experience across multiple technologies and
              industries, I'm ready to help bring your vision to life.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105">
              Let's Connect
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
