import { buildJourneyPlan, normalizeJourneyInput, type JourneyBuilderInput } from "@/lib/journey-builder";

export type OnboardingGoal = "avesta" | "gathas" | "ritual" | "history" | "monotheism";
export type OnboardingTime = "daily-5" | "daily-15" | "deep-weekend";
export type OnboardingTone = "cinematic" | "scholarly" | "spiritual";

export type OnboardingInput = {
  goal: OnboardingGoal;
  time: OnboardingTime;
  tone: OnboardingTone;
};

export type OnboardingRecommendation = {
  title: string;
  subtitle: string;
  startHref: string;
  startLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  journeyInput: JourneyBuilderInput;
  pillars: Array<{
    title: string;
    text: string;
    href: string;
  }>;
  nextSevenDays: Array<{
    day: string;
    title: string;
    href: string;
    task: string;
  }>;
  savedProfile: {
    goal: OnboardingGoal;
    time: OnboardingTime;
    tone: OnboardingTone;
    createdAt: string;
    summary: string;
  };
};

export const onboardingGoalLabels: Record<OnboardingGoal, string> = {
  avesta: "شناخت اوستا",
  gathas: "شروع از گات‌ها",
  ritual: "نیایش و عادت روزانه",
  history: "ایران باستان و تاریخ",
  monotheism: "یکتاپرستی و معنا",
};

export const onboardingTimeLabels: Record<OnboardingTime, string> = {
  "daily-5": "روزانه ۵ دقیقه",
  "daily-15": "روزانه ۱۵ دقیقه",
  "deep-weekend": "آخر هفته عمیق",
};

export const onboardingToneLabels: Record<OnboardingTone, string> = {
  cinematic: "سینمایی و الهام‌بخش",
  scholarly: "پژوهشی و مستند",
  spiritual: "آرام و معنوی",
};

const journeyByGoal: Record<OnboardingGoal, Partial<JourneyBuilderInput>> = {
  avesta: { intent: "study", mode: "study" },
  gathas: { intent: "clarity", mode: "study" },
  ritual: { intent: "calm", mode: "ritual" },
  history: { intent: "courage", mode: "visual" },
  monotheism: { intent: "truth", mode: "action" },
};

const paceByTime: Record<OnboardingTime, JourneyBuilderInput["pace"]> = {
  "daily-5": "short",
  "daily-15": "balanced",
  "deep-weekend": "deep",
};

const levelByTone: Record<OnboardingTone, JourneyBuilderInput["level"]> = {
  cinematic: "beginner",
  scholarly: "advanced",
  spiritual: "curious",
};

export function normalizeOnboardingInput(input?: Partial<OnboardingInput>): OnboardingInput {
  return {
    goal: isGoal(input?.goal) ? input.goal : "avesta",
    time: isTime(input?.time) ? input.time : "daily-15",
    tone: isTone(input?.tone) ? input.tone : "cinematic",
  };
}

export function buildOnboardingRecommendation(input?: Partial<OnboardingInput>): OnboardingRecommendation {
  const normalized = normalizeOnboardingInput(input);
  const journeyInput = buildJourneyInputFromOnboarding(normalized);
  const journey = buildJourneyPlan(journeyInput);
  const goalLabel = onboardingGoalLabels[normalized.goal];
  const toneLabel = onboardingToneLabels[normalized.tone];
  const timeLabel = onboardingTimeLabels[normalized.time];

  return {
    title: `مسیر شروع تو: ${goalLabel}`,
    subtitle: `برای ${timeLabel} با حال‌وهوای ${toneLabel}. این مسیر کاربر را از سردرگمی دور می‌کند و مستقیم وارد جهان AVESTA-ZOROASTER می‌برد.`,
    startHref: journey.heroAction.href,
    startLabel: journey.heroAction.label,
    secondaryHref: `/journey-builder?intent=${journeyInput.intent}&pace=${journeyInput.pace}&level=${journeyInput.level}&mode=${journeyInput.mode}`,
    secondaryLabel: "تنظیم مسیر کامل",
    journeyInput,
    pillars: buildPillars(normalized),
    nextSevenDays: journey.steps.slice(0, 7).map((step, index) => ({
      day: `روز ${index + 1}`,
      title: step.title,
      href: step.href,
      task: step.task,
    })),
    savedProfile: {
      ...normalized,
      createdAt: new Date().toISOString(),
      summary: `${goalLabel} / ${timeLabel} / ${toneLabel}`,
    },
  };
}

export function buildJourneyInputFromOnboarding(input?: Partial<OnboardingInput>): JourneyBuilderInput {
  const normalized = normalizeOnboardingInput(input);
  return normalizeJourneyInput({
    ...journeyByGoal[normalized.goal],
    pace: paceByTime[normalized.time],
    level: levelByTone[normalized.tone],
  });
}

export function buildJourneyHrefFromOnboarding(input?: Partial<OnboardingInput>) {
  const journeyInput = buildJourneyInputFromOnboarding(input);
  return `/journey-builder?intent=${journeyInput.intent}&pace=${journeyInput.pace}&level=${journeyInput.level}&mode=${journeyInput.mode}`;
}

export function getOnboardingStats() {
  return [
    { label: "نیت شروع", value: String(Object.keys(onboardingGoalLabels).length) },
    { label: "ریتم مطالعه", value: String(Object.keys(onboardingTimeLabels).length) },
    { label: "خروجی", value: "مسیر شخصی" },
  ];
}

function buildPillars(input: OnboardingInput) {
  const base = [
    {
      title: "دروازه اوستا",
      text: "اول مسیر با یک بخش روشن و قابل فهم شروع می‌شود.",
      href: input.goal === "gathas" ? "/avesta/gathas" : "/avesta",
    },
    {
      title: "حافظه و ادامه",
      text: "کاربر بعد از اولین قدم به نورخانه و ادامه مطالعه وصل می‌شود.",
      href: "/dashboard",
    },
    {
      title: "ثبت اثر روزانه",
      text: "هر مطالعه باید به یک یادداشت، نشان یا کردار کوچک تبدیل شود.",
      href: input.goal === "ritual" ? "/ritual-room" : "/reflection",
    },
  ];

  if (input.goal === "history") {
    return [
      base[0],
      { title: "تایم‌لاین زنده", text: "ورود از تاریخ، رویدادها و ایران باستان.", href: "/timeline" },
      { title: "رسانه و تصویر", text: "تقویت حس موزه‌ای با تصویر و ویدیو.", href: "/media" },
    ];
  }

  if (input.goal === "monotheism") {
    return [
      { title: "جهان یکتاپرستی", text: "شروع از معنا، اخلاق و پیام امروزین.", href: "/monotheism" },
      base[1],
      { title: "راهنمای خرد", text: "پیوند آموزه به تصمیم روزانه.", href: "/wisdom-guide" },
    ];
  }

  return base;
}

function isGoal(value?: string): value is OnboardingGoal {
  return value === "avesta" || value === "gathas" || value === "ritual" || value === "history" || value === "monotheism";
}

function isTime(value?: string): value is OnboardingTime {
  return value === "daily-5" || value === "daily-15" || value === "deep-weekend";
}

function isTone(value?: string): value is OnboardingTone {
  return value === "cinematic" || value === "scholarly" || value === "spiritual";
}
