import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { DailyLightGuidePanel } from "@/components/daily-light-guide-panel";
import { getDailyLightStats } from "@/lib/daily-light-guide";

export const metadata: Metadata = {
  title: "راهنمای روزانه روشنایی | AVESTA-ZOROASTER",
  description: "مسیر کوتاه روزانه برای مطالعه اوستای امروز، تأمل، تمرین اخلاقی، مأموریت خرد و سنجش اشا.",
};

export default function DailyLightPage() {
  return (
    <CinematicHub
      eyebrow="Daily Light Guide"
      title="راهنمای روزانه روشنایی"
      lead="یک مسیر ۱۵ دقیقه‌ای برای اینکه هر روز با خواندن، تأمل، تمرین، مأموریت و نورسنج اشا وارد جهان اوستا شوی."
      scene="scene-fire"
      roman="D"
      actions={[
        { label: "شروع امروز", href: "#daily-light" },
        { label: "کپسول خرد", href: "/wisdom-capsule", variant: "secondary" },
      ]}
      stats={getDailyLightStats()}
    >
      <div id="daily-light" className="scroll-mt-28">
        <DailyLightGuidePanel />
      </div>
    </CinematicHub>
  );
}
