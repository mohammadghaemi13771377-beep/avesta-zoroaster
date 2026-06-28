import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Bookmark, Compass, Layers3 } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { CollectionsBoard } from "@/components/collections-board";
import { contentCollections } from "@/lib/content-collections";

export const metadata: Metadata = {
  title: "کلکسیون‌های مطالعاتی | AVESTA-ZOROASTER",
  description: "مجموعه‌های موضوعی AVESTA-ZOROASTER برای مطالعه خرد، نیایش، ایران باستان و یکتاپرستی.",
};

const featureCards: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
}> = [
  {
    title: "مطالعه هدفمند",
    description: "هر کلکسیون یک مسیر موضوعی با لینک‌های واقعی سایت دارد.",
    Icon: Compass,
  },
  {
    title: "ذخیره مجموعه",
    description: "کاربر می‌تواند کلکسیون‌های محبوبش را در پروفایل دنبال کند.",
    Icon: Bookmark,
  },
  {
    title: "آماده محصول",
    description: "بعداً این ساختار می‌تواند به اشتراک ویژه، دوره و مسیر آموزشی تبدیل شود.",
    Icon: Layers3,
  },
];

export default function CollectionsPage() {
  return (
    <CinematicHub
      eyebrow="Curated Collections"
      title="کلکسیون‌های مطالعاتی اوستا"
      lead="مسیرهای آماده برای کاربرانی که می‌خواهند به جای جستجوی پراکنده، از یک مجموعه موضوعی وارد جهان اوستا، زرتشت و ایران باستان شوند."
      scene="scene-tablets"
      roman="C"
      actions={[
        { label: "برنامه مطالعه", href: "/study-plan" },
        { label: "اوستا", href: "/avesta", variant: "secondary" },
      ]}
      stats={[
        { value: `${contentCollections.length}`, label: "کلکسیون اولیه" },
        { value: "Local", label: "ذخیره روی دستگاه" },
        { value: "CMS", label: "آماده توسعه برای پنل ادمین" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {featureCards.map(({ title, description, Icon }) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 text-sm leading-8 text-muted">{description}</p>
          </article>
        ))}
      </div>

      <div className="pt-8">
        <CollectionsBoard collections={contentCollections} />
      </div>
    </CinematicHub>
  );
}
