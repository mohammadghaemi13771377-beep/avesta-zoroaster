import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Gift, ScrollText, Sparkles } from "lucide-react";
import { getSacredCalendarEvent, sacredCalendarEvents, seasonLabels } from "@/lib/sacred-calendar";

type CalendarEventPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return sacredCalendarEvents.map((event) => ({ id: event.id }));
}

export function generateMetadata({ params }: CalendarEventPageProps): Metadata {
  const event = getSacredCalendarEvent(params.id);

  if (!event) {
    return { title: "مناسبت پیدا نشد" };
  }

  return {
    title: `${event.title} | گاه‌شمار AVESTA-ZOROASTER`,
    description: `${event.subtitle} - ${event.description}`,
    keywords: [event.title, event.month, seasonLabels[event.season], event.spiritualTheme, "اوستا", "زرتشت", "ایران باستان"],
    openGraph: {
      title: `${event.title} | AVESTA-ZOROASTER`,
      description: event.description,
      url: `https://avesta-zoroaster.com/calendar/${event.id}`,
      type: "article",
    },
  };
}

export default function CalendarEventPage({ params }: CalendarEventPageProps) {
  const event = getSacredCalendarEvent(params.id);

  if (!event) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "AVESTA-ZOROASTER",
      url: "https://avesta-zoroaster.com",
    },
    url: `https://avesta-zoroaster.com/calendar/${event.id}`,
  };

  return (
    <main className="overflow-hidden pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-cosmos relative px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hub-hero-copy">
            <Link
              href="/calendar"
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <ArrowRight size={17} />
              بازگشت به گاه‌شمار
            </Link>
            <p className="hub-hero-eyebrow gold-text mt-10 text-sm font-semibold tracking-[0.3em]">SACRED CALENDAR</p>
            <h1 className="hub-hero-title mt-4 text-5xl font-black leading-[1.15] text-warm sm:text-7xl">{event.title}</h1>
            <p className="mt-5 text-2xl font-black leading-10 text-gold-light">{event.subtitle}</p>
            <p className="hub-hero-lead mt-6 max-w-3xl text-lg leading-9 text-muted">{event.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Badge icon={CalendarDays} label={event.dateLabel} />
              <Badge icon={Sparkles} label={seasonLabels[event.season]} />
              <Badge icon={ScrollText} label={event.month} />
            </div>
          </div>

          <div className="lux-frame p-4">
            <div className={`image-scene ${event.scene} min-h-[460px] rounded-[24px] border border-gold/15`}>
              <div className="absolute bottom-8 right-8 max-w-md">
                <p className="gold-text text-xs font-semibold tracking-[0.25em]">AVESTA-ZOROASTER</p>
                <h2 className="mt-3 text-4xl font-black text-warm">{event.spiritualTheme}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-6">
          <article className="lux-frame p-7">
            <h2 className="text-3xl font-black text-warm">مسیر مطالعه این مناسبت</h2>
            <p className="mt-3 leading-8 text-muted">
              این مسیر برای تبدیل مناسبت به تجربه واقعی سایت طراحی شده است: خواندن، یادداشت، کاوش و ادامه مسیر.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {event.readingPath.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40"
                >
                  <p className="text-lg font-black text-warm">{item.label}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                    ورود
                    <ArrowLeft size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </article>

          <article className="lux-frame p-7">
            <h2 className="text-3xl font-black text-warm">ایده‌های تجربه کاربر</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {event.ritualIdeas.map((item) => (
                <div key={item} className="rounded-2xl border border-gold/10 bg-night/55 p-4 text-sm leading-7 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="lux-frame h-fit p-6 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 text-gold-light">
            <Gift size={19} />
            <h2 className="font-black text-warm">کالکشن فروشگاه آینده</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            این ایده‌ها بعداً می‌توانند به محصول، کمپین فصلی و landing page فروشگاهی تبدیل شوند.
          </p>
          <div className="mt-5 grid gap-3">
            {event.productIdeas.map((item) => (
              <div key={item} className="rounded-2xl border border-gold/10 bg-gold/10 p-4 text-sm font-bold text-gold-light">
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/shop"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            دیدن فروشگاه
            <ArrowLeft size={15} />
          </Link>
        </aside>
      </section>
    </main>
  );
}

function Badge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light">
      <Icon size={16} />
      {label}
    </span>
  );
}
