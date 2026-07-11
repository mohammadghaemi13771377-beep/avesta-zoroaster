import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Flame, Scale, Sparkles, Sun } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "یکتاپرستی | AVESTA-ZOROASTER",
  description: "هاب یکتاپرستی AVESTA-ZOROASTER؛ اهورامزدا، اشا، اختیار انسان و پیام اخلاقی پندار نیک، گفتار نیک، کردار نیک.",
};

const pillars = [
  {
    title: "اهورامزدا؛ دانایی و روشنایی",
    subtitle: "سرچشمه خرد، راستی و نظم اخلاقی",
    description:
      "در روایت سایت، یکتاپرستی زرتشتی با تمرکز بر اهورامزدا به عنوان سرچشمه دانایی، روشنایی و نظم اخلاقی معرفی می‌شود؛ با زبانی قابل فهم برای انسان امروز.",
    accent: "#F2D58A",
  },
  {
    title: "اشا؛ قانون راستی",
    subtitle: "جهان معنا دارد و انسان می‌تواند با راستی هماهنگ شود",
    description:
      "اشا محور اخلاقی این هاب است: راستی، نظم، هماهنگی و مسئولیت. کاربر باید بفهمد یکتاپرستی اینجا فقط باور نیست؛ مسیر زیستن و انتخاب است.",
    accent: "#D6A84F",
  },
  {
    title: "اختیار انسان",
    subtitle: "انتخاب میان روشنایی و تاریکی",
    description:
      "انسان فقط تماشاگر نیست. او با پندار، گفتار و کردار خود در ساختن جهان اخلاقی سهم دارد؛ همین ایده باید در مسیرهای مطالعه و تمرین‌های سایت دیده شود.",
    accent: "#FFF8EA",
  },
  {
    title: "پندار نیک، گفتار نیک، کردار نیک",
    subtitle: "فرمول ساده، عمیق و جهانی اخلاق",
    description:
      "این شعار مثل ستون طلایی کل سایت عمل می‌کند: از صفحه خانه تا مطالعه اوستا، مقاله‌ها، تایم‌لاین، رسانه و تجربه کاربر.",
    accent: "#B9B9B9",
  },
];

const journey = [
  ["۱", "شناخت", "کاربر ابتدا با اهورامزدا، اشا، وهومن و گات‌ها آشنا می‌شود."],
  ["۲", "مطالعه", "بعد وارد متن اوستا و گات‌ها می‌شود و هر بند را با ترجمه و تحلیل می‌خواند."],
  ["۳", "تجربه", "تصویر، صوت، تایم‌لاین و مقاله‌ها فهم را به یک تجربه سینمایی تبدیل می‌کنند."],
  ["۴", "کاربرد امروز", "پیام اخلاقی هر متن به زندگی امروز وصل می‌شود: انتخاب، راستی، خرد و مسئولیت."],
];

export default function MonotheismPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "AVESTA-ZOROASTER Monotheism Hub",
    url: "https://avesta-zoroaster.com/monotheism",
    description: "A cinematic Persian educational hub about Zoroastrian monotheism, Ahura Mazda, Asha and ethical wisdom.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CinematicHub
        eyebrow="Monotheism Hub"
        title="یکتاپرستی، خرد و روشنایی"
        lead="این صفحه قلب معنایی سایت است: معرفی اهورامزدا، اشا، اختیار انسان و اخلاق زرتشتی به زبان مدرن، سینمایی و قابل لمس."
        scene="scene-fire"
        heroImage={routeHeroByPath["/monotheism"]}
        actions={[
          { label: "شروع از گات‌ها", href: "/avesta/gathas/ahunavaiti/verse-1" },
          { label: "مسیرهای یکتاپرستی", href: "/monotheism/paths", variant: "secondary" },
        ]}
        stats={[
          { value: "یکتا", label: "تمرکز بر خرد و روشنایی" },
          { value: "اشا", label: "راستی، نظم و مسئولیت" },
          { value: "۳", label: "پندار، گفتار و کردار نیک" },
        ]}
      >
        <section className="lux-frame mb-8 grid gap-8 p-7 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex items-center gap-2 text-gold-light">
              <Sun size={19} />
              <p className="text-sm font-bold">قلب معنایی پروژه</p>
            </div>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1.25] text-warm">
              یکتاپرستی در این سایت باید تجربه شود، نه فقط توضیح داده شود
            </h2>
            <p className="mt-5 max-w-3xl leading-9 text-muted">
              این صفحه کاربر را از مفهوم به تجربه می‌برد: از نام اهورامزدا و اشا تا خواندن گات‌ها، دیدن تصویر، شنیدن روایت و فهم پیام اخلاقی امروز.
            </p>
            <Link href="/monotheism/paths" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light">
              ورود به مسیرهای یکتاپرستی
              <ArrowLeft size={18} />
            </Link>
          </div>
          <div className="image-scene scene-fire grid min-h-[300px] place-items-center rounded-[1.4rem] border border-gold/15">
            <div className="relative z-10 text-center">
              <Flame className="mx-auto text-gold-light" size={54} />
              <p className="mt-8 text-3xl font-black leading-10 text-warm">
                پندار نیک
                <br />
                گفتار نیک
                <br />
                کردار نیک
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="lux-frame p-6">
              <div className="mb-5 h-2 w-24 rounded-full" style={{ backgroundColor: pillar.accent }} />
              <p className="text-sm font-bold text-gold-light">{pillar.subtitle}</p>
              <h3 className="mt-3 text-3xl font-black text-warm">{pillar.title}</h3>
              <p className="mt-4 leading-9 text-muted">{pillar.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 lux-frame p-7">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={20} />
            <p className="text-sm font-bold">مسیر کاربر</p>
          </div>
          <h2 className="mt-3 text-4xl font-black text-warm">از شناخت تا کاربرد امروز</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {journey.map(([step, title, description]) => (
              <article key={step} className="rounded-[18px] border border-gold/12 bg-night/60 p-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-lg font-black text-night">{step}</div>
                <h3 className="mt-5 text-2xl font-black text-warm">{title}</h3>
                <p className="mt-3 leading-8 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 lux-frame p-7">
          <div className="flex items-center gap-2 text-gold-light">
            <Scale size={20} />
            <p className="text-sm font-bold">پیام اخلاقی</p>
          </div>
          <p className="mt-4 text-2xl font-black leading-10 text-warm">
            هدف این هاب این است که کاربر حس کند یکتاپرستی زرتشتی فقط یک بحث تاریخی نیست؛ دعوتی است به انتخاب آگاهانه، خرد، راستی و مسئولیت.
          </p>
        </section>
      </CinematicHub>
    </>
  );
}
