"use client";

import { Check, RotateCcw, Save, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  buildDefaultConsent,
  consentPolicy,
  consentStorageKey,
  getConsentSummary,
  normalizeConsentSnapshot,
  type ConsentCategory,
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

export function PrivacyConsentPanel() {
  const [consent, setConsent] = useState<ConsentSnapshot>(() => buildDefaultConsent());
  const [status, setStatus] = useState("تنظیمات حریم خصوصی آماده است.");
  const summary = useMemo(() => getConsentSummary(consent), [consent]);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  function toggle(category: ConsentCategory) {
    const item = consentPolicy.find((policy) => policy.id === category);
    if (item?.required) return;

    setConsent((current) => ({
      ...current,
      [category]: {
        enabled: !current[category].enabled,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  function saveConsent(next = consent) {
    const normalized = normalizeConsentSnapshot(next);
    window.localStorage.setItem(consentStorageKey, JSON.stringify(normalized));
    setConsent(normalized);
    setStatus("تنظیمات حریم خصوصی ذخیره شد.");
  }

  function acceptAll() {
    const now = new Date().toISOString();
    const next = consentPolicy.reduce((snapshot, item) => {
      snapshot[item.id] = { enabled: true, updatedAt: now };
      return snapshot;
    }, buildDefaultConsent(now));
    saveConsent(next);
  }

  function resetConsent() {
    const next = buildDefaultConsent();
    window.localStorage.setItem(consentStorageKey, JSON.stringify(next));
    setConsent(next);
    setStatus("تنظیمات به حالت حداقلی بازگشت.");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <ShieldCheck size={24} />
            <h2 className="text-2xl font-black text-warm">مرکز رضایت کاربر</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            این بخش مشخص می‌کند AVESTA-ZOROASTER چه داده‌هایی را برای تجربه، آنالیتیکس، نورنامه و فروشگاه ذخیره کند.
          </p>
          <p className="mt-5 text-sm font-bold text-gold-light">آمادگی حریم خصوصی</p>
          <p className="mt-2 text-6xl font-black text-warm">{summary.privacyReadiness}%</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${summary.privacyReadiness}%` }} />
          </div>
          <div className="mt-5 grid gap-3">
            <Metric label="ضروری" value={String(summary.required)} />
            <Metric label="اختیاری فعال" value={`${summary.enabledOptional}/${summary.optional}`} />
            <Metric label="وضعیت آنالیتیکس" value={consent.analytics.enabled ? "فعال" : "خاموش"} />
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{status}</p>
        </div>

        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={18} />
            <h3 className="font-black text-warm">اصل طراحی</h3>
          </div>
          <p className="mt-3 text-sm leading-8 text-muted">
            داده‌های حساس، متن یادداشت خصوصی و ایمیل نباید به ابزارهای خارجی analytics ارسال شوند. مسیر production باید consent-aware بماند.
          </p>
        </div>
      </aside>

      <div className="lux-frame p-5 sm:p-7">
        <p className="gold-text text-xs font-semibold tracking-[0.24em]">PRIVACY CONTROL</p>
        <h2 className="mt-3 text-4xl font-black text-warm">تنظیمات ذخیره و ردیابی</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          گزینه‌های اختیاری را بر اساس ترجیح کاربر فعال کنید. گزینه ضروری همیشه روشن می‌ماند.
        </p>

        <div className="mt-6 grid gap-4">
          {consentPolicy.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={
                consent[item.id].enabled
                  ? "rounded-3xl border border-gold/35 bg-gold/15 p-5 text-right transition hover:border-gold/60"
                  : "rounded-3xl border border-gold/10 bg-night/55 p-5 text-right transition hover:border-gold/35"
              }
            >
              <span className="flex flex-wrap items-center justify-between gap-3">
                <span>
                  <span className="text-xl font-black text-warm">{item.title}</span>
                  {item.required ? <span className="mr-2 text-xs font-bold text-gold-light">اجباری</span> : null}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/20 px-3 py-1 text-xs font-black text-gold-light">
                  {consent[item.id].enabled ? <Check size={14} /> : null}
                  {consent[item.id].enabled ? "فعال" : "خاموش"}
                </span>
              </span>
              <span className="mt-3 block text-sm leading-7 text-muted">{item.description}</span>
              <span className="mt-4 flex flex-wrap gap-2">
                {item.examples.map((example) => (
                  <span key={example} className="rounded-full border border-gold/10 bg-black/20 px-3 py-1 text-xs text-muted">
                    {example}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveConsent()}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            <Save size={17} />
            ذخیره تنظیمات
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-3 text-sm font-bold text-gold-light transition hover:border-gold/40"
          >
            <Check size={17} />
            فعال‌سازی همه
          </button>
          <button
            type="button"
            onClick={resetConsent}
            className="inline-flex items-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-5 py-3 text-sm font-bold text-warm transition hover:border-gold/30"
          >
            <RotateCcw size={17} />
            حالت حداقلی
          </button>
        </div>
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
