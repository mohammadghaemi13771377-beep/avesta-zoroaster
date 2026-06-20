import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, FileText, Globe2, Languages, LibraryBig, PenLine, Search } from "lucide-react";
import {
  getLocalizationSummary,
  localizationAreaLabels,
  localizationStatusLabels,
  type LocalizationArea,
  type LocalizationItem,
  type LocalizationStatus
} from "@/lib/localization-hub";

type LocalizationHubBoardProps = {
  items: LocalizationItem[];
};

const statusClass: Record<LocalizationStatus, string> = {
  ready: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  needs_editorial: "border-sky-300/30 bg-sky-300/10 text-sky-100",
  needs_translation: "border-gold/30 bg-gold/10 text-gold-light",
  blocked: "border-red-300/30 bg-red-300/10 text-red-100"
};

const areaIcon: Record<LocalizationArea, typeof Globe2> = {
  gateway: Globe2,
  avesta: LibraryBig,
  article: FileText,
  glossary: Search,
  media: Languages,
  commerce: PenLine,
  admin: PenLine
};

export function LocalizationHubBoard({ items }: LocalizationHubBoardProps) {
  const summary = getLocalizationSummary(items);

  return (
    <section className="grid gap-6">
      <div className="hero-panel overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(158,231,242,0.16),transparent_30%),radial-gradient(circle_at_78%_16%,rgba(242,213,138,0.18),transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-sky-200/10 px-4 py-2 text-xs font-black text-sky-100">
              <Languages size={16} />
              Localization Hub
            </span>
            <h1 className="mt-5 text-3xl font-black text-warm sm:text-5xl">مرکز چندزبانه و ترجمه</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-warm/75 sm:text-base">
              این بورد مسیرهای فارسی و انگلیسی، وضعیت ترجمه انسانی، بازبینی اصطلاحات زرتشتی، hreflang و آماده‌سازی رشد جهانی را برای تیم محتوا و SEO قابل پیگیری می‌کند.
            </p>
          </div>
          <div className="rounded-[2rem] border border-sky-200/20 bg-black/30 p-5 shadow-[0_0_60px_rgba(158,231,242,0.10)]">
            <p className="text-sm font-bold text-warm/60">Localization readiness</p>
            <p className="mt-2 text-4xl font-black text-gold-light">{summary.averageCompletion}%</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-l from-sky-200 via-gold-light to-gold"
                style={{ width: `${summary.averageCompletion}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-warm/60">
              زبان‌ها: {summary.locales} | مقصد فعلی: {summary.targetLocales.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["کل آیتم‌ها", summary.total],
          ["آماده", summary.ready],
          ["بازبینی", summary.needsEditorial],
          ["نیازمند ترجمه", summary.needsTranslation]
        ].map(([label, value]) => (
          <div key={label} className="lux-frame p-5">
            <p className="text-xs font-bold text-warm/55">{label}</p>
            <p className="mt-2 text-3xl font-black text-gold-light">{value}</p>
          </div>
        ))}
      </div>

      <div className="lux-frame p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-gold-light">اولویت ترجمه بعدی</p>
            <h2 className="mt-2 text-2xl font-black text-warm">{summary.nextItem.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-warm/65">{summary.nextItem.nextAction}</p>
          </div>
          <Link
            href={summary.nextItem.route.includes("[") ? "/admin/localization" : summary.nextItem.route}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            مشاهده مسیر
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <div className="grid gap-5">
        {items.map((item) => {
          const Icon = areaIcon[item.area];

          return (
            <article key={item.id} className="lux-frame p-5">
              <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-light">
                      <Icon size={20} />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                      {localizationStatusLabels[item.status]}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-warm/60">
                      {localizationAreaLabels[item.area]}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-2 text-xs font-bold text-gold-light">{item.route}</p>
                  <p className="mt-3 text-sm leading-7 text-warm/65">{item.evidence}</p>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-bold text-warm/55">
                      <span>Completion</span>
                      <span>{item.completion}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-l from-sky-200 to-gold" style={{ width: `${item.completion}%` }} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                      <span className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1 text-gold-light">
                        Source: {item.sourceLocale}
                      </span>
                      {item.targetLocales.map((locale) => (
                        <span key={locale} className="rounded-full border border-sky-200/15 bg-sky-200/5 px-3 py-1 text-sky-100">
                          Target: {locale}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-warm/70">{item.nextAction}</p>
                    <p className="mt-3 text-xs font-bold text-warm/45">Owner: {item.owner}</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {item.checks.map((check) => (
                      <div key={check.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center gap-2">
                          {check.passed ? (
                            <CheckCircle2 className="text-emerald-200" size={17} />
                          ) : (
                            <CircleDashed className="text-gold-light" size={17} />
                          )}
                          <p className="text-xs font-black text-warm">{check.label}</p>
                        </div>
                        <p className="mt-2 text-xs leading-6 text-warm/55">{check.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
