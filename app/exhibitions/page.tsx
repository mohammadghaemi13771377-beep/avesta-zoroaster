import type { Metadata } from "next";
import { Suspense } from "react";
import { CinematicHub } from "@/components/cinematic-hub";
import { ExhibitionsGallery } from "@/components/exhibitions-gallery";
import { getExhibitions, getExhibitionStats } from "@/lib/exhibitions";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "نمایشگاه‌های موضوعی اوستا | AVESTA-ZOROASTER",
  description:
    "نمایشگاه‌های curated برای تجربه سینمایی روشنایی و اشا، آتش و نیایش، حافظه ایران باستان و گنجینه رسانه در جهان AVESTA-ZOROASTER.",
};

export default function ExhibitionsPage() {
  const exhibitions = getExhibitions();
  const firstExhibitionHref = exhibitions[0]?.heroHref ?? "/tour";

  return (
    <CinematicHub
      eyebrow="Curated Exhibitions"
      title="نمایشگاه‌های موضوعی جهان اوستا"
      lead="این بخش سایت را از یک فهرست صفحه‌ها به یک موزه زنده تبدیل می‌کند؛ هر نمایشگاه یک مسیر دیدن، خواندن، شنیدن و تمرین‌کردن دارد."
      scene="scene-cosmic"
      heroImage={routeHeroByPath["/exhibitions"]}
      roman="X"
      actions={[
        { label: "شروع نمایشگاه‌ها", href: firstExhibitionHref },
        { label: "تور موزه‌ای", href: "/tour", variant: "secondary" },
      ]}
      stats={getExhibitionStats()}
    >
      <div id="exhibitions" className="scroll-mt-28">
        <Suspense fallback={<div className="lux-frame p-6 text-muted">در حال آماده‌سازی نمایشگاه‌ها...</div>}>
          <ExhibitionsGallery exhibitions={exhibitions} />
        </Suspense>
      </div>
    </CinematicHub>
  );
}
