import { newsletterEditions } from "@/lib/newsletter-editions";

export type NewsletterMetricTrend = "up" | "down" | "flat";

export type NewsletterEditionAnalytics = {
  editionId: string;
  sent: number;
  opens: number;
  clicks: number;
  unsubscribes: number;
  conversions: number;
  topLink: string;
  trend: NewsletterMetricTrend;
};

const analyticsSeeds: Record<string, Omit<NewsletterEditionAnalytics, "editionId">> = {
  "light-digest-nowruz": {
    sent: 1800,
    opens: 1134,
    clicks: 426,
    unsubscribes: 9,
    conversions: 148,
    topLink: "/reflection",
    trend: "up",
  },
  "light-digest-mehregan": {
    sent: 1240,
    opens: 682,
    clicks: 248,
    unsubscribes: 7,
    conversions: 94,
    topLink: "/campaigns",
    trend: "flat",
  },
  "light-digest-sadeh": {
    sent: 720,
    opens: 331,
    clicks: 101,
    unsubscribes: 6,
    conversions: 41,
    topLink: "/ai-studio",
    trend: "down",
  },
};

export const newsletterAnalytics: NewsletterEditionAnalytics[] = newsletterEditions.map((edition) => ({
  editionId: edition.id,
  ...(analyticsSeeds[edition.id] ?? {
    sent: 0,
    opens: 0,
    clicks: 0,
    unsubscribes: 0,
    conversions: 0,
    topLink: edition.cta.href,
    trend: "flat" as const,
  }),
}));

export function getNewsletterAnalyticsSummary(metrics: NewsletterEditionAnalytics[] = newsletterAnalytics) {
  const sent = metrics.reduce((sum, item) => sum + item.sent, 0);
  const opens = metrics.reduce((sum, item) => sum + item.opens, 0);
  const clicks = metrics.reduce((sum, item) => sum + item.clicks, 0);
  const unsubscribes = metrics.reduce((sum, item) => sum + item.unsubscribes, 0);
  const conversions = metrics.reduce((sum, item) => sum + item.conversions, 0);
  const bestEdition = [...metrics].sort((a, b) => getRate(b.clicks, b.sent) - getRate(a.clicks, a.sent))[0];

  return {
    sent,
    opens,
    clicks,
    unsubscribes,
    conversions,
    openRate: getRate(opens, sent),
    clickRate: getRate(clicks, sent),
    unsubscribeRate: getRate(unsubscribes, sent),
    conversionRate: getRate(conversions, sent),
    bestEdition,
  };
}

export function getRate(value: number, base: number) {
  return base ? Math.round((value / base) * 1000) / 10 : 0;
}
