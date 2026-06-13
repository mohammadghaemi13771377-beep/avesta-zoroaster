import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { WisdomGuidePanel } from "@/components/wisdom-guide-panel";
import { getWisdomGuideRecommendation, getWisdomGuideStats, wisdomGuidePrompts } from "@/lib/wisdom-guide";

export const metadata: Metadata = {
  title: "راهنمای خرد اوستا | AVESTA-ZOROASTER",
  description:
    "راهنمای تعاملی و شخصی‌سازی‌شده برای انتخاب مسیر مطالعه اوستا، گات‌ها، واژه‌نامه و پیام اخلاقی روز.",
};

export default function WisdomGuidePage() {
  return (
    <CinematicHub
      eyebrow="Wisdom Guide"
      title="راهنمای خرد اوستا"
      lead="یک مسیر تعاملی برای اینکه کاربر بر اساس حال‌وهوای امروز خود، بند پیشنهادی، واژه‌های کلیدی، مقاله و قدم بعدی دریافت کند."
      scene="scene-cosmic"
      roman="VIII"
      actions={[
        { label: "انتخاب مسیر امروز", href: "#guide" },
        { label: "برنامه مطالعه", href: "/study-plan", variant: "secondary" },
      ]}
      stats={getWisdomGuideStats()}
    >
      <div id="guide" className="scroll-mt-28">
        <WisdomGuidePanel prompts={wisdomGuidePrompts} initialRecommendation={getWisdomGuideRecommendation()} />
      </div>
    </CinematicHub>
  );
}
