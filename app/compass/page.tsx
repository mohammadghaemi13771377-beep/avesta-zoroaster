import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { WisdomCompassPanel } from "@/components/wisdom-compass-panel";
import { getWisdomCompassStats } from "@/lib/wisdom-compass";

export const metadata: Metadata = {
  title: "قطب‌نمای خرد | AVESTA-ZOROASTER",
  description:
    "سیستم پیشنهاد هوشمند مسیر بعدی کاربر بر اساس مطالعه، استمرار، مأموریت‌ها، یادداشت‌ها و جستجوهای ذخیره‌شده.",
};

export default function CompassPage() {
  return (
    <CinematicHub
      eyebrow="Wisdom Compass"
      title="قطب‌نمای خرد"
      lead="لایه پیشنهاد هوشمند برای اینکه کاربر همیشه بداند قدم بعدی در جهان اوستا چیست: خواندن، تأمل، مأموریت، پژوهش یا اشتراک."
      scene="scene-cosmic"
      roman="2"
      actions={[
        { label: "دیدن پیشنهادها", href: "#compass" },
        { label: "نورخانه", href: "/dashboard", variant: "secondary" },
      ]}
      stats={getWisdomCompassStats()}
    >
      <div id="compass" className="scroll-mt-28">
        <WisdomCompassPanel />
      </div>
    </CinematicHub>
  );
}
