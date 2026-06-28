import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Palette, ScrollText, UsersRound } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "تماس و همکاری | AVESTA-ZOROASTER",
  description:
    "راه ارتباطی برای پژوهشگران، مترجمان، هنرمندان، طراحان AI و همکاران فرهنگی پروژه AVESTA-ZOROASTER.",
  path: "/contact",
  image: "/images/ai/zoroaster-hero.jpg",
});

const collaborationPaths = [
  {
    title: "پژوهش و منبع",
    body: "معرفی منابع معتبر، نسخه‌ها، مقاله‌ها، تصحیح خطاها و پیشنهاد citation برای صفحات اوستا.",
    icon: ScrollText,
  },
  {
    title: "ترجمه و ویرایش",
    body: "همکاری برای ترجمه فارسی و انگلیسی طبیعی، دقیق و قابل فهم برای مخاطب عمومی و پژوهشگر.",
    icon: UsersRound,
  },
  {
    title: "تصویر و رسانه",
    body: "تولید تصویر، ویدئو، صوت، پوستر و نمایشگاه‌های دیجیتال با هویت ایران باستان و اوستا.",
    icon: Palette,
  },
];

export default function ContactPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "خانه", href: "/" },
    { name: "تماس و همکاری", href: "/contact" },
  ]);

  return (
    <CinematicHub
      eyebrow="Contact"
      title="تماس، همکاری و مشارکت"
      lead="این پروژه برای رشد جهانی به پژوهشگران، مترجمان، هنرمندان، طراحان و دوستداران فرهنگ ایران نیاز دارد. مسیر همکاری باید شفاف، محترمانه و قابل پیگیری باشد."
      scene="scene-prophet"
      heroImage="/images/ai/zoroaster-hero.jpg"
      roman="C"
      actions={[
        { label: "مرکز اعتماد", href: "/trust-center" },
        { label: "روش پژوهش", href: "/research-methodology", variant: "secondary" },
      ]}
      stats={[
        { value: "Research", label: "پژوهش و منبع" },
        { value: "Media", label: "تصویر و صوت" },
        { value: "Global", label: "فارسی و انگلیسی" },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="grid gap-5 md:grid-cols-3">
        {collaborationPaths.map(({ title, body, icon: Icon }) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 leading-8 text-muted">{body}</p>
          </article>
        ))}
      </div>

      <section className="lux-frame mt-8 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="gold-text text-sm font-semibold tracking-[0.24em]">COLLABORATION INBOX</p>
            <h2 className="mt-3 text-3xl font-black text-warm">پیام پیشنهادی برای شروع همکاری</h2>
            <p className="mt-4 leading-8 text-muted">
              تا قبل از اتصال فرم production، بهترین مسیر این است که پیشنهاد همکاری با موضوع، زمینه تخصصی، نمونه کار یا منبع، و مسیر پیشنهادی صفحه ارسال شود.
            </p>
          </div>
          <Link href="mailto:hello@avesta-zoroaster.com" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
            hello@avesta-zoroaster.com
            <Mail size={16} />
          </Link>
        </div>
      </section>
    </CinematicHub>
  );
}
