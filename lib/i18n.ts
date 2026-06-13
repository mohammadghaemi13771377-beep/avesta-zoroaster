export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const localeConfig: Record<Locale, { label: string; dir: "rtl" | "ltr"; htmlLang: string; region: string }> = {
  fa: {
    label: "فارسی",
    dir: "rtl",
    htmlLang: "fa",
    region: "IR",
  },
  en: {
    label: "English",
    dir: "ltr",
    htmlLang: "en",
    region: "US",
  },
};

export const localizedRoutes = [
  "/",
  "/avesta",
  "/gathas",
  "/zoroaster",
  "/zoroastrianism",
  "/monotheism",
  "/dictionary",
  "/library",
  "/media",
  "/articles",
  "/timeline",
  "/search",
] as const;

export const dictionary = {
  fa: {
    brand: "AVESTA-ZOROASTER",
    slogan: "پندار نیک | گفتار نیک | کردار نیک",
    heroKicker: "به جهان دیجیتال",
    heroTitle: "اوستا، جهان خرد و روشنایی",
    heroLead:
      "مرجع مدرن آموزه‌های زرتشت، گات‌ها، ایران باستان و پیام یکتاپرستی؛ طراحی شده مثل یک موزه دیجیتال سینمایی.",
    primaryCta: "ورود به جهان اوستا",
    monotheismCta: "هاب یکتاپرستی",
    studyCta: "ادامه مطالعه",
    gateway: "دروازه ورود",
    gatewayTitle: "اول حس کن، بعد وارد متن شو",
    introKicker: "معرفی کوتاه",
    homeSeoTitle: "AVESTA-ZOROASTER | جهان دیجیتال اوستا و زرتشت",
    homeSeoDescription:
      "نسخه فارسی جهان دیجیتال اوستا، زرتشت، گات‌ها، یکتاپرستی و خرد ایران باستان.",
  },
  en: {
    brand: "AVESTA-ZOROASTER",
    slogan: "Good Thoughts | Good Words | Good Deeds",
    heroKicker: "To the digital world",
    heroTitle: "Avesta, a World of Wisdom and Light",
    heroLead:
      "A modern reference for Zoroaster, the Gathas, ancient Iran, monotheistic wisdom, and ethical light as a cinematic digital museum.",
    primaryCta: "Enter the World of Avesta",
    monotheismCta: "Monotheism Hub",
    studyCta: "Continue Reading",
    gateway: "Gateway",
    gatewayTitle: "Feel the world first, then enter the text",
    introKicker: "Short Introduction",
    homeSeoTitle: "AVESTA-ZOROASTER | Digital World of Avesta and Zoroaster",
    homeSeoDescription: "English gateway for Avesta, Zoroaster, the Gathas, monotheism, and ancient Iranian wisdom.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}

export function withLocale(path: string, locale: Locale) {
  if (locale === defaultLocale) {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  return `${path}?lang=${locale}`;
}

export function localizedRouteMap(path: string) {
  return locales.map((locale) => ({
    locale,
    href: withLocale(path, locale),
    label: localeConfig[locale].label,
    dir: localeConfig[locale].dir,
  }));
}
