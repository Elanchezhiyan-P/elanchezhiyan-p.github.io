import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
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
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { NewsletterSignup } from "./NewsletterSignup";
import { ParticleBackground } from "./ParticleBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
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

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 theme-green:from-green-50 theme-green:via-emerald-50 theme-green:to-teal-100 theme-green:dark:from-green-900 theme-green:dark:via-emerald-800 theme-green:dark:to-teal-900 transition-colors duration-500">
      <ParticleBackground />

      {/* Desktop Header */}
      {!isMobile && (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 transition-all duration-300">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-extrabold whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 theme-green:from-green-700 theme-green:via-emerald-700 theme-green:to-teal-700 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform duration-300"
            >
              Elanchezhiyan P
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400 bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className={`w-4 h-4 transition-transform duration-300 ${isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="relative">
                    {item.name}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 rounded-full"></span>
                    )}
                  </span>
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
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-black/85 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              to="/"
              className="text-base font-bold bg-gradient-to-r from-blue-700 to-indigo-700 theme-green:from-green-700 theme-green:to-emerald-700 bg-clip-text text-transparent tracking-wide whitespace-nowrap"
            >
              Elanchezhiyan P
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900 theme-green:hover:bg-green-100 theme-green:dark:hover:bg-green-900 transition"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
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
        <nav className="fixed bottom-4 left-4 right-4 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-3xl shadow-lg flex justify-around items-center py-2.5 px-2 border border-gray-200 dark:border-gray-700">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center text-xs font-semibold transition-colors duration-300 min-w-0 flex-1 ${
                isActive(item.href)
                  ? "text-blue-700 dark:text-blue-400 theme-green:text-green-700 theme-green:dark:text-green-400"
                  : "text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 theme-green:hover:text-green-600 theme-green:dark:hover:text-green-400"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <item.icon className="w-5 h-5 mb-0.5 flex-shrink-0" />
              <span className="text-[10px] leading-tight text-center truncate w-full">{item.name}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Footer */}
      {isMobile ? (
        /* ── MOBILE FOOTER ──────────────────────────────────────────────── */
        <footer className="mt-4 pb-28 bg-gray-950 text-gray-300">
          {/* Top accent line */}
          <div className="h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600" />

          <div className="px-5 pt-8 pb-4 space-y-6">

            {/* ── Brand block ──────────────────────────────────── */}
            <div className="text-center">
              <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 theme-green:from-green-400 theme-green:via-emerald-400 theme-green:to-teal-400 bg-clip-text text-transparent mb-1">
                Elanchezhiyan P
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                Senior .NET &amp; Azure Engineer — building scalable enterprise products.
              </p>
              <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-green-900/40 border border-green-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-green-400">Available for hire</span>
              </div>
            </div>

            {/* ── Social icons ─────────────────────────────────── */}
            <div className="flex justify-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gray-800 border border-gray-700 group-hover:border-blue-500 theme-green:group-hover:border-green-500 group-hover:bg-gray-700 transition-all duration-300 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-gray-300 group-hover:text-blue-400 theme-green:group-hover:text-green-400 transition-colors" />
                  </div>
                  <span className="text-[9px] text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
                </a>
              ))}
              <a
                href="https://topmate.io/elanchezhiyan_poosamani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a Call"
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 theme-green:from-green-600 theme-green:to-emerald-700 border border-blue-500/40 theme-green:border-green-500/40 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-[9px] text-gray-500 group-hover:text-gray-300 transition-colors">Book Call</span>
              </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800" />

            {/* ── Quick links grid ─────────────────────────────── */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center mb-3">Navigation</p>
              <div className="grid grid-cols-3 gap-y-2 gap-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-blue-900/40 text-blue-400 theme-green:bg-green-900/40 theme-green:text-green-400 border border-blue-700/40 theme-green:border-green-700/40"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800" />

            {/* ── CTA strip ────────────────────────────────────── */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 theme-green:from-green-900/40 theme-green:to-emerald-900/40 border border-blue-800/40 theme-green:border-green-800/40 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-gray-200">Let's build together</p>
                <p className="text-[10px] text-gray-500 mt-0.5">elanche97@gmail.com</p>
              </div>
              <Link
                to="/contact"
                className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Contact Me
              </Link>
            </div>

            {/* ── Copyright ────────────────────────────────────── */}
            <p className="text-center text-[10px] text-gray-600 pt-1 select-none">
              &copy; {new Date().getFullYear()} Elanchezhiyan P. All rights reserved.
            </p>

          </div>
        </footer>
      ) : (
        /* ── DESKTOP FOOTER ─────────────────────────────────────────────── */
        <footer className="bg-gray-900 dark:bg-black/95 backdrop-blur-sm text-gray-300 py-6 md:py-8 mt-2">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold mb-1.5 md:mb-2 bg-gradient-to-r from-blue-500 to-indigo-500 theme-green:from-green-500 theme-green:to-emerald-500 bg-clip-text text-transparent">
                Elanchezhiyan P
              </h3>
              <p className="text-xs md:text-sm leading-relaxed max-w-xs">
                Seasoned Software Developer crafting scalable, maintainable cloud solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm">Quick Links</h4>
              <ul className="space-y-1 md:space-y-1.5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-xs md:text-sm hover:text-blue-400 theme-green:hover:text-green-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <NewsletterSignup variant="footer" />
            <div>
              <h4 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm">Get In Touch</h4>
              <p className="text-xs md:text-sm mb-1.5">Ready to build something amazing together?</p>
              <Link
                to="/contact"
                className="inline-block mt-1.5 md:mt-2 px-3 md:px-4 py-1 md:py-1.5 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 rounded-lg transition-colors text-xs md:text-sm font-semibold"
              >
                Contact Me
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-800 text-center text-xs md:text-sm text-gray-500 select-none">
            &copy; {new Date().getFullYear()} Elanchezhiyan P. All rights reserved.
          </div>
        </footer>
      )}

      {/* Floating Components */}
      {!isMobile && <FloatingSocialSidebar />}
      <FloatingChatbot isMobile={isMobile} />
      <FloatingWhatsApp isMobile={isMobile} />

      {/* Exit Intent Popup (desktop only) */}
      {!isMobile && <ExitIntentPopup />}
    </div>
  );
};
