import React, { useState, useEffect } from "react";
import {
  MapPin,
  Trophy,
  ExternalLink,
  Download,
} from "lucide-react";
import { SiDotnet, SiJira, SiCpanel } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import { MobileTimeline } from "@/components/MobileTimeline";
import TechExpertise from "@/components/TechExpertise";
import CertCard from "@/components/CertCard";
import type { CertDef } from "@/components/CertCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// ─── Page Component ───────────────────────────────────────────────────────────
const About = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
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
      year: "2021 May",
      title: "Dotnet Developer",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "job" as const,
      intro:
        "Focused on .NET Core and Azure to develop scalable web applications and REST APIs for business clients.",
      description:
        "Built and maintained REST APIs using .NET Core, working across the SDLC on production systems for global clients.",
      companyWebsite: "https://aitechindia.com",
    },
    {
      year: "2023 Feb",
      title: "Development Team Lead",
      company: "App Innovation Technologies",
      location: "Coimbatore, Tamil Nadu, India",
      type: "promotion" as const,
      intro:
        "Promoted to lead a team of developers, taking on architecture decisions, code reviews, and technical mentoring.",
      description:
        "Currently leading a development team, architecting scalable cloud solutions and driving REST API performance and reliability improvements for global clients.",
      companyWebsite: "https://aitechindia.com",
    },
  ];

  const certifications: CertDef[] = [
    {
      name: ".NET Full Stack Developer - C# Corner",
      issuer: "C# Corner",
      date: "May 2025",
      link: "https://www.c-sharpcorner.com/uploadfile/certification-exam/rzmmaqtc/certification.pdf?trk=public_profile_see-credential",
      Icon: SiDotnet,
      gradientFrom: "from-violet-600",
      gradientTo: "to-indigo-700",
      glowColor: "#7C3AED",
      category: "Development",
    },
    {
      name: "Foundational C# with Microsoft",
      issuer: "freeCodeCamp",
      date: "Feb 2025",
      credentialId: "elanchezhiyan-p-fcswm",
      link: "https://freecodecamp.org/certification/Elanchezhiyan-P/foundational-c-sharp-with-microsoft?trk=public_profile_see-credential",
      badge: "fCC",
      gradientFrom: "from-green-600",
      gradientTo: "to-emerald-700",
      glowColor: "#10B981",
      category: "Programming",
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "Feb 2025",
      credentialId: "elanchezhiyan-p-rwd",
      link: "https://www.freecodecamp.org/certification/Elanchezhiyan-P/responsive-web-design?trk=public_profile_see-credential",
      badge: "RWD",
      gradientFrom: "from-sky-500",
      gradientTo: "to-blue-700",
      glowColor: "#0EA5E9",
      category: "Web Design",
    },
    {
      name: "Jira Fundamentals Badge",
      issuer: "Atlassian",
      date: "Feb 2024",
      credentialId: "299136941",
      link: "https://university.atlassian.com/student/award/17WcnErMoSR8bgZ9hsN3hSTw?trk=public_profile_see-credential",
      Icon: SiJira,
      gradientFrom: "from-blue-600",
      gradientTo: "to-blue-800",
      glowColor: "#0052CC",      category: "Project Management",
    },
    {
      name: "cPanel User Interface Proficiency",
      issuer: "cPanel University",
      date: "Jan 2025",
      credentialId: "851a-2616-8f92-f311",
      link: "https://university.cpanel.net/?trk=public_profile_see-credential",
      Icon: SiCpanel,
      gradientFrom: "from-orange-500",
      gradientTo: "to-orange-700",
      glowColor: "#F97316",
      category: "Infrastructure",
    },
    {
      name: "IronPDF Writing Contest — Runner-Up",
      issuer: "Iron Software",
      date: "Apr 2026",
      link: "https://www.linkedin.com/pulse/meet-winners-ironpdf-writing-contest-ironsoftware-qzvjc",
      badge: "🏆",
      gradientFrom: "from-amber-500",
      gradientTo: "to-yellow-600",
      glowColor: "#F59E0B",
      category: "Writing Award",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`About Elanchezhiyan P — Senior .NET & Azure Engineer | ${yearsOfExperience}+ Years`}</title>
        <meta
          name="description"
          content={`Elanchezhiyan P is a Senior .NET & Azure Engineer with ${yearsOfExperience}+ years of experience building enterprise SaaS platforms, IoT systems, CRM integrations (NetSuite, HubSpot, ConnectWise), and cloud-native APIs.`}
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
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-4xl mx-auto backdrop-blur-xl border border-white/20 space-y-4">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I specialise in{" "}
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                .NET and Azure
              </span>{" "}
              — building everything from ERP integrations (NetSuite, HubSpot, ConnectWise)
              and IoT control systems to multi-tenant analytics platforms and high-throughput APIs.
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Over{" "}
              <span className="font-bold text-blue-600 theme-green:text-green-600">
                {yearsOfExperience}+ years
              </span>{" "}
              at App Innovation Technologies, I progressed from Dotnet Developer to Development
              Team Lead — shipping 30+ production systems, contributing to open-source
              tooling with Arctic Code Vault recognition, and mentoring engineers across
              cloud-native projects.
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
                asChild
                variant="outline"
                className="border-2 border-blue-600 theme-green:border-green-600 text-blue-600 theme-green:text-green-600 hover:bg-blue-50 theme-green:hover:bg-green-50 px-5 md:px-8 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <a href="/resume/Elanchezhiyan_P.pdf" download="Elanchezhiyan_P_Resume.pdf">
                  <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Download Resume PDF
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
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
                              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
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
        <section className="mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 backdrop-blur-xl border border-white/20">
            <TechExpertise />
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent pt-4 md:pt-10">
            Certifications & Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertCard key={cert.name} cert={cert} index={index} />
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
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
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
