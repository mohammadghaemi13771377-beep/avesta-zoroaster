import type { Metadata } from "next";
import { MailOpen, Send, Sparkles } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { NewsletterEditionBoard } from "@/components/newsletter-edition-board";
import { getNewsletterEditionSummary, newsletterEditions } from "@/lib/newsletter-editions";

export const metadata: Metadata = {
  title: "آرشیو خبرنامه روشنایی | AVESTA-ZOROASTER",
  description:
    "آرشیو شماره‌های خبرنامه روشنایی، شامل شماره‌های نوروز، مهرگان و سده با لینک‌های مطالعه، CTA و وضعیت انتشار.",
};

export default function NewsletterArchivePage() {
  const summary = getNewsletterEditionSummary();

  return (
    <CinematicHub
      eyebrow="Digest Archive"
      title="آرشیو نورنامه"
      lead="شماره‌های خبرنامه مثل یک مجله کوچک فرهنگی سازمان‌دهی می‌شوند: هر شماره پیام، لینک مطالعه، مناسبت، CTA و وضعیت انتشار دارد."
      scene="scene-scroll"
      roman="A"
      actions={[
        { label: "دیدن شماره‌ها", href: "#editions" },
        { label: "پیش‌نمایش ایمیل", href: "/newsletter/preview", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.total}`, label: "شماره نمونه" },
        { value: `${summary.ready}`, label: "آماده ارسال" },
        { value: `${summary.inProgress}`, label: "در حال آماده‌سازی" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <article className="lux-frame p-5">
          <MailOpen className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">مجله کوچک برند</h2>
          <p className="mt-2 leading-7 text-muted">هر شماره یک بسته محتوایی با مسیر مطالعه و CTA است.</p>
        </article>
        <article className="lux-frame p-5">
          <Sparkles className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">وصل به مناسبت‌ها</h2>
          <p className="mt-2 leading-7 text-muted">نورنامه‌ها به نوروز، مهرگان، سده و کمپین‌های فصلی وصل می‌شوند.</p>
        </article>
        <article className="lux-frame p-5">
          <Send className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">آماده ارسال واقعی</h2>
          <p className="mt-2 leading-7 text-muted">بعداً می‌تواند به provider ایمیل، segment و زمان‌بندی وصل شود.</p>
        </article>
      </div>

      <div id="editions" className="scroll-mt-28">
        <NewsletterEditionBoard editions={newsletterEditions} />
      </div>
    </CinematicHub>
  );
}
