import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * First-paint boot screen, styled like the terminal hero on the homepage so
 * it reads as one brand rather than a generic spinner. Shows once per tab
 * session (sessionStorage-gated) and for a fixed minimum duration so it never
 * flashes on a fast connection — then fades out and unmounts for good.
 */
export const Preloader: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem("preloaderShown"),
  );

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem("preloaderShown", "true");
    const timer = setTimeout(() => setVisible(false), prefersReducedMotion ? 0 : 900);
    return () => clearTimeout(timer);
  }, [visible, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900 dark:bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 font-mono text-sm md:text-base text-gray-300">
            <span className="text-green-400">$</span>
            <span>booting elan@cloud</span>
            <span
              className={`inline-block w-2 h-4 bg-gray-300 ml-0.5 ${
                prefersReducedMotion ? "" : "animate-pulse"
              }`}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
