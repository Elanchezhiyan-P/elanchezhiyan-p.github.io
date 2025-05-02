import { useEffect, useState } from "react";
import { Circle, Code, Package } from "lucide-react";

const Loader = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="w-32 h-32 rounded-full azure-gradient flex items-center justify-center mb-8">
          <img
            src="https://avatars.githubusercontent.com/u/29861348?v=4"
            alt="Elanchezhiyan"
            className="w-28 h-28 rounded-full"
          />
        </div>

        {/* Rotating circle animation around the logo */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Circle
            className={`absolute text-azure-600 transition-all duration-500 ease-in-out ${
              animationStep === 0
                ? "opacity-100 top-0 left-1/2 -translate-x-1/2 -translate-y-4"
                : "opacity-0"
            }`}
            size={30}
          />
          <Code
            className={`absolute text-azure-600 transition-all duration-500 ease-in-out ${
              animationStep === 1
                ? "opacity-100 top-1/2 right-0 translate-y-0 translate-x-4"
                : "opacity-0"
            }`}
            size={30}
          />
          <Package
            className={`absolute text-azure-600 transition-all duration-500 ease-in-out ${
              animationStep === 2
                ? "opacity-100 bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
                : "opacity-0"
            }`}
            size={30}
          />
          <Code
            className={`absolute text-azure-600 transition-all duration-500 ease-in-out ${
              animationStep === 3
                ? "opacity-100 top-1/2 left-0 translate-y-0 -translate-x-4"
                : "opacity-0"
            }`}
            size={30}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="text-xl font-medium text-azure-600 mb-3">
          Elanchezhiyan P
        </div>
        <div className="w-48 bg-muted rounded-full h-1 mb-2 overflow-hidden">
          <div className="bg-azure-600 h-1 animate-[loader-progress_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default Loader;
