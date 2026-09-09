export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
  icon: string;
  category: string;
  credentialId?: string;
  /** Shown first when a caller renders a capped subset (e.g. the homepage). */
  featured?: boolean;
}

export const certifications: Certification[] = [
  {
    name: ".NET Full Stack Developer - C# Corner",
    issuer: "C# Corner",
    date: "May 2025",
    link: "https://www.c-sharpcorner.com/uploadfile/certification-exam/rzmmaqtc/certification.pdf?trk=public_profile_see-credential",
    icon: "💻",
    category: "Development",
    featured: true,
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
  {
    name: "Jira Fundamentals Badge",
    issuer: "Atlassian",
    date: "Feb 2024",
    credentialId: "299136941",
    link: "https://university.atlassian.com/student/award/17WcnErMoSR8bgZ9hsN3hSTw?trk=public_profile_see-credential",
    icon: "🎯",
    category: "Project Management",
    featured: true,
  },
  {
    name: "cPanel User Interface Proficiency",
    issuer: "cPanel University",
    date: "Jan 2025",
    credentialId: "851a-2616-8f92-f311",
    link: "https://university.cpanel.net/?trk=public_profile_see-credential",
    icon: "⚙️",
    category: "System Administration",
  },
  {
    name: "FHIR Fundamentals Course",
    issuer: "Medblocks",
    date: "Sep 2026",
    credentialId: "ab1c0a82-56f3-415a-acc7-a386a247a592",
    link: "https://medblocks.com/certificates/ab1c0a82-56f3-415a-acc7-a386a247a592",
    icon: "🏥",
    category: "Healthcare Interoperability",
    featured: true,
  },
  {
    name: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub",
    date: "Feb 2026",
    link: "https://www.linkedin.com/learning/certificates/e4758082d323772e01b7959d16e482cb5e016db19b97009c0b0f23754b94c0cb",
    icon: "🐙",
    category: "Version Control",
  },
  {
    name: "Practical GitHub Copilot",
    issuer: "LinkedIn",
    date: "Jan 2026",
    link: "https://www.linkedin.com/learning/certificates/c399b44215a955f0ad4a8a23dfd8e353dc8ba4db8353079b06ccf96bcd2e75ee",
    icon: "🤖",
    category: "AI Tools",
    featured: true,
  },
  {
    name: "Practical GitHub Actions",
    issuer: "LinkedIn",
    date: "Jan 2026",
    link: "https://www.linkedin.com/learning/certificates/e2d781363da247a09d414aeec5561015426844e1f3eaa866f0e94cec8d6281cb",
    icon: "🔁",
    category: "DevOps",
  },
  {
    name: "Copilot in Word: Create and Refine Documents with AI",
    issuer: "LinkedIn",
    date: "Jan 2026",
    link: "https://www.linkedin.com/learning/certificates/8bec228fa82d5d08a598be9c5ee54b9d69c962707eab302d3491584cd01d9a95",
    icon: "📝",
    category: "AI Productivity",
  },
  {
    name: "Copilot in Outlook: Maximize Your Workday Efficiency",
    issuer: "LinkedIn",
    date: "Jan 2026",
    link: "https://www.linkedin.com/learning/certificates/92ce7f0c82071c56f382a14a7cb552c870bf8b6df4874110a2d56192c01df1ce",
    icon: "📧",
    category: "AI Productivity",
  },
  {
    name: "Copilot in Teams: AI-Powered Collaboration",
    issuer: "LinkedIn",
    date: "Jan 2026",
    link: "https://www.linkedin.com/learning/certificates/6d99a709035a8320d91063c100774b921a6b28da3d22691ac4a5d4b45eec0358",
    icon: "👥",
    category: "AI Productivity",
  },
  {
    name: "Microsoft Copilot: The Art of Prompt Writing",
    issuer: "LinkedIn",
    date: "Jan 2026",
    link: "https://www.linkedin.com/learning/certificates/94207c04aa819b67c8f5d7c43ee8ef02920acd6a7adc38ef4997860e0ac3f1f6",
    icon: "✍️",
    category: "Prompt Engineering",
  },
];
