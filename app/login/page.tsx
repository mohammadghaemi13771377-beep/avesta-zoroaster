import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bookmark, BookOpen, Moon } from "lucide-react";

import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به پروفایل مطالعه AVESTA-ZOROASTER.",
};

const benefits: Array<[string, string, LucideIcon]> = [
  ["ادامه مطالعه", "بازگشت به آخرین بند خوانده‌شده", BookOpen],
  ["بوکمارک", "ذخیره بندها، مقاله‌ها و واژه‌ها", Bookmark],
  ["حالت خواندن", "شب، سپیا، اندازه فونت و صوت", Moon],
];

export default function LoginPage() {
  return (
    <main className="hero-cosmos relative grid min-h-screen items-center px-4 py-32 sm:px-6 lg:px-8">
      <div className="hero-horizon" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <section>
          <p className="gold-text text-sm font-semibold tracking-[0.32em]">ACCOUNT</p>
          <h1 className="mt-4 text-5xl font-black leading-[1.25] text-warm sm:text-6xl">ورود به سفر اوستا</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-muted">
            با ورود، ادامه مطالعه، بوکمارک‌ها، تنظیمات خواندن و مسیر شخصی کاربر فعال می‌شود.
          </p>
          <p className="mt-6 leading-8 text-muted">
            حساب نداری؟{" "}
            <Link href="/register" className="font-bold text-gold-light">
              ثبت‌نام کن
            </Link>
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {benefits.map(([title, text, Icon]) => (
              <article key={title} className="rounded-3xl border border-gold/14 bg-black/22 p-4">
                <Icon className="text-gold-light" size={22} />
                <h2 className="mt-3 font-black text-warm">{title}</h2>
                <p className="mt-2 text-xs leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
