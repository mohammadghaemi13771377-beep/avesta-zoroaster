import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin", "/api/auth", "/login", "/register", "/profile", "/shop/checkout", "/shop/payment"]
      }
    ],
    host: absoluteUrl("/").replace(/\/$/, ""),
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
