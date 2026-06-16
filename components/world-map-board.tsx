import Link from "next/link";
import { ArrowLeft, Compass, GalleryHorizontalEnd, LockKeyhole, Route, Sparkles } from "lucide-react";
import type { WorldRealm, WorldRealmStatus } from "@/lib/world-map";
import { getWorldMapSummary, worldRealmStatusLabels } from "@/lib/world-map";

type WorldMapBoardProps = {
  realms: WorldRealm[];
};

const statusClass: Record<WorldRealmStatus, string> = {
  live: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  expanding: "border-gold/20 bg-gold/10 text-gold-light",
  foundation: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

export function WorldMapBoard({ realms }: WorldMapBoardProps) {
  const summary = getWorldMapSummary(realms);

  return (
    <div className="grid gap-6">
      <section className="lux-frame p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.24em]">WORLD MAP</p>
            <h2 className="mt-3 text-3xl font-black text-warm">نقشه جهان دیجیتال AVESTA-ZOROASTER</h2>
            <p className="mt-3 max-w-3xl leading-8 text-muted">
              این نقشه نشان می‌دهد جهان سایت از چه قلمروهایی ساخته شده، هر قلمرو چه مسیری دارد و برای تبدیل شدن
              به محصول کامل چه قفل‌هایی باید باز شوند.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Metric label="قلمرو" value={String(summary.realms)} />
            <Metric label="زنده" value={String(summary.live)} />
            <Metric label="گسترش" value={String(summary.expanding)} />
            <Metric label="زیرساخت" value={String(summary.foundation)} />
            <Metric label="میانگین" value={`${summary.averageCompletion}%`} />
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 text-gold-light">
                <LockKeyhole size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted">قفل بعدی جهان</p>
                <h3 className="mt-1 text-xl font-black text-warm">{summary.nextRealm.title}</h3>
              </div>
            </div>
            <p className="max-w-2xl text-sm font-bold leading-7 text-gold-light">{summary.nextRealm.nextUnlock}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {realms.map((realm) => (
          <article key={realm.id} className="lux-frame overflow-hidden p-5">
            <div className={`image-scene ${realm.scene} h-56 rounded-3xl border border-gold/10`}>
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <span className="font-serif text-4xl text-gold-light">{realm.roman}</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[realm.status]}`}>
                  {worldRealmStatusLabels[realm.status]}
                </span>
              </div>
              <div className="absolute bottom-5 right-5 max-w-sm">
                <p className="text-xs font-bold text-gold-light">{realm.subtitle}</p>
                <h3 className="mt-2 text-3xl font-black text-warm">{realm.title}</h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-8 text-muted">{realm.purpose}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-muted">درجه تکامل</span>
                <span className="text-gold-light">{realm.completion}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${realm.completion}%` }} />
              </div>
            </div>

            <div className="mt-5 grid gap-2 md:grid-cols-3">
              {realm.routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="rounded-2xl border border-gold/10 bg-royal/45 p-3 text-sm font-bold text-warm transition hover:border-gold/40"
                >
                  {route.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-night/45 p-4">
              <div className="flex items-center gap-2 text-gold-light">
                <Sparkles size={17} />
                <span className="text-sm font-black">Unlock</span>
              </div>
              <p className="max-w-xl text-sm font-bold leading-7 text-muted">{realm.nextUnlock}</p>
            </div>

            <Link
              href={realm.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              ورود به قلمرو
              <ArrowLeft size={16} />
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link href="/avesta" className="lux-frame p-5 transition hover:-translate-y-1 hover:border-gold/45">
          <Compass className="text-gold-light" size={24} />
          <h3 className="mt-3 text-xl font-black text-warm">شروع از قلب اوستا</h3>
          <p className="mt-2 text-sm leading-7 text-muted">برای کاربران تازه‌وارد، پورتال اوستا بهترین دروازه ورود است.</p>
        </Link>
        <Link href="/tour" className="lux-frame p-5 transition hover:-translate-y-1 hover:border-gold/45">
          <Route className="text-gold-light" size={24} />
          <h3 className="mt-3 text-xl font-black text-warm">تور موزه‌ای</h3>
          <p className="mt-2 text-sm leading-7 text-muted">برای تجربه هدایت‌شده و سینمایی از جهان اوستا.</p>
        </Link>
        <Link href="/exhibitions" className="lux-frame p-5 transition hover:-translate-y-1 hover:border-gold/45">
          <GalleryHorizontalEnd className="text-gold-light" size={24} />
          <h3 className="mt-3 text-xl font-black text-warm">نمایشگاه‌های موضوعی</h3>
          <p className="mt-2 text-sm leading-7 text-muted">برای تبدیل مسیرها و دارایی‌ها به تجربه curated و موزه‌ای.</p>
        </Link>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}
