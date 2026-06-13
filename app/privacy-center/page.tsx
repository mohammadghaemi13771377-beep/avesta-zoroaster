import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { PrivacyConsentPanel } from "@/components/privacy-consent-panel";
import { buildDefaultConsent, getConsentSummary } from "@/lib/privacy-consent";

export const metadata: Metadata = {
  title: "مرکز حریم خصوصی | AVESTA-ZOROASTER",
  description: "مرکز رضایت کاربر برای آنالیتیکس، شخصی‌سازی، نورنامه، فروشگاه و تنظیمات ذخیره‌سازی AVESTA-ZOROASTER.",
};

export default function PrivacyCenterPage() {
  const summary = getConsentSummary(buildDefaultConsent());

  return (
    <CinematicHub
      eyebrow="Privacy Center"
      title="مرکز حریم خصوصی"
      lead="اعتماد فقط با منبع معتبر ساخته نمی‌شود؛ کاربر باید بداند چه داده‌ای ذخیره می‌شود و چه چیزی اختیاری است."
      scene="scene-scroll"
      roman="P"
      actions={[
        { label: "تنظیم رضایت", href: "#privacy-consent" },
        { label: "مرکز اعتماد", href: "/trust-center", variant: "secondary" },
      ]}
      stats={[
        { value: String(summary.total), label: "دسته داده" },
        { value: String(summary.optional), label: "اختیاری" },
        { value: "Consent", label: "tracking-aware" },
      ]}
    >
      <div id="privacy-consent" className="scroll-mt-28">
        <PrivacyConsentPanel />
      </div>
    </CinematicHub>
  );
}
