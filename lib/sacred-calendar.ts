export type SacredSeason = "spring" | "summer" | "autumn" | "winter" | "timeless";

export type SacredCalendarEvent = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  month: string;
  season: SacredSeason;
  scene: string;
  description: string;
  spiritualTheme: string;
  readingPath: Array<{
    label: string;
    href: string;
  }>;
  ritualIdeas: string[];
  productIdeas: string[];
};

export const seasonLabels: Record<SacredSeason, string> = {
  spring: "بهار",
  summer: "تابستان",
  autumn: "پاییز",
  winter: "زمستان",
  timeless: "همیشگی",
};

export const sacredCalendarEvents: SacredCalendarEvent[] = [
  {
    id: "nowruz",
    title: "نوروز",
    subtitle: "آغاز روشنایی، نوزایی و پیمان تازه با زندگی",
    dateLabel: "۱ فروردین",
    month: "فروردین",
    season: "spring",
    scene: "scene-sunrise",
    description:
      "نوروز در این سایت به عنوان دروازه نوزایی دیده می‌شود؛ لحظه‌ای برای پاک‌سازی، امید و بازگشت به نظم روشن زندگی.",
    spiritualTheme: "نوزایی، راستی، روشنایی و آغاز اخلاقی",
    readingPath: [
      { label: "اوستا چیست؟", href: "/avesta" },
      { label: "دفتر پندار، گفتار، کردار", href: "/reflection" },
      { label: "مقاله اشا", href: "/articles/asha-truth-order" },
    ],
    ritualIdeas: ["ثبت نیت سال", "خواندن اوستای امروز", "ساخت کلکسیون نوروزی", "اشتراک یک پیام اخلاقی"],
    productIdeas: ["کارت تبریک نوروزی", "دفتر نیت سال", "شمع یا ماگ طلایی با شعار برند"],
  },
  {
    id: "tirgan",
    title: "تیرگان",
    subtitle: "آب، باران، پیمان و یادآوری نیروی زندگی",
    dateLabel: "۱۳ تیر",
    month: "تیر",
    season: "summer",
    scene: "scene-mountain",
    description:
      "تیرگان می‌تواند به هاب آب، طبیعت و پیمان تبدیل شود؛ صفحه‌ای مناسب برای رسانه، مقاله و محتوای آموزشی کوتاه.",
    spiritualTheme: "پیمان، آب، طبیعت و سپاسگزاری",
    readingPath: [
      { label: "یشت‌ها", href: "/avesta/yashts" },
      { label: "رسانه", href: "/media" },
      { label: "نقشه مفهومی", href: "/concept-map" },
    ],
    ritualIdeas: ["یادداشت سپاسگزاری", "ساخت تصویر AI از باران و کوهستان", "مطالعه یک یشت مرتبط با طبیعت"],
    productIdeas: ["پوستر طبیعت ایران", "بطری یا ماگ با نقش خورشید", "کارت آموزشی تیرگان"],
  },
  {
    id: "mehregan",
    title: "مهرگان",
    subtitle: "جشن مهر، دوستی، پیمان و داد",
    dateLabel: "۱۶ مهر",
    month: "مهر",
    season: "autumn",
    scene: "scene-fire",
    description:
      "مهرگان جای طبیعی پیوند میان اخلاق اجتماعی، عهد، دوستی و روایت‌های فرهنگی ایران باستان است.",
    spiritualTheme: "مهر، پیمان، عدالت و پیوند انسانی",
    readingPath: [
      { label: "دین زرتشتی", href: "/zoroastrianism" },
      { label: "واژه‌نامه مهر", href: "/dictionary" },
      { label: "تالار مطالعه", href: "/reading-room" },
    ],
    ritualIdeas: ["نوشتن یک پیمان اخلاقی", "اهدای یک جمله نیک", "خواندن یک مقاله درباره مهر و راستی"],
    productIdeas: ["گردنبند نماد مهر", "کارت هدیه فرهنگی", "پیراهن با طرح فروهر و مهر"],
  },
  {
    id: "sadeh",
    title: "سده",
    subtitle: "آتش، گرما و پیروزی روشنایی در میانه زمستان",
    dateLabel: "۱۰ بهمن",
    month: "بهمن",
    season: "winter",
    scene: "scene-stone",
    description:
      "سده برای تجربه سینمایی سایت فوق‌العاده است: آتش آرام، شب سرد، سنگ، نیایش و تصویرهای باشکوه.",
    spiritualTheme: "آتش، امید، پاکی و ایستادگی",
    readingPath: [
      { label: "یسنا", href: "/avesta/yasna" },
      { label: "استودیوی AI", href: "/ai-studio" },
      { label: "کتابخانه", href: "/library" },
    ],
    ritualIdeas: ["ثبت یک کردار نیک زمستانی", "ساخت تصویر آتش آیینی", "شنیدن یک روایت صوتی"],
    productIdeas: ["شمع آیینی", "پوستر آتش مقدس", "ماگ زمستانی AVESTA-ZOROASTER"],
  },
  {
    id: "daily-asha",
    title: "روز اشا",
    subtitle: "تمرین روزانه راستی، نظم و انتخاب آگاهانه",
    dateLabel: "هر روز",
    month: "همیشگی",
    season: "timeless",
    scene: "scene-cosmic",
    description:
      "این مناسبت روزانه، موتور retention سایت است؛ هر روز یک پیام اخلاقی، یک نیت و یک قدم کوچک.",
    spiritualTheme: "راستی، انتخاب، خرد و استمرار",
    readingPath: [
      { label: "اوستای امروز", href: "/" },
      { label: "دفتر روزانه", href: "/reflection" },
      { label: "مأموریت‌های خرد", href: "/quests" },
    ],
    ritualIdeas: ["ثبت پندار نیک", "گفتن یک جمله آگاهانه", "انجام یک کار کوچک نیک"],
    productIdeas: ["دفتر روزانه", "استیکر پندار نیک", "کارت‌های الهام روزانه"],
  },
];

export function getSacredCalendarSummary(events: SacredCalendarEvent[] = sacredCalendarEvents) {
  const seasons = new Set(events.map((event) => event.season));
  const linkedReadings = events.reduce((sum, event) => sum + event.readingPath.length, 0);
  const productIdeas = events.reduce((sum, event) => sum + event.productIdeas.length, 0);

  return {
    total: events.length,
    seasons: seasons.size,
    linkedReadings,
    productIdeas,
    nextEvent: events[0],
  };
}

export function getSacredCalendarEvent(id: string) {
  return sacredCalendarEvents.find((event) => event.id === id);
}
