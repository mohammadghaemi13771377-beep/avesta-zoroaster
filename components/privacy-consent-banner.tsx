"use client";

import Link from "next/link";
import { Check, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  buildDefaultConsent,
  consentPolicy,
  consentStorageKey,
  hasConsentDecision,
  normalizeConsentSnapshot,
  type ConsentSnapshot,
} from "@/lib/privacy-consent";

function readConsent() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(consentStorageKey) ?? "null");
    return normalizeConsentSnapshot(parsed);
  } catch {
    return buildDefaultConsent();
  }
}

function saveConsent(snapshot: ConsentSnapshot) {
  window.localStorage.setItem(consentStorageKey, JSON.stringify(normalizeConsentSnapshot(snapshot)));
}

export function PrivacyConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const snapshot = readConsent();
    setVisible(!hasConsentDecision(snapshot));
  }, []);

  function acceptAll() {
    const now = new Date().toISOString();
    const next = consentPolicy.reduce((snapshot, item) => {
      snapshot[item.id] = { enabled: true, updatedAt: now };
      return snapshot;
    }, buildDefaultConsent(now));
    saveConsent(next);
    setVisible(false);
  }

  function keepEssential() {
    const now = new Date().toISOString();
    const next = buildDefaultConsent(now);
    next.analytics.updatedAt = now;
    next.personalization.updatedAt = now;
    next.newsletter.updatedAt = now;
    next.commerce.updatedAt = now;
    saveConsent(next);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-5xl rounded-3xl border border-gold/25 bg-[#05080d]/95 p-4 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold/20 bg-gold/10 text-gold-light">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-warm">انتخاب حریم خصوصی</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              برای بهبود تجربه، فقط با رضایت شما آنالیتیکس و شخصی‌سازی فعال می‌شود. حالت ضروری همیشه برای کارکرد سایت روشن است.
            </p>
            <Link href="/privacy-center" className="mt-2 inline-flex text-xs font-black text-gold-light">
              مشاهده تنظیمات کامل
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            <Check size={16} />
            فعال‌سازی همه
          </button>
          <button
            type="button"
            onClick={keepEssential}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-bold text-gold-light transition hover:border-gold/40"
          >
            <X size={16} />
            فقط ضروری
          </button>
        </div>
      </div>
    </section>
  );
}
