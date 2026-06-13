"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Filter, Flame, ListChecks } from "lucide-react";
import { useMemo, useState } from "react";
import type { EditorialTask } from "@/lib/editorial-workflow";
import { getEditorialSummary } from "@/lib/editorial-workflow";

type EditorialWorkflowBoardProps = {
  tasks: EditorialTask[];
};

const stageLabels: Record<EditorialTask["stage"], string> = {
  content: "محتوا",
  review: "بازبینی",
  media: "رسانه",
  seo: "SEO",
  ready: "آماده",
};

const priorityLabels: Record<EditorialTask["priority"], string> = {
  high: "بالا",
  medium: "متوسط",
  low: "پایین",
};

const priorityClass: Record<EditorialTask["priority"], string> = {
  high: "border-red-300/25 bg-red-300/10 text-red-100",
  medium: "border-gold/20 bg-gold/10 text-gold-light",
  low: "border-warm/10 bg-warm/5 text-muted",
};

export function EditorialWorkflowBoard({ tasks }: EditorialWorkflowBoardProps) {
  const [stage, setStage] = useState<"all" | EditorialTask["stage"]>("all");
  const filteredTasks = useMemo(
    () => (stage === "all" ? tasks : tasks.filter((task) => task.stage === stage)),
    [stage, tasks]
  );
  const summary = useMemo(() => getEditorialSummary(tasks), [tasks]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <ListChecks size={21} />
            <h2 className="text-2xl font-black">گردش‌کار انتشار و بازبینی</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            این بخش نشان می‌دهد کدام قسمت‌های پروژه هنوز به متن، رسانه، منبع، بازبینی یا SEO نیاز دارند.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Metric label="آمادگی" value={`${summary.averageReadiness}%`} />
          <Metric label="اولویت بالا" value={`${summary.highPriorityCount}`} />
          <Metric label="کل وظایف" value={`${summary.total}`} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "content", "review", "media", "seo", "ready"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStage(item)}
            className={
              stage === item
                ? "inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night"
                : "inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10"
            }
          >
            <Filter size={13} />
            {item === "all" ? "همه" : stageLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {filteredTasks.map((task) => (
          <article key={task.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    {stageLabels[task.stage]}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityClass[task.priority]}`}>
                    اولویت {priorityLabels[task.priority]}
                  </span>
                  <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                    {task.owner}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{task.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{task.nextAction}</p>
              </div>
              <Link
                href={task.href}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-black text-gold-light transition hover:bg-gold/10"
              >
                باز کردن
                <ArrowLeft size={15} />
              </Link>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3 text-xs font-bold text-muted">
                <span className="inline-flex items-center gap-1">
                  {task.readiness >= 85 ? <CheckCircle2 size={14} /> : <Flame size={14} />}
                  آمادگی انتشار
                </span>
                <span>{task.readiness}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${task.readiness}%` }} />
              </div>
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
