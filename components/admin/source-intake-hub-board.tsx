import Link from "next/link";
import { ArrowLeft, BookOpenCheck, CheckCircle2, CircleDashed, FileWarning, FolderInput, ImagePlus, ShieldCheck } from "lucide-react";
import { getSourceIntakeSummary, sourceIntakeStatusLabels, type SourceIntakeItem, type SourceIntakeStatus } from "@/lib/source-intake-hub";

type SourceIntakeHubBoardProps = {
  items: SourceIntakeItem[];
};

const statusClass: Record<SourceIntakeStatus, string> = {
  ready: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  review: "border-gold/30 bg-gold/10 text-gold-light",
  blocked: "border-red-300/30 bg-red-300/10 text-red-100",
};

export function SourceIntakeHubBoard({ items }: SourceIntakeHubBoardProps) {
  const summary = getSourceIntakeSummary(items);

  return (
    <section className="grid gap-6">
      <div className="hero-panel overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(242,213,138,0.2),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(103,208,201,0.14),transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              <FolderInput size={16} />
              Research Source Intake
            </span>
            <h1 className="mt-5 text-3xl font-black text-warm sm:text-5xl">مرکز ورود منابع پژوهشی</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-warm/75 sm:text-base">
              پیش از آن‌که متن، ترجمه، تصویر یا روایت یک بخش وارد سایت شود، این بورد نشان می‌دهد چه منبعی لازم است، چه ارجاعی تایید شده و کدام مانع باید اول حل شود.
            </p>
          </div>
          <div className="rounded-[2rem] border border-gold/20 bg-black/30 p-5 shadow-[0_0_60px_rgba(242,213,138,0.1)]">
            <p className="text-sm font-bold text-warm/60">Research intake readiness</p>
            <p className="mt-2 text-4xl font-black text-gold-light">{summary.averageReadiness}%</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-l from-teal-200 via-gold-light to-gold" style={{ width: `${summary.averageReadiness}%` }} />
            </div>
            <p className="mt-3 text-xs text-warm/60">{summary.pendingCitations} citation در انتظار تکمیل یا بازبینی است.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["بخش‌ها", summary.total],
          ["آماده ورود", summary.ready],
          ["بازبینی", summary.review],
          ["مسدود", summary.blocked],
        ].map(([label, value]) => (
          <div key={label} className="lux-frame p-5">
            <p className="text-xs font-bold text-warm/55">{label}</p>
            <p className="mt-2 text-3xl font-black text-gold-light">{value}</p>
          </div>
        ))}
      </div>

      {summary.nextItem ? (
        <div className="lux-frame p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-gold-light">اولویت پژوهشی بعدی</p>
              <h2 className="mt-2 text-2xl font-black text-warm">{summary.nextItem.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-warm/65">{summary.nextItem.nextAction}</p>
            </div>
            <Link href={summary.nextItem.href} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              مشاهده بخش
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5">
        {items.map((item) => (
          <article key={item.id} className="lux-frame p-5">
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>{sourceIntakeStatusLabels[item.status]}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-warm/60">{item.sectionSlug}</span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-warm/65">مالک: {item.owner}</p>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-bold text-warm/55"><span>Readiness</span><span>{item.readiness}%</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-l from-teal-200 to-gold" style={{ width: `${item.readiness}%` }} /></div>
                </div>
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
                  صفحه عمومی
                  <ArrowLeft size={16} />
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <StatusCard icon={BookOpenCheck} label="Citation تایید" value={String(item.verifiedCitations)} />
                  <StatusCard icon={FileWarning} label="Citation معلق" value={String(item.pendingCitations)} />
                  <StatusCard icon={ImagePlus} label="دارایی لازم" value={String(item.requiredAssets.length)} />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Checklist title="منابع ضروری" items={item.requiredSources} />
                  <Checklist title="دارایی‌های ورودی" items={item.requiredAssets} />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-gold-light"><ShieldCheck size={17} /><p className="text-xs font-black">مانع‌ها و اقدام بعدی</p></div>
                  {item.blockers.length ? (
                    <ul className="mt-3 grid gap-2 text-sm leading-7 text-warm/65">
                      {item.blockers.map((blocker) => <li key={blocker}>- {blocker}</li>)}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm leading-7 text-emerald-100">بسته آماده است؛ نسخه منبع و تاریخ بازبینی را هنگام publish ثبت کنید.</p>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatusCard({ icon: Icon, label, value }: { icon: typeof BookOpenCheck; label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><Icon className="text-gold-light" size={18} /><p className="mt-3 text-xs font-bold text-warm/55">{label}</p><p className="mt-1 text-2xl font-black text-warm">{value}</p></div>;
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs font-black text-gold-light">{title}</p><ul className="mt-3 grid gap-2 text-xs leading-6 text-warm/65">{items.map((item) => <li key={item}><CheckCircle2 className="ml-1 inline text-emerald-200" size={14} />{item}</li>)}</ul></div>;
}
