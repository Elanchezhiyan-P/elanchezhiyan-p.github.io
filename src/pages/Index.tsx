import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const Hero3DScene = lazy(() => import("@/components/Hero3DScene"));
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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
import useTypingEffect from "@/hooks/useTypingEffect";
import { trackBookCall } from "@/utils/analytics";
import projectsData from "@/data/projects.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectImageMap } from "@/utils/imageMap";
import TiltDiv from "@/components/TiltDiv";
import CertCard from "@/components/CertCard";
import RevealSection from "@/components/RevealSection";
import type { CertDef } from "@/components/CertCard";

// ─── Roles that cycle through the typing animation ────────────────────────────
const ROLES = [
  "Senior .NET Engineer",
  "Azure Cloud Architect",
  "Full-Stack Developer",
  "Enterprise SaaS Builder",
  "IoT & CRM Specialist",
];

// ─── Shared section-heading component with numbered watermark ─────────────────
const SectionHeading: React.FC<{
  num: string;
  label?: string;
  title: string;
  subtitle?: string;
}> = ({ num, label, title, subtitle }) => (
  <RevealSection className="text-center mb-10 md:mb-14">
    <div className="relative inline-block">
      <span className="section-number">{num}</span>
      {label && (
        <span className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400 mb-3 bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800">
          {label}
        </span>
      )}
      <h2 className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight">
        {title}
      </h2>
    </div>
    {subtitle && (
      <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </RevealSection>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered]       = useState(false);

  const featuredProjects   = projectsData.filter((p) => p.featured);
  const yearsOfExperience  = calculateYearsOfExperience();
  const isGreenTheme =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("theme-green");

  const { display: typedRole, isTyping } = useTypingEffect(ROLES);

  // Auto-advance carousel
  useEffect(() => {
    if (!isHovered) {
      const id = setInterval(
        () => setCurrentSlide((p) => (p + 1) % featuredProjects.length),
        4000
      );
      return () => clearInterval(id);
    }
  }, [isHovered, featuredProjects.length]);

  const nextSlide = () =>
    setCurrentSlide((p) => (p + 1) % featuredProjects.length);
  const prevSlide = () =>
    setCurrentSlide(
      (p) => (p - 1 + featuredProjects.length) % featuredProjects.length
    );

  return (
    <div>
      <Helmet>
        <title>Elanchezhiyan P — Senior .NET &amp; Azure Engineer | Enterprise SaaS &amp; Cloud</title>
        <meta
          name="description"
          content={`Hire Elanchezhiyan P — Senior .NET & Azure Engineer with ${yearsOfExperience}+ years building enterprise SaaS platforms, IoT systems, CRM integrations, and cloud-native APIs.`}
        />
        <meta
          name="keywords"
          content="Hire .NET Developer, Senior Azure Engineer, Enterprise SaaS Developer, C# Developer, Full Stack Developer India, Azure Cloud Architect"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/" />
      </Helmet>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — two-column Direction C
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center container mx-auto px-4 py-24 overflow-hidden">

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/10 theme-green:bg-green-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-600/10 theme-green:bg-emerald-400/10 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">

          {/* ── Left: text ──────────────────────────────────────────── */}
          <div className="flex-1 space-y-6 z-10">

            {/* Availability */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                Available · Full-time · Contract · Freelance
              </span>
            </div>

            {/* Name */}
            <div>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium mb-1">Hi, I'm</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-500 bg-clip-text text-transparent">
                  Elanchezhiyan
                </span>
                {" "}<span className="text-gray-900 dark:text-white">P</span>
              </h1>
            </div>

            {/* Typing */}
            <div className="flex items-center gap-1 text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 min-h-[2rem]">
              <span>{typedRole}</span>
              <span
                className="typing-cursor text-blue-600 dark:text-blue-400 theme-green:text-green-600"
                style={{ opacity: isTyping ? 1 : 0.4 }}
              />
            </div>

            {/* Bio */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              <span className="font-semibold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                Senior .NET &amp; Azure Engineer
              </span>{" "}
              building AI-augmented production systems — and writing up exactly how.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-700 theme-green:from-green-600 theme-green:to-emerald-700 text-white px-7 py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-blue-500/40 theme-green:hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    View My Work
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-7 py-3 text-sm font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 theme-green:hover:border-green-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>

            <AnimatedStats yearsOfExperience={yearsOfExperience} />
          </div>

          {/* ── Right: photo + 3D scene ──────────────────────────────── */}
          <div className="flex-shrink-0 flex justify-center relative">
            {/* 3D behind the photo, desktop only */}
            <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden="true">
              <Suspense fallback={null}>
                <Hero3DScene isGreenTheme={isGreenTheme} />
              </Suspense>
            </div>

            <div className="relative group animate-scale-in z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 p-[3px] shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-1.5 overflow-hidden">
                  <img
                    src="/Elan-Professional.png"
                    alt="Elanchezhiyan P — Senior .NET and Azure Engineer"
                    width={288}
                    height={288}
                    className="w-full h-full rounded-full object-cover object-top group-hover:scale-110 group-hover:brightness-105 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-[3px] border-white dark:border-gray-900 animate-pulse shadow-lg" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 scroll-indicator text-gray-400 dark:text-gray-600">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01 — CORE TECHNOLOGIES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading
          num="01"
          label="Tech Stack"
          title="Core Technologies"
          subtitle="The tools and platforms I work with every day"
        />
        <RevealSection delay={100}>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-3xl mx-auto">
            {[
              { name: ".NET",       Icon: SiDotnet,     color: "#512BD4" },
              { name: "React",      Icon: SiReact,      color: "#61DAFB" },
              { name: "Azure",      badge: "Az",         color: "#0078D4" },
              { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
              { name: "Angular",    Icon: SiAngular,    color: "#DD0031" },
              { name: "Docker",     Icon: SiDocker,     color: "#2496ED" },
              { name: "Git",        Icon: SiGit,        color: "#F05032" },
              { name: "Node.js",    Icon: SiNodedotjs,  color: "#339933" },
            ].map((tech, i) => (
              <TiltDiv
                key={i}
                intensity={12}
                glare={false}
                className="glass rounded-2xl p-3 border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 transition-all duration-300 hover:shadow-lg text-center cursor-default"
              >
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2">
                  {tech.Icon ? (
                    <tech.Icon style={{ color: tech.color, width: 32, height: 32 }} aria-hidden="true" />
                  ) : (
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shadow-sm" style={{ background: tech.color }}>
                      {tech.badge}
                    </div>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 truncate">
                  {tech.name}
                </div>
              </TiltDiv>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 — FEATURED PROJECTS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading
          num="02"
          label="Featured Work"
          title="Selected Projects"
          subtitle="Scalable solutions and innovative architectures built for real-world impact"
        />
        <RevealSection delay={100}>
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50 card-lift"
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
                    <div className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-5 lg:p-8">
                      <div className="relative w-full h-52 lg:h-72 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img
                          src={projectImageMap[project.id] || "/placeholder.svg"}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="lg:w-1/2 flex flex-col justify-center p-5 lg:p-10 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
                      <Badge className="self-start mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 theme-green:from-green-100 theme-green:to-emerald-100 text-blue-700 dark:text-blue-300 theme-green:text-green-700 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 text-xs font-bold px-3 py-1 rounded-full">
                        ⭐ Featured
                      </Badge>
                      <h3 className="text-xl lg:text-2xl font-extrabold mb-3 text-gray-900 dark:text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm lg:text-base leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.links?.github && (
                          <Button variant="outline" className="gap-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105" asChild>
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" /> View Code
                            </a>
                          </Button>
                        )}
                        {project.links?.live && project.links.live !== "#" && (
                          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 text-white rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300" asChild>
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" /> Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-3 md:left-5 top-[28%] md:top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:border-blue-400 dark:hover:border-blue-600 hover:scale-110 transition-all duration-300 z-10" aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button onClick={nextSlide} className="absolute right-3 md:right-5 top-[28%] md:top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:border-blue-400 dark:hover:border-blue-600 hover:scale-110 transition-all duration-300 z-10" aria-label="Next">
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-md">
              {featuredProjects.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-blue-600 theme-green:bg-green-600 w-7" : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-blue-400 dark:hover:bg-blue-500"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 — WHAT I DO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading
          num="03"
          label="Services"
          title="What I Do"
          subtitle="Specialized in modern cloud-native development and scalable solutions"
        />
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {[
            {
              Icon: SiDotnet,
              iconBg: "from-violet-600 to-indigo-700",
              iconColor: "white",
              hoverGradient: "group-hover:from-violet-600/5 group-hover:to-indigo-700/5",
              hoverBorder: "hover:border-violet-400 dark:hover:border-violet-600",
              hoverTitle: "group-hover:from-violet-600 group-hover:to-indigo-600",
              title: "Full-Stack Development",
              desc: "Building scalable applications with .NET Core, React, Angular and modern JavaScript frameworks.",
              icons: [
                { Icon: SiDotnet, color: "#512BD4" },
                { Icon: SiReact, color: "#61DAFB" },
                { Icon: SiAngular, color: "#DD0031" },
                { Icon: SiTypescript, color: "#3178C6" },
              ],
            },
            {
              Icon: SiDocker,
              iconBg: "from-sky-500 to-blue-700",
              iconColor: "white",
              hoverGradient: "group-hover:from-sky-500/5 group-hover:to-blue-700/5",
              hoverBorder: "hover:border-sky-400 dark:hover:border-sky-600",
              hoverTitle: "group-hover:from-sky-600 group-hover:to-blue-700",
              title: "Cloud & DevOps",
              desc: "Azure App Services, Blob Storage, serverless functions and containerised deployments.",
              icons: [
                { Icon: SiDocker, color: "#2496ED" },
                { Icon: SiGithubactions, color: "#2088FF" },
                { badge: "Az", color: "#0078D4" },
                { Icon: SiGit, color: "#F05032" },
              ],
            },
            {
              Icon: SiGithubactions,
              iconBg: "from-emerald-500 to-teal-700",
              iconColor: "white",
              hoverGradient: "group-hover:from-emerald-500/5 group-hover:to-teal-700/5",
              hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-600",
              hoverTitle: "group-hover:from-emerald-600 group-hover:to-teal-600",
              title: "CI/CD & Automation",
              desc: "GitHub Actions pipelines, automated testing, and Infrastructure as Code deployment strategies.",
              icons: [
                { Icon: SiGithubactions, color: "#2088FF" },
                { Icon: SiNodedotjs, color: "#339933" },
                { Icon: SiDocker, color: "#2496ED" },
                { Icon: SiGit, color: "#F05032" },
              ],
            },
          ].map((svc, i) => (
            <RevealSection key={i} delay={i * 120} direction="up">
              <TiltDiv intensity={7} glare className="rounded-2xl h-full">
                <Card className={`group relative overflow-hidden border border-gray-200/60 dark:border-gray-700/60 ${svc.hoverBorder} rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${svc.hoverGradient} transition-all duration-500 rounded-2xl pointer-events-none`} />
                  <div className="relative flex flex-col items-center p-6 h-full">
                    <div className={`flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${svc.iconBg} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <svc.Icon style={{ color: svc.iconColor, width: 30, height: 30 }} aria-hidden="true" />
                    </div>
                    <h3 className={`text-base font-bold mb-2 text-gray-900 dark:text-white group-hover:bg-gradient-to-r ${svc.hoverTitle} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-center`}>
                      {svc.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs text-center leading-relaxed flex-1">
                      {svc.desc}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {svc.icons.map((ic, j) =>
                        ic.Icon ? (
                          <ic.Icon key={j} style={{ color: ic.color, width: 16, height: 16 }} aria-hidden="true" />
                        ) : (
                          <span key={j} className="inline-flex items-center justify-center rounded font-bold text-white text-[8px]" style={{ background: ic.color, width: 16, height: 16 }}>
                            {ic.badge}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </Card>
              </TiltDiv>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 — CERTIFICATIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading
          num="04"
          label="Credentials"
          title="Certifications"
          subtitle="Industry-recognised qualifications that validate my expertise"
        />
        <RevealSection delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(
              [
                { name: ".NET Full Stack Developer - C# Corner", issuer: "C# Corner", date: "May 2025", link: "https://www.c-sharpcorner.com/uploadfile/certification-exam/rzmmaqtc/certification.pdf", Icon: SiDotnet, gradientFrom: "from-violet-600", gradientTo: "to-indigo-700", glowColor: "#7C3AED", category: "Development" },
                { name: "Foundational C# with Microsoft", issuer: "freeCodeCamp", date: "Feb 2025", credentialId: "elanchezhiyan-p-fcswm", link: "https://freecodecamp.org/certification/Elanchezhiyan-P/foundational-c-sharp-with-microsoft", badge: "fCC", gradientFrom: "from-green-600", gradientTo: "to-emerald-700", glowColor: "#10B981", category: "Programming" },
                { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Feb 2025", credentialId: "elanchezhiyan-p-rwd", link: "https://www.freecodecamp.org/certification/Elanchezhiyan-P/responsive-web-design", badge: "RWD", gradientFrom: "from-sky-500", gradientTo: "to-blue-700", glowColor: "#0EA5E9", category: "Web Design" },
                { name: "Jira Fundamentals Badge", issuer: "Atlassian", date: "Feb 2024", credentialId: "299136941", link: "https://university.atlassian.com/student/award/17WcnErMoSR8bgZ9hsN3hSTw", Icon: SiJira, gradientFrom: "from-blue-600", gradientTo: "to-blue-800", glowColor: "#0052CC", category: "Project Management" },
                { name: "cPanel User Interface Proficiency", issuer: "cPanel University", date: "Jan 2025", credentialId: "851a-2616-8f92-f311", link: "https://university.cpanel.net/", Icon: SiCpanel, gradientFrom: "from-orange-500", gradientTo: "to-orange-700", glowColor: "#F97316", category: "Infrastructure" },
                { name: "IronPDF Writing Contest — Runner-Up", issuer: "Iron Software", date: "Apr 2026", link: "https://www.linkedin.com/pulse/meet-winners-ironpdf-writing-contest-ironsoftware-qzvjc", badge: "🏆", gradientFrom: "from-amber-500", gradientTo: "to-yellow-600", glowColor: "#F59E0B", category: "Writing Award" },
              ] as CertDef[]
            ).map((cert, i) => (
              <CertCard key={cert.name} cert={cert} index={i} />
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA — bottom
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <RevealSection>
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 theme-green:from-green-500/10 theme-green:via-emerald-500/10 theme-green:to-teal-500/10 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl border border-blue-300/40 dark:border-blue-700/40 theme-green:border-green-300/40 shadow-2xl px-6 py-12 md:px-12 md:py-16 flex flex-col items-center">
              <div className="text-5xl mb-5">🚀</div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                Let's turn your ideas into reality with robust, scalable, and beautiful software solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 gap-2">
                    Let's Connect
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a href="https://topmate.io/elanchezhiyan_poosamani" target="_blank" rel="noopener noreferrer" onClick={trackBookCall}>
                  <Button size="lg" variant="outline" className="px-8 py-3 text-base font-semibold rounded-xl border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 hover:scale-105 transition-all duration-300 gap-2">
                    Book a Free Call
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
};

// ─── Animated Stats ───────────────────────────────────────────────────────────
const AnimatedStats: React.FC<{ yearsOfExperience: number; dark?: boolean }> = ({ yearsOfExperience, dark }) => {
  const yrs  = useCountUp({ end: Math.floor(yearsOfExperience), duration: 2000, suffix: "+" });
  const proj = useCountUp({ end: 30, duration: 2200, suffix: "+" });
  const perf = useCountUp({ end: 40, duration: 1800, suffix: "x" });

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
      {[
        { ...yrs,  label: "Years Exp", icon: "🎯" },
        { ...proj, label: "Projects",  icon: "🚀" },
        { ...perf, label: "API Speedup", icon: "⚡" },
      ].map((stat, i) => (
        <div key={i} ref={stat.ref}>
          <TiltDiv
            intensity={10}
            glare={false}
            className={`rounded-2xl p-3 text-center cursor-default transition-all duration-300 hover:scale-105 ${
              dark
                ? "bg-white/5 border border-white/10 hover:border-blue-500/40 backdrop-blur-sm"
                : "glass border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 hover:shadow-lg"
            }`}
          >
            <div className="text-base mb-0.5">{stat.icon}</div>
            <div className={`text-lg md:text-xl font-extrabold ${
              dark
                ? "text-white"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent"
            }`}>
              {stat.displayValue}
            </div>
            <div className={`text-[10px] mt-0.5 font-medium leading-tight ${dark ? "text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
              {stat.label}
            </div>
          </TiltDiv>
        </div>
      ))}
    </div>
  );
};

export default Index;
