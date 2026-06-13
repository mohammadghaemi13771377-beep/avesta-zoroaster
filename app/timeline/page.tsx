import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Clock, Landmark, Route } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { TimelineExplorer } from "@/components/timeline-explorer";
import { timelineEvents } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "تایم‌لاین",
  description: "تایم‌لاین تعاملی زرتشت، گات‌ها، هخامنشیان، ساسانیان، حفظ اوستا و زرتشتیان امروز.",
};

export default function TimelinePage() {
  const cards: Array<[string, string, LucideIcon]> = [
    ["روایت تاریخی", "از آغاز پیام تا جهان معاصر", Route],
    ["دوره‌ها", `${timelineEvents.length} ایستگاه محتوایی`, Clock],
    ["منابع", "آماده اتصال به مقاله، کتابخانه و رسانه", Landmark],
  ];

  return (
    <CinematicHub
      eyebrow="Interactive Timeline"
      title="مسیر زرتشت، گات‌ها و حفظ اوستا"
      lead="این تایم‌لاین پایه تجربه تاریخی سایت است؛ جایی که روایت زرتشت، شکل‌گیری گات‌ها، ایران باستان، حفظ متن و میراث زنده امروز به شکل یک مسیر تعاملی دیده می‌شود."
      scene="scene-stone"
      roman="T"
      actions={[
        { label: "مطالعه رویدادها", href: "#timeline-events" },
        { label: "کتابخانه منابع", href: "/library", variant: "secondary" },
      ]}
      stats={[
        { value: "آغاز", label: "زرتشت و شکل‌گیری پیام خرد" },
        { value: "حفظ", label: "انتقال و نگهداری سنت اوستایی" },
        { value: "امروز", label: "میراث زنده و روایت معاصر" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        {cards.map(([title, description, Icon]) => (
          <article key={String(title)} className="lux-frame p-5">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-4 text-xl font-black text-warm">{title}</h2>
            <p className="mt-2 leading-7 text-muted">{description}</p>
          </article>
        ))}
      </div>

      <TimelineExplorer events={timelineEvents} />
    </CinematicHub>
  );
}
