import { studyPlanSteps, type StudyPlanStep } from "@/lib/study-plan";
import { getWisdomGuideRecommendation, wisdomGuidePrompts, type WisdomGuideIntent } from "@/lib/wisdom-guide";

export type JourneyPace = "short" | "balanced" | "deep";
export type JourneyLevel = "beginner" | "curious" | "advanced";
export type JourneyMode = "study" | "ritual" | "visual" | "action";

export type JourneyBuilderInput = {
  intent: WisdomGuideIntent;
  pace: JourneyPace;
  level: JourneyLevel;
  mode: JourneyMode;
};

export type JourneyStep = StudyPlanStep & {
  task: string;
};

export type JourneyPlan = {
  title: string;
  subtitle: string;
  intent: WisdomGuideIntent;
  pace: JourneyPace;
  level: JourneyLevel;
  mode: JourneyMode;
  totalDuration: string;
  focusWords: string[];
  heroAction: {
    label: string;
    href: string;
  };
  ethicalMessage: string;
  steps: JourneyStep[];
  nextUnlocks: string[];
  sourceNote: string;
};

export const journeyPaceLabels: Record<JourneyPace, string> = {
  short: "سریع",
  balanced: "متعادل",
  deep: "عمیق",
};

export const journeyLevelLabels: Record<JourneyLevel, string> = {
  beginner: "شروع آرام",
  curious: "کاوشگر",
  advanced: "پژوهشی",
};

export const journeyModeLabels: Record<JourneyMode, string> = {
  study: "مطالعه",
  ritual: "نیایش و مکث",
  visual: "تصویر و رسانه",
  action: "کردار روزانه",
};

const durationByPace: Record<JourneyPace, string> = {
  short: "۸ دقیقه",
  balanced: "۱۵ دقیقه",
  deep: "۲۵ دقیقه",
};

const stepCountByPace: Record<JourneyPace, number> = {
  short: 4,
  balanced: 6,
  deep: 7,
};

const modeBoostSteps: Record<JourneyMode, StudyPlanStep> = {
  study: {
    id: "reading-room",
    day: "ویژه",
    title: "تالار مطالعه",
    description: "حالت خواندن، عمق توضیح و مسیر بعدی را برای یک تجربه جدی‌تر تنظیم کن.",
    href: "/reading-room",
    duration: "۱۲ دقیقه",
    theme: "مطالعه",
    accent: "#FFF8EA",
  },
  ritual: {
    id: "reflection",
    day: "ویژه",
    title: "دفتر پندار، گفتار، کردار",
    description: "پیام مسیر را به یک ثبت روزانه و یک کردار کوچک تبدیل کن.",
    href: "/reflection",
    duration: "۹ دقیقه",
    theme: "مکث",
    accent: "#F2D58A",
  },
  visual: {
    id: "ai-studio",
    day: "ویژه",
    title: "استودیوی تصویرسازی AI",
    description: "فضای تصویری مسیر را ببین و brief تولید تصویر اختصاصی را دنبال کن.",
    href: "/ai-studio",
    duration: "۱۰ دقیقه",
    theme: "رسانه",
    accent: "#7EA4C8",
  },
  action: {
    id: "quests",
    day: "ویژه",
    title: "مأموریت‌های خرد",
    description: "مطالعه را به XP، badge و یک عمل کوچک روزانه وصل کن.",
    href: "/quests",
    duration: "۱۱ دقیقه",
    theme: "کردار",
    accent: "#E68A3A",
  },
};

export function normalizeJourneyInput(input?: Partial<JourneyBuilderInput>): JourneyBuilderInput {
  return {
    intent: wisdomGuidePrompts.some((prompt) => prompt.id === input?.intent) ? input!.intent! : "study",
    pace: isJourneyPace(input?.pace) ? input!.pace! : "balanced",
    level: isJourneyLevel(input?.level) ? input!.level! : "beginner",
    mode: isJourneyMode(input?.mode) ? input!.mode! : "study",
  };
}

