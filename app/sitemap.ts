import type { MetadataRoute } from "next";
import { routeMap } from "@/lib/content";
import { locales, withLocale } from "@/lib/i18n";
import { articleItems, glossaryTerms, mediaItems, sampleChapters, sampleVerses } from "@/lib/sample-content";
import { sacredCalendarEvents } from "@/lib/sacred-calendar";
import { absoluteUrl, sitemapChangeFrequency, sitemapPriority } from "@/lib/seo";
import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";
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
    ...sampleChapters.map((chapter) => `/avesta/${chapter.sectionSlug}/${chapter.slug}`),
    "/avesta/paths",
    ...getAvestaStudyPaths().map((path) => path.detailHref),
    ...sampleVerses.map(
      (verse) => `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`
    )
  ];
  const routes = getPublicSitemapRoutes(Array.from(new Set([...localizedHomeRoutes, ...routeMap, ...detailRoutes])));
  const indexableRoutes = routes.filter((route) => !route.startsWith("/admin") && !route.startsWith("/api"));

  return indexableRoutes.map((route) => {
    const isHome = route === "/" || route === "/fa" || route === "/en";

    return {
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: sitemapChangeFrequency(route),
      priority: sitemapPriority(route),
      alternates: {
        languages: isHome
          ? {
              fa: absoluteUrl("/fa"),
              en: absoluteUrl("/en"),
              "x-default": absoluteUrl("/")
            }
          : {
              fa: absoluteUrl(route),
              "x-default": absoluteUrl(route)
            }
      }
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
