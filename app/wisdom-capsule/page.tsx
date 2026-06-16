import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { WisdomCapsulePanel } from "@/components/wisdom-capsule-panel";
import { getWisdomCapsule, getWisdomCapsuleStats } from "@/lib/wisdom-capsule";

export const metadata: Metadata = {
  title: "کپسول خرد امروز | AVESTA-ZOROASTER",
  description: "تجربه سه دقیقه‌ای روزانه شامل پیام اوستا، واژه روز، تمرین اشا و کارت قابل اشتراک.",
};

export default function WisdomCapsulePage() {
  return (
    <CinematicHub
      eyebrow="Wisdom Capsule"
      title="کپسول خرد امروز"
      lead="یک تجربه کوتاه برای روزهای شلوغ: پیام اوستا، واژه روز، تمرین اشا و اشتراک یک جمله طلایی."
      scene="scene-cosmic"
      roman="3"
      actions={[
        { label: "باز کردن کپسول", href: "#capsule" },
        { label: "راهنمای روزانه", href: "/daily-light", variant: "secondary" },
      ]}
      stats={getWisdomCapsuleStats()}
    >
      <div id="capsule" className="scroll-mt-28">
        <WisdomCapsulePanel capsule={getWisdomCapsule()} />
      </div>
    </CinematicHub>
  );
}
