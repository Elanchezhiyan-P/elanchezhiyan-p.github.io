import React from "react";
import { Loader2, Zap, Sparkles } from "lucide-react";

export const RouteLoader: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="text-center">
        {/* Main loading icon with pulsing effect */}
        <div className="relative mb-4">
          <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 theme-green:text-green-600 theme-green:dark:text-green-400 loading-icon-rotate mx-auto" />
          <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-300 theme-green:text-green-500 theme-green:dark:text-green-300 loading-icon-pulse absolute -top-1 -right-1" />
        </div>

        {/* Animated dots */}
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 theme-green:bg-green-600 theme-green:dark:bg-green-400 rounded-full loading-icon-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 theme-green:bg-green-600 theme-green:dark:bg-green-400 rounded-full loading-icon-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 theme-green:bg-green-600 theme-green:dark:bg-green-400 rounded-full loading-icon-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
