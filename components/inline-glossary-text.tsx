"use client";

import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useMemo, useState } from "react";

type InlineTerm = {
  term: string;
  slug: string;
  meaning: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function InlineGlossaryText({ text, terms, className = "" }: { text: string; terms: InlineTerm[]; className?: string }) {
  const [activeTerm, setActiveTerm] = useState<InlineTerm | null>(null);
  const termsByTitle = useMemo(() => new Map(terms.map((term) => [term.term, term])), [terms]);
  const matcher = useMemo(() => {
    const values = [...termsByTitle.keys()].sort((a, b) => b.length - a.length);
    return values.length ? new RegExp(`(${values.map(escapeRegExp).join("|")})`, "g") : null;
  }, [termsByTitle]);
  const parts = useMemo(() => matcher ? text.split(matcher) : [text], [matcher, text]);

  return (
    <div>
      <p className={className}>
        {parts.map((part, index) => {
          const term = termsByTitle.get(part);
          return term ? (
            <button
              key={`${term.slug}-${index}`}
              type="button"
              onClick={() => setActiveTerm(term)}
              className="mx-0.5 rounded-md border-b border-dashed border-gold/65 px-0.5 font-black text-gold-light transition hover:bg-gold/12"
              aria-expanded={activeTerm?.slug === term.slug}
            >
              {part}
            </button>
          ) : <span key={`text-${index}`}>{part}</span>;
        })}
      </p>

      {activeTerm ? (
        <aside className="mt-4 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-gold/24 bg-gold/10 p-4" role="status">
          <div>
            <p className="text-sm font-black text-gold-light">{activeTerm.term}</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-warm">{activeTerm.meaning}</p>
            <Link href={`/dictionary/${activeTerm.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm font-black text-gold-light">ورود به واژه‌نامه <ArrowLeft size={14} /></Link>
          </div>
          <button type="button" onClick={() => setActiveTerm(null)} className="grid h-8 w-8 place-items-center rounded-lg border border-gold/18 text-gold-light transition hover:bg-gold/10" aria-label="بستن توضیح واژه"><X size={16} /></button>
        </aside>
      ) : null}
    </div>
  );
}
