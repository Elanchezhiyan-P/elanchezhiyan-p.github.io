// Official WhatsApp SVG icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24px"
    height="24px"
    {...props}
  >
    <svg viewBox="0 0 496 497">
      <defs>
        <linearGradient
          id="a"
          x1="247.32"
          x2="247.32"
          y1="446.09"
          y2="39.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#20b038" />
          <stop offset="1" stopColor="#60d66a" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="247.32"
          x2="247.32"
          y1="453.37"
          y2="32.61"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f9f9f9" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      <path d="M37.88 453.37l29.59-108A208 208 0 0 1 39.63 241.1c0-115 93.6-208.49 208.56-208.49a208.57 208.57 0 0 1 208.57 208.66c-.05 115-93.62 208.49-208.57 208.49h-.08a208.41 208.41 0 0 1-99.67-25.38zm115.68-66.73l6.34 3.75a173.18 173.18 0 0 0 88.23 24.16h.06c95.55 0 173.31-77.75 173.35-173.3A173.34 173.34 0 0 0 248.26 67.83c-95.62 0-173.38 77.73-173.42 173.28a172.94 172.94 0 0 0 26.5 92.23l4.13 6.55L88 403.84z"></path>
      <path
        fill="url(#a)"
        d="M45.13 446.09l28.57-104.3a200.82 200.82 0 0 1-26.88-100.62c0-111 90.36-201.27 201.34-201.27A201.35 201.35 0 0 1 449.5 241.32c0 111-90.37 201.28-201.33 201.28h-.09a201.31 201.31 0 0 1-96.21-24.49z"
      ></path>
      <path
        fill="url(#b)"
        d="M37.88 453.37l29.59-108A208 208 0 0 1 39.63 241.1c0-115 93.6-208.49 208.56-208.49a208.57 208.57 0 0 1 208.57 208.66c-.05 115-93.62 208.49-208.57 208.49h-.08a208.41 208.41 0 0 1-99.67-25.38zm115.68-66.73l6.34 3.75a173.18 173.18 0 0 0 88.23 24.16h.06c95.55 0 173.31-77.75 173.35-173.3A173.34 173.34 0 0 0 248.26 67.83c-95.62 0-173.38 77.73-173.42 173.28a172.94 172.94 0 0 0 26.5 92.23l4.13 6.55L88 403.84z"
      ></path>
      <path
        fill="#fff"
        d="M196.07 153.94c-3.91-8.68-8-8.85-11.73-9-3-.14-6.51-.13-10-.13a19.15 19.15 0 0 0-13.89 6.52c-4.78 5.22-18.24 17.82-18.24 43.46s18.67 50.42 21.28 53.9 36.05 57.77 89 78.66c44 17.36 53 13.91 62.53 13s30.83-12.61 35.18-24.78 4.34-22.59 3-24.77-4.78-3.48-10-6.08-30.83-15.22-35.61-16.95-8.25-2.61-11.73 2.61-13.45 16.94-16.5 20.42-6.08 3.92-11.29 1.31-22-8.11-41.9-25.86c-15.5-13.82-26-30.87-29-36.09s-.32-8 2.29-10.63c2.34-2.34 5.21-6.09 7.82-9.13s3.47-5.21 5.21-8.69.87-6.52-.44-9.13-11.35-28.34-15.98-38.64z"
      ></path>
    </svg>
  </svg>
);
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  Github,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
  Home,
  User,
  FolderOpen,
  BookOpen,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingSocialSidebar } from "./FloatingSocialSidebar";
