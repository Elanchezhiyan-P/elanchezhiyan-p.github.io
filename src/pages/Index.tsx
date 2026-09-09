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
import { RecognitionSection } from "@/components/RecognitionSection";
import { BuildCTA } from "@/components/BuildCTA";
import { Certifications } from "@/components/Certifications";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import { useCountUp } from "@/hooks/useCountUp";
import { trackBookCall, trackProjectView, trackCertificationClick } from "@/utils/analytics";
import projectsData from "@/data/projects.json";

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
import PythonPackageVisualizerImage from "@/assets/project/python-package-visualizer.webp";
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

/** Featured-projects "peek" carousel: each slide takes this % of the track's
 *  own width (percentages here resolve against the track, not the slide —
 *  the track is block-level and always matches the viewport, regardless of
 *  how wide its overflowing children are). Centering keeps the active slide
 *  in the middle with equal prev/next peeks on either side. */
const PEEK_SLIDE_WIDTH = 82;
const PEEK_CENTERING = (100 - PEEK_SLIDE_WIDTH) / 2;

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

/** Hero-only: a longer rise from further below, so the opening beat reads
 *  as content arriving from off-screen rather than a small fade-in. */
const heroRise: Variants = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 22, opacity: EASE_OUT },
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
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
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
    "python-package-visualizer": PythonPackageVisualizerImage,
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
            content={`Hire Elanchezhiyan P — Senior .NET & Azure Developer, ${yearsOfExperience}+ yrs exp. Open for freelance projects. Cloud, DevOps, React.`}
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
          className="relative container mx-auto px-4 py-4 md:py-6 overflow-hidden"
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          {/* Ambient backdrop — dot-grid + soft radial glow, sits behind the
              hero content only (not the whole page, unlike ParticleBackground). */}
          <div
            className="absolute inset-0 -z-10 opacity-60 dark:opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(59,130,246,0.35) 1px, transparent 1.4px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 30% 30%, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 30% 30%, black 40%, transparent 80%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -z-10 -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-blue-500/10 theme-green:bg-green-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
            <div className="space-y-4">
              <div className="space-y-3">
                <motion.div variants={heroRise} className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-green-700 dark:text-green-400 theme-green:text-green-700">
                    Status: Open for freelance projects
                  </span>
                </motion.div>

                <motion.h1
                  variants={heroRise}
                  className="font-mono font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance text-gray-900 dark:text-gray-100"
                >
                  Elanchezhiyan P
                  <span className="sr-only"> — Senior .NET &amp; Azure Developer</span>
                </motion.h1>

                <motion.p
                  variants={heroRise}
                  className="font-plex text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                >
                  Senior .NET &amp; Azure Developer
                </motion.p>

                <motion.p
                  variants={heroRise}
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
                      className="group px-5 md:px-6 py-2.5 md:py-3 text-sm font-mono font-semibold rounded-sm border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-sm text-gray-800 dark:text-gray-200 hover:border-blue-700 dark:hover:border-blue-400 theme-green:hover:border-green-700 hover:text-blue-700 dark:hover:text-blue-400 theme-green:hover:text-green-700 transition-colors duration-200"
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

            <motion.div variants={heroRise}>
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
          {(() => {
            const techs = [
              { name: ".NET", icon: "💻" },
              { name: "React", icon: "⚛️" },
              { name: "Azure", icon: "☁️" },
              { name: "SQL", icon: "🗄️" },
              { name: "TypeScript", icon: "📘", shortName: "TS" },
              { name: "Docker", icon: "🐳" },
              { name: "Git", icon: "🔀" },
              { name: "API", icon: "🔌" },
            ];
            const arcCenter = (techs.length - 1) / 2;
            return (
              <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-3 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {techs.map((tech, index) => {
                  const normalized = (index - arcCenter) / arcCenter; // -1..1
                  // True arc: a parabola across the whole row, not just the
                  // middle few — center sits highest, edges settle lowest.
                  const lift = 34 * (1 - normalized * normalized);
                  const rotate = normalized * 14;
                  const isSelected = selectedTech === index;
                  return (
                    <motion.button
                      key={index}
                      type="button"
                      variants={fadeUp}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() =>
                        setSelectedTech((prev) => (prev === index ? null : index))
                      }
                      style={{ y: -lift, rotate: isSelected ? 0 : rotate }}
                      className="group relative flex flex-col items-center gap-1.5 flex-shrink-0 focus:outline-none"
                      aria-pressed={isSelected}
                    >
                      {/* Circling ring — appears only once clicked, "orbits" the badge */}
                      <span
                        className={`absolute -inset-1.5 rounded-full border-2 border-dashed transition-opacity duration-300 ${
                          isSelected
                            ? "opacity-100 border-blue-500 dark:border-blue-400 theme-green:border-green-500 animate-spin"
                            : "opacity-0 border-transparent"
                        }`}
                        style={{ animationDuration: "4s" }}
                        aria-hidden="true"
                      />
                      <div
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border-2 flex items-center justify-center shadow-md transition-all duration-300 ${
                          isSelected
                            ? "border-blue-500 dark:border-blue-400 theme-green:border-green-500 shadow-lg shadow-blue-500/20"
                            : "border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 group-hover:border-blue-400 dark:group-hover:border-blue-600 theme-green:group-hover:border-green-400"
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl">{tech.icon}</span>
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        <span className="hidden sm:inline">{tech.name}</span>
                        <span className="sm:hidden">{tech.shortName || tech.name}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            );
          })()}
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
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto"
            >
              Showcasing scalable solutions and innovative architectures
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-1 font-mono text-[11px] tracking-wide text-gray-400 dark:text-gray-500"
            >
              ↔ drag, or use the arrows
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <div
              className="overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                style={{ willChange: "transform" }}
                animate={{ x: `${PEEK_CENTERING - currentSlide * PEEK_SLIDE_WIDTH}%` }}
                transition={SPRING}
                drag="x"
                dragElastic={0.15}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 60;
                  if (info.offset.x < -swipeThreshold) {
                    nextSlide();
                  } else if (info.offset.x > swipeThreshold) {
                    prevSlide();
                  }
                }}
              >
                {featuredProjects.map((project, index) => {
                  const isCurrent = index === currentSlide;
                  return (
                  <motion.div
                    key={project.id}
                    style={{
                      width: `${PEEK_SLIDE_WIDTH}%`,
                      pointerEvents: isCurrent ? "auto" : "none",
                    }}
                    animate={{ scale: isCurrent ? 1 : 0.9, opacity: isCurrent ? 1 : 0.45 }}
                    transition={SPRING}
                    className="flex-shrink-0 px-2 md:px-3"
                    aria-hidden={!isCurrent}
                  >
                    <div className="group grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-shadow duration-500">
                      {/* Image */}
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        <img
                          src={imageMap[project.id]}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur text-[11px] font-mono font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 shadow-sm">
                          ⭐ Featured
                        </span>
                      </div>
                      {/* Content */}
                      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                        <h3 className="font-mono text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="mb-6">
                          <TechTagList technologies={project.technologies} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.links?.github && (
                            <motion.a
                              {...pressable}
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isCurrent ? 0 : -1}
                              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border-2 border-gray-300 dark:border-gray-700 text-sm font-mono font-semibold text-gray-800 dark:text-gray-200 hover:border-blue-700 dark:hover:border-blue-400 theme-green:hover:border-green-700 hover:text-blue-700 dark:hover:text-blue-400 theme-green:hover:text-green-700 transition-colors duration-200"
                            >
                              <Github className="w-4 h-4" />
                              View Code
                            </motion.a>
                          )}
                          {project.links?.live && project.links.live !== "#" && (
                            <motion.a
                              {...pressable}
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isCurrent ? 0 : -1}
                              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-blue-700 theme-green:bg-green-700 hover:bg-blue-800 theme-green:hover:bg-green-800 text-white text-sm font-mono font-semibold transition-colors duration-200"
                            >
                              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                              Live Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Navigation buttons */}
            <motion.button
              onClick={prevSlide}
              style={{ y: "-50%" }}
              {...pressable}
              className="absolute -left-2 md:-left-5 top-1/2 p-2 md:p-2.5 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 transition-colors duration-300 z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              style={{ y: "-50%" }}
              {...pressable}
              className="absolute -right-2 md:-right-5 top-1/2 p-2 md:p-2.5 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 transition-colors duration-300 z-10"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-5">
              {featuredProjects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  {...pressable}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 theme-green:focus:ring-green-400 ${
                    index === currentSlide
                      ? "bg-blue-700 theme-green:bg-green-700 w-6"
                      : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500 theme-green:hover:bg-green-400 theme-green:dark:hover:bg-green-500"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Services/Skills Preview */}
        <motion.section className="container mx-auto px-4 py-4" {...reveal(0.1)}>
          <WhatIDoSection />
        </motion.section>

        <div className="container mx-auto px-4">
          <Certifications limit={4} />
        </div>

        <RecognitionSection />

        {/* Call to Action */}
        <motion.section className="py-4 md:py-6" {...reveal(0.1)}>
          <BuildCTA />
        </motion.section>
      </div>
    </MotionConfig>
  );
};

/** How many tech tags show before a card needs "+N". */
const TECH_TAG_PREVIEW_COUNT = 4;

/**
 * Tech-stack pills for a featured-project card, capped to a fixed count so
 * every card in the carousel settles to roughly the same height regardless
 * of how many technologies a project lists — a project with 10 tags no
 * longer stretches its card taller than one with 4. Click "+N" to see the
 * rest, in place, no navigation.
 */
const TechTagList: React.FC<{ technologies: string[] }> = ({ technologies }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded
    ? technologies
    : technologies.slice(0, TECH_TAG_PREVIEW_COUNT);
  const hiddenCount = technologies.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tech) => (
        <span
          key={tech}
          className="font-mono text-[11px] font-semibold px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 theme-green:bg-green-50 theme-green:dark:bg-green-900/30 text-gray-600 dark:text-gray-300 theme-green:text-green-700"
        >
          {tech}
        </span>
      ))}
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="font-mono text-[11px] font-semibold px-2 py-1 rounded-md text-blue-600 dark:text-blue-400 theme-green:text-green-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          +{hiddenCount}
        </button>
      )}
      {expanded && technologies.length > TECH_TAG_PREVIEW_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="font-mono text-[11px] font-semibold px-2 py-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          Show less
        </button>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
 * "What I Do" — two-column services layout. Left column is the fixed pitch;
 * right column is a clickable list of service cards. Clicking (not just
 * hovering) sets a card active, so the left accent border stays a visible,
 * deliberate state rather than a hover-only affordance touch devices miss.
 * ------------------------------------------------------------------------ */

type ServiceItem = {
  title: string;
  description: string;
  tags: string[];
  icon: React.FC<{ className?: string }>;
  image: string;
};

const FullStackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloudSolutionsIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.3 8.3 4 4 0 0 1 17 16H7Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DevOpsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M7 15a3 3 0 1 1 0-6c1.5 0 2.5 1 3.5 3s2 3 3.5 3a3 3 0 1 0 0-6c-1.5 0-2.5 1-3.5 3s-2 3-3.5 3Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SERVICES: ServiceItem[] = [
  {
    title: "Full-Stack Development",
    description:
      "Building scalable applications with .NET Core, React, and modern JavaScript frameworks.",
    tags: [".NET Core", "React"],
    icon: FullStackIcon,
    image: SeahorseImage,
  },
  {
    title: "Cloud Solutions",
    description:
      "Azure expertise in App Services, SQL Database, Blob Storage, and serverless architectures.",
    tags: ["Azure", ".NET Core"],
    icon: CloudSolutionsIcon,
    image: MpsImage,
  },
  {
    title: "DevOps & Automation",
    description:
      "CI/CD pipelines, Infrastructure as Code, and automated deployment strategies.",
    tags: ["Azure", "React"],
    icon: DevOpsIcon,
    image: TeleMedixImage,
  },
];

const WhatIDoSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
      {/* Left column — heading + pitch */}
      <motion.div variants={fadeUp} className="md:sticky md:top-24 space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 text-xs font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
          Services &amp; Expertise
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
          What I Do
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
          Specialized in modern cloud-native development and scalable
          solutions — from the first line of code to the pipeline that ships
          it.
        </p>

        {/* Fanned photo stack — hover/click a service on the right to bring
            its screenshot to the front; the rest settle into a dimmed fan
            behind it. Pure state + Framer Motion, no extra library. */}
        <div className="relative h-40 sm:h-48 md:h-56 max-w-xs" aria-hidden="true">
          {SERVICES.map((service, index) => {
            const isActive = index === activeIndex;
            const offset = index - activeIndex;
            return (
              <motion.img
                key={service.title}
                src={service.image}
                alt=""
                loading="lazy"
                animate={{
                  opacity: isActive ? 1 : 0.45,
                  scale: isActive ? 1 : 0.88,
                  rotate: isActive ? 0 : offset * 8,
                  x: isActive ? 0 : offset * 28,
                  y: isActive ? 0 : Math.abs(offset) * 12,
                  zIndex: isActive ? 30 : 10 - Math.abs(offset),
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-900"
              />
            );
          })}
        </div>
      </motion.div>

      {/* Right column — interactive service list */}
      <motion.div variants={stagger(0.08)} className="space-y-3">
        {SERVICES.map((service, index) => {
          const isActive = index === activeIndex;
          const Icon = service.icon;
          return (
            <motion.button
              key={service.title}
              type="button"
              variants={fadeUp}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className={`group w-full text-left flex items-start gap-4 rounded-xl border-2 border-l-4 bg-white dark:bg-gray-900 p-4 shadow-sm transition-all duration-300 ${
                isActive
                  ? "border-blue-600 dark:border-blue-500 theme-green:border-green-600 border-l-blue-600 dark:border-l-blue-500 theme-green:border-l-green-600 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20 theme-green:shadow-green-500/10"
                  : "border-gray-200 dark:border-gray-800 border-l-transparent hover:border-blue-300 dark:hover:border-blue-700 theme-green:hover:border-green-300 hover:shadow-md"
              }`}
            >
              <div
                className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 theme-green:from-green-500 theme-green:to-emerald-600 text-white shadow-md"
                    : "bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 text-blue-600 dark:text-blue-400 theme-green:text-green-600"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 theme-green:bg-green-50 theme-green:dark:bg-green-900/30 text-gray-600 dark:text-gray-300 theme-green:text-green-700 theme-green:dark:text-green-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
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
          className="group flex flex-col items-center gap-1"
          ref={stat.ref}
        >
          <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
            <span
              className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/40 dark:border-blue-500/40 theme-green:border-green-400/40 group-hover:animate-spin"
              style={{ animationDuration: "3s" }}
              aria-hidden="true"
            />
            <div className="font-mono font-semibold text-xl md:text-2xl tabular-nums text-gray-900 dark:text-gray-100">
              {stat.displayValue}
            </div>
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
    "● open for freelance projects",
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
