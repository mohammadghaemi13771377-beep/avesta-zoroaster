"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, CircleDashed, Filter, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";
import type { EditorialCommandTask, EditorialTask } from "@/lib/editorial-workflow";
import { getEditorialCommandSummary } from "@/lib/editorial-workflow";

type EditorialCommandCenterProps = {
  tasks: EditorialCommandTask[];
};

const allLabel = "همه";

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

export function EditorialCommandCenter({ tasks }: EditorialCommandCenterProps) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState(allLabel);
  const [priority, setPriority] = useState(allLabel);
  const summary = useMemo(() => getEditorialCommandSummary(tasks), [tasks]);

  const filteredTasks = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return tasks.filter((task) => {
      const matchesStage = stage === allLabel || task.stage === stage;
      const matchesPriority = priority === allLabel || task.priority === priority;
      const haystack = normalizeSearchText(
        `${task.title} ${task.area} ${task.owner} ${task.reviewer} ${task.blocker} ${task.nextAction} ${task.checklist
          .map((item) => item.label)
          .join(" ")}`
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesStage && matchesPriority && matchesQuery;
    });
  }, [priority, query, stage, tasks]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">EDITORIAL COMMAND</p>
          <h2 className="mt-3 text-3xl font-black text-warm">مرکز فرماندهی تحریریه</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            اینجا تیم محتوا، پژوهش، رسانه و SEO می‌بینند هر کار دقیقا کجاست، چه چیزی مانع انتشار است و چه کسی باید تایید کند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="آمادگی" value={`${summary.averageReadiness}%`} />
          <Metric label="چک‌لیست" value={`${summary.checklistProgress}%`} />
          <Metric label="Blocker" value={String(summary.blocked)} />
          <Metric label="ریسک فوری" value={String(summary.overdueRisk)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_190px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در وظیفه، مالک، بازبین، blocker و قدم بعدی"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={stage}
          onChange={(event) => setStage(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(stageLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(priorityLabels).map(([value, label]) => (
            <option key={value} value={value}>
              اولویت {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredTasks.map((task) => (
          <article key={task.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{stageLabels[task.stage]}</Badge>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityClass[task.priority]}`}>
                    اولویت {priorityLabels[task.priority]}
                  </span>
                  <Badge>{task.area}</Badge>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{task.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{task.nextAction}</p>
              </div>
              <Link
                href={task.href}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                باز کردن
                <ArrowLeft size={16} />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <div className="grid gap-3 text-sm">
                  <Info label="مالک" value={task.owner} />
                  <Info label="بازبین" value={task.reviewer} />
                  <Info label="هدف انتشار" value={task.publishTarget} />
                  <Info label="ددلاین" value={task.deadline} icon />
                </div>
                <div className="mt-4 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-3">
                  <div className="flex items-center gap-2 text-orange-100">
                    <ShieldAlert size={16} />
                    <p className="text-xs font-black">Blocker</p>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted">{task.blocker}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 text-xs font-bold text-muted">
                  <span>آمادگی انتشار</span>
                  <span>{task.readiness}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${task.readiness}%` }} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {task.checklist.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-gold/10 bg-black/18 p-3">
                      <div className="flex items-center gap-2">
                        {item.done ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                        ) : (
                          <CircleDashed className="h-4 w-4 text-muted" />
                        )}
                        <p className={item.done ? "text-sm font-bold text-emerald-100" : "text-sm font-bold text-muted"}>
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
      <Filter size={12} />
      {children}
    </span>
  );
}

function Info({ label, value, icon = false }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/10 bg-night/45 px-3 py-2">
      <span className="inline-flex items-center gap-1 text-muted">
        {icon ? <CalendarDays size={13} /> : null}
        {label}
      </span>
      <span className="font-bold text-gold-light">{value}</span>
    </div>
  );
}
