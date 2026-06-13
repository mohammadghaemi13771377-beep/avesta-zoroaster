"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Command,
  Compass,
  Flame,
  Library,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { avestaSections } from "@/lib/content";
import { trackEvent } from "@/lib/client-events";

const quickActions = [
  { title: "آیین ورود", subtitle: "انتخاب مسیر شروع برای کاربر تازه‌وارد", href: "/onboarding", group: "شروع", icon: Sparkles },
  { title: "ورود به پورتال اوستا", subtitle: "قلب جهان دیجیتال", href: "/avesta", group: "اصلی", icon: BookOpen },
  { title: "نورخانه شخصی", subtitle: "ادامه مطالعه و مسیر امروز", href: "/dashboard", group: "شخصی", icon: Sparkles },
  { title: "قطب‌نمای خرد", subtitle: "پیشنهاد قدم بعدی", href: "/compass", group: "هوشمند", icon: Compass },
  { title: "تالار مطالعه", subtitle: "حالت خواندن سینمایی", href: "/reading-room", group: "مطالعه", icon: BookOpen },
  { title: "دفتر روزانه", subtitle: "پندار، گفتار و کردار امروز", href: "/reflection", group: "عادت", icon: Flame },
  { title: "مسیر شخصی", subtitle: "ساخت journey برای کاربر", href: "/journey-builder", group: "یادگیری", icon: Brain },
  { title: "کتابخانه دیجیتال", subtitle: "منابع و نسخه‌ها", href: "/library", group: "منابع", icon: Library },
  { title: "مرکز اعتماد", subtitle: "منابع، استناد و شفافیت", href: "/trust-center", group: "اعتماد", icon: ShieldCheck },
  { title: "جستجوی پیشرفته", subtitle: "اوستا، مقاله، واژه‌نامه و رسانه", href: "/search", group: "ابزار", icon: Search },
];

const commandItems = [
  ...quickActions,
  ...avestaSections.map((section) => ({
    title: section.title,
    subtitle: section.description,
    href: section.href,
    group: "بخش‌های اوستا",
    icon: BookOpen,
  })),
];

export function CommandCenter() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return commandItems;

    return commandItems.filter((item) => {
      return `${item.title} ${item.subtitle} ${item.group} ${item.href}`.toLowerCase().includes(clean);
    });
  }, [query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        void trackEvent({
          event: "command_center_opened",
          payload: { source: "keyboard", surface: "global_header" },
        });
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function openPanel() {
    setOpen(true);
    void trackEvent({
      event: "command_center_opened",
      payload: { source: "button", surface: "global_header" },
    });
  }

  function selectItem(title: string, href: string) {
    setOpen(false);
    setQuery("");
    void trackEvent({
      event: "command_center_action_clicked",
      payload: { title, href, surface: "global_header" },
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="hidden h-9 items-center gap-2 rounded-xl border border-gold/18 px-3 text-xs font-bold text-gold-light transition hover:bg-gold/10 md:inline-flex"
        aria-label="باز کردن فرمان‌خانه سریع"
      >
        <Command size={15} />
        <span>فرمان</span>
      </button>

      <button
        type="button"
        onClick={openPanel}
        className="grid h-9 w-9 place-items-center rounded-xl border border-gold/18 text-gold-light transition hover:bg-gold/10 md:hidden"
        aria-label="فرمان‌خانه سریع"
      >
        <Command size={17} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] bg-black/70 px-4 py-20 backdrop-blur-xl" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="بستن فرمان‌خانه"
            onClick={() => setOpen(false)}
          />
          <div className="lux-frame relative mx-auto max-w-3xl overflow-hidden rounded-[22px]">
            <div className="border-b border-gold/12 p-4">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="کجا می‌خواهی بروی؟ اوستا، نورخانه، جستجو، گات‌ها..."
                  className="h-14 w-full rounded-2xl border border-gold/18 bg-night/80 pr-12 pl-14 text-warm outline-none transition placeholder:text-muted focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border border-gold/12 text-muted transition hover:text-gold-light"
                  aria-label="بستن"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-[62vh] overflow-y-auto p-3">
              {filtered.length ? (
                <div className="grid gap-2">
                  {filtered.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={`${item.group}-${item.href}`}
                        href={item.href}
                        onClick={() => selectItem(item.title, item.href)}
                        className="group grid gap-3 rounded-2xl border border-gold/10 bg-night/50 p-4 transition hover:border-gold/35 hover:bg-gold/10 sm:grid-cols-[44px_1fr_auto]"
                      >
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/15 text-gold-light">
                          <Icon size={20} />
                        </span>
                        <span>
                          <span className="block text-xs font-bold text-gold-light">{item.group}</span>
                          <span className="mt-1 block text-lg font-black text-warm">{item.title}</span>
                          <span className="mt-1 line-clamp-2 block text-sm leading-6 text-muted">{item.subtitle}</span>
                        </span>
                        <span className="hidden items-center gap-2 self-center text-sm font-black text-gold-light sm:inline-flex">
                          ورود
                          <ArrowLeft size={15} className="transition group-hover:-translate-x-1" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-gold/10 bg-night/55 p-8 text-center">
                  <Search className="mx-auto text-gold-light" size={34} />
                  <h2 className="mt-4 text-2xl font-black text-warm">دستوری پیدا نشد</h2>
                  <p className="mx-auto mt-3 max-w-lg leading-8 text-muted">
                    نام بخش، ابزار یا مسیر را کوتاه‌تر بنویس. فرمان‌خانه برای حرکت سریع در جهان اوستا ساخته شده است.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/12 px-5 py-4 text-xs text-muted">
              <span>میانبر: Ctrl + K</span>
              <span>{filtered.length} مسیر آماده</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
