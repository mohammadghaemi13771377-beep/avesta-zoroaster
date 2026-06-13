import { avestaSections } from "@/lib/content";

export type AvestaCompletionField =
  | "originalText"
  | "transliteration"
  | "classicalTranslation"
  | "simpleRewrite"
  | "modernInterpretation"
  | "ethicalMessage"
  | "aiImage"
  | "audio"
  | "citation"
  | "seo";

export type AvestaCompletionSection = {
  slug: string;
  title: string;
  href: string;
  owner: string;
  priority: "critical" | "high" | "medium";
  plannedVerses: number;
  ready: Record<AvestaCompletionField, number>;
  target: Record<AvestaCompletionField, number>;
  completion: number;
  nextAction: string;
};

export const avestaCompletionFieldLabels: Record<AvestaCompletionField, string> = {
  originalText: "متن اصلی",
  transliteration: "آوانویسی",
  classicalTranslation: "ترجمه کلاسیک",
  simpleRewrite: "بازنویسی ساده",
  modernInterpretation: "تحلیل مفهومی",
  ethicalMessage: "پیام اخلاقی",
  aiImage: "تصویر AI",
  audio: "صوت",
  citation: "منبع",
  seo: "SEO",
};

const plannedBySlug: Record<string, { verses: number; owner: string; priority: AvestaCompletionSection["priority"]; nextAction: string }> = {
  yasna: {
    verses: 72,
    owner: "Content + Research",
    priority: "critical",
    nextAction: "ورود متن و ترجمه یسنا، شروع از هات‌های گاتایی و آماده‌سازی صوت آیینی.",
  },
  gathas: {
    verses: 17,
    owner: "Research + Editorial",
    priority: "critical",
    nextAction: "تکمیل ترجمه، بازنویسی ساده و تحلیل مفهومی برای همه سرودهای گات‌ها.",
  },
  visperad: {
    verses: 24,
    owner: "Research",
    priority: "medium",
    nextAction: "تعریف ساختار فصل‌ها و منبع‌شناسی قبل از تولید متن کامل.",
  },
  vendidad: {
    verses: 22,
    owner: "Research + Legal Review",
    priority: "high",
    nextAction: "بازبینی حساسیت محتوایی، citation دقیق و تحلیل پاکی/قانون با زبان امروزی.",
  },
  yashts: {
    verses: 21,
    owner: "Mythology + Media",
    priority: "high",
    nextAction: "تولید تصویرهای حماسی و خلاصه مفهومی برای یشت‌های پرجستجو.",
  },
  "khordeh-avesta": {
    verses: 18,
    owner: "Ritual + Audio",
    priority: "high",
    nextAction: "ضبط نیایش‌های روزانه و آماده‌سازی تجربه صوتی برای موبایل.",
  },
  hats: {
    verses: 72,
    owner: "Content Ops",
    priority: "medium",
    nextAction: "ساخت index هات‌ها و اتصال هر هات به متن، ترجمه، تصویر و citation.",
  },
};

