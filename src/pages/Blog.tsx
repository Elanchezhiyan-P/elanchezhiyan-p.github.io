import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Calendar, ExternalLink, Clock, BookOpen, Eye, ArrowRight } from "lucide-react";
import { SiMedium } from "react-icons/si";
import {
  getCachedBlogData,
  fetchBlogPosts,
  type BlogPost,
} from "@/utils/blogService";
import { trackBlogClick } from "@/utils/analytics";

// ─── Tag colour map ───────────────────────────────────────────────────────────
const TAG_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
];
const tagColor = (i: number) => TAG_COLORS[i % TAG_COLORS.length];

// ─── Skeleton loader card ─────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="h-44 bg-gray-200 dark:bg-gray-800" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [mediumLink, setMediumLink] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>("All");

  useEffect(() => {
    const loadBlogPosts = async () => {
      setIsLoading(true);
      const cached = getCachedBlogData();
      if (cached) {
        setBlogPosts(cached.posts);
        setMediumLink(cached.mediumLink);
        setIsLoading(false);
        try {
          const { posts, mediumLink: link } = await fetchBlogPosts();
          setBlogPosts(posts);
          setMediumLink(link);
        } catch { /* keep cached */ }
      } else {
        try {
          const { posts, mediumLink: link } = await fetchBlogPosts();
          setBlogPosts(posts);
          setMediumLink(link);
        } catch (e) {
          console.error("Failed to fetch blog posts:", e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadBlogPosts();
  }, []);

  // ── Derived data ────────────────────────────────────────────────────────────
  const featuredPost = blogPosts.find((p) => p.isLatest) ?? blogPosts[0];
  const restPosts    = blogPosts.filter((p) => p !== featuredPost);
  const editorialPicks = restPosts.slice(0, 2);
  const gridPosts      = restPosts.slice(2);

  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((p) => p.tags)))];
  const filteredGrid =
    activeTag === "All"
      ? gridPosts
      : gridPosts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <Helmet>
        <title>Blog — Elanchezhiyan P | .NET, Azure & Cloud Articles</title>
        <meta name="description" content="Curated articles on .NET development, Azure cloud, software architecture and engineering best practices by Elanchezhiyan P." />
        <meta name="keywords" content="Elanchezhiyan P Blog, .NET Articles, Azure Tutorials, Cloud Architecture, Programming" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://codebyelan.in/blog" />
      </Helmet>

      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

          {/* ── Page header ───────────────────────────────────────────────── */}
          <div className="relative text-center mb-12 md:mb-16">
            <span className="section-number" style={{ left: "50%", transform: "translateX(-50%)" }}>✍</span>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 mb-4">
                <SiMedium className="w-3 h-3" /> Published on Medium
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-4">
                Blog & Articles
              </h1>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Hand-picked articles on .NET, Azure cloud architecture, and modern software engineering
              </p>
            </div>
          </div>

          {/* ── Stats strip ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { icon: BookOpen,  value: `${blogPosts.length || 10}`,  label: "Articles",     color: "text-blue-600"   },
              { icon: Eye,       value: "~15k+",                       label: "Total Views",  color: "text-emerald-600"},
              { icon: Clock,     value: "5 min",                       label: "Avg. Read",    color: "text-violet-600" },
              { icon: SiMedium,  value: "Medium",                      label: "Platform",     color: "text-gray-700 dark:text-gray-300" },
            ].map(({ icon: Icon, value, label, color }, i) => (
              <div key={i} className="glass rounded-2xl p-4 border border-gray-200/60 dark:border-gray-700/60 flex items-center gap-3 hover:shadow-md transition-shadow duration-300">
                <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-800 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-lg font-extrabold ${color}`}>{value}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Hero: Featured / Latest post ──────────────────────────────── */}
          {isLoading ? (
            <div className="animate-pulse rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-10 h-80 bg-gray-200 dark:bg-gray-800" />
          ) : featuredPost ? (
            <a
              href={featuredPost.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBlogClick(featuredPost.id?.toString())}
              className="group block mb-10 md:mb-14"
            >
              <div className="relative rounded-3xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-400 dark:hover:border-blue-600 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900">
                {/* Image */}
                <div className="relative h-52 md:h-80 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
                        ✦ Latest
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
                        <SiMedium className="w-3 h-3" /> {featuredPost.source}
                      </span>
                      <span className="flex items-center gap-1 text-white/70 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(featuredPost.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-white/70 text-xs">
                        <Clock className="w-3 h-3" /> {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg md:text-2xl font-extrabold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/70 text-sm md:text-base line-clamp-2 max-w-2xl hidden md:block">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-300 group-hover:text-blue-200">
                        Read Article <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="text-white/50 text-xs ml-2">{featuredPost.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ) : null}

          {/* ── Editorial picks: top 2 side by side ───────────────────────── */}
          {!isLoading && editorialPicks.length > 0 && (
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white">Editor's Picks</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {editorialPicks.map((post, i) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackBlogClick(post.id?.toString())}
                    className="group flex gap-4 p-4 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden">
                      <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColor(i)}`}>
                            {post.tags[0] || post.source}
                          </span>
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                        <Clock className="w-3 h-3" /> {post.readTime}
                        <span>·</span>
                        <Eye className="w-3 h-3" /> {post.views}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Tag filter ────────────────────────────────────────────────── */}
          {!isLoading && allTags.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    activeTag === tag
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* ── Articles grid ─────────────────────────────────────────────── */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white">
                All Articles
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({activeTag === "All" ? gridPosts.length : filteredGrid.length})
                </span>
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent" />
            </div>

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredGrid.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No articles found for this tag.</p>
                <button onClick={() => setActiveTag("All")} className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">
                  Show all →
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGrid.map((post, idx) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackBlogClick(post.id?.toString())}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Article number */}
                      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex items-center justify-center text-xs font-extrabold text-gray-700 dark:text-gray-200 shadow">
                        {String(idx + 3).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-4">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 2).map((tag, ti) => (
                          <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColor(ti)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {post.views}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── CTA footer ────────────────────────────────────────────────── */}
          <div className="mt-14">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-700" />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="relative px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <SiMedium className="w-5 h-5 text-white" />
                    <span className="text-white/80 text-sm font-semibold">Follow on Medium</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">
                    More articles every week
                  </h3>
                  <p className="text-white/70 text-sm max-w-md">
                    Stay up to date with .NET tips, Azure patterns, and real-world engineering lessons.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={mediumLink || "https://medium.com/@elanchezhiyan-p"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <SiMedium className="w-4 h-4" /> Follow on Medium
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 backdrop-blur-md text-white font-semibold text-sm border border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-300"
                  >
                    Get In Touch <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Blog;
