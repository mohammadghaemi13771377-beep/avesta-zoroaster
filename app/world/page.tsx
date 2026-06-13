import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { WorldMapBoard } from "@/components/world-map-board";
import { getWorldMapSummary, worldRealms } from "@/lib/world-map";

const summary = getWorldMapSummary();

export const metadata: Metadata = {
  title: "نقشه جهان دیجیتال اوستا | AVESTA-ZOROASTER",
  description:
    "نقشه قلمروهای جهان دیجیتال AVESTA-ZOROASTER؛ اوستا، تجربه مطالعه، دانش، رسانه، مناسبت‌ها، فروشگاه و عملیات ادمین.",
};

export default function WorldPage() {
  return (
    <CinematicHub
      eyebrow="Digital World"
      title="نقشه جهان AVESTA-ZOROASTER"
      lead="اینجا کاربر و تیم محصول می‌بینند سایت فقط مجموعه‌ای از صفحه‌ها نیست؛ یک جهان چندقلمرویی است که از متن اوستا تا مطالعه، رسانه، کمپین، فروشگاه و عملیات ادمین امتداد دارد."
      scene="scene-cosmic"
      roman="W"
      actions={[
        { label: "ورود به قلمرو اوستا", href: "/avesta" },
        { label: "دیدن قفل‌های لانچ", href: "/admin#launch-readiness", variant: "secondary" },
      ]}
      stats={[
        { value: String(summary.realms), label: "قلمرو اصلی" },
        { value: String(summary.live), label: "قلمرو زنده" },
        { value: `${summary.averageCompletion}%`, label: "میانگین تکامل جهان" },
      ]}
    >
      <WorldMapBoard realms={worldRealms} />
    </CinematicHub>
  );
}
