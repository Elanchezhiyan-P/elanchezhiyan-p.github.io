import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { Award, Youtube, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { trackAchievementClick } from "@/utils/analytics";

const YOUTUBE_VIDEO_ID = "kI_edk-3tew";
const YOUTUBE_URL = `https://youtu.be/${YOUTUBE_VIDEO_ID}`;
const YOUTUBE_THUMBNAIL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
const ARTICLE_URL =
  "https://elanchezhiyan-p.medium.com/benchmarking-healthcare-pdf-generation-in-net-535cdfb00f86";

const TECHNOLOGIES = [
  "C#",
  ".NET",
  "IronPDF",
  "QuestPDF",
  "iText",
  "PDF",
  "Benchmarking",
  "Healthcare",
];

/* Mirrors the motion primitives defined in src/pages/Index.tsx so this
 * section's reveal/press feel matches the rest of the page. */
const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const EASE_OUT = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
const VIEWPORT = { once: true, margin: "-100px" };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ...SPRING, opacity: EASE_OUT } },
};

const stagger = (staggerChildren: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: 0.05 } },
});

const reveal = (staggerChildren = 0.1) => ({
  variants: stagger(staggerChildren),
  initial: "hidden",
  whileInView: "show",
  viewport: VIEWPORT,
});

const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: SPRING,
};

export const RecognitionSection = () => {
  const [videoActive, setVideoActive] = useState(false);

  return (
    <motion.section
      className="container mx-auto px-4 pt-8 pb-4 relative z-0"
      aria-labelledby="recognition-heading"
      {...reveal(0.05)}
    >
      <div className="text-center mb-6 md:mb-8">
        <motion.div
          variants={fadeUp}
          className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 theme-green:bg-green-50 theme-green:dark:bg-green-900/20 border border-blue-200 dark:border-blue-800 theme-green:border-green-200 theme-green:dark:border-green-800 mb-2"
        >
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 theme-green:text-green-700 theme-green:dark:text-green-300">
            🏆 Recognition
          </span>
        </motion.div>
        <motion.h2
          id="recognition-heading"
          variants={fadeUp}
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 theme-green:from-green-600 theme-green:to-emerald-600 bg-clip-text text-transparent"
        >
          Achievements & Recognition
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto"
        >
          A recognition earned through hands-on engineering, technical
          research, and contributions to the developer community.
        </motion.p>
      </div>

      <motion.div variants={fadeUp} className="max-w-4xl mx-auto">
        <Card className="group relative overflow-hidden border-2 border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 hover:border-blue-400 dark:hover:border-blue-600 theme-green:hover:border-green-400 theme-green:dark:hover:border-green-600 rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 theme-green:hover:shadow-green-500/20 theme-green:dark:hover:shadow-green-500/30 transition-[box-shadow,border-color] duration-500">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 theme-green:from-green-500 theme-green:via-emerald-500 theme-green:to-teal-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 theme-green:group-hover:from-green-500/5 theme-green:group-hover:via-emerald-500/5 theme-green:group-hover:to-teal-500/5 transition-all duration-500" />

          <CardContent className="relative p-5 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start">
              {/* Details */}
              <div className="space-y-4 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300/60 dark:border-amber-700/50">
                    <span className="text-lg" aria-hidden="true">
                      🥈
                    </span>
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 tracking-wide uppercase">
                      Runner-Up
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    IronPDF Writing Contest
                  </Badge>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg md:text-2xl leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 theme-green:group-hover:text-green-600 theme-green:dark:group-hover:text-green-400 transition-colors duration-300">
                  Healthcare PDF Generation Benchmark in .NET
                </h3>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Runner-up recognition in the IronPDF Writing Contest for a
                  technical article and video tutorial benchmarking three
                  .NET PDF generation libraries — IronPDF, QuestPDF, and
                  iText — using a healthcare document generation scenario.
                  The work covered designing the benchmark scenario,
                  implementing all three approaches, defining a
                  benchmarking methodology, and publishing the results as a
                  technical article and video tutorial.
                </p>

                <ul
                  className="flex flex-wrap gap-1.5 md:gap-2 list-none p-0 m-0"
                  aria-label="Technologies used"
                >
                  {TECHNOLOGIES.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.div {...pressable}>
                    <Button
                      asChild
                      className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <a
                        href={YOUTUBE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackAchievementClick(
                            "IronPDF Writing Contest - YouTube"
                          )
                        }
                        aria-label="Watch the IronPDF Writing Contest tutorial on YouTube (opens in a new tab)"
                      >
                        <Youtube className="w-4 h-4 mr-2" aria-hidden="true" />
                        Watch on YouTube
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div {...pressable}>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto border-blue-300 dark:border-blue-700 theme-green:border-green-300 theme-green:dark:border-green-700"
                    >
                      <a
                        href={ARTICLE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackAchievementClick(
                            "IronPDF Writing Contest - Article"
                          )
                        }
                        aria-label="Read the technical article (opens in a new tab)"
                      >
                        <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                        Read Technical Article
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Media */}
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-blue-200/50 dark:border-blue-800/50 theme-green:border-green-200/50 theme-green:dark:border-green-800/50 aspect-video bg-gray-900">
                  {videoActive ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                      title="IronPDF Writing Contest - Healthcare PDF Generation Benchmark in .NET"
                      allow="accelerate-media; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        trackAchievementClick(
                          "IronPDF Writing Contest - Video Play"
                        );
                        setVideoActive(true);
                      }}
                      className="group/play absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      aria-label="Play the IronPDF Writing Contest tutorial video"
                    >
                      <img
                        src={YOUTUBE_THUMBNAIL}
                        alt="Thumbnail for the IronPDF Writing Contest healthcare PDF generation benchmark tutorial"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-black/30 group-hover/play:bg-black/40 transition-colors duration-300" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 shadow-xl">
                          <Play
                            className="w-6 h-6 md:w-7 md:h-7 text-red-600 fill-red-600"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};
