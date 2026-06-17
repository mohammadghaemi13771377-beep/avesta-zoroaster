import type { Metadata } from "next";

import { CinematicHub } from "@/components/cinematic-hub";
import { DictionaryExplorer } from "@/components/dictionary-explorer";
import { glossaryTerms } from "@/lib/sample-content";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "واژه‌نامه اوستایی",
  description: "معنی، ریشه، کاربرد و پیوندهای مفهومی واژه‌های اوستایی و زرتشتی.",
};

export default function DictionaryPage() {
  return (
    <CinematicHub
      eyebrow="Glossary"
      title="واژه‌نامه اوستایی و مفاهیم زرتشتی"
      lead="هر واژه در این بخش فقط یک تعریف کوتاه نیست؛ ریشه، کاربرد در متن، مقاله‌های مرتبط و پیوند با بندهای اوستا را به یک مسیر یادگیری تبدیل می‌کند."
      scene="scene-cosmic"
      heroImage={routeHeroByPath["/dictionary"]}
      roman="W"
      actions={[
        { label: "دیدن واژه‌ها", href: "#glossary-grid" },
        { label: "جستجوی پیشرفته", href: "/search", variant: "secondary" },
      ]}
      stats={[
        { value: "ریشه", label: "تبار واژه و معنا" },
        { value: "کاربرد", label: "ارتباط با متن اوستا" },
        { value: "مقاله", label: "لینک داخلی برای یادگیری عمیق" },
      ]}
    >
      <DictionaryExplorer terms={glossaryTerms} />
    </CinematicHub>
  );
}
