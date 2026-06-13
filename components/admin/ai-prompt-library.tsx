"use client";

import { Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { aiPromptTemplates } from "@/lib/ai-prompts";

export function AiPromptLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyPrompt(id: string, prompt: string) {
    await navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1400);
  }

  return (
    <section className="mt-12 rounded-[18px] border border-gold/15 bg-night/60 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-gold-light">AI Prompt Library</p>
          <h2 className="mt-3 text-3xl font-black text-warm">کتابخانه پرامپت‌های تصویری</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این پرامپت‌ها سبک بصری پروژه را یک‌دست نگه می‌دارند. هر تصویر AI بهتر است از همین خانواده زبانی، رنگی و سینمایی تولید شود.
          </p>
        </div>
        <div className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light">
          {aiPromptTemplates.length} template
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {aiPromptTemplates.map((template) => (
          <article key={template.id} className="rounded-[18px] border border-gold/12 bg-royal/45 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold-light">
                  <Sparkles size={18} />
                  <p className="text-sm font-bold">{template.category}</p>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{template.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => copyPrompt(template.id, template.prompt)}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10"
              >
                <Copy size={16} />
                {copiedId === template.id ? "کپی شد" : "کپی"}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                {template.sectionSlug}
              </span>
              <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs text-muted">
                {template.mood}
              </span>
            </div>

            <p className="mt-4 leading-8 text-muted">{template.usage}</p>
            <div className="mt-4 rounded-2xl border border-gold/10 bg-night/75 p-4 text-left text-xs leading-6 text-gold-light" dir="ltr">
              {template.prompt}
            </div>
            <div className="mt-3 rounded-2xl border border-warm/10 bg-night/45 p-3 text-left text-xs leading-6 text-muted" dir="ltr">
              Negative: {template.negativePrompt}
            </div>
            <p className="mt-3 text-xs text-muted" dir="ltr">
              output: {template.recommendedPath}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
