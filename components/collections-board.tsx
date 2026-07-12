"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bookmark, Check, Compass, Layers3 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContentCollection } from "@/lib/content-collections";

type CollectionsBoardProps = {
  collections: ContentCollection[];
};

const savedCollectionsKey = "avesta-reader-collections-v1";

function readSavedCollections(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(savedCollectionsKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function CollectionsBoard({ collections }: CollectionsBoardProps) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(readSavedCollections());
  }, []);

  function toggleCollection(id: string) {
    const exists = savedIds.includes(id);
    const nextIds = exists ? savedIds.filter((item) => item !== id) : [id, ...savedIds];

    setSavedIds(nextIds);
    window.localStorage.setItem(savedCollectionsKey, JSON.stringify(nextIds.slice(0, 60)));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <Layers3 size={22} />
            <p className="text-sm font-black">کلکسیون‌های محتوایی</p>
          </div>
          <h2 className="mt-3 text-3xl font-black text-warm">مسیرهای آماده برای کشف</h2>
        </div>
        <p className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light">
          {savedIds.length} کلکسیون ذخیره‌شده
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {collections.map((collection) => {
          const saved = savedIds.includes(collection.id);

          return (
            <article key={collection.id} className="collection-card lux-frame overflow-hidden rounded-[22px]">
              <div className={`collection-card-scene image-scene ${collection.scene} min-h-[230px]`}>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(min-width: 768px) 44vw, 92vw"
                  className="object-cover transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
                <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between gap-4">
                  <span
                    className="rounded-full border border-gold/25 bg-black/35 px-3 py-1 text-xs font-black backdrop-blur"
                    style={{ color: collection.accent }}
                  >
                    {collection.subtitle}
                  </span>
                  <span className="rounded-full border border-gold/25 bg-black/35 p-2 text-gold-light backdrop-blur">
                    <Compass className="h-5 w-5" />
                  </span>
                </div>
                <div className="absolute inset-x-6 bottom-6 z-10">
                  <h3 className="max-w-xl text-3xl font-black leading-tight text-warm">{collection.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mt-3 text-sm leading-8 text-muted">{collection.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCollection(collection.id)}
                    className={
                      saved
                        ? "inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-100"
                        : "inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light"
                    }
                  >
                    {saved ? <Check size={15} /> : <Bookmark size={15} />}
                    {saved ? "ذخیره شد" : "ذخیره"}
                  </button>
                </div>

                <div className="mt-5 grid gap-3">
                  {collection.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10"
                    >
                      <span>
                        <span className="block text-xs font-bold text-gold-light">{item.type}</span>
                        <span className="mt-1 block font-black text-warm">{item.label}</span>
                      </span>
                      <ArrowLeft size={17} className="text-gold-light" />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
