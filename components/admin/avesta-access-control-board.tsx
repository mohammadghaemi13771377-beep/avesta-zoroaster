"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, Search, ShieldCheck } from "lucide-react";
import type { getAvestaAccessPolicy } from "@/lib/avesta-access-control";
import { normalizeSearchText } from "@/lib/search";

type AccessPolicy = ReturnType<typeof getAvestaAccessPolicy>;

type AvestaAccessControlBoardProps = {
  policy: AccessPolicy;
};

export function AvestaAccessControlBoard({ policy }: AvestaAccessControlBoardProps) {
  const [query, setQuery] = useState("");
  const summary = {
    routes: policy.length,
    anonymous: policy.filter((item) => item.anonymous.allowed).length,
    reader: policy.filter((item) => item.reader.allowed).length,
    editor: policy.filter((item) => item.editor.allowed).length,
  };

  const filteredPolicy = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return policy.filter((item) => {
      const haystack = normalizeSearchText(
        `${item.route} ${item.anonymous.visibility} ${item.anonymous.requiredRole} ${item.anonymous.reason} ${item.reader.reason} ${item.editor.reason}`,
      );

      return !normalized || haystack.includes(normalized);
    });
  }, [policy, query]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA ACCESS CONTROL</p>
          <h2 className="mt-3 text-3xl font-black text-warm">گارد دسترسی اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نشان می‌دهد هر مسیر اوستا برای کاربر ناشناس، خواننده، ادیتور و ادمین مجاز است یا نه. همین policy
            به middleware وصل شده تا مسیرهای beta/internal/hidden کنترل شوند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Route" value={String(summary.routes)} />
          <Metric label="Anonymous" value={String(summary.anonymous)} />
          <Metric label="Reader" value={String(summary.reader)} />
          <Metric label="Editor" value={String(summary.editor)} />
        </div>
      </div>

      <label className="relative mt-6 block">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجو در مسیر، visibility، نقش لازم یا دلیل دسترسی"
          className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
        />
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/admin/avesta-feature-flags" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          Feature Flags
          <ArrowLeft size={16} />
        </Link>
        <Link href="/admin/route-visibility" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          Route Visibility
          <ShieldCheck size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredPolicy.map((item) => (
          <article key={item.route} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-warm" dir="ltr">{item.route}</h3>
                <p className="mt-2 text-sm font-bold text-gold-light">{item.anonymous.visibility}</p>
              </div>
              <LockKeyhole className="text-gold-light" size={24} />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Decision label="Anonymous" allowed={item.anonymous.allowed} reason={item.anonymous.reason} />
              <Decision label="Reader" allowed={item.reader.allowed} reason={item.reader.reason} />
              <Decision label="Editor" allowed={item.editor.allowed} reason={item.editor.reason} />
              <Decision label="Admin" allowed={item.admin.allowed} reason={item.admin.reason} />
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

function Decision({ label, allowed, reason }: { label: string; allowed: boolean; reason: string }) {
  return (
    <div className={`rounded-2xl border p-4 ${allowed ? "border-emerald-300/20 bg-emerald-300/10" : "border-orange-300/20 bg-orange-300/10"}`}>
      <p className="text-xs font-black text-muted">{label}</p>
      <p className={`mt-1 text-lg font-black ${allowed ? "text-emerald-100" : "text-orange-100"}`}>{allowed ? "ALLOW" : "DENY"}</p>
      <p className="mt-2 text-xs leading-6 text-warm">{reason}</p>
    </div>
  );
}
