import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Database, FileSearch, SlidersHorizontal } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { SearchPanel } from "@/components/search-panel";
import { searchIndexes } from "@/lib/search";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "جستجوی پیشرفته",
  description: "جستجو در متن اوستا، ترجمه، واژه‌نامه، مقاله‌ها، رسانه‌ها و منابع AVESTA-ZOROASTER.",
};

export default function SearchPage() {
  const stats: Array<[string, string, LucideIcon]> = [
    ["چند index", `${searchIndexes.length} index آماده`, Database],
    ["فیلتر محتوا", "اوستا، مقاله، واژه‌نامه، کتابخانه، رسانه و هاب‌ها", SlidersHorizontal],
    ["کشف سریع", "نرمال‌سازی فارسی و آماده اتصال به Meilisearch", FileSearch],
  ];

  return (
    <CinematicHub
      eyebrow="Search Engine"
      title="جستجوی پیشرفته جهان اوستا"
      lead="این بخش مرکز کشف محتوای سایت است: متن اوستا، ترجمه‌ها، واژه‌نامه، مقاله‌ها، کتابخانه، رسانه و هاب یکتاپرستی."
      scene="scene-cosmic"
      heroImage={routeHeroByPath["/dictionary"]}
      roman="S"
      stats={[
        { value: `${searchIndexes.length}`, label: "index آماده برای اتصال" },
        { value: "API", label: "مسیر /api/search فعال" },
        { value: "Fast", label: "طراحی‌شده برای Meilisearch" },
      ]}
    >
      <div className="mb-6 grid gap-5 md:grid-cols-3">
        {stats.map(([title, description, Icon]) => (
          <article key={title} className="lux-frame p-5">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-4 text-xl font-black text-warm">{title}</h2>
            <p className="mt-2 leading-7 text-muted">{description}</p>
          </article>
        ))}
      </div>
      <SearchPanel />
    </CinematicHub>
  );
}
