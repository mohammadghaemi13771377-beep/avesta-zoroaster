import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05080D",
    theme_color: "#D6A84F",
    lang: "fa",
    dir: "rtl",
    categories: ["education", "reference", "culture"],
  };
}
