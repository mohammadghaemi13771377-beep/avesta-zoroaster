"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Clock, Filter, Search, Tag, X } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";

type ArticleItem = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: string;
  publishedAt?: string;
  coverTone: string;
  coverImage?: string;
  relatedTerms?: string[];
  relatedVerses?: string[];
};

const allLabel = "همه";

export function ArticlesExplorer({ articles }: { articles: ArticleItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allLabel);
  const [tag, setTag] = useState(allLabel);
  const [sort, setSort] = useState("newest");
  const [activeSlug, setActiveSlug] = useState(articles[0]?.slug ?? "");

  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(articles.map((article) => article.category)))],
    [articles]
  );
  const tags = useMemo(() => [allLabel, ...Array.from(new Set(articles.flatMap((article) => article.tags))).slice(0, 9)], [articles]);

  const filteredArticles = useMemo(() => {
    const value = normalizeSearchText(query);

    const matches = articles.filter((article) => {
      const matchesCategory = category === allLabel || article.category === category;
      const matchesTag = tag === allLabel || article.tags.includes(tag);
      const haystack = normalizeSearchText(
        `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")} ${article.coverTone}`
      );
      const matchesQuery = !value || haystack.includes(value);

      return matchesCategory && matchesTag && matchesQuery;
    });

    return [...matches].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "fa");
      if (sort === "shortest") return readingMinutes(a.readingTime) - readingMinutes(b.readingTime);
      return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
    });
  }, [articles, category, query, sort, tag]);

  function resetFilters() {
    setQuery("");
    setCategory(allLabel);
    setTag(allLabel);
    setSort("newest");
  }

  const activeArticle = filteredArticles.find((article) => article.slug === activeSlug) ?? filteredArticles[0] ?? articles[0];

  return (
    <section className="mt-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="lux-frame p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
              <label className="relative block">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="جستجو در مقاله‌ها، تگ‌ها و مفاهیم"
                  className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-12 text-warm outline-none transition placeholder:text-muted focus:border-gold"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-gold/10 text-muted transition hover:text-gold-light"
                    aria-label="پاک کردن جستجو"
                  >
                    <X size={16} />
                  </button>
                ) : null}
              </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <label className="relative block">
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={17} />
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-11 pl-5 text-warm outline-none focus:border-gold" aria-label="ترتیب مقاله‌ها">
                  <option value="newest">تازه‌ترین</option>
                  <option value="shortest">کوتاه‌ترین مطالعه</option>
                  <option value="title">عنوان</option>
                </select>
              </label>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((item) => <button key={item} type="button" onClick={() => setTag(item)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${tag === item ? "border-gold/45 bg-gold/15 text-gold-light" : "border-warm/10 text-muted hover:border-gold/25 hover:text-gold-light"}`}>{item}</button>)}
              </div>
              {(query || category !== allLabel || tag !== allLabel || sort !== "newest") ? <button type="button" onClick={resetFilters} className="rounded-full border border-gold/20 px-3 py-1.5 text-xs font-bold text-gold-light transition hover:bg-gold/10">پاک‌سازی</button> : null}
            </div>
            <p className="mt-4 text-sm text-muted">{filteredArticles.length} مقاله برای این فیلتر آماده است.</p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filteredArticles.length ? (
              filteredArticles.map((article, index) => (
                <button
                  key={article.slug}
                  type="button"
                  onClick={() => setActiveSlug(article.slug)}
                  className={`lux-frame group block p-5 text-right transition hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold ${
                    activeArticle?.slug === article.slug ? "border-gold/45 bg-gold/10" : ""
                  }`}
                >
                  <div className="image-atmosphere relative h-48 rounded-2xl border border-gold/10">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(min-width: 768px) 44vw, 92vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                    <div className="absolute inset-x-8 bottom-7 h-20 rounded-full bg-gold/20 blur-2xl" />
                    <div className="absolute inset-x-5 bottom-5 z-10 text-right text-sm font-bold leading-7 text-gold-light">
                      {article.coverTone}
                    </div>
                    <div className="absolute right-5 top-4 z-10 font-display text-lg font-bold text-gold-light">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs text-muted">
                      <Clock size={13} />
                      {article.readingTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black leading-9 text-warm">{article.title}</h2>
                  <p className="mt-4 min-h-24 leading-8 text-muted">{article.excerpt}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-gold/10 px-3 py-1 text-xs text-muted">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))
            ) : (
              <div className="lux-frame p-8 text-center md:col-span-2">
                <Search className="mx-auto text-gold-light" size={34} />
                <h2 className="mt-4 text-2xl font-black text-warm">مقاله‌ای پیدا نشد</h2>
                <p className="mt-3 leading-8 text-muted">فیلتر را بازتر کنید یا عبارت کوتاه‌تری جستجو کنید.</p>
              </div>
            )}
          </div>
        </div>

        {activeArticle ? (
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="lux-frame p-5">
              <div className="image-atmosphere relative h-52 rounded-2xl border border-gold/10">
                {activeArticle.coverImage ? (
                  <Image
                    src={activeArticle.coverImage}
                    alt={activeArticle.title}
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 z-10 text-right text-sm font-bold leading-7 text-gold-light">
                  {activeArticle.coverTone}
                </div>
              </div>
              <p className="gold-text mt-5 text-xs font-semibold tracking-[0.25em]">ACTIVE ARTICLE</p>
              <h2 className="mt-2 text-3xl font-black text-warm">{activeArticle.title}</h2>
              <p className="mt-3 leading-8 text-muted">{activeArticle.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs text-gold-light">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/articles/${activeArticle.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  مطالعه مقاله
                  <ArrowLeft size={16} />
                </Link>
                <Link
                  href="/search?type=article"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
                >
                  جستجوی مقاله‌ها
                  <BookOpen size={16} />
                </Link>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

function readingMinutes(value: string) {
  const latinDigits = value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
  return Number.parseInt(latinDigits, 10) || 999;
}
