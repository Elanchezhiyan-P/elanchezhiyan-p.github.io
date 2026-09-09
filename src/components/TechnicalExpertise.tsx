import React, { useId, useState } from "react";
import { motion, type Variants } from "motion/react";
import {
  Cloud,
  Server,
  Plug,
  Database,
  Activity,
  Layers,
  ChevronDown,
} from "lucide-react";
import {
  EXPERTISE_DOMAINS,
  ADDITIONAL_SKILLS,
  WHAT_I_BUILD,
  type ExpertiseDomain,
} from "@/data/technicalExpertise";

const VIEWPORT = { once: true, margin: "-80px" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});

const DOMAIN_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "cloud-azure": Cloud,
  "dotnet-backend": Server,
  "api-integration": Plug,
  "data-persistence": Database,
  "devops-reliability": Activity,
  "architecture-practices": Layers,
};

/** How many supporting (secondary) pills show before a card needs "+N more". */
const SUPPORTING_PREVIEW_COUNT = 6;

const DomainCard: React.FC<{ domain: ExpertiseDomain; index: number }> = ({
  domain,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const Icon = DOMAIN_ICONS[domain.id] ?? Layers;
  const isPrimary = index === 0; // Cloud & Azure Architecture — the visual anchor
  const visibleSupporting = expanded
    ? domain.supporting
    : domain.supporting.slice(0, SUPPORTING_PREVIEW_COUNT);
  const hiddenCount = domain.supporting.length - visibleSupporting.length;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm transition-shadow duration-300 hover:shadow-md ${
        isPrimary
          ? "border-blue-200 dark:border-blue-900 theme-green:border-green-200 theme-green:dark:border-green-900 ring-1 ring-blue-100 dark:ring-blue-900/40 theme-green:ring-green-100"
          : "border-slate-100 dark:border-gray-800"
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isPrimary
              ? "bg-blue-600 theme-green:bg-green-600 text-white"
              : "bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 text-blue-600 dark:text-blue-400 theme-green:text-green-600"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg leading-tight">
            {domain.title}
          </h3>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
        {domain.description}
      </p>

      {/* Core skills — the ones that define this domain, shown with more weight. */}
      <div className="flex flex-wrap gap-2 mb-3">
        {domain.core.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-semibold bg-blue-600 theme-green:bg-green-600 text-white rounded-lg shadow-sm"
          >
            <span className="leading-none" aria-hidden="true">
              {skill.icon}
            </span>
            {skill.name}
          </span>
        ))}
      </div>

      {/* Supporting skills — real, used, but secondary; smaller and muted. */}
      {domain.supporting.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          {visibleSupporting.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md"
            >
              <span className="leading-none" aria-hidden="true">
                {skill.icon}
              </span>
              {skill.name}
            </span>
          ))}
          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 theme-green:text-green-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md"
              aria-expanded={expanded}
              aria-controls={panelId}
            >
              +{hiddenCount} more
            </button>
          )}
          {expanded && domain.supporting.length > SUPPORTING_PREVIEW_COUNT && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="px-2 py-0.5 text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md"
            >
              Show less
            </button>
          )}
          {domain.supporting.length > SUPPORTING_PREVIEW_COUNT && (
            <span id={panelId} className="sr-only" aria-live="polite">
              {expanded ? "All supporting skills shown" : `${hiddenCount} more supporting skills hidden`}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

const AdditionalSkillsReveal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-8 md:mt-10 max-w-3xl mx-auto text-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 theme-green:text-green-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-2 py-1"
      >
        {open ? "Hide" : "View"} complete technology inventory
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <motion.div
          id={panelId}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 mb-3">
            Marketing-analytics tooling and delivery practices — real experience, kept
            separate so it doesn't crowd the engineering picture above.
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {ADDITIONAL_SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md"
              >
                <span className="leading-none" aria-hidden="true">
                  {skill.icon}
                </span>
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * "Technical Expertise" — redesigned around 6 capability domains (Cloud &
 * Azure, .NET & Backend, API & Integration, Data, DevOps/Reliability,
 * Architecture practices) instead of 12 flat tech-pill categories. Every
 * skill is carried over from the original data (see technicalExpertise.ts
 * for the full provenance note) — this is a presentation change, not new
 * content. Core skills per domain get a solid, larger treatment; secondary
 * skills are smaller and muted, so the card reads as "what this domain
 * covers" rather than an undifferentiated wall of pills.
 */
export const TechnicalExpertise: React.FC = () => (
  <section aria-labelledby="tech-expertise-heading" className="mb-6 md:mb-12">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(0.08)}
      className="text-center mb-8 md:mb-12 max-w-2xl mx-auto"
    >
      <motion.span
        variants={fadeUp}
        className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 text-xs font-semibold tracking-[0.08em] uppercase text-blue-700 dark:text-blue-300 theme-green:text-green-700 mb-4"
      >
        Technical Expertise
      </motion.span>
      <motion.h2
        id="tech-expertise-heading"
        variants={fadeUp}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3"
      >
        Azure &bull; .NET &bull; Cloud Architecture
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        Designing scalable enterprise platforms, cloud-native applications, APIs,
        integrations, and reliable backend systems.
      </motion.p>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(0.08)}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {EXPERTISE_DOMAINS.map((domain, index) => (
        <DomainCard key={domain.id} domain={domain} index={index} />
      ))}
    </motion.div>

    {/* What I Build — grounded in the actual role descriptions above (Professional
        Journey) rather than new claims. */}
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger(0.08)}
      className="mt-10 md:mt-14"
    >
      <motion.h3
        variants={fadeUp}
        className="text-center text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6"
      >
        What I Build
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WHAT_I_BUILD.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="p-5 rounded-xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-1.5">
              {item.title}
            </h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>

    <AdditionalSkillsReveal />
  </section>
);
