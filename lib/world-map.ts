export type WorldRealmStatus = "live" | "expanding" | "foundation";

export type WorldRealm = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  scene: string;
  roman: string;
  status: WorldRealmStatus;
  completion: number;
  purpose: string;
  routes: Array<{
    label: string;
    href: string;
  }>;
  nextUnlock: string;
};

export const worldRealmStatusLabels: Record<WorldRealmStatus, string> = {
  live: "زنده و قابل استفاده",
  expanding: "در حال گسترش",
  foundation: "زیرساخت آماده",
};

export const worldRealms: WorldRealm[] = [
  {
    id: "avesta-core",
    title: "قلمرو اوستا",
    subtitle: "متن، ترجمه، هات‌ها و مسیرهای مطالعه",
    href: "/avesta",
    scene: "scene-fire",
    roman: "I",
    status: "expanding",
    completion: 68,
    purpose: "قلب محتوایی سایت؛ جایی که کاربر از متن‌های اصلی وارد جهان خرد و روشنایی می‌شود.",
    routes: [
      { label: "پورتال اوستا", href: "/avesta" },
      { label: "گات‌ها", href: "/gathas" },
      { label: "جستجو", href: "/search" },
    ],
    nextUnlock: "ورود متن کامل اوستا، صوت و تصاویر اختصاصی برای هر بند.",
  },
  {
    id: "wisdom-experience",
    title: "قلمرو تجربه مطالعه",
    subtitle: "تالار مطالعه، حافظه، مأموریت و دفتر روزانه",
    href: "/reading-room",
    scene: "scene-sunrise",
    roman: "II",
    status: "live",
    completion: 84,
    purpose: "لایه‌ای که سایت را از کتابخانه خشک به تجربه شخصی، روزانه و قابل ادامه تبدیل می‌کند.",
    routes: [
      { label: "تالار مطالعه", href: "/reading-room" },
      { label: "حافظه مطالعه", href: "/memory" },
      { label: "دفتر روزانه", href: "/reflection" },
    ],
    nextUnlock: "اتصال پیشرفت، streak، XP و بوکمارک‌ها به حساب واقعی کاربر.",
  },
  {
    id: "knowledge-graph",
    title: "قلمرو دانش و منابع",
    subtitle: "واژه‌نامه، نقشه مفهومی، منابع و ارجاع",
    href: "/concept-map",
    scene: "scene-cosmic",
    roman: "III",
    status: "live",
    completion: 82,
    purpose: "ساخت ستون پژوهشی و قابل اعتماد برای پیوند واژه‌ها، مقاله‌ها، منابع و بندهای اوستا.",
    routes: [
      { label: "نقشه مفهومی", href: "/concept-map" },
      { label: "مرکز اعتماد", href: "/trust-center" },
      { label: "ارجاعات", href: "/citations" },
    ],
    nextUnlock: "مدل دیتابیس citation، شماره صفحه، نسخه منبع و تایید تحریریه.",
  },
  {
    id: "media-museum",
    title: "قلمرو موزه رسانه",
    subtitle: "تصویر AI، ویدیو، پادکست و استودیوی تولید",
    href: "/media",
    scene: "scene-mountain",
    roman: "IV",
    status: "expanding",
    completion: 62,
    purpose: "بعد سینمایی سایت؛ جایی که ایران باستان، آتش، آسمان و نمادها به تصویر تبدیل می‌شوند.",
    routes: [
      { label: "رسانه", href: "/media" },
      { label: "نمایشگاه‌ها", href: "/exhibitions" },
      { label: "استودیوی AI", href: "/ai-studio" },
    ],
    nextUnlock: "بارگذاری تصویرهای نهایی، فایل‌های صوتی، نمایشگاه‌های فصلی و workflow تایید رسانه.",
  },
  {
    id: "seasonal-growth",
    title: "قلمرو مناسبت و رشد",
    subtitle: "گاه‌شمار، کمپین، خبرنامه و سفر فصلی",
    href: "/calendar",
    scene: "scene-stone",
    roman: "V",
    status: "live",
    completion: 80,
    purpose: "موتور بازگشت کاربر؛ مناسبت‌های فرهنگی را به محتوا، ایمیل، رسانه و فروشگاه وصل می‌کند.",
    routes: [
      { label: "گاه‌شمار", href: "/calendar" },
      { label: "کمپین‌ها", href: "/campaigns" },
      { label: "خبرنامه", href: "/newsletter" },
    ],
    nextUnlock: "اتصال provider ایمیل، اعلان‌ها و بنرهای زمان‌بندی‌شده.",
  },
  {
    id: "commerce-future",
    title: "قلمرو فروشگاه فرهنگی",
    subtitle: "کتاب، ماگ، پوشاک، اکسسوری و محصولات آیینی",
    href: "/shop",
    scene: "scene-scroll",
    roman: "VI",
    status: "foundation",
    completion: 56,
    purpose: "مسیر درآمدزایی آینده بدون از بین بردن شأن فرهنگی پروژه.",
    routes: [
      { label: "فروشگاه", href: "/shop" },
      { label: "سبد و پرداخت", href: "/shop/checkout" },
      { label: "ادمین فروشگاه", href: "/admin/shop" },
    ],
    nextUnlock: "درگاه واقعی، انبار واقعی، ارسال، مالیات و کالکشن‌های مناسبتی.",
  },
  {
    id: "admin-ops",
    title: "قلمرو مدیریت و عملیات",
    subtitle: "ادمین، تحریریه، SEO، لانچ و گزارش‌ها",
    href: "/admin",
    scene: "scene-tablets",
    roman: "VII",
    status: "expanding",
    completion: 74,
    purpose: "جایی که تیم فنی، محصول، محتوا و رشد سایت را کنترل و آماده لانچ می‌کنند.",
    routes: [
      { label: "داشبورد ادمین", href: "/admin" },
      { label: "گردش‌کار", href: "/admin/editorial" },
      { label: "آمادگی لانچ", href: "/admin#launch-readiness" },
    ],
    nextUnlock: "auth امن production، نقش‌های دیتابیسی، audit کامل و اتصال به CMS واقعی.",
  },
];

export function getWorldMapSummary(realms: WorldRealm[] = worldRealms) {
  const averageCompletion = Math.round(realms.reduce((sum, realm) => sum + realm.completion, 0) / realms.length);

  return {
    realms: realms.length,
    live: realms.filter((realm) => realm.status === "live").length,
    expanding: realms.filter((realm) => realm.status === "expanding").length,
    foundation: realms.filter((realm) => realm.status === "foundation").length,
    averageCompletion,
    nextRealm: [...realms].sort((a, b) => a.completion - b.completion)[0],
  };
}
