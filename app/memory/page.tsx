import type { Metadata } from "next";
import { BookOpen, Brain, Database, Sparkles } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { ReaderMemory } from "@/components/profile/reader-memory";
import { readerMemoryKeys } from "@/lib/reader-memory";

export const metadata: Metadata = {
  title: "حافظه مطالعه | AVESTA-ZOROASTER",
  description:
    "داشبورد حافظه مطالعه برای ادامه خواندن، بوکمارک‌ها، یادداشت‌ها، مأموریت‌ها، برنامه مطالعه و تنظیمات خواندن.",
};

export default function MemoryPage() {
  return (
    <CinematicHub
      eyebrow="Reader Memory"
      title="حافظه مطالعه و مسیر شخصی"
      lead="این مرکز همه ردپاهای مطالعه کاربر را یک‌جا جمع می‌کند: ادامه خواندن، بوکمارک، یادداشت، مأموریت، برنامه مطالعه، کلکسیون و جستجوهای ذخیره‌شده."
      scene="scene-scroll"
      roman="M"
      actions={[
        { label: "دیدن حافظه مطالعه", href: "#memory" },
        { label: "مأموریت‌های خرد", href: "/quests", variant: "secondary" },
      ]}
      stats={[
        { value: String(readerMemoryKeys.length), label: "کلید حافظه محلی" },
        { value: "Local", label: "ذخیره روی دستگاه" },
        { value: "Profile", label: "آماده اتصال به حساب" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["ادامه مطالعه", "آخرین مسیر، پیشرفت اسکرول و صفحه بعدی کاربر.", BookOpen],
          ["شخصی‌سازی", "یادداشت، بوکمارک، تنظیمات خواندن و مسیرهای ذخیره‌شده.", Brain],
          ["آماده دیتابیس", "هر کلید حافظه به مدل آینده پروفایل کاربر وصل می‌شود.", Database],
        ].map(([title, description, Icon]) => (
          <article key={String(title)} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 text-sm leading-8 text-muted">{description}</p>
          </article>
        ))}
      </div>

      <div id="memory" className="pt-8">
        <ReaderMemory />
      </div>

      <section className="pt-8">
        <div className="lux-frame p-7">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={20} />
            <h2 className="text-2xl font-black">نقشه اتصال آینده به دیتابیس</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {readerMemoryKeys.map((item) => (
              <div key={item.key} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                <p className="text-sm font-black text-warm">{item.label}</p>
                <p className="mt-2 text-xs leading-6 text-muted">{item.description}</p>
                <p className="mt-3 text-left text-xs font-bold text-gold-light" dir="ltr">
                  {item.futureModel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CinematicHub>
  );
}
