export type NewsletterTopic = "daily" | "calendar" | "articles" | "media" | "shop";

export type NewsletterTopicOption = {
  id: NewsletterTopic;
  label: string;
  description: string;
};

export type NewsletterDigest = {
  title: string;
  subtitle: string;
  cadence: string;
  topics: NewsletterTopicOption[];
  privacyNote: string;
};

export type NewsletterPreferenceStatus = "subscribed" | "unsubscribed";

export type NewsletterPreferenceRecord = {
  email: string;
  topics: NewsletterTopic[];
  status: NewsletterPreferenceStatus;
  updatedAt: string;
};

export const newsletterTopics: NewsletterTopicOption[] = [
  {
    id: "daily",
    label: "اوستای امروز",
    description: "پیام اخلاقی، واژه روز و مسیر کوتاه مطالعه.",
  },
  {
    id: "calendar",
    label: "گاه‌شمار و مناسبت‌ها",
    description: "نوروز، مهرگان، سده و کمپین‌های فرهنگی فصلی.",
  },
  {
    id: "articles",
    label: "مقاله‌های پژوهشی",
    description: "یادداشت‌های تحلیلی درباره اوستا، گات‌ها، اشا و زرتشت.",
  },
  {
    id: "media",
    label: "رسانه و تصویر AI",
    description: "تصویرسازی، ویدیو، صوت و پشت‌صحنه تولید هنری.",
  },
  {
    id: "shop",
    label: "فروشگاه آینده",
    description: "کالکشن‌های کتاب، ماگ، پوشاک و محصولات فرهنگی.",
  },
];

export const newsletterDigest: NewsletterDigest = {
  title: "خبرنامه روشنایی",
  subtitle: "یک مسیر آرام برای دریافت اوستای امروز، مناسبت‌ها، مقاله‌ها و تازه‌های فرهنگی.",
  cadence: "هفتگی، با پیام‌های ویژه برای مناسبت‌های مهم",
  topics: newsletterTopics,
  privacyNote: "فعلاً عضویت در حافظه همین مرورگر ذخیره می‌شود و API برای اتصال به سرویس ایمیل آماده است.",
};

export function getNewsletterSummary() {
  return {
    totalTopics: newsletterTopics.length,
    cadence: newsletterDigest.cadence,
    nextSource: "Email provider, double opt-in, segmentation, campaign automation and user profile preferences",
  };
}

export function validateNewsletterTopics(topics: unknown): NewsletterTopic[] {
  if (!Array.isArray(topics)) {
    return [];
  }

  const allowed = new Set(newsletterTopics.map((topic) => topic.id));
  return topics.filter((topic): topic is NewsletterTopic => typeof topic === "string" && allowed.has(topic as NewsletterTopic));
}
