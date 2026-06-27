import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, FileSearch, Landmark, ShieldCheck } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "روش پژوهش و سیاست منابع | AVESTA-ZOROASTER",
  description:
    "روش پژوهش، سیاست ارجاع، بازبینی محتوایی و disclaimer آموزشی AVESTA-ZOROASTER برای اوستا، زرتشت و ایران باستان.",
  path: "/research-methodology",
  image: "/images/ai/library-hero.jpg"
});

const principles = [
  {
    title: "متن و ترجمه جدا دیده می‌شوند",
    body: "در صفحات اوستا، متن اصلی، ترجمه کلاسیک، بازنویسی ساده، تحلیل مفهومی و پیام امروزی باید از هم تفکیک شوند.",
    icon: BookOpenCheck
  },
  {
    title: "هر ادعا نیازمند منبع است",
    body: "مقاله‌ها و توضیح‌های پژوهشی باید به کتابخانه، citation، نسخه یا یادداشت تحریریه قابل پیگیری وصل شوند.",
    icon: FileSearch
  },
  {
    title: "فرهنگی، آموزشی و قابل بازبینی",
    body: "این سایت جایگزین منبع دانشگاهی قطعی نیست؛ هدف آن آموزش، مسیر مطالعه و تجربه دیجیتال قابل توسعه است.",
    icon: ShieldCheck
  },
  {
    title: "زمینه تاریخی با احترام",
    body: "روایت‌ها باید با احترام به جامعه زرتشتی، فرهنگ ایران و تفاوت میان تاریخ، آیین، اسطوره و تفسیر امروز نوشته شوند.",
    icon: Landmark
  }
];

export default function ResearchMethodologyPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "خانه", href: "/" },
    { name: "روش پژوهش", href: "/research-methodology" }
  ]);

  return (
    <CinematicHub
      eyebrow="Research Method"
      title="روش پژوهش، منابع و بازبینی"
      lead="AVESTA-ZOROASTER قرار است زیبا باشد، اما زیبایی بدون شفافیت پژوهشی کافی نیست. این صفحه توضیح می‌دهد محتوا چطور نوشته، منبع‌دهی، بازبینی و منتشر می‌شود."
      scene="scene-scroll"
      heroImage="/images/ai/library-hero.jpg"
      roman="R"
      actions={[
        { label: "مرکز ارجاع", href: "/citations" },
        { label: "مرکز اعتماد", href: "/trust-center", variant: "secondary" }
      ]}
      stats={[
        { value: "Sources", label: "منبع و citation" },
        { value: "Review", label: "بازبینی پژوهشی" },
        { value: "Context", label: "زمینه تاریخی و آیینی" }
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map(({ title, body, icon: Icon }) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 leading-8 text-muted">{body}</p>
          </article>
        ))}
      </div>

      <section className="lux-frame mt-8 p-6 sm:p-8">
        <p className="gold-text text-sm font-semibold tracking-[0.24em]">DISCLAIMER</p>
        <h2 className="mt-3 text-3xl font-black text-warm">یادداشت آموزشی و فرهنگی</h2>
        <p className="mt-5 leading-9 text-muted">
          محتوای این سایت برای آموزش عمومی، تجربه دیجیتال، مسیر مطالعه و معرفی فرهنگی آماده می‌شود. برای پژوهش دانشگاهی،
          استناد رسمی یا تصمیم‌های دینی و آیینی، کاربر باید به نسخه‌های معتبر، پژوهش‌های تخصصی و صاحب‌نظران همان حوزه مراجعه کند.
        </p>
        <Link href="/contact" className="mt-6 inline-flex items-center rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          همکاری پژوهشی و هنری
        </Link>
      </section>
    </CinematicHub>
  );
}
