import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, MailCheck, ShieldCheck } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { getNewsletterTemplateSummary } from "@/lib/newsletter-templates";

export const metadata: Metadata = {
  title: "خروجی HTML ایمیل نورنامه | AVESTA-ZOROASTER",
  description:
    "راهنمای خروجی HTML ایمیل خبرنامه روشنایی برای اتصال به سرویس‌های ایمیل، تست ارسال و قالب‌های آماده provider.",
};

export default function NewsletterHtmlExportPage() {
  const summary = getNewsletterTemplateSummary();

  return (
    <CinematicHub
      eyebrow="Email HTML Export"
      title="خروجی HTML ایمیل نورنامه"
      lead="این بخش راهنمای اتصال پیش‌نمایش نورنامه به سرویس‌های ایمیل است؛ خروجی HTML با CSS ساده و inline برای provider آماده می‌شود."
      scene="scene-scroll"
      roman="H"
      actions={[
        { label: "دریافت JSON + HTML", href: "/api/newsletter/preview?format=html" },
        { label: "پیش‌نمایش ایمیل", href: "/newsletter/preview", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.total}`, label: "قالب HTML" },
        { value: `${summary.totalLinks}`, label: "لینک خروجی" },
        { value: "Inline", label: "سبک ایمیل" },
      ]}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <article className="lux-frame p-6">
          <Code2 className="text-gold-light" size={28} />
          <h2 className="mt-4 text-2xl font-black text-warm">Endpoint آماده</h2>
          <p className="mt-3 leading-8 text-muted">
            با مسیر `/api/newsletter/preview?format=html`، هر شماره همراه HTML آماده provider برمی‌گردد.
          </p>
          <Link href="/api/newsletter/preview?format=html" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
            باز کردن API
            <ArrowLeft size={15} />
          </Link>
        </article>
        <article className="lux-frame p-6">
          <MailCheck className="text-gold-light" size={28} />
          <h2 className="mt-4 text-2xl font-black text-warm">قابل تست ارسال</h2>
          <p className="mt-3 leading-8 text-muted">
            خروجی شامل subject، preheader و HTML است تا تیم بتواند test send را در provider انجام دهد.
          </p>
        </article>
        <article className="lux-frame p-6">
          <ShieldCheck className="text-gold-light" size={28} />
          <h2 className="mt-4 text-2xl font-black text-warm">قدم production</h2>
          <p className="mt-3 leading-8 text-muted">
            در مرحله واقعی باید unsubscribe، analytics tag، preference link و double opt-in به قالب اضافه شود.
          </p>
        </article>
      </div>
    </CinematicHub>
  );
}
