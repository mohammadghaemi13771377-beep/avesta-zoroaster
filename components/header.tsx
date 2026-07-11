import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogIn, Search, UserRound } from "lucide-react";
import { AmbientLightToggle } from "@/components/ambient-light-toggle";
import { CommandCenter } from "@/components/command-center";
import { HeaderNavLink } from "@/components/header-nav-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ReadingNotifications } from "@/components/reading-notifications";
import { avestaSections, exploreNavItems, navItems } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="site-header-shell mx-auto flex h-14 max-w-7xl items-center justify-between rounded-[14px] border border-gold/30 bg-[#071521]/82 px-3 shadow-2xl shadow-black/25 backdrop-blur-2xl">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="AVESTA-ZOROASTER">
          <Image
            src="/images/avesta-zoroaster-logo.png"
            alt="AVESTA-ZOROASTER logo"
            width={42}
            height={42}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/30"
            priority
          />
          <div className="hidden sm:block">
            <div className="font-brand text-sm tracking-[0.18em] text-gold-light">AVESTA-ZOROASTER</div>
            <div className="text-[11px] font-medium text-warm/76">پندار نیک | گفتار نیک | کردار نیک</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-bold text-warm/86 lg:flex" aria-label="منوی اصلی">
          {navItems.map((item) =>
            item.href === "/avesta" ? (
              <div className="group relative -my-5 py-5" key={item.href}>
                <HeaderNavLink
                  href={item.href}
                  className="header-nav-pill flex items-center gap-1 rounded-xl px-4 py-2 transition"
                >
                  {item.label}
                  <ChevronDown size={15} />
                </HeaderNavLink>
                <div className="invisible absolute right-0 top-[calc(100%-0.25rem)] z-50 w-80 translate-y-1 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-gold/24 bg-[#071521]/96 p-3 shadow-2xl shadow-black/45 backdrop-blur-2xl">
                    <p className="px-3 pb-2 text-xs font-black text-gold-light">دروازه‌های اوستا</p>
                    <div className="grid gap-1">
                      {avestaSections.map((section) => (
                        <HeaderNavLink
                          key={section.slug}
                          href={section.href}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-warm/84 transition hover:bg-gold/10 hover:text-gold-light"
                          activeClassName="bg-gold/12 text-gold-light"
                        >
                          <span>{section.title}</span>
                          <span className="text-xs text-gold/70">صفحه اختصاصی</span>
                        </HeaderNavLink>
                      ))}
                    </div>
                    <HeaderNavLink
                      href="/dictionary"
                      className="mt-2 block rounded-xl border border-gold/18 bg-gold/8 px-4 py-3 text-sm font-black text-gold-light transition hover:bg-gold/14"
                      activeClassName="bg-gold/12 text-gold-light"
                    >
                      واژه‌نامه
                    </HeaderNavLink>
                  </div>
                </div>
              </div>
            ) : (
              <HeaderNavLink
                href={item.href}
                key={item.href}
                className="header-nav-pill rounded-xl px-4 py-2 transition"
              >
                {item.label}
              </HeaderNavLink>
            ),
          )}

          <div className="group relative -my-5 py-5">
            <button type="button" className="header-nav-pill flex items-center gap-1 rounded-xl px-4 py-2 transition">
              کاوش
              <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-0 top-[calc(100%-0.25rem)] z-50 w-[560px] translate-y-1 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-gold/24 bg-[#071521]/96 p-3 shadow-2xl shadow-black/45 backdrop-blur-2xl">
                {exploreNavItems.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 transition hover:bg-gold/10">
                    <span className="block text-sm font-black text-warm/92">{item.label}</span>
                    <span className="mt-1 block text-xs font-medium leading-5 text-muted">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <MobileNavigation />
          </div>
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-xl border border-gold/16 px-3 py-2 text-xs font-bold text-warm/85 transition hover:bg-gold/10 hover:text-gold-light md:inline-flex"
          >
            <UserRound size={15} />
            ورود / ثبت نام
          </Link>
          <Link
            href="/search"
            className="grid h-9 w-9 place-items-center rounded-xl border border-gold/18 text-gold-light transition hover:bg-gold/10"
            aria-label="جستجو"
          >
            <Search size={17} />
          </Link>
          <div className="hidden xl:block">
            <CommandCenter compact />
          </div>
          <ReadingNotifications />
          <AmbientLightToggle />
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
