import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { AiArtStudio } from "@/components/ai-art-studio";
import { aiArtStyleRules, getAiArtBriefs, getAiArtStudioStats } from "@/lib/ai-art-studio";

export const metadata: Metadata = {
  title: "استودیوی تصویرسازی AI | AVESTA-ZOROASTER",
  description:
    "استودیوی تولید brief و prompt تصویری برای ساخت تصاویر اختصاصی اوستا، زرتشت، گات‌ها و جهان سینمایی ایران باستان.",
};

export default function AiStudioPage() {
  return (
    <CinematicHub
      eyebrow="AI Art Studio"
      title="استودیوی تصویرسازی جهان اوستا"
      lead="مرکز کنترل سبک بصری سایت؛ هر تصویر قبل از تولید باید brief، پالت، mood، نسبت تصویر، مسیر فایل و چک‌لیست انتشار داشته باشد."
      scene="scene-stone"
      roman="AI"
      actions={[
        { label: "دیدن briefها", href: "#art-studio" },
        { label: "مدیریت رسانه", href: "/admin/media", variant: "secondary" },
      ]}
      stats={getAiArtStudioStats()}
    >
      <div id="art-studio" className="scroll-mt-28">
        <AiArtStudio briefs={getAiArtBriefs()} styleRules={aiArtStyleRules} />
      </div>
    </CinematicHub>
  );
}
