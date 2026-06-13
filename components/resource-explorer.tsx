"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BookMarked,
  Download,
  Filter,
  Image as ImageIcon,
  Library,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";

type ResourceItem = {
  title: string;
  type: string;
  category: string;
  description: string;
  accent: string;
  href?: string;
  author?: string;
  language?: string;
  mood?: string | null;
  prompt?: string | null;
};

type ResourceExplorerProps = {
  items: ResourceItem[];
  mode: "library" | "media";
};

const allLabel = "همه";

export function ResourceExplorer({ items, mode }: ResourceExplorerProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(allLabel);
  const [category, setCategory] = useState(allLabel);
  const [activeTitle, setActiveTitle] = useState(items[0]?.title ?? "");

  const types = useMemo(() => [allLabel, ...Array.from(new Set(items.map((item) => item.type)))], [items]);
  const categories = useMemo(() => [allLabel, ...Array.from(new Set(items.map((item) => item.category)))], [items]);

  const filteredItems = useMemo(() => {
    const value = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesType = type === allLabel || item.type === type;
      const matchesCategory = category === allLabel || item.category === category;
      const haystack = normalizeSearchText(
        `${item.title} ${item.type} ${item.category} ${item.description} ${item.author ?? ""} ${item.language ?? ""} ${
          item.mood ?? ""
        } ${item.prompt ?? ""}`
      );
      const matchesQuery = !value || haystack.includes(value);

      return matchesType && matchesCategory && matchesQuery;
    });
  }, [category, items, query, type]);

  const activeItem = filteredItems.find((item) => item.title === activeTitle) ?? filteredItems[0] ?? items[0];
  const Icon = mode === "library" ? Library : ImageIcon;
  const placeholder =
    mode === "library"
      ? "جستجو در منابع، زبان، نویسنده و موضوع"
      : "جستجو در تصویر، صوت، mood و prompt";
  const panelTitle = mode === "library" ? "منبع فعال" : "رسانه فعال";
  const adminHref = mode === "library" ? "/admin/library" : "/admin/media";

  return (
    <section className="mt-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="lux-frame p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
              <label className="relative block">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={placeholder}
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
                  onChange={(event) => setType(event.target.value)}
                  className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
                >
                  {types.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
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

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-gold-light">
                <Sparkles size={15} />
                {filteredItems.length} نتیجه
              </span>
              <span>فیلترها برای اتصال به دیتابیس و Meilisearch آماده‌اند.</span>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filteredItems.length ? (
              filteredItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveTitle(item.title)}
                  className={`lux-frame group block p-5 text-right transition hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold ${
                    activeItem?.title === item.title ? "border-gold/45 bg-gold/10" : ""
                  }`}
                >
                  <ResourceArtwork item={item} index={index} icon={Icon} />

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                      {item.type}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs text-muted">
                      {item.category}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black leading-9 text-warm">{item.title}</h2>
                  {item.author ? <p className="mt-2 text-sm text-gold-light">{item.author}</p> : null}
                  {item.language ? <p className="mt-1 text-sm text-muted">زبان: {item.language}</p> : null}
                  {item.mood ? <p className="mt-2 text-sm text-gold-light">Mood: {item.mood}</p> : null}
                  <p className="mt-4 min-h-24 leading-8 text-muted">{item.description}</p>
                </button>
              ))
            ) : (
              <div className="lux-frame p-8 text-center md:col-span-2">
                <Search className="mx-auto text-gold-light" size={34} />
                <h2 className="mt-4 text-2xl font-black text-warm">چیزی پیدا نشد</h2>
                <p className="mt-3 leading-8 text-muted">فیلترها را بازتر کنید یا عبارت کوتاه‌تری جستجو کنید.</p>
              </div>
            )}
          </div>
        </div>

        {activeItem ? (
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="lux-frame p-5">
              <ResourceArtwork item={activeItem} index={Math.max(0, items.indexOf(activeItem))} icon={Icon} tall />
              <p className="gold-text mt-5 text-xs font-semibold tracking-[0.25em]">{panelTitle}</p>
              <h2 className="mt-2 text-3xl font-black text-warm">{activeItem.title}</h2>
              <p className="mt-3 leading-8 text-muted">{activeItem.description}</p>

              <div className="mt-5 grid gap-2 text-sm">
                <MetaRow label="نوع" value={activeItem.type} />
                <MetaRow label="دسته" value={activeItem.category} />
                {activeItem.author ? <MetaRow label="نویسنده" value={activeItem.author} /> : null}
                {activeItem.language ? <MetaRow label="زبان" value={activeItem.language} /> : null}
              </div>

              {activeItem.prompt ? (
                <p className="mt-5 max-h-40 overflow-hidden rounded-2xl border border-gold/10 bg-night/55 p-4 text-left text-xs leading-6 text-muted" dir="ltr">
                  {activeItem.prompt}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {activeItem.href ? (
                  <Link
                    href={activeItem.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                  >
                    مشاهده
                    <ArrowLeft size={16} />
                  </Link>
                ) : null}
                <Link
                  href={adminHref}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
                >
                  مدیریت
                  <BookMarked size={16} />
                </Link>
                {mode === "library" ? (
                  <Link
                    href="/library/archive"
                    className="inline-flex items-center gap-2 rounded-full border border-warm/10 px-5 py-3 text-sm font-bold text-muted transition hover:border-gold/30 hover:text-gold-light"
                  >
                    آرشیو
                    <Download size={16} />
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

function ResourceArtwork({
  item,
  index,
  icon: Icon,
  tall = false,
}: {
  item: ResourceItem;
  index: number;
  icon: LucideIcon;
  tall?: boolean;
}) {
  return (
    <div className={`image-atmosphere relative ${tall ? "h-56" : "h-48"} rounded-2xl border border-gold/10`}>
      <div className="absolute inset-x-8 bottom-7 h-20 rounded-full blur-2xl" style={{ backgroundColor: `${item.accent}38` }} />
      <div className="absolute inset-0 grid place-items-center">
        <Icon className="text-gold-light" size={42} />
      </div>
      <div className="absolute right-5 top-4 z-10 font-display text-lg font-bold text-gold-light">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-night/55 px-4 py-3">
      <span className="text-muted">{label}</span>
      <span className="font-bold text-gold-light">{value}</span>
    </div>
  );
}
