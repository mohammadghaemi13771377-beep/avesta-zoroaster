import Link from "next/link";
import { ArrowLeft, Database, HardDriveUpload, KeyRound, ListChecks, Search, ShieldCheck } from "lucide-react";
import {
  contentProductionStatusLabels,
  getContentProductionSummary,
  type ContentProductionItem,
  type ContentProductionStatus
} from "@/lib/content-production-readiness";

type ContentProductionReadinessBoardProps = {
  items: ContentProductionItem[];
};

const statusClass: Record<ContentProductionStatus, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  needs_database: "border-gold/25 bg-gold/10 text-gold-light",
  needs_storage: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  needs_security: "border-red-300/25 bg-red-300/10 text-red-100",
  needs_workflow: "border-warm/10 bg-warm/5 text-muted"
};

const areaIcon = {
  content: Database,
  media: HardDriveUpload,
  admin: KeyRound,
  search: Search,
  backup: ShieldCheck
};

export function ContentProductionReadinessBoard({ items }: ContentProductionReadinessBoardProps) {
  const summary = getContentProductionSummary(items);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">CONTENT PRODUCTION READINESS</p>
          <h1 className="mt-3 text-4xl font-black text-warm">آمادگی ادمین برای ورود محتوای واقعی</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            این بورد دقیقاً نشان می‌دهد برای اینکه خودت بعد از بالا آمدن سایت متن، تصویر، صوت، ویدئو و منبع اضافه کنی،
            چه چیزهایی آماده است و چه چیزهایی باید به دیتابیس، storage و امنیت production وصل شود.
          </p>
        </div>
        <Link href="/admin/avesta" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          ورود به ادمین اوستا
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Metric label="کل بخش‌ها" value={String(summary.total)} />
        <Metric label="آماده کامل" value={String(summary.ready)} />
        <Metric label="ریسک مهم" value={String(summary.blocked)} />
        <Metric label="میانگین آمادگی" value={`${summary.averageReadiness}%`} />
      </div>

      <div className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
        <p className="text-xs font-black text-red-100">اولویت قبل از ورود محتوای سنگین</p>
        <h2 className="mt-2 text-2xl font-black text-warm">{summary.nextItem.title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted">{summary.nextItem.nextAction}</p>
      </div>

      <div className="mt-6 grid gap-5">
        {items.map((item) => {
          const Icon = areaIcon[item.area];

          return (
            <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                      {contentProductionStatusLabels[item.status]}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {item.owner}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.whatWorksNow}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-5 py-4 text-center">
                  <Icon className="mx-auto text-gold-light" size={22} />
                  <p className="mt-2 text-xl font-black text-warm">{item.readiness}%</p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${item.readiness}%` }} />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <Info title="Gap تولید واقعی" body={item.productionGap} />
                <Info title="اقدام بعدی" body={item.nextAction} />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <TokenList title="ENV لازم" items={item.envKeys} />
                <TokenList title="Routeهای مرتبط" items={item.routes} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-2xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/35 p-4">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
    </div>
  );
}

function TokenList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/35 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        <ListChecks size={16} />
        <p className="text-xs font-black">{title}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-gold/10 bg-night/45 px-3 py-2 text-xs font-bold text-warm" dir="ltr">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
