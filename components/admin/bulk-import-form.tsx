"use client";

import { CheckCircle2, Clock3, DatabaseZap, Eye, Play, RefreshCw, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { bulkImportExample } from "@/lib/bulk-import-example";

type ImportJobSummary = {
  id: string;
  name: string;
  mode: string;
  status: string;
  contentCount: number;
  mediaCount: number;
  failedCount: number;
  createdAt: string;
  updatedAt?: string;
};

export function BulkImportForm() {
  const [jsonText, setJsonText] = useState(JSON.stringify(bulkImportExample, null, 2));
  const [status, setStatus] = useState("قالب آماده است. ابتدا dryRun را true نگه دار.");
  const [response, setResponse] = useState("");
  const [jobs, setJobs] = useState<ImportJobSummary[]>([]);
  const [jobsStatus, setJobsStatus] = useState("در حال خواندن تاریخچه...");
  const [detailStatus, setDetailStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedState = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText) as { content?: unknown[]; media?: unknown[]; dryRun?: boolean };

      return {
        ok: true,
        contentCount: Array.isArray(parsed.content) ? parsed.content.length : 0,
        mediaCount: Array.isArray(parsed.media) ? parsed.media.length : 0,
        dryRun: parsed.dryRun !== false,
      };
    } catch {
      return {
        ok: false,
        contentCount: 0,
        mediaCount: 0,
        dryRun: true,
      };
    }
  }, [jsonText]);

  const loadJobs = useCallback(async () => {
    try {
      setJobsStatus("در حال خواندن تاریخچه...");
      const apiResponse = await fetch("/api/admin/import", { cache: "no-store" });
      const data = (await apiResponse.json()) as { jobs?: ImportJobSummary[] };
      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      setJobsStatus(Array.isArray(data.jobs) && data.jobs.length > 0 ? "آخرین اجراها آماده است." : "هنوز اجرایی ثبت نشده است.");
    } catch {
      setJobsStatus("تاریخچه فعلاً در دسترس نیست.");
    }
  }, []);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  async function handleImport() {
    if (!parsedState.ok) {
      setStatus("JSON معتبر نیست.");
      return;
    }

    setIsSubmitting(true);
    setStatus("در حال ارسال بسته import...");

    try {
      const apiResponse = await fetch("/api/admin/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonText,
      });
      const data = await apiResponse.json();
      setResponse(JSON.stringify(data, null, 2));
      setDetailStatus("");
      setStatus(data.ok ? "بسته بررسی شد." : "بسته خطا دارد.");
      await loadJobs();
    } catch {
      setStatus("ارسال بسته با خطا روبه‌رو شد.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleInspectJob(id: string) {
    try {
      setDetailStatus("در حال خواندن جزئیات...");
      const apiResponse = await fetch(`/api/admin/import/${id}`, { cache: "no-store" });
      const data = await apiResponse.json();
      setResponse(JSON.stringify(data, null, 2));
      setDetailStatus(data.ok ? "جزئیات اجرا نمایش داده شد." : "جزئیات پیدا نشد.");
    } catch {
      setDetailStatus("خواندن جزئیات با خطا روبه‌رو شد.");
    }
  }

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[18px] border border-gold/15 bg-night/65 p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <DatabaseZap size={20} />
          <h2 className="text-2xl font-black">ورود دسته‌ای محتوا</h2>
        </div>
        <p className="mt-3 leading-8 text-muted">
          برای وارد کردن حجم زیاد متن و رسانه، JSON را اینجا بگذار. در حالت dry-run چیزی ذخیره نمی‌شود و فقط اعتبار بسته بررسی می‌شود.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <MetricPill label="content" value={parsedState.contentCount} />
          <MetricPill label="media" value={parsedState.mediaCount} />
          <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-muted">
            {parsedState.dryRun ? "dry-run" : "import"}
          </span>
        </div>
        <textarea
          dir="ltr"
          value={jsonText}
          onChange={(event) => setJsonText(event.target.value)}
          rows={24}
          className="mt-5 w-full rounded-2xl border border-gold/20 bg-royal p-4 text-left font-mono text-xs leading-6 text-warm outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={handleImport}
          disabled={isSubmitting}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Play size={18} />
          {isSubmitting ? "در حال اجرا..." : "بررسی / Import"}
        </button>
        <p className="mt-3 text-sm text-muted">{status}</p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-warm">تاریخچه Import</h2>
              <p className="mt-2 text-sm text-muted">{jobsStatus}</p>
            </div>
            <button
              type="button"
              onClick={() => void loadJobs()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-gold-light transition hover:bg-gold/10"
              aria-label="تازه‌سازی تاریخچه"
            >
              <RefreshCw size={17} />
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {jobs.length === 0 ? (
              <div className="rounded-2xl border border-gold/10 bg-night/55 p-4 text-sm leading-7 text-muted">
                بعد از اتصال دیتابیس و اجرای dry-run یا import، رکوردهای این بخش نمایش داده می‌شوند.
              </div>
            ) : (
              jobs.map((job) => <ImportJobCard key={job.id} job={job} onInspect={handleInspectJob} />)
            )}
          </div>
        </div>

        <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
          <h2 className="text-2xl font-black text-warm">خروجی API و جزئیات</h2>
          {detailStatus ? <p className="mt-2 text-sm text-muted">{detailStatus}</p> : null}
          <pre
            className="mt-5 max-h-[460px] overflow-auto rounded-2xl border border-gold/10 bg-night/80 p-4 text-left text-xs leading-6 text-gold-light"
            dir="ltr"
          >
            {response || "Run an import to see the API response."}
          </pre>
        </div>
      </div>
    </section>
  );
}

function ImportJobCard({ job, onInspect }: { job: ImportJobSummary; onInspect: (id: string) => void }) {
  const isSuccess = job.status === "SUCCESS";
  const Icon = isSuccess ? CheckCircle2 : XCircle;
  const createdAt = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(job.createdAt));
  const updatedAt = job.updatedAt
    ? new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(job.updatedAt))
    : null;

  return (
    <article className="rounded-2xl border border-gold/10 bg-night/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-black text-warm">{job.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted">
            <Clock3 size={14} />
            <span>{createdAt}</span>
          </div>
          {updatedAt ? <p className="mt-1 text-xs text-muted">آخرین تغییر: {updatedAt}</p> : null}
        </div>
        <span
          className={
            isSuccess
              ? "inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200"
              : "inline-flex items-center gap-1 rounded-full border border-red-400/25 bg-red-400/10 px-3 py-1 text-xs font-bold text-red-200"
          }
        >
          <Icon size={14} />
          {job.status}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
        <Metric label="mode" value={job.mode} />
        <Metric label="content" value={job.contentCount} />
        <Metric label="media" value={job.mediaCount} />
        <Metric label="failed" value={job.failedCount} />
      </div>
      <button
        type="button"
        onClick={() => onInspect(job.id)}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10"
      >
        <Eye size={14} />
        جزئیات اجرا
      </button>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-gold/10 bg-royal/45 px-2 py-3">
      <p className="text-muted">{label}</p>
      <p className="mt-1 font-black text-gold-light">{value}</p>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 font-bold text-gold-light">
      {label}: {value}
    </span>
  );
}
