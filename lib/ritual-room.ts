import { getDailyAvesta } from "@/lib/daily-avesta";
import { getDailyReflectionSeed } from "@/lib/daily-reflection";

export type RitualRoomMode = "flame" | "breath" | "reading" | "gratitude";
export type RitualRoomDuration = "three" | "seven" | "twelve";

export type RitualRoomSession = {
  id: string;
  mode: RitualRoomMode;
  title: string;
  subtitle: string;
  durationMinutes: number;
  scene: string;
  accent: string;
  intention: string;
  quote: string;
  ethicalMessage: string;
  steps: string[];
  nextActions: Array<{ title: string; href: string }>;
};

export const ritualRoomModeLabels: Record<RitualRoomMode, string> = {
  flame: "آتش آرام",
  breath: "نفس و سکوت",
  reading: "مطالعه آیینی",
  gratitude: "سپاسگزاری",
};

export const ritualRoomDurationLabels: Record<RitualRoomDuration, string> = {
  three: "۳ دقیقه",
  seven: "۷ دقیقه",
  twelve: "۱۲ دقیقه",
};

const durationToMinutes: Record<RitualRoomDuration, number> = {
  three: 3,
  seven: 7,
  twelve: 12,
};

export function normalizeRitualRoomInput(mode?: string | null, duration?: string | null) {
  return {
    mode: isRitualMode(mode) ? mode : "flame",
    duration: isRitualDuration(duration) ? duration : "seven",
  };
}

export function buildRitualRoomSession(modeValue?: string | null, durationValue?: string | null): RitualRoomSession {
  const { mode, duration } = normalizeRitualRoomInput(modeValue, durationValue);
  const daily = getDailyAvesta();
  const reflection = getDailyReflectionSeed();

  const blueprint = getModeBlueprint(mode);

  return {
    id: `ritual-${mode}-${duration}`,
    mode,
    title: blueprint.title,
    subtitle: blueprint.subtitle,
    durationMinutes: durationToMinutes[duration],
    scene: blueprint.scene,
    accent: blueprint.accent,
    intention: blueprint.intention,
    quote: daily.quote,
    ethicalMessage: daily.ethicalMessage,
    steps: buildSteps(mode, reflection.prompts[0]?.question ?? daily.reflectionPrompt),
    nextActions: [
      { title: "ثبت در دفتر روزانه", href: "/reflection" },
      { title: "مطالعه بند امروز", href: daily.href },
      { title: "ساخت کارت طلایی", href: "/share-studio" },
    ],
  };
}

export function getRitualRoomStats() {
  return [
    { label: "حالت آیینی", value: String(Object.keys(ritualRoomModeLabels).length) },
    { label: "مدت جلسه", value: String(Object.keys(ritualRoomDurationLabels).length) },
    { label: "اتصال", value: "Reflection" },
  ];
}

function getModeBlueprint(mode: RitualRoomMode) {
  if (mode === "breath") {
    return {
      title: "تالار نفس و سکوت",
      subtitle: "چند دقیقه مکث برای آرام کردن ذهن، پیش از مطالعه یا تصمیم.",
      scene: "scene-cosmic",
      accent: "#FFF8EA",
      intention: "امروز با آرامش و توجه بیشتر انتخاب می‌کنم.",
    };
  }

  if (mode === "reading") {
    return {
      title: "تالار مطالعه آیینی",
      subtitle: "یک جلسه کوتاه برای خواندن آهسته، فهمیدن و نگه داشتن یک پیام.",
      scene: "scene-scroll",
      accent: "#D6A84F",
      intention: "امروز یک جمله را دقیق می‌خوانم و به زندگی وصل می‌کنم.",
    };
  }

  if (mode === "gratitude") {
    return {
      title: "تالار سپاسگزاری",
      subtitle: "مکثی برای دیدن روشنایی‌های کوچک و تبدیل آن‌ها به گفتار نیک.",
      scene: "scene-sunrise",
      accent: "#F2D58A",
      intention: "امروز سپاس را به گفتار آرام و کردار کوچک تبدیل می‌کنم.",
    };
  }

  return {
    title: "تالار آتش آرام",
    subtitle: "یک تجربه کوتاه برای تمرکز، نیت روشن و بازگشت به پیام پندار نیک.",
    scene: "scene-fire",
    accent: "#D6A84F",
    intention: "امروز روشنایی را در پندار، گفتار و کردار نگه می‌دارم.",
  };
}

function buildSteps(mode: RitualRoomMode, prompt: string) {
  const shared = [
    "چشم‌ها را برای چند نفس آرام کن و شانه‌ها را رها کن.",
    "نقل‌قول امروز را آهسته بخوان و فقط یک واژه را نگه دار.",
  ];

  if (mode === "breath") {
    return [...shared, "چهار نفس آرام بکش و با هر بازدم یک تنش را رها کن.", prompt];
  }

  if (mode === "reading") {
    return [...shared, "یک جمله از متن را به زبان خودت بازنویسی کن.", "بعد از جلسه، همان جمله را در مسیر مطالعه ادامه بده."];
  }

  if (mode === "gratitude") {
    return [...shared, "سه چیز کوچک برای سپاسگزاری نام ببر.", "یکی از آن‌ها را امروز با یک گفتار نیک پاسخ بده."];
  }

  return [...shared, "نیت امروز را در یک جمله کوتاه بگو.", prompt];
}

function isRitualMode(value?: string | null): value is RitualRoomMode {
  return value === "flame" || value === "breath" || value === "reading" || value === "gratitude";
}

function isRitualDuration(value?: string | null): value is RitualRoomDuration {
  return value === "three" || value === "seven" || value === "twelve";
}
