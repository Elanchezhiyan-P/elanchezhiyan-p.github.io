
import { motion } from "framer-motion";

const Loader = () => {
  // Enhanced bracket animations with more dynamic effects
  const bracketVariants = {
    initial: { opacity: 0, y: 20, rotateY: -45 },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateY: 0,
      transition: { 
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced text animation with wave effect
  const textVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: 0.5 + i * 0.1,
        duration: 0.6,
        ease: "backOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 3
      }
    })
  };

  // Enhanced floating animation for name
  const nameVariants = {
    initial: { opacity: 0, scale: 0.5, y: 30 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        delay: 1.5,
        duration: 1,
        ease: "backOut"
      }
    }
  };

  // Enhanced rotating animation with multiple effects
  const rotateVariants = {
    animate: {
      rotateY: [0, 360],
      rotateX: [0, 15, 0],
      transition: {
        rotateY: {
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        },
        rotateX: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  // Glowing effect for brackets
  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 10px rgba(59, 130, 246, 0.5)",
        "0 0 20px rgba(59, 130, 246, 0.8)",
        "0 0 10px rgba(59, 130, 246, 0.5)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const codeText = ".NET Developer";
  const name = "Elanchezhiyan P";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center justify-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Name Display */}
        <motion.div
          className="mb-8"
          variants={nameVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-center"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            {name}
          </motion.h1>
        </motion.div>

        <motion.div className="relative flex items-center justify-center">
          {/* Enhanced Left bracket with glow */}
          <motion.div
            className="text-5xl font-mono text-blue-600 relative"
            variants={bracketVariants}
            initial="initial"
            animate="animate"
          >
            <motion.span
              variants={rotateVariants}
              animate="animate"
              style={{ display: "inline-block" }}
              className="drop-shadow-lg"
            >
              <motion.span
                variants={glowVariants}
                animate="animate"
                className="inline-block"
              >
                {"<"}
              </motion.span>
            </motion.span>
          </motion.div>
          
          {/* Enhanced Text characters with wave and glow effects */}
          <div className="flex mx-4">
            {codeText.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 relative"
                custom={index}
                variants={textVariants}
                initial="initial"
                animate="animate"
                whileHover={{ 
                  scale: 1.3,
                  rotateZ: [0, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          
          {/* Enhanced Right bracket with glow */}
          <motion.div
            className="text-5xl font-mono text-purple-600 relative"
            variants={bracketVariants}
            initial="initial"
            animate="animate"
          >
            <motion.span
              variants={rotateVariants}
              animate="animate"
              style={{ display: "inline-block" }}
              className="drop-shadow-lg"
            >
              <motion.span
                variants={glowVariants}
                animate="animate"
                className="inline-block"
              >
                {"/>"}
              </motion.span>
            </motion.span>
          </motion.div>
        </motion.div>
        
        {/* Enhanced progress bar with multiple layers */}
        <motion.div 
          className="mt-8 relative"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <div className="h-3 w-56 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner relative">
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Main progress bar */}
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced loading text with typewriter effect */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.p
            className="text-gray-600 dark:text-gray-400 font-medium text-lg"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Loading Portfolio...
          </motion.p>
          <motion.div 
            className="flex justify-center mt-2 space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
