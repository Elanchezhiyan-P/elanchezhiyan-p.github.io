import { WhatsAppIcon } from "./FloatingSocialSidebar";
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
  Users,
  Loader2,
  Zap,
  Sparkles,
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
  const [showParticles, setShowParticles] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
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
    // Defer particle background until after initial paint to improve FCP/LCP
    const scheduleParticles = () => setShowParticles(true);
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(scheduleParticles, { timeout: 2000 });
    } else {
      setTimeout(scheduleParticles, 1200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Detect route changes for navigation loading state
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

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

  // Loading indicator component with different icons
  const LoadingIndicator = ({ size = "w-4 h-4" }: { size?: string }) => {
    const [iconIndex, setIconIndex] = useState(0);
    const icons = [Loader2, Zap, Sparkles];
    const animations = [
      "loading-icon-rotate",
      "loading-icon-bounce",
      "loading-icon-pulse",
    ];

    useEffect(() => {
      if (isNavigating) {
        const interval = setInterval(() => {
          setIconIndex((prev) => (prev + 1) % icons.length);
        }, 600);
        return () => clearInterval(interval);
      }
    }, [isNavigating, icons.length]);

    if (!isNavigating) return null;

    const IconComponent = icons[iconIndex];
    const animationClass = animations[iconIndex];

    return (
      <IconComponent
        className={`${size} text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400 ${animationClass}`}
      />
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 theme-green:from-green-50 theme-green:via-emerald-50 theme-green:to-teal-100 theme-green:dark:from-green-900 theme-green:dark:via-emerald-800 theme-green:dark:to-teal-900 transition-colors duration-500">
      {/* Navigation progress bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-500">
          <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-50"></div>
        </div>
      )}
      {showParticles && <ParticleBackground />}

      {/* Desktop Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-700 shadow-sm hidden lg:block"
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 theme-green:from-green-700 theme-green:to-emerald-700 bg-clip-text text-transparent tracking-wide"
            aria-label="Elanchezhiyan P - Home"
          >
            Elanchezhiyan P
          </Link>

          {/* Nav Links */}
          <nav
            className="flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link flex items-center gap-1 text-sm font-medium transition-colors duration-300 relative ${
                  isActive(item.href)
                    ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.name}</span>
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 theme-green:bg-green-600 theme-green:dark:bg-green-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Navigation loading indicator */}
            <LoadingIndicator size="w-4 h-4" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
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

      {/* Tablet Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-700 shadow-sm hidden md:block lg:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 theme-green:from-green-700 theme-green:to-emerald-700 bg-clip-text text-transparent tracking-wide"
          >
            Elanchezhiyan P
          </Link>

          {/* Compact Nav Links */}
          <nav className="flex items-center space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link flex items-center gap-1 text-xs font-medium transition-colors duration-300 relative ${
                  isActive(item.href)
                    ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 theme-green:bg-green-600 theme-green:dark:bg-green-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Navigation loading indicator */}
            <LoadingIndicator size="w-3 h-3" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-md md:hidden">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center w-full">
            <div className="flex flex-col">
              <Link
                to="/"
                className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 theme-green:from-green-700 theme-green:to-emerald-700 bg-clip-text text-transparent tracking-wide dark:text-white whitespace-nowrap"
                style={{
                  WebkitTextStroke: "0.5px #222",
                  textShadow: "0 1px 8px rgba(0,0,0,0.25)",
                }}
              >
                Elanchezhiyan P
              </Link>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Full Stack Developer
              </span>
            </div>
            <div className="flex-1" />
            {/* Social Icons flush right */}
            <div className="flex items-center gap-3">
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
              {/* Navigation loading indicator */}
              <LoadingIndicator size="w-4 h-4" />
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
      <main className="page-container pt-12 pb-2 px-4 md:pt-0 md:pb-2 md:px-8 md:max-w-6xl md:mx-auto min-h-[calc(100vh-200px)] transition-all duration-300 ease-in-out">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-3xl shadow-lg flex justify-around py-3 px-6 border border-gray-200 dark:border-gray-700 md:hidden">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`nav-link flex flex-col items-center text-xs font-semibold transition-colors duration-300 ${
              isActive(item.href)
                ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400"
            }`}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            <item.icon className="w-6 h-6 mb-1" />
            {item.name}
            {/* Active indicator */}
            {isActive(item.href) && (
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 theme-green:bg-green-600 theme-green:dark:bg-green-400 rounded-full mt-1" />
            )}
          </Link>
        ))}
        {/* Navigation loading indicator */}
        {isNavigating && (
          <div className="absolute -top-2 right-4">
            <LoadingIndicator size="w-3 h-3" />
          </div>
        )}
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
              className="inline-flex items-center justify-center gap-2 mt-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 rounded-lg transition-colors font-semibold text-white shadow text-base"
            >
              <Users className="h-5 w-5 text-white" />
              <span>Contact Me</span>
            </Link>
            <a
              href="https://elanchezhiyan-p.medium.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-2 bg-white text-blue-600 theme-green:text-green-600 rounded-lg border border-blue-200 theme-green:border-green-200 hover:bg-blue-50 theme-green:hover:bg-green-50 font-semibold shadow text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600 theme-green:text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12v1a4 4 0 01-8 0v-1m8 0V8a4 4 0 00-8 0v4m8 0a4 4 0 01-8 0"
                />
              </svg>
              <span>Subscribe on Medium</span>
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
