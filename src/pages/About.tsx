import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import {
  MapPin,
  Trophy,
  Briefcase,
  ExternalLink,
  Download,
  GitBranch,
  Layers,
  Cloud,
} from "lucide-react";
import { calculateYearsOfExperience } from "@/utils/dateUtils";
import { MobileTimeline } from "@/components/MobileTimeline";
import { BuildCTA } from "@/components/BuildCTA";
import { Certifications } from "@/components/Certifications";
import { TechnicalExpertise } from "@/components/TechnicalExpertise";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const VIEWPORT = { once: true, margin: "-80px" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});



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


  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume/Elanchezhiyan_P.pdf"; // Files in public folder are served from root
    link.download = "Elanchezhiyan_P_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>
          About Elanchezhiyan P - Senior .NET & Azure Developer | 5+ Years
          Experience
        </title>
        <meta
          name="description"
          content="Learn about Elanchezhiyan P, a B.E (Bachelor of Engineering) graduate and seasoned software developer with 5+ years of experience in .NET Core, Azure Cloud, CRM integrations, and modern web technologies. Expert in building scalable, secure applications."
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
        {/* About Me — pitch + resume CTA on the left, key metrics on the right */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={stagger(0.1)}
          className="mb-6 md:mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: pitch + CTA — 7 of 12 columns */}
            <div className="lg:col-span-7 space-y-6">
              <motion.h1
                variants={fadeUp}
                className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent"
              >
                About Me
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-base md:text-xl text-gray-900 dark:text-gray-100 leading-relaxed"
              >
                I'm a seasoned software developer with{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  {yearsOfExperience}+ years
                </span>{" "}
                of experience building scalable, secure cloud applications. I
                hold a{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  B.E (Bachelor of Engineering)
                </span>{" "}
                degree, with expertise spanning{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  .NET technologies
                </span>
                ,{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400 theme-green:text-green-600">
                  Azure cloud services
                </span>
                , CRM integrations, and modern web development frameworks.
              </motion.p>

              {/* Primary CTA bar — split-button widget, one visual unit */}
              <motion.div
                variants={fadeUp}
                className="inline-flex shadow-xl rounded-lg overflow-hidden"
              >
                <a
                  href="/resume/Elanchezhiyan_P.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-l-lg bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:from-blue-500 hover:to-indigo-500 theme-green:hover:from-green-500 theme-green:hover:to-emerald-500 text-white text-sm md:text-base font-semibold transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  View Resume
                </a>
                <button
                  type="button"
                  onClick={handleResumeDownload}
                  aria-label="Download resume PDF"
                  className="flex items-center justify-center p-3 rounded-r-lg border-l border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 hover:bg-indigo-700 theme-green:hover:bg-emerald-700 text-white transition-colors duration-300"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </motion.div>
            </div>

            {/* Right: key metrics — 5 of 12 columns, 2x2 dark stat cards */}
            <div className="lg:col-span-5">
              <motion.div
                variants={stagger(0.06)}
                className="grid grid-cols-2 gap-3 md:gap-4"
              >
                {[
                  {
                    icon: Briefcase,
                    value: `${yearsOfExperience}+`,
                    label: "Years Exp.",
                  },
                  {
                    icon: Cloud,
                    value: "Azure",
                    label: "Cloud Architecture",
                  },
                  {
                    icon: Layers,
                    value: "30+",
                    label: "Projects Shipped",
                  },
                  {
                    icon: GitBranch,
                    value: "CI/CD",
                    label: "DevOps Automation",
                  },
                ].map(({ icon: Icon, value, label }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 p-4 md:p-5 shadow-lg shadow-indigo-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200"
                  >
                    <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-200 mb-3">
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                      {value}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <section className="mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>

          {isMobile ? (
            <MobileTimeline experiences={experiences} />
          ) : (
            <TrailJourney experiences={experiences} />
          )}
        </section>

        {/* Technical Expertise Section */}
        <TechnicalExpertise />

        <Certifications />

        {/* Call to Action */}
        <BuildCTA />
      </div>
    </>
  );
};

interface Experience {
  year: string;
  title: string;
  company: string;
  location: string;
  type: "job" | "promotion";
  intro?: string;
  description: string;
  companyWebsite?: string;
}

/**
 * A single milestone on the trail: blurred and shrunk while off-center,
 * sharp and full-size once it crosses into the viewport's middle band —
 * the "coming into focus as you scroll" effect.
 */
const TrailNode: React.FC<{
  exp: Experience;
  index: number;
  total: number;
  isCurrent: boolean;
}> = ({ exp, index, total, isCurrent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inFocus = useInView(ref, { margin: "-35% 0px -35% 0px" });
  const focused = isCurrent || prefersReducedMotion || inFocus;
  const isEven = index % 2 === 0;

  // 0 = oldest (furthest away), 1 = most recent — every role still gets its
  // own card, but past ones sit smaller and dimmer the further back they
  // are, then sharpen to full size as they scroll through the focus band.
  const depth = total > 1 ? index / (total - 1) : 1;
  const dotSize = isCurrent ? 26 : Math.round(10 + depth * 8);
  const restOpacity = isCurrent ? 1 : 0.5 + depth * 0.4;
  const restScale = isCurrent ? 1 : 0.88 + depth * 0.1;
  const restBlur = isCurrent ? 0 : Math.max(0, (1 - depth) * 1.2 - 0.15);

  const RoleIcon = exp.type === "promotion" ? Trophy : Briefcase;

  const dot = (
    <div
      className={`relative z-10 justify-self-center flex-shrink-0 md:[grid-column:2] md:[grid-row:1] ${
        isCurrent
          ? ""
          : isEven
            ? "md:translate-x-[-16px]"
            : "md:translate-x-[16px]"
      }`}
    >
      {isCurrent && (
        <>
          <span className="absolute -inset-2 rounded-full bg-emerald-400/30 blur-md" />
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
        </>
      )}
      <div
        className={`relative rounded-full border-4 border-white dark:border-gray-900 shadow-md ${
          isCurrent
            ? ""
            : "bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600"
        }`}
        style={{
          width: dotSize,
          height: dotSize,
          ...(isCurrent
            ? {
                background:
                  "radial-gradient(circle at 35% 30%, #6ee7b7, #10b981 70%)",
                boxShadow: "0 0 22px rgba(16,185,129,0.55)",
              }
            : {}),
        }}
      />
    </div>
  );

  const card = (
    <div
      className={`group relative glass rounded-2xl border-2 shadow-lg transition-shadow duration-500 hover:shadow-xl p-5 md:p-6 ${
        isCurrent
          ? "border-green-400/70 dark:border-green-500/70 shadow-xl"
          : "border-blue-300/50 dark:border-blue-700/40 theme-green:border-green-300/50 theme-green:dark:border-green-700/40"
      }`}
      style={
        isCurrent
          ? undefined
          : {
              opacity: focused ? 1 : restOpacity,
              transform: focused ? undefined : `scale(${restScale})`,
              filter:
                focused || restBlur <= 0.05
                  ? undefined
                  : `blur(${restBlur}px)`,
              transition:
                "opacity 0.7s ease-out, filter 0.7s ease-out, transform 0.7s ease-out",
            }
      }
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${
            isCurrent
              ? "bg-gradient-to-br from-emerald-500 to-sky-500"
              : "bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600"
          }`}
        >
          <RoleIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-mono font-semibold text-blue-600 dark:text-blue-400 theme-green:text-green-600 ${
                isCurrent ? "text-xs" : "text-[11px]"
              }`}
            >
              {exp.year}
            </span>
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-semibold rounded-full shadow">
                You are here
              </span>
            )}
            {!isCurrent && exp.type === "promotion" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] font-semibold rounded-full">
                Promoted
              </span>
            )}
          </div>
          <h3
            className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent leading-tight ${
              isCurrent ? "text-xl md:text-2xl" : "text-base md:text-lg"
            }`}
          >
            {exp.title}
          </h3>
        </div>
      </div>

      {exp.companyWebsite ? (
        <a
          href={exp.companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 hover:underline ${
            isCurrent ? "mb-4 text-sm" : "mb-2 text-xs md:text-sm"
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {exp.company}
        </a>
      ) : (
        <div
          className={`font-semibold text-gray-700 dark:text-gray-300 ${
            isCurrent ? "mb-4 text-sm" : "mb-2 text-xs md:text-sm"
          }`}
        >
          {exp.company}
        </div>
      )}

      <div
        className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 ${
          isCurrent ? "mb-3 text-sm" : "mb-2 text-xs"
        }`}
      >
        <MapPin
          className={
            isCurrent
              ? "w-4 h-4 text-blue-600 dark:text-blue-400 theme-green:text-green-600"
              : "w-3.5 h-3.5 text-blue-600 dark:text-blue-400 theme-green:text-green-600"
          }
        />
        {exp.location}
      </div>

      {isCurrent && exp.intro && (
        <p className="text-sm italic font-medium text-blue-600 dark:text-blue-400 theme-green:text-green-600 border-l-4 border-blue-300 dark:border-blue-600 theme-green:border-green-300 pl-4 py-1.5 mb-3 bg-blue-50/50 dark:bg-blue-900/20 theme-green:bg-green-50/50 rounded-r-lg">
          {exp.intro}
        </p>
      )}

      <p
        className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
          isCurrent ? "text-sm md:text-base" : "text-xs md:text-sm"
        }`}
      >
        {exp.description}
      </p>
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8"
    >
      {dot}
      <div className={`md:[grid-row:1] ${isEven ? "md:[grid-column:1]" : "md:[grid-column:3]"}`}>
        {card}
      </div>
    </div>
  );
};

/**
 * Professional Journey as a receding trail over the hand-picked landscape
 * illustration — the artwork itself carries the winding path, so the cards
 * just need to sit on top of it, no synthetic connecting line required.
 */
const TrailJourney: React.FC<{ experiences: Experience[] }> = ({
  experiences,
}) => {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl max-w-4xl mx-auto px-4 py-8 md:px-10 md:py-14">
      {/* Landscape backdrop — a gradient fallback under the real, hand-picked
          trail illustration (low-poly trees, stone path, bridge, compass).
          The image is dimmed way down in dark mode rather than swapped,
          since it's a single bright daytime scene, not a day/night pair. */}
      <div
        className="absolute inset-0 -z-30 bg-gradient-to-b from-sky-100 via-emerald-50/60 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 theme-green:from-green-50 theme-green:via-emerald-50 theme-green:to-teal-100"
        aria-hidden="true"
      />
      <img
        src="/about-bg.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 w-full h-full object-cover object-top dark:opacity-40"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-slate-950/60"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-8 md:gap-12">
        {experiences.map((exp, index) => (
          <TrailNode
            key={index}
            exp={exp}
            index={index}
            total={experiences.length}
            isCurrent={index === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
