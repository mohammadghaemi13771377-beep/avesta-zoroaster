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
      <section className="hero-cosmos relative min-h-[680px] px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="gold-text text-sm font-semibold uppercase tracking-[0.34em]">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-warm-50 sm:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-warm-100/82">{lead}</p>

            {actions.length > 0 ? (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.variant === "secondary"
                        ? "inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/30 bg-black/20 px-7 py-4 font-bold text-gold-100 transition hover:border-gold-300/60 hover:bg-gold-300/10"
                        : "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-300 to-gold-600 px-7 py-4 font-black text-obsidian-950 shadow-gold transition hover:-translate-y-0.5"
                    }
                  >
                    {action.label}
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            ) : null}

            {stats.length > 0 ? (
              <div className="mt-12 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-gold-400/14 bg-black/22 p-4">
                    <p className="text-2xl font-black text-gold-100">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-warm-100/62">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lux-frame p-4">
            <div className={`image-scene ${scene} min-h-[440px] overflow-hidden rounded-[1.55rem]`}>
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-black/5" />
              <div className="absolute inset-x-8 top-8 flex items-center justify-between text-gold-200/80">
                <span className="font-serif text-4xl">{roman}</span>
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute bottom-8 right-8 max-w-xs">
                <p className="gold-text text-xs font-semibold tracking-[0.25em]">AVESTA-ZOROASTER</p>
                <h2 className="mt-3 text-3xl font-black text-warm-50">{eyebrow}</h2>
              </div>
            </div>
          </div>
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
};

export function FeatureLinkGrid({ items }: { items: FeatureLink[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, description, href, icon: Icon, scene }) => {
        const content = (
          <>
            <div className={scene ? `image-scene ${scene} h-40 rounded-2xl border border-gold-400/15` : ""}>
              {!scene ? <Icon className="text-gold-200" size={30} /> : null}
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
          "lux-frame group block p-5 transition hover:-translate-y-1 hover:border-gold-300/45 hover:shadow-gold";

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
