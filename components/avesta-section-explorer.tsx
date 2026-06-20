"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/section-card";
import type { AvestaSectionView } from "@/lib/avesta-repository";
import { sectionCoverBySlug } from "@/lib/visual-assets";

type StudyIntent = "all" | "begin" | "ritual" | "deep";

const intentLabels: Record<StudyIntent, string> = {
  all: "همه بخش‌ها",
  begin: "آغاز آشنایی",
  ritual: "نیایش و آیین",
  deep: "مطالعه عمیق",
};

const slugsByIntent: Record<Exclude<StudyIntent, "all">, string[]> = {
  begin: ["yasna", "gathas", "hats"],
  ritual: ["yasna", "visperad", "khordeh-avesta"],
  deep: ["gathas", "vendidad", "yashts", "hats"],
};

export function AvestaSectionExplorer({ sections }: { sections: AvestaSectionView[] }) {
  const router = useRouter();
  const [intent, setIntent] = useState<StudyIntent>("all");
  const visibleSections = useMemo(
    () => intent === "all" ? sections : sections.filter((section) => slugsByIntent[intent].includes(section.slug)),
    [intent, sections],
  );

  return (
    <section className="lux-frame rounded-[22px] p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold-light"><Compass size={18} /><p className="text-xs font-black tracking-[0.16em]">STUDY CATALOG</p></div>
          <h2 className="gold-text text-3xl font-black">نقشه جهان اوستا</h2>
          <p className="mt-3 max-w-2xl leading-8 text-muted">با یک نیت ساده شروع کن؛ هر انتخاب فقط بخش‌های مناسب همان مسیر را نشان می‌دهد.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light"><Sparkles size={15} />{visibleSections.length} بخش در این مسیر</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(intentLabels) as StudyIntent[]).map((item) => (
          <button key={item} type="button" onClick={() => setIntent(item)} className={`rounded-full border px-4 py-2.5 text-sm font-black transition ${intent === item ? "border-gold/45 bg-gold text-night" : "border-gold/15 bg-night/40 text-warm/75 hover:border-gold/40 hover:text-gold-light"}`}>
            {intentLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-gold/12 bg-[#0d2631]/55 p-3">
        <p className="px-2 text-sm font-black text-gold-light">ورود مستقیم به یک بخش</p>
        <select
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) router.push(`/avesta/${event.target.value}`);
          }}
          className="h-11 min-w-[210px] rounded-xl border border-gold/20 bg-night/65 px-4 text-sm font-bold text-warm outline-none focus:border-gold"
          aria-label="انتخاب مستقیم بخش اوستا"
        >
          <option value="">انتخاب بخش</option>
          {sections.map((section) => <option key={section.slug} value={section.slug}>{section.title}</option>)}
        </select>
        <p className="text-xs leading-6 text-muted">مثلاً وندیداد را انتخاب کن تا مستقیم فقط همان تالار باز شود.</p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleSections.map((section, index) => (
          <SectionCard
            key={section.slug}
            title={section.title}
            description={section.description}
            href={section.href}
            atmosphere={section.atmosphere ?? "scene-cosmic"}
            imageSrc={sectionCoverBySlug[section.slug]}
            roman={section.roman ?? `${index + 1}`}
            kicker={intent === "all" ? "بخش اصلی اوستا" : intentLabels[intent]}
            tracking={{ event: "avesta_section_opened", payload: { section_slug: section.slug, card_position: index + 1, source_route: "/avesta", study_intent: intent } }}
          />
        ))}
      </div>
    </section>
  );
}
