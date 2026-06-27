import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

const prompts = ["اشا یعنی چه؟", "فرق گات‌ها و یشت‌ها چیست؟", "پیام اخلاقی اوستا چیست؟"];

export function MobedHomeCallout() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lux-frame overflow-hidden rounded-[22px]">
        <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="image-atmosphere relative min-h-[260px] overflow-hidden">
            <Image src="/images/ai/monotheism-hero.jpg" alt="موبد هوشمند و راهنمای مطالعه اوستا" fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/82 via-night/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6"><p className="text-xs font-black tracking-[0.2em] text-gold-light">MOBED GUIDE</p><p className="mt-2 text-xl font-black text-warm">پرسش، منبع و مسیر بعدی</p></div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-sm font-black text-gold-light"><MessageCircle size={19} />موبد هوشمند</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/18 bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold-light"><ShieldCheck size={14} />پاسخ منبع‌دار</span>
            </div>
            <h2 className="mt-4 text-3xl font-black leading-10 text-warm">هر پرسش، یک راه تازه برای ورود به جهان اوستا</h2>
            <p className="mt-3 max-w-2xl leading-8 text-muted">درباره اشا، گات‌ها، یسنا، وندیداد یا پیام اخلاقی متن‌ها بپرس؛ راهنما پاسخ آموزشی می‌دهد و تو را به منبع و مطالعه بعدی می‌رساند.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {prompts.map((prompt) => <Link key={prompt} href="/mobed" className="rounded-full border border-gold/15 bg-night/45 px-3 py-2 text-xs font-bold text-warm transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold-light"><Sparkles className="ml-1 inline" size={13} />{prompt}</Link>)}
            </div>
            <Link href="/mobed" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">گفت‌وگو با موبد هوشمند <ArrowLeft size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
