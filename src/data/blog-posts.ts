import axios from "axios";
import { parseStringPromise } from "xml2js";
import { BlogPostCardProps } from "@/components/BlogPostCard";

// Local blog posts
// export const blogPosts: BlogPostCardProps[] = [
//   {
//     id: "optimizing-entity-framework",
//     title: "Optimizing Entity Framework Core Performance in Production",
//     excerpt:
//       "Learn advanced techniques for improving EF Core performance in high-traffic applications. Covers query optimization, caching strategies, and efficient data loading patterns.",
//     publishedAt: "2023-11-15",
//     categories: ["EF Core", "Performance", ".NET"],
//     image:
//       "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "azure-functions-best-practices",
//     title: "Best Practices for Azure Functions in Production",
//     excerpt:
//       "Comprehensive guide to building robust, scalable Azure Functions with real-world examples, monitoring strategies, and performance optimization techniques.",
//     publishedAt: "2023-09-22",
//     categories: ["Azure", "Serverless", "Cloud"],
//     image:
//       "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "secure-apis-with-dotnet",
//     title: "Building Secure APIs with .NET 7 and Azure AD",
//     excerpt:
//       "A step-by-step guide to implementing authentication and authorization in .NET APIs using Azure AD, including role-based access control and proper token validation.",
//     publishedAt: "2023-07-18",
//     categories: ["Security", "API", "Azure AD"],
//     image:
//       "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "cosmos-db-patterns",
//     title: "Data Modeling Patterns for Cosmos DB",
//     excerpt:
//       "Explores effective data modeling strategies for Azure Cosmos DB, including embedding vs. referencing, partitioning strategies, and handling polymorphic data.",
//     publishedAt: "2023-05-05",
//     categories: ["Cosmos DB", "NoSQL", "Data Modeling"],
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "microservices-dotnet",
//     title: "Microservices Architecture with .NET and Azure",
//     excerpt:
//       "Comprehensive guide to designing, implementing, and deploying microservices using .NET, Docker, Kubernetes, and Azure services.",
//     publishedAt: "2023-03-12",
//     categories: ["Microservices", "Architecture", "Docker"],
//     image:
//       "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "azure-devops-pipelines",
//     title: "Creating Efficient CI/CD Pipelines with Azure DevOps",
//     excerpt:
//       "Learn how to set up efficient CI/CD pipelines using Azure DevOps, including build optimizations, testing strategies, and automated deployments.",
//     publishedAt: "2023-01-25",
//     categories: ["DevOps", "CI/CD", "Azure"],
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "blazor-wasm-auth",
//     title: "Authentication in Blazor WebAssembly Applications",
//     excerpt:
//       "Implementing secure authentication in Blazor WebAssembly applications using Identity Server and Azure AD B2C, with practical examples.",
//     publishedAt: "2022-11-08",
//     categories: ["Blazor", "Authentication", "WebAssembly"],
//     link: "https://medium.com",
//     source: "medium",
//   },
//   {
//     id: "ef-core-migrations",
//     title: "Managing Database Migrations with EF Core in Production",
//     excerpt:
//       "Best practices for handling database migrations in production environments using Entity Framework Core, including zero-downtime deployments.",
//     publishedAt: "2022-09-14",
//     categories: ["EF Core", "Migrations", "DevOps"],
//     link: "/blog/ef-core-migrations",
//     source: "personal",
//   },
// ];

// Function to fetch Medium posts dynamically
export const fetchMediumPosts = async (
  mediumUsername: string
): Promise<BlogPostCardProps[]> => {
  const rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
  try {
    const response = await axios.get(rssFeedUrl);
    const rssData = response.data;
    // Transform Medium RSS feed data to match BlogPostCardProps structure
    return rssData.items.map((item: any) => ({
      id: item.guid,
      title: item.title,
      excerpt: item.description,
      publishedAt: new Date(item.pubDate).toISOString().split("T")[0], // Format as YYYY-MM-DD
      categories: item.category || [],
      image: item.thumbnail || item.enclosure?.url || "", // Use thumbnail or enclosure URL
      link: item.link,
      source: "medium",
    }));
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
};

// Function to get recent blog posts from Medium
export const getRecentBlogPosts = async (limit?: number) => {
  const mediumPosts = await fetchMediumPosts("elanchezhiyan-p"); // Replace with your Medium username

  const sortedPosts = mediumPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return typeof limit === "number" ? sortedPosts.slice(0, limit) : sortedPosts;
};

// Function to get blog posts by category from Medium
export const getBlogPostsByCategory = async (category: string) => {
  const mediumPosts = await fetchMediumPosts("elanchezhiyan-p"); // Replace with your Medium username

  return mediumPosts.filter((post) => post.categories.includes(category));
};

// Function to get a blog post by ID from Medium
export const getBlogPostById = async (id: string) => {
  const mediumPosts = await fetchMediumPosts("elanchezhiyan-p"); // Replace with your Medium username

  return mediumPosts.find((post) => post.id === id);
};
