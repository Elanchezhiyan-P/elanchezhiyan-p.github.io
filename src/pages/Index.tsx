import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Code,
  Cloud,
  Zap,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Database,
  Shield,
  Rocket,
  CheckCircle2,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import { useCountUp } from "@/hooks/useCountUp";
import { trackBookCall, trackProjectView, trackCertificationClick } from "@/utils/analytics";
import { ResumeLeadMagnet } from "@/components/ResumeLeadMagnet";
import projectsData from "@/data/projects.json";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import SeahorseImage from "@/assets/project/Seahorse.png";
import MpsImage from "@/assets/project/MPS.jpg";
import QueryBuilderImage from "@/assets/project/Querybuilder.png";
import IcsImage from "@/assets/project/ics.jpg";
import ScoutImage from "@/assets/project/Scout.jpg";
import IOSBackupToolImage from "@/assets/project/Scout-iOS.png";
import Qliq1sImage from "@/assets/project/Qliq1s.jpg";
import ExpertConnectImage from "@/assets/project/expertconnectlegal.png";
import KuralInsightsImage from "@/assets/project/kural-insights.png";
import GitHubUserSearchImage from "@/assets/project/github-user-search.png";
import WorldCountryExplorerImage from "@/assets/project/WorldCountryExplorer.png";
import TamilSongDownloaderImage from "@/assets/project/tamilsongdownloader.png";
import BlogSubscriptionImage from "@/assets/project/BlogSubscriptionSystem.png";
import SSOIntegrationImage from "@/assets/project/SSOIntegration.png";
import NetimobiledeviceImage from "@/assets/project/Netimobiledevice.png";
import HeicJpegToolkitImage from "@/assets/project/HeicJpegToolkit.png";
import ArcticCodeImage from "@/assets/project/arctic-code.png";
import TeleMedixImage from "@/assets/project/telemedix.png";
import InvoicePilotImage from "@/assets/project/invoice-pdf-image.png";
import GoHighLevelImage from "@/assets/project/GoHighLevelImage.png";
import ClinicalDischargePdfImage from "@/assets/project/ClinicalDischargePdf.png";
import SmartFinanceSystemImage from "@/assets/project/SmartFinanceSystem.png";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredProjects = projectsData.filter((project) => project.featured);
  const yearsOfExperience = calculateYearsOfExperience();

  const imageMap = {
    "seahorse-analytics": SeahorseImage,
    "mps-finance": MpsImage,
    "query-builder": QueryBuilderImage,
    ics: IcsImage,
    remotecom: ScoutImage,
    "ios-backup-tool": IOSBackupToolImage,
    qliq1s: Qliq1sImage,
    "expert-connect-legal": ExpertConnectImage,
    "kural-insights": KuralInsightsImage,
    "gitHub-user-search": GitHubUserSearchImage,
    "world-country-explorer": WorldCountryExplorerImage,
    "tamil-song-downloader": TamilSongDownloaderImage,
    "blog-subscription-system": BlogSubscriptionImage,
    SSOIntegrationSolution: SSOIntegrationImage,
    Netimobiledevice: NetimobiledeviceImage,
    HeicJpegToolkit: HeicJpegToolkitImage,
    ArcticCodeVaultContributor: ArcticCodeImage,
    telemedix: TeleMedixImage,
    "invoice-pilot": InvoicePilotImage,
    ghl: GoHighLevelImage,
    "clinical-discharge-pdf-engine": ClinicalDischargePdfImage,
    "smart-finance-system": SmartFinanceSystemImage,
    "python-package-visualizer": "https://raw.githubusercontent.com/Elanchezhiyan-P/python-package-visualizer/main/media/screenshots/dashboard.png",
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, featuredProjects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  return (
    <div className="space-y">
      <Helmet>
        <title>Elanchezhiyan P - Seasoned Software Developer | .NET &amp; Azure Expert</title>
        <meta
          name="description"
          content={`Hire Elanchezhiyan P — Senior .NET & Azure Developer, ${yearsOfExperience}+ yrs exp. Available for full-time, contract & freelance. Cloud, DevOps, React.`}
        />
        <meta
          name="keywords"
          content="Hire .NET Developer, Senior Azure Developer, Freelance C# Developer, Full Stack Developer India, .NET Developer for Hire, Azure Cloud Consultant, Remote Developer, DevOps Engineer, React Developer"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/" />
      </Helmet>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="flex-1 space-y-4 animate-fade-in-up">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 mb-2 animate-fade-in">
                <div className="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700">
                  <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                    Open to Opportunities — Full-time / Contract / Freelance
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                <span className="block text-gray-800 dark:text-gray-200 mb-1">
                  Hi, I'm{" "}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-500 bg-clip-text text-transparent animate-gradient">
                  Elanchezhiyan P
                </span>
                <span className="sr-only"> — Senior .NET &amp; Azure Developer</span>
              </h1>
              <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 space-y-1.5">
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  Seasoned Software Developer
                </p>
                <p className="leading-relaxed">
                  B.E (Bachelor of Engineering) graduate with{" "}
                  <span className="font-semibold text-blue-600 theme-green:text-green-600">
                    {yearsOfExperience}+ years
                  </span>{" "}
                  of experience architecting scalable and secure cloud applications.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 theme-green:from-green-600 theme-green:via-green-700 theme-green:to-emerald-700 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 theme-green:hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 theme-green:from-green-700 theme-green:via-emerald-700 theme-green:to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <a
                href="https://topmate.io/elanchezhiyan_poosamani"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBookCall}
              >
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Call
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="group px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white theme-green:border-green-600 theme-green:text-green-600 theme-green:hover:bg-green-600 theme-green:hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Animated Quick Stats */}
            <AnimatedStats yearsOfExperience={yearsOfExperience} />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative group animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 p-1.5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/40 theme-green:group-hover:shadow-green-500/40 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src="/Elan.jpg"
                    alt="Elanchezhiyan P"
                    width={224}
                    height={224}
                    fetchPriority="high"
                    className="w-full h-full rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-110"
                  />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Showcase */}
      <section className="container mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            Core Technologies
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
          {[
            { name: ".NET", icon: "💻" },
            { name: "React", icon: "⚛️" },
            { name: "Azure", icon: "☁️" },
            { name: "SQL", icon: "🗄️" },
            { name: "TypeScript", icon: "📘", shortName: "TS" },
            { name: "Docker", icon: "🐳" },
            { name: "Git", icon: "🔀" },
            { name: "API", icon: "🔌" },
          ].map((tech, index) => (
            <div
              key={index}
              className="group glass rounded-xl p-2 sm:p-3 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg text-center min-w-0"
            >
              <div className="text-xl sm:text-2xl mb-1">{tech.icon}</div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 break-words overflow-hidden">
                <span className="hidden sm:inline">{tech.name}</span>
                <span className="sm:hidden">{tech.shortName || tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Achievements */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-3">
          {[
            {
              icon: <TrendingUp className="w-5 h-5" />,
              title: "Performance Optimized",
              desc: "40% improvement average",
            },
            {
              icon: <Shield className="w-5 h-5" />,
              title: "Secure by Design",
              desc: "Enterprise-grade security",
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 theme-green:from-green-500 theme-green:to-emerald-600 flex items-center justify-center text-white shadow-md">
                  {achievement.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {achievement.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {achievement.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="container mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 mb-2">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
              ⭐ Featured Work
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">
            Showcasing scalable solutions and innovative architectures
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border-2 border-gray-200/50 dark:border-gray-800/50 transition-all duration-500 hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 card-lift"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredProjects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <Card className="group flex flex-col lg:flex-row overflow-hidden border-none bg-transparent shadow-none">
                  {/* Image Side */}
                  <div className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 lg:p-6">
                    <div className="relative w-full h-48 lg:h-64 flex items-center justify-center group/image">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 theme-green:from-green-500/20 theme-green:via-emerald-500/20 theme-green:to-teal-500/20 rounded-2xl blur-xl group-hover/image:opacity-75 transition-opacity duration-500"></div>
                      <img
                        src={imageMap[project.id]}
                        alt={project.title}
                        loading="lazy"
                        className="relative w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-2xl"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                  {/* Content Side */}
                  <div className="lg:w-1/2 flex flex-col justify-center p-4 lg:p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 theme-green:from-green-100 theme-green:to-emerald-100 theme-green:dark:from-green-900/30 theme-green:dark:to-emerald-900/30 text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border-2 border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 shadow-sm">
                        ⭐ Featured
                      </Badge>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-extrabold mb-2 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 theme-green:group-hover:from-green-600 theme-green:group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 text-xs lg:text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2.5 py-0.5 rounded-lg text-xs font-semibold border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:border-blue-300 dark:hover:border-blue-600 theme-green:hover:border-green-300 theme-green:dark:hover:border-green-600 hover:scale-105 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-1">
                      {project.links?.github && (
                        <Button
                          variant="outline"
                          className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-blue-300 dark:border-blue-700 theme-green:border-green-300 theme-green:dark:border-green-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/20"
                          asChild
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                            View Code
                          </a>
                        </Button>
                      )}
                      {project.links?.live && project.links.live !== "#" && (
                        <Button
                          className="group/btn bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 theme-green:hover:from-green-700 theme-green:hover:via-emerald-700 theme-green:hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 hover:scale-105"
                          asChild
                        >
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-[30%] md:top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/30 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-[30%] md:top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/30 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 ${
                  index === currentSlide
                    ? "bg-blue-600 theme-green:bg-green-600 w-8 scale-110 shadow-md"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500 theme-green:hover:bg-green-400 theme-green:dark:hover:bg-green-500 hover:scale-110"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services/Skills Preview */}
      <section className="container mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 mb-2">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
              Services & Expertise
            </span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            What I Do
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Specialized in modern cloud-native development and scalable
            solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 lg:gap-4">
          {/* Full-Stack Development Card */}
          <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-3 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 card-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:via-emerald-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl"></div>
            <div className="relative flex flex-col items-center p-4">
              <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 theme-green:from-green-500 theme-green:to-emerald-600 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Code className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 theme-green:group-hover:from-green-600 theme-green:group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Full-Stack Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                Building scalable applications with .NET Core, React, and modern
                JavaScript frameworks.
              </p>
            </div>
          </Card>

          {/* Cloud Solutions Card */}
          <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-3 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 card-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:via-emerald-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl"></div>
            <div className="relative flex flex-col items-center p-4">
              <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Cloud className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 theme-green:group-hover:from-green-600 theme-green:group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Cloud Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                Azure expertise in App Services, SQL Database, Blob Storage, and
                serverless architectures.
              </p>
            </div>
          </Card>

          {/* DevOps & Automation Card */}
          <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-3 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 card-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:via-emerald-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl"></div>
            <div className="relative flex flex-col items-center p-4">
              <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 theme-green:from-emerald-500 theme-green:to-teal-600 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 theme-green:group-hover:from-emerald-600 theme-green:group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                DevOps & Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                CI/CD pipelines, Infrastructure as Code, and automated
                deployment strategies.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section className="container mx-auto px-4 pt-8 pb-4 relative z-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent relative z-10">
          Certifications & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 max-w-7xl mx-auto items-stretch">
          {[
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
          ].map((cert, index) => (
            <Card
              key={cert.name}
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 relative z-10 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 w-full min-w-0"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 theme-green:from-green-500 theme-green:to-emerald-500 rounded-t-xl"></div>

              <CardContent className="p-4 md:p-6 min-w-0">
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
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-3 gap-3">
          <Link to="/about">
            <div className="glass rounded-xl p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 theme-green:from-green-500 theme-green:to-emerald-600 flex items-center justify-center text-white shadow-md">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    About Me
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Learn more about my journey
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/blog">
            <div className="glass rounded-xl p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 theme-green:from-emerald-500 theme-green:to-teal-600 flex items-center justify-center text-white shadow-md">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Blog Posts
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Read my latest articles
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/testimonials">
            <div className="glass rounded-xl p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 theme-green:from-teal-500 theme-green:to-emerald-600 flex items-center justify-center text-white shadow-md">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Testimonials
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    See what clients say
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Resume Lead Magnet */}
      <section className="container mx-auto px-4 py-4">
        <div className="max-w-xl mx-auto">
          <ResumeLeadMagnet />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-4 md:py-6">
        <div className="relative mx-auto max-w-3xl">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 theme-green:from-green-500/10 theme-green:via-emerald-500/10 theme-green:to-teal-500/10 rounded-3xl blur-3xl"></div>

          <div className="relative glass rounded-3xl border-2 border-blue-300/50 dark:border-blue-700/50 theme-green:border-green-300/50 theme-green:dark:border-green-700/50 shadow-2xl p-5 md:p-6 flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <span className="text-xl md:text-2xl">🚀</span>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-4 max-w-2xl leading-relaxed">
              Let's turn your ideas into reality with robust, scalable, and
              beautiful software solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 theme-green:hover:from-green-700 theme-green:hover:via-emerald-700 theme-green:hover:to-teal-700 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Connect
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 theme-green:from-green-700 theme-green:via-emerald-700 theme-green:to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <a
                href="https://topmate.io/elanchezhiyan_poosamani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="group px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    Book a Free Call
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Animated Stats Component with counting animation
const AnimatedStats: React.FC<{ yearsOfExperience: number }> = ({
  yearsOfExperience,
}) => {
  const yearsCounter = useCountUp({
    end: Math.floor(yearsOfExperience),
    duration: 2000,
    suffix: "+",
  });
  const projectsCounter = useCountUp({
    end: 30,
    duration: 2200,
    suffix: "+",
  });
  const performanceCounter = useCountUp({
    end: 40,
    duration: 1800,
    suffix: "%",
  });

  const stats = [
    {
      ...yearsCounter,
      label: "Years Experience",
      icon: "🎯",
    },
    {
      ...projectsCounter,
      label: "Projects Completed",
      icon: "🚀",
    },
    {
      ...performanceCounter,
      label: "Performance Improvement",
      icon: "⚡",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 md:gap-4 pt-3">
      {stats.map((stat, index) => (
        <div key={index} className="group relative" ref={stat.ref}>
          <div className="glass rounded-xl p-3 md:p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.displayValue}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
