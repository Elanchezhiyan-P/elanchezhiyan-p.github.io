
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  
  const toggleChat = () => {
    if (!hasBeenOpened) {
      setHasBeenOpened(true);
    }
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 md:right-8 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-40 overflow-hidden"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
              <div className="font-medium">Chat with Me</div>
              <button 
                onClick={toggleChat}
                className="text-white p-1 hover:bg-white/20 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Hey! I'm currently offline. Feel free to drop an email and I'll get back to you soon.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
                  Contact Form
                </div>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-md text-sm"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-md text-sm"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-md text-sm resize-none"
                  />
                  <motion.button 
                    className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="fixed bottom-4 right-4 md:right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg z-40"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!hasBeenOpened && !isOpen ? 
          { y: [0, -10, 0], transition: { repeat: 3, repeatDelay: 2 }} : {}
        }
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
      
      {!hasBeenOpened && !isOpen && (
        <motion.div
          className="fixed bottom-20 right-4 md:right-8 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg z-40 text-sm max-w-[200px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="relative">
            <div className="absolute -bottom-2 right-3 w-3 h-3 bg-white dark:bg-gray-800 rotate-45"></div>
            <p>Have a question? Click to chat!</p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatbotWidget;
