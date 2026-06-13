import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { AchievementHallPanel } from "@/components/achievement-hall-panel";
import { getAchievementHallStats } from "@/lib/achievement-hall";

export const metadata: Metadata = {
  title: "تالار نشان‌ها | AVESTA-ZOROASTER",
  description: "Achievement Hall برای نمایش نشان‌ها، پیشرفت، سطح کاربر و مسیر وفادارسازی در جهان اوستا.",
};

export default function AchievementsPage() {
  return (
    <CinematicHub
      eyebrow="Achievement Hall"
      title="نشان‌های مسیر روشنایی را باز کن"
      lead="هر مطالعه، یادداشت، بوکمارک، کارت طلایی و قدم از مسیر شخصی می‌تواند به یک نشان تبدیل شود؛ آرام، محترمانه و الهام‌بخش."
      scene="scene-cosmic"
      roman="A"
      actions={[
        { label: "دیدن نشان‌ها", href: "#achievements" },
        { label: "مأموریت‌ها", href: "/quests", variant: "secondary" },
      ]}
      stats={getAchievementHallStats()}
    >
      <div id="achievements" className="scroll-mt-28">
        <AchievementHallPanel />
      </div>
    </CinematicHub>
  );
}
