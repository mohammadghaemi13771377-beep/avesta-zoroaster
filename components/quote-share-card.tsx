"use client";

import { Check, Copy, Download, Share2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type QuoteShareCardProps = {
  quote: string;
  sectionTitle: string;
  chapterTitle: string;
  verseNumber: string;
  brand?: string;
};

export function QuoteShareCard({
  quote,
  sectionTitle,
  chapterTitle,
  verseNumber,
  brand = "AVESTA-ZOROASTER"
}: QuoteShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const shareText = useMemo(
    () => `${quote}\n\n${sectionTitle} - ${chapterTitle} - ${verseNumber}\n${brand}`,
    [brand, chapterTitle, quote, sectionTitle, verseNumber]
  );

  async function copyQuote() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadSvg() {
    const svg = buildQuoteSvg({
      quote,
      sectionTitle,
      chapterTitle,
      verseNumber,
      brand
    });
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `avesta-quote-${Date.now()}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 1800);
  }

  async function shareQuote() {
    if (navigator.share) {
      await navigator.share({
        title: `${brand} - ${verseNumber}`,
        text: shareText,
        url: window.location.href
      });
      return;
    }

    await copyQuote();
  }

  return (
    <section className="lux-frame overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
        <div className="relative min-h-[360px] overflow-hidden bg-night p-7 sm:p-10">
          <div className="absolute inset-0 opacity-95">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 25%, rgba(242, 213, 138, 0.28), transparent 13rem), linear-gradient(145deg, #071521, #05080D 58%, #020305)"
              }}
            />
            <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-l from-transparent via-gold/60 to-transparent" />
            <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-l from-transparent via-gold/35 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between rounded-[1.35rem] border border-gold/20 bg-black/20 p-6 shadow-gold">
            <div className="flex items-center justify-between gap-4">
              <p className="font-brand text-lg tracking-[0.22em] text-gold-light">{brand}</p>
              <Sparkles className="h-5 w-5 text-gold-light" />
            </div>

            <blockquote className="py-8 text-center text-2xl font-black leading-[2.05] text-warm sm:text-3xl">
              «{quote}»
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gold-light">
              <span>{sectionTitle}</span>
              <span>{chapterTitle}</span>
              <span>{verseNumber}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/15 bg-royal/45 p-7 lg:border-r lg:border-t-0">
          <p className="gold-text text-sm font-semibold tracking-[0.24em]">SHARE CARD</p>
          <h2 className="mt-3 text-3xl font-black text-warm">کارت نقل‌قول طلایی</h2>
          <p className="mt-4 text-sm leading-8 text-muted">
            این کارت برای انتشار پیام‌های کوتاه اوستا در شبکه‌های اجتماعی آماده شده است. فعلاً خروجی SVG سبک می‌دهد و
            بعداً می‌تواند به PNG برندشده وصل شود.
          </p>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={copyQuote}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "کپی شد" : "کپی متن"}
            </button>
            <button
              type="button"
              onClick={downloadSvg}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
            >
              {downloaded ? <Check size={17} /> : <Download size={17} />}
              {downloaded ? "آماده شد" : "دانلود کارت SVG"}
            </button>
            <button
              type="button"
              onClick={shareQuote}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-5 py-3 text-sm font-black text-warm transition hover:border-gold/30"
            >
              <Share2 size={17} />
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildQuoteSvg({
  quote,
  sectionTitle,
  chapterTitle,
  verseNumber,
  brand
}: Required<QuoteShareCardProps>) {
  const escape = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  const wrappedQuote = wrapText(quote, 28).slice(0, 4);
  const quoteStartY = 430 - wrappedQuote.length * 42;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <radialGradient id="sun" cx="50%" cy="28%" r="55%">
      <stop offset="0%" stop-color="#F2D58A" stop-opacity="0.42"/>
      <stop offset="48%" stop-color="#071521" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#05080D"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF8EA"/>
      <stop offset="45%" stop-color="#F2D58A"/>
      <stop offset="100%" stop-color="#D6A84F"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="#05080D"/>
  <rect width="1080" height="1080" fill="url(#sun)"/>
  <rect x="70" y="70" width="940" height="940" rx="42" fill="#05080D" fill-opacity="0.58" stroke="#D6A84F" stroke-opacity="0.46" stroke-width="3"/>
  <circle cx="540" cy="238" r="74" fill="none" stroke="#D6A84F" stroke-opacity="0.55" stroke-width="3"/>
  <text x="540" y="250" fill="url(#gold)" text-anchor="middle" font-family="Georgia, serif" font-size="46" letter-spacing="8">${escape(brand)}</text>
  <line x1="170" y1="330" x2="910" y2="330" stroke="#D6A84F" stroke-opacity="0.48" stroke-width="2"/>
  ${wrappedQuote
    .map(
      (line, index) =>
        `<text x="540" y="${quoteStartY + index * 86}" fill="#FFF8EA" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" font-family="Tahoma, Arial, sans-serif" font-size="54" font-weight="700">${escape(line)}</text>`
    )
    .join("\n  ")}
  <line x1="220" y1="790" x2="860" y2="790" stroke="#D6A84F" stroke-opacity="0.34" stroke-width="2"/>
  <text x="540" y="855" fill="#F2D58A" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" font-family="Tahoma, Arial, sans-serif" font-size="34">${escape(sectionTitle)} | ${escape(chapterTitle)} | ${escape(verseNumber)}</text>
  <text x="540" y="925" fill="#B9B9B9" text-anchor="middle" font-family="Georgia, serif" font-size="28">avesta-zoroaster.com</text>
</svg>`;
}

function wrapText(text: string, maxLength: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length ? lines : [text];
}
