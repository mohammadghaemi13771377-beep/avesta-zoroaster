import type { Metadata } from "next";
import { BellOff, MailCheck, SlidersHorizontal } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { NewsletterPreferencesPanel } from "@/components/newsletter-preferences-panel";
import { getNewsletterSummary } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "تنظیمات خبرنامه روشنایی | AVESTA-ZOROASTER",
  description:
    "مرکز تنظیمات و لغو عضویت خبرنامه روشنایی؛ انتخاب موضوع‌ها، تغییر ایمیل و آماده اتصال به provider ایمیل.",
};

export default function NewsletterPreferencesPage() {
  const summary = getNewsletterSummary();

  return (
    <CinematicHub
      eyebrow="Newsletter Preferences"
      title="تنظیمات خبرنامه روشنایی"
      lead="کاربر باید کنترل کامل داشته باشد: انتخاب موضوع، تغییر ترجیح‌ها و لغو عضویت، با مسیر آماده برای provider واقعی."
      scene="scene-cosmic"
      roman="U"
      actions={[
        { label: "ویرایش تنظیمات", href: "#preferences" },
        { label: "خبرنامه", href: "/newsletter", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.totalTopics}`, label: "موضوع قابل انتخاب" },
        { value: "PUT", label: "ذخیره API" },
        { value: "DELETE", label: "لغو عضویت API" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <article className="lux-frame p-5">
          <SlidersHorizontal className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">کنترل ترجیح‌ها</h2>
          <p className="mt-2 leading-7 text-muted">کاربر موضوع‌های خبرنامه را خودش انتخاب و تغییر می‌دهد.</p>
        </article>
        <article className="lux-frame p-5">
          <BellOff className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">لغو عضویت شفاف</h2>
          <p className="mt-2 leading-7 text-muted">مسیر لغو عضویت از همین حالا در معماری محصول دیده شده است.</p>
        </article>
        <article className="lux-frame p-5">
          <MailCheck className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">آماده provider</h2>
          <p className="mt-2 leading-7 text-muted">API برای اتصال به سرویس ایمیل، preferences و unsubscribe آماده است.</p>
        </article>
      </div>

      <div id="preferences" className="scroll-mt-28">
        <NewsletterPreferencesPanel />
      </div>
    </CinematicHub>
  );
}
