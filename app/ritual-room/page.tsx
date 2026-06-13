import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { RitualRoomPanel } from "@/components/ritual-room-panel";
import { getRitualRoomStats } from "@/lib/ritual-room";

export const metadata: Metadata = {
  title: "تالار آیینی زنده | AVESTA-ZOROASTER",
  description: "Ritual Room برای مکث، آتش آرام، نیت روزانه، مطالعه کوتاه و اتصال به دفتر پندار، گفتار، کردار.",
};

export default function RitualRoomPage() {
  return (
    <CinematicHub
      eyebrow="Ritual Room"
      title="چند دقیقه در تالار آتش آرام بمان"
      lead="یک تجربه کوتاه و سینمایی برای تمرکز، خواندن آهسته، نیت روشن و تبدیل پیام اوستا به یک کردار کوچک."
      scene="scene-fire"
      roman="R"
      actions={[
        { label: "شروع جلسه", href: "#ritual" },
        { label: "دفتر روزانه", href: "/reflection", variant: "secondary" },
      ]}
      stats={getRitualRoomStats()}
    >
      <div id="ritual" className="scroll-mt-28">
        <RitualRoomPanel />
      </div>
    </CinematicHub>
  );
}
