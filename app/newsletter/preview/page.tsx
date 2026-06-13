import type { Metadata } from "next";
import { Mail, MousePointerClick, Sparkles } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { NewsletterTemplatePreview } from "@/components/newsletter-template-preview";
import { newsletterEditions } from "@/lib/newsletter-editions";
import { getNewsletterTemplateSummary } from "@/lib/newsletter-templates";

export const metadata: Metadata = {
  title: "پیش‌نمایش قالب ایمیل نورنامه | AVESTA-ZOROASTER",
  description:
    "پیش‌نمایش قالب ایمیل خبرنامه روشنایی با subject، preheader، لینک‌های مطالعه، CTA و footer آماده اتصال به سرویس ایمیل.",
};

export default function NewsletterPreviewPage() {
  const summary = getNewsletterTemplateSummary();

  return (
    <CinematicHub
      eyebrow="Email Preview"
      title="پیش‌نمایش قالب ایمیل نورنامه"
      lead="شماره‌های خبرنامه قبل از ارسال، به شکل ایمیل واقعی دیده می‌شوند؛ از subject و preheader تا لینک‌های مطالعه و CTA."
      scene="scene-fire"
      roman="P"
      actions={[
        { label: "دیدن پیش‌نمایش", href: "#preview" },
        { label: "آرشیو نورنامه", href: "/newsletter/archive", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.total}`, label: "قالب قابل پیش‌نمایش" },
        { value: `${summary.totalLinks}`, label: "لینک محتوایی" },
        { value: `${summary.averageLinks}`, label: "میانگین لینک در هر ایمیل" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <article className="lux-frame p-5">
          <Mail className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">Subject و Preheader</h2>
          <p className="mt-2 leading-7 text-muted">تیم محتوا قبل از ارسال، اولین تجربه مخاطب را می‌بیند.</p>
        </article>
        <article className="lux-frame p-5">
          <MousePointerClick className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">CTA روشن</h2>
          <p className="mt-2 leading-7 text-muted">هر شماره به یک اقدام واضح مثل ثبت نیت یا دیدن کمپین وصل است.</p>
        </article>
        <article className="lux-frame p-5">
          <Sparkles className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">آماده provider</h2>
          <p className="mt-2 leading-7 text-muted">خروجی API می‌تواند بعداً به قالب HTML سرویس ایمیل تبدیل شود.</p>
        </article>
      </div>

      <div id="preview" className="scroll-mt-28">
        <NewsletterTemplatePreview editions={newsletterEditions} />
      </div>
    </CinematicHub>
  );
}
