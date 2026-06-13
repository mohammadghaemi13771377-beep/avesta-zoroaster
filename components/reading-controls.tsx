"use client";

import {
  ArrowUp,
  Bookmark,
  Check,
  Copy,
  Minus,
  Moon,
  Plus,
  Share2,
  StickyNote,
  Sun,
  Trash2,
  Volume2
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type ReadingMode = "dark" | "sepia" | "light";

const settingsKey = "avesta-reader-settings-v1";
const bookmarksKey = "avesta-reader-bookmarks-v1";
const lastReadKey = "avesta-reader-last-read-v1";
const notesKey = "avesta-reader-notes-v1";

const modes: Array<{
  id: ReadingMode;
  label: string;
  icon: typeof Moon;
  className: string;
}> = [
  { id: "dark", label: "شب", icon: Moon, className: "bg-night text-warm" },
  { id: "sepia", label: "سپیا", icon: Sun, className: "bg-[#21180e] text-[#f5e2bc]" },
  { id: "light", label: "روشن", icon: Sun, className: "bg-[#f7f0e3] text-[#1c160d]" }
];

function readBookmarks() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(bookmarksKey) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readNotes(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(notesKey) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function ReadingControls() {
  const [mode, setMode] = useState<ReadingMode>("dark");
  const [size, setSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(2);
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [note, setNote] = useState("");
  const [noteStatus, setNoteStatus] = useState("یادداشت شخصی برای همین بند");

  const active = useMemo(() => modes.find((item) => item.id === mode) ?? modes[0], [mode]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(settingsKey) ?? "{}");
      if (saved.mode) setMode(saved.mode);
      if (saved.size) setSize(saved.size);
      if (saved.lineHeight) setLineHeight(saved.lineHeight);
    } catch {
      window.localStorage.removeItem(settingsKey);
    }

    const currentPath = window.location.pathname;
    setBookmarked(readBookmarks().some((item: { href?: string }) => item.href === currentPath));
    setNote(readNotes()[currentPath] ?? "");
    setCanShare(Boolean(navigator.share));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.readerMode = mode;
    document.documentElement.style.setProperty("--reader-font-size", `${size}px`);
    document.documentElement.style.setProperty("--reader-line-height", String(lineHeight));
    window.localStorage.setItem(settingsKey, JSON.stringify({ mode, size, lineHeight }));
  }, [lineHeight, mode, size]);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll <= 0 ? 0 : Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
      setProgress(nextProgress);

      window.localStorage.setItem(
        lastReadKey,
        JSON.stringify({
          href: window.location.pathname + window.location.search,
          title: document.title.replace(" | AVESTA-ZOROASTER", ""),
          progress: nextProgress,
          updatedAt: new Date().toISOString()
        })
      );
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  function toggleBookmark() {
    const currentPath = window.location.pathname;
    const bookmarks = readBookmarks();
    const exists = bookmarks.some((item: { href?: string }) => item.href === currentPath);
    const nextBookmarks = exists
      ? bookmarks.filter((item: { href?: string }) => item.href !== currentPath)
      : [
          {
            href: currentPath,
            title: document.title.replace(" | AVESTA-ZOROASTER", ""),
            savedAt: new Date().toISOString()
          },
          ...bookmarks
        ];

    window.localStorage.setItem(bookmarksKey, JSON.stringify(nextBookmarks.slice(0, 50)));
    setBookmarked(!exists);
  }

  async function shareCurrentPage() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveNote() {
    const currentPath = window.location.pathname;
    const notes = readNotes();
    const trimmed = note.trim();

    if (trimmed) {
      notes[currentPath] = trimmed;
      setNoteStatus("یادداشت ذخیره شد.");
    } else {
      delete notes[currentPath];
      setNoteStatus("یادداشت خالی بود و حذف شد.");
    }

    window.localStorage.setItem(notesKey, JSON.stringify(notes));
  }

  function removeNote() {
    const currentPath = window.location.pathname;
    const notes = readNotes();
    delete notes[currentPath];
    window.localStorage.setItem(notesKey, JSON.stringify(notes));
    setNote("");
    setNoteStatus("یادداشت حذف شد.");
  }

  return (
    <div className={`rounded-[18px] border border-gold/15 p-4 shadow-2xl shadow-black/25 ${active.className}`}>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-current/10">
        <div className="h-full rounded-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-full border border-gold/20 bg-current/5 px-4 py-2 text-sm font-black">
          پیشرفت {progress}٪
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {modes.map((item) => {
            const Icon = item.icon;
            const selected = item.id === mode;

            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  selected ? "border-gold bg-gold text-night" : "border-gold/20 text-current hover:bg-gold/10"
                }`}
                type="button"
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <IconButton label="کوچک کردن فونت" onClick={() => setSize((value) => Math.max(16, value - 1))}>
            <Minus size={17} />
          </IconButton>
          <span className="min-w-14 text-center text-sm font-bold">{size}px</span>
          <IconButton label="بزرگ کردن فونت" onClick={() => setSize((value) => Math.min(26, value + 1))}>
            <Plus size={17} />
          </IconButton>
          <button
            type="button"
            onClick={() => setLineHeight((value) => (value >= 2.4 ? 1.8 : Number((value + 0.2).toFixed(1))))}
            className="rounded-full border border-gold/20 px-4 py-2 text-sm font-bold transition hover:bg-gold/10"
          >
            فاصله {lineHeight.toFixed(1)}
          </button>
          <IconButton label={bookmarked ? "حذف بوکمارک" : "بوکمارک"} onClick={toggleBookmark}>
            {bookmarked ? <Check size={17} /> : <Bookmark size={17} />}
          </IconButton>
          <IconButton label="اشتراک‌گذاری" onClick={shareCurrentPage}>
            {copied ? <Check size={17} /> : canShare ? <Share2 size={17} /> : <Copy size={17} />}
          </IconButton>
          <IconButton label="پخش صوت" onClick={() => setAudioReady((value) => !value)}>
            <Volume2 size={17} />
          </IconButton>
          <IconButton label="رفتن به ابتدای صفحه" onClick={scrollToTop}>
            <ArrowUp size={17} />
          </IconButton>
        </div>
      </div>

      <p className="reader-text mt-4">
        {audioReady
          ? "جایگاه روایت صوتی فعال شد. در نسخه دیتابیس، این کنترل به فایل صوتی همان بند وصل می‌شود."
          : "تنظیمات مطالعه روی همین دستگاه ذخیره می‌شود و برای متن‌های اوستا، مقاله‌ها و مسیر ادامه مطالعه آماده اتصال به پروفایل کاربر است."}
      </p>

      <div className="mt-4 rounded-2xl border border-gold/15 bg-black/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <StickyNote size={17} />
            <p className="text-sm font-black">یادداشت مطالعه</p>
          </div>
          <p className="text-xs font-bold opacity-75">{noteStatus}</p>
        </div>
        <textarea
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
            setNoteStatus("تغییر ذخیره‌نشده");
          }}
          rows={3}
          className="mt-3 w-full resize-none rounded-2xl border border-gold/15 bg-black/15 p-3 text-sm leading-7 outline-none transition placeholder:text-current/45 focus:border-gold/50"
          placeholder="برداشت، پرسش یا نکته خودت را اینجا بنویس..."
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveNote}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night transition hover:bg-gold-light"
          >
            <Check size={14} />
            ذخیره یادداشت
          </button>
          <button
            type="button"
            onClick={removeNote}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-bold transition hover:bg-gold/10"
          >
            <Trash2 size={14} />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick
}: {
  children: ReactNode;
  label: string;
  onClick: () => void | Promise<void>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 transition hover:bg-gold/10"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
