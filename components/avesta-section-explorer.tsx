"use client";

import { Compass, DoorOpen, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/section-card";
import { TrackedLink } from "@/components/tracked-link";
import type { AvestaSectionView } from "@/lib/avesta-repository";
import { sectionCoverBySlug } from "@/lib/visual-assets";

const sectionRouteNotes: Record<string, string> = {
  yasna: "نیایش، آتش و ساختار آیینی",
  gathas: "سرودهای خرد و انتخاب آگاهانه",
  visperad: "آیین جمعی و گسترش یسنا",
  vendidad: "پاکی، قانون و روایت‌های رازآلود",
  yashts: "ستایش‌های اسطوره‌ای و طبیعت",
  "khordeh-avesta": "نیایش روزانه و همراه شخصی",
  hats: "نقشه مطالعه و ساختار هات‌ها",
};

export function AvestaSectionExplorer({ sections }: { sections: AvestaSectionView[] }) {
  return (
    <section className="lux-frame rounded-[22px] p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold-light">
            <Compass size={18} />
            <p className="text-xs font-black tracking-[0.16em]">DIRECT GATES</p>
          </div>
          <h2 className="gold-text text-3xl font-black">دروازه‌های مستقل اوستا</h2>
          <p className="mt-3 max-w-2xl leading-8 text-muted">
            اینجا فقط نقشه ورود است. هر انتخاب، صفحه اختصاصی همان بخش را باز می‌کند؛ مثلاً وندیداد فقط وندیداد را نشان می‌دهد، نه دوباره کل اوستا را.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light">
          <Sparkles size={15} />
          {sections.length} دروازه مستقل
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section, index) => (
          <TrackedLink
            key={section.slug}
            href={section.href}
            event="avesta_section_direct_gate_click"
            payload={{ section_slug: section.slug, card_position: index + 1, source_route: "/avesta" }}
            className="group flex min-h-28 items-center justify-between gap-4 rounded-2xl border border-gold/15 bg-night/46 p-4 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10"
          >
            <span>
              <span className="text-xs font-black text-gold-light">{section.roman ?? index + 1}</span>
              <span className="mt-1 block text-lg font-black leading-8 text-warm">{section.title}</span>
              <span className="mt-1 block text-xs leading-6 text-muted">{sectionRouteNotes[section.slug] ?? "ورود به صفحه اختصاصی"}</span>
            </span>
            <DoorOpen className="shrink-0 text-gold-light transition group-hover:-translate-x-1" size={22} />
          </TrackedLink>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sections.map((section, index) => (
          <SectionCard
            key={section.slug}
            title={section.title}
            description={section.description}
            href={section.href}
            atmosphere={section.atmosphere ?? "scene-cosmic"}
            imageSrc={sectionCoverBySlug[section.slug]}
            roman={section.roman ?? `${index + 1}`}
            kicker="ورود به صفحه اختصاصی"
            tracking={{
              event: "avesta_section_opened",
              payload: {
                section_slug: section.slug,
                card_position: index + 1,
                source_route: "/avesta",
                navigation_mode: "dedicated-route",
              },
            }}
          />
        ))}
      </div>
    </section>
  );
}
