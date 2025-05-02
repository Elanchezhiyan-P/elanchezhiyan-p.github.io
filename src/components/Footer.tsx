import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  const footerLinks = [
    {
      heading: "Pages",
      links: [
        { text: "Home", path: "/" },
        { text: "About", path: "/about" },
        { text: "Projects", path: "/projects" },
        { text: "Blog", path: "/blog" },
        { text: "Contact", path: "/contact" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { text: "Open Source", path: "/projects?filter=opensource" },
        { text: "NuGet Packages", path: "/projects?filter=nuget" },
        { text: "Medium Articles", path: "/blog" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { text: "Email", path: "mailto:elanche97@gmail.com" },
        {
          text: "LinkedIn",
          path: "https://www.linkedin.com/in/elanchezhiyan-p/",
        },
        { text: "Twitter", path: "https://x.com/always_elan_p" },
      ],
    },
  ];

  return (
    <footer className="bg-azure-50 dark:bg-azure-950/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-azure-700 mb-4 block"
            >
              Elanchezhiyan P
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Full-stack developer specializing in .NET, Azure, and cloud
              technologies. Building secure, scalable applications and sharing
              knowledge.
            </p>
            <div className="flex space-x-4">
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
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading} className="lg:col-span-1">
              <h3 className="font-semibold mb-4 text-lg">{group.heading}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.text}>
                    {link.path.startsWith("/") ? (
                      <Link
                        to={link.path}
                        className="text-muted-foreground hover:text-azure-600 transition-colors"
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <a
                        href={link.path}
                        target={
                          link.path.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-azure-600 transition-colors"
                      >
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-center md:text-left md:flex md:justify-center md:items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Elanchezhiyan P. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
