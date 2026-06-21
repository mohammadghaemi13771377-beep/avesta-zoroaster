"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Loader2, Send, ShieldCheck, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import type { MobedReply } from "@/lib/mobed-guide";

type Message = {
  role: "assistant" | "user";
  content: string;
  reply?: MobedReply;
};

const openingMessage: Message = {
  role: "assistant",
  content: "درود. من موبد هوشمند، راهنمای مطالعه در جهان اوستا هستم. درباره واژه‌ها، گات‌ها، یسنا، وندیداد یا پیام اخلاقی یک متن بپرس؛ پاسخ را همراه با مسیر مطالعه و منبع سایت می‌دهم."
};

export function MobedGuidePanel({ starterQuestions }: { starterQuestions: string[] }) {
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function ask(value: string) {
    const clean = value.trim();
    if (!clean || loading) return;

    setMessages((current) => [...current, { role: "user", content: clean }]);
    setQuestion("");
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("/api/mobed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: clean })
      });
      const data = await response.json() as { ok: boolean; message?: string; reply?: MobedReply };

      if (!data.ok || !data.reply) {
        setStatus(data.message ?? "پاسخ راهنما در دسترس نیست.");
        return;
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply?.answer ?? "", reply: data.reply }]);
    } catch {
      setStatus("ارتباط با راهنما برقرار نشد. دوباره تلاش کن.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(question);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-3 text-gold-light"><Sparkles size={22} /><h2 className="text-2xl font-black text-warm">از اینجا شروع کن</h2></div>
          <p className="mt-4 text-sm leading-8 text-muted">پرسش کوتاه یا بلند بنویس. راهنما پاسخ آموزشی می‌دهد و تو را به صفحه‌های مرتبط سایت می‌برد.</p>
          <div className="mt-5 grid gap-2">
            {starterQuestions.map((item) => (
              <button key={item} type="button" onClick={() => void ask(item)} className="rounded-2xl border border-gold/12 bg-night/50 px-4 py-3 text-right text-sm font-bold leading-7 text-warm transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold-light">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gold/18 bg-gold/10 p-5">
          <div className="flex items-center gap-2 text-gold-light"><ShieldCheck size={19} /><h3 className="font-black">پاسخ مسئولانه</h3></div>
          <p className="mt-3 text-sm leading-8 text-muted">این راهنما از پاسخ قطعی تاریخی بدون منبع پرهیز می‌کند، منبع سایت را نشان می‌دهد و جایگزین پژوهش تخصصی یا مشاوره دینی نیست.</p>
          <Link href="/research-methodology" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">روش پژوهش <ArrowLeft size={15} /></Link>
        </div>
      </aside>

      <div className="lux-frame flex min-h-[660px] flex-col overflow-hidden">
        <div className="border-b border-gold/12 bg-gold/5 px-6 py-5">
          <div className="flex items-center gap-3 text-gold-light"><BookOpen size={21} /><div><p className="text-xs font-black tracking-[0.18em]">MOBED GUIDE</p><h2 className="mt-1 text-2xl font-black text-warm">گفت‌وگو با موبد هوشمند</h2></div></div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7" aria-live="polite">
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={message.role === "user" ? "mr-auto max-w-[86%] rounded-3xl border border-gold/25 bg-gold/12 p-5" : "max-w-[94%] rounded-3xl border border-gold/12 bg-night/55 p-5"}>
              <p className="text-xs font-black text-gold-light">{message.role === "user" ? "پرسش شما" : "موبد هوشمند"}</p>
              <p className="mt-3 whitespace-pre-line leading-8 text-warm">{message.content}</p>
              {message.reply ? (
                <div className="mt-5 grid gap-4 border-t border-gold/10 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-black text-gold-light">منابع و زمینه</p>
                    <div className="mt-2 flex flex-wrap gap-2">{message.reply.sources.map((source) => <Link key={source.href} href={source.href} className="rounded-full border border-gold/18 px-3 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10">{source.label}</Link>)}</div>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gold-light">مطالعه بعدی</p>
                    <div className="mt-2 flex flex-wrap gap-2">{message.reply.next.map((item) => <Link key={item.href} href={item.href} className="rounded-full border border-warm/12 bg-warm/5 px-3 py-2 text-xs font-bold text-warm transition hover:border-gold/35 hover:text-gold-light">{item.label}</Link>)}</div>
                  </div>
                  <p className="sm:col-span-2 text-xs leading-6 text-muted">{message.reply.note}</p>
                </div>
              ) : null}
            </article>
          ))}
          {loading ? <div className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-night/55 px-4 py-3 text-sm font-bold text-gold-light"><Loader2 className="animate-spin" size={16} />در حال آماده‌کردن پاسخ منبع‌دار...</div> : null}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gold/12 bg-night/35 p-4 sm:p-5">
          <label className="sr-only" htmlFor="mobed-question">پرسش از موبد هوشمند</label>
          <div className="flex gap-3">
            <textarea id="mobed-question" value={question} onChange={(event) => setQuestion(event.target.value)} rows={2} maxLength={900} placeholder="مثلاً: فرق گات‌ها و یشت‌ها چیست؟" className="min-h-[58px] flex-1 resize-none rounded-2xl border border-gold/18 bg-royal/55 px-4 py-3 text-warm outline-none placeholder:text-muted focus:border-gold" />
            <button type="submit" disabled={!question.trim() || loading} className="grid h-[58px] w-[58px] place-items-center self-end rounded-2xl bg-gold text-night transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-55" aria-label="ارسال پرسش"><Send size={19} /></button>
          </div>
          {status ? <p className="mt-3 text-sm text-gold-light">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
