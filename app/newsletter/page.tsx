import type { Metadata } from "next";
import { Mail, Megaphone, Sparkles } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { getNewsletterSummary } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "خبرنامه روشنایی | AVESTA-ZOROASTER",
  description:
    "عضویت در خبرنامه روشنایی برای دریافت اوستای امروز، مناسبت‌های فرهنگی، مقاله‌های پژوهشی، رسانه و تازه‌های فروشگاه آینده.",
};

export default function NewsletterPage() {
  const summary = getNewsletterSummary();

  return (
    <CinematicHub
      eyebrow="Light Digest"
      title="خبرنامه روشنایی"
      lead="یک ارتباط آرام و ارزشمند با مخاطب: اوستای امروز، مناسبت‌های فرهنگی، مقاله‌های تازه، رسانه و محصولات آینده."
      scene="scene-fire"
      roman="N"
      actions={[
        { label: "عضویت", href: "#newsletter" },
        { label: "تنظیمات عضویت", href: "/newsletter/preferences", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.totalTopics}`, label: "موضوع قابل انتخاب" },
        { value: "محلی", label: "ذخیره فعلی در مرورگر" },
        { value: "API", label: "آماده اتصال به سرویس ایمیل" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <article className="lux-frame p-5">
          <Mail className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">عضویت هوشمند</h2>
          <p className="mt-2 leading-7 text-muted">کاربر موضوع‌هایی را انتخاب می‌کند که واقعاً برایش مهم است.</p>
        </article>
        <article className="lux-frame p-5">
          <Megaphone className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">وصل به کمپین</h2>
          <p className="mt-2 leading-7 text-muted">خبرنامه می‌تواند خروجی استودیوی کمپین فصلی را به مخاطب برساند.</p>
        </article>
        <article className="lux-frame p-5">
          <Sparkles className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">آماده رشد</h2>
          <p className="mt-2 leading-7 text-muted">بعداً به حساب کاربری، segment و email provider وصل می‌شود.</p>
        </article>
      </div>

      <div id="newsletter" className="scroll-mt-28">
        <NewsletterSignup />
      </div>
    </CinematicHub>
  );
}
