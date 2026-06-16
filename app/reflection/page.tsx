import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { DailyReflectionJournal } from "@/components/daily-reflection-journal";
import { getReflectionStats } from "@/lib/daily-reflection";

export const metadata: Metadata = {
  title: "دفتر پندار، گفتار، کردار | AVESTA-ZOROASTER",
  description:
    "دفتر روزانه پندار نیک، گفتار نیک و کردار نیک برای ثبت نیت، گفتار آگاهانه و عمل اخلاقی روز.",
};

export default function ReflectionPage() {
  return (
    <CinematicHub
      eyebrow="Daily Reflection"
      title="دفتر پندار، گفتار، کردار"
      lead="یک ritual روزانه برای تبدیل پیام اوستا به عمل: هر روز یک پندار روشن، یک گفتار نیک و یک کردار کوچک اما واقعی ثبت کن."
      scene="scene-fire"
      roman="3"
      actions={[
        { label: "ثبت امروز", href: "#reflection" },
        { label: "برنامه تمرین", href: "/practice", variant: "secondary" },
      ]}
      stats={getReflectionStats()}
    >
      <div id="reflection" className="scroll-mt-28">
        <DailyReflectionJournal />
      </div>
    </CinematicHub>
  );
}
