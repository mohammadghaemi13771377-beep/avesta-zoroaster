import type { Metadata } from "next";
import { Crown, Landmark, Library, ScrollText } from "lucide-react";

import { CinematicHub, FeatureLinkGrid } from "@/components/cinematic-hub";

export const metadata: Metadata = {
  title: "کوروش و ایران باستان | AVESTA-ZOROASTER",
  description: "جایگاه کوروش، فرهنگ ایران باستان و پیوندهای تاریخی در جهان AVESTA-ZOROASTER.",
};

const cyrusCards = [
  {
    title: "ایران باستان",
    description: "روایت کوروش در کنار هنر، معماری، کتیبه‌ها و حافظه فرهنگی ایران باستان قرار می‌گیرد.",
    href: "/timeline",
    icon: Landmark,
    scene: "scene-stone",
    imageSrc: "/images/ai/exhibitions-hero.jpg",
  },
  {
    title: "منابع پژوهشی",
    description: "کتابخانه دیجیتال محل اتصال مقاله‌ها، کتاب‌ها و نسخه‌های مرجع درباره تاریخ ایران است.",
    href: "/library",
    icon: Library,
    scene: "scene-scroll",
    imageSrc: "/images/ai/library-hero.jpg",
  },
  {
    title: "مقاله‌های تاریخی",
    description: "مقاله‌های تحلیلی و منابع منتخب، روایت تاریخی را به مسیر مطالعه‌ای قابل فهم و پیوسته تبدیل می‌کنند.",
    href: "/articles",
    icon: ScrollText,
    scene: "scene-tablets",
    imageSrc: "/images/ai/articles-hero.jpg",
  },
  {
    title: "هویت شاهانه",
    description: "زبان بصری صفحه بر شکوه، نور طلایی، سنگ‌نگاره و فضای باستانی استوار است.",
    href: "/media",
    icon: Crown,
    scene: "scene-sunrise",
    imageSrc: "/images/ai/zoroastrianism-hero.jpg",
  },
];

export default function CyrusPage() {
  return (
    <CinematicHub
      eyebrow="Ancient Iran"
      title="کوروش و روایت تاریخی ایران باستان"
      lead="این مسیر برای روایت تاریخی، فرهنگی و تصویری ایران باستان در کنار جهان اوستا آماده شده است؛ نه به عنوان صفحه خشک تاریخی، بلکه به عنوان تالاری از حافظه، شکوه و منابع."
      scene="scene-stone"
      roman="C"
      actions={[
        { label: "مشاهده تایم‌لاین", href: "/timeline" },
        { label: "منابع تاریخی", href: "/library", variant: "secondary" },
      ]}
      stats={[
        { value: "History", label: "روایت تاریخی و فرهنگی" },
        { value: "Sources", label: "قابل اتصال به کتابخانه" },
        { value: "تصویر", label: "روایت بصری و موزه‌ای" },
      ]}
    >
      <FeatureLinkGrid items={cyrusCards} />
    </CinematicHub>
  );
}
