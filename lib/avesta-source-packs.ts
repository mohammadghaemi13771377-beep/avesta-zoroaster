import { avestaSections } from "@/lib/content";
import { getCitationRecords } from "@/lib/citations";
import { getSourceReviewItems, type SourceReviewRisk } from "@/lib/source-review";

export type AvestaSourcePackStatus = "ready" | "needs-review" | "draft";

export type AvestaSourcePack = {
  id: string;
  sectionTitle: string;
  sectionSlug: string;
  href: string;
  status: AvestaSourcePackStatus;
  risk: SourceReviewRisk;
  confidence: number;
  owner: string;
  dueDate: string;
  verifiedCitations: number;
  pendingCitations: number;
  requiredSources: string[];
  requiredAssets: string[];
  acceptanceCriteria: string[];
  editorialNotes: string[];
  csvRow: Record<string, string | number>;
};

export const avestaSourcePackStatusLabels: Record<AvestaSourcePackStatus, string> = {
  ready: "آماده انتشار پژوهشی",
  "needs-review": "نیازمند بازبینی",
  draft: "پیش‌نویس تولید",
};

export const avestaSourcePackStatusTone: Record<AvestaSourcePackStatus, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-review": "border-gold/25 bg-gold/10 text-gold-light",
  draft: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

const sectionSourceMap: Record<string, string[]> = {
  yasna: ["متن اوستایی یسنا", "ترجمه کلاسیک یسنا", "یادداشت آیینی و ساختار هات‌ها"],
  gathas: ["متن گاهانی", "ترجمه تطبیقی گات‌ها", "شرح مفاهیم اشا، وهومن و اختیار"],
  visperad: ["متن ویسپرد", "شرح آیینی ردان", "منبع تطبیقی جایگاه ویسپرد در مراسم"],
  vendidad: ["متن وندیداد", "شرح قانون پاکی", "یادداشت زمینه تاریخی و تفسیری"],
  yashts: ["متن یشت‌ها", "منبع اسطوره‌شناسی ایرانی", "راهنمای ایزدان، طبیعت و روایت‌های حماسی"],
  "khordeh-avesta": ["نیایش‌های خرده اوستا", "ترجمه نیایش روزانه", "یادداشت کاربرد آیینی امروز"],
  hats: ["فهرست هات‌ها", "نقشه شماره‌گذاری", "راهنمای اتصال بندها به فصل‌ها"],
};

const assetMap: Record<string, string[]> = {
  yasna: ["تصویر آتش مقدس و معبد", "خوانش صوتی هات آغازین", "کارت نقل‌قول طلایی"],
  gathas: ["تصویر سپید/طلایی معنوی", "خوانش صوتی گات‌ها", "نمودار مفهوم اشا و وهومن"],
  visperad: ["تصویر مراسم نیایش", "راهنمای صوتی کوتاه", "تصویر طومار آیینی"],
  vendidad: ["تصویر آبی تیره و آتش نارنجی", "هشدار زمینه تاریخی", "کارت توضیح قانون و پاکی"],
  yashts: ["تصویر حماسی طبیعت و آسمان", "کارت ایزد/مفهوم", "روایت صوتی اسطوره‌ای"],
  "khordeh-avesta": ["تصویر نیایش روزانه", "فایل صوتی کوتاه", "کارت تمرین روزانه"],
  hats: ["تصویر طومار و کتاب مقدس", "نقشه مطالعه", "نمای progress برای هر هات"],
};

export function getAvestaSourcePacks(): AvestaSourcePack[] {
  const reviewItems = getSourceReviewItems();
  const citations = getCitationRecords();

  return avestaSections.map((section) => {
    const sectionReviews = reviewItems.filter((item) => item.href.includes(`/avesta/${section.slug}`));
    const sectionCitations = citations.filter((citation) => citation.targetHref.includes(`/avesta/${section.slug}`));
    const verifiedCitations = sectionCitations.filter((citation) => citation.status === "verified").length;
    const pendingCitations = sectionCitations.length - verifiedCitations;
    const confidence = sectionReviews.length
      ? Math.round(sectionReviews.reduce((sum, item) => sum + item.confidence, 0) / sectionReviews.length)
      : 65;
    const risk = resolveRisk(sectionReviews.map((item) => item.risk), pendingCitations, verifiedCitations);
    const status = resolveStatus(risk, verifiedCitations, pendingCitations);
    const owner = section.slug === "gathas" ? "تیم پژوهش گات‌ها" : section.slug === "hats" ? "تیم معماری محتوا" : "تیم پژوهش اوستا";
    const dueDate = risk === "high" ? "2026-06-20" : risk === "medium" ? "2026-06-28" : "2026-07-08";

    return {
      id: `source-pack-${section.slug}`,
      sectionTitle: section.title,
      sectionSlug: section.slug,
      href: section.href,
      status,
      risk,
      confidence,
      owner,
      dueDate,
      verifiedCitations,
      pendingCitations,
      requiredSources: sectionSourceMap[section.slug] ?? ["منبع متن اصلی", "ترجمه کلاسیک", "یادداشت تحریریه"],
      requiredAssets: assetMap[section.slug] ?? ["تصویر AI", "فایل صوتی", "کارت نقل‌قول"],
      acceptanceCriteria: [
        "حداقل یک citation متن اصلی برای هر بند نمونه ثبت شود.",
        "ترجمه کلاسیک، بازنویسی ساده، تحلیل مفهومی و پیام اخلاقی کامل باشد.",
        "تصویر AI و فایل صوتی با مسیر نهایی storage یا public هماهنگ باشد.",
        "SEO title، description و schema صفحه قبل از انتشار بازبینی شود.",
      ],
      editorialNotes: buildEditorialNotes(section.slug, risk, pendingCitations),
      csvRow: {
        sectionSlug: section.slug,
        sectionTitle: section.title,
        owner,
        status,
        risk,
        confidence,
        dueDate,
        verifiedCitations,
        pendingCitations,
      },
    };
  });
}

