"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Search, Tag, X } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";

type ArticleItem = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: string;
  coverTone: string;
  relatedTerms?: string[];
  relatedVerses?: string[];
};

const allLabel = "همه";

export function ArticlesExplorer({ articles }: { articles: ArticleItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allLabel);
  const [activeSlug, setActiveSlug] = useState(articles[0]?.slug ?? "");

  const categories = useMemo(
    () => [allLabel, ...Array.from(new Set(articles.map((article) => article.category)))],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    const value = normalizeSearchText(query);

    return articles.filter((article) => {
      const matchesCategory = category === allLabel || article.category === category;
      const haystack = normalizeSearchText(
        `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")} ${article.coverTone}`
      );
      const matchesQuery = !value || haystack.includes(value);

      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  const activeArticle = filteredArticles.find((article) => article.slug === activeSlug) ?? filteredArticles[0] ?? articles[0];

  return (
    <section className="mt-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="lux-frame p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
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
                    <div className="absolute inset-x-8 bottom-7 h-20 rounded-full bg-gold/20 blur-2xl" />
                    <div className="absolute inset-0 grid place-items-center px-8 text-center text-sm font-bold leading-7 text-gold-light">
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
                <div className="absolute inset-0 grid place-items-center px-8 text-center text-sm font-bold leading-7 text-gold-light">
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
