export const siteConfig = {
  name: "AVESTA-ZOROASTER",
  domain: "avesta-zoroaster.com",
  url: "https://avesta-zoroaster.com",
  title: "AVESTA-ZOROASTER | جهان دیجیتال اوستا و زرتشت",
  description:
    "مرجع مدرن آموزه‌های زرتشت، گات‌ها، اوستا، ایران باستان و پیام خرد، روشنایی و یکتاپرستی.",
  slogan: "پندار نیک | گفتار نیک | کردار نیک",
  locale: "fa_IR",
};

export const seoKeywords = [
  "اوستا",
  "زرتشت",
  "گات‌ها",
  "اهورامزدا",
  "دین زرتشتی",
  "فروهر",
  "یسنا",
  "وندیداد",
  "یشت‌ها",
  "ایران باستان",
  "یکتاپرستی",
  "اشا",
  "وهومن",
];

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function sitemapPriority(route: string) {
  if (route === "/" || route === "/fa" || route === "/en") {
    return 1;
  }

  if (route === "/avesta" || route === "/search") {
    return 0.95;
  }

  if (route.startsWith("/avesta/") || route === "/dictionary" || route === "/articles") {
    return 0.9;
  }

  if (route.startsWith("/articles/") || route.startsWith("/dictionary/")) {
    return 0.86;
  }

  if (route === "/shop" || route.startsWith("/shop/")) {
    return 0.84;
  }

  if (route.startsWith("/admin")) {
    return 0.25;
  }

  return 0.78;
}

export function sitemapChangeFrequency(route: string) {
  if (route.startsWith("/admin")) {
    return "monthly" as const;
  }

  if (route.startsWith("/articles") || route.startsWith("/media") || route.startsWith("/shop")) {
    return "weekly" as const;
  }

  return "weekly" as const;
}
