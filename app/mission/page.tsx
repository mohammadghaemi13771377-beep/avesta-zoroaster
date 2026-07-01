import type { Metadata } from "next";
import { BookOpen, GalleryVerticalEnd, ShieldCheck, Sparkles } from "lucide-react";

import { CinematicHub, FeatureLinkGrid } from "@/components/cinematic-hub";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ماموریت | AVESTA-ZOROASTER",
  description: "ماموریت AVESTA-ZOROASTER برای ساخت جهان دیجیتال اوستا، زرتشت، خرد، روشنایی و فرهنگ ایران باستان.",
  path: "/mission",
  image: "/images/ai/avesta-portal.jpg",
});

const missionItems = [
  {
    title: "دانش قابل فهم",
    description: "متن‌های سنگین اوستا با معرفی، زمینه، واژه‌نامه، تحلیل و مسیر مطالعه به زبان روشن ارائه می‌شوند.",
    href: "/avesta",
    icon: BookOpen,
    scene: "scene-tablets",
    imageSrc: "/images/ai/avesta-portal.jpg",
  },
  {
    title: "اعتماد پژوهشی",
    description: "منابع، روش پژوهش، یادداشت‌های احتیاطی و مسیر citation کمک می‌کنند محتوا مسئولانه رشد کند.",
    href: "/research-methodology",
    icon: ShieldCheck,
    scene: "scene-scroll",
    imageSrc: "/images/ai/dictionary-hero.jpg",
  },
  {
    title: "تجربه تصویری",
    description: "هر بخش با تصویر، نور، فضا و روایت خودش دیده می‌شود تا سایت شبیه یک موزه دیجیتال زنده باشد.",
    href: "/exhibitions",
    icon: GalleryVerticalEnd,
    scene: "scene-mountain",
    imageSrc: "/images/ai/exhibitions-hero.jpg",
  },
  {
    title: "رشد جهانی",
    description: "زیرساخت فارسی و انگلیسی، سئو، جستجو، ادمین و مدل محتوایی برای هزاران صفحه آماده شده است.",
    href: "/trust-center",
    icon: Sparkles,
    scene: "scene-cosmic",
    imageSrc: "/images/ai/monotheism-hero.jpg",
  },
];

export default function MissionPage() {
  return (
    <CinematicHub
      eyebrow="Mission"
      title="ماموریت AVESTA-ZOROASTER"
      lead="هدف ما ساخت یک وب‌سایت ساده نیست؛ می‌خواهیم جهان دیجیتال اوستا و زرتشت را بسازیم: جایی برای خواندن، دیدن، شنیدن، فهمیدن و ادامه دادن مسیر خرد."
      scene="scene-cosmic"
      heroImage="/images/ai/avesta-portal.jpg"
      actions={[
        { label: "ورود به اوستا", href: "/avesta" },
        { label: "روش پژوهش", href: "/research-methodology", variant: "secondary" },
      ]}
      stats={[
        { value: "Museum", label: "تجربه موزه‌ای" },
        { value: "Research", label: "خوانش منبع‌دار" },
        { value: "Global", label: "آماده رشد جهانی" },
      ]}
    >
      <FeatureLinkGrid items={missionItems} />
    </CinematicHub>
  );
}
