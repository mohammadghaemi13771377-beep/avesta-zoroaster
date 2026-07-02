import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, Gauge, ImagePlus, Layers3, ListChecks, Route, Sparkles, Target } from "lucide-react";

import { AvestaQuickComposer } from "@/components/admin/avesta-quick-composer";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { avestaCompletionFieldLabels, getAvestaCompletionSections, getAvestaCompletionSummary } from "@/lib/avesta-completion";
import { getAvestaProductionBatches, getAvestaProductionBatchSummary } from "@/lib/avesta-production-batches";

export const metadata: Metadata = {
  title: "مدیریت اوستا",
  description: "مدیریت بخش‌ها، فصل‌ها، بندها و ترجمه‌های اوستا.",
};

export default function AdminAvestaPage() {
  const completionSections = getAvestaCompletionSections();
  const completionSummary = getAvestaCompletionSummary(completionSections);
  const productionBatches = getAvestaProductionBatches(completionSections);
  const productionSummary = getAvestaProductionBatchSummary(productionBatches);
  const nextSections = [...completionSections].sort((a, b) => a.completion - b.completion).slice(0, 3);
  const nextBatches = productionBatches.slice(0, 4);

  return (
    <AdminShell>
      <section className="mb-10">
        <p className="gold-text text-sm font-semibold tracking-[0.24em]">FAST AVESTA ENTRY</p>
        <h1 className="mt-4 text-5xl font-black leading-[1.25] text-warm">ورود سریع محتوای اوستا</h1>
        <p className="mt-5 max-w-4xl text-lg leading-9 text-muted">
          اینجا مسیر اصلی تولید محتواست: اول بخش و فصل را می‌سازی، بعد بندها، ترجمه‌ها، تصویر، صوت و راهنمای
          تصویری همان فصل را اضافه می‌کنی. برای وندیداد یعنی می‌توانی فرگردها را یکی‌یکی با slugهایی مثل
          <span dir="ltr" className="mx-2 inline-flex rounded-full border border-gold/18 bg-gold/10 px-3 py-1 text-gold-light">
            fargard-1
          </span>
          بسازی و بعد بندهای هر فرگرد را وارد کنی.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {fastEntryCards.map(({ title, body, icon: Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="lux-frame group p-5 transition hover:-translate-y-1 hover:border-gold/45"
            >
              <Icon className="text-gold-light" size={26} />
              <h2 className="mt-4 text-xl font-black text-warm">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
              <span className="mt-4 inline-flex text-sm font-black text-gold-light transition group-hover:-translate-x-1">
                باز کردن
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="lux-frame overflow-hidden p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 text-gold-light">
                  <Gauge size={22} />
                  <h2 className="text-2xl font-black text-warm">وضعیت تکمیل جهان اوستا</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  این نما به تو می‌گوید کدام بخش‌ها هنوز متن، ترجمه، تصویر، صوت، منبع و SEO بیشتری لازم دارند.
                </p>
              </div>
              <div className="rounded-[28px] border border-gold/20 bg-gold/10 px-6 py-4 text-center">
                <p className="text-4xl font-black text-gold-light">{completionSummary.completion}%</p>
                <p className="mt-1 text-xs font-bold text-muted">تکمیل کل</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <AdminMetric label="بخش اصلی" value={completionSummary.sections} />
              <AdminMetric label="آیتم آماده" value={completionSummary.ready} />
              <AdminMetric label="آیتم باقی‌مانده" value={completionSummary.remaining} />
            </div>

            <div className="mt-5 rounded-2xl border border-gold/14 bg-night/40 p-4">
              <p className="text-xs font-black tracking-[0.18em] text-gold-light">NEXT FOCUS</p>
              <p className="mt-2 text-lg font-black text-warm">{completionSummary.nextSection.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{completionSummary.nextSection.nextAction}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${completionSummary.nextSection.completion}%` }} />
              </div>
            </div>
          </article>

          <article className="poster-parchment p-6">
            <div className="flex items-center gap-3 text-night/70">
              <Target size={22} />
              <h2 className="text-2xl font-black text-night">اولویت‌های تولید محتوا</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {nextSections.map((section) => (
                <div key={section.slug} className="rounded-2xl border border-night/10 bg-white/35 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black text-night">{section.title}</p>
                    <span className="rounded-full bg-night/10 px-3 py-1 text-xs font-black text-night">{section.completion}%</span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-night/60">{section.owner}</p>
                  <p className="mt-2 text-sm leading-7 text-night/75">{section.nextAction}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-[24px] border border-gold/18 bg-royal/45 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-gold-light">
              <ListChecks size={22} />
              <h2 className="text-2xl font-black text-warm">کارهای بعدی برای واقعی شدن محتوا</h2>
            </div>
            <Link href="/admin/avesta-production" className="rounded-full border border-gold/20 px-4 py-2 text-sm font-black text-gold-light transition hover:bg-gold/10">
              مشاهده برنامه تولید
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {nextBatches.map((batch) => (
              <Link key={batch.id} href={batch.href} className="rounded-2xl border border-gold/14 bg-night/38 p-4 transition hover:-translate-y-1 hover:border-gold/42 hover:bg-gold/10">
                <p className="text-sm font-black text-warm">{batch.sectionTitle}</p>
                <p className="mt-2 text-xs font-bold text-gold-light">{avestaCompletionFieldLabels[batch.field]}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{batch.missingCount} مورد باقی مانده</p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">
            در کل {productionSummary.total} بسته کاری فعال داریم؛ {productionSummary.critical} مورد بحرانی و {productionSummary.high} مورد با اولویت بالا هستند.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <article className="lux-frame p-6">
            <div className="flex items-center gap-3 text-gold-light">
              <Route size={22} />
              <h2 className="text-2xl font-black text-warm">ترتیب پیشنهادی برای ساخت وندیداد</h2>
            </div>
            <ol className="mt-5 grid gap-3 text-sm leading-8 text-muted">
              <li>1. نوع محتوا را روی «فصل / هات» بگذار، بخش را `vendidad` و slug را مثل `fargard-1` وارد کن.</li>
              <li>2. برای همان فصل، نوع محتوا را روی «بند اوستا» بگذار و بندهای 1، 2، 3 و ... را اضافه کن.</li>
              <li>3. برای جذاب شدن صفحه، «راهنمای تصویری فصل» را با تصویر، پیام محوری و کارت‌های روایی پر کن.</li>
              <li>4. بعد از اتصال DATABASE_URL، ذخیره‌ها مستقیم در PostgreSQL/Prisma می‌نشینند؛ قبل از آن dry-run امن است.</li>
            </ol>
          </article>

          <article className="poster-parchment p-6">
            <p className="text-sm font-black text-night/65">نمونه slugهای آماده</p>
            <div className="mt-4 grid gap-2 text-sm font-bold text-night/80">
              <code dir="ltr" className="rounded-xl bg-night/10 px-3 py-2">/avesta/vendidad/fargard-1</code>
              <code dir="ltr" className="rounded-xl bg-night/10 px-3 py-2">/avesta/yashts/aban-yasht</code>
              <code dir="ltr" className="rounded-xl bg-night/10 px-3 py-2">/avesta/khordeh-avesta/atash-niyayesh</code>
              <code dir="ltr" className="rounded-xl bg-night/10 px-3 py-2">/avesta/yasna/ha-1/verse-1</code>
            </div>
          </article>
        </div>
      </section>

      <AvestaQuickComposer />

      <AdminResourcePage
        eyebrow="Avesta CMS"
        title="مدیریت اوستا"
        description="ساخت و ویرایش بخش‌ها، فصل‌ها، بندها، ترجمه‌ها، بازنویسی ساده، تحلیل مفهومی، تصویر و صوت."
        checklist={["بخش‌های اوستا", "فصل‌ها و هات‌ها", "بندها و ترجمه‌ها", "تصویر و صوت هر بند"]}
        showContentForm={false}
      />
    </AdminShell>
  );
}

const fastEntryCards = [
  {
    title: "ساخت بخش",
    body: "برای یسنا، گات‌ها، وندیداد، یشت‌ها و هر مجموعه اصلی.",
    href: "/admin/avesta",
    icon: Layers3,
  },
  {
    title: "ساخت فصل / فرگرد",
    body: "برای فرگردهای وندیداد، هات‌های یسنا و یشت‌های مستقل.",
    href: "/admin/avesta",
    icon: BookOpen,
  },
  {
    title: "ورود بند و ترجمه",
    body: "متن اصلی، ترجمه کلاسیک، بازنویسی ساده، تحلیل و پیام اخلاقی.",
    href: "/admin/avesta",
    icon: FileText,
  },
  {
    title: "تصویر و راهنمای فصل",
    body: "hero، thumbnail، alt text، پنل‌های روایی و تجربه تصویری.",
    href: "/admin/media",
    icon: ImagePlus,
  },
  {
    title: "برنامه تولید محتوا",
    body: "وضعیت تکمیل بخش‌ها، موج‌های انتشار و اولویت‌های بعدی.",
    href: "/admin/avesta-production",
    icon: Sparkles,
  },
];

function AdminMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gold/14 bg-night/42 p-4">
      <p className="text-2xl font-black text-gold-light">{value.toLocaleString("fa-IR")}</p>
      <p className="mt-1 text-xs font-bold text-muted">{label}</p>
    </div>
  );
}
