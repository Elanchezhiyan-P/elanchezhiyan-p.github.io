import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from "motion/react";
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
import { AnimatedBanner } from "@/components/ui/animated-banner";
import { RecognitionSection } from "@/components/RecognitionSection";
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

import SeahorseImage from "@/assets/project/Seahorse.webp";
import MpsImage from "@/assets/project/MPS.webp";
import QueryBuilderImage from "@/assets/project/Querybuilder.webp";
import IcsImage from "@/assets/project/ICS.webp";
import ScoutImage from "@/assets/project/Scout.webp";
import IOSBackupToolImage from "@/assets/project/Scout-iOS.webp";
import Qliq1sImage from "@/assets/project/Qliq1s.webp";
import ExpertConnectImage from "@/assets/project/expertconnectlegal.webp";
import KuralInsightsImage from "@/assets/project/kural-insights.webp";
import GitHubUserSearchImage from "@/assets/project/github-user-search.webp";
import WorldCountryExplorerImage from "@/assets/project/WorldCountryExplorer.webp";
import TamilSongDownloaderImage from "@/assets/project/tamilsongdownloader.webp";
import BlogSubscriptionImage from "@/assets/project/BlogSubscriptionSystem.webp";
import SSOIntegrationImage from "@/assets/project/SSOIntegration.webp";
import NetimobiledeviceImage from "@/assets/project/Netimobiledevice.webp";
import HeicJpegToolkitImage from "@/assets/project/HeicJpegToolkit.webp";
import ArcticCodeImage from "@/assets/project/arctic-code.webp";
import TeleMedixImage from "@/assets/project/telemedix.webp";
import InvoicePilotImage from "@/assets/project/invoice-pdf-image.webp";
import GoHighLevelImage from "@/assets/project/GoHighLevelImage.webp";
import ClinicalDischargePdfImage from "@/assets/project/ClinicalDischargePdf.webp";
import SmartFinanceSystemImage from "@/assets/project/SmartFinanceSystem.webp";

/* --------------------------------------------------------------------------
 * Motion primitives
 *
 * Every variant here animates `transform` and `opacity` only, so reveals stay
 * on the compositor and never trigger layout. The page is wrapped in
 * <MotionConfig reducedMotion="user">, which drops the transform half of each
 * variant when the OS asks for reduced motion — leaving a plain opacity fade
 * as the fallback rather than no feedback at all.
 * ------------------------------------------------------------------------ */

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const EASE_OUT = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const VIEWPORT = { once: true, margin: "-100px" };

/** Travel springs, opacity rides the 0.4s cubic-bezier. */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING, opacity: EASE_OUT },
  },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});

/** Props for a section that reveals itself once, as it scrolls into frame. */
const reveal = (staggerChildren = 0.1) => ({
  variants: stagger(staggerChildren),
  initial: "hidden",
  whileInView: "show",
  viewport: VIEWPORT,
});

/**
 * Micro-interaction shared by every clickable surface. Any element carrying
 * this must not also carry a Tailwind `hover:scale-*` / `hover:-translate-*`
 * or `.card-lift` class — motion writes `transform` inline and the two fight.
 */
