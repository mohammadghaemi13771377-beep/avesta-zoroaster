import type { Metadata } from "next";
import { BookOpen, Flame, Landmark, Sparkles } from "lucide-react";

import { CinematicHub, FeatureLinkGrid } from "@/components/cinematic-hub";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "زرتشت",
  description: "آغاز سفر با زرتشت؛ زندگی، پیام، گات‌ها و جایگاه او در خرد ایران باستان.",
};

const journeyCards = [
  {
    title: "پیام‌آور خرد",
    description: "زرتشت در این روایت نه فقط یک نام تاریخی، بلکه آغاز یک جهان اخلاقی و روشن است.",
    href: "/articles/zoroaster-life-message",
    icon: Sparkles,
    scene: "scene-prophet",
    imageSrc: "/images/ai/zoroaster-cover.png",
  },
  {
    title: "گات‌ها",
    description: "نزدیک‌ترین لایه متنی به پیام زرتشت؛ سرودهایی برای اندیشه، راستی و انتخاب آگاهانه.",
    href: "/gathas",
    icon: BookOpen,
    scene: "scene-sunrise",
    imageSrc: "/images/ai/gathas-cover.png",
  },
  {
    title: "آتش و راستی",
    description: "آتش در این تجربه نماد آگاهی، پاکی و حضور روشن حقیقت در زندگی روزانه است.",
    href: "/zoroastrianism",
    icon: Flame,
    scene: "scene-fire",
    imageSrc: "/images/ai/zoroastrianism-cover.png",
  },
  {
    title: "ایران باستان",
    description: "پیوند آموزه‌های زرتشت با حافظه تاریخی، هنر، کتیبه‌ها و جهان فرهنگی ایران.",
    href: "/timeline",
    icon: Landmark,
    scene: "scene-stone",
    imageSrc: "/images/ai/exhibitions-cover.png",
  },
];

export default function ZoroasterPage() {
  return (
    <CinematicHub
      eyebrow="Zoroaster"
      title="زرتشت، آغاز سفر خرد و روشنایی"
      lead="این صفحه دروازه آشنایی با زندگی، پیام و میراث زرتشت است؛ جایی میان تاریخ، اخلاق، گات‌ها و تجربه تصویری ایران باستان."
      scene="scene-prophet"
      heroImage={routeHeroByPath["/zoroaster"]}
      roman="Z"
      actions={[
        { label: "مطالعه گات‌ها", href: "/gathas" },
        { label: "دیدن تایم‌لاین", href: "/timeline", variant: "secondary" },
      ]}
      stats={[
        { value: "۳", label: "اصل اخلاقی: پندار، گفتار، کردار" },
        { value: "۵", label: "سرود اصلی گات‌ها" },
        { value: "∞", label: "مسیر مطالعه و تفسیر امروزی" },
      ]}
    >
      <FeatureLinkGrid items={journeyCards} />
    </CinematicHub>
  );
}
