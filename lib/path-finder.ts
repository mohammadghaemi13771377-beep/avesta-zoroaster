export type PathFinderOption = {
  id: "beginner" | "gathas" | "prayer" | "research" | "media" | "shop";
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  accent: string;
  steps: string[];
  cta: string;
};

export const pathFinderOptions: PathFinderOption[] = [
  {
    id: "beginner",
    title: "از کجا شروع کنم؟",
    eyebrow: "مسیر آرام ورود",
    description: "برای کسی که تازه وارد جهان اوستا، زرتشت و واژه‌های بنیادین شده است.",
    href: "/journey-builder?intent=study&pace=balanced&level=beginner&mode=study",
    image: "/images/ai/home-hero-desktop.jpg",
    imageAlt: "طلوع روشن در تخت جمشید برای آغاز مسیر مطالعه اوستا",
    accent: "#F2D58A",
    steps: ["آشنایی کوتاه", "واژه‌های پایه", "پیشنهاد مطالعه"],
    cta: "ساخت مسیر من",
  },
  {
    id: "gathas",
    title: "می‌خواهم گات‌ها را بفهمم",
    eyebrow: "خرد و انتخاب آگاهانه",
    description: "مسیر روشن برای خواندن گات‌ها، مفهوم اشا و پیام اخلاقی امروز.",
    href: "/journey-builder?intent=clarity&pace=deep&level=curious&mode=study",
    image: "/images/ai/gathas-hero.jpg",
    imageAlt: "کتاب گشوده در کوهستان روشن برای مسیر گات‌ها",
    accent: "#FFF8EA",
    steps: ["گات‌ها", "اشا", "تحلیل مفهومی"],
    cta: "ورود به مسیر گات‌ها",
  },
  {
    id: "prayer",
    title: "نیایش و آرامش روزانه",
    eyebrow: "خرده اوستا و مکث",
    description: "برای خواندن آرام، مکث روزانه، آتش کوچک و پیام اخلاقی قابل عمل.",
    href: "/journey-builder?intent=calm&pace=short&level=beginner&mode=ritual",
    image: "/images/ai/khordeh-avesta-hero.jpg",
    imageAlt: "کتاب نیایش، نور سپیده دم و آتش کوچک در فضای ایرانی",
    accent: "#D6A84F",
    steps: ["نیایش کوتاه", "مکث", "یادداشت روزانه"],
    cta: "شروع نیایش",
  },
  {
    id: "research",
    title: "مسیر پژوهشی و منبع‌دار",
    eyebrow: "کتابخانه و واژه‌نامه",
    description: "برای خواندن دقیق‌تر، مقایسه منابع، واژه‌نامه و مقاله‌های ستون اصلی.",
    href: "/journey-builder?intent=truth&pace=deep&level=advanced&mode=study",
    image: "/images/ai/library-hero.jpg",
    imageAlt: "کتابخانه گرم با نسخه‌های خطی و چراغ مطالعه",
    accent: "#7EA4C8",
    steps: ["منابع", "واژه‌نامه", "مقاله‌های مرتبط"],
    cta: "شروع پژوهش",
  },
  {
    id: "media",
    title: "تماشا و شنیدن",
    eyebrow: "رسانه و نمایشگاه",
    description: "برای تجربه تصویری، پادکست، ویدیو و نمایشگاه‌های دیجیتال سایت.",
    href: "/journey-builder?intent=clarity&pace=balanced&level=curious&mode=visual",
    image: "/images/ai/media-hero.jpg",
    imageAlt: "استودیو رسانه با میکروفون، کتاب باز و آتش آرام",
    accent: "#8FC7FF",
    steps: ["ویدیو", "صدا", "نمایشگاه"],
    cta: "دیدن مسیر رسانه",
  },
  {
    id: "shop",
    title: "فروشگاه فرهنگی",
    eyebrow: "محصول و یادگار",
    description: "برای کتاب، هدیه، اکسسوری و محصولاتی که بعداً از ادمین قابل مدیریت می‌شوند.",
    href: "/shop",
    image: "/images/ai/shop-hero.jpg",
    imageAlt: "چیدمان لوکس کتاب، ماگ، گردنبند فروهر و یادگار فرهنگی",
    accent: "#E68A3A",
    steps: ["کتاب", "هدیه", "پیش‌سفارش"],
    cta: "دیدن فروشگاه",
  },
];
