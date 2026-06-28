"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle, GalleryHorizontalEnd, RefreshCw, Sparkles } from "lucide-react";
import type { Exhibition } from "@/lib/exhibitions";

type ExhibitionsGalleryProps = {
  exhibitions: Exhibition[];
};

const storageKey = "avesta-exhibition-progress-v1";

const routeLabels: Record<string, string> = {
  "/monotheism": "یکتاپرستی و خرد",
  "/monotheism/paths": "مسیرهای یکتاپرستی",
  "/practice": "تمرین‌های روزانه",
  "/daily-light": "روشنایی روزانه",
  "/reflection": "تالار تأمل",
  "/media": "رسانه‌ها",
  "/world": "جهان ایران باستان",
  "/library": "کتابخانه",
  "/articles": "مقاله‌ها",
  "/wisdom-capsule": "کپسول خرد",
  "/tour": "تور موزه‌ای",
  "/collections": "مجموعه‌های منتخب"
};

function readProgress() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}");
    return parsed && typeof parsed === "object" ? (parsed as Record<string, string[]>) : {};
  } catch {
    return {};
  }
}

export function ExhibitionsGallery({ exhibitions }: ExhibitionsGalleryProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState(exhibitions[0]?.id ?? "");
  const [progress, setProgress] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setProgress(readProgress());
    const slug = searchParams.get("exhibition") ?? "";
    const matched = exhibitions.find((item) => item.slug === slug);
    if (matched) setActiveId(matched.id);
  }, [exhibitions, searchParams]);

  const active = exhibitions.find((exhibition) => exhibition.id === activeId) ?? exhibitions[0];
  const completedArtifacts = active ? progress[active.id] ?? [] : [];
  const percent = active ? Math.round((completedArtifacts.length / active.artifacts.length) * 100) : 0;

  const nextArtifact = useMemo(() => {
    if (!active) return undefined;
    return active.artifacts.find((artifact) => !completedArtifacts.includes(artifact.id)) ?? active.artifacts[0];
  }, [active, completedArtifacts]);

  function toggleArtifact(exhibitionId: string, artifactId: string) {
    const current = progress[exhibitionId] ?? [];
    const nextArtifacts = current.includes(artifactId)
      ? current.filter((item) => item !== artifactId)
      : [artifactId, ...current];
    const next = { ...progress, [exhibitionId]: nextArtifacts };
    setProgress(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function resetProgress() {
    setProgress({});
    window.localStorage.removeItem(storageKey);
  }

  function exhibitionHref(exhibition: Exhibition) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("exhibition", exhibition.slug);
    return `${pathname}?${params.toString()}`;
  }

  if (!active) return null;

  return (
    <section className="grid gap-6 xl:grid-cols-[0.66fr_1.34fr]">
      <aside className="lux-frame h-fit p-5 xl:sticky xl:top-28">
        <div className="flex items-center gap-3 text-gold-100">
          <GalleryHorizontalEnd size={25} />
          <h2 className="text-xl font-black text-warm-50">تالار نمایشگاه‌ها</h2>
        </div>
        <p className="mt-4 text-sm leading-8 text-warm-100/66">
          نمایشگاه‌ها مسیرهای curated هستند؛ هر کدام چند اثر، یادداشت کیوریتور و لینک ورود به تجربه‌های اصلی سایت دارد.
        </p>

        <div className="mt-5 grid gap-3">
          {exhibitions.map((exhibition) => {
            const selected = exhibition.id === active.id;
            const done = progress[exhibition.id]?.length ?? 0;

            return (
              <Link
                key={exhibition.id}
                href={exhibitionHref(exhibition)}
                aria-pressed={selected}
                className={
                  selected
                    ? "rounded-2xl border border-gold-300/45 bg-gold-300/15 p-4 text-right shadow-gold"
                    : "rounded-2xl border border-gold-400/12 bg-black/28 p-4 text-right transition hover:border-gold-300/35 hover:bg-gold-300/10"
                }
                >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-warm-50">{exhibition.title}</span>
                  <span className="text-xs font-bold text-gold-100">{done}/{exhibition.artifacts.length}</span>
                </span>
                <span className="mt-2 block text-xs leading-6 text-warm-100/60">{exhibition.duration} / {exhibition.audience}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={resetProgress}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-400/20 px-5 py-3 text-sm font-bold text-gold-100 transition hover:bg-gold-300/10"
        >
          <RefreshCw size={16} />
          پاک‌کردن پیشرفت
        </button>
      </aside>

      <section className="space-y-6">
        <div id={active.slug} className="lux-frame scroll-mt-28 overflow-hidden p-5 sm:p-7">
          <div className={`image-scene ${active.scene} min-h-[430px] rounded-[1.55rem] border border-gold-400/15`}>
            <Image
              src={active.heroImage}
              alt={active.title}
              fill
              sizes="(min-width: 1280px) 760px, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between text-gold-100">
              <span className="rounded-full border border-gold-400/20 bg-black/35 px-4 py-2 text-xs font-black">
                {active.duration}
              </span>
              <Sparkles size={22} />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold-400/15 bg-black/50 p-5 backdrop-blur">
              <p className="text-xs font-black text-gold-100">Exhibition / {active.slug}</p>
              <h2 className="mt-2 text-4xl font-black leading-tight text-warm-50">{active.title}</h2>
              <p className="mt-3 text-sm leading-8 text-warm-100/72">{active.subtitle}</p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm-100/10">
                <div className="h-full rounded-full bg-gold-300" style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.78fr]">
            <article className="rounded-3xl border border-gold-400/10 bg-black/25 p-5">
              <p className="text-sm font-black text-gold-100">یادداشت کیوریتور</p>
              <p className="mt-4 text-lg font-bold leading-10 text-warm-50">{active.curatorNote}</p>
            </article>
            <article className="rounded-3xl border border-gold-400/10 bg-royal-950/45 p-5">
              <p className="text-xs font-bold text-gold-100">قدم بعدی پیشنهادی</p>
              <h3 className="mt-3 text-2xl font-black text-warm-50">{nextArtifact?.title}</h3>
              <p className="mt-3 text-sm leading-7 text-warm-100/64">{nextArtifact?.description}</p>
              <Link href={active.heroHref} className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-300 px-5 py-3 text-sm font-black text-obsidian-950 transition hover:bg-gold-100">
                ورود به نمایشگاه
                <ArrowLeft size={16} />
              </Link>
            </article>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {active.artifacts.map((artifact) => {
            const done = completedArtifacts.includes(artifact.id);

            return (
              <article key={artifact.id} className="lux-frame overflow-hidden p-4">
                <div className={`image-scene ${artifact.scene} h-44 rounded-2xl border border-gold-400/15`}>
                  <Image
                    src={artifact.thumbnail}
                    alt={artifact.title}
                    fill
                    sizes="(min-width: 768px) 28vw, 92vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-transparent" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-gold-100">{artifact.type}</p>
                    <h3 className="mt-2 text-xl font-black text-warm-50">{artifact.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleArtifact(active.id, artifact.id)}
                    className="rounded-full border border-gold-400/20 p-2 text-gold-100 transition hover:bg-gold-300/10"
                    aria-label={done ? "برداشتن از دیده‌شده‌ها" : "علامت‌زدن به عنوان دیده‌شده"}
                  >
                    {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                </div>
                <p className="mt-3 min-h-24 text-sm leading-7 text-warm-100/62">{artifact.description}</p>
                <Link href={artifact.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-100">
                  مشاهده اثر
                  <ArrowLeft size={15} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="lux-frame p-5">
          <p className="text-sm font-black text-gold-100">مسیرهای مرتبط</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {active.relatedRoutes.map((route) => (
              <Link key={route} href={route} className="rounded-full border border-gold-400/20 px-4 py-2 text-sm font-bold text-warm-100/78 transition hover:bg-gold-300/10 hover:text-gold-100">
                {routeLabels[route] ?? "مسیر مرتبط"}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
