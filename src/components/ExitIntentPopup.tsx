import React, { useState, useEffect } from "react";
import { X, Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackExitIntentShown, trackExitIntentAction } from "@/utils/analytics";

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem("exitIntentShown");
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to the top of the page (exit intent)
      if (e.clientY <= 5 && !sessionStorage.getItem("exitIntentShown")) {
        setIsVisible(true);
        sessionStorage.setItem("exitIntentShown", "true");
        trackExitIntentShown();
      }
    };

    // Only add listener after a delay so it doesn't trigger immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsVisible(false)}
      />

      {/* Popup */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full animate-scale-in overflow-hidden">
        {/* Gradient top bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600" />

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-600 theme-green:to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">👋</span>
          </div>

          <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white">
            Wait, before you go!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            Looking for a skilled developer? Let's chat about your project — free consultation, no strings attached.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <a
              href="https://topmate.io/elanchezhiyan_poosamani"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExitIntentAction("Book a Free Call")}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 theme-green:from-green-600 theme-green:via-emerald-600 theme-green:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/contact"
              onClick={() => {
                trackExitIntentAction("Send a Message");
                setIsVisible(false);
              }}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              Send a Message
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            No spam, just a friendly conversation about your needs.
          </p>
        </div>
      </div>
    </div>
  );
};
