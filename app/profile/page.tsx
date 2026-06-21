import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Bookmark, BookOpen, Headphones, Moon, Settings, UserRound } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { ReaderMemory } from "@/components/profile/reader-memory";
import { ProfileReadingSummary } from "@/components/profile/profile-reading-summary";
import { profileSnapshot } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "پروفایل",
  description: "پروفایل کاربر، ادامه مطالعه، بوکمارک‌ها و تنظیمات مطالعه در AVESTA-ZOROASTER.",
};

export default function ProfilePage() {
  const settings: Array<[string, string, LucideIcon]> = [
    ["حالت مطالعه", profileSnapshot.readingSettings.mode, Moon],
    ["اندازه فونت", `${profileSnapshot.readingSettings.fontSize}px`, Settings],
    ["فاصله خطوط", "1.9", BookOpen],
    ["پخش صوت", profileSnapshot.readingSettings.audio, Headphones],
  ];

  return (
    <main className="overflow-hidden pt-24">
      <section className="hero-cosmos relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lux-frame p-7">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold-light">
              <UserRound size={34} />
            </div>
            <p className="gold-text mt-6 text-sm font-semibold tracking-[0.28em]">READER PROFILE</p>
            <h1 className="mt-3 text-5xl font-black text-warm">{profileSnapshot.user.name}</h1>
            <p className="mt-4 text-lg text-muted">{profileSnapshot.user.level}</p>
            <p className="mt-2 text-sm text-gold-light">عضویت از {profileSnapshot.user.joinedAt}</p>
            <div className="mt-6">
              <LogoutButton />
            </div>

            <div className="mt-8 grid gap-3">
              {profileSnapshot.readingStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-gold/10 bg-night/55 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-black text-warm">{stat.label}</h2>
                    <span className="text-2xl font-black text-gold-light">{stat.value}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <ProfileReadingSummary fallback={profileSnapshot.continueReading} />
            <section className="hidden" aria-hidden="true">
              <div className="flex items-center gap-2 text-gold-light">
                <BookOpen size={20} />
                <p className="text-sm font-bold">ادامه مطالعه</p>
              </div>
              <p className="mt-4 text-sm font-bold text-gold-light">{profileSnapshot.continueReading.section}</p>
              <h2 className="mt-2 text-3xl font-black text-warm">{profileSnapshot.continueReading.title}</h2>
              <p className="mt-3 leading-8 text-muted">{profileSnapshot.continueReading.excerpt}</p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-warm/10">
                <div
                  className="h-full rounded-full bg-gold"
                  style={{ width: `${profileSnapshot.continueReading.progress}%` }}
                />
              </div>
              <Link
                href={profileSnapshot.continueReading.href}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light"
              >
                ادامه خواندن
                <ArrowLeft size={18} />
              </Link>
            </section>

            <section className="hidden" aria-hidden="true">
              <div className="flex items-center gap-2 text-gold-light">
                <Bookmark size={20} />
                <p className="text-sm font-bold">بوکمارک‌ها</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {profileSnapshot.bookmarks.map((bookmark) => (
                  <Link
                    key={bookmark.href}
                    href={bookmark.href}
                    className="rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10"
                  >
                    <p className="text-xs font-bold text-gold-light">{bookmark.type}</p>
                    <h3 className="mt-2 font-black leading-7 text-warm">{bookmark.title}</h3>
                  </Link>
                ))}
              </div>
            </section>

            <Link
              href="/dashboard"
              className="block rounded-[18px] border border-gold/20 bg-gold/10 p-6 transition hover:border-gold/50"
            >
              <p className="text-sm font-black text-gold-light">Personal Command Center</p>
              <h2 className="mt-2 text-2xl font-black text-warm">ورود به نورخانه شخصی</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                مسیر امروز، ادامه مطالعه، استمرار، مأموریت‌ها و نشان‌ها در یک مرکز روزانه.
              </p>
            </Link>

            <Link
              href="/memory"
              className="block rounded-[18px] border border-gold/20 bg-gold/10 p-6 transition hover:border-gold/50"
            >
              <p className="text-sm font-black text-gold-light">Reader Memory</p>
              <h2 className="mt-2 text-2xl font-black text-warm">باز کردن داشبورد کامل حافظه مطالعه</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                ادامه مطالعه، یادداشت‌ها، مأموریت‌ها، XP، بوکمارک‌ها و کلکسیون‌ها در یک مرکز مستقل.
              </p>
            </Link>

            <ReaderMemory />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {settings.map(([label, value, Icon]) => (
            <article key={label} className="lux-frame p-6">
              <Icon className="text-gold-light" size={28} />
              <h2 className="mt-5 text-xl font-black text-warm">{label}</h2>
              <p className="mt-2 text-2xl font-black text-gold-light">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
