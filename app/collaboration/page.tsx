import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Palette, ScrollText, UsersRound } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "همکاری | AVESTA-ZOROASTER",
  description: "مسیر همکاری پژوهشگران، مترجمان، هنرمندان، تولیدکنندگان رسانه و تیم‌های فنی با AVESTA-ZOROASTER.",
  path: "/collaboration",
  image: "/images/ai/mobed-hero.jpg",
});

const paths = [
  {
    title: "پژوهش و منابع",
    body: "معرفی نسخه‌ها، کتاب‌ها، مقاله‌ها، ارجاع‌ها و اصلاح خطاهای محتوایی برای بخش‌های اوستا و زرتشت.",
    icon: ScrollText,
  },
  {
    title: "ترجمه و ویرایش",
    body: "تکمیل متن فارسی و انگلیسی با لحن دقیق، محترمانه، قابل فهم و مناسب مخاطب عمومی و پژوهشگر.",
    icon: UsersRound,
  },
  {
    title: "هنر و رسانه",
    body: "تولید تصویر، ویدیو، صدا، نمایشگاه دیجیتال و محتوای آموزشی با هویت ایران باستان و اوستا.",
    icon: Palette,
  },
];

export default function CollaborationPage() {
  return (
    <CinematicHub
      eyebrow="همکاری"
      title="همکاری با جهان اوستا"
      lead="این پروژه برای بزرگ شدن به تیم‌های پژوهشی، هنری، فنی و محتوایی نیاز دارد. هر همکاری باید روشن، قابل پیگیری و با احترام به منبع و فرهنگ انجام شود."
      scene="scene-prophet"
      heroImage="/images/ai/mobed-hero.jpg"
      actions={[
        { label: "ارسال پیام", href: "mailto:hello@avesta-zoroaster.com" },
        { label: "تماس با ما", href: "/contact", variant: "secondary" },
      ]}
      stats={[
        { value: "Research", label: "منبع و اعتبار" },
        { value: "Design", label: "تصویر و تجربه" },
        { value: "Product", label: "رشد پلتفرم" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {paths.map(({ title, body, icon: Icon }) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 leading-8 text-muted">{body}</p>
          </article>
        ))}
      </div>

      <section className="lux-frame mt-8 p-6 sm:p-8">
        <p className="gold-text text-sm font-semibold tracking-[0.24em]">COLLABORATION INBOX</p>
        <h2 className="mt-3 text-3xl font-black text-warm">برای شروع چه بفرستیم؟</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          موضوع همکاری، نمونه کار یا منبع پیشنهادی، مسیر پیشنهادی انتشار و راه ارتباطی خود را بفرستید. بعداً همین مسیر به فرم ادمین و سیستم بررسی محتوا وصل می‌شود.
        </p>
        <Link href="mailto:hello@avesta-zoroaster.com" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          hello@avesta-zoroaster.com
          <Mail size={16} />
        </Link>
      </section>
    </CinematicHub>
  );
}
