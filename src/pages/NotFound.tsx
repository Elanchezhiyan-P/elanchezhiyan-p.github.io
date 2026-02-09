import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowRight, BookOpen, FolderOpen, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error at:", location.pathname);
  }, [location.pathname]);

  const suggestedPages = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      description: "Back to the homepage",
    },
    {
      name: "About Me",
      href: "/about",
      icon: User,
      description: "Learn about my experience",
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderOpen,
      description: "View my portfolio work",
    },
    {
      name: "Blog",
      href: "/blog",
      icon: BookOpen,
      description: "Read my latest articles",
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Phone,
      description: "Get in touch with me",
    },
  ];

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Elanchezhiyan P</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                404
              </h1>
              <div className="absolute -top-2 -right-4 text-4xl animate-bounce">
                🔍
              </div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-base">
            The page{" "}
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
              {location.pathname}
            </code>{" "}
            doesn't exist.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            It might have been moved, deleted, or perhaps the URL is incorrect.
          </p>

          {/* Primary CTA */}
          <Link to="/">
            <Button
              size="lg"
              className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>

          {/* Suggested Pages */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
              Or try one of these pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestedPages.map((page) => (
                <Link
                  key={page.name}
                  to={page.href}
                  className="group flex items-center gap-3 p-4 rounded-xl glass border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <page.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {page.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {page.description}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
