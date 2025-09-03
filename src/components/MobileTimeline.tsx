import React from "react";
import {
  Calendar,
  MapPin,
  Trophy,
  Building2,
  ExternalLink,
  Clock,
} from "lucide-react";

interface TimelineItem {
  year: string;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  location: string;
  type: "promotion" | "job";
  description?: string;
  companyWebsite?: string;
}

interface MobileTimelineProps {
  experiences: TimelineItem[];
}

export const MobileTimeline: React.FC<MobileTimelineProps> = ({
  experiences,
}) => {
  return (
    <div className="relative px-4 py-6">
      {/* Enhanced vertical timeline line with animated gradient */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 theme-green:from-green-200 theme-green:via-green-400 theme-green:to-green-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-purple-400 to-indigo-500 theme-green:from-green-300 theme-green:via-emerald-400 theme-green:to-teal-500 rounded-full opacity-60 animate-pulse"></div>
      </div>

      <div className="space-y-8">
        {experiences.map((item, index) => {
          const isCurrent = item.endDate === "Present";
          const isPromotion = item.type === "promotion";

          return (
            <div key={index} className="relative flex items-start group">
              {/* Enhanced year badge with current position indicator */}
              <div
                className={`absolute left-2 w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 shadow-2xl z-10 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${
                  isCurrent
                    ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 animate-pulse"
                    : "bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600"
                }`}
              >
                <div className="text-center">
                  <span className="text-white text-sm font-extrabold block leading-tight">
                    {item.year.split(" ")[0]}
                  </span>
                  <span className="text-white text-xs opacity-90 block">
                    {item.year.split(" ")[1]}
                  </span>
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-24 w-full">
                <div
                  className={`rounded-3xl p-6 shadow-xl border-2 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 ${
                    isCurrent
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800"
                      : "bg-white dark:bg-gray-900 border-blue-100 dark:border-blue-900"
                  }`}
                >
                  {/* Header with date and status badges */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          isCurrent
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-blue-100 dark:bg-blue-900/30"
                        }`}
                      >
                        <Calendar
                          className={`w-4 h-4 ${
                            isCurrent
                              ? "text-green-600 dark:text-green-400"
                              : "text-blue-600 dark:text-blue-400 theme-green:text-green-600"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          isCurrent
                            ? "text-green-700 dark:text-green-300"
                            : "text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300"
                        }`}
                      >
                        {item.startDate} - {item.endDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPromotion && (
                        <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1.5 rounded-full shadow-md">
                          <Trophy className="w-3 h-3 text-white" />
                          <span className="text-xs font-bold text-white">
                            Promoted
                          </span>
                        </div>
                      )}

                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                          isCurrent
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 text-white"
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Clock className="w-3 h-3" />
                            Current
                          </>
                        ) : (
                          <>
                            <Trophy className="w-3 h-3" />
                            Completed
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Job title */}
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      isCurrent
                        ? "text-green-700 dark:text-green-200"
                        : "text-blue-700 dark:text-blue-200 theme-green:text-green-700 theme-green:dark:text-green-200"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Company info with website link */}
                  <div
                    className={`rounded-2xl p-4 mb-4 transition-all duration-300 hover:scale-[1.02] ${
                      isCurrent
                        ? "bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
                        : "bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-900/30 dark:to-indigo-900/30 theme-green:from-green-50/70 theme-green:to-emerald-50/70 theme-green:dark:from-green-900/30 theme-green:dark:to-emerald-900/30 border border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isCurrent
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          <Building2
                            className={`w-5 h-5 ${
                              isCurrent
                                ? "text-green-600 dark:text-green-400"
                                : "text-blue-600 dark:text-blue-400 theme-green:text-green-600"
                            }`}
                          />
                        </div>
                        <span
                          className={`font-bold text-base ${
                            isCurrent
                              ? "text-green-700 dark:text-green-300"
                              : "text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300"
                          }`}
                        >
                          {item.company}
                        </span>
                      </div>

                      {item.companyWebsite && (
                        <a
                          href={item.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                            isCurrent
                              ? "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50"
                              : "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          }`}
                          aria-label={`Visit ${item.company} website`}
                        >
                          <ExternalLink
                            className={`w-4 h-4 ${
                              isCurrent
                                ? "text-green-600 dark:text-green-400"
                                : "text-blue-600 dark:text-blue-400 theme-green:text-green-600"
                            }`}
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.location}
                    </span>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-gray-50/70 to-gray-100/70 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
