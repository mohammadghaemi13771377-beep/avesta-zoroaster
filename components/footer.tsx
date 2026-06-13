import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  ["خانه", "/"],
  ["اوستا", "/avesta"],
  ["زرتشت", "/zoroaster"],
  ["دین زرتشتی", "/zoroastrianism"],
  ["تایم‌لاین", "/timeline"],
  ["نقشه سایت", "/sitemap.xml"]
];

const resourceLinks = [
  ["کتابخانه", "/library"],
  ["واژه‌نامه", "/dictionary"],
  ["رسانه", "/media"],
  ["مقالات", "/articles"],
  ["جستجو", "/search"]
];

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-[#020305]">
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl lg:block" />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <h2 className="font-display text-2xl tracking-[0.16em] text-gold-light">AVESTA-ZOROASTER</h2>
            <p className="mt-3 text-sm text-gold-light">پندار نیک | گفتار نیک | کردار نیک</p>
            <p className="mt-5 max-w-sm leading-8 text-muted">
              این وبسایت یک پروژه فرهنگی و غیرتجاری برای تجربه دیجیتال اوستا، زرتشت و خرد ایران باستان است.
            </p>
          </div>

          <FooterColumn title="پروژه" links={[["درباره ما", "/about"], ["ماموریت", "/about"], ["حریم خصوصی", "/privacy-center"], ["همکاری", "/about"]]} />
          <FooterColumn title="منابع" links={resourceLinks} />
          <FooterColumn title="دسترسی سریع" links={quickLinks} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-gold/10 pt-8 text-sm text-muted md:flex-row">
          <p>تمامی حقوق محفوظ است. © ۱۴۰۴</p>
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
