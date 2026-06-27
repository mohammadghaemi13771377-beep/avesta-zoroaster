export const siteConfig = {
  name: "AVESTA-ZOROASTER",
  domain: "avesta-zoroaster.com",
  url: "https://avesta-zoroaster.com",
  title: "AVESTA-ZOROASTER | جهان دیجیتال اوستا و زرتشت",
  description:
    "مرجع مدرن آموزه‌های زرتشت، گات‌ها، اوستا، ایران باستان و پیام خرد، روشنایی و یکتاپرستی.",
  slogan: "پندار نیک | گفتار نیک | کردار نیک",
  locale: "fa_IR",
  alternateLocale: "en_US",
};

export const languageAlternates = {
  fa: absoluteUrl("/fa"),
  en: absoluteUrl("/en"),
  "x-default": absoluteUrl("/")
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

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/ai/home-hero-desktop.jpg",
  type = "website",
  noIndex = false
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1600, height: 900, alt: title }],
      locale: siteConfig.locale,
      alternateLocale: [siteConfig.alternateLocale],
      type
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["Avesta Zoroaster", "اوستا زرتشت"],
    url: siteConfig.url,
    inLanguage: ["fa-IR", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/avesta-zoroaster-logo.png"),
    sameAs: [],
    description: siteConfig.description
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function collectionPageJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(url),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function creativeWorkJsonLd({
  name,
  description,
  url,
  image
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: absoluteUrl(url),
    image: image ? absoluteUrl(image) : undefined,
    inLanguage: ["fa-IR", "en-US"],
    about: ["Avesta", "Zoroaster", "Zoroastrianism", "Ancient Iran"]
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
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
