import Link from "next/link";
import { ArrowLeft, Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="hero-cosmos relative min-h-screen overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
      <div className="hero-horizon" />
      <section className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="gold-text text-sm font-semibold tracking-[0.34em]">404</p>
        <h1 className="mt-5 text-5xl font-black leading-tight text-warm sm:text-7xl">این تالار هنوز پیدا نشد</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-muted">
          شاید مسیر جابه‌جا شده باشد، یا هنوز در نقشه جهان اوستا منتشر نشده باشد. از مسیرهای اصلی دوباره وارد جهان
          AVESTA-ZOROASTER شو.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
            خانه
            <Home size={16} />
          </Link>
          <Link href="/avesta" className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
            پورتال اوستا
            <Compass size={16} />
          </Link>
          <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
            جستجو
            <Search size={16} />
          </Link>
        </div>
        <Link href="/trust-center" className="mt-10 inline-flex items-center gap-2 text-sm font-black text-gold-light">
          رفتن به مرکز اعتماد و منابع
          <ArrowLeft size={16} />
        </Link>
      </section>
    </main>
  );
}
