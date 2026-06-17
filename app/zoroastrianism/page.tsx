import type { Metadata } from "next";
import { BookOpen, Flame, Landmark, Scale, Sparkles } from "lucide-react";

import { CinematicHub, FeatureLinkGrid } from "@/components/cinematic-hub";
import { monotheismPillars } from "@/lib/sample-content";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "دین زرتشتی",
  description: "آموزه‌ها، مفاهیم کلیدی، اهورامزدا، اشا، وهومن و جهان‌بینی زرتشتی.",
};

const paths = [
  {
    title: "یکتاپرستی",
    description: "اهورامزدا، خرد، روشنایی و ساختار اخلاقی یکتاپرستی در جهان زرتشتی.",
    href: "/monotheism",
    icon: Flame,
    scene: "scene-fire",
  },
  {
    title: "گات‌ها",
    description: "سروده‌های بنیادین زرتشت و نزدیک‌ترین مسیر به پیام اخلاقی او.",
    href: "/gathas",
    icon: BookOpen,
    scene: "scene-sunrise",
  },
  {
    title: "واژه‌نامه",
    description: "اشا، وهومن، فروهر، اهورامزدا و دیگر مفاهیم کلیدی با ریشه و کاربرد.",
    href: "/dictionary",
    icon: Sparkles,
    scene: "scene-cosmic",
  },
  {
    title: "تایم‌لاین",
    description: "از زرتشت و گات‌ها تا حفظ اوستا و زرتشتیان امروز.",
    href: "/timeline",
    icon: Landmark,
    scene: "scene-stone",
  },
];

export default function ZoroastrianismPage() {
  return (
    <CinematicHub
      eyebrow="Zoroastrian Wisdom"
      title="دین زرتشتی؛ راه خرد، راستی و انتخاب"
      lead="این صفحه نقشه شناخت آموزه‌های زرتشتی است: یکتاپرستی، اهورامزدا، اشا، وهومن، اخلاق، نمادها و پیوند آن‌ها با فرهنگ ایران باستان."
      scene="scene-fire"
      heroImage={routeHeroByPath["/zoroastrianism"]}
      roman="D"
      actions={[
        { label: "ورود به هاب یکتاپرستی", href: "/monotheism" },
        { label: "مطالعه اشا", href: "/articles/asha-truth-order", variant: "secondary" },
      ]}
      stats={[
        { value: "اشا", label: "راستی و نظم کیهانی" },
        { value: "وهومن", label: "اندیشه نیک و خرد روشن" },
        { value: "اخلاق", label: "انتخاب آگاهانه در زندگی" },
      ]}
    >
      <FeatureLinkGrid items={paths} />

      <section className="mt-8 lux-frame p-6 sm:p-8">
        <div className="flex items-center gap-2 text-gold-light">
          <Scale size={20} />
          <p className="text-sm font-bold">مفاهیم بنیادین</p>
        </div>
        <h2 className="mt-3 text-4xl font-black text-warm">ستون‌هایی که کل سایت روی آن‌ها می‌ایستد</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {monotheismPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-[18px] border border-gold/12 bg-night/60 p-6">
              <h3 className="text-2xl font-black text-warm">{pillar.title}</h3>
              <p className="mt-3 text-sm font-bold text-gold-light">{pillar.subtitle}</p>
              <p className="mt-4 leading-8 text-muted">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>
    </CinematicHub>
  );
}
