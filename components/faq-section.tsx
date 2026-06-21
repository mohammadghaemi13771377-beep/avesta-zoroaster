import { ArrowLeft, HelpCircle } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lux-frame rounded-[22px] p-5 sm:p-7">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.18em] text-gold-light"><HelpCircle size={16} />راهنمای آغاز سفر</p>
          <h2 className="mt-3 text-3xl font-black text-warm">پرسش‌های نخست درباره اوستا و زرتشت</h2>
          <p className="mt-3 leading-8 text-muted">برای ورود آرام‌تر به جهان اوستا، پاسخ‌های کوتاه و مسیرهای مطالعه را از اینجا شروع کن.</p>
        </div>
        <div className="mt-7 grid gap-3">
          {items.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-gold/12 bg-night/45 p-5 transition open:border-gold/35 open:bg-gold/[0.07]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black text-warm marker:content-none">
                {item.question}
                <ArrowLeft className="shrink-0 text-gold-light transition group-open:-rotate-90" size={18} />
              </summary>
              <p className="mt-4 max-w-4xl leading-8 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
