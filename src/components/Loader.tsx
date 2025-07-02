import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 theme-green:from-green-50 theme-green:via-emerald-50 theme-green:to-teal-100 theme-green:dark:from-green-900 theme-green:dark:via-emerald-800 theme-green:dark:to-teal-900">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600 p-1 animate-spin z-0" />
            <div className="relative w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden z-10">
              <img
                src="https://avatars.githubusercontent.com/u/29861348?v=4"
                alt="Elanchezhiyan P"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
            Elanchezhiyan P
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Seasoned Software Developer
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 theme-green:bg-green-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-600 theme-green:bg-green-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 theme-green:bg-green-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
