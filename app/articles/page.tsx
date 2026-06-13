import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { BookOpen, FileText, Search, Tags } from "lucide-react";

import { ArticlesExplorer } from "@/components/articles-explorer";
import { CinematicHub } from "@/components/cinematic-hub";
import { articleItems } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "مقالات",
  description: "مقاله‌های پژوهشی، آموزشی و روایی درباره اوستا، زرتشت و ایران باستان.",
};

export default function ArticlesPage() {
  const stats: Array<[string, string, LucideIcon]> = [
    ["مفاهیم", "اشا، وهومن، اهورامزدا", Tags],
    ["اوستا", "گات‌ها، یسنا، یشت‌ها", BookOpen],
    ["پژوهش", "منابع، تحلیل، کتابخانه", FileText],
    ["سئو", "ساختار آماده برای رشد گوگل", Search],
  ];

  return (
    <CinematicHub
      eyebrow="Knowledge Journal"
      title="مقالات اوستا، زرتشت و خرد ایران باستان"
      lead="مجله دانشی سایت برای سئو، روایت، تحلیل مفاهیم، تاریخ، نمادها و اتصال کاربر به واژه‌نامه، کتابخانه و متن اوستا طراحی شده است."
      scene="scene-tablets"
      roman="A"
      actions={[
        { label: "مطالعه مقالات", href: "#articles-explorer" },
        { label: "پنل مقالات", href: "/admin/articles", variant: "secondary" },
      ]}
      stats={[
        { value: "SEO", label: "متادیتا و URL تمیز" },
        { value: "Tags", label: "دسته‌بندی و برچسب" },
        { value: "Links", label: "اتصال به واژه‌نامه و اوستا" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, description, Icon]) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-200" size={30} />
            <h2 className="mt-5 text-2xl font-black text-warm-50">{title}</h2>
            <p className="mt-3 leading-8 text-warm-100/68">{description}</p>
          </article>
        ))}
      </div>
      <div id="articles-explorer">
        <ArticlesExplorer articles={articleItems} />
      </div>
    </CinematicHub>
  );
}
