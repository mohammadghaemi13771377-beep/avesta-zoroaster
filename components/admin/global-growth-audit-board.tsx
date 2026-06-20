import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CircleDashed,
  DatabaseZap,
  Gauge,
  Globe2,
  ImagePlus,
  Languages,
  Search,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import {
  globalGrowthAreaLabels,
  globalGrowthStatusLabels,
  getGlobalGrowthAuditSummary,
  type GlobalGrowthArea,
  type GlobalGrowthAuditItem,
  type GlobalGrowthStatus
} from "@/lib/global-growth-audit";

type GlobalGrowthAuditBoardProps = {
  items: GlobalGrowthAuditItem[];
};

const statusClass: Record<GlobalGrowthStatus, string> = {
  strong: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  ready: "border-sky-300/30 bg-sky-300/10 text-sky-100",
  needs_work: "border-gold/30 bg-gold/10 text-gold-light",
  blocked: "border-red-300/30 bg-red-300/10 text-red-100"
};

const areaIcon: Record<GlobalGrowthArea, typeof Search> = {
  seo: Search,
  multilingual: Languages,
  schema: Sparkles,
  trust: ShieldCheck,
  performance: Gauge,
  content: BookOpen,
  assets: ImagePlus,
  admin: DatabaseZap
};

export function GlobalGrowthAuditBoard({ items }: GlobalGrowthAuditBoardProps) {
  const summary = getGlobalGrowthAuditSummary(items);

  return (
    <section className="grid gap-6">
      <div className="hero-panel overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(242,213,138,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(70,150,180,0.14),transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              <Globe2 size={16} />
              Global Growth Audit
            </span>
            <h1 className="mt-5 text-3xl font-black text-warm sm:text-5xl">
              بورد رشد جهانی AVESTA-ZOROASTER
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-warm/75 sm:text-base">
              این بورد وضعیت SEO، چندزبانه، schema، اعتماد پژوهشی، performance، تصویرها، محتوا و CMS را برای
              آماده‌سازی نسخه جهانی سایت یک‌جا نشان می‌دهد.
            </p>
          </div>
          <div className="rounded-[2rem] border border-gold/20 bg-black/30 p-5 shadow-[0_0_60px_rgba(214,168,79,0.12)]">
            <p className="text-sm font-bold text-warm/60">Launch mode</p>
            <p className="mt-2 text-3xl font-black text-gold-light">{summary.launchMode}</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-l from-gold-light via-gold to-sky-300"
                style={{ width: `${summary.averageScore}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-warm/60">میانگین آمادگی جهانی: {summary.averageScore}%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["کل محورهای بررسی", summary.total],
          ["قوی", summary.strong],
          ["آماده", summary.ready],
          ["نیازمند تکمیل", summary.needsWork]
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
            <p className="text-sm font-black text-gold-light">اولویت بعدی</p>
            <h2 className="mt-2 text-2xl font-black text-warm">{summary.nextItem.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-warm/65">{summary.nextItem.nextAction}</p>
          </div>
          <span className={`rounded-full border px-4 py-2 text-xs font-black ${statusClass[summary.nextItem.status]}`}>
            {globalGrowthStatusLabels[summary.nextItem.status]}
          </span>
        </div>
      </div>

      <div className="grid gap-5">
        {items.map((item) => {
          const Icon = areaIcon[item.area];

          return (
            <article key={item.id} className="lux-frame p-5">
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-light">
                      <Icon size={20} />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                      {globalGrowthStatusLabels[item.status]}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-warm/60">
                      {globalGrowthAreaLabels[item.area]}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-warm/65">{item.evidence}</p>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-bold text-warm/55">
                      <span>Score</span>
                      <span>{item.score}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-l from-gold-light to-sky-300" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-black text-gold-light">Next action</p>
                    <p className="mt-2 text-sm leading-7 text-warm/70">{item.nextAction}</p>
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

                  <div className="flex flex-wrap gap-2">
                    {item.routes.map((route) => (
                      <Link
                        key={route}
                        href={route.includes("[") ? "/admin/global-growth-audit" : route}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/5 px-3 py-1.5 text-xs font-bold text-gold-light transition hover:border-gold/40 hover:bg-gold/10"
                      >
                        {route}
                        <ArrowLeft size={13} />
                      </Link>
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
