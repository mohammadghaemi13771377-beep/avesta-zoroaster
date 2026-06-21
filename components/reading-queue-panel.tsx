"use client";

import Link from "next/link";
import { ArrowLeft, ListTodo, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type QueueItem = { href: string; title: string; addedAt: string };
const queueKey = "avesta-reading-queue-v1";

function readQueue(): QueueItem[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(queueKey) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export function ReadingQueuePanel() {
  const [items, setItems] = useState<QueueItem[]>([]);
  useEffect(() => setItems(readQueue()), []);

  function remove(href: string) {
    const next = items.filter((item) => item.href !== href);
    window.localStorage.setItem(queueKey, JSON.stringify(next));
    setItems(next);
  }

  return (
    <section className="mt-6 lux-frame p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3"><div className="flex items-center gap-3 text-gold-light"><ListTodo size={21} /><div><p className="text-xs font-bold tracking-[0.18em]">READING QUEUE</p><h2 className="mt-1 text-2xl font-black text-warm">صف مطالعهٔ من</h2></div></div><span className="rounded-full border border-gold/18 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">{items.length} مورد</span></div>
      {items.length ? <div className="mt-5 grid gap-3 md:grid-cols-2">{items.map((item, index) => <article key={item.href} className="flex items-center gap-3 rounded-2xl border border-gold/12 bg-night/45 p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold/15 font-serif text-gold-light">{index + 1}</span><Link href={item.href} className="min-w-0 flex-1"><p className="line-clamp-1 font-black text-warm transition hover:text-gold-light">{item.title}</p><p className="mt-1 text-xs text-muted">برای مطالعهٔ بعدی ذخیره شده</p></Link><button type="button" onClick={() => remove(item.href)} className="grid h-9 w-9 place-items-center rounded-xl border border-gold/14 text-muted transition hover:border-red-400/45 hover:text-red-300" aria-label="حذف از صف مطالعه"><Trash2 size={16} /></button></article>)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-gold/18 bg-gold/5 p-5 text-sm leading-7 text-muted">هنوز چیزی در صف نیست. در صفحهٔ هر بند، «افزودن به صف مطالعه» را بزن تا اینجا جمع شود.</div>}
      <Link href="/avesta" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">پیدا کردن متن برای مطالعه <ArrowLeft size={15} /></Link>
    </section>
  );
}
