/**
 * Data for the "Technical Expertise" section (About page).
 *
 * Every skill name here is carried over verbatim from the pre-redesign
 * `SKILL_CATEGORIES` lists in About.tsx (12 categories, ~104 items after
 * removing 3 literal duplicate names — "Zego Cloud", "ProcessMaker", and
 * "QuestionPro" each appeared twice). Nothing was invented: no new
 * technologies, no skill-level percentages, no fabricated tools. "C#" is
 * the one addition, and it's not new content — it already appears as a
 * technology tag on real shipped projects (see src/data/projects.json,
 * e.g. Netimobiledevice, HeicJpegToolkit) but was missing as its own entry
 * in the old skills list even though every ".NET ..." item implies it.
 *
 * Also includes real, user-confirmed additions from the TeleMEDix project
 * that weren't in the original skill lists: Stedi and Healthie (healthcare
 * clearinghouse/claims APIs, core in API & Integration), Medplum (FHIR
 * platform evaluation, supporting), self-hosted/hardened MongoDB, and PMM
 * (Percona Monitoring and Management) for MongoDB query optimization.
 *
 * Regrouped from the original 12 flat categories into 6 capability domains
 * that mirror how the work actually breaks down (cloud, backend, APIs,
 * data, reliability, architecture) instead of how the tools happened to be
 * bucketed originally (e.g. "Tools & Technologies" mixed BI, charting,
 * scraping and cloud storage together).
 *
 * Each domain splits its skills into `core` (the handful that define this
 * person's professional identity — shown larger/first) and `supporting`
 * (real, used technologies that are secondary — shown smaller). This is a
 * presentation-only split; it is not a percentage or proficiency score.
 */

export interface Skill {
  name: string;
  icon: string;
}

export interface ExpertiseDomain {
  id: string;
  title: string;
  /** One line explaining what this domain means in practice — not a tech list. */
  description: string;
  core: Skill[];
  supporting: Skill[];
}

