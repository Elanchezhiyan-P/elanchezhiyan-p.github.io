import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";

// Lazy-load the Three.js scene so it doesn't block initial render
const Hero3DScene = lazy(() => import("@/components/Hero3DScene"));
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
} from "lucide-react";
import {
  SiDotnet,
  SiReact,
  SiTypescript,
  SiDocker,
  SiGit,
  SiNodedotjs,
  SiGithubactions,
  SiAngular,
  SiJira,
  SiCpanel,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import { useCountUp } from "@/hooks/useCountUp";
import { trackBookCall, trackProjectView, trackCertificationClick } from "@/utils/analytics";
import projectsData from "@/data/projects.json";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { projectImageMap } from "@/utils/imageMap";
import TiltDiv from "@/components/TiltDiv";
import CertCard from "@/components/CertCard";
import type { CertDef } from "@/components/CertCard";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredProjects = projectsData.filter((project) => project.featured);
  const yearsOfExperience = calculateYearsOfExperience();
  const isGreenTheme =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("theme-green");

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
        <title>Elanchezhiyan P — Senior .NET &amp; Azure Engineer | Enterprise SaaS &amp; Cloud</title>
        <meta
          name="description"
          content={`Hire Elanchezhiyan P — Senior .NET & Azure Engineer with ${yearsOfExperience}+ years building enterprise SaaS platforms, IoT systems, CRM integrations, and cloud-native APIs. Available full-time, contract & freelance.`}
        />
        <meta
          name="keywords"
          content="Hire .NET Developer, Senior Azure Engineer, Enterprise SaaS Developer, C# Developer, Full Stack Developer India, Azure Cloud Architect, IoT .NET Developer, CRM Integration Developer, React Developer, Remote .NET Developer"
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
                    Available · Full-time · Contract · Freelance
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                <span className="block text-gray-800 dark:text-gray-200 mb-1">
                  Hi, I'm{" "}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-500 bg-clip-text text-transparent">
                  Elanchezhiyan P
                </span>
              </h1>
              <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 space-y-2">
                <p className="font-bold text-gray-900 dark:text-gray-100 text-lg md:text-xl">
                  Senior .NET &amp; Azure Engineer
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-blue-600 theme-green:text-green-600">
                    {yearsOfExperience}+ years
                  </span>{" "}
                  building enterprise SaaS platforms — IoT integrations, CRM systems,
                  analytics dashboards, and cloud-native APIs.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Primary CTA — full width on mobile */}
              <Link to="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 theme-green:from-green-600 theme-green:via-green-700 theme-green:to-emerald-700 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 theme-green:hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Work
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 theme-green:from-green-700 theme-green:via-emerald-700 theme-green:to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              {/* Secondary CTAs — side by side on mobile */}
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href="https://topmate.io/elanchezhiyan_poosamani"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackBookCall}
                  className="flex-1 sm:flex-initial"
                >
                  <Button
                    size="lg"
                    className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Book a Call
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>
                <Link to="/contact" className="flex-1 sm:flex-initial">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group w-full px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white theme-green:border-green-600 theme-green:text-green-600 theme-green:hover:bg-green-600 theme-green:hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Animated Quick Stats */}
            <AnimatedStats yearsOfExperience={yearsOfExperience} />
          </div>

          <div className="flex-1 flex justify-center relative min-h-[260px] md:min-h-[320px]">
            {/* 3D scene – desktop only, sits behind the photo */}
            <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden="true">
              <Suspense fallback={null}>
                <Hero3DScene isGreenTheme={isGreenTheme} />
              </Suspense>
            </div>

            <div className="relative group animate-scale-in z-10 self-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 p-1.5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/40 theme-green:group-hover:shadow-green-500/40 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src="/Elan-Professional.png"
                    alt="Elanchezhiyan P — Senior .NET and Azure Engineer"
                    width={224}
                    height={224}
                    className="w-full h-full rounded-full object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
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
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3">
          {[
            { name: ".NET",       Icon: SiDotnet,       color: "#512BD4" },
            { name: "React",      Icon: SiReact,        color: "#61DAFB" },
            { name: "Azure",      badge: "Az",          color: "#0078D4" },
            { name: "TypeScript", Icon: SiTypescript,   color: "#3178C6" },
            { name: "Angular",    Icon: SiAngular,      color: "#DD0031" },
            { name: "Docker",     Icon: SiDocker,       color: "#2496ED" },
            { name: "Git",        Icon: SiGit,          color: "#F05032" },
            { name: "Node.js",    Icon: SiNodedotjs,    color: "#339933" },
          ].map((tech, index) => (
            <TiltDiv
              key={index}
              intensity={12}
              glare={false}
              className="group glass rounded-xl p-2 sm:p-3 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg text-center min-w-0 cursor-default"
            >
              <div className="flex items-center justify-center w-9 h-9 mx-auto mb-1.5">
                {tech.Icon ? (
                  <tech.Icon
                    style={{ color: tech.color, width: 30, height: 30 }}
                    aria-hidden="true"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                    style={{ background: tech.color }}
                  >
                    {tech.badge}
                  </div>
                )}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 overflow-hidden truncate">
                {tech.name}
              </div>
            </TiltDiv>
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
                        src={projectImageMap[project.id] || "/placeholder.svg"}
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
          <TiltDiv intensity={7} glare={true} className="rounded-2xl">
            <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl pointer-events-none" />
              <div className="relative flex flex-col items-center p-4">
                <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <SiDotnet style={{ color: "white", width: 28, height: 28 }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Full-Stack Development
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                  Building scalable applications with .NET Core, React, Angular and modern JavaScript frameworks.
                </p>
                <div className="flex gap-2 mt-3">
                  <SiDotnet style={{ color: "#512BD4", width: 16, height: 16 }} aria-hidden="true" />
                  <SiReact style={{ color: "#61DAFB", width: 16, height: 16 }} aria-hidden="true" />
                  <SiAngular style={{ color: "#DD0031", width: 16, height: 16 }} aria-hidden="true" />
                  <SiTypescript style={{ color: "#3178C6", width: 16, height: 16 }} aria-hidden="true" />
                </div>
              </div>
            </Card>
          </TiltDiv>

          {/* Cloud Solutions Card */}
          <TiltDiv intensity={7} glare={true} className="rounded-2xl">
            <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl pointer-events-none" />
              <div className="relative flex flex-col items-center p-4">
                <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <SiDocker style={{ color: "white", width: 28, height: 28 }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-blue-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Cloud & DevOps
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                  Azure App Services, Blob Storage, serverless functions and containerised deployments.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <SiDocker style={{ color: "#2496ED", width: 16, height: 16 }} aria-hidden="true" />
                  <SiGithubactions style={{ color: "#2088FF", width: 16, height: 16 }} aria-hidden="true" />
                  <span className="inline-flex items-center justify-center rounded text-white font-bold text-[8px]" style={{ background: "#0078D4", width: 16, height: 16 }}>Az</span>
                  <SiGit style={{ color: "#F05032", width: 16, height: 16 }} aria-hidden="true" />
                </div>
              </div>
            </Card>
          </TiltDiv>

          {/* DevOps & Automation Card */}
          <TiltDiv intensity={7} glare={true} className="rounded-2xl">
            <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500 rounded-2xl pointer-events-none" />
              <div className="relative flex flex-col items-center p-4">
                <div className="flex items-center justify-center w-14 h-14 mb-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <SiGithubactions style={{ color: "white", width: 28, height: 28 }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  CI/CD & Automation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed">
                  GitHub Actions pipelines, automated testing, and Infrastructure as Code deployment strategies.
                </p>
                <div className="flex gap-2 mt-3">
                  <SiGithubactions style={{ color: "#2088FF", width: 16, height: 16 }} aria-hidden="true" />
                  <SiNodedotjs style={{ color: "#339933", width: 16, height: 16 }} aria-hidden="true" />
                  <SiDocker style={{ color: "#2496ED", width: 16, height: 16 }} aria-hidden="true" />
                  <SiGit style={{ color: "#F05032", width: 16, height: 16 }} aria-hidden="true" />
                </div>
              </div>
            </Card>
          </TiltDiv>
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section className="container mx-auto px-4 pt-8 pb-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
          Certifications & Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {(
            [
              {
                name: ".NET Full Stack Developer - C# Corner",
                issuer: "C# Corner",
                date: "May 2025",
                link: "https://www.c-sharpcorner.com/uploadfile/certification-exam/rzmmaqtc/certification.pdf",
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
                link: "https://freecodecamp.org/certification/Elanchezhiyan-P/foundational-c-sharp-with-microsoft",
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
                link: "https://www.freecodecamp.org/certification/Elanchezhiyan-P/responsive-web-design",
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
                link: "https://university.atlassian.com/student/award/17WcnErMoSR8bgZ9hsN3hSTw",
                Icon: SiJira,
                gradientFrom: "from-blue-600",
                gradientTo: "to-blue-800",
                glowColor: "#0052CC",
                category: "Project Management",
              },
              {
                name: "cPanel User Interface Proficiency",
                issuer: "cPanel University",
                date: "Jan 2025",
                credentialId: "851a-2616-8f92-f311",
                link: "https://university.cpanel.net/",
                Icon: SiCpanel,
                gradientFrom: "from-orange-500",
                gradientTo: "to-orange-700",
                glowColor: "#F97316",
                category: "Infrastructure",
              },
            ] as CertDef[]
          ).map((cert, index) => (
            <CertCard key={cert.name} cert={cert} index={index} />
          ))}
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
    <div className="grid grid-cols-3 gap-2 md:gap-4 pt-3 w-full max-w-sm">
      {stats.map((stat, index) => (
        /* Outer div holds the IntersectionObserver ref from useCountUp */
        <div key={index} ref={stat.ref}>
          <TiltDiv
            intensity={10}
            glare={false}
            className="glass rounded-xl p-3 md:p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 hover:shadow-lg cursor-default"
          >
            <div className="text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
                {stat.displayValue}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          </TiltDiv>
        </div>
      ))}
    </div>
  );
};

export default Index;
