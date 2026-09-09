import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackBookCall } from "@/utils/analytics";
import SeahorseImage from "@/assets/project/Seahorse.webp";

/**
 * The closing call-to-action, shared across pages so it never drifts —
 * a deep slate banner (not another translucent card blending into the
 * page background) built from a real screenshot of one of my own shipped
 * dashboards (heavily blurred + darkened), rather than a flat color or a
 * generic emoji-icon-on-a-glass-card pattern.
 */
export const BuildCTA: React.FC = () => (
  <section className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-14 md:py-16 text-center bg-slate-900">
    {/* A real project screenshot, blurred into an abstract backdrop — gives
        the banner texture and color instead of a flat rectangle. */}
    <img
      src={SeahorseImage}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 -z-40 w-full h-full object-cover scale-125 blur-2xl opacity-80"
    />
    {/* Vignette, not a flat wash — darkest behind the text for legibility,
        lighter at the edges so the image's color still reads. */}
    <div
      className="absolute inset-0 -z-30"
      style={{
        background:
          "radial-gradient(ellipse 90% 90% at 50% 45%, rgba(2,6,23,0.94) 0%, rgba(2,6,23,0.75) 55%, rgba(2,6,23,0.45) 100%)",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 -z-20 opacity-[0.12]"
      style={{
        backgroundImage:
          "radial-gradient(circle, white 1px, transparent 1.4px)",
        backgroundSize: "22px 22px",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute -z-10 -top-10 -left-10 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"
      aria-hidden="true"
    />
    <div
      className="absolute -z-10 -bottom-16 -right-10 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"
      aria-hidden="true"
    />

    <span className="inline-block font-mono text-[11px] tracking-[0.08em] uppercase text-slate-400 mb-3">
      Let's work together
    </span>
    <h2 className="text-white font-extrabold text-4xl mb-4">
      Ready to build something amazing?
    </h2>
    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
      With 7+ years across cloud architecture, DevOps, and full-stack
      delivery, I'm ready to help bring your next idea to production.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link to="/contact">
        <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 text-white hover:from-blue-500 hover:to-indigo-500 theme-green:hover:from-green-500 theme-green:hover:to-emerald-500 px-6 py-2.5 text-sm font-semibold rounded-xl shadow-xl transition-all duration-300 hover:scale-105">
          <span className="flex items-center gap-2">
            Let's Connect
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Button>
      </Link>
      <a
        href="/resume/Elanchezhiyan_P.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="outline"
          className="group px-6 py-2.5 text-sm font-semibold rounded-xl border-2 border-slate-600 text-slate-200 bg-transparent hover:bg-slate-800/60 hover:border-slate-400 hover:shadow-[0_0_16px_rgba(148,163,184,0.35)] transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            View Resume
          </span>
        </Button>
      </a>
      <a
        href="https://topmate.io/elanchezhiyan_poosamani"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackBookCall}
      >
        <Button
          variant="outline"
          className="px-6 py-2.5 text-sm font-semibold rounded-xl border-2 border-slate-600 text-slate-200 bg-transparent hover:bg-slate-800/60 hover:border-slate-400 transition-colors duration-300"
        >
          Book a Free Call
        </Button>
      </a>
    </div>
  </section>
);
