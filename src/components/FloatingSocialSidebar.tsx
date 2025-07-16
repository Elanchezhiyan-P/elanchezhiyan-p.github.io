import React, { useState, useEffect } from "react";
// Official WhatsApp SVG icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="white"
    width="24px"
    height="24px"
    className="w-5 h-5"
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
          <stop offset="0" stopColor="#20b038"></stop>
          <stop offset="1" stopColor="#60d66a"></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="247.32"
          x2="247.32"
          y1="453.37"
          y2="32.61"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f9f9f9"></stop>
          <stop offset="1" stopColor="#fff"></stop>
        </linearGradient>
      </defs>
      <path d="M37.88 453.37l29.59-108A208 208 0 0 1 39.63 241.1c0-115 93.6-208.49 208.56-208.49a208.57 208.57 0 0 1 208.57 208.66c-.05 115-93.62 208.49-208.57 208.49h-.08a208.41 208.41 0 0 1-99.67-25.38zm115.68-66.73l6.34 3.75a173.18 173.18 0 0 0 88.23 24.16h.06c95.55 0 173.31-77.75 173.35-173.3A173.34 173.34 0 0 0 248.26 67.83c-95.62 0-173.38 77.73-173.42 173.28a172.94 172.94 0 0 0 26.5 92.23l4.13 6.55L88 403.84z"></path>
      <path
        fill="#20b038"
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
      icon: (props: any) => (
        <Github className="w-4 h-4" {...props} style={{ color: "#181717" }} />
      ),
      href: "https://github.com/elanchezhiyan-p",
      label: "GitHub",
      hoverColor: "hover:shadow-gray-500/25 dark:hover:shadow-gray-400/25",
    },
    {
      icon: (props: any) => (
        <Linkedin className="w-4 h-4" {...props} style={{ color: "#0077B5" }} />
      ),
      href: "https://linkedin.com/in/elanchezhiyan-p",
      label: "LinkedIn",
      hoverColor:
        "hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25 theme-green:hover:shadow-green-500/25 theme-green:dark:hover:shadow-green-400/25",
    },
    {
      icon: (props: any) => (
        <Mail className="w-4 h-4" {...props} style={{ color: "#EA4335" }} />
      ),
      href: "mailto:elanche97@gmail.com",
      label: "Email",
      hoverColor: "hover:shadow-red-500/25 dark:hover:shadow-red-400/25",
    },
    {
      icon: WhatsAppIcon,
      href: "https://api.whatsapp.com/send/?phone=919942644999&text&type=phone_number&app_absent=0",
      label: "WhatsApp",
      hoverColor: "hover:shadow-green-500/25 dark:hover:shadow-green-400/25",
    },
    {
      icon: (props: any) => (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="#00ab6c"
          aria-label="Medium"
          {...props}
        >
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
        </svg>
      ),
      href: "https://medium.com/@elanchezhiyan-p",
      label: "Medium",
      hoverColor: "hover:shadow-green-500/25 dark:hover:shadow-green-400/25",
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
      className="fixed z-40 bg-gradient-to-br from-blue-200/80 via-white/80 to-blue-100/80 dark:from-blue-900/60 dark:via-gray-900/80 dark:to-blue-800/60 theme-green:from-green-200/80 theme-green:via-white/80 theme-green:to-green-100/80 theme-green:dark:from-green-900/60 theme-green:dark:via-gray-900/80 theme-green:dark:to-green-800/60 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-lg border border-blue-300/40 dark:border-blue-800/40 theme-green:border-green-300/40 theme-green:dark:border-green-800/40 shadow-lg hidden md:block"
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
              className={`w-8 h-8 rounded-lg border border-blue-300/40 dark:border-blue-800/40 theme-green:border-green-300/40 theme-green:dark:border-green-800/40 bg-gradient-to-br from-blue-100/60 to-blue-200/60 dark:from-blue-900/40 dark:to-blue-800/40 theme-green:from-green-100/60 theme-green:to-green-200/60 theme-green:dark:from-green-900/40 theme-green:dark:to-green-800/40 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center ${hoverColor} backdrop-blur-lg shadow`}
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
