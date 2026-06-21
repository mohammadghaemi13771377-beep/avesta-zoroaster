"use client";

import Link from "next/link";
import { Bell, BookOpen, CheckCheck, Flame, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LastRead = { href?: string; title?: string; progress?: number };
type Notice = { id: string; title: string; body: string; href: string; icon: typeof BookOpen };

const seenKey = "avesta-reading-notifications-seen-v1";

function getLastRead(): LastRead | null {
  try {
    const parsed = JSON.parse(window.localStorage.getItem("avesta-reader-last-read-v1") ?? "null") as LastRead | null;
    return parsed?.href ? parsed : null;
  } catch {
    return null;
  }
}

export function ReadingNotifications() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState<string[]>([]);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);

  useEffect(() => {
    setLastRead(getLastRead());
    try {
      const saved = JSON.parse(window.localStorage.getItem(seenKey) ?? "[]");
      setSeen(Array.isArray(saved) ? saved : []);
    } catch {
      setSeen([]);
    }
  }, []);

  const notices = useMemo<Notice[]>(() => [
    ...(lastRead ? [{ id: "resume-reading", title: "ادامهٔ مطالعه", body: `${lastRead.title || "آخرین بند"} را از همان‌جا ادامه بده.`, href: lastRead.href || "/avesta", icon: BookOpen }] : []),
    { id: "daily-light", title: "روشنایی امروز", body: "یک بند کوتاه، پیام اخلاقی و فرصت تأمل روزانه آماده است.", href: "/daily-light", icon: Sparkles },
    { id: "streak", title: "زنجیرهٔ روشنایی", body: "با یک مطالعهٔ کوتاه، ریتم شخصی‌ات را حفظ کن.", href: "/streak", icon: Flame },
  ], [lastRead]);
  const unreadCount = notices.filter((notice) => !seen.includes(notice.id)).length;

  function markAllRead() {
    const next = notices.map((notice) => notice.id);
    window.localStorage.setItem(seenKey, JSON.stringify(next));
    setSeen(next);
  }

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} className="relative grid h-9 w-9 place-items-center rounded-xl border border-gold/18 text-gold-light transition hover:bg-gold/10" aria-label="اعلان‌های مطالعه" aria-expanded={open}>
        <Bell size={17} />
        {unreadCount ? <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-black text-night">{unreadCount}</span> : null}
      </button>
      {open ? <div className="absolute left-0 top-12 z-[70] w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gold/20 bg-[#071521]/[0.98] shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-gold/12 px-4 py-4"><div><p className="text-sm font-black text-warm">اعلان‌های مطالعه</p><p className="mt-1 text-xs text-muted">یادآوری‌های آرام برای مسیر شخصی شما</p></div><button type="button" onClick={markAllRead} className="inline-flex items-center gap-1 text-xs font-black text-gold-light hover:text-gold"><CheckCheck size={15} /> خوانده شد</button></div>
        <div className="max-h-[390px] overflow-y-auto p-2">
          {notices.map((notice) => { const Icon = notice.icon; const unread = !seen.includes(notice.id); return <Link onClick={() => setOpen(false)} key={notice.id} href={notice.href} className="flex gap-3 rounded-xl p-3 transition hover:bg-gold/10"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/16 bg-gold/8 text-gold-light"><Icon size={18} /></span><span className="min-w-0"><span className="flex items-center gap-2 font-black text-warm">{notice.title}{unread ? <i className="h-1.5 w-1.5 rounded-full bg-gold" /> : null}</span><span className="mt-1 block text-xs leading-6 text-muted">{notice.body}</span></span></Link>; })}
        </div>
      </div> : null}
    </div>
  );
}
