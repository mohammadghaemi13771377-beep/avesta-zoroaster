"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Check, Mail, RefreshCw, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { NewsletterTopic } from "@/lib/newsletter";
import { newsletterDigest } from "@/lib/newsletter";

type SavedNewsletter = {
  email: string;
  topics: NewsletterTopic[];
  status?: "subscribed" | "unsubscribed";
  savedAt: string;
  updatedAt?: string;
};

const newsletterKey = "avesta-newsletter-preferences-v1";

function readSavedNewsletter(): SavedNewsletter | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(newsletterKey) ?? "null");
    return parsed?.email && Array.isArray(parsed.topics) ? parsed : null;
  } catch {
    return null;
  }
}

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const defaultTopics = useMemo<NewsletterTopic[]>(() => ["daily", "calendar", "articles"], []);
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<NewsletterTopic[]>(defaultTopics);
  const [status, setStatus] = useState("آماده عضویت در خبرنامه روشنایی.");
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    const saved = readSavedNewsletter();
    if (saved) {
      setEmail(saved.email);
      setTopics(saved.topics);
      setSavedAt(saved.updatedAt ?? saved.savedAt);
      setStatus(saved.status === "unsubscribed" ? "این ایمیل قبلاً لغو عضویت محلی شده است." : "تنظیمات خبرنامه از حافظه همین دستگاه خوانده شد.");
    }
  }, []);

  function toggleTopic(topic: NewsletterTopic) {
    setTopics((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]
    );
  }

  async function submitSignup() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }

    if (!topics.length) {
      setStatus("حداقل یک موضوع خبرنامه را انتخاب کنید.");
      return;
    }

    const entry: SavedNewsletter = {
      email: normalizedEmail,
      topics,
      status: "subscribed",
      savedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(newsletterKey, JSON.stringify(entry));
    setSavedAt(entry.savedAt);
    setStatus("عضویت محلی ثبت شد؛ API هم برای اتصال به سرویس ایمیل آماده است.");

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      setStatus("عضویت محلی ثبت شد؛ اتصال شبکه برای API در دسترس نبود.");
    }
  }

  function clearSignup() {
    window.localStorage.removeItem(newsletterKey);
    setEmail("");
    setTopics(defaultTopics);
    setSavedAt("");
    setStatus("تنظیمات خبرنامه پاک شد.");
  }

  return (
    <section className={compact ? "lux-frame rounded-[18px] p-5" : "grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"}>
      {!compact ? (
        <aside className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Mail size={22} />
            <h2 className="text-2xl font-black text-warm">{newsletterDigest.title}</h2>
          </div>
          <p className="mt-4 leading-8 text-muted">{newsletterDigest.subtitle}</p>
          <div className="mt-5 grid gap-3">
            <Metric icon={Sparkles} label="ریتم ارسال" value={newsletterDigest.cadence} />
            <Metric icon={Check} label="موضوع‌ها" value={`${newsletterDigest.topics.length} محور`} />
          </div>
          <p className="mt-5 text-sm leading-7 text-muted">{newsletterDigest.privacyNote}</p>
        </aside>
      ) : null}

      <div className={compact ? "" : "lux-frame p-6 sm:p-7"}>
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
            <Mail size={23} />
          </div>
          <div>
            <p className="text-xs font-bold text-gold-light">NEWSLETTER</p>
            <h2 className="text-2xl font-black text-warm">{newsletterDigest.title}</h2>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ایمیل شما"
            className="h-12 flex-1 rounded-xl border border-gold/18 bg-black/22 px-4 text-sm text-warm outline-none placeholder:text-muted focus:border-gold/45"
            dir="ltr"
          />
          <button
            type="button"
            onClick={submitSignup}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold px-7 font-black text-night"
          >
            عضویت
            <Send size={16} />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {newsletterDigest.topics.map((topic) => {
            const active = topics.includes(topic.id);

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={
                  active
                    ? "rounded-2xl border border-gold/45 bg-gold/12 p-4 text-right"
                    : "rounded-2xl border border-gold/10 bg-night/55 p-4 text-right transition hover:border-gold/35"
                }
              >
                <span className="text-sm font-black text-warm">{topic.label}</span>
                <span className="mt-2 block text-xs leading-6 text-muted">{topic.description}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-7 text-muted">{status}</p>
          <div className="flex flex-wrap gap-2">
            {savedAt ? (
              <button
                type="button"
                onClick={clearSignup}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light"
              >
                <RefreshCw size={13} />
                بازنشانی
              </button>
            ) : null}
            <Link href="/newsletter" className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
              صفحه خبرنامه
              <ArrowLeft size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <Icon className="text-gold-light" size={20} />
      <p className="mt-3 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-lg font-black text-warm">{value}</p>
    </div>
  );
}
