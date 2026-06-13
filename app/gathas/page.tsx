import type { Metadata } from "next";
import { BookOpen, Headphones, Quote, Sparkles } from "lucide-react";

import { CinematicHub, FeatureLinkGrid } from "@/components/cinematic-hub";

export const metadata: Metadata = {
  title: "گات‌ها",
  description: "صفحه مرکزی گات‌ها، سروده‌های منسوب به زرتشت و خوانش امروزی آن‌ها.",
};

const gathaPaths = [
  {
    title: "متن و ترجمه",
    description: "هر سرود با متن اصلی، ترجمه کلاسیک، بازنویسی ساده و تحلیل مفهومی ارائه می‌شود.",
    href: "/avesta/gathas",
    icon: BookOpen,
    scene: "scene-scroll",
  },
  {
    title: "خوانش صوتی",
    description: "زیرساخت صفحه برای اتصال فایل‌های صوتی، روایت آموزشی و پادکست‌های کوتاه آماده است.",
    href: "/media",
    icon: Headphones,
    scene: "scene-mountain",
  },
  {
    title: "نقل‌قول‌های طلایی",
    description: "بندهای مهم گات‌ها به شکل کارت‌های قابل اشتراک و مناسب شبکه‌های اجتماعی آماده می‌شوند.",
    href: "/articles",
    icon: Quote,
    scene: "scene-sunrise",
  },
  {
    title: "پیام امروزی",
    description: "هر بند از گات‌ها به زبان امروز معنا می‌شود تا کاربر فقط نخواند، بلکه با آن زندگی کند.",
    href: "/dictionary",
    icon: Sparkles,
    scene: "scene-cosmic",
  },
];

export default function GathasPage() {
  return (
    <CinematicHub
      eyebrow="Gathas"
      title="گات‌ها، روشن‌ترین تالار خرد اوستا"
      lead="گات‌ها هسته تجربه مطالعاتی سایت هستند؛ بخشی آرام، نورانی و عمیق برای خواندن، شنیدن، فهمیدن و تبدیل پیام زرتشت به زبان امروز."
      scene="scene-sunrise"
      roman="G"
      actions={[
        { label: "ورود به گات‌ها", href: "/avesta/gathas" },
        { label: "واژه‌نامه مفاهیم", href: "/dictionary", variant: "secondary" },
      ]}
      stats={[
        { value: "متن", label: "اصل، ترجمه، بازنویسی و تحلیل" },
        { value: "صوت", label: "آماده اتصال به روایت شنیداری" },
        { value: "SEO", label: "ساختار مناسب برای هزاران بند" },
      ]}
    >
      <FeatureLinkGrid items={gathaPaths} />
    </CinematicHub>
  );
}
