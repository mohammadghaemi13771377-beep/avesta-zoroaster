import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { ShareStudioPanel } from "@/components/share-studio-panel";
import { getShareStudioState, getShareStudioStats } from "@/lib/share-studio";

export const metadata: Metadata = {
  title: "استودیوی نقل‌قول طلایی | AVESTA-ZOROASTER",
  description: "ساخت کارت‌های نقل‌قول طلایی از پیام‌های اوستا، گات‌ها و مقاله‌ها برای اشتراک‌گذاری.",
};

export default function ShareStudioPage() {
  return (
    <CinematicHub
      eyebrow="Golden Quote Studio"
      title="کارت طلایی پیام‌های اوستا را بساز"
      lead="پیام‌های کوتاه اوستا، گات‌ها و مقاله‌ها را به کارت‌های تصویری برندشده تبدیل کن؛ آماده کپی، دانلود SVG و اشتراک‌گذاری."
      scene="scene-fire"
      roman="Q"
      actions={[
        { label: "ساخت کارت", href: "#studio" },
        { label: "اوستای امروز", href: "/reflection", variant: "secondary" },
      ]}
      stats={getShareStudioStats()}
    >
      <div id="studio" className="scroll-mt-28">
        <ShareStudioPanel state={getShareStudioState()} />
      </div>
    </CinematicHub>
  );
}
