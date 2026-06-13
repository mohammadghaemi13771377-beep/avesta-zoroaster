import { newsletterEditions } from "@/lib/newsletter-editions";
import { getRate } from "@/lib/newsletter-analytics";

export type NewsletterExperimentVariant = {
  id: string;
  label: string;
  subject: string;
  preheader: string;
  ctaLabel: string;
  sampleSize: number;
  opens: number;
  clicks: number;
};

export type NewsletterExperiment = {
  id: string;
  editionId: string;
  goal: string;
  hypothesis: string;
  status: "draft" | "running" | "winner";
  variants: NewsletterExperimentVariant[];
};

export const newsletterExperiments: NewsletterExperiment[] = [
  {
    id: "exp-nowruz-subject",
    editionId: "light-digest-nowruz",
    goal: "افزایش نرخ باز شدن نورنامه نوروز",
    hypothesis: "Subject با وعده نیت تازه، open rate بیشتری از subject توصیفی دارد.",
    status: "winner",
    variants: [
      {
        id: "a",
        label: "A",
        subject: "نورنامه نوروز | نیت تازه برای سال روشن",
        preheader: "اوستای امروز، دفتر پندار و یک مسیر کوتاه برای آغاز سال.",
        ctaLabel: "ثبت نیت امروز",
        sampleSize: 900,
        opens: 604,
        clicks: 231,
      },
      {
        id: "b",
        label: "B",
        subject: "نوروز، اوستا و روشنایی تازه",
        preheader: "یک شماره ویژه برای خواندن، نوشتن و شروعی آرام.",
        ctaLabel: "ورود به نوروز",
        sampleSize: 900,
        opens: 530,
        clicks: 195,
      },
    ],
  },
  {
    id: "exp-mehregan-cta",
    editionId: "light-digest-mehregan",
    goal: "افزایش کلیک روی کمپین مهرگان",
    hypothesis: "CTA مستقیم کمپین از CTA عمومی فروشگاه کلیک بیشتری می‌گیرد.",
    status: "running",
    variants: [
      {
        id: "a",
        label: "A",
        subject: "مهرگان | پیمان، گفتار نیک و کالکشن فرهنگی",
        preheader: "مسیر مطالعه و کمپین مهرگان را ببینید.",
        ctaLabel: "دیدن کمپین مهرگان",
        sampleSize: 620,
        opens: 346,
        clicks: 121,
      },
      {
        id: "b",
        label: "B",
        subject: "نورنامه مهرگان برای روزهای مهر",
        preheader: "مقاله، فروشگاه آینده و مسیر مطالعه مهرگان.",
        ctaLabel: "دیدن فروشگاه آینده",
        sampleSize: 620,
        opens: 336,
        clicks: 96,
      },
    ],
  },
  {
    id: "exp-sadeh-preheader",
    editionId: "light-digest-sadeh",
    goal: "بهبود preheader برای شماره سده",
    hypothesis: "Preheader تصویری و آیینی، برای شماره رسانه‌ای سده مناسب‌تر است.",
    status: "draft",
    variants: [
      {
        id: "a",
        label: "A",
        subject: "سده | آتش، امید و تصویرسازی آیینی",
        preheader: "یک شماره برای دیدن آتش، ساخت تصویر و ادامه مسیر زمستان.",
        ctaLabel: "ساخت تصویر سده",
        sampleSize: 360,
        opens: 166,
        clicks: 58,
      },
      {
        id: "b",
        label: "B",
        subject: "نورنامه سده | گرمای روشنایی در زمستان",
        preheader: "از صفحه سده تا استودیوی AI و رسانه‌های تازه.",
        ctaLabel: "ورود به استودیوی AI",
        sampleSize: 360,
        opens: 154,
        clicks: 43,
      },
    ],
  },
];

export function getVariantScore(variant: NewsletterExperimentVariant) {
  return Math.round((getRate(variant.opens, variant.sampleSize) * 0.55 + getRate(variant.clicks, variant.sampleSize) * 0.45) * 10) / 10;
}

export function getExperimentWinner(experiment: NewsletterExperiment) {
  return [...experiment.variants].sort((a, b) => getVariantScore(b) - getVariantScore(a))[0];
}

export function getNewsletterExperimentSummary(experiments: NewsletterExperiment[] = newsletterExperiments) {
  const running = experiments.filter((experiment) => experiment.status === "running").length;
  const completed = experiments.filter((experiment) => experiment.status === "winner").length;
  const totalVariants = experiments.reduce((sum, experiment) => sum + experiment.variants.length, 0);
  const best = [...experiments]
    .map((experiment) => ({ experiment, winner: getExperimentWinner(experiment) }))
    .sort((a, b) => getVariantScore(b.winner) - getVariantScore(a.winner))[0];

  return {
    total: experiments.length,
    running,
    completed,
    totalVariants,
    bestExperiment: best?.experiment,
    bestVariant: best?.winner,
  };
}

export function getExperimentEditionTitle(editionId: string) {
  return newsletterEditions.find((edition) => edition.id === editionId)?.title ?? editionId;
}
