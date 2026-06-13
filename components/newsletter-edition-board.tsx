"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, MailOpen, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { NewsletterEdition, NewsletterEditionStatus } from "@/lib/newsletter-editions";
import { newsletterStatusLabels } from "@/lib/newsletter-editions";
import { newsletterTopics } from "@/lib/newsletter";

type NewsletterEditionBoardProps = {
  editions: NewsletterEdition[];
};

const statuses: Array<{ label: string; value: NewsletterEditionStatus | "all" }> = [
  { label: "همه", value: "all" },
  { label: "آماده", value: "ready" },
  { label: "بازبینی", value: "review" },
  { label: "پیش‌نویس", value: "draft" },
];

export function NewsletterEditionBoard({ editions }: NewsletterEditionBoardProps) {
  const [status, setStatus] = useState<NewsletterEditionStatus | "all">("all");
  const filteredEditions = useMemo(
    () => editions.filter((edition) => status === "all" || edition.status === status),
    [editions, status]
  );

  return (
    <section className="space-y-5">
      <div className="lux-frame flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-2 text-gold-light">
          <MailOpen size={21} />
          <h2 className="text-2xl font-black text-warm">آرشیو نورنامه</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setStatus(item.value)}
              className={
                status === item.value
                  ? "rounded-full bg-gold px-4 py-2 text-xs font-black text-night"
                  : "rounded-full border border-gold/15 bg-night/55 px-4 py-2 text-xs font-bold text-gold-light transition hover:border-gold/40"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {filteredEditions.map((edition) => (
          <article key={edition.id} className="lux-frame overflow-hidden p-4">
            <div className={`image-scene ${edition.scene} h-48 rounded-[18px] border border-gold/15`}>
              <div className="absolute inset-x-5 top-5 flex items-center justify-between text-gold-light">
                <span className="rounded-full border border-gold/25 bg-black/25 px-3 py-1 text-xs font-bold backdrop-blur">
                  {edition.dateLabel}
                </span>
                <Sparkles size={18} />
              </div>
            </div>
            <div className="p-2 pt-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                  {newsletterStatusLabels[edition.status]}
                </span>
                {edition.status === "ready" ? <CheckCircle2 className="text-gold-light" size={16} /> : null}
              </div>
              <h3 className="mt-4 text-2xl font-black text-warm">{edition.title}</h3>
              <p className="mt-2 text-sm font-bold text-gold-light">{edition.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{edition.intro}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {edition.topics.map((topicId) => {
                  const topic = newsletterTopics.find((item) => item.id === topicId);
                  return (
                    <span key={topicId} className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs text-muted">
                      {topic?.label ?? topicId}
                    </span>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-2">
                {edition.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-night/55 p-3 text-sm font-bold text-warm transition hover:border-gold/35"
                  >
                    {link.label}
                    <ArrowLeft size={14} />
                  </Link>
                ))}
              </div>

              <Link
                href={edition.cta.href}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                {edition.cta.label}
                <Send size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
