import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Search, Tag } from "lucide-react";

import { ReadingControls } from "@/components/reading-controls";
import { SourceTrustPanel } from "@/components/source-trust-panel";
import { articleItems } from "@/lib/sample-content";
import { getArticleTrustProfile } from "@/lib/source-trust";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return articleItems.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articleItems.find((item) => item.slug === params.slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.tags,
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      publishedTime: article.publishedAt,
      url: `https://avesta-zoroaster.com/articles/${article.slug}`,
    },
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = articleItems.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  const trustProfile = getArticleTrustProfile(article.category, article.tags);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "AVESTA-ZOROASTER",
    },
    publisher: {
      "@type": "Organization",
      name: "AVESTA-ZOROASTER",
    },
    mainEntityOfPage: `https://avesta-zoroaster.com/articles/${article.slug}`,
    keywords: article.tags.join(", "),
  };

  return (
    <main className="overflow-hidden pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-cosmos relative px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <ArrowRight size={17} />
              بازگشت به مقالات
            </Link>
            <p className="gold-text mt-10 text-sm font-semibold tracking-[0.3em]">{article.category}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.25] text-warm sm:text-6xl">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted">{article.excerpt}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-sm text-gold-light">
                <Clock size={16} />
                {article.readingTime}
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-4 py-2 text-sm text-muted"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lux-frame p-4">
            <div className="image-atmosphere grid min-h-[340px] place-items-center rounded-[1.4rem] p-8 text-center">
              <div>
                <p className="text-sm font-bold text-gold-light">AI Cover Direction</p>
                <p className="mt-4 text-2xl font-black leading-10 text-warm">{article.coverTone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <article className="space-y-6">
          <ReadingControls />
          <SourceTrustPanel profile={trustProfile} />
          {article.sections.map((section) => (
            <section key={section.heading} className="lux-frame p-7">
              <h2 className="text-3xl font-black text-warm">{section.heading}</h2>
              <p className="reader-text mt-4 text-muted">{section.body}</p>
            </section>
          ))}
        </article>

        <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 text-gold-light">
            <BookOpen size={18} />
            <h2 className="font-black">پیوندهای مرتبط</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {article.relatedTerms.map((term) => (
              <Link
                key={term}
                href={`/dictionary/${term}`}
                className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-sm font-bold text-warm transition hover:border-gold/40 hover:bg-gold/10"
              >
                واژه‌نامه: {term}
              </Link>
            ))}
            {article.relatedVerses.map((href) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-sm font-bold text-warm transition hover:border-gold/40 hover:bg-gold/10"
              >
                متن مرتبط: {href}
              </Link>
            ))}
            <Link
              href="/search?type=article"
              className="rounded-2xl border border-gold/10 bg-gold/10 p-4 text-sm font-bold text-gold-light transition hover:border-gold/40"
            >
              <span className="flex items-center justify-between gap-3">
                جستجوی مقالات
                <Search size={16} />
              </span>
            </Link>
          </div>
          <Link
            href="/articles"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            همه مقاله‌ها
            <ArrowLeft size={16} />
          </Link>
        </aside>
      </section>
    </main>
  );
}
