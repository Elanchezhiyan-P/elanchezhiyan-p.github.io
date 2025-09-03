import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Cloud,
  Zap,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  User,
  Briefcase,
  MessageSquare,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import projectsData from "@/data/projects.json";
import { topmateServices } from "@/data/topmateServices";
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
import IcsImage from "@/assets/project/ics_temp.jpg";
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
import AnjaneyasAssociatesImage from "@/assets/project/anjaneyasassociates.png";

const Index = () => {
  // Infinite carousel logic
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const featuredProjects = projectsData.filter((project) => project.featured);
  const extendedProjects = [
    featuredProjects[featuredProjects.length - 1],
    ...featuredProjects,
    featuredProjects[0],
  ];
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
    "anjaneyas-associates": AnjaneyasAssociatesImage,
  };

  // Detect mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile || !isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, featuredProjects.length, isMobile]);

  // Swipe/drag gesture support
  const carouselRef = React.useRef(null);
  const dragState = React.useRef({
    startX: 0,
    isDragging: false,
    lastX: 0,
  });

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleTouchStart = (e) => {
      dragState.current.isDragging = true;
      dragState.current.startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      if (!dragState.current.isDragging) return;
      dragState.current.lastX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (!dragState.current.isDragging) return;
      const deltaX = dragState.current.lastX - dragState.current.startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) nextSlide();
        else prevSlide();
      }
      dragState.current.isDragging = false;
      dragState.current.startX = 0;
      dragState.current.lastX = 0;
    };

    // Mouse drag for desktop
    const handleMouseDown = (e) => {
      dragState.current.isDragging = true;
      dragState.current.startX = e.clientX;
    };
    const handleMouseMove = (e) => {
      if (!dragState.current.isDragging) return;
      dragState.current.lastX = e.clientX;
    };
    const handleMouseUp = () => {
      if (!dragState.current.isDragging) return;
      const deltaX = dragState.current.lastX - dragState.current.startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) nextSlide();
        else prevSlide();
      }
      dragState.current.isDragging = false;
      dragState.current.startX = 0;
      dragState.current.lastX = 0;
    };

    carousel.addEventListener("touchstart", handleTouchStart);
    carousel.addEventListener("touchmove", handleTouchMove);
    carousel.addEventListener("touchend", handleTouchEnd);
    carousel.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchmove", handleTouchMove);
      carousel.removeEventListener("touchend", handleTouchEnd);
      carousel.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [featuredProjects.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // Handle transition end for infinite loop
  useEffect(() => {
    if (!isTransitioning) return;
    const handle = setTimeout(() => {
      setIsTransitioning(false);
      if (currentSlide === 0) {
        setCurrentSlide(featuredProjects.length);
      } else if (currentSlide === featuredProjects.length + 1) {
        setCurrentSlide(1);
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [currentSlide, isTransitioning, featuredProjects.length]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 overflow-x-hidden relative z-10"
      role="main"
      aria-label="Elanchezhiyan's Portfolio - Software Developer"
    >
      {/* Z-PATTERN SECTION 1: Top-left to Top-right - Header & Key Stats */}
      <section
        className="container mx-auto px-4 pt-10 pb-8"
        aria-labelledby="hero-heading"
        role="region"
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left side - Main heading and intro */}
          <div className="w-full lg:w-2/3 space-y-6">
            <header className="space-y-4">
              <h1
                id="hero-heading"
                className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent"
              >
                Hi, I'm Elanchezhiyan
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-600">
                Seasoned Software Developer
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                I build scalable, high-performance software for startups and
                enterprises. Let's turn your ideas into reality with robust,
                scalable, and beautiful solutions.
              </p>
            </header>

            {/* Key stats - positioned for Z-pattern flow */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div
                className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-800 py-4 px-3 min-h-[100px]"
                role="region"
                aria-label="Years of Experience"
              >
                <Award
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 theme-green:text-green-600 mb-2"
                  aria-hidden="true"
                />
                <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  {yearsOfExperience}+
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 mt-1 text-center">
                  Years
                </span>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-800 py-4 px-3 min-h-[100px]"
                role="region"
                aria-label="Projects Completed"
              >
                <Briefcase
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 theme-green:text-green-600 mb-2"
                  aria-hidden="true"
                />
                <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  30+
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 mt-1 text-center">
                  Projects
                </span>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-800 py-4 px-3 min-h-[100px]"
                role="region"
                aria-label="Performance Improvement"
              >
                <TrendingUp
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 theme-green:text-green-600 mb-2"
                  aria-hidden="true"
                />
                <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  40%
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 mt-1 text-center">
                  Improvement
                </span>
              </div>
            </div>

            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
                aria-label="View my portfolio projects"
              >
                <Link to="/projects">View My Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-3 text-lg font-semibold rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-lg transition duration-200 hover:border-blue-500 theme-green:hover:border-green-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
                aria-label="Contact me for collaboration"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-end">
            <div className="group relative flex items-center justify-center p-4">
              <img
                src="/Elan.jpg"
                alt="Elanchezhiyan - Professional headshot"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-2xl border-4 border-blue-200 dark:border-blue-800 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Z-PATTERN SECTION 2: Diagonal down-left - Services & Skills */}
      <section
        className="container mx-auto px-4 py-16"
        aria-labelledby="services-heading"
        role="region"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1200px" as any,
        }}
      >
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            What I Do
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Specialized in modern cloud-native development with expertise across
            the full technology stack
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Full-Stack Development Card */}
          <Card
            data-particle-mask
            className="group relative overflow-hidden border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500 focus-within:ring-4 focus-within:ring-blue-300 dark:focus-within:ring-blue-600"
            role="article"
            aria-labelledby="fullstack-title"
          >
            <div className="flex flex-col items-center p-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full border-2 border-blue-100 dark:border-blue-900/30 theme-green:border-green-100 theme-green:dark:border-green-900/30 bg-blue-50 dark:bg-blue-900/10 theme-green:bg-green-50 theme-green:dark:bg-green-900/10 transition-colors">
                <Code
                  className="w-10 h-10 text-blue-600 theme-green:text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3
                id="fullstack-title"
                className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors"
              >
                Full-Stack Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Building scalable applications with .NET Core, React, and modern
                JavaScript frameworks.
              </p>
            </div>
          </Card>

          {/* Cloud Solutions Card */}
          <Card
            data-particle-mask
            className="group relative overflow-hidden border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500 focus-within:ring-4 focus-within:ring-blue-300 dark:focus-within:ring-blue-600"
            role="article"
            aria-labelledby="cloud-title"
          >
            <div className="flex flex-col items-center p-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full border-2 border-blue-100 dark:border-blue-900/30 theme-green:border-green-100 theme-green:dark:border-green-900/30 bg-blue-50 dark:bg-blue-900/10 theme-green:bg-green-50 theme-green:dark:bg-green-900/10 transition-colors">
                <Cloud
                  className="w-10 h-10 text-blue-600 theme-green:text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3
                id="cloud-title"
                className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors"
              >
                Cloud Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Azure expertise in App Services, SQL Database, Blob Storage, and
                serverless architectures.
              </p>
            </div>
          </Card>

          {/* DevOps & Automation Card */}
          <Card
            data-particle-mask
            className="group relative overflow-hidden border-2 border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500 focus-within:ring-4 focus-within:ring-blue-300 dark:focus-within:ring-blue-600"
            role="article"
            aria-labelledby="devops-title"
          >
            <div className="flex flex-col items-center p-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full border-2 border-blue-100 dark:border-blue-900/30 theme-green:border-green-100 theme-green:dark:border-green-900/30 bg-blue-50 dark:bg-blue-900/10 theme-green:bg-green-50 theme-green:dark:bg-green-900/10 transition-colors">
                <Zap
                  className="w-10 h-10 text-blue-600 theme-green:text-green-600"
                  aria-hidden="true"
                />
              </div>
              <h3
                id="devops-title"
                className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors"
              >
                DevOps & Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                CI/CD pipelines, Infrastructure as Code, and automated
                deployment strategies.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Z-PATTERN SECTION 3: Bottom-left to Bottom-right - Featured Projects */}
      <section
        className="container mx-auto px-4 py-16"
        aria-labelledby="projects-heading"
        role="region"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1200px" as any,
        }}
      >
        <div className="text-center mb-12">
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Showcasing scalable solutions and innovative architectures
          </p>
        </div>

        <div
          ref={carouselRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 transition-all duration-500 select-none mx-2 md:mx-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="region"
          aria-label="Featured projects carousel"
        >
          <div
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {extendedProjects.map((project, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <Card
                  data-particle-mask
                  className="group flex flex-col lg:flex-row overflow-hidden border-none bg-transparent shadow-none"
                >
                  {/* Image Side */}
                  <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4 md:p-6 lg:p-10">
                    <div className="relative w-full h-48 md:h-64 lg:h-80 flex items-center justify-center">
                      <img
                        src={imageMap[project.id]}
                        alt={`${project.title} - Project screenshot`}
                        className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                  {/* Content Side */}
                  <div className="lg:w-1/2 flex flex-col justify-center p-6 md:p-8 lg:p-12">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-blue-100 dark:border-blue-800">
                        Featured
                      </Badge>
                      {project.status && (
                        <Badge className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-orange-100 dark:border-orange-800">
                          {project.status}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm md:text-base lg:text-lg leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-2">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border-2 border-blue-200 dark:border-blue-800 shadow-md transition duration-200 hover:border-blue-500 theme-green:hover:border-green-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
                        asChild
                      >
                        <a
                          href={project.links?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View source code for ${project.title}`}
                        >
                          <Github className="h-4 w-4" aria-hidden="true" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition duration-200 inline-flex items-center gap-2 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
                        asChild
                      >
                        <a
                          href={project.links?.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - responsive positioning for mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900/30 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 z-10"
            aria-label="Previous project"
            tabIndex={0}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-800/30 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 z-10"
            aria-label="Next project"
            tabIndex={0}
          >
            <ChevronRight
              className="w-5 h-5 md:w-6 md:h-6"
              aria-hidden="true"
            />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index + 1)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 theme-green:focus:ring-green-400 ${
                  index + 1 === currentSlide
                    ? "bg-blue-600 border-blue-600 theme-green:bg-green-600 theme-green:border-green-600"
                    : "bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:bg-blue-200 dark:hover:bg-blue-800/40 theme-green:hover:bg-green-200 theme-green:dark:hover:bg-green-800/40"
                }`}
                aria-label={`Go to project ${index + 1}`}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Z-PATTERN SECTION 4: Bottom-right - Professional Services */}
      <section
        className="container mx-auto px-4 py-16"
        aria-labelledby="services-professional-heading"
        role="region"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1200px" as any,
        }}
      >
        <div className="text-center mb-12">
          <h2
            id="services-professional-heading"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Professional Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get personalized guidance and support for your career and projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {topmateServices.slice(0, 6).map((service) => (
            <Card
              data-particle-mask
              key={service.id}
              className="group relative overflow-hidden border-2 border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500 focus-within:ring-4 focus-within:ring-blue-300 dark:focus-within:ring-blue-600"
              tabIndex={0}
              role="article"
              aria-labelledby={`service-${service.id}-title`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3
                      id={`service-${service.id}-title`}
                      className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors line-clamp-2"
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
                >
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                    aria-label={`Book ${service.title} service`}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
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
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/20 theme-green:border-green-600 theme-green:text-green-600 theme-green:hover:bg-green-50 theme-green:dark:border-green-400 theme-green:dark:text-green-400 theme-green:dark:hover:bg-green-950/20 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
          >
            <a
              href="https://topmate.io/elanchezhiyan_poosamani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-auto px-8 py-3 text-lg font-semibold rounded-xl"
              aria-label="View all services on Topmate"
            >
              View All Services
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      {/* Z-PATTERN FINAL: Bottom Call to Action */}
      <section
        className="text-center my-16"
        aria-labelledby="cta-heading"
        role="region"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "800px" as any,
        }}
      >
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 bg-white dark:bg-gray-900 shadow-2xl p-10 md:p-14 flex flex-col items-center">
          <h3
            id="cta-heading"
            className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent"
          >
            <span role="img" aria-label="rocket" className="text-4xl">
              🚀
            </span>
            Ready to Build Something Amazing?
          </h3>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 mt-2 max-w-2xl">
            Let's turn your ideas into reality with robust, scalable, and
            beautiful software solutions.
          </p>
          <Link to="/contact">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
              aria-label="Contact me to start your project"
            >
              Let's Connect
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
