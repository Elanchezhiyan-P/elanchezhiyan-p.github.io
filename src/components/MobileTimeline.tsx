
import React from 'react';
import { Calendar, MapPin, Trophy, Building2 } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  location: string;
  type: 'promotion' | 'job';
  description?: string;
}

interface MobileTimelineProps {
  experiences: TimelineItem[];
}

export const MobileTimeline: React.FC<MobileTimelineProps> = ({ experiences }) => {
  return (
    <div className="relative px-4">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 theme-green:from-green-300 theme-green:via-green-500 theme-green:to-green-800 rounded-full shadow-lg"></div>
      
      <div className="space-y-6 md:space-y-12">
        {experiences.map((item, index) => (
          <div key={index} className="relative flex items-start">
            <div className="absolute left-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 rounded-full border-2 md:border-4 border-white dark:border-gray-900 shadow-xl z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="text-white text-[10px] md:text-xs font-bold">
                {item.year.split(' ')[0].slice(-2)}
              </div>
            </div>

            <div className="ml-16 md:ml-20 w-full">
              <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 hover-glow transition-all duration-500 backdrop-blur-xl border border-white/20 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/50 dark:to-gray-900/30">
                <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 theme-green:from-green-500 theme-green:to-emerald-600">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent px-2 md:px-3 py-0.5 md:py-1 rounded-full glass">
                      {item.year}
                    </span>
                  </div>
                  {item.type === 'promotion' && (
                    <div className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                      <Trophy className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      <span className="text-[10px] md:text-xs font-bold text-white">Promoted</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                
                <div className="glass rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/30 dark:to-indigo-900/30 theme-green:from-green-50/50 theme-green:to-emerald-50/50 theme-green:dark:from-green-900/30 theme-green:dark:to-emerald-900/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 theme-green:text-green-600 flex-shrink-0" />
                    <span className="font-bold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300 text-sm md:text-lg break-words">
                      {item.company}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {item.location}
                  </span>
                </div>
                
                {item.description && (
                  <div className="glass rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 backdrop-blur-sm bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-white/20">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-600 text-white shadow-lg">
                    {index === experiences.length - 1 ? '📍 Current' : '✅ Completed'}
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
