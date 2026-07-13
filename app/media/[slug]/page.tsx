import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Headphones, Image as ImageIcon, Link2, Music2, Sparkles, Video } from "lucide-react";

import { getMediaAssetBySlug, getMediaAssets } from "@/lib/media-repository";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const assets = await getMediaAssets();
  return assets.map((asset) => ({ slug: asset.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const asset = await getMediaAssetBySlug(params.slug);

  if (!asset) {
    return {
      title: "رسانه | AVESTA-ZOROASTER",
    };
  }

  return {
    title: `${asset.title} | رسانه`,
    description: asset.description,
    openGraph: {
      title: asset.title,
      description: asset.description,
      type: "article",
    },
  };
}

export default async function MediaDetailPage({ params }: PageProps) {
  const asset = await getMediaAssetBySlug(params.slug);

  if (!asset) {
    notFound();
  }

  const Icon = getMediaIcon(asset.type);
  const relatedVerseHref =
    asset.sectionSlug && asset.chapterSlug && asset.verseOrder
      ? `/avesta/${asset.sectionSlug}/${asset.chapterSlug}/verse-${asset.verseOrder}`
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": asset.type.toLowerCase().includes("audio") ? "AudioObject" : "CreativeWork",
    name: asset.title,
    description: asset.description,
    genre: asset.category,
    url: `https://avesta-zoroaster.com/media/${asset.slug}`,
  };

  return (
    <main className="media-detail-page overflow-hidden pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero-cosmos relative px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_390px]">
          <div>
            <Link
              href="/media"
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <ArrowRight size={17} />
              بازگشت به رسانه
            </Link>
            <p className="gold-text mt-10 text-sm font-semibold tracking-[0.3em]">{asset.type}</p>
            <h1 className="mt-4 text-5xl font-black leading-[1.2] text-warm sm:text-7xl">{asset.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted">{asset.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Badge>{asset.category}</Badge>
              {asset.mood ? <Badge muted>{asset.mood}</Badge> : null}
              {asset.status ? <Badge muted>{asset.status}</Badge> : null}
            </div>
          </div>

          <div className="media-detail-preview lux-frame p-4">
            <div className="media-detail-artwork image-atmosphere relative grid min-h-[360px] place-items-center overflow-hidden rounded-[1.4rem] p-8 text-center">
              {asset.thumbnail ? (
                <Image
                  src={asset.thumbnail}
                  alt={asset.title}
                  fill
                  priority
                  sizes="390px"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
              <div className="relative z-10">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/25 bg-black/35 text-gold-light shadow-gold backdrop-blur">
                  <Icon size={42} />
                </span>
                <p className="mt-6 text-sm font-bold text-gold-light">Media Asset</p>
                <p className="mt-3 text-2xl font-black text-warm">{asset.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <article className="space-y-6">
          <section className="media-detail-panel lux-frame p-7">
            <div className="flex items-center gap-2 text-gold-light">
              <Sparkles size={20} />
              <h2 className="text-2xl font-black">کاربرد در تجربه سایت</h2>
            </div>
            <p className="mt-4 leading-9 text-muted">
              این رسانه برای کامل‌کردن تجربه تصویری، صوتی یا پژوهشی سایت استفاده می‌شود و می‌تواند به صفحه، بخش یا بند مشخصی از اوستا وصل شود.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MiniMetric label="نوع" value={asset.type} />
              <MiniMetric label="دسته" value={asset.category} />
              <MiniMetric label="وضعیت" value={asset.status ?? "sample"} />
            </div>
          </section>

          {asset.prompt ? (
            <section className="media-detail-panel lux-frame p-7">
              <div className="flex items-center gap-2 text-gold-light">
                <ImageIcon size={20} />
                <h2 className="text-2xl font-black">پرامپت یا دستور تولید</h2>
              </div>
              <p className="mt-4 rounded-2xl border border-gold/10 bg-night/60 p-5 text-left text-sm leading-7 text-muted" dir="ltr">
                {asset.prompt}
              </p>
            </section>
          ) : null}

          {asset.url ? (
            <section className="media-detail-panel lux-frame p-7">
              <div className="flex items-center gap-2 text-gold-light">
                <Link2 size={20} />
                <h2 className="text-2xl font-black">فایل رسانه</h2>
              </div>
              <a
                href={asset.url}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light"
              >
                باز کردن فایل
                <Link2 size={18} />
              </a>
            </section>
          ) : null}
        </article>

        <aside className="media-detail-sidebar lux-frame h-fit p-6 lg:sticky lg:top-28">
          <p className="gold-text text-sm font-semibold tracking-[0.22em]">CONNECTIONS</p>
          <h2 className="mt-3 text-2xl font-black text-warm">اتصال‌های محتوایی</h2>
          <div className="mt-5 grid gap-3">
            {asset.sectionSlug ? (
              <ConnectionCard href={`/avesta/${asset.sectionSlug}`} label="بخش اوستا" value={asset.sectionSlug} />
            ) : null}
            {relatedVerseHref ? <ConnectionCard href={relatedVerseHref} label="بند مرتبط" value={relatedVerseHref} /> : null}
            <ConnectionCard href="/admin/media" label="مدیریت" value="ویرایش در پنل رسانه" />
          </div>
          <Link
            href="/media"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
          >
            دیدن همه رسانه‌ها
            <ArrowLeft size={16} />
          </Link>
        </aside>
      </section>
    </main>
  );
}

function Badge({ children, muted = false }: { children: string; muted?: boolean }) {
  return (
    <span
      className={
        muted
          ? "rounded-full border border-warm/10 bg-warm/5 px-4 py-2 text-sm text-muted"
          : "rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light"
      }
    >
      {children}
    </span>
  );
}

function ConnectionCard({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <Link href={href} className="media-connection-card rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10">
      <p className="text-xs font-bold text-gold-light">{label}</p>
      <p className="mt-2 font-black text-warm">{value}</p>
    </Link>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 px-4 py-3">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-gold-light">{value}</p>
    </div>
  );
}

function getMediaIcon(type: string) {
  const normalized = type.toLowerCase();

  if (normalized.includes("audio") || normalized.includes("podcast")) {
    return Music2;
  }

  if (normalized.includes("video")) {
    return Video;
  }

  if (normalized.includes("document")) {
    return BookOpen;
  }

  if (normalized.includes("voice") || normalized.includes("sound")) {
    return Headphones;
  }

  return ImageIcon;
}
