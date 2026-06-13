"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, Check, Clock3, Database, Filter, Search, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getSearchCategories,
  searchDocuments,
  searchTypeLabels,
  suggestedQueries,
  type SearchType,
} from "@/lib/search";

const recentKey = "avesta-recent-searches-v1";
const savedSearchKey = "avesta-saved-searches-v1";

const typeOptions: Array<{ label: string; value: SearchType }> = [
  { label: "همه", value: "all" },
  { label: "متن اوستا", value: "verse" },
  { label: "مقاله", value: "article" },
  { label: "واژه‌نامه", value: "glossary" },
  { label: "کتابخانه", value: "library" },
  { label: "رسانه", value: "media" },
  { label: "هاب‌ها", value: "hub" },
];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>("all");
  const [category, setCategory] = useState("all");
  const [recent, setRecent] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState("جستجوهای مهم را برای پژوهش بعدی ذخیره کن.");

  const categories = useMemo(() => getSearchCategories(), []);
  const results = useMemo(() => searchDocuments(query, type, category), [category, query, type]);
  const topResults = results.slice(0, 12);
  const resultTypes = useMemo(() => {
    return typeOptions
      .filter((option) => option.value !== "all")
      .map((option) => ({
        ...option,
        count: searchDocuments(query, option.value, category).length,
      }));
  }, [category, query]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(recentKey) ?? "[]");
      setRecent(Array.isArray(saved) ? saved.slice(0, 6) : []);
      const pinned = JSON.parse(window.localStorage.getItem(savedSearchKey) ?? "[]");
      setSavedSearches(Array.isArray(pinned) ? pinned.slice(0, 8) : []);
    } catch {
      window.localStorage.removeItem(recentKey);
      window.localStorage.removeItem(savedSearchKey);
    }
  }, []);

  useEffect(() => {
    const clean = query.trim();
    if (clean.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRecent((current) => {
        const next = [clean, ...current.filter((item) => item !== clean)].slice(0, 6);
        window.localStorage.setItem(recentKey, JSON.stringify(next));
        return next;
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [query]);

  function saveCurrentSearch() {
    const clean = query.trim();
    if (clean.length < 2) {
      setSaveStatus("برای ذخیره، حداقل دو حرف جستجو کن.");
      return;
    }

    const next = [clean, ...savedSearches.filter((item) => item !== clean)].slice(0, 8);
    setSavedSearches(next);
    window.localStorage.setItem(savedSearchKey, JSON.stringify(next));
    setSaveStatus(`«${clean}» ذخیره شد.`);
  }

  function removeSavedSearch(item: string) {
    const next = savedSearches.filter((search) => search !== item);
    setSavedSearches(next);
    window.localStorage.setItem(savedSearchKey, JSON.stringify(next));
    setSaveStatus(`«${item}» حذف شد.`);
  }

  return (
    <div className="lux-frame p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در اوستا، ترجمه، واژه‌نامه، مقاله، رسانه و کتابخانه"
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

        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={type}
            onChange={(event) => setType(event.target.value as SearchType)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "همه دسته‌ها" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {suggestedQueries.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/10 px-3 py-2 text-xs font-bold text-gold-light transition hover:border-gold/40"
          >
            <Sparkles size={13} />
            {item}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-gold/10 bg-night/45 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gold-light">
            <Bookmark size={17} />
            <p className="text-sm font-black">جستجوهای ذخیره‌شده</p>
          </div>
          <button
            type="button"
            onClick={saveCurrentSearch}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night transition hover:bg-gold-light"
          >
            <Check size={14} />
            ذخیره جستجو
          </button>
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">{saveStatus}</p>
        {savedSearches.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {savedSearches.map((item) => (
              <span
                key={item}
                className="inline-flex items-center overflow-hidden rounded-full border border-gold/15 bg-gold/10 text-xs font-bold text-gold-light"
              >
                <button type="button" onClick={() => setQuery(item)} className="px-3 py-2">
                  {item}
                </button>
                <button
                  type="button"
                  onClick={() => removeSavedSearch(item)}
                  className="border-r border-gold/15 px-2 py-2 text-muted transition hover:text-gold-light"
                  aria-label={`حذف ${item}`}
                >
                  <Trash2 size={13} />
                </button>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {recent.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {recent.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item)}
              className="inline-flex items-center gap-2 rounded-full border border-warm/10 px-3 py-2 text-xs text-muted transition hover:border-gold/30 hover:text-gold-light"
            >
              <Clock3 size={13} />
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {resultTypes.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setType(item.value)}
            className={`rounded-2xl border p-3 text-right transition ${
              type === item.value
                ? "border-gold/45 bg-gold/15"
                : "border-gold/10 bg-night/45 hover:border-gold/30"
            }`}
          >
            <span className="block text-xs text-muted">{item.label}</span>
            <span className="mt-1 block text-2xl font-black text-gold-light">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {results.length} نتیجه پیدا شد. API آماده: <span dir="ltr">/api/search?q=&type=&category=</span>
        </p>
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
          <Database size={14} />
          آماده اتصال به Meilisearch
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {topResults.length ? (
          topResults.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group rounded-2xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40 hover:bg-gold/10"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                  {searchTypeLabels[item.type]}
                </span>
                {item.category ? (
                  <span className="rounded-full border border-warm/10 px-3 py-1 text-xs text-muted">
                    {item.category}
                  </span>
                ) : null}
                {item.section ? (
                  <span className="rounded-full border border-warm/10 px-3 py-1 text-xs text-muted">
                    {item.section}
                  </span>
                ) : null}
                <span className="rounded-full border border-gold/10 px-3 py-1 text-xs text-gold-light">
                  امتیاز {item.score}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-warm">{item.title}</h2>
                  <p className="mt-2 leading-7 text-muted">{item.snippet}</p>
                </div>
                <ArrowLeft className="mt-1 h-5 w-5 shrink-0 text-gold-light opacity-60 transition group-hover:opacity-100" />
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-gold/10 bg-night/55 p-8 text-center">
            <Search className="mx-auto text-gold-light" size={34} />
            <h2 className="mt-4 text-2xl font-black text-warm">نتیجه‌ای پیدا نشد</h2>
            <p className="mx-auto mt-3 max-w-xl leading-8 text-muted">
              یک واژه کوتاه‌تر امتحان کنید، فیلتر نوع محتوا را روی همه بگذارید یا از پیشنهادهای آماده بالا شروع کنید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
