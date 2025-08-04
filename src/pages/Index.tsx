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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
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

const Index = () => {
  // Infinite carousel logic
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 (first real slide)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const featuredProjects = projectsData.filter((project) => project.featured);
  // For infinite loop, clone first and last
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
    }, 500); // match transition duration
    return () => clearTimeout(handle);
  }, [currentSlide, isTransitioning, featuredProjects.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 pb-16 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Hi, I'm Elanchezhiyan
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300 theme-green:text-green-600">
            Seasoned Software Developer
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-3 max-w-xl">
            I build scalable, high-performance software for startups and
            enterprises. Let's turn your ideas into reality.
          </p>
          <div className="flex flex-row gap-3 mb-4">
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow border border-blue-100 dark:border-blue-800 py-3 px-4 min-w-[90px]">
              <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                5.9+
              </span>
              <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                Years
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow border border-blue-100 dark:border-blue-800 py-3 px-4 min-w-[90px]">
              <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                30+
              </span>
              <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                Projects
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow border border-blue-100 dark:border-blue-800 py-3 px-4 min-w-[90px]">
              <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                40%
              </span>
              <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                Improvement
              </span>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-5 py-2 text-base font-semibold rounded-xl shadow-md transition-all duration-300 hover:scale-105"
            >
              <Link to="/projects">View My Work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-5 py-2 text-base font-semibold rounded-xl border-blue-200 dark:border-blue-800 shadow-sm transition duration-200 hover:border-blue-500 theme-green:hover:border-green-500"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end mt-6 md:mt-0">
          <div className="group relative flex items-center justify-center p-0 md:p-2">
            <img
              src="/Elan.jpg"
              alt="Elanchezhiyan"
              className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-blue-200 dark:border-blue-800 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105"
            />
          </div>
        </div>
      </section>
      {/* Featured Projects Carousel */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Showcasing scalable solutions and innovative architectures
          </p>
        </div>
        <div
          ref={carouselRef}
          className="relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all duration-500 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
                <Card className="group flex flex-col lg:flex-row overflow-hidden border-none bg-transparent shadow-none">
                  {/* Image Side */}
                  <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-6 lg:p-10">
                    <div className="relative w-full h-64 lg:h-80 flex items-center justify-center">
                      <img
                        src={imageMap[project.id]}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                  {/* Content Side */}
                  <div className="lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-blue-100 dark:border-blue-800">
                        Featured
                      </Badge>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-extrabold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 text-base lg:text-lg leading-relaxed">
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
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border-blue-200 dark:border-blue-800 shadow-sm transition duration-200 hover:border-blue-500 theme-green:hover:border-green-500"
                        asChild
                      >
                        <a
                          href={project.links?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition duration-200 inline-flex items-center gap-2"
                        asChild
                      >
                        <a
                          href={project.links?.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          {/* Navigation Buttons - always visible */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-blue-100 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900/30 transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-blue-100 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900/30 transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index + 1)}
                className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 ${
                  index + 1 === currentSlide
                    ? "bg-blue-600 border-blue-600 theme-green:bg-green-600 theme-green:border-green-600"
                    : "bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:bg-blue-200 dark:hover:bg-blue-800/40 theme-green:hover:bg-green-200 theme-green:dark:hover:bg-green-800/40"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Services/Skills Preview */}
      <section className="container mx-auto px-4">
        <div className="text-center mt-10 mb-12">
          <h2 className="text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Specialized in modern cloud-native development
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Full-Stack Development Card */}
          <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500">
            <div className="flex flex-col items-center p-8">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-blue-100 dark:border-blue-900/30 theme-green:border-green-100 theme-green:dark:border-green-900/30 bg-blue-50 dark:bg-blue-900/10 theme-green:bg-green-50 theme-green:dark:bg-green-900/10 transition-colors">
                <Code className="w-8 h-8 text-blue-600 theme-green:text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors">
                Full-Stack Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
                Building scalable applications with .NET Core, React, and modern
                JavaScript frameworks.
              </p>
            </div>
          </Card>
          {/* Cloud Solutions Card */}
          <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500">
            <div className="flex flex-col items-center p-8">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-blue-100 dark:border-blue-900/30 theme-green:border-green-100 theme-green:dark:border-green-900/30 bg-blue-50 dark:bg-blue-900/10 theme-green:bg-green-50 theme-green:dark:bg-green-900/10 transition-colors">
                <Cloud className="w-8 h-8 text-blue-600 theme-green:text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors">
                Cloud Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
                Azure expertise in App Services, SQL Database, Blob Storage, and
                serverless architectures.
              </p>
            </div>
          </Card>
          {/* DevOps & Automation Card */}
          <Card className="group relative overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 theme-green:hover:border-green-500">
            <div className="flex flex-col items-center p-8">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-blue-100 dark:border-blue-900/30 theme-green:border-green-100 theme-green:dark:border-green-900/30 bg-blue-50 dark:bg-blue-900/10 theme-green:bg-green-50 theme-green:dark:bg-green-900/10 transition-colors">
                <Zap className="w-8 h-8 text-blue-600 theme-green:text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 theme-green:group-hover:text-green-600 transition-colors">
                DevOps & Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
                CI/CD pipelines, Infrastructure as Code, and automated
                deployment strategies.
              </p>
            </div>
          </Card>
        </div>
      </section>
      {/* Call to Action */}
      <section className="text-center my-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 bg-white dark:bg-gray-900 shadow-lg p-10 md:p-14 flex flex-col items-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            🚀 Ready to Build Something Amazing?
          </h3>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 mt-2">
            Let's turn your ideas into reality with robust, scalable, and
            beautiful software solutions.
          </p>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-700 hover:to-purple-700 theme-green:hover:from-green-700 theme-green:hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 hover:scale-105">
              Let's Connect
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
