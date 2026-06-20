"use client";

import { Bookmark, Check, Headphones, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

const bookmarksKey = "avesta-reader-bookmarks-v1";

type BookmarkItem = {
  href?: string;
  title?: string;
  savedAt?: string;
};

function readBookmarks(): BookmarkItem[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(bookmarksKey) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function VerseQuickActions() {
  const [bookmarked, setBookmarked] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    const currentHref = window.location.pathname;
    setBookmarked(readBookmarks().some((item) => item.href === currentHref));
  }, []);

  function toggleBookmark() {
    const currentHref = window.location.pathname;
    const bookmarks = readBookmarks();
    const exists = bookmarks.some((item) => item.href === currentHref);
    const next = exists
      ? bookmarks.filter((item) => item.href !== currentHref)
      : [
          {
            href: currentHref,
            title: document.title.replace(" | AVESTA-ZOROASTER", ""),
            savedAt: new Date().toISOString()
          },
          ...bookmarks
        ];

    window.localStorage.setItem(bookmarksKey, JSON.stringify(next.slice(0, 50)));
    setBookmarked(!exists);
  }

  async function sharePage() {
    const payload = { title: document.title, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }

      await navigator.clipboard.writeText(payload.url);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1800);
    } catch {
      // A cancelled native share sheet is not an error state for the reader.
    }
  }

  function scrollToAudio() {
    document.getElementById("ritual-audio")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={toggleBookmark}
        aria-pressed={bookmarked}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-300 to-gold-600 px-5 py-3 text-sm font-bold text-obsidian-950 shadow-gold transition hover:-translate-y-0.5"
      >
        {bookmarked ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {bookmarked ? "ذخیره شد" : "ذخیره بند"}
      </button>
      <button
        type="button"
        onClick={sharePage}
        className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-black/20 px-5 py-3 text-sm font-bold text-gold-100 transition hover:border-gold-300/60"
      >
        {shareStatus === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        {shareStatus === "copied" ? "پیوند کپی شد" : "اشتراک‌گذاری"}
      </button>
      <button
        type="button"
        onClick={scrollToAudio}
        className="inline-flex items-center gap-2 rounded-full border border-warm-50/10 bg-warm-50/5 px-5 py-3 text-sm font-bold text-warm-100 transition hover:border-gold-300/40"
      >
        <Headphones className="h-4 w-4" />
        شنیدن روایت
      </button>
    </div>
  );
}
