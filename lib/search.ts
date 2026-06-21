import {
  articleItems,
  glossaryTerms,
  libraryItems,
  mediaItems,
  monotheismPillars,
  sampleChapters,
  sampleVerses,
  searchIndex,
} from "@/lib/sample-content";
import { sacredCalendarEvents, seasonLabels } from "@/lib/sacred-calendar";
import { seasonalCampaigns } from "@/lib/seasonal-campaigns";
import { newsletterDigest } from "@/lib/newsletter";
import { newsletterEditions } from "@/lib/newsletter-editions";
import { getNewsletterEmailPreviews } from "@/lib/newsletter-templates";
import { shopProducts } from "@/lib/shop";

export type SearchType = "all" | "verse" | "article" | "glossary" | "library" | "media" | "product" | "hub";

export type SearchDocument = {
  id: string;
  title: string;
  type: Exclude<SearchType, "all">;
  href: string;
  excerpt: string;
  section?: string;
  category?: string;
  tags?: string[];
  priority: number;
};

export type SearchResult = SearchDocument & {
  score: number;
  matchedFields: string[];
  semanticMatches: string[];
  snippet: string;
};

const semanticAliases: Record<string, string[]> = {
  "آتش": ["یسنا", "نیایش", "پاکی", "روشنایی", "آتشکده"],
  "اشا": ["راستی", "نظم", "اخلاق", "وهومن", "پندار نیک"],
  "اهورامزدا": ["یکتاپرستی", "دانایی", "روشنایی", "گات ها"],
  "زرتشت": ["گات ها", "خرد", "راستی", "ایران باستان"],
  "گات ها": ["زرتشت", "اشا", "وهومن", "سرود", "اختیار"],
  "یشت ها": ["اسطوره", "ستایش", "آبان", "مهر"],
  "یسنا": ["نیایش", "آتش", "آیین", "سرود"],
  "وندیداد": ["پاکی", "قانون", "فرگرد", "آیین"],
  "یکتاپرستی": ["اهورامزدا", "خرد", "اخلاق", "گات ها"],
  "فروهر": ["هویت", "نماد", "ایران باستان", "انتخاب"],
};

export const searchTypeLabels: Record<SearchType, string> = {
  all: "همه",
  verse: "متن اوستا",
  article: "مقاله",
  glossary: "واژه‌نامه",
  library: "کتابخانه",
  media: "رسانه",
  product: "فروشگاه",
  hub: "هاب",
};

export const suggestedQueries = ["اشا", "اهورامزدا", "گات‌ها", "نوروز", "مهرگان", "کمپین", "خبرنامه", "نقشه جهان", "پندار نیک", "دفتر روزانه", "مأموریت", "نقشه مفهومی", "یسنا", "تالار مطالعه", "راهنمای خرد", "یکتاپرستی", "زرتشت", "فروهر", "کتاب"];

export const searchIndexes = [
  {
    uid: "avesta_verses",
    primaryKey: "id",
    filterableAttributes: ["type", "section", "category"],
    searchableAttributes: ["title", "excerpt", "section"],
  },
  {
    uid: "articles",
    primaryKey: "id",
    filterableAttributes: ["type", "category", "tags"],
    searchableAttributes: ["title", "excerpt", "tags", "category"],
  },
  {
    uid: "glossary",
    primaryKey: "id",
    filterableAttributes: ["type", "category"],
    searchableAttributes: ["title", "excerpt", "tags"],
  },
  {
    uid: "library",
    primaryKey: "id",
    filterableAttributes: ["type", "category", "section"],
    searchableAttributes: ["title", "excerpt", "category", "section"],
  },
  {
    uid: "media",
    primaryKey: "id",
    filterableAttributes: ["type", "category", "section"],
    searchableAttributes: ["title", "excerpt", "category", "section"],
  },
  {
    uid: "products",
    primaryKey: "id",
    filterableAttributes: ["type", "category", "section"],
    searchableAttributes: ["title", "excerpt", "category", "section", "tags"],
  },
];

