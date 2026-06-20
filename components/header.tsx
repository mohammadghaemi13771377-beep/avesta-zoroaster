import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogIn, Search, UserRound } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNavigation } from "@/components/mobile-navigation";
import { avestaSections, exploreNavItems, navItems } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-[14px] border border-gold/24 bg-black/42 px-3 shadow-2xl shadow-black/35 backdrop-blur-2xl">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/avesta-zoroaster-logo.png"
            alt="AVESTA-ZOROASTER logo"
            width={42}
            height={42}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/30"
            priority
          />
          <div className="hidden sm:block">
            <div className="font-display text-sm tracking-[0.2em] text-gold-light">AVESTA-ZOROASTER</div>
            <div className="text-[11px] text-muted">پندار نیک | گفتار نیک | کردار نیک</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-warm/86 lg:flex">
          {navItems.map((item) =>
            item.href === "/avesta" ? (
              <div className="group relative" key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-xl px-4 py-2 transition hover:bg-gold/12 hover:text-gold-light"
                >
                  {item.label}
                  <ChevronDown size={15} />
                </Link>
                <div className="invisible absolute right-0 top-11 w-60 translate-y-2 rounded-2xl border border-gold/18 bg-[#05080d]/95 p-2 opacity-0 shadow-2xl shadow-black/50 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {avestaSections.map((section) => (
                    <Link
                      key={section.slug}
                      href={section.href}
                      className="block rounded-xl px-4 py-3 text-sm text-warm/82 transition hover:bg-gold/10 hover:text-gold-light"
                    >
                      {section.title}
                    </Link>
                  ))}
                  <Link
                    href="/dictionary"
                    className="block rounded-xl px-4 py-3 text-sm text-warm/82 transition hover:bg-gold/10 hover:text-gold-light"
                  >
                    واژه‌نامه
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                key={item.href}
                className="rounded-xl px-4 py-2 transition hover:bg-gold/12 hover:text-gold-light"
              >
                {item.label}
              </Link>
            )
          )}
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 rounded-xl px-4 py-2 transition hover:bg-gold/12 hover:text-gold-light">
              کاوش
              <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-0 top-11 grid w-[520px] translate-y-2 grid-cols-2 gap-1 rounded-2xl border border-gold/18 bg-[#05080d]/95 p-3 opacity-0 shadow-2xl shadow-black/50 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {exploreNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 transition hover:bg-gold/10">
                  <span className="block text-sm font-black text-warm/90">{item.label}</span>
                  <span className="mt-1 block text-xs text-muted">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="md:hidden"><MobileNavigation /></div>
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-xl border border-gold/16 px-3 py-2 text-xs text-warm/85 transition hover:bg-gold/10 hover:text-gold-light md:inline-flex"
          >
            <UserRound size={15} />
            ورود / ثبت‌نام
          </Link>
          <Link
            href="/search"
            className="grid h-9 w-9 place-items-center rounded-xl border border-gold/18 text-gold-light transition hover:bg-gold/10"
            aria-label="جستجو"
          >
            <Search size={17} />
          </Link>
          <LanguageSwitcher />
          <Link
            href="/login"
            className="grid h-9 w-9 place-items-center rounded-xl bg-gold text-night transition hover:bg-gold-light md:hidden"
            aria-label="ورود"
          >
            <LogIn size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
