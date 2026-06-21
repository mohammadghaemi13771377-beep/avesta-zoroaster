import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { ReadingRoomLab } from "@/components/reading-room-lab";
import { ReadingQueuePanel } from "@/components/reading-queue-panel";
import { getReadingRoomPresets, getReadingRoomStats } from "@/lib/reading-room";

export const metadata: Metadata = {
  title: "تالار مطالعه زنده | AVESTA-ZOROASTER",
  description:
    "هاب تجربه مطالعه اوستا با حالت‌های نیایش، پژوهش، پیام روزانه و صوت برای خواندن سینمایی و شخصی‌سازی‌شده.",
};

export default function ReadingRoomPage() {
  return (
    <CinematicHub
      eyebrow="Reading Room"
      title="تالار مطالعه زنده اوستا"
      lead="این تالار برای تجربه خواندن ساخته شده است: حالت مطالعه، عمق توضیح، واژه‌نامه، صوت، بوکمارک و مسیر بعدی، همه در یک تجربه سینمایی."
      scene="scene-fire"
      roman="R"
      actions={[
        { label: "انتخاب حالت مطالعه", href: "#reading-room" },
        { label: "برنامه مطالعه", href: "/study-plan", variant: "secondary" },
      ]}
      stats={getReadingRoomStats()}
    >
      <div id="reading-room" className="scroll-mt-28">
        <ReadingRoomLab presets={getReadingRoomPresets()} />
        <ReadingQueuePanel />
      </div>
    </CinematicHub>
  );
}
