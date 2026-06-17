export type AiPromptTemplate = {
  id: string;
  title: string;
  sectionSlug: string;
  category: string;
  mood: string;
  accent: string;
  recommendedPath: string;
  prompt: string;
  negativePrompt: string;
  usage: string;
};

const sharedNegativePrompt =
  "modern clothing, modern buildings, cars, neon signs, sci-fi armor, fantasy monsters, low quality, blurry, random text, watermark, logo, distorted faces";

export const aiPromptTemplates: AiPromptTemplate[] = [
  {
    id: "home-hero-sunrise",
    title: "طلوع جهان اوستا",
    sectionSlug: "home",
    category: "Hero",
    mood: "باشکوه، آرام، رازآلود",
    accent: "#D6A84F",
    recommendedPath: "/images/ai/home-hero.png",
    prompt:
      "Cinematic sunrise over ancient Persian mountains, soft sacred fire in foreground, Avestan script dissolving into mist, distant Achaemenid-inspired architecture, deep black and royal navy atmosphere, warm gold light, museum-quality digital matte painting, elegant, spiritual, not crowded",
    negativePrompt: sharedNegativePrompt,
    usage: "هیروی اصلی صفحه خانه",
  },
  {
    id: "yasna-sacred-fire",
    title: "آتش مقدس یسنا",
    sectionSlug: "yasna",
    category: "Avesta Section",
    mood: "طلایی، آیینی، نور مقدس",
    accent: "#D6A84F",
    recommendedPath: "/images/ai/yasna-cover.png",
    prompt:
      "Ancient Persian fire temple at sunrise, sacred flame altar, stone columns inspired by Persepolis, soft Avestan script mist, golden ritual light, deep navy shadows, cinematic museum composition, reverent and peaceful",
    negativePrompt: sharedNegativePrompt,
    usage: "کاور یسنا و بندهای آیینی",
  },
  {
    id: "gathas-luminous-wisdom",
    title: "سپیدی خرد گات‌ها",
    sectionSlug: "gathas",
    category: "Avesta Section",
    mood: "روشن، الهی، مینیمال",
    accent: "#F2D58A",
    recommendedPath: "/images/ai/gathas-cover.png",
    prompt:
      "Luminous ancient Iranian wisdom scene, peaceful mountain horizon, white and soft gold light, subtle sacred fire glow, minimal spiritual atmosphere, Avestan poetry as faint mist, cinematic digital museum artwork, calm and elevated",
    negativePrompt: sharedNegativePrompt,
    usage: "کاور گات‌ها و صفحات تفسیری",
  },
  {
    id: "vendidad-mystery-law",
    title: "وندیداد رازآلود",
    sectionSlug: "vendidad",
    category: "Avesta Section",
    mood: "تیره، قانون، پاکی، رمزآلود",
    accent: "#7EA4C8",
    recommendedPath: "/images/ai/vendidad-cover.png",
    prompt:
      "Dark blue ancient Persian ritual chamber, orange sacred flame, carved stone walls, atmosphere of purity law and mystery, dramatic shadows, subtle dust and mist, cinematic but respectful, deep navy and amber palette",
    negativePrompt: sharedNegativePrompt,
    usage: "کاور وندیداد و بندهای مربوط به پاکی و قانون",
  },
  {
    id: "yashts-heroic-sky",
    title: "یشت‌های حماسی",
    sectionSlug: "yashts",
    category: "Avesta Section",
    mood: "اسطوره‌ای، آسمانی، حماسی",
    accent: "#8CB7DE",
    recommendedPath: "/images/ai/yashts-cover.png",
    prompt:
      "Epic ancient Iranian landscape under a vast luminous sky, heroic mythic atmosphere without monsters, sacred river and mountains, gold sunlight, wind moving through carved stone reliefs, cinematic museum artwork, majestic and poetic",
    negativePrompt: sharedNegativePrompt,
    usage: "کاور یشت‌ها و روایت‌های حماسی",
  },
  {
    id: "khordeh-avesta-daily-prayer",
    title: "نیایش روزانه خرده اوستا",
    sectionSlug: "khordeh-avesta",
    category: "Avesta Section",
    mood: "آرام، شخصی، نیایش روزانه",
    accent: "#FFF8EA",
    recommendedPath: "/images/ai/khordeh-avesta-cover.png",
    prompt:
      "Quiet ancient Persian prayer space at dawn, small sacred flame, warm cream and gold light, simple stone textures, intimate spiritual atmosphere, soft shadows, cinematic but gentle, no crowd",
    negativePrompt: sharedNegativePrompt,
    usage: "خرده اوستا و نیایش‌های روزانه",
  },
  {
    id: "hats-sacred-scroll",
    title: "طومار هات‌ها",
    sectionSlug: "hats",
    category: "Study Path",
    mood: "مطالعه، طومار، متن مقدس",
    accent: "#C9B27A",
    recommendedPath: "/images/ai/hats-cover.png",
    prompt:
      "Ancient sacred scroll on dark stone desk, faint Avestan script, warm gold candlelight, Persian geometric border details, deep black and navy background, scholarly cinematic museum still life",
    negativePrompt: sharedNegativePrompt,
    usage: "صفحه هات‌ها و مسیر مطالعه",
  },
];

export function getPromptTemplate(id: string) {
  return aiPromptTemplates.find((template) => template.id === id);
}