export function buildSearchDocuments(): SearchDocument[] {
  const verseDocs = sampleVerses.map((verse, index): SearchDocument => {
    const chapter = sampleChapters.find(
      (item) => item.sectionSlug === verse.sectionSlug && item.slug === verse.chapterSlug
    );

    return {
      id: `verse-${verse.sectionSlug}-${verse.chapterSlug ?? index}-${verse.verseSlug ?? index}`,
      title: `${verse.chapterTitle} / ${verse.verseNumber}`,
      type: "verse",
      href: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? chapter?.slug ?? "chapter"}/${
        verse.verseSlug ?? "verse"
      }`,
      excerpt: `${verse.quote} ${verse.ethicalMessage}`,
      section: verse.sectionSlug,
      category: "اوستا",
      priority: 95,
    };
  });

  const articleDocs = articleItems.map(
    (article): SearchDocument => ({
      id: `article-${article.slug}`,
      title: article.title,
      type: "article",
      href: `/articles/${article.slug}`,
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags,
      priority: 90,
    })
  );

  const glossaryDocs = glossaryTerms.map(
    (term): SearchDocument => ({
      id: `glossary-${term.slug}`,
      title: term.term,
      type: "glossary",
      href: `/dictionary/${term.slug}`,
      excerpt: `${term.meaning} ${term.root ?? ""} ${term.description ?? ""}`,
      category: "واژه‌نامه",
      priority: 86,
    })
  );

  const libraryDocs = libraryItems.map(
    (item, index): SearchDocument => ({
      id: `library-${index}`,
      title: item.title,
      type: "library",
      href: item.href,
      excerpt: `${item.description} ${item.author} ${item.language}`,
      category: item.category,
      section: item.type,
      priority: 70,
    })
  );

  const mediaDocs = mediaItems.map(
    (item, index): SearchDocument => ({
      id: `media-${index}`,
      title: item.title,
      type: "media",
      href: `/media/${slugify(item.title) || `media-${index + 1}`}`,
      excerpt: `${item.description} ${item.mood} ${item.prompt}`,
      category: item.category,
      section: item.type,
      priority: 64,
    })
  );

  const productDocs = shopProducts.map(
    (product): SearchDocument => ({
      id: `product-${product.slug}`,
      title: product.title,
      type: "product",
      href: `/shop/${product.slug}`,
      excerpt: `${product.excerpt} ${product.description} ${product.spiritualTheme}`,
      category: product.categoryLabel,
      section: "فروشگاه",
      tags: product.seoKeywords,
      priority: 74,
    })
  );

  const calendarDocs = sacredCalendarEvents.map(
    (event): SearchDocument => ({
      id: `calendar-${event.id}`,
      title: event.title,
      type: "hub",
      href: `/calendar/${event.id}`,
      excerpt: `${event.subtitle} ${event.description} ${event.spiritualTheme} ${event.month} ${seasonLabels[event.season]} ${event.ritualIdeas.join(" ")} ${event.productIdeas.join(" ")}`,
      category: "گاه‌شمار",
      section: "تجربه فرهنگی",
      priority: 89,
    })
  );

  const campaignDocs = seasonalCampaigns.map(
    (campaign): SearchDocument => ({
      id: `campaign-${campaign.id}`,
      title: campaign.title,
      type: "hub",
      href: "/campaigns",
      excerpt: `${campaign.subtitle} ${campaign.heroMessage} ${campaign.channels.map((channel) => channel.deliverable).join(" ")} ${campaign.assets.join(" ")}`,
      category: "کمپین",
      section: "مارکتینگ فرهنگی",
      priority: 88,
    })
  );

  const newsletterEditionDocs = newsletterEditions.map(
    (edition): SearchDocument => ({
      id: `newsletter-edition-${edition.id}`,
      title: edition.title,
      type: "hub",
      href: "/newsletter/archive",
      excerpt: `${edition.subtitle} ${edition.intro} ${edition.dateLabel} ${edition.links.map((link) => link.label).join(" ")}`,
      category: "خبرنامه",
      section: "نورنامه",
      priority: 87,
    })
  );

  const newsletterPreviewDocs = getNewsletterEmailPreviews().map(
    (preview): SearchDocument => ({
      id: `newsletter-preview-${preview.editionId}`,
      title: `پیش‌نمایش ایمیل ${preview.title}`,
      type: "hub",
      href: "/newsletter/preview",
      excerpt: `${preview.subject} ${preview.preheader} ${preview.topicLabels.join(" ")} ${preview.links.map((link) => link.label).join(" ")} ${preview.cta.label}`,
      category: "خبرنامه",
      section: "پیش‌نمایش ایمیل",
      priority: 86,
    })
  );

  const hubDocs = [
    ...searchIndex.map(
      (item, index): SearchDocument => ({
        id: `hub-seed-${index}`,
        title: item.title,
        type: "hub",
        href: item.href,
        excerpt: item.excerpt,
        category: item.type,
        priority: 82,
      })
    ),
    {
      id: "hub-world-map",
      title: "نقشه جهان AVESTA-ZOROASTER",
      type: "hub",
      href: "/world",
      excerpt:
        "هاب اصلی برای دیدن قلمروهای جهان دیجیتال اوستا، میزان تکامل هر بخش، مسیرهای ورود، قفل‌های آینده و نقشه محصول.",
      category: "تجربه جهان",
      priority: 96,
    },
    {
      id: "hub-wisdom-guide",
      title: "راهنمای خرد اوستا",
      type: "hub",
      href: "/wisdom-guide",
      excerpt:
        "مسیر تعاملی برای پیشنهاد بند اوستا، واژه‌نامه، مقاله و پیام اخلاقی بر اساس حال‌وهوای مطالعه کاربر.",
      category: "تجربه شخصی‌سازی",
      priority: 94,
    },
    {
      id: "hub-reading-room",
      title: "تالار مطالعه زنده اوستا",
      type: "hub",
      href: "/reading-room",
      excerpt:
        "هاب تجربه مطالعه با حالت‌های نیایش، پژوهش، پیام روزانه و صوت برای خواندن سینمایی، بوکمارک، یادداشت و مسیر بعدی.",
      category: "تجربه مطالعه",
      priority: 93,
    },
    {
      id: "hub-concept-map",
      title: "نقشه مفهومی جهان اوستا",
      type: "hub",
      href: "/concept-map",
      excerpt:
        "نقشه شبکه‌ای برای دیدن پیوند اشا، وهومن، اهورامزدا، گات‌ها، متن اوستا، مقاله‌ها و هاب‌های تجربه.",
      category: "تجربه مطالعه",
      priority: 92,
    },
    {
      id: "hub-quests",
      title: "مأموریت‌های خرد",
      type: "hub",
      href: "/quests",
      excerpt:
        "سیستم مأموریت، XP، badge و مسیرهای مرحله‌ای برای مطالعه اوستا، گات‌ها، واژه‌نامه، منابع و رسانه.",
      category: "تجربه مطالعه",
      priority: 91,
    },
    {
      id: "hub-reflection",
      title: "دفتر پندار، گفتار، کردار",
      type: "hub",
      href: "/reflection",
      excerpt:
        "دفتر روزانه برای ثبت نیت روشن، گفتار آگاهانه، کردار نیک، پیام اخلاقی امروز و اتصال به اوستای امروز، حافظه و مأموریت‌ها.",
      category: "تجربه روزانه",
      priority: 92,
    },
    {
      id: "hub-sacred-calendar",
      title: "گاه‌شمار آیینی و فرهنگی",
      type: "hub",
      href: "/calendar",
      excerpt:
        "تقویم نوروز، تیرگان، مهرگان، سده و مناسبت‌های فرهنگی با مسیر مطالعه، ایده تجربه کاربر و ایده‌های فروشگاه آینده.",
      category: "تجربه فرهنگی",
      priority: 91,
    },
    {
      id: "hub-seasonal-campaigns",
      title: "استودیوی کمپین فصلی",
      type: "hub",
      href: "/campaigns",
      excerpt:
        "تبدیل مناسبت‌های فرهنگی به کمپین کامل برای خانه، مقاله، رسانه، خبرنامه، فروشگاه، asset و چک‌لیست لانچ.",
      category: "کمپین",
      priority: 90,
    },
    {
      id: "hub-newsletter",
      title: newsletterDigest.title,
      type: "hub",
      href: "/newsletter",
      excerpt: `${newsletterDigest.subtitle} ${newsletterDigest.cadence} ${newsletterDigest.topics.map((topic) => `${topic.label} ${topic.description}`).join(" ")}`,
      category: "خبرنامه",
      priority: 89,
    },
    {
      id: "hub-newsletter-html-export",
      title: "خروجی HTML ایمیل نورنامه",
      type: "hub",
      href: "/newsletter/html-export",
      excerpt:
        "راهنمای دریافت HTML آماده ایمیل خبرنامه با subject، preheader، CSS inline و اتصال به سرویس ارسال ایمیل.",
      category: "خبرنامه",
      priority: 86,
    },
    {
      id: "hub-newsletter-preferences",
      title: "تنظیمات و لغو عضویت خبرنامه",
      type: "hub",
      href: "/newsletter/preferences",
      excerpt:
        "مرکز مدیریت ترجیح‌های خبرنامه روشنایی، انتخاب موضوع‌ها، تغییر ایمیل، ذخیره preferences و لغو عضویت آماده اتصال به provider.",
      category: "خبرنامه",
      priority: 87,
    },
    {
      id: "hub-memory",
      title: "حافظه مطالعه و مسیر شخصی",
      type: "hub",
      href: "/memory",
      excerpt:
        "داشبورد ادامه مطالعه، بوکمارک‌ها، یادداشت‌ها، مأموریت‌ها، XP، برنامه مطالعه، کلکسیون‌ها و جستجوهای ذخیره‌شده.",
      category: "پروفایل",
      priority: 89,
    },
    {
      id: "hub-ai-art-studio",
      title: "استودیوی تصویرسازی AI",
      type: "hub",
      href: "/ai-studio",
      excerpt:
        "مرکز تولید brief، prompt، پالت، نسبت تصویر و چک‌لیست انتشار برای تصاویر اختصاصی جهان اوستا و زرتشت.",
      category: "رسانه",
      priority: 88,
    },
    {
      id: "hub-trust-center",
      title: "مرکز اعتماد و منابع",
      type: "hub",
      href: "/trust-center",
      excerpt:
        "مرکز شفافیت سطح اعتماد، منابع، وضعیت بازبینی و مسیر تکمیل پژوهشی برای متن‌های اوستا، مقاله‌ها و واژه‌نامه.",
      category: "منابع و اعتبار",
      priority: 91,
    },
    {
      id: "hub-citations",
      title: "مرکز ارجاع و منابع پژوهشی",
      type: "hub",
      href: "/citations",
      excerpt:
        "سامانه citation برای اتصال هر بند، مقاله و واژه به منبع، ترجمه، یادداشت تحریریه و وضعیت بازبینی.",
      category: "منابع و اعتبار",
      priority: 90,
    },
    ...monotheismPillars.map(
      (pillar, index): SearchDocument => ({
        id: `hub-monotheism-${index}`,
        title: pillar.title,
        type: "hub",
        href: "/monotheism",
        excerpt: `${pillar.subtitle} ${pillar.description}`,
        category: "یکتاپرستی",
        priority: 92,
      })
    ),
  ];

  const byHrefAndTitle = new Map<string, SearchDocument>();
  const documents = [
    ...verseDocs,
    ...articleDocs,
    ...glossaryDocs,
    ...libraryDocs,
    ...mediaDocs,
    ...productDocs,
    ...calendarDocs,
    ...campaignDocs,
    ...newsletterEditionDocs,
    ...newsletterPreviewDocs,
    ...hubDocs,
  ] as SearchDocument[];

  documents.forEach((doc) => {
    byHrefAndTitle.set(`${doc.href}:${doc.title}`, doc);
  });

  return Array.from(byHrefAndTitle.values()).sort((a, b) => b.priority - a.priority);
}

export function getSearchCategories() {
  const values = buildSearchDocuments()
    .flatMap((doc) => [doc.category, doc.section])
    .filter(Boolean) as string[];

  return ["all", ...Array.from(new Set(values))];
}

export function searchDocuments(query: string, type: SearchType = "all", category = "all"): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  return buildSearchDocuments()
    .map((doc) => scoreDocument(doc, tokens, type, category))
    .filter((result): result is SearchResult => Boolean(result))
    .sort((a, b) => b.score - a.score || b.priority - a.priority);
}

export function getSemanticSearchHints(query: string) {
  const normalized = normalizeSearchText(query);
  const matches = Object.entries(semanticAliases)
    .filter(([term]) => normalized.includes(term))
    .map(([term, related]) => ({ term, related }));

  return matches;
}

function scoreDocument(
  doc: SearchDocument,
  tokens: string[],
  type: SearchType,
  category: string
): SearchResult | null {
  const matchesType = type === "all" || doc.type === type;
  const matchesCategory = category === "all" || doc.category === category || doc.section === category;

  if (!matchesType || !matchesCategory) {
    return null;
  }

  if (!tokens.length) {
      return {
        ...doc,
        score: doc.priority,
        matchedFields: [],
        semanticMatches: [],
        snippet: makeSnippet(doc.excerpt),
      };
  }

  const fields = [
    ["title", doc.title, 55],
    ["excerpt", doc.excerpt, 25],
    ["category", doc.category ?? "", 15],
    ["section", doc.section ?? "", 12],
    ["tags", doc.tags?.join(" ") ?? "", 10],
  ] as const;

  let score = doc.priority;
  const matchedFields = new Set<string>();
  const semanticMatches = new Set<string>();

  for (const token of tokens) {
    let tokenMatched = false;

    for (const [field, value, weight] of fields) {
      const normalizedValue = normalizeSearchText(value);
      if (normalizedValue.includes(token)) {
        tokenMatched = true;
        matchedFields.add(field);
        score += weight;
        if (normalizedValue === token) {
          score += 30;
        }
      } else {
        const aliases = semanticAliases[token] ?? [];
        const alias = aliases.find((item) => normalizedValue.includes(item));
        if (alias) {
          tokenMatched = true;
          matchedFields.add(field);
          semanticMatches.add(alias);
          score += Math.round(weight * 0.58);
        }
      }
    }

    if (!tokenMatched) {
      return null;
    }
  }

  return {
    ...doc,
    score,
    matchedFields: Array.from(matchedFields),
    semanticMatches: Array.from(semanticMatches),
    snippet: makeSnippet(doc.excerpt, tokens),
  };
}

function makeSnippet(text: string, tokens: string[] = []) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!tokens.length) {
    return clean.length > 190 ? `${clean.slice(0, 188)}...` : clean;
  }

  const normalized = normalizeSearchText(clean);
  const firstMatch = tokens
    .map((token) => normalized.indexOf(token))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (firstMatch === undefined) {
    return clean.length > 190 ? `${clean.slice(0, 188)}...` : clean;
  }

  const start = Math.max(0, firstMatch - 70);
  const end = Math.min(clean.length, firstMatch + 140);
  return `${start > 0 ? "..." : ""}${clean.slice(start, end)}${end < clean.length ? "..." : ""}`;
}

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string) {
  return normalizeSearchText(value)
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}