export function buildJourneyPlan(input?: Partial<JourneyBuilderInput>): JourneyPlan {
  const normalized = normalizeJourneyInput(input);
  const recommendation = getWisdomGuideRecommendation(normalized.intent);
  const primaryAction = recommendation.nextActions[0];
  const steps = buildStepList(normalized).map((step, index) => ({
    ...step,
    day: `قدم ${index + 1}`,
    duration: durationByPace[normalized.pace],
    task: buildTask(step, normalized),
  }));

  return {
    title: buildTitle(normalized),
    subtitle: recommendation.summary,
    intent: normalized.intent,
    pace: normalized.pace,
    level: normalized.level,
    mode: normalized.mode,
    totalDuration: `${steps.length} قدم / ${durationByPace[normalized.pace]} در روز`,
    focusWords: recommendation.terms.map((term) => term.title),
    heroAction: primaryAction ? { label: primaryAction.title, href: primaryAction.href } : { label: "ورود به اوستا", href: "/avesta" },
    ethicalMessage: recommendation.ethicalMessage,
    steps,
    nextUnlocks: buildUnlocks(normalized),
    sourceNote:
      "Journey Builder فعلاً از محتوای نمونه، مسیر مطالعه، واژه‌نامه و راهنمای خرد استفاده می‌کند و برای اتصال آینده به پروفایل، RAG و analytics آماده است.",
  };
}

export function getJourneyBuilderStats() {
  return [
    { label: "نیت‌های مسیر", value: String(wisdomGuidePrompts.length) },
    { label: "حالت تجربه", value: String(Object.keys(journeyModeLabels).length) },
    { label: "خروجی", value: "شخصی" },
  ];
}

function buildStepList(input: JourneyBuilderInput) {
  const recommended = getWisdomGuideRecommendation(input.intent);
  const actionSteps: StudyPlanStep[] = recommended.nextActions.map((action, index) => ({
    id: `action-${input.intent}-${index}`,
    day: "پیشنهاد",
    title: action.title,
    description: action.description,
    href: action.href,
    duration: durationByPace[input.pace],
    theme: journeyModeLabels[input.mode],
    accent: wisdomGuidePrompts.find((prompt) => prompt.id === input.intent)?.accent ?? "#D6A84F",
  }));
  const levelSteps = input.level === "advanced" ? [...studyPlanSteps].reverse() : studyPlanSteps;
  const unique = new Map([modeBoostSteps[input.mode], ...actionSteps, ...levelSteps].map((step) => [step.href, step]));

  return Array.from(unique.values()).slice(0, stepCountByPace[input.pace]);
}

function buildTitle(input: JourneyBuilderInput) {
  const intentLabel = wisdomGuidePrompts.find((prompt) => prompt.id === input.intent)?.label ?? "مسیر اوستا";
  return `${intentLabel}؛ ${journeyLevelLabels[input.level]} با ریتم ${journeyPaceLabels[input.pace]}`;
}

function buildTask(step: StudyPlanStep, input: JourneyBuilderInput) {
  if (input.mode === "ritual") return `بعد از خواندن ${step.title}، یک جمله آرام برای امروز یادداشت کن.`;
  if (input.mode === "visual") return `فضای بصری ${step.title} را تصور کن و یک ایده تصویر AI برای آن بنویس.`;
  if (input.mode === "action") return `از ${step.title} یک کردار کوچک برای امروز انتخاب کن.`;
  return `سه نکته از ${step.title} بردار و یکی را برای ادامه مطالعه ذخیره کن.`;
}

function buildUnlocks(input: JourneyBuilderInput) {
  return [
    "ذخیره مسیر در پروفایل و ادامه مطالعه بین دستگاه‌ها",
    "پیشنهاد هوشمند بر اساس history مطالعه و bookmarkها",
    input.mode === "visual" ? "تولید خودکار brief تصویر برای هر قدم مسیر" : "اتصال هر قدم به یادداشت، صوت و citation",
  ];
}

function isJourneyPace(value?: string): value is JourneyPace {
  return value === "short" || value === "balanced" || value === "deep";
}

function isJourneyLevel(value?: string): value is JourneyLevel {
  return value === "beginner" || value === "curious" || value === "advanced";
}

function isJourneyMode(value?: string): value is JourneyMode {
  return value === "study" || value === "ritual" || value === "visual" || value === "action";
}
