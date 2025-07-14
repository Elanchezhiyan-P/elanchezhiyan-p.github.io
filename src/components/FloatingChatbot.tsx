import React, { useState } from "react";
import { MessageCircle, X, Mail } from "lucide-react";
import ChatbotAvatar from "@/assets/chatbot.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FloatingChatbotProps {
  isMobile?: boolean;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Button */}
      <Button
        className={`fixed z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isMobile ? "bottom-24 right-6" : "bottom-6 right-6"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div
          className={`fixed z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl animate-fade-in bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-blue-100 dark:border-gray-800 flex flex-col overflow-hidden ${
            isMobile ? "bottom-40 right-6" : "bottom-24 right-6"
          }`}
          style={{ minHeight: "340px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-3 bg-gradient-to-r from-blue-600 to-blue-500 theme-green:from-green-600 theme-green:to-green-500 text-white">
            <img
              src={ChatbotAvatar}
              alt="Elan Chatbot Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg">Elan Chatbot</span>
              <span className="text-xs text-blue-100/80 dark:text-blue-200/80">
                Always here to help, even when offline!
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto hover:bg-blue-700 theme-green:hover:bg-green-700 rounded-full p-2 transition-colors"
              aria-label="Close"
              tabIndex={0}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="border-b border-blue-300/30 dark:border-blue-900/30 mx-5" />

          {/* Chat Area */}
          <div className="flex-1 px-5 py-6 bg-gradient-to-br from-blue-100/60 via-white/80 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
            <div className="mb-6 flex flex-col gap-3">
              <div className="flex justify-end">
                <div className="max-w-[70%] px-4 py-3 rounded-2xl shadow text-sm bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-br-none">
                  Hi! Is anyone there?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[70%] px-4 py-3 rounded-2xl shadow text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-gray-700 rounded-bl-none">
                  I'm Currently Offline. Thanks for reaching out! I'm not
                  available for live chat right now, but I'd love to hear from
                  you.
                </div>
              </div>
            </div>
            {/* Typing animation for bot */}
            <div
              className="flex items-center gap-1 mb-2 ml-9"
              aria-hidden="true"
            >
              <span
                className="block w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="block w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="block w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 border-t border-blue-100 dark:border-gray-800 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white rounded-lg transition-colors shadow"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Link>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-400"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
