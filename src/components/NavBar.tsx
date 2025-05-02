import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Projects", path: "/projects" },
    { text: "Blog", path: "/blog" },
    { text: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Mail, href: "mailto:elanche97@gmail.com", label: "Email" },
    {
      icon: Github,
      href: "https://github.com/elanchezhiyan-p",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/elanchezhiyan-p/",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/alwayselanchezhiyan",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/always_elanchezhiyan/",
      label: "Instagram",
    },
    { icon: Twitter, href: "https://x.com/always_elan_p", label: "Twitter" },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-azure-700">
          Elanchezhiyan P
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-base font-medium hover:text-azure-600 transition-colors",
                    location.pathname === link.path
                      ? "text-azure-600"
                      : "text-foreground"
                  )}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-foreground/80 hover:text-azure-600 transition-colors"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-md animate-fade-in">
          <nav className="container mx-auto px-4 py-6">
            <ul className="space-y-4 mb-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "block text-lg font-medium py-2 hover:text-azure-600 transition-colors",
                      location.pathname === link.path
                        ? "text-azure-600"
                        : "text-foreground"
                    )}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex space-x-6 pt-4 border-t border-border">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-foreground/80 hover:text-azure-600 transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
