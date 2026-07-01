import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

type HubAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type HubStat = {
  label: string;
  value: string;
};

type CinematicHubProps = {
  eyebrow: string;
  title: string;
  lead: string;
  scene: string;
  roman?: string;
  actions?: HubAction[];
  stats?: HubStat[];
  heroImage?: string;
  children?: ReactNode;
};

export function CinematicHub({
  eyebrow,
  title,
  lead,
  scene,
  roman = "I",
  actions = [],
  stats = [],
  heroImage,
  children,
}: CinematicHubProps) {
  return (
    <main className="overflow-hidden pt-24">
      <section className={`hero-cosmos ${scene} relative isolate min-h-[680px] overflow-hidden`}>
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        ) : null}
        <div className="hub-hero-overlay absolute inset-0 bg-gradient-to-l from-[#05080d]/94 via-[#071521]/68 to-[#071521]/16" />
        <div className="absolute inset-x-[8%] top-24 h-px bg-gradient-to-r from-transparent via-gold-200/55 to-transparent" />
        <div className="hub-hero-side-shade absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(5,8,13,0.02),rgba(5,8,13,0.16)_38%,rgba(5,8,13,0.74)_100%)]" />
        <div className="hero-horizon" />
        <div className="hub-hero-bottom-shade absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night via-night/55 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:pl-[45%] lg:pr-8">
          <div className="hub-hero-copy w-full">
            <p className="hub-hero-eyebrow gold-text text-sm font-black uppercase tracking-[0.28em] sm:tracking-[0.34em]">{eyebrow}</p>
            <h1 className="hub-hero-title mt-5 max-w-4xl text-5xl font-black leading-tight text-warm-50 sm:text-7xl">
              {title}
            </h1>
            <p className="hub-hero-lead mt-7 max-w-2xl text-lg font-semibold leading-9 text-warm-100/86">{lead}</p>

            {actions.length > 0 ? (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.variant === "secondary"
                        ? "qerti-subtle-lift inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/30 bg-black/20 px-7 py-4 font-bold text-gold-100 transition hover:border-gold-300/60 hover:bg-gold-300/10"
                        : "qerti-cta inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-300 to-gold-600 px-7 py-4 font-black text-obsidian-950 shadow-gold transition hover:-translate-y-0.5"
                    }
                  >
                    {action.label}
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            ) : null}

            {stats.length > 0 ? (
              <div className="hub-hero-stats qerti-premium-shell mt-12 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-gold/24 bg-gold/20 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#05080d]/58 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-gold-100">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-warm-100/62">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="pointer-events-none absolute bottom-8 left-6 grid h-12 w-12 place-items-center rounded-full border border-gold/30 bg-black/25 font-serif text-xl text-gold-200 backdrop-blur-md sm:left-8">
            {roman}
          </div>
          <Sparkles className="pointer-events-none absolute bottom-11 left-24 h-5 w-5 text-gold-200/85 sm:left-28" />
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
    </main>
  );
}

type FeatureLink = {
  title: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  scene?: string;
  imageSrc?: string;
};

export function FeatureLinkGrid({ items }: { items: FeatureLink[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, description, href, icon: Icon, scene, imageSrc }) => {
        const content = (
          <>
            <div className={scene ? `image-scene ${scene} h-40 rounded-2xl border border-gold-400/15` : ""}>
              {imageSrc ? (
                <>
                  <Image src={imageSrc} alt={`کاور ${title}`} fill sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                </>
              ) : !scene ? <Icon className="text-gold-200" size={30} /> : null}
            </div>
            {scene ? <Icon className="mt-5 text-gold-200" size={28} /> : null}
            <h2 className="mt-5 text-2xl font-black text-warm-50">{title}</h2>
            <p className="mt-3 leading-8 text-warm-100/68">{description}</p>
            {href ? (
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-100">
                ورود
                <ArrowLeft size={17} />
              </span>
            ) : null}
          </>
        );

        const className =
          "lux-frame qerti-feature-card qerti-subtle-lift group block p-5 hover:border-gold-300/45 hover:shadow-gold";

        return href ? (
          <Link key={title} href={href} className={className}>
            {content}
          </Link>
        ) : (
          <article key={title} className={className}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
