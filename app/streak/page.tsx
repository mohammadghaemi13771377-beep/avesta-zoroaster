import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { DailyStreakPanel } from "@/components/daily-streak-panel";
import { getDailyStreakStats } from "@/lib/daily-streak";

export const metadata: Metadata = {
  title: "زنجیره روشنایی | AVESTA-ZOROASTER",
  description:
    "Daily streak و تقویم عادت روزانه برای ثبت پندار نیک، گفتار نیک، کردار نیک، مأموریت‌ها و استمرار کاربر.",
};

export default function StreakPage() {
  return (
    <CinematicHub
      eyebrow="Daily Streak"
      title="زنجیره روشنایی"
      lead="یک حلقه روزانه برای برگشت کاربر به جهان اوستا: ثبت امروز، تکمیل مأموریت، حفظ استمرار و رشد آرام در مسیر خرد."
      scene="scene-sunrise"
      roman="14"
      actions={[
        { label: "ثبت امروز", href: "#streak" },
        { label: "دفتر روزانه", href: "/reflection", variant: "secondary" },
      ]}
      stats={getDailyStreakStats()}
    >
      <div id="streak" className="scroll-mt-28">
        <DailyStreakPanel />
      </div>
    </CinematicHub>
  );
}