const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: SPRING,
};

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    // WCAG 2.2.2 — don't auto-advance for visitors who asked for reduced
    // motion; the arrows and dots still give them full manual control.
    if (!isHovered && !prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, featuredProjects.length, prefersReducedMotion]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  return (
    <MotionConfig reducedMotion="user">
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

        {/* Hero Section — above the fold, so it plays on mount rather than on scroll */}
        <motion.section
          className="container mx-auto px-4 py-4 md:py-6"
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
            <div className="space-y-4">
              <div className="space-y-3">
                <motion.div variants={fadeUp} className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-green-700 dark:text-green-400 theme-green:text-green-700">
                    Status: Open to work — Full-time / Contract / Freelance
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="font-mono font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance text-gray-900 dark:text-gray-100"
                >
                  Elanchezhiyan P
                  <span className="sr-only"> — Senior .NET &amp; Azure Developer</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="font-plex text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                >
                  Senior .NET &amp; Azure Developer
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="font-plex text-base leading-relaxed text-gray-600 dark:text-gray-400 max-w-[46ch]"
                >
                  B.E (Bachelor of Engineering) graduate with{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {yearsOfExperience}+ years
                  </span>{" "}
                  architecting scalable, secure cloud applications — built for the
                  load, the audit, and the 2&nbsp;a.m. page.
                </motion.p>
              </div>

              <motion.div variants={stagger(0.05)} className="flex flex-wrap gap-2">
                <motion.div variants={fadeUp} {...pressable}>
                  <Link to="/projects">
                    <Button
                      size="lg"
                      className="group relative bg-blue-700 theme-green:bg-green-700 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-mono font-semibold rounded-sm hover:bg-blue-800 theme-green:hover:bg-green-800 transition-colors duration-200"
                    >
                      <span className="flex items-center gap-2">
                        View my work
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} {...pressable}>
                  <a
                    href="https://topmate.io/elanchezhiyan_poosamani"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackBookCall}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="group px-5 md:px-6 py-2.5 md:py-3 text-sm font-mono font-semibold rounded-sm border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-blue-700 dark:hover:border-blue-400 theme-green:hover:border-green-700 hover:text-blue-700 dark:hover:text-blue-400 theme-green:hover:text-green-700 transition-colors duration-200"
                    >
                      Book a call
                    </Button>
                  </a>
                </motion.div>
                <motion.div variants={fadeUp} {...pressable}>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="px-5 md:px-6 py-2.5 md:py-3 text-sm font-mono font-semibold rounded-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 theme-green:hover:text-green-700 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors duration-200"
                    >
                      Get in touch
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Animated Quick Stats */}
              <AnimatedStats yearsOfExperience={yearsOfExperience} />
            </div>

            <motion.div variants={fadeUp}>
              <TerminalHero prefersReducedMotion={prefersReducedMotion} />
            </motion.div>
          </div>
        </motion.section>

        {/* Technologies Showcase */}
        <motion.section
          className="container mx-auto px-4 py-4"
          {...reveal(0.05)}
        >
          <motion.div variants={fadeUp} className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
              Core Technologies
            </h2>
          </motion.div>
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
              <motion.div
                key={index}
                variants={fadeUp}
                {...pressable}
                className="group glass rounded-xl p-2 sm:p-3 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-colors duration-300 hover:shadow-lg text-center min-w-0"
              >
                <div className="text-xl sm:text-2xl mb-1">{tech.icon}</div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 break-words overflow-hidden">
                  <span className="hidden sm:inline">{tech.name}</span>
                  <span className="sm:hidden">{tech.shortName || tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Achievements */}
        <motion.section
          className="container mx-auto px-4 py-4"
          {...reveal(0.05)}
        >
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
              <motion.div
                key={index}
                variants={fadeUp}
                {...pressable}
                className="glass rounded-xl p-4 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-colors duration-300 hover:shadow-lg"
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
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Promo Banner */}
        <motion.section
          className="container mx-auto px-4 py-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <AnimatedBanner
            ctaLabel="View All Projects"
            href="/projects"
            posterSrc={SeahorseImage}
            subtitle="30+ projects spanning cloud architecture, DevOps automation, and full-stack apps."
            title="Explore My Work"
          />
        </motion.section>

        {/* Featured Projects Carousel */}
        <motion.section className="container mx-auto px-4 py-4" {...reveal(0.1)}>
          <div className="text-center mb-4">
            <motion.div
              variants={fadeUp}
              className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 mb-2"
            >
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
                ⭐ Featured Work
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto"
            >
              Showcasing scalable solutions and innovative architectures
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border-2 border-gray-200/50 dark:border-gray-800/50 transition-shadow duration-500 hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex"
              style={{ willChange: "transform" }}
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={SPRING}
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
                          <motion.div {...pressable}>
                            <Button
                              variant="outline"
                              className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-blue-300 dark:border-blue-700 theme-green:border-green-300 theme-green:dark:border-green-700 shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/20"
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
                          </motion.div>
                        )}
                        {project.links?.live && project.links.live !== "#" && (
                          <motion.div {...pressable}>
                            <Button
                              className="group/btn bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 theme-green:hover:from-green-700 theme-green:hover:via-emerald-700 theme-green:hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 inline-flex items-center gap-2"
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
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>

            {/* Navigation Buttons — `y` lives on motion, not in a Tailwind
                `-translate-y-1/2`, so the hover scale can't wipe the centering. */}
            <motion.button
              onClick={prevSlide}
              style={{ y: "-50%" }}
              {...pressable}
              className="absolute left-2 md:left-4 top-[30%] md:top-1/2 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/30 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-colors duration-300 z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              style={{ y: "-50%" }}
              {...pressable}
              className="absolute right-2 md:right-4 top-[30%] md:top-1/2 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 theme-green:hover:bg-green-50 theme-green:dark:hover:bg-green-900/30 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 transition-colors duration-300 z-10"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Dots Indicator */}
            <div
              className="absolute bottom-4 left-1/2 flex space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              style={{ transform: "translateX(-50%)" }}
            >
              {featuredProjects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  {...pressable}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 ${
                    index === currentSlide
                      ? "bg-blue-600 theme-green:bg-green-600 w-8 shadow-md"
                      : "w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500 theme-green:hover:bg-green-400 theme-green:dark:hover:bg-green-500"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Services/Skills Preview */}
        <motion.section className="container mx-auto px-4 py-4" {...reveal(0.1)}>
          <div className="text-center mb-4">
            <motion.div
              variants={fadeUp}
              className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 mb-2"
            >
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
                Services & Expertise
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent"
            >
              What I Do
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Specialized in modern cloud-native development and scalable
              solutions
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 lg:gap-4">
            {/* Full-Stack Development Card */}
            <motion.div variants={fadeUp} {...pressable} className="h-full">
              <Card className="group relative h-full overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-[box-shadow,border-color] duration-500 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600">
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
            </motion.div>

            {/* Cloud Solutions Card */}
            <motion.div variants={fadeUp} {...pressable} className="h-full">
              <Card className="group relative h-full overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-[box-shadow,border-color] duration-500 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600">
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
            </motion.div>

            {/* DevOps & Automation Card */}
            <motion.div variants={fadeUp} {...pressable} className="h-full">
              <Card className="group relative h-full overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-[box-shadow,border-color] duration-500 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600">
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
            </motion.div>
          </div>
        </motion.section>

        {/* Certifications & Achievements */}
        <motion.section
          className="container mx-auto px-4 pt-8 pb-4 relative z-0"
          {...reveal(0.05)}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent relative z-10"
          >
            Certifications & Achievements
          </motion.h2>
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
              <motion.div
                key={cert.name}
                variants={fadeUp}
                {...pressable}
                className="h-full"
              >
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-[box-shadow,border-color] duration-500 relative z-10 border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 w-full min-w-0">
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
              </motion.div>
            ))}
          </div>
        </motion.section>

        <RecognitionSection />

        {/* Call to Action */}
        <motion.section className="text-center py-4 md:py-6" {...reveal(0.1)}>
          <div className="relative mx-auto max-w-3xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 theme-green:from-green-500/10 theme-green:via-emerald-500/10 theme-green:to-teal-500/10 rounded-3xl blur-3xl"></div>

            <div className="relative overflow-hidden glass rounded-3xl border-2 border-blue-300/50 dark:border-blue-700/50 theme-green:border-green-300/50 theme-green:dark:border-green-700/50 shadow-2xl p-5 md:p-6">
              <div className="relative flex flex-col items-center">
              <motion.div
                variants={fadeUp}
                className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
              >
                <span className="text-xl md:text-2xl">🚀</span>
              </motion.div>
              <motion.h3
                variants={fadeUp}
                className="text-lg md:text-xl lg:text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent"
              >
                Ready to Build Something Amazing?
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-4 max-w-2xl leading-relaxed"
              >
                Let's turn your ideas into reality with robust, scalable, and
                beautiful software solutions.
              </motion.p>
              <motion.div
                variants={stagger(0.05)}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <motion.div variants={fadeUp} {...pressable}>
                  <Link to="/contact">
                    <Button className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 theme-green:hover:from-green-700 theme-green:hover:via-emerald-700 theme-green:hover:to-teal-700 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative">
                      <span className="relative z-10 flex items-center gap-2">
                        Let's Connect
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 theme-green:from-green-700 theme-green:via-emerald-700 theme-green:to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} {...pressable}>
                  <a
                    href="https://topmate.io/elanchezhiyan_poosamani"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="group px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold rounded-xl border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-colors duration-300 hover:shadow-lg"
                    >
                      <span className="flex items-center gap-2">
                        Book a Free Call
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </MotionConfig>
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
      label: "Years",
    },
    {
      ...projectsCounter,
      label: "Shipped",
    },
    {
      ...performanceCounter,
      label: "Faster",
    },
  ];

  return (
    // Inherits the hero's "hidden"/"show" variant through MotionContext, then
    // runs its own tighter 0.05s stagger across the three tiles.
    <motion.div
      variants={stagger(0.05)}
      className="flex flex-wrap gap-x-6 gap-y-2 pt-3 border-t border-gray-200 dark:border-gray-800"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={fadeUp}
          className="flex flex-col gap-0.5"
          ref={stat.ref}
        >
          <div className="font-mono font-semibold text-xl md:text-2xl tabular-nums text-gray-900 dark:text-gray-100">
            {stat.displayValue}
          </div>
          <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-gray-500 dark:text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * Terminal-styled hero visual: a boot-sequence readout of who I am, my
 * availability, and my headline stats, typed out like real shell output.
 * Skips the typewriter reveal under reduced-motion — full text renders
 * immediately with a static cursor.
 */
const TerminalHero: React.FC<{
  prefersReducedMotion: boolean;
}> = ({ prefersReducedMotion }) => {
  const scriptLines = [
    "$ whoami",
    "elanchezhiyan-p — senior .net & azure developer",
    "",
    "$ cat status",
    "● available for hire",
    "",
    "$ _",
  ];
  const fullScript = scriptLines.join("\n");

  const [charCount, setCharCount] = useState(
    prefersReducedMotion ? fullScript.length : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setCharCount(fullScript.length);
      return;
    }
    setCharCount(0);
    const interval = window.setInterval(() => {
      setCharCount((prev) => {
        if (prev >= fullScript.length) {
          window.clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 16);
    return () => window.clearInterval(interval);
  }, [fullScript, prefersReducedMotion]);

  const revealedLines = fullScript.slice(0, charCount).split("\n");

  return (
    <div className="rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-900 dark:bg-black overflow-hidden shadow-xl">
      {/* title bar */}
      <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2.5 bg-gray-800 dark:bg-gray-950 border-b border-gray-700/60">
        <div className="flex gap-1 md:gap-1.5">
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/70" />
        </div>
        <img
          src="/Elan.jpg"
          alt="Elanchezhiyan P"
          width={18}
          height={18}
          fetchpriority="high"
          className="w-4 h-4 md:w-[18px] md:h-[18px] rounded-full object-cover"
        />
        <span className="font-mono text-[11px] md:text-xs text-gray-400">elan@cloud — zsh</span>
      </div>

      {/* body */}
      <div className="px-3.5 py-3 md:px-5 md:py-5 font-mono text-[11px] leading-snug md:text-sm md:leading-relaxed min-h-0 md:min-h-[130px]">
        {revealedLines.map((line, index) => {
          const isLast = index === revealedLines.length - 1;
          const isPrompt = line.startsWith("$ ");
          const isStatus = line.startsWith("●");
          return (
            <div key={index} className="whitespace-pre-wrap break-words">
              {isPrompt ? (
                <>
                  <span className="text-blue-400 theme-green:text-green-400">$ </span>
                  <span className="text-gray-100">{line.slice(2)}</span>
                </>
              ) : isStatus ? (
                <span className="text-green-400">{line}</span>
              ) : (
                <span className="text-gray-400">{line || " "}</span>
              )}
              {isLast && (
                <span
                  aria-hidden="true"
                  className={`inline-block w-2 h-4 bg-gray-300 ml-0.5 align-text-bottom ${
                    prefersReducedMotion ? "" : "animate-pulse"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
