import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const FloatingSocialSidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 200 });
  const [isVisible, setIsVisible] = useState(true);
  const [isOnRight, setIsOnRight] = useState(false);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/elanchezhiyan-p",
      label: "GitHub",
      hoverColor:
        "hover:bg-gray-800 hover:shadow-gray-500/25 dark:hover:bg-gray-700 dark:hover:shadow-gray-400/25",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/elanchezhiyan-p",
      label: "LinkedIn",
      hoverColor:
        "hover:bg-blue-700 hover:shadow-blue-500/25 dark:hover:bg-blue-600 dark:hover:shadow-blue-400/25 theme-green:hover:bg-green-700 theme-green:hover:shadow-green-500/25 theme-green:dark:hover:bg-green-600 theme-green:dark:hover:shadow-green-400/25",
    },
    {
      icon: Mail,
      href: "mailto:elanche97@gmail.com",
      label: "Email",
      hoverColor:
        "hover:bg-red-600 hover:shadow-red-500/25 dark:hover:bg-red-500 dark:hover:shadow-red-400/25",
    },
    {
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
        </svg>
      ),
      href: "https://medium.com/@elanchezhiyan-p",
      label: "Medium",
      hoverColor:
        "hover:bg-green-600 hover:shadow-green-500/25 dark:hover:bg-green-500 dark:hover:shadow-green-400/25",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const togglePosition = () => {
    if (isOnRight) {
      setPosition({ x: 20, y: position.y });
      setIsOnRight(false);
    } else {
      setPosition({ x: window.innerWidth - 100, y: position.y });
      setIsOnRight(true);
    }
  };

  if (isMobile) {
    return null; // Don't render on mobile, will be handled by Layout component
  }

  return (
    <div
      className="fixed z-40 bg-gradient-to-br from-blue-200/80 via-white/80 to-blue-100/80 dark:from-blue-900/60 dark:via-gray-900/80 dark:to-blue-800/60 theme-green:from-green-200/80 theme-green:via-white/80 theme-green:to-green-100/80 theme-green:dark:from-green-900/60 theme-green:dark:via-gray-900/80 theme-green:dark:to-green-800/60 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-lg border border-blue-300/40 dark:border-blue-800/40 theme-green:border-green-300/40 theme-green:dark:border-green-800/40 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "52px",
        minWidth: "52px",
      }}
    >
      {/* Header with Controls */}
      <div className="flex items-center justify-between p-1 border-b border-blue-300/40 dark:border-blue-800/40 theme-green:border-green-300/40 theme-green:dark:border-green-800/40 bg-gradient-to-r from-blue-100/60 to-blue-200/60 dark:from-blue-900/40 dark:to-blue-800/40 theme-green:from-green-100/60 theme-green:to-green-200/60 theme-green:dark:from-green-900/40 theme-green:dark:to-green-800/40">
        <button
          onClick={togglePosition}
          className="p-1 rounded hover:bg-blue-300/40 dark:hover:bg-blue-800/40 theme-green:hover:bg-green-300/40 theme-green:dark:hover:bg-green-800/40 transition-colors text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 shadow"
          aria-label={isOnRight ? "Move to left side" : "Move to right side"}
        >
          {isOnRight ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-1 rounded hover:bg-blue-300/40 dark:hover:bg-blue-800/40 theme-green:hover:bg-green-300/40 theme-green:dark:hover:bg-green-800/40 transition-colors text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 shadow"
          aria-label={isVisible ? "Hide social links" : "Show social links"}
        >
          {isVisible ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Social Links */}
      {isVisible && (
        <div className="flex flex-col space-y-2 p-2 bg-gradient-to-br from-blue-50/40 via-white/60 to-blue-100/40 dark:from-blue-900/20 dark:via-gray-900/40 dark:to-blue-800/20 theme-green:from-green-50/40 theme-green:via-white/60 theme-green:to-green-100/40 theme-green:dark:from-green-900/20 theme-green:dark:via-gray-900/40 theme-green:dark:to-green-800/20 rounded-b-lg">
          {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 rounded-lg border border-blue-300/40 dark:border-blue-800/40 theme-green:border-green-300/40 theme-green:dark:border-green-800/40 bg-gradient-to-br from-blue-100/60 to-blue-200/60 dark:from-blue-900/40 dark:to-blue-800/40 theme-green:from-green-100/60 theme-green:to-green-200/60 theme-green:dark:from-green-900/40 theme-green:dark:to-green-800/40 text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center ${hoverColor} backdrop-blur-lg shadow`}
              aria-label={label}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
