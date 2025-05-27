import axios from "axios";
import he from "he";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  categories: string[];
  image: string;
  link: string;
  source: string;
}

const mediumUsername = "elanchezhiyan-p";

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

  try {
    const response = await axios.get(rssFeedUrl);
    const rssData = response.data;
    console.log("rssData : ", rssData);
    // Transform Medium RSS feed data to match BlogPost structure
    return rssData.items.map((item: any) => ({
      id: item.guid,
      title: he.decode(item.title),
      excerpt: stripHtml(he.decode(item.description)),
      publishedAt: new Date(item.pubDate).toISOString().split("T")[0], // Format as YYYY-MM-DD
      categories: item.categories || [],
      image:
        item.thumbnail ||
        item.enclosure?.url ||
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      link: item.link,
      source: "medium",
    }));
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
