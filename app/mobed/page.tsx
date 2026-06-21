import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Flame, ShieldCheck, Sparkles, Sprout } from "lucide-react";
import { CinematicHub } from "@/components/cinematic-hub";
import { MobedGuidePanel } from "@/components/mobed-guide-panel";
import { mobedStarterQuestions } from "@/lib/mobed-guide";

export const metadata: Metadata = {
  title: "موبد هوشمند | AVESTA-ZOROASTER",
  description: "راهنمای منبع‌دار و آموزشی برای پرسش درباره اوستا، گات‌ها، واژه‌نامه و خرد زرتشتی.",
};

export default function MobedPage() {
  return (
    <CinematicHub
      eyebrow="Guided Wisdom"
      title="موبد هوشمند؛ راهنمای شما در جهان اوستا"
      lead="پرسش خود را بنویس و از راهنمایی آموزشی، منبع سایت و مسیر مطالعه بعدی استفاده کن. این تجربه با گاردریل پژوهشی طراحی شده و برای اتصال آینده به جستجوی معنایی و RAG آماده است."
      scene="scene-prophet"
      heroImage="/images/ai/mobed-hero.png"
      roman="AI"
      actions={[{ label: "شروع گفت‌وگو", href: "#mobed-guide" }, { label: "روش پژوهش", href: "/research-methodology", variant: "secondary" }]}
      stats={[{ value: "منبع‌دار", label: "پاسخ همراه مسیر مطالعه" }, { value: "محترمانه", label: "گاردریل پژوهشی و فرهنگی" }, { value: "آماده", label: "اتصال آینده به RAG" }]}
    >
      <div id="mobed-guide" className="scroll-mt-28"><MobedGuidePanel starterQuestions={mobedStarterQuestions} /></div>
      <section className="mt-8 lux-frame p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="gold-text text-xs font-bold tracking-[0.2em]">GUIDED STARTS</p>
            <h2 className="mt-2 text-3xl font-black text-warm">یک مسیر روشن برای شروع</h2>
          </div>
          <p className="max-w-xl text-sm leading-8 text-muted">برای وقتی که هنوز پرسش دقیق نداری، از یکی از این چهار دروازه وارد شو. هرکدام به یک صفحهٔ مستقل و قابل مطالعه می‌رسند.</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <GuidePath href="/avesta/gathas" icon={Sparkles} label="اندیشه و انتخاب" title="از گات‌ها شروع کن" body="راهی برای آشنایی با راستی، اختیار و مسئولیت انسانی." />
          <GuidePath href="/avesta/yasna" icon={Flame} label="نیایش و آیین" title="وارد جهان یسنا شو" body="متن، ترجمه و زمینهٔ آیینی را مرحله‌به‌مرحله بخوان." />
          <GuidePath href="/dictionary" icon={BookOpen} label="واژه و مفهوم" title="یک واژه را دنبال کن" body="از اَشا تا فروهر؛ معنا، ریشه و پیوندهای مرتبط را ببین." />
          <GuidePath href="/daily-light" icon={Sprout} label="تمرین امروز" title="با یک قدم کوتاه آغاز کن" body="خواندن را با تأمل و یک انتخاب کوچک روزانه پیوند بده." />
        </div>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Info icon={BookOpen} title="محتوای سایت" body="پاسخ‌ها کاربر را به متن، واژه‌نامه، مقاله و مسیرهای مطالعه همین سایت وصل می‌کنند." />
        <Info icon={ShieldCheck} title="شفاف و محتاط" body="ادعای تاریخی قطعی بدون منبع نمی‌کند و برای پژوهش عمیق‌تر، صفحه منبع را پیشنهاد می‌دهد." />
        <Info icon={Sparkles} title="قابل گسترش" body="لایه API و قرارداد پاسخ آماده‌اند تا بعداً به مدل AI، RAG و منابع تاییدشده متصل شوند." />
      </section>
    </CinematicHub>
  );
}

function Info({ icon: Icon, title, body }: { icon: typeof BookOpen; title: string; body: string }) {
  return <article className="lux-frame p-6"><Icon className="text-gold-light" size={23} /><h2 className="mt-4 text-2xl font-black text-warm">{title}</h2><p className="mt-3 leading-8 text-muted">{body}</p></article>;
}

function GuidePath({ href, icon: Icon, label, title, body }: { href: string; icon: typeof Compass; label: string; title: string; body: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-gold/14 bg-night/45 p-5 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10">
      <Icon className="text-gold-light" size={22} />
      <p className="mt-5 text-xs font-bold text-gold-light">{label}</p>
      <h3 className="mt-2 text-xl font-black text-warm">{title}</h3>
      <p className="mt-2 min-h-14 text-sm leading-7 text-muted">{body}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">ورود مستقیم <ArrowLeft size={15} /></span>
    </Link>
  );
}