export function getAvestaSourcePackSummary(packs: AvestaSourcePack[] = getAvestaSourcePacks()) {
  const averageConfidence = Math.round(packs.reduce((sum, pack) => sum + pack.confidence, 0) / packs.length);

  return {
    total: packs.length,
    averageConfidence,
    ready: packs.filter((pack) => pack.status === "ready").length,
    needsReview: packs.filter((pack) => pack.status === "needs-review").length,
    draft: packs.filter((pack) => pack.status === "draft").length,
    pendingCitations: packs.reduce((sum, pack) => sum + pack.pendingCitations, 0),
  };
}

export function buildAvestaSourcePackCsv(packs: AvestaSourcePack[] = getAvestaSourcePacks()) {
  const headers = ["sectionSlug", "sectionTitle", "owner", "status", "risk", "confidence", "dueDate", "verifiedCitations", "pendingCitations"];

  return [
    headers.join(","),
    ...packs.map((pack) => headers.map((header) => escapeCsvCell(String(pack.csvRow[header] ?? ""))).join(",")),
  ].join("\n");
}

export function buildAvestaSourcePackMarkdown(packs: AvestaSourcePack[] = getAvestaSourcePacks()) {
  return packs
    .map((pack) =>
      [
        `## ${pack.sectionTitle} (${pack.sectionSlug})`,
        `- Status: ${avestaSourcePackStatusLabels[pack.status]}`,
        `- Risk: ${pack.risk}`,
        `- Confidence: ${pack.confidence}%`,
        `- Owner: ${pack.owner}`,
        `- Due date: ${pack.dueDate}`,
        `- Required sources: ${pack.requiredSources.join(" | ")}`,
        `- Required assets: ${pack.requiredAssets.join(" | ")}`,
        `- Acceptance: ${pack.acceptanceCriteria.join(" | ")}`,
        `- Notes: ${pack.editorialNotes.join(" | ")}`,
      ].join("\n"),
    )
    .join("\n\n");
}

function resolveRisk(risks: SourceReviewRisk[], pendingCitations: number, verifiedCitations: number): SourceReviewRisk {
  if (risks.includes("high") || verifiedCitations === 0 || pendingCitations > 2) {
    return "high";
  }

  if (risks.includes("medium") || pendingCitations > 0) {
    return "medium";
  }

  return "low";
}

function resolveStatus(risk: SourceReviewRisk, verifiedCitations: number, pendingCitations: number): AvestaSourcePackStatus {
  if (risk === "low" && verifiedCitations > 0 && pendingCitations === 0) {
    return "ready";
  }

  if (risk === "medium") {
    return "needs-review";
  }

  return "draft";
}

function buildEditorialNotes(sectionSlug: string, risk: SourceReviewRisk, pendingCitations: number) {
  const notes = [
    "این Source Pack باید قبل از import نهایی با تیم پژوهش و تحریریه تایید شود.",
    "برای هر متن، نسخه منبع، مترجم/پژوهشگر، صفحه یا شماره بند ثبت شود.",
  ];

  if (risk === "high") {
    notes.push("اولویت این بخش بالاست؛ بدون citation تاییدشده وارد انتشار عمومی نشود.");
  }

  if (pendingCitations > 0) {
    notes.push(`${pendingCitations} citation هنوز نیازمند بازبینی یا تکمیل است.`);
  }

  if (sectionSlug === "vendidad") {
    notes.push("برای وندیداد، زمینه تاریخی و توضیح حساسیت تفسیری باید کنار متن نمایش داده شود.");
  }

  return notes;
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
