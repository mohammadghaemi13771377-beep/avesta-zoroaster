export type SourceTrustItem = {
  label: string;
  value: string;
  status: "ready" | "draft" | "pending";
};

export type SourceTrustProfile = {
  title: string;
  summary: string;
  confidence: number;
  items: SourceTrustItem[];
  libraryHref: string;
};

export function getVerseTrustProfile(sectionTitle: string, chapterTitle: string): SourceTrustProfile {
  return {
    title: "اعتبار بند و مسیر پژوهشی",
    summary:
      "این بند در نسخه فعلی با داده نمونه نمایش داده می‌شود و ساختار آن برای اتصال به متن اوستایی، ترجمه کلاسیک، بازنویسی ساده، تحلیل و صوت آماده است.",
    confidence: 72,
    libraryHref: "/library",
    items: [
      { label: "بخش", value: sectionTitle, status: "ready" },
      { label: "فصل/هات", value: chapterTitle, status: "ready" },
      { label: "متن اصلی", value: "آماده ورود از پنل ادمین", status: "pending" },
      { label: "ترجمه و تحلیل", value: "ساختار کامل آماده است", status: "draft" },
    ],
  };
}

export function getArticleTrustProfile(category: string, tags: string[]): SourceTrustProfile {
  return {
    title: "اعتبار مقاله و منابع",
    summary:
      "این مقاله در لایه نمونه محتوا قرار دارد و برای اتصال به کتابخانه، واژه‌نامه، schema مقاله و منابع پژوهشی آماده شده است.",
    confidence: 78,
    libraryHref: "/library",
    items: [
      { label: "دسته", value: category, status: "ready" },
      { label: "برچسب‌ها", value: tags.join("، "), status: "ready" },
      { label: "Schema", value: "Article JSON-LD فعال", status: "ready" },
      { label: "منابع کتابخانه", value: "آماده اتصال CMS", status: "pending" },
    ],
  };
}
