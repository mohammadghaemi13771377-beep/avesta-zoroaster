import type { Metadata } from "next";
import { Bookmark, Compass, Layers3 } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { CollectionsBoard } from "@/components/collections-board";
import { contentCollections } from "@/lib/content-collections";

export const metadata: Metadata = {
  title: "کلکسیون‌های مطالعاتی",
  description: "مجموعه‌های موضوعی AVESTA-ZOROASTER برای مطالعه خرد، نیایش، ایران باستان و یکتاپرستی.",
};

export default function CollectionsPage() {
  return (
    <CinematicHub
      eyebrow="Curated Collections"
      title="کلکسیون‌های مطالعاتی اوستا"
      lead="مسیرهای آماده برای کاربرانی که می‌خواهند به جای جستجوی پراکنده، از یک مجموعه موضوعی وارد جهان اوستا، زرتشت و ایران باستان شوند."
      scene="scene-tablets"
      roman="C"
      actions={[
        { label: "دیدن کلکسیون‌ها", href: "#collections" },
        { label: "برنامه مطالعه", href: "/study-plan", variant: "secondary" },
      ]}
      stats={[
        { value: `${contentCollections.length}`, label: "کلکسیون اولیه" },
        { value: "Local", label: "ذخیره روی دستگاه" },
        { value: "CMS", label: "آماده توسعه برای پنل ادمین" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["مطالعه هدفمند", "هر کلکسیون یک مسیر موضوعی با لینک‌های واقعی سایت دارد.", Compass],
          ["ذخیره مجموعه", "کاربر می‌تواند کلکسیون‌های محبوبش را در پروفایل دنبال کند.", Bookmark],
          ["آماده محصول", "بعداً این ساختار می‌تواند به اشتراک ویژه، دوره و مسیر آموزشی تبدیل شود.", Layers3],
        ].map(([title, description, Icon]) => (
          <article key={String(title)} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 text-sm leading-8 text-muted">{description}</p>
          </article>
        ))}
      </div>

      <div id="collections" className="pt-8">
        <CollectionsBoard collections={contentCollections} />
      </div>
    </CinematicHub>
  );
}
