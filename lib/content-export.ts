import {
  articleItems,
  glossaryTerms,
  libraryItems,
  mediaItems,
  sampleChapters,
  sampleVerses,
  timelineEvents
} from "@/lib/sample-content";
import { getAvestaChapterGuideList } from "@/lib/avesta-chapter-guides";
import { getAvestaChapterProfiles } from "@/lib/avesta-chapter-profiles";
import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";
import { contentProductionItems, getContentProductionSummary } from "@/lib/content-production-readiness";
import { routeHeroByPath, sectionCoverBySlug, visualAssets } from "@/lib/visual-assets";

export type ContentExportJob = {
  id: string;
  title: string;
  description: string;
  format: "json";
  owner: "content" | "design" | "engineering" | "product";
  route: string;
};

export type ContentExportBundle = {
  generatedAt: string;
  project: {
    name: string;
    domain: string;
    locale: string;
    direction: "rtl";
    note: string;
  };
  summary: {
    articles: number;
    glossaryTerms: number;
    libraryItems: number;
    mediaItems: number;
    timelineEvents: number;
    avestaChapters: number;
    avestaVerses: number;
    chapterGuides: number;
    chapterProfiles: number;
    studyPaths: number;
    routeHeroes: number;
    sectionCovers: number;
    visualAssetGroups: number;
    productionReadiness: number;
  };
  jobs: ContentExportJob[];
  data: {
    articles: typeof articleItems;
    glossaryTerms: typeof glossaryTerms;
    libraryItems: typeof libraryItems;
    mediaItems: typeof mediaItems;
    timelineEvents: typeof timelineEvents;
    avestaChapters: typeof sampleChapters;
    avestaVerses: typeof sampleVerses;
    avestaChapterGuides: ReturnType<typeof getAvestaChapterGuideList>;
    avestaChapterProfiles: ReturnType<typeof getAvestaChapterProfiles>;
    avestaStudyPaths: ReturnType<typeof getAvestaStudyPaths>;
    mediaManifest: {
      routeHeroByPath: typeof routeHeroByPath;
      sectionCoverBySlug: typeof sectionCoverBySlug;
      visualAssets: typeof visualAssets;
    };
    productionReadiness: {
      summary: ReturnType<typeof getContentProductionSummary>;
      items: typeof contentProductionItems;
    };
  };
};

export const contentExportJobs: ContentExportJob[] = [
  {
    id: "full-content-snapshot",
    title: "Snapshot کامل محتوا",
    description: "خروجی یک‌جای داده‌های نمونه، مقاله‌ها، واژه‌نامه، کتابخانه، رسانه، فصل‌ها و مسیرهای مطالعه.",
    format: "json",
    owner: "content",
    route: "/api/admin/content-export"
  },
  {
    id: "media-manifest",
    title: "Manifest تصویر و رسانه",
    description: "فهرست مسیرهای hero، cover و assetهای تصویری برای بازبینی تیم دیزاین و آماده‌سازی storage.",
    format: "json",
    owner: "design",
    route: "/api/admin/content-export"
  },
  {
    id: "study-path-manifest",
    title: "Manifest مسیرهای مطالعه",
    description: "داده ساختارمند مسیرهای شروع کاربر، مرحله‌ها، CTAها و مقصدهای هر مسیر برای تیم محصول.",
    format: "json",
    owner: "product",
    route: "/api/admin/content-export"
  },
  {
    id: "production-readiness-snapshot",
    title: "Snapshot آمادگی production",
    description: "گزارش چیزهایی که برای ورود محتوای واقعی، بکاپ، storage، امنیت و workflow باید تکمیل شوند.",
    format: "json",
    owner: "engineering",
    route: "/api/admin/content-export"
  }
];

export function getContentExportBundle(generatedAt = new Date().toISOString()): ContentExportBundle {
  const chapterGuides = getAvestaChapterGuideList();
  const chapterProfiles = getAvestaChapterProfiles();
  const studyPaths = getAvestaStudyPaths();
  const readiness = getContentProductionSummary(contentProductionItems);

  return {
    generatedAt,
    project: {
      name: "AVESTA-ZOROASTER",
      domain: "avesta-zoroaster.com",
      locale: "fa-IR",
      direction: "rtl",
      note: "این خروجی برای تحویل محتوا، بکاپ، مهاجرت به دیتابیس/CMS و بازبینی تیم‌های محصول، طراحی و فنی آماده شده است."
    },
    summary: {
      articles: articleItems.length,
      glossaryTerms: glossaryTerms.length,
      libraryItems: libraryItems.length,
      mediaItems: mediaItems.length,
      timelineEvents: timelineEvents.length,
      avestaChapters: sampleChapters.length,
      avestaVerses: sampleVerses.length,
      chapterGuides: chapterGuides.length,
      chapterProfiles: chapterProfiles.length,
      studyPaths: studyPaths.length,
      routeHeroes: Object.keys(routeHeroByPath).length,
      sectionCovers: Object.keys(sectionCoverBySlug).length,
      visualAssetGroups: Object.keys(visualAssets).length,
      productionReadiness: readiness.averageReadiness
    },
    jobs: contentExportJobs,
    data: {
      articles: articleItems,
      glossaryTerms,
      libraryItems,
      mediaItems,
      timelineEvents,
      avestaChapters: sampleChapters,
      avestaVerses: sampleVerses,
      avestaChapterGuides: chapterGuides,
      avestaChapterProfiles: chapterProfiles,
      avestaStudyPaths: studyPaths,
      mediaManifest: {
        routeHeroByPath,
        sectionCoverBySlug,
        visualAssets
      },
      productionReadiness: {
        summary: readiness,
        items: contentProductionItems
      }
    }
  };
}
