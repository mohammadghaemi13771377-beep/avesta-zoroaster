import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Flame, Headphones, Library, Route, Search, ShoppingBag, Sparkles } from "lucide-react";
import { pathFinderOptions, type PathFinderOption } from "@/lib/path-finder";

const iconByPath: Record<PathFinderOption["id"], typeof Route> = {
  beginner: Route,
  gathas: BookOpen,
  prayer: Flame,
  research: Library,
  media: Headphones,
  shop: ShoppingBag,
};

export function PathFinderGateway() {
  const featured = pathFinderOptions[0];
  const secondary = pathFinderOptions.slice(1);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="path-finder-title">
      <div className="qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[28px] border border-gold/24 p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)]">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-gold-light/12 blur-3xl" />
        <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative z-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="overflow-hidden rounded-[24px] border border-gold/22 bg-black/18">
            <div className="relative min-h-[420px]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/86 via-night/26 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gold-light/20" />
              <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/28 bg-black/28 px-4 py-2 text-xs font-black text-gold-light backdrop-blur">
                  <Sparkles className="h-4 w-4" />
                  راهنمای انتخاب مسیر
                </div>
                <h2 id="path-finder-title" className="max-w-xl text-4xl font-black leading-tight text-warm sm:text-5xl">
                  مسیر خودت را در جهان اوستا پیدا کن
                </h2>
                <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-warm/82">
                  سایت فقط فهرست نیست؛ هر کاربر باید با یک مسیر مشخص وارد شود: مطالعه، نیایش، پژوهش، رسانه یا فروشگاه فرهنگی.
                </p>
                <Link
                  href={featured.href}
                  className="qerti-cta mt-6 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-gold-light to-gold px-6 py-4 font-black text-night shadow-gold transition hover:-translate-y-0.5"
                >
                  {featured.cta}
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {secondary.map((option) => {
              const Icon = iconByPath[option.id];

              return (
                <Link
                  key={option.id}
                  href={option.href}
                  className="qerti-feature-card qerti-subtle-lift group relative min-h-[220px] overflow-hidden rounded-[22px] border border-gold/18 bg-night/54 p-5 hover:border-gold/50"
                >
                  <Image
                    src={option.image}
                    alt={option.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-42 transition duration-500 group-hover:scale-105 group-hover:opacity-58"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/64 to-night/16" />
                  <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at 20% 15%, ${option.accent}33, transparent 42%)` }} />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/24 bg-black/35 text-gold-light backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-gold/20 bg-black/26 px-3 py-1 text-[11px] font-black text-gold-light">
                        {option.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-black leading-9 text-warm">{option.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-7 text-warm/76">{option.description}</p>
                    <div className="mt-auto pt-5">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {option.steps.map((step) => (
                          <span key={step} className="rounded-full border border-gold/16 bg-black/24 px-3 py-1 text-[11px] font-bold text-muted">
                            {step}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
                        {option.cta}
                        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            <Link
              href="/search"
              className="qerti-feature-card qerti-subtle-lift group relative overflow-hidden rounded-[22px] border border-gold/18 bg-gradient-to-br from-warm/10 via-night/70 to-night p-5 hover:border-gold/50 sm:col-span-2"
            >
              <div className="absolute -left-16 top-0 h-36 w-36 rounded-full bg-gold-light/14 blur-2xl" />
              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/22 px-3 py-1 text-xs font-black text-gold-light">
                    <Search className="h-4 w-4" />
                    جستجوی سریع
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-warm">اگر دقیقاً می‌دانی دنبال چه هستی، مستقیم جستجو کن</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                    واژه‌نامه، مقاله‌ها، بندهای نمونه، رسانه و کتابخانه در یک مسیر قابل جستجو کنار هم قرار می‌گیرند.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-gold/28 bg-black/20 px-5 py-3 font-black text-gold-light transition group-hover:bg-gold/10">
                  ورود به جستجو
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
