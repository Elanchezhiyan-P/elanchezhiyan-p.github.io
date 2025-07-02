
import React, { useState } from 'react';
import { MessageCircle, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FloatingChatbotProps {
  isMobile?: boolean;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Button */}
      <Button
        className={`fixed z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isMobile ? 'bottom-24 right-6' : 'bottom-6 right-6'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className={`fixed z-50 w-80 max-w-[calc(100vw-2rem)] glass rounded-lg p-6 shadow-xl animate-slide-up ${
          isMobile ? 'bottom-40 right-6' : 'bottom-24 right-6'
        }`}>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 theme-green:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              I'm Currently Offline
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thanks for reaching out! I'm not available for live chat right now, but I'd love to hear from you.
            </p>
            <div className="flex flex-col space-y-2">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 theme-green:bg-green-600 theme-green:hover:bg-green-700 text-white rounded-lg transition-colors"
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
        </div>
      )}
    </>
  );
};
