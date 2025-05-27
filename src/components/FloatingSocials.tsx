import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SOCIAL_LINKS } from "@/constants";

const FloatingSocials = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState<"left" | "right">("right");
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
        initial={{ y: 100 }}
        animate={{ y: isOpen ? 0 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-center items-center py-2">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-[-15px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4 rotate-90" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="flex space-x-6 px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {SOCIAL_LINKS.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`fixed ${
        position === "left" ? "left-6" : "right-6"
      } top-1/4 transform -translate-y-1/2 z-30`}
      animate={{ x: isOpen ? 0 : position === "left" ? "-90%" : "90%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        className={`flex ${
          position === "left" ? "flex-row" : "flex-row-reverse"
        } items-center`}
      >
        <motion.div
          className={`flex flex-col space-y-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl py-4 px-3 border border-gray-200 dark:border-gray-700 ${
            position === "left" ? "mr-2 rounded-l-2xl" : "ml-2 rounded-r-2xl"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.3,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <link.icon className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            position === "left" ? "mr-1" : "ml-1"
          } rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 shadow-lg border border-gray-200 dark:border-gray-700`}
          whileHover={{ scale: 1.2, rotate: 180 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {isOpen ? (
            position === "left" ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : position === "left" ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.button
              onClick={() =>
                setPosition(position === "left" ? "right" : "left")
              }
              className={`absolute ${
                position === "left" ? "right-full mr-2" : "left-full ml-2"
              } top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-xs text-gray-600 dark:text-gray-300 font-bold">
                {position === "left" ? "→" : "←"}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FloatingSocials;
