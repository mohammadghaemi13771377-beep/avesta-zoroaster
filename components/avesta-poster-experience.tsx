import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Flame,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Sun
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AvestaVisualGuide, AvestaVisualGuidePanel } from "@/lib/avesta-visual-guides";

const iconMap: Record<AvestaVisualGuidePanel["icon"], LucideIcon> = {
  water: Sparkles,
  flame: Flame,
  scale: Scale,
  scroll: ScrollText,
  sun: Sun,
  sparkles: Sparkles,
  shield: ShieldCheck,
  mountain: Sun,
  brain: Brain
};

type AvestaPosterExperienceProps = {
  guide: AvestaVisualGuide;
  langQuery?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function AvestaPosterExperience({
  guide,
  langQuery = "",
  primaryHref,
  primaryLabel = "ورود به تالار"
}: AvestaPosterExperienceProps) {
  const resolvedPrimaryHref = primaryHref ?? `/avesta/${guide.sectionSlug}${langQuery}`;

  return (
    <section className={`poster-world poster-${guide.tone} relative px-4 py-16 sm:px-6 lg:px-8`}>
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ ["--poster-accent" as string]: guide.accent }} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-warm/8 px-4 py-2 text-xs font-black text-gold-light">
              <Sparkles className="h-4 w-4" />
              راهنمای تصویری بخش
            </p>
            <h2 className="gold-text mt-4 text-4xl font-black leading-tight sm:text-5xl">{guide.title}</h2>
          </div>
          <Link
            href={resolvedPrimaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/12 px-5 py-3 text-sm font-black text-gold-light transition hover:-translate-y-0.5 hover:border-gold/55 hover:bg-gold/20"
          >
            {primaryLabel}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
          <div className="space-y-5">
            {guide.sidePanels.slice(0, 2).map((panel) => (
              <InfoPanel key={panel.title} panel={panel} accent={guide.accent} />
            ))}
          </div>

          <article className="poster-stage overflow-hidden rounded-[24px] border border-gold/25">
            <div className="relative min-h-[520px]">
              <Image
                src={guide.coverImage}
                alt={guide.title}
                fill
                sizes="(min-width: 1280px) 680px, 100vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/28 to-black/8" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,248,234,0.32),transparent_19rem)]" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between text-gold-light">
                <span className="rounded-full border border-gold/25 bg-night/45 px-4 py-2 text-xs font-black backdrop-blur">
                  AVESTA-ZOROASTER
                </span>
                <span className="rounded-full border border-warm/15 bg-warm/10 px-4 py-2 text-xs font-bold text-warm">
                  پندار نیک | گفتار نیک | کردار نیک
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5">
                <div className="poster-title-card p-5 sm:p-7">
                  <p className="text-sm font-black text-gold-light">{guide.question}</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight text-warm sm:text-5xl">{guide.title}</h3>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-warm/82 sm:text-lg">{guide.subtitle}</p>
                </div>
              </div>
            </div>
          </article>

          <div className="space-y-5">
            {guide.sidePanels.slice(2).map((panel) => (
              <InfoPanel key={panel.title} panel={panel} accent={guide.accent} />
            ))}
            <div className="poster-parchment p-5">
              <p className="text-sm font-black text-night/70">نقل‌قول محوری</p>
              <p className="mt-3 text-xl font-black leading-9 text-night">{guide.leadQuote}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {guide.storyPanels.map((panel) => (
            <Link
              key={panel.title}
              href={panel.href ? `${panel.href}${langQuery}` : resolvedPrimaryHref}
              className="poster-story-card group overflow-hidden rounded-[22px] border border-gold/18 transition hover:-translate-y-1 hover:border-gold/45"
            >
              <div className="grid min-h-full gap-0 sm:grid-cols-[220px_minmax(0,1fr)]">
                <div className="image-atmosphere relative min-h-[220px]">
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="(min-width: 768px) 220px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-gold-light">VISUAL CHAPTER</p>
                  <h3 className="mt-3 text-2xl font-black text-warm">{panel.title}</h3>
                  <p className="mt-3 leading-8 text-muted">{panel.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                    مشاهده مسیر
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="poster-parchment p-6 sm:p-8">
            <p className="text-sm font-black text-night/65">پیام امروزی</p>
            <h3 className="mt-3 text-3xl font-black text-night">از متن تا زندگی</h3>
            <p className="mt-4 text-lg font-bold leading-9 text-night/82">{guide.ethicalMessage}</p>
          </div>
          <div className="poster-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 text-gold-light">
              <Sun className="h-6 w-6" />
              <h3 className="text-2xl font-black text-warm">تمرین روشنایی امروز</h3>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {guide.todayPractice.map((practice, index) => (
                <div key={practice} className="rounded-2xl border border-gold/14 bg-warm/7 p-4">
                  <span className="font-serif text-2xl text-gold-light">{index + 1}</span>
                  <p className="mt-2 text-sm font-bold leading-7 text-warm/84">{practice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPanel({ panel, accent }: { panel: AvestaVisualGuidePanel; accent: string }) {
  const Icon = iconMap[panel.icon];

  return (
    <article className="poster-panel p-5" style={{ ["--poster-accent" as string]: accent }}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/12 text-gold-light">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-black text-warm">{panel.title}</h3>
      </div>
      <p className="mt-4 text-sm font-medium leading-8 text-warm/76">{panel.body}</p>
    </article>
  );
}
