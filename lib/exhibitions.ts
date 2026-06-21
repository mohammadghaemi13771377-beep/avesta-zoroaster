export type ExhibitionArtifact = {
  id: string;
  title: string;
  type: "text" | "symbol" | "audio" | "image" | "timeline" | "practice";
  href: string;
  scene: string;
  thumbnail: string;
  description: string;
};

export type Exhibition = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  scene: string;
  heroImage: string;
  heroHref: string;
  duration: string;
  curatorNote: string;
  audience: string;
  artifacts: ExhibitionArtifact[];
  relatedRoutes: string[];
};

export const exhibitions: Exhibition[] = [
  {
    id: "light-and-asha",
    slug: "light-and-asha",
    title: "روشنایی و اشا",
    subtitle: "نمایشگاهی درباره نظم راستی، انتخاب اخلاقی و نور در جهان زرتشتی.",
    scene: "scene-sunrise",
    heroImage: "/images/ai/monotheism-cover.png",
    heroHref: "/asha-balance",
    duration: "۲۲ دقیقه",
    audience: "کاربری که می‌خواهد پیام اخلاقی سایت را سریع و عمیق تجربه کند.",
    curatorNote:
      "این نمایشگاه باید ستون اصلی یکتاپرستی سایت باشد: خداوند به عنوان سرچشمه دانایی، راستی و انتخاب آگاهانه معرفی می‌شود، نه یک مفهوم خشک تاریخی.",
    artifacts: [
      {
        id: "asha-balance-meter",
        title: "نورسنج اشا",
        type: "practice",
        href: "/asha-balance",
        scene: "scene-sunrise",
        thumbnail: "/images/ai/monotheism-cover.png",
        description: "آینه‌ای برای سنجش پندار، گفتار و کردار در زندگی امروز.",
      },
      {
        id: "daily-light-guide",
        title: "راهنمای روشنایی روزانه",
        type: "practice",
        href: "/daily-light",
        scene: "scene-fire",
        thumbnail: "/images/ai/yasna-cover.png",
        description: "مسیر ۱۵ دقیقه‌ای برای تبدیل خواندن به تمرین روزانه.",
      },
      {
        id: "gathas-ethical-core",
        title: "قلب اخلاقی گات‌ها",
        type: "text",
        href: "/avesta/gathas",
        scene: "scene-cosmic",
        thumbnail: "/images/ai/gathas-cover.png",
        description: "خوانش سینمایی سرودهایی که بر خرد، راستی و مسئولیت انسان تاکید دارند.",
      },
    ],
    relatedRoutes: ["/monotheism", "/monotheism/paths", "/practice"],
  },
  {
    id: "fire-ritual-and-prayer",
    slug: "fire-ritual-and-prayer",
    title: "آتش، آیین و نیایش",
    subtitle: "از یسنا و خرده اوستا تا تالار آیینی و تجربه صوتی.",
    scene: "scene-fire",
    heroImage: "/images/ai/yasna-cover.png",
    heroHref: "/ritual-room",
    duration: "۱۸ دقیقه",
    audience: "کاربری که می‌خواهد حس نیایش، مکث و شکوه آیینی را لمس کند.",
    curatorNote:
      "آتش در این سایت باید مثل رابط تجربه عمل کند: نه تزئین ساده، بلکه نشانه حضور، تمرکز، پاکی و آغاز مطالعه.",
    artifacts: [
      {
        id: "yasna-gate",
        title: "دروازه یسنا",
        type: "text",
        href: "/avesta/yasna",
        scene: "scene-fire",
        thumbnail: "/images/ai/yasna-cover.png",
        description: "ورود به متن‌های آیینی اوستا با فضای آتش، نیایش و نور مقدس.",
      },
      {
        id: "khordeh-avesta-daily",
        title: "خرده اوستا",
        type: "text",
        href: "/avesta/khordeh-avesta",
        scene: "scene-scroll",
        thumbnail: "/images/ai/khordeh-avesta-cover.png",
        description: "نیایش‌های روزانه برای ساختن پیوند میان متن کهن و زندگی امروز.",
      },
      {
        id: "ritual-room",
        title: "تالار آیینی",
        type: "audio",
        href: "/ritual-room",
        scene: "scene-stone",
        thumbnail: "/images/ai/avesta-portal.jpg",
        description: "فضای آرام برای نیت، تنفس، شنیدن و نوشتن تأمل روزانه.",
      },
    ],
    relatedRoutes: ["/daily-light", "/reflection", "/media"],
  },
  {
    id: "ancient-persia-memory",
    slug: "ancient-persia-memory",
    title: "حافظه ایران باستان",
    subtitle: "نمایشگاهی برای پیوند اوستا، تاریخ، کوروش، ساسانیان و زرتشتیان امروز.",
    scene: "scene-stone",
    heroImage: "/images/ai/zoroaster-cover.png",
    heroHref: "/timeline",
    duration: "۲۶ دقیقه",
    audience: "کاربری که به تاریخ، معماری، هویت ایرانی و روایت تمدنی علاقه دارد.",
    curatorNote:
      "این بخش باید حس موزه تاریخی بدهد؛ کاربر بفهمد اوستا فقط متن نیست، بخشی از حافظه تمدنی ایران و مسیر انتقال فرهنگی است.",
    artifacts: [
      {
        id: "interactive-timeline",
        title: "تایم‌لاین تعاملی",
        type: "timeline",
        href: "/timeline",
        scene: "scene-mountain",
        thumbnail: "/images/ai/zoroaster-cover.png",
        description: "از زرتشت و گات‌ها تا هخامنشیان، ساسانیان و زرتشتیان امروز.",
      },
      {
        id: "cyrus-portal",
        title: "کوروش و روایت ایران",
        type: "symbol",
        href: "/cyrus",
        scene: "scene-stone",
        thumbnail: "/images/ai/zoroastrianism-cover.png",
        description: "اتصال لایه تاریخی پروژه به عدالت، فرمانروایی و حافظه فرهنگی.",
      },
      {
        id: "library-archive",
        title: "آرشیو کتابخانه",
        type: "text",
        href: "/library/archive",
        scene: "scene-scroll",
        thumbnail: "/images/ai/library-cover.png",
        description: "منابع، نسخه‌ها، مقاله‌ها و پرونده‌هایی که تیم پژوهش کامل‌تر می‌کند.",
      },
    ],
    relatedRoutes: ["/world", "/library", "/articles"],
  },
  {
    id: "mythic-media-vault",
    slug: "mythic-media-vault",
    title: "گنجینه تصویر و رسانه",
    subtitle: "تصویرسازی AI، صدا، ویدیو، کارت نقل‌قول و تجربه اشتراک‌پذیر.",
    scene: "scene-mountain",
    heroImage: "/images/ai/media-cover.png",
    heroHref: "/media",
    duration: "۲۰ دقیقه",
    audience: "کاربری که با تصویر، صوت و تجربه سینمایی سریع‌تر وارد جهان سایت می‌شود.",
    curatorNote:
      "این نمایشگاه مسئول تفاوت بزرگ سایت با وبلاگ‌های متنی است؛ هر مفهوم باید تصویر، صدا و خروجی قابل اشتراک داشته باشد.",
    artifacts: [
      {
        id: "media-library",
        title: "رسانه‌ها",
        type: "image",
        href: "/media",
        scene: "scene-mountain",
        thumbnail: "/images/ai/media-cover.png",
        description: "خانه تصویرها، ویدیوها، پادکست‌ها و دارایی‌های آینده.",
      },
      {
        id: "ai-studio",
        title: "استودیوی تصویر AI",
        type: "image",
        href: "/ai-studio",
        scene: "scene-cosmic",
        thumbnail: "/images/ai/exhibitions-cover.png",
        description: "محل طراحی prompt و moodboard برای هر صفحه و بخش اوستا.",
      },
      {
        id: "share-studio",
        title: "کارت طلایی",
        type: "symbol",
        href: "/share-studio",
        scene: "scene-fire",
        thumbnail: "/images/ai/articles-cover.png",
        description: "تبدیل نقل‌قول‌ها و پیام‌های اخلاقی به کارت‌های برنددار.",
      },
    ],
    relatedRoutes: ["/wisdom-capsule", "/tour", "/collections"],
  },
];

export function getExhibitions() {
  return exhibitions;
}

export function getExhibitionStats() {
  const artifactCount = exhibitions.reduce((total, exhibition) => total + exhibition.artifacts.length, 0);
  const routeCount = new Set(exhibitions.flatMap((exhibition) => [exhibition.heroHref, ...exhibition.relatedRoutes])).size;

  return [
    { value: String(exhibitions.length), label: "نمایشگاه موضوعی" },
    { value: String(artifactCount), label: "اثر و ایستگاه" },
    { value: String(routeCount), label: "مسیر متصل" },
  ];
}
