import { getAvestaPublicationGates, type AvestaPublicationGate } from "@/lib/avesta-publication-gates";

export type AvestaReleaseWaveStatus = "internal" | "beta" | "public";

export type AvestaReleaseWave = {
  id: string;
  title: string;
  status: AvestaReleaseWaveStatus;
  targetDate: string;
  owner: string;
  objective: string;
  gates: AvestaPublicationGate[];
  averageScore: number;
  blockers: number;
  hold: number;
  publish: number;
  entryCriteria: string[];
  exitCriteria: string[];
  deliverables: string[];
  nextAction: string;
};

export const avestaReleaseWaveStatusLabels: Record<AvestaReleaseWaveStatus, string> = {
  internal: "موج داخلی",
  beta: "موج بتا",
  public: "موج عمومی",
};

export const avestaReleaseWaveStatusTone: Record<AvestaReleaseWaveStatus, string> = {
  internal: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  beta: "border-gold/25 bg-gold/10 text-gold-light",
  public: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

const wavePlan = [
  {
    id: "wave-1-foundation",
    title: "موج ۱: نمونه مرجع و قلب تجربه",
    status: "internal" as const,
    targetDate: "2026-06-30",
    owner: "Product + Research",
    slugs: ["gathas", "yasna"],
    objective: "ساخت اولین تجربه کامل و قابل بازبینی از متن، ترجمه، تحلیل، citation و رسانه برای تیم داخلی.",
  },
  {
    id: "wave-2-ritual-myth",
    title: "موج ۲: نیایش، اسطوره و تجربه رسانه‌ای",
    status: "beta" as const,
    targetDate: "2026-07-14",
    owner: "Editorial + Media",
    slugs: ["khordeh-avesta", "yashts", "hats"],
    objective: "آماده‌سازی مسیرهای نیایش روزانه، یشت‌های پرکشش و نقشه هات‌ها برای کاربران بتا.",
  },
  {
    id: "wave-3-research-depth",
    title: "موج ۳: عمق پژوهشی و متن‌های حساس",
    status: "public" as const,
    targetDate: "2026-08-04",
    owner: "Research + Governance",
    slugs: ["visperad", "vendidad"],
    objective: "انتشار عمومی متن‌های پیچیده‌تر پس از تکمیل زمینه تاریخی، منبع‌شناسی و بازبینی حساسیت تفسیری.",
  },
];

export function getAvestaReleaseWaves(gates: AvestaPublicationGate[] = getAvestaPublicationGates()): AvestaReleaseWave[] {
  return wavePlan.map((wave) => {
    const waveGates = wave.slugs
      .map((slug) => gates.find((gate) => gate.slug === slug))
      .filter((gate): gate is AvestaPublicationGate => Boolean(gate));
    const averageScore = Math.round(waveGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(waveGates.length, 1));
    const blockers = waveGates.filter((gate) => gate.status === "block").length;
    const hold = waveGates.filter((gate) => gate.status === "hold").length;
    const publish = waveGates.filter((gate) => gate.status === "publish").length;

    return {
      id: wave.id,
      title: wave.title,
      status: wave.status,
      targetDate: wave.targetDate,
      owner: wave.owner,
      objective: wave.objective,
      gates: waveGates,
      averageScore,
      blockers,
      hold,
      publish,
      entryCriteria: buildEntryCriteria(wave.status),
      exitCriteria: buildExitCriteria(wave.status),
      deliverables: buildDeliverables(wave.slugs),
      nextAction: buildNextAction(waveGates),
    };
  });
}

export function getAvestaReleaseWaveSummary(waves: AvestaReleaseWave[] = getAvestaReleaseWaves()) {
  const averageScore = Math.round(waves.reduce((sum, wave) => sum + wave.averageScore, 0) / waves.length);
  const totalBlockers = waves.reduce((sum, wave) => sum + wave.blockers, 0);
  const nextWave = waves.find((wave) => wave.blockers > 0 || wave.hold > 0) ?? waves[0];

  return {
    total: waves.length,
    averageScore,
    totalBlockers,
    readyWaves: waves.filter((wave) => wave.blockers === 0 && wave.hold === 0).length,
    nextWave,
  };
}

export function buildAvestaReleaseWaveCsv(waves: AvestaReleaseWave[] = getAvestaReleaseWaves()) {
  const headers = ["id", "title", "status", "targetDate", "owner", "averageScore", "blockers", "hold", "publish", "sections", "nextAction"];

  return [
    headers.join(","),
    ...waves.map((wave) =>
      [
        wave.id,
        wave.title,
        wave.status,
        wave.targetDate,
        wave.owner,
        wave.averageScore,
        wave.blockers,
        wave.hold,
        wave.publish,
        wave.gates.map((gate) => gate.slug).join(" | "),
        wave.nextAction,
      ].map((value) => escapeCsvCell(String(value))).join(","),
    ),
  ].join("\n");
}

function buildEntryCriteria(status: AvestaReleaseWaveStatus) {
  const common = [
    "Publication Gate هر بخش باید بدون مانع امنیتی/محتوایی ثبت شود.",
    "Source Registry و Citation Coverage برای هر بخش بررسی شود.",
  ];

  if (status === "internal") {
    return [...common, "حداقل یک نمونه کامل Golden Content برای هر بخش آماده باشد."];
  }

  if (status === "beta") {
    return [...common, "تصویر، صوت یا تجربه رسانه‌ای برای صفحات بتا قابل مشاهده باشد."];
  }

  return [...common, "بازبینی سردبیر، SEO نهایی و یادداشت حساسیت تفسیری برای متن‌های حساس انجام شود."];
}

function buildExitCriteria(status: AvestaReleaseWaveStatus) {
  if (status === "internal") {
    return ["بازخورد تیم محتوا و محصول ثبت شود.", "Blockerهای اصلی به batch تولید منتقل شوند."];
  }

  if (status === "beta") {
    return ["مسیر کاربر از خانه تا مطالعه کامل تست شود.", "Event Tracking و CTAهای کلیدی ثبت شوند."];
  }

  return ["همه صفحات موج بدون blocker باشند.", "دامنه، sitemap، robots و metadata برای ایندکس عمومی بازبینی شوند."];
}

function buildDeliverables(slugs: string[]) {
  return [
    `صفحات موج: ${slugs.join("، ")}`,
    "CSV خروجی gateها برای تیم محصول",
    "چک‌لیست QA موبایل و SEO",
    "لیست citationهای معلق برای تیم پژوهش",
  ];
}

function buildNextAction(gates: AvestaPublicationGate[]) {
  const blocked = gates.find((gate) => gate.status === "block");

  if (blocked) {
    return `${blocked.title}: ${blocked.nextAction}`;
  }

  const hold = gates.find((gate) => gate.status === "hold");

  if (hold) {
    return `${hold.title}: ${hold.nextAction}`;
  }

  return "موج آماده عبور است؛ برنامه QA و انتشار مرحله‌ای را در تقویم ثبت کنید.";
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
