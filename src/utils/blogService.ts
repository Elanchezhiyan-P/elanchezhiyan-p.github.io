import axios from "axios";

const BLOG_CACHE_KEY = "blog_posts_cache";
const BLOG_CACHE_TIMESTAMP_KEY = "blog_posts_cache_timestamp";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
const MEDIUM_USERNAME = "elanchezhiyan-p";

const fallbackImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop",
];

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  image: string;
  isLatest: boolean;
  source: string;
  url: string;
  views: string;
}

interface BlogCache {
  posts: BlogPost[];
  mediumLink: string;
  timestamp: number;
}

export const getCachedBlogData = (): BlogCache | null => {
  try {
    const cachedData = localStorage.getItem(BLOG_CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(BLOG_CACHE_TIMESTAMP_KEY);

    if (!cachedData || !cachedTimestamp) {
      return null;
    }

    const timestamp = parseInt(cachedTimestamp, 10);
    const now = Date.now();

    // Check if cache is still valid (within 30 minutes)
    if (now - timestamp > CACHE_DURATION) {
      // Cache expired, remove it
      localStorage.removeItem(BLOG_CACHE_KEY);
      localStorage.removeItem(BLOG_CACHE_TIMESTAMP_KEY);
      return null;
    }

    return JSON.parse(cachedData);
  } catch (error) {
    console.error("Error reading blog cache:", error);
    return null;
  }
};

export const setCachedBlogData = (posts: BlogPost[], mediumLink: string): void => {
  try {
    const cacheData: BlogCache = {
      posts,
      mediumLink,
      timestamp: Date.now(),
    };
    localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(cacheData));
    localStorage.setItem(BLOG_CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error("Error saving blog cache:", error);
  }
};

const MEDIUM_PROFILE_URL = `https://medium.com/@${MEDIUM_USERNAME}`;

// Static fallback posts — shown when the RSS API is unavailable.
// Update these when new articles are published on Medium.
const STATIC_FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1, title: "Diagnosing Memory Leaks in .NET Production Apps",
    excerpt: "A practical guide to identifying and resolving memory leaks in .NET applications running in production using diagnostic tools and profiling techniques…",
    date: "2026-03-10", readTime: "6 min read", author: "Elanchezhiyan P",
    tags: [".NET", "Performance", "Debugging"], image: fallbackImages[0],
    isLatest: true, source: "Medium", url: MEDIUM_PROFILE_URL, views: "2.1k",
  },
  {
    id: 2, title: "EF Core Query Performance Pitfalls to Avoid",
    excerpt: "Common Entity Framework Core mistakes that silently kill your app's performance, and how to fix them with proper query strategies and AsNoTracking…",
    date: "2026-02-14", readTime: "5 min read", author: "Elanchezhiyan P",
    tags: ["EF Core", ".NET", "SQL"], image: fallbackImages[1],
    isLatest: false, source: "Medium", url: MEDIUM_PROFILE_URL, views: "1.8k",
  },
  {
    id: 3, title: "How I Reduced .NET API Response Time from 8s to 200ms",
    excerpt: "Step-by-step breakdown of the optimization techniques used to achieve a 40x performance improvement in a real-world .NET Core Web API…",
    date: "2026-01-23", readTime: "7 min read", author: "Elanchezhiyan P",
    tags: [".NET", "Performance", "Azure"], image: fallbackImages[2],
    isLatest: false, source: "Medium", url: MEDIUM_PROFILE_URL, views: "3.4k",
  },
  {
    id: 4, title: "Healthcare PDF Generation: QuestPDF vs IronPDF Benchmark",
    excerpt: "Benchmarking two popular .NET PDF libraries for generating clinical discharge summaries — comparing speed, memory, output size, and developer experience…",
    date: "2025-12-26", readTime: "8 min read", author: "Elanchezhiyan P",
    tags: [".NET", "PDF", "Benchmarking"], image: fallbackImages[3],
    isLatest: false, source: "Medium", url: MEDIUM_PROFILE_URL, views: "1.5k",
  },
  {
    id: 5, title: "Building a Smart Finance System with Electron, React & SQLite",
    excerpt: "How I built an offline-first desktop finance app for small businesses using Electron, React, TypeScript, and SQLite with automated EMI scheduling…",
    date: "2025-12-22", readTime: "6 min read", author: "Elanchezhiyan P",
    tags: ["Electron", "React", "SQLite"], image: fallbackImages[4],
    isLatest: false, source: "Medium", url: MEDIUM_PROFILE_URL, views: "1.2k",
  },
  {
    id: 6, title: "Async/Await in .NET APIs for Better Scalability",
    excerpt: "Understanding the real-world impact of async/await on .NET API scalability, thread pool usage, and how to avoid common pitfalls like async-over-sync…",
    date: "2025-10-10", readTime: "5 min read", author: "Elanchezhiyan P",
    tags: [".NET", "Async", "Scalability"], image: fallbackImages[0],
    isLatest: false, source: "Medium", url: MEDIUM_PROFILE_URL, views: "2.0k",
  },
];

export const fetchBlogPosts = async (): Promise<{ posts: BlogPost[]; mediumLink: string }> => {
  try {
    const res = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      { timeout: 8000 }
    );

    // Validate the response has the expected structure
    if (!res.data || typeof res.data !== "object" || !Array.isArray(res.data.items) || res.data.status === "error") {
      console.warn("rss2json returned an unexpected response, using fallback data.");
      return { posts: STATIC_FALLBACK_POSTS, mediumLink: MEDIUM_PROFILE_URL };
    }

    const items = res.data.items;
    const mediumLink = res.data.feed?.link || MEDIUM_PROFILE_URL;

    const sortedItems = items.sort(
      (a: any, b: any) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    const mappedPosts: BlogPost[] = sortedItems.map(
      (item: any, index: number) => {
        const plainText = item.description.replace(/<\/?[^>]+(>|$)/g, "");
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        const extractedImg = imgMatch?.[1];
        const isTrackingImage = extractedImg?.includes("post.clientViewed");

        const imageUrl =
          !isTrackingImage && extractedImg
            ? extractedImg
            : fallbackImages[index % fallbackImages.length];

        const readTimeEstimate = Math.max(
          2,
          Math.ceil(plainText.split(" ").length / 200)
        );

        return {
          id: index + 1,
          title: item.title,
          excerpt: plainText.slice(0, 180) + "…",
          date: item.pubDate,
          readTime: `${readTimeEstimate} min read`,
          author: item.author || "Elanchezhiyan P",
          tags: item.categories || [],
          image: imageUrl,
          isLatest: index === 0,
          source: "Medium",
          url: item.link,
          views: `${(Math.random() * (5 - 1) + 1).toFixed(1)}k`,
        };
      }
    );

    // Cache the fetched data
    setCachedBlogData(mappedPosts, mediumLink);

    return { posts: mappedPosts, mediumLink };
  } catch (error) {
    console.warn("Failed to fetch blog posts from rss2json, using fallback data:", error);
    return { posts: STATIC_FALLBACK_POSTS, mediumLink: MEDIUM_PROFILE_URL };
  }
};

export const preloadBlogData = async (): Promise<void> => {
  try {
    // Check if we have valid cached data first
    const cached = getCachedBlogData();
    if (cached) {
      // Cache is valid, no need to fetch
      return;
    }

    // No valid cache, fetch in background
    await fetchBlogPosts();
  } catch (error) {
    // Silently fail during preload - we'll try again when user visits blog page
    console.error("Failed to preload blog data:", error);
  }
};

