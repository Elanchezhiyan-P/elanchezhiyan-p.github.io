/**
 * CertCard – 3-D floating certification card.
 *
 * Continuously floats up/down (staggered per index).
 * TiltDiv adds mouse-tracking 3-D tilt + glare.
 * Each card glows with its category accent colour.
 * Used on both the Home page and the About page.
 */

import React from "react";
import TiltDiv from "@/components/TiltDiv";

// ─── Type ─────────────────────────────────────────────────────────────────────

export type CertDef = {
  name: string;
  issuer: string;
  date: string;
  link: string;
  category: string;
  /** Tailwind "from-*" class for gradient */
  gradientFrom: string;
  /** Tailwind "to-*" class for gradient */
  gradientTo: string;
  /** Hex colour used for glow shadow + category pill */
  glowColor: string;
  /** react-icons component (preferred) */
  Icon?: React.ElementType;
  /** Short text shown when no Icon available */
  badge?: string;
  credentialId?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

const CertCard: React.FC<{ cert: CertDef; index: number }> = ({ cert, index }) => (
  <div
    className="cert-float h-full"
    style={{
      animation: "certFloat 3.6s ease-in-out infinite",
      animationDelay: `${index * 0.5}s`,
      perspective: "800px",
    }}
  >
    <TiltDiv intensity={12} glare className="h-full rounded-2xl">
      <div
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 flex flex-col h-full"
        style={{
          boxShadow: `0 24px 60px ${cert.glowColor}22, 0 4px 20px rgba(0,0,0,0.07)`,
          border: `1px solid ${cert.glowColor}25`,
        }}
      >
        {/* ── Gradient top bar ─────────────────────────────────────────── */}
        <div
          className={`h-1.5 bg-gradient-to-r ${cert.gradientFrom} ${cert.gradientTo} flex-shrink-0`}
        />

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center px-5 pt-5 pb-3 flex-1">

          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.gradientFrom} ${cert.gradientTo} flex items-center justify-center mb-3 flex-shrink-0`}
            style={{ boxShadow: `0 8px 28px ${cert.glowColor}50` }}
          >
            {cert.Icon ? (
              <cert.Icon
                style={{ color: "white", width: 27, height: 27 }}
                aria-hidden="true"
              />
            ) : (
              <span className="text-[11px] font-extrabold text-white tracking-tight">
                {cert.badge}
              </span>
            )}
          </div>

          {/* Category pill */}
          <span
            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white mb-3 flex-shrink-0"
            style={{ background: cert.glowColor }}
          >
            {cert.category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-sm text-center text-gray-900 dark:text-white leading-snug mb-1.5">
            {cert.name}
          </h3>

          {/* Issuer */}
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {cert.issuer}
          </p>

          {/* Date */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {cert.date}
          </p>
        </div>

        {/* ── Credential ID strip ───────────────────────────────────────── */}
        {cert.credentialId && (
          <div className="mx-4 mb-4 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/60">
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono truncate flex-1">
                ID: {cert.credentialId}
              </span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            </div>
          </div>
        )}

        {/* ── Clickable overlay ────────────────────────────────────────── */}
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 rounded-2xl"
          aria-label={`View ${cert.name} certification`}
        />
      </div>
    </TiltDiv>
  </div>
);

export default CertCard;
