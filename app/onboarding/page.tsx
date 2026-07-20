import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { OnboardingGateway } from "@/components/onboarding-gateway";
import { getOnboardingStats, normalizeOnboardingInput } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "آیین ورود | AVESTA-ZOROASTER",
  description: "Onboarding سینمایی برای انتخاب مسیر شروع در جهان اوستا، گات‌ها، نیایش، تاریخ ایران باستان و یکتاپرستی.",
};

export default function OnboardingPage() {
  return (
    <CinematicHub
      eyebrow="Onboarding"
      title="از کدام دروازه وارد جهان اوستا می‌شوی؟"
      lead="کاربر تازه‌وارد نباید میان ده‌ها بخش گم شود. آیین ورود با چند انتخاب ساده مسیر شروع، ریتم مطالعه و حال‌وهوای تجربه را روشن می‌کند."
      scene="scene-cosmic"
      roman="O"
      actions={[
        { label: "شروع آیین ورود", href: "#gateway" },
        { label: "رفتن به نورخانه", href: "/dashboard", variant: "secondary" },
      ]}
      stats={getOnboardingStats()}
    >
      <div id="gateway" className="onboarding-page scroll-mt-28">
        <OnboardingGateway initialInput={normalizeOnboardingInput()} />
      </div>
    </CinematicHub>
  );
}
