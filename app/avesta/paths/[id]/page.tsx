import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, Compass, Sparkles, UserRound } from "lucide-react";
import { StudyPathProgressPanel } from "@/components/study-path-progress-panel";
import { TrackedLink } from "@/components/tracked-link";
import { getAvestaStudyPath, getAvestaStudyPaths } from "@/lib/avesta-study-paths";

type PageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return getAvestaStudyPaths().map((path) => ({ id: path.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const path = getAvestaStudyPath(params.id);

  if (!path) {
    return {};
  }

  return {
    title: `${path.title} | مسیر مطالعه اوستا`,
    description: path.subtitle
  };
}

export default function AvestaStudyPathDetailPage({ params }: PageProps) {
  const path = getAvestaStudyPath(params.id);
  const otherPaths = getAvestaStudyPaths().filter((item) => item.id !== params.id).slice(0, 3);

  if (!path) {
    notFound();
  }

  return (
    <main className="overflow-hidden pt-24" dir="rtl">
      <section className="hero-cosmos relative min-h-[760px]">
        <Image src={path.image} alt={path.title} fill priority sizes="100vw" className="object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-l from-night/35 via-night/76 to-night/96" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Link
              href="/avesta/paths"
              className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/24 px-4 py-2 text-sm font-bold text-gold-light transition hover:border-gold/55"
            >
              <ArrowRight className="h-4 w-4" />
              همه مسیرها
            </Link>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              <Compass className="h-4 w-4" />
              مسیر مطالعه
            </p>
            <h1 className="gold-text mt-5 max-w-4xl text-5xl font-black leading-tight sm:text-7xl">{path.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-10 text-warm/84">{path.subtitle}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/16 bg-gold/10 px-3 py-2 text-sm font-bold text-gold-light">
                <UserRound className="h-4 w-4" />
                {path.audience}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-3 py-2 text-sm font-bold text-muted">
                <Clock3 className="h-4 w-4" />
                {path.duration}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-3 py-2 text-sm font-bold text-muted">
                <Sparkles className="h-4 w-4" />
                {path.mood}
              </span>
            </div>

            <TrackedLink
              href={path.href}
              event="avesta_study_path_started"
              payload={{ path_id: path.id, source_route: path.detailHref }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light"
            >
              {path.cta}
              <ArrowLeft className="h-4 w-4" />
            </TrackedLink>
          </div>

          <StudyPathProgressPanel path={path} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {otherPaths.map((item) => (
            <Link
              key={item.id}
              href={item.detailHref}
              className="group overflow-hidden rounded-[22px] border border-gold/15 bg-night/60 transition hover:-translate-y-1 hover:border-gold/45"
            >
              <div className="relative min-h-[190px]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs font-black text-gold-light">مسیر پیشنهادی دیگر</p>
                <h2 className="mt-2 text-xl font-black text-warm">{item.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
