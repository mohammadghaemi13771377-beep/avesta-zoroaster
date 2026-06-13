import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { LearningQuestBoard } from "@/components/learning-quest-board";
import { learningQuests } from "@/lib/learning-quests";

export const metadata: Metadata = {
  title: "مأموریت‌های خرد | AVESTA-ZOROASTER",
  description:
    "سیستم مأموریت، XP، badge و مسیرهای مرحله‌ای برای مطالعه اوستا، گات‌ها، واژه‌نامه، منابع و رسانه.",
};

export default function QuestsPage() {
  return (
    <CinematicHub
      eyebrow="Learning Quests"
      title="مأموریت‌های خرد و مسیر پیشرفت"
      lead="یک لایه بازی‌وار و محترمانه برای مطالعه اوستا: کاربر مأموریت کامل می‌کند، XP می‌گیرد، badge می‌سازد و قدم‌به‌قدم در جهان اوستا جلو می‌رود."
      scene="scene-sunrise"
      roman="Q"
      actions={[
        { label: "شروع مأموریت‌ها", href: "#quests" },
        { label: "برنامه مطالعه", href: "/study-plan", variant: "secondary" },
      ]}
      stats={[
        { value: String(learningQuests.length), label: "مأموریت فعال" },
        { value: "XP", label: "پیشرفت و سطح کاربر" },
        { value: "Badge", label: "نشان‌های مطالعه" },
      ]}
    >
      <div id="quests" className="scroll-mt-28">
        <LearningQuestBoard quests={learningQuests} />
      </div>
    </CinematicHub>
  );
}
