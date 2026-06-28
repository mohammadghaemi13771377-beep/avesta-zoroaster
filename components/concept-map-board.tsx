"use client";

import Link from "next/link";
import { ArrowLeft, Filter, Network, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ConceptLink, ConceptNode, ConceptNodeType } from "@/lib/concept-map";
import { conceptLinkLabels, conceptTypeLabels } from "@/lib/concept-map";
import { normalizeSearchText } from "@/lib/search";

type ConceptMapBoardProps = {
  nodes: ConceptNode[];
  links: ConceptLink[];
};

const allLabel = "همه";

export function ConceptMapBoard({ nodes, links }: ConceptMapBoardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>(allLabel);
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");

  useEffect(() => {
    const nodeId = searchParams.get("concept") ?? "";
    if (nodes.some((node) => node.id === nodeId)) setActiveId(nodeId);
  }, [nodes, searchParams]);

  function selectNode(nodeId: string) {
    setActiveId(nodeId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("concept", nodeId);
    router.push(`${pathname}?${params.toString()}`);
  }

  const visibleNodes = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return nodes.filter((node) => {
      const matchesType = type === allLabel || node.type === type;
      const haystack = normalizeSearchText(`${node.title} ${node.subtitle} ${conceptTypeLabels[node.type]}`);
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesType && matchesQuery;
    });
  }, [nodes, query, type]);

  const activeNode = visibleNodes.find((node) => node.id === activeId) ?? visibleNodes[0] ?? nodes[0];
  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const visibleLinks = links.filter((link) => visibleNodeIds.has(link.from) && visibleNodeIds.has(link.to));
  const activeLinks = activeNode
    ? links.filter((link) => link.from === activeNode.id || link.to === activeNode.id)
    : [];

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <div className="lux-frame mb-6 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو در اشا، وهومن، گات‌ها، اهورامزدا..."
                className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
              />
            </label>
            <label className="relative block">
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
              >
                <option>{allLabel}</option>
                {Object.entries(conceptTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-gold-light">
              {visibleNodes.length} گره
            </span>
            <span className="rounded-full border border-gold/15 bg-gold/10 px-4 py-2 text-gold-light">
              {visibleLinks.length} پیوند
            </span>
          </div>
        </div>

        <div className="lux-frame overflow-hidden p-5">
          <div className="relative min-h-[620px] rounded-[22px] border border-gold/10 bg-night/60 p-4">
            <div className="absolute inset-0 opacity-60">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/12" />
              <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/8" />
            </div>

            <div className="relative z-10 grid min-h-[590px] place-items-center">
              <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleNodes.map((node, index) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => selectNode(node.id)}
                    className={
                      activeNode?.id === node.id
                        ? "rounded-3xl border border-gold/55 bg-gold/15 p-5 text-right shadow-gold transition"
                        : "rounded-3xl border border-gold/12 bg-black/22 p-5 text-right transition hover:-translate-y-1 hover:border-gold/35 hover:bg-gold/10"
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/20 bg-gold/10">
                        <Network size={18} style={{ color: node.accent }} />
                      </span>
                      <span className="rounded-full border border-gold/15 px-3 py-1 text-xs font-bold text-gold-light">
                        {conceptTypeLabels[node.type]}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-black leading-8 text-warm">{node.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{node.subtitle}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-warm/10">
                      <div className="h-full rounded-full" style={{ width: `${node.weight}%`, backgroundColor: node.accent }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeNode ? (
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="lux-frame p-5">
            <div className="flex items-center gap-2 text-gold-light">
              <Sparkles size={18} />
              <p className="text-xs font-black uppercase tracking-[0.22em]">ACTIVE CONCEPT</p>
            </div>
            <h2 className="mt-4 text-3xl font-black leading-10 text-warm">{activeNode.title}</h2>
            <p className="mt-3 leading-8 text-muted">{activeNode.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                {conceptTypeLabels[activeNode.type]}
              </span>
              <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs text-muted">
                وزن مفهومی {activeNode.weight}
              </span>
            </div>
            <Link
              href={activeNode.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              ورود به این مسیر
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="lux-frame p-5">
            <h3 className="text-xl font-black text-warm">پیوندهای این مفهوم</h3>
            <div className="mt-4 grid gap-3">
              {activeLinks.length ? (
                activeLinks.map((link) => {
                  const otherId = link.from === activeNode.id ? link.to : link.from;
                  const other = nodes.find((node) => node.id === otherId);

                  return (
                    <button
                      key={`${link.from}-${link.to}-${link.label}`}
                      type="button"
                      onClick={() => other && selectNode(other.id)}
                      className="rounded-2xl border border-gold/10 bg-night/50 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
                    >
                      <p className="text-xs font-bold text-gold-light">{conceptLinkLabels[link.type]}</p>
                      <p className="mt-2 font-black text-warm">{other?.title ?? link.to}</p>
                      <p className="mt-1 text-xs leading-6 text-muted">{link.label}</p>
                    </button>
                  );
                })
              ) : (
                <p className="rounded-2xl border border-gold/10 bg-night/50 p-4 text-sm leading-7 text-muted">
                  هنوز پیوند مستقیمی برای این گره ثبت نشده است. با ورود محتوای بیشتر، نقشه خود را کامل‌تر نشان می‌دهد.
                </p>
              )}
            </div>
          </div>
        </aside>
      ) : null}
    </section>
  );
}
