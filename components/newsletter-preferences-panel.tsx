"use client";

import Link from "next/link";
import { ArrowLeft, BellOff, Check, MailCheck, RefreshCw, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { NewsletterPreferenceRecord, NewsletterTopic } from "@/lib/newsletter";
import { newsletterDigest } from "@/lib/newsletter";

const newsletterKey = "avesta-newsletter-preferences-v1";

function readPreferences(): NewsletterPreferenceRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(newsletterKey) ?? "null");
    return parsed?.email && Array.isArray(parsed.topics)
      ? {
          email: parsed.email,
          topics: parsed.topics,
          status: parsed.status ?? "subscribed",
          updatedAt: parsed.updatedAt ?? parsed.savedAt ?? new Date().toISOString(),
        }
      : null;
  } catch {
    return null;
  }
}

export function NewsletterPreferencesPanel() {
  const defaultTopics = useMemo<NewsletterTopic[]>(() => ["daily", "calendar", "articles"], []);
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<NewsletterTopic[]>(defaultTopics);
  const [status, setStatus] = useState("تنظیمات خبرنامه آماده است.");
  const [subscriptionStatus, setSubscriptionStatus] = useState<"subscribed" | "unsubscribed">("subscribed");

  useEffect(() => {
    const saved = readPreferences();
    if (saved) {
      setEmail(saved.email);
      setTopics(saved.topics);
      setSubscriptionStatus(saved.status);
      setStatus(saved.status === "subscribed" ? "عضویت فعلی از حافظه خوانده شد." : "این ایمیل در حالت لغو عضویت محلی است.");
    }
  }, []);

  function toggleTopic(topic: NewsletterTopic) {
    setTopics((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]
    );
  }

  async function savePreferences(nextStatus: "subscribed" | "unsubscribed" = "subscribed") {
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("برای ذخیره تنظیمات، ایمیل معتبر وارد کنید.");
      return;
    }

    if (nextStatus === "subscribed" && !topics.length) {
      setStatus("برای عضویت فعال، حداقل یک موضوع را انتخاب کنید.");
      return;
    }

    const entry: NewsletterPreferenceRecord = {
      email: normalizedEmail,
      topics,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(newsletterKey, JSON.stringify(entry));
    setSubscriptionStatus(nextStatus);
    setStatus(nextStatus === "subscribed" ? "تنظیمات خبرنامه ذخیره شد." : "لغو عضویت محلی ثبت شد.");

    try {
      await fetch("/api/newsletter/preferences", {
        method: nextStatus === "subscribed" ? "PUT" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      setStatus("تنظیمات روی همین دستگاه ذخیره شد؛ اتصال API در دسترس نبود.");
    }
  }

  function resetLocal() {
    window.localStorage.removeItem(newsletterKey);
    setEmail("");
    setTopics(defaultTopics);
    setSubscriptionStatus("subscribed");
    setStatus("تنظیمات محلی پاک شد.");
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="lux-frame p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <MailCheck size={22} />
          <h2 className="text-2xl font-black text-warm">وضعیت عضویت</h2>
        </div>
        <div className="mt-5 grid gap-3">
          <Metric label="وضعیت" value={subscriptionStatus === "subscribed" ? "فعال" : "لغوشده"} />
          <Metric label="موضوع‌ها" value={`${topics.length}/${newsletterDigest.topics.length}`} />
        </div>
        <p className="mt-5 text-sm leading-7 text-muted">
          این صفحه فعلاً تنظیمات را روی همین دستگاه نگه می‌دارد و مسیر API برای اتصال به provider واقعی آماده است.
        </p>
        <Link href="/newsletter" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
          بازگشت به خبرنامه
          <ArrowLeft size={14} />
        </Link>
      </aside>

      <div className="lux-frame p-6 sm:p-7">
        <p className="gold-text text-xs font-semibold tracking-[0.24em]">PREFERENCES</p>
        <h2 className="mt-3 text-4xl font-black text-warm">تنظیمات خبرنامه روشنایی</h2>
        <p className="mt-4 leading-8 text-muted">موضوع‌های دلخواه را نگه دارید، تغییر دهید یا عضویت را لغو کنید.</p>

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ایمیل شما"
          className="mt-6 h-12 w-full rounded-xl border border-gold/18 bg-black/22 px-4 text-sm text-warm outline-none placeholder:text-muted focus:border-gold/45"
          dir="ltr"
        />

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

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => savePreferences("subscribed")}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            <Save size={16} />
            ذخیره تنظیمات
          </button>
          <button
            type="button"
            onClick={() => savePreferences("unsubscribed")}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-night/55 px-5 py-3 text-sm font-bold text-gold-light transition hover:border-gold/40"
          >
            <BellOff size={16} />
            لغو عضویت
          </button>
          <button
            type="button"
            onClick={resetLocal}
            className="inline-flex items-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-5 py-3 text-sm font-bold text-warm transition hover:border-gold/30"
          >
            <RefreshCw size={16} />
            پاک‌سازی محلی
          </button>
        </div>

        <p className="mt-5 inline-flex items-center gap-2 text-sm leading-7 text-muted">
          <Check size={16} className="text-gold-light" />
          {status}
        </p>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}
