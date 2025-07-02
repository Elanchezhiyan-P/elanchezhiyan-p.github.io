import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Eye, EyeOff } from "lucide-react";

export const FloatingSocialSidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/elanchezhiyan-p",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/elanchezhiyan-p",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:elanche97@gmail.com", label: "Email" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const handleMouseMove = (e: MouseEvent) => {
        const newX = Math.max(
          0,
          Math.min(window.innerWidth - 60, e.clientX - offsetX)
        );
        const newY = Math.max(
          0,
          Math.min(window.innerHeight - 250, e.clientY - offsetY)
        );
        setPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  if (isMobile) {
    return null; // Don't render on mobile, will be handled by Layout component
  }

  return (
    <div
      className={`fixed z-40 glass rounded-lg transition-all duration-300 ${
        isDragging ? "scale-110 shadow-xl" : "hover:scale-105"
      }`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-2 border-b border-white/10">
        <div className="cursor-move flex-1" onMouseDown={handleMouseDown}>
          <div className="w-6 h-1 bg-gray-400 rounded-full mx-auto"></div>
        </div>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="p-1 rounded hover:bg-white/10 transition-colors"
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
        <div className="flex flex-col space-y-3 p-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 theme-green:bg-green-600 theme-green:hover:bg-green-700 theme-green:hover:shadow-green-500/25"
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
