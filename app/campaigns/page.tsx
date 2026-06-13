import type { Metadata } from "next";
import { ImageIcon, Megaphone, ShoppingBag } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { SeasonalCampaignStudio } from "@/components/seasonal-campaign-studio";
import { getSeasonalCampaignSummary, seasonalCampaigns } from "@/lib/seasonal-campaigns";

export const metadata: Metadata = {
  title: "استودیوی کمپین فصلی | AVESTA-ZOROASTER",
  description:
    "استودیوی طراحی کمپین برای نوروز، مهرگان، سده و مناسبت‌های فرهنگی؛ شامل کانال انتشار، asset، چک‌لیست و اتصال به فروشگاه آینده.",
};

export default function CampaignsPage() {
  const summary = getSeasonalCampaignSummary();

  return (
    <CinematicHub
      eyebrow="Campaign Studio"
      title="استودیوی کمپین فصلی"
      lead="هر مناسبت فرهنگی می‌تواند به یک بسته کامل تبدیل شود: صفحه، مقاله، تصویر AI، خبرنامه، مسیر مطالعه و کالکشن فروشگاه."
      scene="scene-cosmic"
      roman="M"
      actions={[
        { label: "دیدن کمپین‌ها", href: "#campaigns" },
        { label: "گاه‌شمار آیینی", href: "/calendar", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.total}`, label: "کمپین آماده" },
        { value: `${summary.channels}`, label: "کانال انتشار" },
        { value: `${summary.assets}`, label: "Asset پیشنهادی" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <article className="lux-frame p-5">
          <Megaphone className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">کمپین از مناسبت</h2>
          <p className="mt-2 leading-7 text-muted">نوروز، مهرگان و سده به برنامه عملیاتی محتوا و محصول تبدیل می‌شوند.</p>
        </article>
        <article className="lux-frame p-5">
          <ImageIcon className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">Asset و رسانه</h2>
          <p className="mt-2 leading-7 text-muted">برای هر کمپین، تصویر، کاور، CTA و محتوای کوتاه پیشنهاد می‌شود.</p>
        </article>
        <article className="lux-frame p-5">
          <ShoppingBag className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">فروشگاه آینده</h2>
          <p className="mt-2 leading-7 text-muted">هر مناسبت به کالکشن فرهنگی و مسیر فروش قابل رشد وصل می‌شود.</p>
        </article>
      </div>

      <div id="campaigns" className="scroll-mt-28">
        <SeasonalCampaignStudio campaigns={seasonalCampaigns} />
      </div>
    </CinematicHub>
  );
}
