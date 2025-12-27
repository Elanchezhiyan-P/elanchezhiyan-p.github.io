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

export const fetchBlogPosts = async (): Promise<{ posts: BlogPost[]; mediumLink: string }> => {
  try {
    const res = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
    );
    const items = res.data.items;
    const mediumLink = res.data.feed.link;

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
            : fallbackImages[
                Math.floor(Math.random() * fallbackImages.length)
              ];

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
    console.error("Failed to fetch blog posts:", error);
    throw error;
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

