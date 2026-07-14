"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Filter, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";

type GlossaryTerm = {
  term: string;
  slug: string;
  meaning: string;
  root: string;
  description: string;
};

const conceptFilters = ["همه", "اخلاق", "خرد", "روشنایی", "نماد", "سرود"];

const termMeta: Record<string, { concept: string; scene: string; related: string[]; path: string }> = {
  asha: {
    concept: "اخلاق",
    scene: "scene-sunrise",
    related: ["راستی", "نظم", "کردار نیک"],
    path: "/articles/asha-truth-order",
  },
  vohuman: {
    concept: "خرد",
    scene: "scene-cosmic",
    related: ["اندیشه نیک", "خرد اخلاقی", "انصاف"],
    path: "/monotheism",
  },
  "ahura-mazda": {
    concept: "روشنایی",
    scene: "scene-fire",
    related: ["دانایی", "یکتاپرستی", "نور"],
    path: "/monotheism",
  },
  faravahar: {
    concept: "نماد",
    scene: "scene-stone",
    related: ["انتخاب", "هویت", "تعالی"],
    path: "/media",
  },
  gatha: {
    concept: "سرود",
    scene: "scene-tablets",
    related: ["گات‌ها", "سروده", "زرتشت"],
    path: "/gathas",
  },
};

export function DictionaryExplorer({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [concept, setConcept] = useState("همه");

  const enrichedTerms = useMemo(
    () =>
      terms.map((term) => ({
        ...term,
        ...(termMeta[term.slug] ?? {
          concept: "مفهوم",
          scene: "scene-cosmic",
          related: [term.meaning],
          path: "/search",
        }),
      })),
    [terms]
  );

  const filteredTerms = enrichedTerms.filter((term) => {
    const haystack = normalizeSearchText(`${term.term} ${term.meaning} ${term.root} ${term.description} ${term.related.join(" ")}`);
    const matchesQuery = !query.trim() || haystack.includes(normalizeSearchText(query));
    const matchesConcept = concept === "همه" || term.concept === concept;

    return matchesQuery && matchesConcept;
  });

  const activeTerm = filteredTerms[0] ?? enrichedTerms[0];

  return (
    <div className="dictionary-atlas grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section>
        <div className="dictionary-control-panel lux-frame mb-6 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو در اشا، وهومن، اهورامزدا، فروهر..."
                className="dictionary-input h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-12 text-warm outline-none transition placeholder:text-muted focus:border-gold"
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
                value={concept}
                onChange={(event) => setConcept(event.target.value)}
                className="dictionary-select h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
              >
                {conceptFilters.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">{filteredTerms.length} واژه در مسیر کشف مفاهیم</p>
            <Link
              href="/search?type=glossary"
              className="dictionary-action-chip inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light transition hover:border-gold/40"
            >
              جستجوی پیشرفته
              <ArrowLeft size={14} />
            </Link>
          </div>
        </div>

        <div id="glossary-grid" className="dictionary-term-grid grid gap-4 sm:grid-cols-2">
          {filteredTerms.length ? (
            filteredTerms.map((term) => (
              <Link
                key={term.slug}
                href={`/dictionary/${term.slug}`}
                className={`dictionary-term-card lux-frame group block p-6 text-right transition hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold ${
                  activeTerm?.slug === term.slug ? "border-gold/45 bg-gold/10" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold-light">
                    <Sparkles size={19} />
                  </span>
                  <span className="rounded-full border border-gold/15 px-3 py-1 text-xs font-bold text-gold-light">
                    {term.concept}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-black text-gold-light">{term.term}</h2>
                <p className="mt-2 text-sm text-warm/70">{term.root}</p>
                <p className="mt-3 leading-8 text-muted">{term.meaning}</p>
              </Link>
            ))
          ) : (
            <div className="dictionary-empty-state lux-frame p-8 text-center sm:col-span-2">
              <Search className="mx-auto text-gold-light" size={34} />
              <h2 className="mt-4 text-2xl font-black text-warm">واژه‌ای پیدا نشد</h2>
              <p className="mt-3 leading-8 text-muted">فیلتر را روی همه بگذارید یا واژه کوتاه‌تری جستجو کنید.</p>
            </div>
          )}
        </div>
      </section>

      {activeTerm ? (
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="dictionary-feature-card lux-frame p-5">
            <div className={`dictionary-feature-scene image-scene ${activeTerm.scene} h-52 rounded-2xl border border-gold/15`} />
            <p className="gold-text mt-5 text-xs font-semibold tracking-[0.25em]">FEATURED TERM</p>
            <h2 className="mt-2 text-3xl font-black text-warm">{activeTerm.term}</h2>
            <p className="mt-2 font-bold text-gold-light">{activeTerm.root}</p>
            <p className="mt-4 leading-8 text-muted">{activeTerm.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeTerm.related.map((item) => (
                <span key={item} className="dictionary-related-chip rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs text-gold-light">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/dictionary/${activeTerm.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                صفحه واژه
                <ArrowLeft size={16} />
              </Link>
              <Link
                href={activeTerm.path}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
              >
                ادامه مطالعه
                <BookOpen size={16} />
              </Link>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
