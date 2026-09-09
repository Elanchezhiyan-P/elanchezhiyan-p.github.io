import React from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "motion/react";
import { ExternalLink, BadgeCheck, ArrowRight } from "lucide-react";
import { certifications } from "@/data/certifications";
import csharpCornerLogo from "@/assets/certifications/csharpcorner.png";
import freeCodeCampLogo from "@/assets/certifications/freecodecamp.svg";
import jiraLogo from "@/assets/certifications/jira.svg";
import cpanelLogo from "@/assets/certifications/cpanel.svg";
import medblocksLogo from "@/assets/certifications/medblocks.svg";
import githubLogo from "@/assets/certifications/github.svg";
import linkedinLogo from "@/assets/certifications/linkedin.svg";

/** Real issuer logos, keyed by the exact `issuer` string in certifications.ts. */
const ISSUER_LOGOS: Record<string, string> = {
  "C# Corner": csharpCornerLogo,
  freeCodeCamp: freeCodeCampLogo,
  Atlassian: jiraLogo,
  "cPanel University": cpanelLogo,
  Medblocks: medblocksLogo,
  GitHub: githubLogo,
  LinkedIn: linkedinLogo,
};

const VIEWPORT = { once: true, margin: "-100px" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});

interface CertificationsProps {
  /**
   * Cap the grid to this many cards — featured ones first, falling back to
   * declaration order to fill the rest. Omit to render the full list (About
   * page); the homepage passes a small limit plus a link to see the rest.
   */
  limit?: number;
}

/**
 * The single source of truth for "Certifications & Achievements" — used on
 * both the homepage and About page so the two can never drift out of sync
 * again. Scroll-reveals with the same fadeUp/stagger pattern used elsewhere
 * on the site (motion/react), rather than appearing with no animation.
 *
 * Cards are deliberately compact (micro-cards) with a neutral dark-slate
 * border that lights up on hover/focus — a distinct, credential-plate look
 * rather than the blue/green accent borders used by the rest of the site.
 */
export const Certifications: React.FC<CertificationsProps> = ({ limit }) => {
  const isCapped = limit !== undefined && limit < certifications.length;
  const visible = isCapped
    ? [...certifications]
        .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
        .slice(0, limit)
    : certifications;

  return (
    <section className="pt-4 md:pt-10 mb-8 md:mb-16">
      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="flex items-center justify-between flex-wrap gap-2 mb-6 md:mb-8"
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 bg-clip-text text-transparent"
        >
          Certifications &amp; Achievements
        </motion.h2>
        {isCapped ? (
          <motion.div variants={fadeUp}>
            <Link
              to="/about"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 theme-green:text-green-600 hover:gap-1.5 transition-all"
            >
              View all {certifications.length} certifications
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ) : (
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs text-gray-500 dark:text-gray-400 tracking-wide"
          >
            {certifications.length} verified credentials
          </motion.span>
        )}
      </motion.div>

      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
      >
        {visible.map((cert) => (
        <motion.a
          key={cert.name}
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 p-3.5 shadow-sm hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md transition-all duration-300"
        >
          {/* Official logo container, with a verified checkmark badge */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-sm shadow-inner p-1.5">
              {ISSUER_LOGOS[cert.issuer] ? (
                <img
                  src={ISSUER_LOGOS[cert.issuer]}
                  alt={`${cert.issuer} logo`}
                  className="w-full h-full object-contain"
                />
              ) : (
                cert.issuer.charAt(0)
              )}
            </div>
            <BadgeCheck
              className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-500 dark:text-blue-400 bg-white dark:bg-slate-900 rounded-full"
              aria-label="Verified credential"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <h3 className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 transition-colors">
              {cert.name}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {cert.issuer} &middot; {cert.date}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 theme-green:bg-green-50 theme-green:dark:bg-green-900/30 text-blue-700 dark:text-blue-300 theme-green:text-green-700">
                {cert.category}
              </span>
              {cert.credentialId && (
                <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 tracking-tight">
                  ID {cert.credentialId}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-blue-600 dark:text-blue-400 theme-green:text-green-600 group-hover:gap-1.5 group-hover:drop-shadow-[0_0_6px_rgba(37,99,235,0.55)] transition-all">
              Verify
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.a>
        ))}
      </motion.div>
    </section>
  );
};
