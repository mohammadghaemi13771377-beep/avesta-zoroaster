import type { Metadata } from "next";
import { BookOpen, Compass, Eye, Sparkles } from "lucide-react";

import { CinematicHub, FeatureLinkGrid } from "@/components/cinematic-hub";

export const metadata: Metadata = {
  title: "درباره ما | AVESTA-ZOROASTER",
  description: "ماموریت AVESTA-ZOROASTER و چشم‌انداز جهان دیجیتال اوستا و زرتشت.",
};

const missionCards = [
  {
    title: "موزه دیجیتال",
    description: "هدف فقط انتشار متن نیست؛ کاربر باید وارد فضای ایران باستان، اوستا و خرد زرتشتی شود.",
    href: "/avesta",
    icon: Eye,
    scene: "scene-cosmic",
    imageSrc: "/images/ai/avesta-portal.jpg",
  },
  {
    title: "دانشنامه زنده",
    description: "هر متن، واژه، مقاله، تصویر و فایل صوتی به شبکه‌ای قابل جستجو و قابل توسعه وصل می‌شود.",
    href: "/search",
    icon: BookOpen,
    scene: "scene-tablets",
    imageSrc: "/images/ai/dictionary-hero.jpg",
  },
  {
    title: "روایت سینمایی",
    description: "تصاویر AI، تایم‌لاین، کارت‌های طلایی و تالارهای مطالعه سایت را از وبلاگ جدا می‌کنند.",
    href: "/media",
    icon: Sparkles,
    scene: "scene-mountain",
    imageSrc: "/images/ai/media-hero.jpg",
  },
  {
    title: "مسیر محصول",
    description: "پروفایل، ادامه مطالعه، بوکمارک، حالت خواندن و پنل ادمین برای رشد واقعی پروژه آماده شده‌اند.",
    href: "/profile",
    icon: Compass,
    scene: "scene-fire",
    imageSrc: "/images/ai/home-hero-desktop.jpg",
  },
];

export default function AboutPage() {
  return (
    <CinematicHub
      eyebrow="Mission"
      title="درباره AVESTA-ZOROASTER"
      lead="این پروژه برای تبدیل اوستا، گات‌ها و خرد ایران باستان به یک تجربه دیجیتال سینمایی، معتبر، مدرن و قابل توسعه ساخته می‌شود."
      scene="scene-prophet"
      roman="AV"
      actions={[
        { label: "ورود به اوستا", href: "/avesta" },
        { label: "دیدن نقشه محتوا", href: "/timeline", variant: "secondary" },
      ]}
      stats={[
        { value: "Museum", label: "تجربه تصویری و موزه‌ای" },
        { value: "CMS", label: "آماده مدیریت محتوای گسترده" },
        { value: "SEO", label: "ساختار مناسب رشد بلندمدت" },
      ]}
    >
      <FeatureLinkGrid items={missionCards} />
    </CinematicHub>
  );
}