export const EXPERTISE_DOMAINS: ExpertiseDomain[] = [
  {
    id: "cloud-azure",
    title: "Cloud & Azure Architecture",
    description:
      "Designing and running cloud-native services on Azure — data, storage, and integration with the rest of the stack.",
    core: [
      { name: "Azure SQL", icon: "☁️" },
      { name: "Azure Storage Table", icon: "📋" },
      { name: ".NET MVC with Azure", icon: "☁️" },
    ],
    supporting: [
      { name: "CosmosDB", icon: "🌌" },
      { name: "Firebase", icon: "🔥" },
      { name: "Zego Cloud", icon: "☁️" },
    ],
  },
  {
    id: "dotnet-backend",
    title: ".NET & Backend Engineering",
    description:
      "Building and maintaining backend services and applications across the .NET ecosystem, from Web APIs to desktop and mobile.",
    core: [
      { name: "C#", icon: "🔷" },
      { name: ".NET Core Web Applications", icon: "🌐" },
      { name: "ASP.NET Core Web API", icon: "🔌" },
      { name: ".NET Core API Development", icon: "🔌" },
      { name: ".NET Framework Applications", icon: "🏛️" },
    ],
    supporting: [
      { name: ".NET MAUI", icon: "📱" },
      { name: "Android & iOS Development", icon: "📱" },
      { name: ".NET with NHibernate", icon: "🗄️" },
      { name: ".NET with IoC Pattern", icon: "🔧" },
      { name: "Windows Applications", icon: "🖥️" },
      { name: "Windows Services", icon: "⚙️" },
      { name: "Node.js (TypeScript) Services", icon: "🟢" },
      { name: "Node.js", icon: "🟢" },
      { name: "Environment-Based Configuration", icon: "⚙️" },
      { name: ".NET with AI/ML Integration", icon: "🧠" },
      { name: "Adobe ColdFusion", icon: "❄️" },
      { name: "PHP", icon: "🐘" },
      { name: ".NET Core with PLC Integration", icon: "⚙️" },
      { name: ".NET Core with RFID Readers", icon: "📡" },
      { name: ".NET Core with iOS", icon: "🍎" },
      { name: ".NET MVC with Stripe", icon: "💳" },
      { name: ".NET with ReactJS", icon: "⚛️" },
      { name: "Angular with .NET", icon: "🅰️" },
      { name: "React with .NET", icon: "⚛️" },
      { name: "Next.Js", icon: "⚡" },
      { name: "Nest.Js", icon: "🪺" },
    ],
  },
  {
    id: "api-integration",
    title: "API & Integration Engineering",
    description:
      "Designing REST APIs and connecting systems together — CRM platforms, healthcare clearinghouses, auth, and third-party services.",
    core: [
      { name: "RESTful API Design & Versioning", icon: "📐" },
      { name: "JWT & Role-Based Access Control", icon: "🔐" },
      { name: "SSO Integration", icon: "🔐" },
      { name: "Middleware & Request Pipelines", icon: "🔗" },
      { name: "Stedi (Healthcare Clearinghouse API)", icon: "🏥" },
      { name: "Healthie (GraphQL / Claims)", icon: "🏥" },
    ],
    supporting: [
      { name: ".NET API Applications", icon: "🔗" },
      { name: "Medplum (FHIR Platform)", icon: "🏥" },
      { name: "NetSuite", icon: "🏢" },
      { name: "HubSpot", icon: "🎯" },
      { name: "ConnectWise", icon: "🔧" },
      { name: "EverFi", icon: "📚" },
      { name: "ServiceNow", icon: "⚡" },
      { name: "ProcessMaker", icon: "🔄" },
      { name: "QuestionPro", icon: "📊" },
      { name: "HubSpot Forms & Lead Tracking", icon: "📋" },
      { name: ".NET with Selenium Automation", icon: "🤖" },
      { name: ".NET with PhantomJS Scraping", icon: "🕷️" },
      { name: "Selenium Automation", icon: "🤖" },
      { name: "PhantomJS Scraping", icon: "👻" },
      { name: "HTML2Canvas", icon: "📸" },
      { name: "NetiMobileDevice", icon: "📱" },
      { name: "Aspose Document Editors", icon: "📄" },
    ],
  },
  {
    id: "data-persistence",
    title: "Data & Persistence",
    description:
      "Relational and NoSQL data stores, caching, and the reporting/BI tooling built on top of them.",
    core: [
      { name: "SQL Server", icon: "🗄️" },
      { name: "MySQL", icon: "🐬" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Redis Cache", icon: "⚡" },
    ],
    supporting: [
      { name: "SQL Server Profiler", icon: "📊" },
      { name: "AS400", icon: "💻" },
      { name: "SQLite", icon: "💾" },
      { name: "MongoDB (Self-Hosted, Hardened)", icon: "🍃" },
      { name: "Firebird", icon: "🔥" },
      { name: "Oracle", icon: "🏛️" },
      { name: "PowerBI", icon: "📊" },
      { name: "SSRS", icon: "📋" },
      { name: "SSIS", icon: "🔗" },
      { name: "ETL Process", icon: "🔄" },
      { name: "Power Automate", icon: "🔄" },
      { name: "AmChart", icon: "📈" },
      { name: "CanvasJs", icon: "🎨" },
      { name: "Chart.js", icon: "📊" },
    ],
  },
  {
    id: "devops-reliability",
    title: "DevOps, Reliability & Observability",
    description:
      "Shipping safely and keeping production systems healthy — pipelines, monitoring, and verification.",
    core: [
      { name: "CI/CD Pipelines", icon: "🚀" },
      { name: "Dockerized Backend Services", icon: "🐳" },
      { name: "Distributed Tracing", icon: "🔍" },
      { name: "Performance Profiling", icon: "⚡" },
      { name: "PMM (Percona Monitoring & Management)", icon: "📈" },
    ],
    supporting: [
      { name: "MongoDB Query Optimization (WiredTiger)", icon: "🍃" },
      { name: "Secrets & Config Management", icon: "🔒" },
      { name: "Production Rollouts & Hotfixes", icon: "📦" },
      { name: "Incident Response & Postmortems", icon: "🚨" },
      { name: "New Relic APM for .NET", icon: "📈" },
      { name: "Centralized Logging", icon: "📝" },
      { name: "Production Debugging", icon: "🐛" },
      { name: "API Testing (Postman)", icon: "🧪" },
      { name: "Integration Testing", icon: "🔗" },
      { name: "Analytics Validation & Event QA", icon: "✅" },
      { name: "Production vs Staging Verification", icon: "🔄" },
      { name: "Regression Testing", icon: "🔁" },
    ],
  },
  {
    id: "architecture-practices",
    title: "Architecture & Engineering Practices",
    description:
      "How the systems are put together — the patterns and tradeoffs behind scalable, resilient platforms.",
    core: [
      { name: "SaaS Application Architecture", icon: "🏗️" },
      { name: "Scalable API Design", icon: "📐" },
      { name: "Event-Driven Architecture", icon: "⚡" },
      { name: "Microservices vs Modular Monolith", icon: "🧩" },
    ],
    supporting: [{ name: "High-Availability & Fault Tolerance", icon: "🛡️" }],
  },
];

/**
 * Real, used skills that don't belong to the 6 engineering/architecture
 * domains above — marketing-analytics tooling and collaboration/delivery
 * practices from the original "Analytics, Tracking & Marketing Tech",
 * "Collaboration & Soft Skills", and "Product, Client & Ownership Skills"
 * categories. Kept (not deleted) but moved out of the main capability
 * grid so they don't dilute the Azure/.NET/architecture positioning —
 * still one click away via "View complete technology inventory".
 */
export const ADDITIONAL_SKILLS: Skill[] = [
  { name: "Google Analytics 4 (GA4)", icon: "📊" },
  { name: "Google Tag Manager (GTM)", icon: "🏷️" },
  { name: "Event-Based Analytics Design", icon: "🎯" },
  { name: "Funnel & User Journey Tracking", icon: "🔄" },
  { name: "Cross-Domain Tracking", icon: "🌐" },
  { name: "Client Interaction", icon: "🤝" },
  { name: "Team Leadership", icon: "👥" },
  { name: "Continuous Learning", icon: "📚" },
  { name: "Open Source Contributions", icon: "🌟" },
  { name: "Technical Documentation", icon: "📝" },
  { name: "Agile/Scrum Methodologies", icon: "🔄" },
  { name: "Client Requirement Analysis", icon: "📋" },
  { name: "Stakeholder Communication", icon: "💬" },
  { name: "End-to-End Feature Ownership", icon: "🎯" },
  { name: "Cross-Functional Collaboration", icon: "🤝" },
];

export interface BuildCapability {
  title: string;
  description: string;
}

/**
 * "What I Build" — phrasing pulled directly from the existing Professional
 * Journey / About copy already on this page (scalable cloud solutions,
 * REST APIs, cloud-native applications, CRM integrations), not new claims.
 */
export const WHAT_I_BUILD: BuildCapability[] = [
  {
    title: "Cloud-Native Applications",
    description:
      "Scalable, secure backend systems on .NET Core and Azure — the focus of my Senior Software Developer role.",
  },
  {
    title: "Enterprise APIs & Web Applications",
    description:
      "REST APIs and web applications built for business clients on .NET Core.",
  },
  {
    title: "CRM & Third-Party Integrations",
    description:
      "Connecting platforms like NetSuite, HubSpot, and ServiceNow into existing business systems.",
  },
  {
    title: "Reliable Production Systems",
    description:
      "Architecture decisions, CI/CD, and observability that keep shipped systems stable under real usage.",
  },
  {
    title: "Healthcare Interoperability & Claims",
    description:
      "Evaluating and integrating clearinghouse and FHIR platforms (Stedi, Healthie, Medplum) for eligibility checks and claims workflows on TeleMEDix.",
  },
];
