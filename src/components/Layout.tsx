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
  const [isMobile, setIsMobile] = useState(false);
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

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => setIsLoading(false), 1800);

    return () => {
      window.removeEventListener("resize", checkMobile);
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
      {!isMobile && (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-700 shadow-sm">
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
      )}

      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-md">
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
      )}

      {/* Main Content */}
      <main
        className={
          isMobile ? "pt-12 pb-2 px-4" : "pt-0 pb-2 px-8 max-w-6xl mx-auto"
        }
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-4 left-4 right-4 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-3xl shadow-lg flex justify-around py-3 px-6 border border-gray-200 dark:border-gray-700">
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
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black/95 backdrop-blur-sm text-gray-300 py-16 mt-2">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-indigo-500 theme-green:from-green-500 theme-green:to-emerald-500 bg-clip-text text-transparent">
              Elanchezhiyan P
            </h3>
            <p className="leading-relaxed max-w-xs">
              Seasoned Software Developer crafting scalable, maintainable cloud
              solutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
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
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <a
              href="https://elanchezhiyan-p.medium.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline theme-green:text-green-400"
            >
              Subscribe on Medium
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <p>Ready to build something amazing together?</p>
            <Link
              to="/contact"
              className="inline-block mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 rounded-lg transition-colors font-semibold"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500 select-none">
          &copy; {new Date().getFullYear()} Elanchezhiyan P. All rights
          reserved.
        </div>
      </footer>

      {/* Floating Components */}
      {!isMobile && <FloatingSocialSidebar />}
      <FloatingChatbot isMobile={isMobile} />

      {/* Theme Settings Panel */}
      {showSettings && <ThemeSettings onClose={() => setShowSettings(false)} />}
    </div>
  );
};
