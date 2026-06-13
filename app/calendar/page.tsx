import type { Metadata } from "next";
import { CalendarDays, Gift, ScrollText } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { SacredCalendarBoard } from "@/components/sacred-calendar-board";
import { getSacredCalendarSummary, sacredCalendarEvents } from "@/lib/sacred-calendar";

export const metadata: Metadata = {
  title: "گاه‌شمار آیینی و فرهنگی | AVESTA-ZOROASTER",
  description:
    "گاه‌شمار نوروز، مهرگان، سده، تیرگان و مناسبت‌های فرهنگی برای تجربه آموزشی، رسانه‌ای و فروشگاه آینده AVESTA-ZOROASTER.",
};

export default function CalendarPage() {
  const summary = getSacredCalendarSummary();

  return (
    <CinematicHub
      eyebrow="Sacred Calendar"
      title="گاه‌شمار آیینی و فرهنگی"
      lead="مناسبت‌ها اینجا فقط تاریخ نیستند؛ هر کدام یک تجربه زنده برای مطالعه، تصویرسازی، یادداشت روزانه، مقاله و محصولات فرهنگی آینده می‌شوند."
      scene="scene-sunrise"
      roman="C"
      actions={[
        { label: "دیدن مناسبت‌ها", href: "#calendar" },
        { label: "استودیوی کمپین", href: "/campaigns", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.total}`, label: "مناسبت نمونه آماده" },
        { value: `${summary.linkedReadings}`, label: "مسیر مطالعه متصل" },
        { value: `${summary.productIdeas}`, label: "ایده محصول فرهنگی" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <article className="lux-frame p-5">
          <CalendarDays className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">تقویم محتوایی عمومی</h2>
          <p className="mt-2 leading-7 text-muted">مناسبت‌ها به صفحه، مقاله، رسانه و مسیر مطالعه تبدیل می‌شوند.</p>
        </article>
        <article className="lux-frame p-5">
          <ScrollText className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">آیین به تجربه</h2>
          <p className="mt-2 leading-7 text-muted">هر رویداد ایده‌های ساده برای نوشتن، خواندن و عمل اخلاقی دارد.</p>
        </article>
        <article className="lux-frame p-5">
          <Gift className="text-gold-light" size={28} />
          <h2 className="mt-4 text-xl font-black text-warm">آماده فروشگاه آینده</h2>
          <p className="mt-2 leading-7 text-muted">هر مناسبت می‌تواند به کالکشن محصول فرهنگی و کمپین فروش تبدیل شود.</p>
        </article>
      </div>

      <div id="calendar" className="scroll-mt-28">
        <SacredCalendarBoard events={sacredCalendarEvents} />
      </div>
    </CinematicHub>
  );
}
