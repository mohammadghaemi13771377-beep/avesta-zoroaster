import type { Metadata } from "next";
import { CitationBoard } from "@/components/citation-board";
import { CinematicHub } from "@/components/cinematic-hub";
import { getCitationRecords, getCitationSummary } from "@/lib/citations";

export const metadata: Metadata = {
  title: "مرکز ارجاع و منابع پژوهشی | AVESTA-ZOROASTER",
  description:
    "سامانه مدیریت citation، منبع، ترجمه، یادداشت تحریریه و وضعیت بازبینی برای محتوای اوستا، مقاله‌ها و واژه‌نامه.",
};

export default function CitationsPage() {
  const records = getCitationRecords();
  const summary = getCitationSummary(records);

  return (
    <CinematicHub
      eyebrow="Citation Center"
      title="مرکز ارجاع و منابع پژوهشی"
      lead="اینجا نقشه دقیق منابع سایت ساخته می‌شود: هر بند، مقاله و واژه باید بداند به کدام نسخه، ترجمه، کتابخانه یا یادداشت تحریریه تکیه کرده است."
      scene="scene-scroll"
      roman="C"
      actions={[
        { label: "مرکز اعتماد", href: "/trust-center" },
        { label: "روش پژوهش", href: "/research-methodology", variant: "secondary" },
      ]}
      stats={[
        { value: String(summary.total), label: "ارجاع ثبت‌شده" },
        { value: String(summary.verified), label: "تایید شده" },
        { value: String(summary.needsReview), label: "نیازمند بازبینی" },
      ]}
    >
      <CitationBoard records={records} />
    </CinematicHub>
  );
}
