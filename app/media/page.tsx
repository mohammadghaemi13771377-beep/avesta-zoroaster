import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Headphones, ImagePlus, Mic2, Video } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { ResourceExplorer } from "@/components/resource-explorer";
import { getMediaAssets } from "@/lib/media-repository";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "رسانه",
  description: "تصاویر AI، صوت، ویدیو، پادکست و تجربه‌های چندرسانه‌ای اوستا.",
};

export default async function MediaPage() {
  const mediaItems = await getMediaAssets();
  const stats: Array<[string, string, LucideIcon]> = [
    ["تصاویر AI", "فضاسازی اختصاصی برای هر تالار اوستا", ImagePlus],
    ["صوت و پادکست", "خوانش بندها و روایت آموزشی", Headphones],
    ["ویدیو", "روایت کوتاه برای تایم‌لاین و مقالات", Video],
    ["استودیو محتوا", "پرامپت، تصویر، صدا و انتشار", Mic2],
  ];

  return (
    <CinematicHub
      eyebrow="Media World"
      title="رسانه، تصویرسازی AI و روایت صوتی"
      lead="این تالار برای تبدیل سایت از متن ساده به تجربه کامل ساخته شده است: تصویر اختصاصی، فایل صوتی، ویدیو، پادکست و پرامپت‌های هنری قابل مدیریت."
      scene="scene-mountain"
      heroImage={routeHeroByPath["/media"]}
      roman="M"
      actions={[
        { label: "مشاهده رسانه‌ها", href: "#media-explorer" },
        { label: "استودیوی AI", href: "/ai-studio", variant: "secondary" },
      ]}
      stats={[
        { value: "AI", label: "تصویرسازی اختصاصی هر صفحه" },
        { value: "Audio", label: "زیرساخت روایت شنیداری" },
        { value: "Prompt", label: "کتابخانه پرامپت هنری" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, description, Icon]) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-200" size={30} />
            <h2 className="mt-5 text-2xl font-black text-warm-50">{title}</h2>
            <p className="mt-3 leading-8 text-warm-100/68">{description}</p>
          </article>
        ))}
      </div>
      <div id="media-explorer">
        <ResourceExplorer items={mediaItems} mode="media" />
      </div>
    </CinematicHub>
  );
}
