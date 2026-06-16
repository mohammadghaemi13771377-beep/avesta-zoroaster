import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { ExhibitionsGallery } from "@/components/exhibitions-gallery";
import { getExhibitions, getExhibitionStats } from "@/lib/exhibitions";

export const metadata: Metadata = {
  title: "نمایشگاه‌های موضوعی اوستا | AVESTA-ZOROASTER",
  description:
    "نمایشگاه‌های curated برای تجربه سینمایی روشنایی و اشا، آتش و نیایش، حافظه ایران باستان و گنجینه رسانه در جهان AVESTA-ZOROASTER.",
};

export default function ExhibitionsPage() {
  const exhibitions = getExhibitions();

  return (
    <CinematicHub
      eyebrow="Curated Exhibitions"
      title="نمایشگاه‌های موضوعی جهان اوستا"
      lead="این بخش سایت را از یک فهرست صفحه‌ها به یک موزه زنده تبدیل می‌کند؛ هر نمایشگاه یک مسیر دیدن، خواندن، شنیدن و تمرین‌کردن دارد."
      scene="scene-cosmic"
      roman="X"
      actions={[
        { label: "شروع نمایشگاه‌ها", href: "#exhibitions" },
        { label: "تور موزه‌ای", href: "/tour", variant: "secondary" },
      ]}
      stats={getExhibitionStats()}
    >
      <div id="exhibitions" className="scroll-mt-28">
        <ExhibitionsGallery exhibitions={exhibitions} />
      </div>
    </CinematicHub>
  );
}
