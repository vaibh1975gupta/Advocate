import { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { practiceAreas } from "@/data/practiceAreas";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;
  const staticDate = new Date("2025-03-20T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(`${article.publishedDate}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...practiceAreaRoutes, ...articleRoutes];
}
