import React from "react";
import { Calendar, MapPin, Trophy, Building2 } from "lucide-react";

interface TimelineItem {
  year: string;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  location: string;
  type: "promotion" | "job";
  description?: string;
}

interface MobileTimelineProps {
  experiences: TimelineItem[];
}

export const MobileTimeline: React.FC<MobileTimelineProps> = ({
  experiences,
}) => {
  return (
    <div className="relative px-2 py-4">
      {/* Vertical timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 theme-green:from-green-300 theme-green:via-green-500 theme-green:to-green-800 rounded-full shadow-lg"></div>

      <div className="space-y-10">
        {experiences.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Year badge */}
            <div className="absolute left-4 w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 rounded-full border-4 border-white dark:border-gray-900 shadow-xl z-10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-base font-extrabold">
                {item.year.split(" ")[0]}
              </span>
            </div>

            <div className="ml-20 w-full">
              <div className="rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600 theme-green:text-green-600" />
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  {item.type === "promotion" && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full">
                      <Trophy className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white">
                        Promoted
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-200 theme-green:text-green-700 theme-green:dark:text-green-200">
                  {item.title}
                </h3>

                <div className="rounded-xl p-3 mb-3 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-900/30 dark:to-indigo-900/30 theme-green:from-green-50/70 theme-green:to-emerald-50/70 theme-green:dark:from-green-900/30 theme-green:dark:to-emerald-900/30">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600 theme-green:text-green-600" />
                    <span className="font-bold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 text-base">
                      {item.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.location}
                  </span>
                </div>

                {item.description && (
                  <div className="rounded-xl p-4 mb-3 bg-gradient-to-br from-gray-50/70 to-gray-100/70 dark:from-gray-800/50 dark:to-gray-900/50 border border-blue-50 dark:border-blue-900">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 text-white shadow">
                    {index === experiences.length - 1
                      ? "📍 Current"
                      : "✅ Completed"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
