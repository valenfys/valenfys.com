import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified },
    { url: `${siteUrl}/gigs`, lastModified },
  ];
}
