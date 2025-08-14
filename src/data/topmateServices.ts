// Topmate services configuration for booking flow
export type TopmateService = {
  id: string;
  title: string;
  description: string;
  type: string;
  duration?: string;
  price: number;
  discountPrice?: number;
  badge?: string;
  link: string;
  packageDetails?: Array<{
    title: string;
    duration: string;
    price: number;
  }>;
};

export const topmateServices: TopmateService[] = [
  {
    id: "consultation-30min",
    title: "30-Minute Consultation",
    description: "A quick video call to discuss your project, career, or questions.",
    type: "Video Meeting",
    duration: "30 min",
    price: 49,
    badge: "Popular",
    link: "https://topmate.io/your-profile/consultation-30min"
  },
  {
    id: "resume-review",
    title: "Resume Review",
    description: "Get detailed feedback and suggestions to improve your resume.",
    type: "Digital Product",
    price: 29,
    discountPrice: 19,
    badge: "Best Deal",
    link: "https://topmate.io/your-profile/resume-review"
  },
  {
    id: "mentorship-package",
    title: "Mentorship Package (4 sessions)",
    description: "A package of 4 video sessions for ongoing mentorship and guidance.",
    type: "Package",
    duration: "4 x 45 min",
    price: 199,
    discountPrice: 149,
    badge: "Save 25%",
    link: "https://topmate.io/your-profile/mentorship-package"
  },
  {
    id: "discovery-call",
    title: "Discovery Call",
    description: "Got an idea, project, or challenge—but not sure where to start? Let’s figure it out together in this 1:1 Discovery Call.",
    type: "Video Meeting",
    duration: "15 min",
    price: 0,
    badge: "Free",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648346"
  },
  {
    id: "optimizing-linkedin-profile",
    title: "Optimizing LinkedIn Profile",
    description: "Transform your LinkedIn profile into a powerful tool for career growth. Learn to craft a compelling headline, showcase your unique skills, and much more.",
    type: "Digital Product",
    price: 99,
    badge: "Best Deal",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648411"
  },
  {
    id: "priority-tech-help",
    title: "Priority Tech Help",
    description: "Get priority access for help with your tech projects. From backend systems to frontend frameworks, let's make your project a success.",
    type: "Priority DM",
    price: 299,
    badge: "Premium Support",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648307"
  },
  {
    id: "quick-chat",
    title: "Quick Chat",
    description: "Have a brief discussion about what I do, how I can help you, or ask any short query about interview prep or tech advice.",
    type: "Video Meeting",
    duration: "10 min",
    price: 100,
    discountPrice: 80,
    badge: "Quick Connection",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648352"
  },
  {
    id: "dev-mentor-chat",
    title: "1:1 Dev Mentor Chat",
    description: "Looking to level up your dev skills? Get personalized 1:1 mentorship on coding practices, interview prep, and tech stack guidance.",
    type: "Video Meeting",
    duration: "30 min",
    price: 300,
    discountPrice: 250,
    badge: "Mentorship",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648332"
  },
  {
    id: "ats-resume-format",
    title: "ATS Resume Format",
    description: "Need a clean, professional resume format that passes ATS checks? I provide ready-to-use ATS-compliant templates that are easy to edit and proven to help candidates get interviews.",
    type: "Digital Product",
    price: 49,
    badge: "ATS-Friendly",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648433"
  },
  {
    id: "resume-portfolio-review",
    title: "Resume & Portfolio Review",
    description: "Get expert feedback on your resume and portfolio to make a lasting impression. I’ll help you optimize your content, design, and industry-specific elements to stand out in today’s competitive job market.",
    type: "Video Meeting",
    duration: "30 min",
    price: 150,
    discountPrice: 120,
    badge: "Professional Review",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648290"
  },
  {
    id: "career-kickstart-pack",
    title: "Career Kickstart Pack",
    description:
      "Kickstart your career with a comprehensive package designed for aspiring tech professionals. Includes a Discovery Call, Resume & Portfolio Review, and 1:1 Dev Mentor Chat.",
    type: "Package",
    packageDetails: [
      { title: "Discovery Call", duration: "15 min", price: 0 },
      { title: "Resume & Portfolio Review", duration: "30 min", price: 150 },
      { title: "1:1 Dev Mentor Chat", duration: "30 min", price: 300 }
    ],
    price: 400,
    discountPrice: 350,
    badge: "Career Boost",
    link: "https://topmate.io/elanchezhiyan_poosamani/1648361"
  }
];
