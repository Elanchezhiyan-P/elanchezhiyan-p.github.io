import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Clock } from "lucide-react";

const mediumUsername = "elanchezhiyan-p";

type BlogPost = {
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
};

const fallbackImages = [
  "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?q=80&w=687&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1723849222657-e1e48a0a306e?q=80&w=1121&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542373285-a85124c4f3e6?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?q=80&w=1171&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop",
];

const Blog: React.FC = () => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [mediumLink, setMediumLink] = useState<string>();
  const [latestImageRatio, setLatestImageRatio] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`
        );
        const items = res.data.items;
        setMediumLink(res.data.feed.link);

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

        setBlogPosts(mappedPosts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case "Medium":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Dev.to":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Hashnode":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const latestPost = blogPosts.find((post) => post.isLatest);

  return (
    <div className="pt-16 md:pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on .NET development, cloud
            architecture, and software engineering best practices.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {blogPosts.length}+
                </div>
                <p className="text-sm text-muted-foreground">
                  Articles Published
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ~15k+
                </div>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  10+
                </div>
                <p className="text-sm text-muted-foreground">Followers</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
                <p className="text-sm text-muted-foreground">Platform</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Post */}
        {latestPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Latest Article</h2>
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
              <div className="absolute top-6 right-6 z-10">
                <Badge className="bg-red-500 text-white shadow-lg">
                  Latest
                </Badge>
              </div>
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    src={latestPost.image}
                    alt={latestPost.title}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      const ratio = img.naturalWidth / img.naturalHeight;
                      setLatestImageRatio(ratio);
                    }}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      latestImageRatio && latestImageRatio > 1.3
                        ? "h-64 md:h-full"
                        : "h-96"
                    }`}
                  />
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-t-red-500 group-hover:border-l-red-500 transition-colors duration-300" />
                </div>

                {/* Content */}
                <CardContent className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getSourceBadgeColor(latestPost.source)}>
                      {latestPost.source}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(latestPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {latestPost.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-red-600 transition-colors">
                    {latestPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {latestPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {latestPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition duration-200"
                      asChild
                    >
                      <a
                        href={latestPost.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Read Article
                      </a>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {latestPost.views} views
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* Articles Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.isLatest)
              .map((post, index) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-500 relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 border-2 border-transparent transition-all duration-300 ${
                        hoveredPost === post.id
                          ? "border-t-blue-500 border-l-blue-500 shadow-md shadow-blue-500/20"
                          : ""
                      }`}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getSourceBadgeColor(post.source)}>
                        {post.source}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.views} views
                      </span>
                    </div>
                    <h3 className="font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold shadow-sm transition duration-200 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      asChild
                    >
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Article
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="glass rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Want to stay updated?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Follow me on Medium for the latest articles on .NET development
              and Azure cloud solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 transition-colors duration-200"
                asChild
              >
                <a href={mediumLink} target="_blank" rel="noopener noreferrer">
                  Medium
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
