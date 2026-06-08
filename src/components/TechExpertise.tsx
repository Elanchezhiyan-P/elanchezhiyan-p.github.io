/**
 * TechExpertise – 3-D flip-card grid for the About page.
 *
 * 6 category cards arranged in a 3×2 grid.
 * Front face  → gradient hero with category icon + featured skill icons.
 * Back face   → full skill-chip list (real brand SVG icons).
 * Click / tap any card to flip it; click again to flip back.
 */

import React, { useState } from "react";
import {
  Server,
  Monitor,
  Database,
  Cloud,
  Plug,
  Wrench,
  RotateCcw,
} from "lucide-react";
import {
  SiDotnet,
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiAndroid,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiStripe,
  SiHubspot,
  SiSelenium,
  SiPostman,
  SiJira,
  SiChartdotjs,
  SiCloudflare,
  SiGraphql,
  SiGoogle,
  SiGoogleanalytics,
} from "react-icons/si";

// ─── Types ────────────────────────────────────────────────────────────────────

type SkillDef = {
  name: string;
  Icon?: React.ElementType;
  color: string;
  badge?: string;
};

type Category = {
  id: string;
  label: string;
  /** Lucide icon used in the back-header */
  TabIcon: React.ElementType;
  /** Brand icon displayed large on the front face */
  FrontIcon: React.ElementType;
  /** Main accent hex */
  accent: string;
  /** Second hex for gradient */
  accent2: string;
  skills: SkillDef[];
};

// ─── Small inline icon (chip use) ────────────────────────────────────────────

