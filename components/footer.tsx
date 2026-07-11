import Image from "next/image";
import Link from "next/link";

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

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-[#020305]">
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl lg:block" />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.75fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <h2 className="font-brand text-2xl tracking-[0.16em] text-gold-light">AVESTA-ZOROASTER</h2>
            <p className="mt-3 text-sm text-gold-light">پندار نیک | گفتار نیک | کردار نیک</p>
            <p className="mt-5 max-w-sm leading-8 text-muted">
              این وب‌سایت یک پروژه فرهنگی، آموزشی و پژوهشی برای تجربه دیجیتال اوستا، زرتشت و خرد ایران باستان است؛ جایی برای مطالعه، تصویر، منابع، روایت و مسیرهای یادگیری.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/avesta" className="rounded-full bg-gold px-4 py-2 text-xs font-black text-night transition hover:bg-gold-light">
                ورود به اوستا
              </Link>
              <Link href="/shop" className="rounded-full border border-gold/25 px-4 py-2 text-xs font-black text-gold-light transition hover:bg-gold/10">
                فروشگاه فرهنگی
              </Link>
            </div>
          </div>

          <FooterColumn title="پروژه" links={projectLinks} />
          <FooterColumn title="منابع" links={resourceLinks} />
          <FooterColumn title="دسترسی سریع" links={quickLinks} />
          <FooterColumn title="حساب و قوانین" links={policyLinks} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-gold/10 pt-8 text-sm text-muted md:flex-row">
          <p>تمامی حقوق محفوظ است. © ۱۴۰۵</p>
          <Image
            src="/images/avesta-zoroaster-logo.png"
            alt="AVESTA-ZOROASTER"
            width={170}
            height={88}
            className="h-20 w-auto object-contain opacity-86"
          />
          <p>ساخته‌شده برای جهان دیجیتال اوستا</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="font-black text-gold-light">{title}</h3>
      <div className="mt-4 grid gap-3 text-sm text-warm/78">
        {links.map(([label, href]) => (
          <Link key={`${label}-${href}`} href={href} className="transition hover:text-gold-light">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
