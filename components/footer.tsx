import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, Compass, Mail, ScrollText, ShieldCheck, Sparkles } from "lucide-react";

const quickLinks = [
  ["خانه", "/"],
  ["اوستا", "/avesta"],
  ["زرتشت", "/zoroaster"],
  ["فروشگاه", "/shop"],
  ["تایم‌لاین", "/timeline"],
  ["نقشه سایت", "/sitemap.xml"],
];

const resourceLinks = [
  ["کتابخانه", "/library"],
  ["واژه‌نامه", "/dictionary"],
  ["رسانه", "/media"],
  ["مقاله‌ها", "/articles"],
  ["جستجو", "/search"],
  ["منابع پژوهشی", "/citations"],
];

const projectLinks = [
  ["درباره ما", "/about"],
  ["ماموریت", "/mission"],
  ["همکاری", "/collaboration"],
  ["تماس با ما", "/contact"],
  ["روش پژوهش", "/research-methodology"],
  ["مرکز اعتماد", "/trust-center"],
];

const policyLinks = [
  ["حریم خصوصی", "/privacy-center"],
  ["قوانین استفاده", "/terms"],
  ["داشبورد کاربری", "/dashboard"],
  ["ورود / ثبت‌نام", "/login"],
];

const trustItems: Array<[string, string, LucideIcon]> = [
  ["مسیر پژوهشی", "منابع و روش خوانش", ScrollText],
  ["جهان تصویری", "رسانه و نمایشگاه", Sparkles],
  ["مطالعه آرام", "اوستا، فصل و بند", BookOpen],
  ["اعتماد", "شفافیت و همکاری", ShieldCheck],
];

export function Footer() {
  return (
    <footer className="footer-museum relative overflow-hidden border-t border-gold/12 bg-[#020305]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,213,138,0.15),transparent_32rem),radial-gradient(circle_at_12%_80%,rgba(126,217,230,0.08),transparent_24rem)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="footer-brand-card lux-frame qerti-soft-panel rounded-[24px] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Image
                src="/images/avesta-zoroaster-logo.png"
                alt="AVESTA-ZOROASTER"
                width={112}
                height={112}
                className="h-24 w-24 rounded-full object-cover ring-1 ring-gold/24"
              />
              <div>
                <h2 className="font-brand text-2xl tracking-[0.16em] text-gold-light sm:text-3xl">AVESTA-ZOROASTER</h2>
                <p className="mt-2 text-sm font-bold text-gold-light">پندار نیک | گفتار نیک | کردار نیک</p>
                <p className="mt-4 max-w-2xl leading-8 text-muted">
                  جهان دیجیتال اوستا و زرتشت؛ جایی برای مطالعه، تصویر، واژه‌نامه، منابع پژوهشی، رسانه، مسیرهای یادگیری و تجربه‌ای سینمایی از خرد ایران باستان.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/avesta" className="qerti-cta inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
                ورود به جهان اوستا
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/collaboration" className="qerti-subtle-lift inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/16 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
                همکاری پژوهشی و هنری
                <Compass className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="qerti-subtle-lift inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/16 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
                تماس با ما
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {trustItems.map(([title, subtitle, Icon]) => (
              <div key={title} className="footer-trust-card qerti-feature-card rounded-[20px] border border-gold/14 bg-royal/54 p-5">
                <Icon className="text-gold-light" size={22} />
                <p className="mt-4 text-sm font-black text-warm">{title}</p>
                <p className="mt-1 text-xs font-bold leading-6 text-muted">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-link-shelf mt-10 grid gap-7 rounded-[24px] border border-gold/12 bg-black/16 p-6 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="پروژه" links={projectLinks} />
          <FooterColumn title="منابع" links={resourceLinks} />
          <FooterColumn title="دسترسی سریع" links={quickLinks} />
          <FooterColumn title="حساب و قوانین" links={policyLinks} />
        </div>

        <div className="footer-legal-row mt-8 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-7 text-sm text-muted md:flex-row">
          <p>تمامی حقوق محفوظ است. © ۱۴۰۵</p>
          <p className="text-center">این وب‌سایت یک پروژه فرهنگی و آموزشی است و جایگزین منبع دانشگاهی قطعی نیست.</p>
          <p>ساخته‌شده برای جهان دیجیتال اوستا</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="text-base font-black text-gold-light">{title}</h3>
      <div className="mt-4 grid gap-2.5 text-sm text-warm/78">
        {links.map(([label, href]) => (
          <Link key={`${label}-${href}`} href={href} className="footer-link group inline-flex items-center justify-between gap-3 rounded-xl px-1 py-1 transition hover:text-gold-light">
            <span>{label}</span>
            <ArrowLeft className="h-3.5 w-3.5 opacity-0 transition group-hover:-translate-x-1 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
