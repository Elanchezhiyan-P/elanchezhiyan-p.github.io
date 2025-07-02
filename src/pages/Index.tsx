import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Cloud,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import projectsData from "@/data/projects.json";

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
      <title>
        Elanchezhiyan P - Seasoned Software Developer | .NET & Azure Expert
      </title>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">
                <span className="block">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-500 bg-clip-text text-transparent leading-tight">
                  Elanchezhiyan P
                </span>
              </h1>
              <div className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 space-y-2">
                <p className="font-semibold">Seasoned Software Developer</p>
                <p>
                  {yearsOfExperience}+ years of experience architecting scalable
                  and secure cloud applications.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover-glow"
                >
                  View My Work
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 theme-green:border-green-600 theme-green:text-green-600 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/20 hover-glow"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 md:gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 theme-green:text-green-600">
                  {yearsOfExperience}+
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 theme-green:text-green-600">
                  30+
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 theme-green:text-green-600">
                  40%
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Performance Improvement
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600 p-1 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/25 theme-green:group-hover:shadow-green-500/25">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="../public/Elan.jpg"
                    alt="Elanchezhiyan P"
                    className="w-full h-full rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-110"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse"></div>

              {/* Floating elements around image */}
              <div
                className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500/30 theme-green:bg-green-500/30 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-4 -left-6 w-4 h-4 bg-purple-500/40 theme-green:bg-emerald-500/40 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 -right-8 w-5 h-5 bg-indigo-500/35 theme-green:bg-teal-500/35 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
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
          className="relative overflow-hidden rounded-2xl glass hover-glow border border-gray-300 dark:border-gray-600 shadow-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredProjects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={imageMap[project.id]}
                      alt={project.title}
                      className="w-full h-64 lg:h-96 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 theme-green:bg-green-100 theme-green:dark:bg-green-900/30 theme-green:text-green-800 theme-green:dark:text-green-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.links?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                      >
                        View Code
                      </a>
                      <a
                        href={project.links?.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-blue-600 theme-green:bg-green-600"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
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
          <div className="glass rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 group hover-glow border border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 theme-green:bg-green-100 theme-green:dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 theme-green:group-hover:bg-green-200 theme-green:dark:group-hover:bg-green-800/50 transition-colors">
              <Code className="w-8 h-8 text-blue-600 theme-green:text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Full-Stack Development
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Building scalable applications with .NET Core, React, and modern
              JavaScript frameworks.
            </p>
          </div>

          <div className="glass rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 group hover-glow border border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 theme-green:bg-green-100 theme-green:dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 theme-green:group-hover:bg-green-200 theme-green:dark:group-hover:bg-green-800/50 transition-colors">
              <Cloud className="w-8 h-8 text-blue-600 theme-green:text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Cloud Solutions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Azure expertise in App Services, SQL Database, Blob Storage, and
              serverless architectures.
            </p>
          </div>

          <div className="glass rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 group hover-glow border border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 theme-green:bg-green-100 theme-green:dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 theme-green:group-hover:bg-green-200 theme-green:dark:group-hover:bg-green-800/50 transition-colors">
              <Zap className="w-8 h-8 text-blue-600 theme-green:text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">DevOps & Automation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              CI/CD pipelines, Infrastructure as Code, and automated deployment
              strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 mt-12">
        <div className="glass rounded-2xl p-4 text-center hover-glow border border-gray-200 dark:border-gray-700 shadow-md bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your next project and create scalable, secure
            solutions that drive your business forward.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white px-8 py-4 text-lg hover-glow"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
