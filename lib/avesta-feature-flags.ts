import { getAvestaReleaseWaves, type AvestaReleaseWaveStatus } from "@/lib/avesta-release-waves";
import type { AvestaPublicationGateStatus } from "@/lib/avesta-publication-gates";

export type AvestaVisibilityMode = "hidden" | "internal" | "beta" | "public";

export type AvestaFeatureFlag = {
  id: string;
  sectionTitle: string;
  sectionSlug: string;
  href: string;
  waveId: string;
  waveTitle: string;
  waveStatus: AvestaReleaseWaveStatus;
  gateStatus: AvestaPublicationGateStatus;
  visibility: AvestaVisibilityMode;
  audience: string;
  enabled: boolean;
  score: number;
  reason: string;
  safeguards: string[];
  rolloutChecklist: string[];
};

export const avestaVisibilityLabels: Record<AvestaVisibilityMode, string> = {
  hidden: "پنهان",
  internal: "داخلی",
  beta: "بتا",
  public: "عمومی",
};

export const avestaVisibilityTone: Record<AvestaVisibilityMode, string> = {
  hidden: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  internal: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  beta: "border-gold/25 bg-gold/10 text-gold-light",
  public: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

export function getAvestaFeatureFlags(): AvestaFeatureFlag[] {
  return getAvestaReleaseWaves().flatMap((wave) =>
    wave.gates.map((gate) => {
      const visibility = resolveVisibility(wave.status, gate.status);
      const enabled = visibility !== "hidden";

      return {
        id: `feature-${gate.slug}`,
        sectionTitle: gate.title,
        sectionSlug: gate.slug,
        href: gate.href,
        waveId: wave.id,
        waveTitle: wave.title,
        waveStatus: wave.status,
        gateStatus: gate.status,
        visibility,
        audience: resolveAudience(visibility),
        enabled,
        score: gate.score,
        reason: buildReason(visibility, gate.status, wave.status, gate.nextAction),
        safeguards: buildSafeguards(visibility, gate.slug),
        rolloutChecklist: buildRolloutChecklist(visibility),
      };
    }),
  );
}

export function getAvestaFeatureFlagSummary(flags: AvestaFeatureFlag[] = getAvestaFeatureFlags()) {
  return {
    total: flags.length,
    enabled: flags.filter((flag) => flag.enabled).length,
    hidden: flags.filter((flag) => flag.visibility === "hidden").length,
    internal: flags.filter((flag) => flag.visibility === "internal").length,
    beta: flags.filter((flag) => flag.visibility === "beta").length,
    public: flags.filter((flag) => flag.visibility === "public").length,
  };
}

export function buildAvestaFeatureFlagCsv(flags: AvestaFeatureFlag[] = getAvestaFeatureFlags()) {
  const headers = [
    "sectionSlug",
    "sectionTitle",
    "waveId",
    "waveStatus",
    "gateStatus",
    "visibility",
    "enabled",
    "score",
    "audience",
    "reason",
  ];

  return [
    headers.join(","),
    ...flags.map((flag) =>
      [
        flag.sectionSlug,
        flag.sectionTitle,
        flag.waveId,
        flag.waveStatus,
        flag.gateStatus,
        flag.visibility,
        flag.enabled,
        flag.score,
        flag.audience,
        flag.reason,
      ].map((value) => escapeCsvCell(String(value))).join(","),
    ),
  ].join("\n");
}

function resolveVisibility(waveStatus: AvestaReleaseWaveStatus, gateStatus: AvestaPublicationGateStatus): AvestaVisibilityMode {
  if (gateStatus === "block") {
    return "hidden";
  }

  if (gateStatus === "hold") {
    return waveStatus === "public" ? "beta" : "internal";
  }

  if (waveStatus === "internal") {
    return "internal";
  }

  if (waveStatus === "beta") {
    return "beta";
  }

  return "public";
}

function resolveAudience(visibility: AvestaVisibilityMode) {
  if (visibility === "public") {
    return "همه کاربران و موتورهای جستجو";
  }

  if (visibility === "beta") {
    return "کاربران بتا، تیم محتوا و تیم محصول";
  }

  if (visibility === "internal") {
    return "ادمین، پژوهش، محصول و QA داخلی";
  }

  return "غیرفعال؛ فقط در پنل ادمین دیده شود";
}

function buildReason(
  visibility: AvestaVisibilityMode,
  gateStatus: AvestaPublicationGateStatus,
  waveStatus: AvestaReleaseWaveStatus,
  nextAction: string,
) {
  if (visibility === "hidden") {
    return `Gate هنوز ${gateStatus} است؛ ${nextAction}`;
  }

  if (visibility === "internal") {
    return `در موج ${waveStatus} برای بازبینی داخلی فعال است؛ ${nextAction}`;
  }

  if (visibility === "beta") {
    return `برای تست بتا فعال است و قبل از public باید هشدارها بسته شوند؛ ${nextAction}`;
  }

  return "برای نمایش عمومی آماده است؛ فقط مانیتورینگ انتشار و SEO دنبال شود.";
}

function buildSafeguards(visibility: AvestaVisibilityMode, sectionSlug: string) {
  const safeguards = [
    "CTAهای عمومی باید با وضعیت visibility هماهنگ باشند.",
    "اگر صفحه hidden/internal است، نباید در sitemap عمومی تبلیغ شود.",
  ];

  if (visibility === "beta") {
    safeguards.push("برچسب بتا و پیام بازبینی پژوهشی در UI نمایش داده شود.");
  }

  if (visibility === "public") {
    safeguards.push("schema، canonical و metadata برای ایندکس عمومی نهایی شود.");
  }

  if (sectionSlug === "vendidad") {
    safeguards.push("برای وندیداد، یادداشت زمینه تاریخی و حساسیت تفسیری اجباری است.");
  }

  return safeguards;
}

function buildRolloutChecklist(visibility: AvestaVisibilityMode) {
  if (visibility === "hidden") {
    return ["Blockerهای Publication Gate را ببندید.", "Citation تاییدشده و محتوای طلایی را تکمیل کنید."];
  }

  if (visibility === "internal") {
    return ["QA داخلی انجام شود.", "بازخورد تیم پژوهش و محصول ثبت شود.", "Eventهای کلیک/مطالعه بررسی شوند."];
  }

  if (visibility === "beta") {
    return ["برچسب بتا فعال باشد.", "سشن‌های تست کاربر ثبت شود.", "هشدارهای source و SEO بسته شوند."];
  }

  return ["Sitemap و robots بازبینی شود.", "مانیتورینگ خطا و سرچ فعال باشد.", "CTAهای ادامه مطالعه و newsletter بررسی شوند."];
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
