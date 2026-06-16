import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { PracticeStudioBoard } from "@/components/practice-studio-board";
import { getPracticeStudioPlan, getPracticeStudioSummary } from "@/lib/practice-studio";

export const metadata: Metadata = {
  title: "استاد تمرین اخلاقی | AVESTA-ZOROASTER",
  description: "برنامه هفت‌روزه برای تبدیل پندار نیک، گفتار نیک و کردار نیک به تمرین روزانه در جهان اوستا.",
};

export default function PracticePage() {
  const plan = getPracticeStudioPlan();
  const summary = getPracticeStudioSummary([], plan);

  return (
    <CinematicHub
      eyebrow="Practice Studio"
      title="تمرین زنده پندار، گفتار، کردار"
      lead="یک برنامه هفت‌روزه برای اینکه یکتاپرستی، اشا و پیام گات‌ها فقط خوانده نشوند؛ در تصمیم، گفتار و عمل روزانه تمرین شوند."
      scene="scene-fire"
      roman="7"
      actions={[
        { label: "شروع تمرین", href: "#practice" },
        { label: "نورسنج اشا", href: "/asha-balance", variant: "secondary" },
      ]}
      stats={[
        { value: String(summary.days), label: "روز تمرین" },
        { value: String(summary.totalXp), label: "XP قابل کسب" },
        { value: "۳", label: "پندار، گفتار، کردار" },
      ]}
    >
      <div id="practice" className="scroll-mt-28">
        <PracticeStudioBoard plan={plan} />
      </div>
    </CinematicHub>
  );
}
