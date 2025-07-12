import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="flex flex-col items-center justify-center">
        {/* Avatar inside animated radiating waves (ripple/sonar effect) */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* Radiating waves */}
          <span className="absolute w-28 h-28 rounded-full border-2 border-blue-400 dark:border-purple-500 animate-wave" />
          <span className="absolute w-20 h-20 rounded-full border-2 border-blue-300 dark:border-purple-400 animate-wave delay-300" />
          <span className="absolute w-12 h-12 rounded-full border-2 border-blue-200 dark:border-purple-300 animate-wave delay-600" />
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 dark:border-purple-500 shadow-xl flex items-center justify-center bg-white dark:bg-gray-900 animate-pulse">
            <img
              src="https://avatars.githubusercontent.com/u/29861348?v=4"
              alt="Elanchezhiyan P"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
          Elanchezhiyan P
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-2 font-medium italic">
          Seasoned Software Developer
        </p>
      </div>
      <style>{`
        @keyframes wave {
          0% { transform: scale(0.7); opacity: 0.7; }
          70% { opacity: 0.3; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-wave {
          animation: wave 1.8s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};
