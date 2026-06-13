"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clipboard, ImagePlus, Palette, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { AiArtBrief } from "@/lib/ai-art-studio";

type AiArtStudioProps = {
  briefs: AiArtBrief[];
  styleRules: string[];
  adminMode?: boolean;
};

export function AiArtStudio({ briefs, styleRules, adminMode = false }: AiArtStudioProps) {
  const [activeId, setActiveId] = useState(briefs[0]?.id ?? "");
  const [copied, setCopied] = useState<"prompt" | "negative" | "brief" | null>(null);
  const activeBrief = useMemo(
    () => briefs.find((brief) => brief.id === activeId) ?? briefs[0],
    [activeId, briefs]
  );

  async function copyText(kind: "prompt" | "negative" | "brief", value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1400);
  }

  if (!activeBrief) {
    return null;
  }

  const fullBrief = [
    `Title: ${activeBrief.title}`,
    `Usage: ${activeBrief.usage}`,
    `Mood: ${activeBrief.mood}`,
    `Ratios: ${activeBrief.ratios.join(", ")}`,
    `Path: ${activeBrief.recommendedPath}`,
    "",
    `Prompt: ${activeBrief.prompt}`,
    "",
    `Negative prompt: ${activeBrief.negativePrompt}`,
  ].join("\n");

  return (
    <section className={adminMode ? "mt-12" : "mt-0"}>
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="lux-frame p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <ImagePlus size={22} />
            <h2 className="text-xl font-black text-warm">تالارهای تصویری</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {briefs.map((brief) => (
              <button
                key={brief.id}
                type="button"
                onClick={() => setActiveId(brief.id)}
                className={
                  activeBrief.id === brief.id
                    ? "rounded-2xl border border-gold/55 bg-gold/15 p-4 text-right shadow-gold transition"
                    : "rounded-2xl border border-gold/12 bg-night/55 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
                }
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-black text-warm">{brief.title}</span>
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: brief.palette[0] }} />
                </span>
                <span className="mt-2 block text-xs leading-6 text-muted">{brief.usage}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="gold-text text-xs font-semibold tracking-[0.25em]">AI ART BRIEF</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-warm">{activeBrief.title}</h2>
              <p className="mt-4 leading-8 text-muted">{activeBrief.usage}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>{activeBrief.category}</Tag>
                <Tag>{activeBrief.sectionSlug}</Tag>
                {activeBrief.ratios.map((ratio) => (
                  <Tag key={ratio}>{ratio}</Tag>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-gold/10 bg-night/60 p-4">
                <div className="flex items-center gap-2 text-gold-light">
                  <Palette size={18} />
                  <p className="font-black">پالت و mood</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{activeBrief.mood}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeBrief.palette.map((color) => (
                    <span
                      key={color}
                      className="h-10 w-16 rounded-xl border border-warm/10"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="image-scene scene-stone min-h-[360px] rounded-[18px] border border-gold/16">
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/16 bg-black/45 p-5 backdrop-blur">
                <p className="text-xs font-bold text-gold-light">Recommended output</p>
                <p className="mt-2 break-all text-left text-xs leading-6 text-warm/78" dir="ltr">
                  {activeBrief.recommendedPath}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <PromptBox
              title="Prompt"
              value={activeBrief.prompt}
              copied={copied === "prompt"}
              onCopy={() => copyText("prompt", activeBrief.prompt)}
            />
            <PromptBox
              title="Negative prompt"
              value={activeBrief.negativePrompt}
              copied={copied === "negative"}
              onCopy={() => copyText("negative", activeBrief.negativePrompt)}
            />
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.82fr]">
            <div className="rounded-3xl border border-gold/10 bg-night/50 p-5">
              <div className="flex items-center gap-2 text-gold-light">
                <Sparkles size={18} />
                <h3 className="font-black text-warm">قواعد سبک تصویری</h3>
              </div>
              <div className="mt-4 grid gap-3">
                {styleRules.map((rule) => (
                  <p key={rule} className="rounded-2xl border border-gold/10 bg-black/20 p-3 text-sm leading-7 text-muted">
                    {rule}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gold/10 bg-gold/10 p-5">
              <h3 className="font-black text-warm">چک‌لیست تولید</h3>
              <div className="mt-4 grid gap-3">
                {activeBrief.productionNotes.map((note) => (
                  <p key={note} className="flex gap-2 rounded-2xl border border-gold/10 bg-black/18 p-3 text-sm leading-7 text-muted">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-light" />
                    {note}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyText("brief", fullBrief)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  <Clipboard size={16} />
                  {copied === "brief" ? "کپی شد" : "کپی brief کامل"}
                </button>
                {adminMode ? (
                  <Link
                    href="/admin/media"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
                  >
                    ثبت در رسانه
                    <ArrowLeft size={16} />
                  </Link>
                ) : (
                  <Link
                    href="/media"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
                  >
                    رفتن به رسانه
                    <ArrowLeft size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
      {children}
    </span>
  );
}

function PromptBox({
  title,
  value,
  copied,
  onCopy,
}: {
  title: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-night/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-warm">{title}</h3>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-3 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10"
        >
          <Clipboard size={14} />
          {copied ? "کپی شد" : "کپی"}
        </button>
      </div>
      <p className="mt-4 max-h-44 overflow-auto rounded-2xl border border-gold/10 bg-black/25 p-4 text-left text-xs leading-6 text-muted" dir="ltr">
        {value}
      </p>
    </div>
  );
}
