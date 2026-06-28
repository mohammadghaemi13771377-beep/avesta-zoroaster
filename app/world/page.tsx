import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { WorldMapBoard } from "@/components/world-map-board";
import { getWorldMapSummary, worldRealms } from "@/lib/world-map";

const publicRealms = worldRealms.filter((realm) => realm.id !== "admin-ops");
const summary = getWorldMapSummary(publicRealms);

export const metadata: Metadata = {
  title: "نقشه جهان دیجیتال اوستا | AVESTA-ZOROASTER",
  description:
    "نقشه قلمروهای جهان دیجیتال AVESTA-ZOROASTER؛ اوستا، تجربه مطالعه، دانش، رسانه، مناسبت‌ها و فروشگاه فرهنگی.",
};

export default function WorldPage() {
  return (
    <CinematicHub
      eyebrow="Digital World"
      title="نقشه جهان AVESTA-ZOROASTER"
      lead="اینجا سایت فقط مجموعه‌ای از صفحه‌ها نیست؛ یک جهان چندقلمرویی است که از متن اوستا تا مطالعه، رسانه، مناسبت‌ها و فروشگاه فرهنگی امتداد دارد."
      scene="scene-cosmic"
      roman="W"
      actions={[
        { label: "ورود به قلمرو اوستا", href: "/avesta" },
        { label: "نمایشگاه‌ها", href: "/exhibitions", variant: "secondary" },
      ]}
      stats={[
        { value: String(summary.realms), label: "قلمرو اصلی" },
        { value: String(summary.live), label: "قلمرو زنده" },
        { value: `${summary.averageCompletion}%`, label: "میانگین تکامل جهان" },
      ]}
    >
      <WorldMapBoard realms={publicRealms} />
    </CinematicHub>
  );
}
