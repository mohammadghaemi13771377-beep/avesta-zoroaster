"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Filter, MailCheck, MailOpen, Search, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { NewsletterEdition, NewsletterEditionStatus } from "@/lib/newsletter-editions";
import { getNewsletterEditionSummary, newsletterStatusLabels } from "@/lib/newsletter-editions";
import type { NewsletterTopic } from "@/lib/newsletter";
import { newsletterTopics } from "@/lib/newsletter";
import { normalizeSearchText } from "@/lib/search";

type NewsletterCommandBoardProps = {
  editions: NewsletterEdition[];
};

const allLabel = "همه";

const statusClass: Record<NewsletterEditionStatus, string> = {
  draft: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  review: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

export function NewsletterCommandBoard({ editions }: NewsletterCommandBoardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(allLabel);
  const [topic, setTopic] = useState(allLabel);
  const summary = useMemo(() => getNewsletterEditionSummary(editions), [editions]);

  const filteredEditions = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return editions.filter((edition) => {
      const matchesStatus = status === allLabel || edition.status === status;
      const matchesTopic = topic === allLabel || edition.topics.includes(topic as NewsletterTopic);
      const haystack = normalizeSearchText(
        `${edition.title} ${edition.subtitle} ${edition.intro} ${edition.dateLabel} ${edition.links
          .map((link) => link.label)
          .join(" ")}`
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesStatus && matchesTopic && matchesQuery;
    });
  }, [editions, query, status, topic]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">NEWSLETTER COMMAND</p>
          <h2 className="mt-3 text-3xl font-black text-warm">پنل ادمین خبرنامه روشنایی</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد شماره‌های نورنامه، وضعیت آماده‌سازی، موضوع‌ها، CTA و لینک‌های هر شماره را برای تیم محتوا
            قابل کنترل می‌کند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="شماره‌ها" value={String(summary.total)} />
          <Metric label="آماده" value={String(summary.ready)} />
          <Metric label="در جریان" value={String(summary.inProgress)} />
          <Metric label="موضوع‌ها" value={String(summary.topicUsage.length)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در عنوان، مقدمه، لینک‌ها یا مناسبت"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(newsletterStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {newsletterTopics.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredEditions.map((edition) => (
          <article key={edition.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{edition.dateLabel}</Badge>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[edition.status]}`}>
                    {newsletterStatusLabels[edition.status]}
                  </span>
                  {edition.status === "ready" ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-100">
                      <CheckCircle2 size={13} />
                      قابل ارسال
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{edition.title}</h3>
                <p className="mt-2 text-sm font-bold text-gold-light">{edition.subtitle}</p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{edition.intro}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <MailOpen className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-sm font-black text-warm">{edition.topics.length} موضوع</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <Info label="CTA" value={edition.cta.label} />
                <Info label="مسیر CTA" value={edition.cta.href} />
                <Link
                  href={edition.cta.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  باز کردن CTA
                  <ArrowLeft size={16} />
                </Link>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {edition.topics.map((topicId) => {
                    const currentTopic = newsletterTopics.find((item) => item.id === topicId);
                    return (
                      <span key={topicId} className="rounded-full border border-gold/10 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                        {currentTopic?.label ?? topicId}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  {edition.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl border border-gold/10 bg-royal/45 p-3 text-sm font-bold text-warm transition hover:border-gold/40"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <Link href="/newsletter/archive" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <Sparkles className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">مشاهده آرشیو عمومی</h3>
          <p className="mt-2 text-sm leading-7 text-muted">نسخه‌ای که کاربرها و تیم محتوا از شماره‌های نورنامه می‌بینند.</p>
        </Link>
        <Link href="/admin/newsletter/analytics" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Sparkles className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">آنالیتیکس خبرنامه</h3>
          <p className="mt-2 text-sm leading-7 text-muted">نرخ باز شدن، کلیک، تبدیل و لغو عضویت برای تصمیم محصول.</p>
        </Link>
        <Link href="/admin/newsletter/experiments" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Sparkles className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">A/B آزمایش</h3>
          <p className="mt-2 text-sm leading-7 text-muted">مقایسه subject، preheader و CTA برای انتخاب نسخه برنده.</p>
        </Link>
        <Link href="/admin/newsletter/send-times" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Sparkles className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">زمان ارسال</h3>
          <p className="mt-2 text-sm leading-7 text-muted">پیشنهاد بهترین روز و ساعت ارسال برای هر نورنامه.</p>
        </Link>
        <Link href="/admin/newsletter/schedule" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Send className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">صف ارسال</h3>
          <p className="mt-2 text-sm leading-7 text-muted">تقویم عملیاتی ارسال، مالک، ریسک و چک‌لیست نهایی.</p>
        </Link>
        <Link href="/admin/newsletter/delivery" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <MailCheck className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">پایش تحویل</h3>
          <p className="mt-2 text-sm leading-7 text-muted">Delivery، bounce، complaint، retry و eventهای ارسال.</p>
        </Link>
        <Link href="/newsletter/preview" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Send className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">پیش‌نمایش قالب ایمیل</h3>
          <p className="mt-2 text-sm leading-7 text-muted">دیدن subject، preheader، لینک‌ها و CTA قبل از اتصال به provider.</p>
        </Link>
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 rounded-xl border border-gold/10 bg-night/45 px-3 py-2">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-gold-light">{value}</p>
    </div>
  );
}
