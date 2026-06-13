import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Archive, BookOpen, FileText, Languages } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { ResourceExplorer } from "@/components/resource-explorer";
import { libraryItems } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "کتابخانه دیجیتال",
  description: "کتاب‌ها، PDFها، منابع فارسی و انگلیسی و نسخه‌های پژوهشی مرتبط با اوستا و زرتشت.",
};

export default function LibraryPage() {
  const stats: Array<[string, string, LucideIcon]> = [
    ["نسخه‌ها", "PDF، مقاله و کتاب", FileText],
    ["پژوهش", "منابع فارسی و انگلیسی", BookOpen],
    ["آرشیو", "آماده برای نسخه‌های قدیمی", Archive],
    ["چندزبانه", "زیرساخت فارسی و انگلیسی", Languages],
  ];

  return (
    <CinematicHub
      eyebrow="Digital Library"
      title="کتابخانه دیجیتال اوستا و ایران باستان"
      lead="این بخش مخزن زنده کتاب‌ها، نسخه‌ها، PDFها، منابع پژوهشی، مقاله‌های مرجع و آرشیو چندزبانه پروژه است؛ جایی برای مطالعه عمیق‌تر بعد از ورود به جهان اوستا."
      scene="scene-scroll"
      roman="L"
      actions={[
        { label: "جستجو در منابع", href: "#library-explorer" },
        { label: "مرکز ارجاع", href: "/citations", variant: "secondary" },
      ]}
      stats={[
        { value: "PDF", label: "فایل‌های قابل دانلود و مطالعه" },
        { value: "FA/EN", label: "منابع فارسی و انگلیسی" },
        { value: "CMS", label: "قابل مدیریت از پنل ادمین" },
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
      <div id="library-explorer">
        <ResourceExplorer items={libraryItems} mode="library" />
      </div>
    </CinematicHub>
  );
}
