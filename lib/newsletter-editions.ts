import { newsletterTopics, type NewsletterTopic } from "@/lib/newsletter";

export type NewsletterEditionStatus = "draft" | "review" | "ready";

export type NewsletterEdition = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  status: NewsletterEditionStatus;
  scene: string;
  topics: NewsletterTopic[];
  intro: string;
  links: Array<{
    label: string;
    href: string;
  }>;
  cta: {
    label: string;
    href: string;
  };
};

export const newsletterStatusLabels: Record<NewsletterEditionStatus, string> = {
  draft: "پیش‌نویس",
  review: "بازبینی",
  ready: "آماده ارسال",
};

export const newsletterEditions: NewsletterEdition[] = [
  {
    id: "light-digest-nowruz",
    title: "نورنامه نوروز",
    subtitle: "نوزایی، روشنایی و نیت تازه",
    dateLabel: "فروردین",
    status: "ready",
    scene: "scene-sunrise",
    topics: ["daily", "calendar", "articles"],
    intro: "این شماره کاربر را از نوروز به اوستای امروز، دفتر پندار و مقاله اشا هدایت می‌کند.",
    links: [
      { label: "صفحه نوروز", href: "/calendar/nowruz" },
      { label: "دفتر پندار، گفتار، کردار", href: "/reflection" },
      { label: "مقاله اشا", href: "/articles/asha-truth-order" },
    ],
    cta: { label: "ثبت نیت امروز", href: "/reflection" },
  },
  {
    id: "light-digest-mehregan",
    title: "نورنامه مهرگان",
    subtitle: "مهر، پیمان و گفتار نیک",
    dateLabel: "مهر",
    status: "review",
    scene: "scene-fire",
    topics: ["calendar", "articles", "shop"],
    intro: "این شماره برای کمپین مهرگان طراحی شده و به مقاله، واژه‌نامه و کالکشن آینده فروشگاه وصل می‌شود.",
    links: [
      { label: "صفحه مهرگان", href: "/calendar/mehregan" },
      { label: "استودیوی کمپین", href: "/campaigns" },
      { label: "فروشگاه فرهنگی", href: "/shop" },
    ],
    cta: { label: "دیدن کمپین مهرگان", href: "/campaigns" },
  },
  {
    id: "light-digest-sadeh",
    title: "نورنامه سده",
    subtitle: "آتش، امید و ایستادگی",
    dateLabel: "بهمن",
    status: "draft",
    scene: "scene-stone",
    topics: ["calendar", "media", "shop"],
    intro: "این شماره برای تجربه رسانه‌ای سده، تصویرسازی AI و محصولات زمستانی آینده آماده می‌شود.",
    links: [
      { label: "صفحه سده", href: "/calendar/sadeh" },
      { label: "استودیوی AI", href: "/ai-studio" },
      { label: "رسانه", href: "/media" },
    ],
    cta: { label: "ساخت تصویر سده", href: "/ai-studio" },
  },
];

export function getNewsletterEditionSummary(editions: NewsletterEdition[] = newsletterEditions) {
  const ready = editions.filter((edition) => edition.status === "ready").length;
  const topicUsage = newsletterTopics.map((topic) => ({
    ...topic,
    count: editions.filter((edition) => edition.topics.includes(topic.id)).length,
  }));

  return {
    total: editions.length,
    ready,
    inProgress: editions.length - ready,
    topicUsage,
    nextEdition: editions[0],
  };
}
