import { getPromptTemplate } from "@/lib/ai-prompts";

export type ContentSlot = {
  id: string;
  title: string;
  kind: "image" | "audio" | "text" | "pdf" | "video";
  target: string;
  suggestedPath: string;
  status: "empty" | "placeholder" | "ready";
  prompt?: string;
  note: string;
};

export const contentSlots: ContentSlot[] = [
  {
    id: "home-hero-sunrise",
    title: "تصویر Hero صفحه خانه",
    kind: "image",
    target: "/",
    suggestedPath: "/images/ai/home-hero-sunrise.jpg",
    status: "empty",
    prompt: getPromptTemplate("home-hero-sunrise")?.prompt,
    note: "تصویر اصلی ورود به جهان دیجیتال اوستا؛ باید سینمایی، عمیق و غیرشلوغ باشد."
  },
  {
    id: "yasna-portal-cover",
    title: "کاور یسنا",
    kind: "image",
    target: "/avesta/yasna",
    suggestedPath: "/images/ai/yasna-cover.jpg",
    status: "placeholder",
    prompt: getPromptTemplate("yasna-sacred-fire")?.prompt,
    note: "برای کارت یسنا و هدر صفحه یسنا استفاده می‌شود."
  },
  {
    id: "gathas-portal-cover",
    title: "کاور گات‌ها",
    kind: "image",
    target: "/avesta/gathas",
    suggestedPath: "/images/ai/gathas-cover.jpg",
    status: "placeholder",
    prompt: getPromptTemplate("gathas-luminous-wisdom")?.prompt,
    note: "فضا باید روشن، معنوی و آرام باشد."
  },
  {
    id: "vendidad-portal-cover",
    title: "کاور وندیداد",
    kind: "image",
    target: "/avesta/vendidad",
    suggestedPath: "/images/ai/vendidad-cover.jpg",
    status: "empty",
    prompt: getPromptTemplate("vendidad-mystery-law")?.prompt,
    note: "فضا رازآلود، تیره و آیینی باشد."
  },
  {
    id: "yasna-verse-1-audio",
    title: "صوت بند نمونه یسنا",
    kind: "audio",
    target: "/avesta/yasna/ha-1/verse-1",
    suggestedPath: "/audio/yasna-verse-1.mp3",
    status: "empty",
    note: "برای پخش صوتی در صفحه بند استفاده می‌شود."
  },
  {
    id: "avesta-reading-guide",
    title: "PDF راهنمای مطالعه اوستا",
    kind: "pdf",
    target: "/library",
    suggestedPath: "/library/avesta-reading-guide.pdf",
    status: "empty",
    note: "در کتابخانه دیجیتال نمایش داده می‌شود."
  }
];
