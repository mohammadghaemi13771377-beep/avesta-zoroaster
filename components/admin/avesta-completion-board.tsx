import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, FileText, ImagePlus, Mic2, ScrollText, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  avestaCompletionFieldLabels,
  getAvestaCompletionSummary,
  type AvestaCompletionField,
  type AvestaCompletionSection,
} from "@/lib/avesta-completion";

type AvestaCompletionBoardProps = {
  sections: AvestaCompletionSection[];
};

const priorityLabels: Record<AvestaCompletionSection["priority"], string> = {
  critical: "بحرانی",
  high: "بالا",
  medium: "متوسط",
};

const fieldIcons: Record<AvestaCompletionField, LucideIcon> = {
  originalText: ScrollText,
  transliteration: FileText,
  classicalTranslation: BookOpen,
  simpleRewrite: Sparkles,
  modernInterpretation: SearchCheck,
  ethicalMessage: CheckCircle2,
  aiImage: ImagePlus,
  audio: Mic2,
  citation: ShieldCheck,
  seo: SearchCheck,
};

const visibleFields: AvestaCompletionField[] = [
  "originalText",
  "classicalTranslation",
  "simpleRewrite",
  "modernInterpretation",
  "ethicalMessage",
  "aiImage",
  "audio",
  "citation",
  "seo",
];

export function AvestaCompletionBoard({ sections }: AvestaCompletionBoardProps) {
  const summary = getAvestaCompletionSummary(sections);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA COMPLETION</p>
          <h2 className="mt-3 text-3xl font-black text-warm">ماتریس تکمیل محتوای اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد برای تیم محتوا، پژوهش، رسانه و SEO ساخته شده تا وضعیت متن اصلی، ترجمه، بازنویسی، تحلیل، تصویر،
            صوت، منبع و metadata هر بخش اوستا روشن باشد.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="بخش" value={String(summary.sections)} />
          <Metric label="هدف" value={formatNumber(summary.target)} />
          <Metric label="آماده" value={formatNumber(summary.ready)} />
          <Metric label="باقی" value={formatNumber(summary.remaining)} />
          <Metric label="تکمیل" value={`${summary.completion}%`} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
          <p className="text-xs font-bold text-muted">ضعیف‌ترین فیلد تولید</p>
          <h3 className="mt-2 text-2xl font-black text-warm">{summary.weakestField.label}</h3>
          <p className="mt-2 text-sm leading-7 text-gold-light">
            {formatNumber(summary.weakestField.ready)} از {formatNumber(summary.weakestField.target)} آماده است.
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${summary.weakestField.completion}%` }} />
          </div>
        </div>

        <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
          <p className="text-xs font-bold text-muted">اولویت بعدی</p>
          <h3 className="mt-2 text-2xl font-black text-warm">{summary.nextSection.title}</h3>
          <p className="mt-2 text-sm leading-7 text-gold-light">{summary.nextSection.nextAction}</p>
          <Link href={summary.nextSection.href} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
            باز کردن بخش
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {sections.map((section) => (
          <article key={section.slug} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    {priorityLabels[section.priority]}
                  </span>
                  <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                    {section.owner}
                  </span>
                  <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                    {formatNumber(section.plannedVerses)} بند برنامه‌ریزی‌شده
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{section.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{section.nextAction}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <CheckCircle2 className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-sm font-black text-warm">{section.completion}% کامل</p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${section.completion}%` }} />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
              {visibleFields.map((field) => {
                const Icon = fieldIcons[field];
                const target = section.target[field];
                const ready = section.ready[field];
                const percent = Math.round((ready / Math.max(target, 1)) * 100);

                return (
                  <div key={field} className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                    <Icon className="text-gold-light" size={18} />
                    <p className="mt-2 text-xs font-bold text-muted">{avestaCompletionFieldLabels[field]}</p>
                    <p className="mt-1 text-lg font-black text-warm">
                      {formatNumber(ready)} / {formatNumber(target)}
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-warm/10">
                      <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