import { FloatingChatbot } from "./FloatingChatbot";
import { ParticleBackground } from "./ParticleBackground";
import { ThemeSettings } from "./ThemeSettings";
import { Loader } from "./Loader";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/elanchezhiyan-p",
      label: "GitHub",
      color:
        "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/elanchezhiyan-p",
      label: "LinkedIn",
      color:
        "bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800",
    },
    {
      icon: Mail,
      href: "mailto:elanche97@gmail.com",
      label: "Email",
      color:
        "bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-800",
    },
    {
      icon: WhatsAppIcon,
      href: "https://api.whatsapp.com/send/?phone=919942644999&text&type=phone_number&app_absent=0",
      label: "WhatsApp",
      color:
        "bg-white dark:bg-gray-900 text-green-600 dark:text-green-400 border border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-800",
    },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Initialize theme color
    const savedThemeColor = localStorage.getItem("themeColor") || "blue";
    const root = document.documentElement;
    root.classList.remove("theme-blue", "theme-green");
    if (savedThemeColor === "green") {
      root.style.setProperty("--primary", "142 69% 58%");
      root.style.setProperty("--primary-foreground", "355 7% 97%");
      root.classList.add("theme-green");
    } else {
      root.style.setProperty("--primary", "217.2 91.2% 59.8%");
      root.style.setProperty("--primary-foreground", "222.2 84% 4.9%");
      root.classList.add("theme-blue");
    }

    const timer = setTimeout(() => setIsLoading(false), 1800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 theme-green:from-green-50 theme-green:via-emerald-50 theme-green:to-teal-100 theme-green:dark:from-green-900 theme-green:dark:via-emerald-800 theme-green:dark:to-teal-900 transition-colors duration-500">
      <ParticleBackground />

      {/* Desktop Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-700 shadow-sm hidden md:block">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 theme-green:from-green-700 theme-green:to-emerald-700 bg-clip-text text-transparent tracking-wide"
          >
            Elanchezhiyan P
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="hidden rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition"
              aria-label="Open settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-md md:hidden">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center w-full">
            <Link
              to="/"
              className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 theme-green:from-green-700 theme-green:to-emerald-700 bg-clip-text text-transparent tracking-wide dark:text-white"
              style={{
                WebkitTextStroke: "0.5px #222",
                textShadow: "0 1px 8px rgba(0,0,0,0.25)",
              }}
            >
              Elanchezhiyan P
            </Link>
            <div className="flex-1" />
            {/* Social Icons flush right */}
            <div className="flex items-center gap-1">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-2 transition ${color}`}
                  aria-label={label}
                  style={{ lineHeight: 0 }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="hidden rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition"
                aria-label="Open settings"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-12 pb-2 px-4 md:pt-0 md:pb-2 md:px-8 md:max-w-6xl md:mx-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-3xl shadow-lg flex justify-around py-3 px-6 border border-gray-200 dark:border-gray-700 md:hidden">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center text-xs font-semibold transition-colors duration-300 ${
              isActive(item.href)
                ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400"
            }`}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            <item.icon className="w-6 h-6 mb-1" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black/95 backdrop-blur-sm text-gray-300 pt-16 pb-8 mt-2">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left: Logo, description, socials */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-500 to-indigo-500 theme-green:from-green-500 theme-green:to-emerald-500 bg-clip-text text-transparent">
              Elanchezhiyan P
            </h3>
            <p className="leading-relaxed max-w-xs text-gray-400">
              Building scalable, maintainable cloud solutions with a passion for
              quality and innovation.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-2 transition ${color}`}
                  aria-label={label}
                  style={{ lineHeight: 0 }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Center: Quick Links in two columns */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.slice(0, 3).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-blue-400 theme-green:hover:text-green-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 invisible md:visible">
                &nbsp;
              </h4>
              <ul className="space-y-2">
                {navigation.slice(3).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-blue-400 theme-green:hover:text-green-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right: Contact info and CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <p className="text-gray-400">
              Ready to build something amazing together? Let's connect and turn
              your ideas into reality.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 rounded-lg transition-colors font-semibold text-white shadow"
            >
              Contact Me
            </Link>
            <a
              href="https://elanchezhiyan-p.medium.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-6 py-2 bg-white text-blue-600 theme-green:text-green-600 rounded-lg border border-blue-200 theme-green:border-green-200 hover:bg-blue-50 theme-green:hover:bg-green-50 font-semibold shadow"
            >
              Subscribe on Medium
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500 select-none">
          &copy; {new Date().getFullYear()} Elanchezhiyan P. All rights
          reserved.
        </div>
      </footer>

      {/* Floating Components */}
      <div className="hidden md:block">
        <FloatingSocialSidebar />
      </div>
      <div className="block">
        <FloatingChatbot />
      </div>

      {/* Theme Settings Panel */}
      {showSettings && <ThemeSettings onClose={() => setShowSettings(false)} />}
    </div>
  );
};
