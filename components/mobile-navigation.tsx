"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { avestaSections, exploreNavItems, navItems } from "@/lib/content";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-xl border border-gold/18 text-gold-light transition hover:bg-gold/10" aria-label="باز کردن فهرست سایت" aria-expanded={open}>
        <Menu size={18} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="فهرست ناوبری سایت">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setOpen(false)} aria-label="بستن فهرست" />
          <aside className="absolute inset-y-0 right-0 flex w-[min(88vw,390px)] flex-col border-l border-gold/20 bg-[#071521] shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between border-b border-gold/15 px-5 py-5">
              <div><p className="font-display text-sm tracking-[0.18em] text-gold-light">AVESTA-ZOROASTER</p><p className="mt-1 text-xs text-muted">فهرست جهان خرد و روشنایی</p></div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-gold/18 text-gold-light" aria-label="بستن"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <Link href="/search" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-black text-gold-light"><span className="inline-flex items-center gap-2"><Search size={16} />جستجو در جهان اوستا</span><ChevronLeft size={16} /></Link>

              <nav className="mt-6 grid gap-1">
                {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-black text-warm transition hover:bg-gold/10 hover:text-gold-light"><span>{item.label}</span><ChevronLeft size={16} /></Link>)}
              </nav>

              <section className="mt-6 border-t border-gold/12 pt-5">
                <p className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-gold-light"><BookOpen size={15} />بخش‌های اوستا</p>
                <div className="mt-3 grid gap-1">
                  {avestaSections.map((section) => <Link key={section.slug} href={section.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-bold text-warm/85 transition hover:bg-gold/10 hover:text-gold-light">{section.title}</Link>)}
                </div>
              </section>

              <section className="mt-6 border-t border-gold/12 pt-5">
                <p className="text-xs font-black tracking-[0.16em] text-gold-light">کاوش بیشتر</p>
                <div className="mt-3 grid gap-1">
                  {exploreNavItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 transition hover:bg-gold/10"><span className="block text-sm font-black text-warm/90">{item.label}</span><span className="mt-1 block text-xs text-muted">{item.description}</span></Link>)}
                </div>
              </section>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