const ChipIcon: React.FC<{ skill: SkillDef }> = ({ skill }) => {
  if (skill.Icon) {
    return (
      <skill.Icon
        style={{ color: skill.color, width: 12, height: 12, flexShrink: 0 }}
        aria-hidden="true"
      />
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded font-bold text-white leading-none select-none flex-shrink-0"
      style={{ background: skill.color, fontSize: 6, width: 14, height: 14, minWidth: 14 }}
      aria-hidden="true"
    >
      {skill.badge}
    </span>
  );
};

// ─── Category data ────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "dotnet",
    label: ".NET & Backend",
    TabIcon: Server,
    FrontIcon: SiDotnet,
    accent: "#7C3AED",
    accent2: "#4F46E5",
    skills: [
      { name: ".NET Core",        Icon: SiDotnet,    color: "#512BD4" },
      { name: "C#",               badge: "C#",        color: "#239120" },
      { name: "ASP.NET Web API",  Icon: SiDotnet,    color: "#512BD4" },
      { name: ".NET MAUI",        Icon: SiDotnet,    color: "#512BD4" },
      { name: ".NET Framework",   Icon: SiDotnet,    color: "#6C3FC2" },
      { name: "Node.js",          Icon: SiNodedotjs, color: "#339933" },
      { name: "Nest.js",          Icon: SiNestjs,    color: "#E0234E" },
      { name: "GraphQL",          Icon: SiGraphql,   color: "#E10098" },
      { name: "PHP",              Icon: SiPhp,       color: "#777BB4" },
      { name: "SignalR",          badge: "SR",        color: "#512BD4" },
      { name: "HangFire",         badge: "HF",        color: "#4F46E5" },
      { name: "NHibernate",       badge: "NH",        color: "#0369A1" },
      { name: "Windows Services", badge: "WS",        color: "#0078D4" },
      { name: "JWT / RBAC",       badge: "JWT",       color: "#1D4ED8" },
      { name: "ColdFusion",       badge: "CF",        color: "#E87722" },
      { name: "Windows Apps",     badge: "Win",       color: "#00AFF0" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    TabIcon: Monitor,
    FrontIcon: SiReact,
    accent: "#0EA5E9",
    accent2: "#6366F1",
    skills: [
      { name: "React",             Icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",           Icon: SiNextdotjs,   color: "#555555" },
      { name: "Angular",           Icon: SiAngular,     color: "#DD0031" },
      { name: "TypeScript",        Icon: SiTypescript,  color: "#3178C6" },
      { name: "JavaScript",        Icon: SiJavascript,  color: "#F7DF1E" },
      { name: "HTML5",             Icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS3",              Icon: SiCss,         color: "#1572B6" },
      { name: "Tailwind CSS",      Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Android",           Icon: SiAndroid,     color: "#3DDC84" },
      { name: "iOS (.NET MAUI)",   Icon: SiDotnet,      color: "#512BD4" },
      { name: "Chart.js",          Icon: SiChartdotjs,  color: "#FF6384" },
      { name: "AmCharts",          badge: "Am",          color: "#E63946" },
      { name: "HTML2Canvas",       badge: "H2C",         color: "#6366F1" },
      { name: "Responsive Design", badge: "RWD",         color: "#0369A1" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    TabIcon: Database,
    FrontIcon: SiPostgresql,
    accent: "#F59E0B",
    accent2: "#EF4444",
    skills: [
      { name: "SQL Server",          badge: "SQL",    color: "#CC2927" },
      { name: "Azure SQL",           badge: "AzSQL",  color: "#0078D4" },
      { name: "PostgreSQL",          Icon: SiPostgresql, color: "#336791" },
      { name: "MySQL",               Icon: SiMysql,   color: "#4479A1" },
      { name: "MongoDB",             Icon: SiMongodb, color: "#47A248" },
      { name: "Redis",               Icon: SiRedis,   color: "#DC382D" },
      { name: "Firebase",            Icon: SiFirebase,color: "#FFCA28" },
      { name: "SQLite",              Icon: SiSqlite,  color: "#003B57" },
      { name: "Oracle",              badge: "ORA",    color: "#F80000" },
      { name: "CosmosDB",            badge: "Cosmos", color: "#0078D4" },
      { name: "Azure Table Storage", badge: "ATS",    color: "#0050EF" },
      { name: "Firebird",            badge: "FDB",    color: "#F4A322" },
      { name: "AS/400",              badge: "AS400",  color: "#052FAD" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    TabIcon: Cloud,
    FrontIcon: SiDocker,
    accent: "#3B82F6",
    accent2: "#06B6D4",
    skills: [
      { name: "Microsoft Azure",     badge: "Az",    color: "#0078D4" },
      { name: "Docker",              Icon: SiDocker, color: "#2496ED" },
      { name: "GitHub Actions",      Icon: SiGithubactions, color: "#2088FF" },
      { name: "GitHub",              Icon: SiGithub, color: "#4F4F4F" },
      { name: "Git",                 Icon: SiGit,    color: "#F05032" },
      { name: "Cloudflare",          Icon: SiCloudflare, color: "#F38020" },
      { name: "Azure DevOps",        badge: "ADO",   color: "#0078D4" },
      { name: "Azure Functions",     badge: "AFn",   color: "#0062AD" },
      { name: "Azure Blob Storage",  badge: "ABS",   color: "#0050EF" },
      { name: "CI/CD Pipelines",     badge: "CI/CD", color: "#16A34A" },
      { name: "New Relic APM",       badge: "NR",    color: "#1CE783" },
      { name: "Distributed Tracing", badge: "DT",    color: "#7C3AED" },
      { name: "Secrets Management",  badge: "SEC",   color: "#DC2626" },
    ],
  },
  {
    id: "integrations",
    label: "CRM & Integrations",
    TabIcon: Plug,
    FrontIcon: SiHubspot,
    accent: "#F43F5E",
    accent2: "#EC4899",
    skills: [
      { name: "HubSpot",          Icon: SiHubspot,  color: "#FF7A59" },
      { name: "Stripe",           Icon: SiStripe,   color: "#635BFF" },
      { name: "Google OAuth",     Icon: SiGoogle,   color: "#4285F4" },
      { name: "Microsoft SSO",    badge: "MS",       color: "#00A4EF" },
      { name: "Firebase Auth",    Icon: SiFirebase, color: "#FFCA28" },
      { name: "NetSuite",         badge: "NS",       color: "#2B5BA1" },
      { name: "ConnectWise",      badge: "CW",       color: "#E84B1A" },
      { name: "ServiceNow",       badge: "SN",       color: "#62D84E" },
      { name: "EverFi",           badge: "EF",       color: "#005BAA" },
      { name: "ProcessMaker",     badge: "PM",       color: "#1F7A4B" },
      { name: "Zego Cloud",       badge: "ZG",       color: "#1D4ED8" },
      { name: "QuestionPro",      badge: "QP",       color: "#7C3AED" },
      { name: "Power Automate",   badge: "PA",       color: "#0066FF" },
      { name: "SSO (SAML/OAuth)", badge: "SSO",      color: "#4F46E5" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Practices",
    TabIcon: Wrench,
    FrontIcon: SiJira,
    accent: "#10B981",
    accent2: "#14B8A6",
    skills: [
      { name: "Power BI",           badge: "PBI",   color: "#F2C811" },
      { name: "Google Analytics",   Icon: SiGoogleanalytics, color: "#E37400" },
      { name: "Postman",            Icon: SiPostman, color: "#FF6C37" },
      { name: "Jira",               Icon: SiJira,    color: "#0052CC" },
      { name: "Selenium",           Icon: SiSelenium,color: "#43B02A" },
      { name: "Chart.js",           Icon: SiChartdotjs, color: "#FF6384" },
      { name: "SSRS",               badge: "SSRS",   color: "#CC2927" },
      { name: "SSIS / ETL",         badge: "ETL",    color: "#FF7A00" },
      { name: "Aspose",             badge: "ASP",    color: "#E94C21" },
      { name: "Google Tag Manager", badge: "GTM",    color: "#246FDB" },
      { name: "Agile / Scrum",      badge: "Scrum",  color: "#0052CC" },
      { name: "Microservices",      badge: "μSvc",   color: "#7C3AED" },
      { name: "Event-Driven Arch.", badge: "EDA",    color: "#047857" },
      { name: "PhantomJS Scraping", badge: "PJS",    color: "#363D50" },
    ],
  },
];

// ─── Flip Card ────────────────────────────────────────────────────────────────

const FlipCard: React.FC<{ cat: Category }> = ({ cat }) => {
  const [flipped, setFlipped] = useState(false);

  // Featured icons for the front face (up to 5 with an Icon)
  const featured = cat.skills.filter((s) => s.Icon).slice(0, 5);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${cat.label} — click to ${flipped ? "hide" : "show"} skills`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl"
      style={{ perspective: "1200px", height: 300 }}
    >
      {/* ── 3-D wrapper ───────────────────────────────────────────────────── */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ─────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 p-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `linear-gradient(140deg, ${cat.accent} 0%, ${cat.accent2} 100%)`,
            boxShadow: `0 8px 32px ${cat.accent}50, 0 1px 0 rgba(255,255,255,0.15) inset`,
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <div
            className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />

          {/* Category brand icon (large, front face) */}
          <div
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.3) inset",
            }}
          >
            <cat.FrontIcon
              style={{ color: "rgba(255,255,255,0.95)", width: 36, height: 36 }}
              aria-hidden="true"
            />
          </div>

          {/* Title + count */}
          <div className="relative z-10 text-center">
            <div className="text-white font-extrabold text-lg leading-tight drop-shadow">
              {cat.label}
            </div>
            <div
              className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
              style={{ background: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.95)" }}
            >
              {cat.skills.length} technologies
            </div>
          </div>

          {/* Featured icon row */}
          {featured.length > 0 && (
            <div className="relative z-10 flex gap-2">
              {featured.map((skill) => (
                <div
                  key={skill.name}
                  title={skill.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {skill.Icon && (
                    <skill.Icon
                      style={{ color: "rgba(255,255,255,0.9)", width: 18, height: 18 }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Flip hint */}
          <div
            className="relative z-10 flex items-center gap-1 text-[10px] font-medium"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <RotateCcw size={10} />
            <span>Click to explore</span>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl p-4 overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: `0 8px 32px ${cat.accent}28`,
            border: `1px solid ${cat.accent}35`,
            borderLeft: `4px solid ${cat.accent}`,
            scrollbarWidth: "none",
          }}
        >
          {/* Back header (sticky) */}
          <div
            className="flex items-center gap-2 mb-3 pb-2 sticky top-0"
            style={{ background: "inherit", borderBottom: `1px solid ${cat.accent}25` }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${cat.accent}18` }}
            >
              <cat.TabIcon className="w-4 h-4" style={{ color: cat.accent }} />
            </div>
            <span className="font-bold text-xs text-gray-900 dark:text-white flex-1">
              {cat.label}
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
              style={{ background: cat.accent }}
            >
              {cat.skills.length}
            </span>
            <RotateCcw
              size={11}
              className="text-gray-400 dark:text-gray-500 flex-shrink-0"
            />
          </div>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/60 transition-colors duration-150"
              >
                <ChipIcon skill={skill} />
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const TechExpertise: React.FC = () => {
  const total = CATEGORIES.reduce((s, c) => s + c.skills.length, 0);

  return (
    <div className="space-y-5">
      {/* ── Summary bar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {total}+ Technologies
        </span>
        <span className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-600" />
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: cat.accent }}
              />
              {cat.label.split(" ")[0]} · {cat.skills.length}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3×2 flip-card grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => (
          <FlipCard key={cat.id} cat={cat} />
        ))}
      </div>

      {/* ── Hint ─────────────────────────────────────────────────────────────── */}
      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
        Click any card to reveal the full skill list · click again to flip back
      </p>
    </div>
  );
};

export default TechExpertise;
