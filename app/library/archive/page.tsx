import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowLeft, Archive, BookOpen, Database, ScrollText } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";

export const metadata: Metadata = {
  title: "آرشیو نسخه‌ها",
  description: "جایگاه نسخه‌های قدیمی، منابع اسکن‌شده، کتاب‌های مرجع و فایل‌های پژوهشی AVESTA-ZOROASTER.",
};

const archiveLanes: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "نسخه‌های اسکن‌شده",
    description: "برای فایل‌های تصویری، PDFهای قدیمی، نسخه‌های کتابخانه‌ای و منابع کمیاب.",
    icon: ScrollText,
  },
  {
    title: "منابع کتابشناسی",
    description: "برای ثبت نویسنده، مترجم، سال انتشار، ناشر، زبان، شماره نسخه و لینک ارجاع.",
    icon: BookOpen,
  },
  {
    title: "دیتابیس پژوهشی",
    description: "برای اتصال آینده به PostgreSQL، جستجوی Meilisearch و پنل ورود دسته‌ای.",
    icon: Database,
  },
];

export default function LibraryArchivePage() {
  return (
    <CinematicHub
      eyebrow="Archive"
      title="آرشیو نسخه‌های اوستا و منابع پژوهشی"
      lead="این صفحه جایگاه آینده نسخه‌های قدیمی، اسکن‌ها، منابع کتابخانه‌ای و پرونده‌های پژوهشی است؛ بخشی که کتابخانه دیجیتال را به یک آرشیو جدی تبدیل می‌کند."
      scene="scene-tablets"
      roman="A"
      actions={[
        { label: "بازگشت به کتابخانه", href: "/library" },
        { label: "ورود دسته‌ای منابع", href: "/admin/import", variant: "secondary" },
      ]}
      stats={[
        { value: "Archive", label: "جایگاه منابع قدیمی" },
        { value: "Metadata", label: "آماده ثبت اطلاعات کتابشناسی" },
        { value: "Search", label: "آماده اتصال به جستجو" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {archiveLanes.map(({ title, description, icon: Icon }) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-light" size={30} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 leading-8 text-muted">{description}</p>
          </article>
        ))}
      </div>

      <section className="lux-frame mt-6 p-7">
        <div className="flex items-center gap-3 text-gold-light">
          <Archive size={24} />
          <h2 className="text-2xl font-black">فیلدهای پیشنهادی آرشیو</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["عنوان نسخه", "زبان", "سال/دوره", "منبع", "نوع فایل", "وضعیت حق نشر", "لینک فایل", "توضیح پژوهشی"].map(
            (field) => (
              <div key={field} className="rounded-2xl border border-gold/10 bg-night/55 px-4 py-3 text-sm font-bold text-warm">
                {field}
              </div>
            )
          )}
        </div>
        <Link
          href="/admin/library"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light"
        >
          مدیریت منابع
          <ArrowLeft size={18} />
        </Link>
      </section>
    </CinematicHub>
  );
}
