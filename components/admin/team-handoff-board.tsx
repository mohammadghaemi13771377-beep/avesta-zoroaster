import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, ClipboardList, FileText, UsersRound } from "lucide-react";
import type { TeamHandoffItem, TeamHandoffStatus } from "@/lib/team-handoff";
import { getTeamHandoffSummary, teamHandoffStatusLabels } from "@/lib/team-handoff";

type TeamHandoffBoardProps = {
  items: TeamHandoffItem[];
};

const statusClass: Record<TeamHandoffStatus, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  needs_setup: "border-gold/20 bg-gold/10 text-gold-light",
  needs_content: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export function TeamHandoffBoard({ items }: TeamHandoffBoardProps) {
  const summary = getTeamHandoffSummary(items);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">TEAM HANDOFF</p>
          <h2 className="mt-3 text-3xl font-black text-warm">کنسول تحویل به تیم‌ها</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نسخه عملیاتی سند تحویل است: هر تیم مأموریت، مسیرهای مهم، سندهای لازم و خروجی‌های قبل از لانچ را می‌بیند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="تیم" value={String(summary.teams)} />
          <Metric label="آماده" value={String(summary.ready)} />
          <Metric label="Setup" value={String(summary.needsSetup)} />
          <Metric label="Content" value={String(summary.needsContent)} />
          <Metric label="خروجی" value={String(summary.deliverables)} />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 text-gold-light">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-muted">سند مادر تحویل</p>
              <h3 className="mt-1 text-xl font-black text-warm">docs/team-delivery-master.md</h3>
            </div>
          </div>
          <Link
            href="/api/admin/team-handoff"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
          >
            API تحویل
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {items.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                    {teamHandoffStatusLabels[item.status]}
                  </span>
                  <span className="rounded-full border border-gold/10 bg-royal/60 px-3 py-1 text-xs font-black text-warm">
                    {item.owner}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{item.team}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.mission}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <UsersRound className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-sm font-black text-warm">{item.deliverables.length} خروجی</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <div className="flex items-center gap-2 text-gold-light">
                  <FileText size={17} />
                  <p className="text-sm font-black">سندهای لازم</p>
                </div>
                <div className="mt-3 grid gap-2">
                  {item.keyDocs.map((doc) => (
                    <p key={doc} className="rounded-xl border border-gold/10 bg-night/45 px-3 py-2 text-sm font-bold leading-6 text-warm">
                      {doc}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <div className="flex items-center gap-2 text-gold-light">
                  <ClipboardList size={17} />
                  <p className="text-sm font-black">خروجی‌ها</p>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {item.deliverables.map((deliverable) => (
                    <p key={deliverable} className="rounded-xl border border-gold/10 bg-night/45 px-3 py-2 text-sm font-bold leading-6 text-warm">
                      {deliverable}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-2 md:grid-cols-3">
              {item.keyRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="rounded-2xl border border-gold/10 bg-royal/45 p-3 text-sm font-bold text-warm transition hover:border-gold/40"
                >
                  {route.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-gold-light">
                <CheckCircle2 size={17} />
                <span className="text-sm font-black">Next Action</span>
              </div>
              <p className="max-w-3xl text-sm font-bold leading-7 text-muted">{item.nextAction}</p>
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
