"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Mail, MousePointerClick, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { NewsletterEdition } from "@/lib/newsletter-editions";
import { buildNewsletterEmailPreview } from "@/lib/newsletter-templates";

type NewsletterTemplatePreviewProps = {
  editions: NewsletterEdition[];
};

export function NewsletterTemplatePreview({ editions }: NewsletterTemplatePreviewProps) {
  const [activeId, setActiveId] = useState(editions[0]?.id ?? "");
  const activeEdition = useMemo(
    () => editions.find((edition) => edition.id === activeId) ?? editions[0],
    [activeId, editions]
  );
  const preview = useMemo(
    () => (activeEdition ? buildNewsletterEmailPreview(activeEdition) : null),
    [activeEdition]
  );

  if (!preview || !activeEdition) {
    return null;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr]">
      <aside className="lux-frame p-5">
        <div className="flex items-center gap-2 text-gold-light">
          <Mail size={21} />
          <h2 className="text-2xl font-black text-warm">انتخاب شماره</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {editions.map((edition) => (
            <button
              key={edition.id}
              type="button"
              onClick={() => setActiveId(edition.id)}
              className={
                activeEdition.id === edition.id
                  ? "rounded-2xl border border-gold/45 bg-gold/12 p-4 text-right"
                  : "rounded-2xl border border-gold/10 bg-night/55 p-4 text-right transition hover:border-gold/35"
              }
            >
              <span className="text-xs font-bold text-gold-light">{edition.dateLabel}</span>
              <span className="mt-2 block text-xl font-black text-warm">{edition.title}</span>
              <span className="mt-2 block text-sm leading-7 text-muted">{edition.subtitle}</span>
            </button>
          ))}
        </div>
      </aside>

      <article className="lux-frame overflow-hidden p-4 sm:p-7">
        <div className="rounded-[28px] border border-gold/15 bg-[#071521] p-4 shadow-2xl shadow-black/40 sm:p-6">
          <div className="rounded-[24px] border border-gold/15 bg-[#05080D] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/10 pb-5">
              <div>
                <p className="text-xs font-bold text-gold-light">{preview.eyebrow}</p>
                <h2 className="mt-2 text-3xl font-black text-warm">{preview.subject}</h2>
              </div>
              <Sparkles className="text-gold-light" size={25} />
            </div>

            <p className="mt-5 rounded-2xl border border-gold/10 bg-gold/10 p-4 text-sm leading-7 text-gold-light">
              Preheader: {preview.preheader}
            </p>

            <div className={`image-scene ${activeEdition.scene} mt-5 h-56 rounded-[20px] border border-gold/15`} />

            <div className="mt-6">
              <p className="gold-text text-xs font-semibold tracking-[0.22em]">LIGHT DIGEST</p>
              <h1 className="mt-3 text-4xl font-black text-warm">{preview.title}</h1>
              <p className="mt-4 text-base leading-8 text-muted">{preview.intro}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {preview.topicLabels.map((label) => (
                <span key={label} className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              {preview.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-night/55 p-4 text-sm font-bold text-warm transition hover:border-gold/35"
                >
                  {link.label}
                  <ExternalLink size={15} />
                </Link>
              ))}
            </div>

            <Link
              href={preview.cta.href}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-black text-night transition hover:bg-gold-light"
            >
              {preview.cta.label}
              <MousePointerClick size={16} />
            </Link>

            <p className="mt-6 border-t border-gold/10 pt-5 text-xs leading-6 text-muted">{preview.footerNote}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/admin/newsletter" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light">
            پنل ادمین خبرنامه
            <ArrowLeft size={14} />
          </Link>
          <Link href="/api/newsletter/preview" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light">
            API پیش‌نمایش
            <ArrowLeft size={14} />
          </Link>
          <Link href="/api/newsletter/preview?format=html" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light">
            خروجی HTML
            <ArrowLeft size={14} />
          </Link>
        </div>
      </article>
    </section>
  );
}
