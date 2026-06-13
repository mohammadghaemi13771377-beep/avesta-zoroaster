import type { MetadataRoute } from "next";
import { routeMap } from "@/lib/content";
import { locales, withLocale } from "@/lib/i18n";
import { articleItems, glossaryTerms, mediaItems, sampleVerses } from "@/lib/sample-content";
import { sacredCalendarEvents } from "@/lib/sacred-calendar";
import { absoluteUrl, sitemapChangeFrequency, sitemapPriority } from "@/lib/seo";
import { getPublicSitemapRoutes } from "@/lib/route-visibility-audit";
import { shopProducts } from "@/lib/shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedHomeRoutes = locales.map((locale) => withLocale("/", locale));
  const detailRoutes = [
    ...articleItems.map((article) => `/articles/${article.slug}`),
    ...glossaryTerms.map((term) => `/dictionary/${term.slug}`),
    ...mediaItems.map((item, index) => `/media/${slugify(item.title) || `media-${index + 1}`}`),
    ...sacredCalendarEvents.map((event) => `/calendar/${event.id}`),
    ...shopProducts.map((product) => `/shop/${product.slug}`),
    ...sampleVerses.map(
      (verse) => `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`
    )
  ];
  const routes = getPublicSitemapRoutes(Array.from(new Set([...localizedHomeRoutes, ...routeMap, ...detailRoutes])));

  return routes.map((route) => {
    const isHome = route === "/" || route === "/fa" || route === "/en";

    return {
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: sitemapChangeFrequency(route),
      priority: sitemapPriority(route),
      alternates: isHome
        ? {
            languages: {
              fa: absoluteUrl("/fa"),
              en: absoluteUrl("/en")
            }
          }
        : undefined
    };
  });
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
