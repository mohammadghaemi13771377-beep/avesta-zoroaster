import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, Compass, Sparkles, UserRound } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import type { AvestaStudyPath } from "@/lib/avesta-study-paths";

type AvestaStudyPathsPanelProps = {
  paths: AvestaStudyPath[];
  locale?: string;
};

export function AvestaStudyPathsPanel({ paths, locale = "fa" }: AvestaStudyPathsPanelProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
            <Compass className="h-4 w-4" />
            مسیرهای شروع
          </p>
          <h2 className="gold-text mt-4 text-4xl font-black sm:text-5xl">از کجای اوستا شروع کنم؟</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            هر مسیر یک ورودی آماده برای نوع خاصی از کاربر است: تازه‌وارد، پژوهشگر، علاقه‌مند گات‌ها، نیایش روزانه یا
            روایت‌های اسطوره‌ای.
          </p>
        </div>
        <Link
          href="/avesta/paths"
          className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
        >
          مشاهده همه مسیرها
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {paths.map((path, index) => (
          <article
            key={path.id}
            className="group overflow-hidden rounded-[24px] border border-gold/15 bg-night/60 shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:border-gold/45"
            style={{ ["--path-accent" as string]: path.accent }}
          >
            <div className="grid min-h-full md:grid-cols-[260px_minmax(0,1fr)]">
              <TrackedLink
                href={path.detailHref}
                event="avesta_study_path_opened"
                payload={{ path_id: path.id, card_position: index + 1, locale, source_route: "/avesta" }}
                className="image-atmosphere relative min-h-[280px]"
              >
                <Image
                  src={path.image}
                  alt={path.title}
                  fill
                  sizes="(min-width: 1024px) 260px, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent" />
                <div className="absolute right-4 top-4 rounded-full border border-gold/25 bg-night/62 px-3 py-1 font-serif text-lg text-gold-light backdrop-blur">
                  {index + 1}
                </div>
                <div className="absolute bottom-4 right-4 left-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-warm/15 bg-warm/10 px-3 py-1 text-xs font-black text-warm">
                    <Sparkles className="h-3.5 w-3.5" />
                    {path.mood}
                  </span>
                </div>
              </TrackedLink>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-gold/16 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                    <UserRound className="h-3.5 w-3.5" />
                    {path.audience}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                    <Clock3 className="h-3.5 w-3.5" />
                    {path.duration}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black leading-9 text-warm">{path.title}</h3>
                <p className="mt-3 leading-8 text-muted">{path.subtitle}</p>

                <div className="mt-5 grid gap-3">
                  {path.steps.map((step, stepIndex) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className="rounded-2xl border border-gold/10 bg-royal/42 p-4 transition hover:border-gold/35 hover:bg-gold/10"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-night">
                          {stepIndex + 1}
                        </span>
                        <span>
                          <span className="block font-black text-warm">{step.title}</span>
                          <span className="mt-1 block text-sm leading-7 text-muted">{step.note}</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <TrackedLink
                  href={path.href}
                  event="avesta_study_path_cta_clicked"
                  payload={{ path_id: path.id, locale, source_route: "/avesta" }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  {path.cta}
                  <ArrowLeft className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