const readyRatios: Record<string, Partial<Record<AvestaCompletionField, number>>> = {
  yasna: {
    originalText: 0.2,
    transliteration: 0.12,
    classicalTranslation: 0.14,
    simpleRewrite: 0.1,
    modernInterpretation: 0.08,
    ethicalMessage: 0.12,
    aiImage: 0.15,
    audio: 0.04,
    citation: 0.18,
    seo: 0.35,
  },
  gathas: {
    originalText: 0.42,
    transliteration: 0.28,
    classicalTranslation: 0.34,
    simpleRewrite: 0.3,
    modernInterpretation: 0.26,
    ethicalMessage: 0.3,
    aiImage: 0.24,
    audio: 0.12,
    citation: 0.35,
    seo: 0.46,
  },
  visperad: {
    originalText: 0.08,
    transliteration: 0.04,
    classicalTranslation: 0.04,
    simpleRewrite: 0.02,
    modernInterpretation: 0.02,
    ethicalMessage: 0.04,
    aiImage: 0.08,
    audio: 0,
    citation: 0.1,
    seo: 0.22,
  },
  vendidad: {
    originalText: 0.18,
    transliteration: 0.08,
    classicalTranslation: 0.1,
    simpleRewrite: 0.06,
    modernInterpretation: 0.05,
    ethicalMessage: 0.05,
    aiImage: 0.16,
    audio: 0,
    citation: 0.2,
    seo: 0.3,
  },
  yashts: {
    originalText: 0.22,
    transliteration: 0.1,
    classicalTranslation: 0.12,
    simpleRewrite: 0.1,
    modernInterpretation: 0.1,
    ethicalMessage: 0.14,
    aiImage: 0.22,
    audio: 0.04,
    citation: 0.18,
    seo: 0.34,
  },
  "khordeh-avesta": {
    originalText: 0.24,
    transliteration: 0.12,
    classicalTranslation: 0.16,
    simpleRewrite: 0.18,
    modernInterpretation: 0.12,
    ethicalMessage: 0.22,
    aiImage: 0.18,
    audio: 0.1,
    citation: 0.16,
    seo: 0.38,
  },
  hats: {
    originalText: 0.14,
    transliteration: 0.06,
    classicalTranslation: 0.08,
    simpleRewrite: 0.06,
    modernInterpretation: 0.04,
    ethicalMessage: 0.06,
    aiImage: 0.08,
    audio: 0,
    citation: 0.1,
    seo: 0.24,
  },
};

const fields = Object.keys(avestaCompletionFieldLabels) as AvestaCompletionField[];

export function getAvestaCompletionSections(): AvestaCompletionSection[] {
  return avestaSections.map((section) => {
    const plan = plannedBySlug[section.slug] ?? plannedBySlug.hats;
    const target = buildTarget(plan.verses);
    const ready = buildReady(section.slug, target);

    return {
      slug: section.slug,
      title: section.title,
      href: section.href,
      owner: plan.owner,
      priority: plan.priority,
      plannedVerses: plan.verses,
      ready,
      target,
      completion: calculateCompletion(ready, target),
      nextAction: plan.nextAction,
    };
  });
}

export function getAvestaCompletionSummary(sections: AvestaCompletionSection[] = getAvestaCompletionSections()) {
  const target = sections.reduce((sum, section) => sum + sumFields(section.target), 0);
  const ready = sections.reduce((sum, section) => sum + sumFields(section.ready), 0);
  const critical = sections.filter((section) => section.priority === "critical").length;
  const weakestField = getWeakestField(sections);
  const nextSection = [...sections].sort((a, b) => a.completion - b.completion)[0];

  return {
    sections: sections.length,
    target,
    ready,
    remaining: Math.max(target - ready, 0),
    completion: Math.round((ready / Math.max(target, 1)) * 100),
    critical,
    weakestField,
    nextSection,
  };
}

function buildTarget(verses: number): Record<AvestaCompletionField, number> {
  return fields.reduce((acc, field) => {
    acc[field] = verses;
    return acc;
  }, {} as Record<AvestaCompletionField, number>);
}

function buildReady(slug: string, target: Record<AvestaCompletionField, number>) {
  const ratios = readyRatios[slug] ?? {};
  return fields.reduce((acc, field) => {
    acc[field] = Math.min(target[field], Math.round(target[field] * (ratios[field] ?? 0)));
    return acc;
  }, {} as Record<AvestaCompletionField, number>);
}

function calculateCompletion(ready: Record<AvestaCompletionField, number>, target: Record<AvestaCompletionField, number>) {
  return Math.round((sumFields(ready) / Math.max(sumFields(target), 1)) * 100);
}

function getWeakestField(sections: AvestaCompletionSection[]) {
  return fields
    .map((field) => {
      const target = sections.reduce((sum, section) => sum + section.target[field], 0);
      const ready = sections.reduce((sum, section) => sum + section.ready[field], 0);
      return {
        field,
        label: avestaCompletionFieldLabels[field],
        ready,
        target,
        completion: Math.round((ready / Math.max(target, 1)) * 100),
      };
    })
    .sort((a, b) => a.completion - b.completion)[0];
}

function sumFields(value: Record<AvestaCompletionField, number>) {
  return fields.reduce((sum, field) => sum + value[field], 0);
}
