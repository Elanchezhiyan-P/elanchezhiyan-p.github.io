
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileImageProps {
  src: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withDecorative?: boolean;
}

const ProfileImage = ({ 
  src, 
  alt, 
  fallback, 
  size = "md", 
  className = "",
  withDecorative = true
}: ProfileImageProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40"
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative ${className}`}
      whileHover={{ scale: 1.03 }}
    >
      <Avatar className={`${sizeClasses[size]} border-4 border-white dark:border-gray-800 shadow-lg`}>
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl">
          {fallback}
        </AvatarFallback>
      </Avatar>
      
      {/* Decorative rings */}
      {withDecorative && (
        <>
          <motion.div 
            className={`absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50 -z-10`}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          <motion.div 
            className={`absolute -inset-4 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 opacity-30 -z-20`}
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ 
              duration: 4, 
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </>
      )}
    </motion.div>
  );
};

export default ProfileImage;
