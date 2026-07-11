"use client";

import Link from "next/link";
import { BookOpen, House, MessageCircle, Search, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "خانه", icon: House },
  { href: "/avesta", label: "اوستا", icon: BookOpen },
  { href: "/mobed", label: "موبد", icon: MessageCircle, featured: true },
  { href: "/search", label: "جستجو", icon: Search },
  { href: "/dashboard", label: "نورخانه", icon: UserRound },
];

export function MobileBottomNavigation() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/login" || pathname === "/register") return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/18 bg-[#071521]/92 px-2 pb-[calc(0.45rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl md:hidden"
      aria-label="ناوبری سریع موبایل"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map(({ href, label, icon: Icon, featured }) => {
          const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-black transition ${active ? "bg-gold/14 text-gold-light" : "text-warm/66 hover:bg-gold/8 hover:text-gold-light"}`}
            >
              <span className={`grid h-7 w-7 place-items-center rounded-lg ${featured ? "bg-gold text-night shadow-[0_6px_18px_rgba(214,168,79,0.26)]" : ""}`}>
                <Icon size={featured ? 16 : 18} />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
