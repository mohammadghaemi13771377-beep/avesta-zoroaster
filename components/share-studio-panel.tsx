"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Download, Palette, Share2, Sparkles } from "lucide-react";
import type { ShareCardFormat, ShareCardSeed, ShareCardTheme, ShareStudioState } from "@/lib/share-studio";

type ShareStudioPanelProps = {
  state: ShareStudioState;
};

export function ShareStudioPanel({ state }: ShareStudioPanelProps) {
  const [seedId, setSeedId] = useState(state.defaultSeed.id);
  const [themeId, setThemeId] = useState<ShareCardTheme>(state.defaultSeed.theme);
  const [format, setFormat] = useState<ShareCardFormat>("square");
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const seed = useMemo(() => state.seeds.find((item) => item.id === seedId) ?? state.defaultSeed, [seedId, state]);
  const theme = state.themes.find((item) => item.id === themeId) ?? state.themes[0];
  const selectedFormat = state.formats.find((item) => item.id === format) ?? state.formats[0];
  const shareText = `${seed.quote}\n\n${seed.sourceTitle}\nAVESTA-ZOROASTER\nhttps://avesta-zoroaster.com${seed.sourceHref}`;

  async function copyText() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadSvg() {
    const svg = buildShareSvg(seed, theme.accent, selectedFormat.size);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `avesta-share-${seed.id}-${Date.now()}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 1600);
  }

  async function shareCard() {
    if (navigator.share) {
      await navigator.share({
        title: seed.sourceTitle,
        text: shareText,
        url: window.location.href,
      });
      return;
    }

    await copyText();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-gold-light">
            <Palette size={24} />
            <h2 className="text-xl font-black text-warm">تنظیم کارت</h2>
          </div>

          <label className="mt-6 block">
            <span className="text-xs font-black text-gold-light">نقل‌قول</span>
            <select
              value={seedId}
              onChange={(event) => {
                const nextSeed = state.seeds.find((item) => item.id === event.target.value);
                setSeedId(event.target.value);
                if (nextSeed) setThemeId(nextSeed.theme);
              }}
              className="mt-2 h-12 w-full rounded-2xl border border-gold/20 bg-night/70 px-4 text-sm font-bold text-warm outline-none"
            >
              {state.seeds.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.sourceTitle}
                </option>
              ))}
            </select>
          </label>

          <ControlGroup title="تم">
            {state.themes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setThemeId(item.id)}
                className={buttonClass(themeId === item.id)}
              >
                <span>{item.label}</span>
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.accent }} />
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="فرمت">
            {state.formats.map((item) => (
              <button key={item.id} type="button" onClick={() => setFormat(item.id)} className={buttonClass(format === item.id)}>
                <span>{item.label}</span>
                <span className="text-xs text-muted" dir="ltr">{item.size}</span>
              </button>
            ))}
          </ControlGroup>

          <div className="mt-6 grid gap-2">
            <button type="button" onClick={copyText} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "کپی شد" : "کپی متن"}
            </button>
            <button type="button" onClick={downloadSvg} className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
              {downloaded ? <Check size={17} /> : <Download size={17} />}
              {downloaded ? "دانلود شد" : "دانلود SVG"}
            </button>
            <button type="button" onClick={shareCard} className="inline-flex items-center justify-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-5 py-3 text-sm font-black text-warm transition hover:border-gold/30">
              <Share2 size={17} />
              اشتراک‌گذاری
            </button>
          </div>
        </aside>

        <section className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className={`image-scene ${theme.scene} grid min-h-[610px] place-items-center rounded-[22px] border border-gold/16 p-5`}>
            <div className="relative z-10 flex min-h-[480px] w-full max-w-2xl flex-col justify-between rounded-[28px] border border-gold/24 bg-black/45 p-7 text-center shadow-gold backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-lg tracking-[0.22em] text-gold-light">AVESTA-ZOROASTER</p>
                <Sparkles className="text-gold-light" size={20} />
              </div>
              <blockquote className="py-8 text-3xl font-black leading-[2] text-warm">«{seed.quote}»</blockquote>
              <div>
                <p className="text-sm font-black text-gold-light">{seed.sourceTitle}</p>
                <p className="mt-3 text-xs leading-6 text-muted">{seed.ethicalMessage}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {seed.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-gold/10 bg-royal/35 p-5">
            <div>
              <p className="text-xs font-black text-gold-light">CTA مقصد</p>
              <p className="mt-2 text-sm font-bold text-warm">{seed.sourceHref}</p>
            </div>
            <Link href={seed.sourceHref} className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
              مشاهده منبع
              <ArrowLeft size={16} />
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}

function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <div className="mt-3 grid gap-2">{children}</div>
    </div>
  );
}

function buttonClass(active: boolean) {
  return active
    ? "flex items-center justify-between gap-3 rounded-2xl border border-gold/50 bg-gold/15 px-4 py-3 text-right text-sm font-black text-warm"
    : "flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-night/55 px-4 py-3 text-right text-sm font-bold text-muted transition hover:border-gold/35 hover:text-warm";
}

function buildShareSvg(seed: ShareCardSeed, accent: string, size: string) {
  const [width, height] = size.split("×").map((item) => Number(item.trim())) as [number, number];
  const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const lines = wrapText(seed.quote, width > height ? 46 : 28).slice(0, 5);
  const startY = height / 2 - lines.length * 34;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#05080D"/>
  <circle cx="${width / 2}" cy="${height * 0.24}" r="${Math.min(width, height) * 0.25}" fill="${accent}" opacity="0.22"/>
  <rect x="${width * 0.07}" y="${height * 0.07}" width="${width * 0.86}" height="${height * 0.86}" rx="44" fill="#071521" fill-opacity="0.72" stroke="${accent}" stroke-opacity="0.55" stroke-width="3"/>
  <text x="${width / 2}" y="${height * 0.18}" fill="#F2D58A" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width * 0.04)}" letter-spacing="6">AVESTA-ZOROASTER</text>
  ${lines
    .map(
      (line, index) =>
        `<text x="${width / 2}" y="${startY + index * 78}" fill="#FFF8EA" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" font-family="Tahoma, Arial, sans-serif" font-size="${Math.round(width * 0.05)}" font-weight="700">${escape(line)}</text>`,
    )
    .join("\n  ")}
  <text x="${width / 2}" y="${height * 0.78}" fill="${accent}" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" font-family="Tahoma, Arial, sans-serif" font-size="${Math.round(width * 0.028)}">${escape(seed.sourceTitle)}</text>
  <text x="${width / 2}" y="${height * 0.86}" fill="#B9B9B9" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width * 0.024)}">avesta-zoroaster.com</text>
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

  if (current) lines.push(current);
  return lines.length ? lines : [text];
}
