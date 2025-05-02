import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export interface BlogPostCardProps {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  categories: string[];
  image?: string;
  link: string;
  source: "medium" | "personal";
}

const BlogPostCard = ({
  id,
  title,
  excerpt,
  publishedAt,
  categories,
  image,
  link,
  source,
  isLatest,
}: BlogPostCardProps & { isLatest?: boolean }) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col relative group">
      {/* Latest Tag */}
      {isLatest && (
        <span
          className="absolute top-0 left-0 bg-red-500 text-white text-xs px-3 py-1 rounded-bl-md shadow-lg transform -rotate-12"
          aria-label="Latest Post"
        >
          Latest
        </span>
      )}

      {/* Image Section */}
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Card Header */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold mb-2 group-hover:text-azure-600 transition-colors">
              {title}
            </CardTitle>
            {source === "medium" && (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-700 border-green-200 mb-2"
              >
                Medium
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar size={14} className="mr-1" />
          <time dateTime={publishedAt}>
            {format(new Date(publishedAt), "MMM d, yyyy")}
          </time>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="px-2 py-1 text-xs"
            >
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex justify-end items-center pt-3 border-t border-border/60">
        {source !== "medium" && (
          <Link
            to={`/blog/${id}`}
            className="text-sm font-medium text-azure-600 hover:text-azure-700 transition-colors"
          >
            Read More
          </Link>
        )}
        {source === "medium" && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read on Medium"
            className="text-sm flex items-center text-muted-foreground hover:text-azure-600 transition-colors"
          >
            <span className="mr-1">Read on Medium</span>
            <ExternalLink size={14} />
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
