"use client";

import { ArrowLeft, KeyRound, Loader2, Mail, UserRound } from "lucide-react";
import { useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [displayName, setDisplayName] = useState("همراه اوستا");
  const [email, setEmail] = useState("reader@avesta-zoroaster.com");
  const [password, setPassword] = useState("demo-password");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    "نسخه demo: برای ادمین از admin@avesta-zoroaster.com و برای ویرایشگر از editor@avesta-zoroaster.com استفاده کن."
  );
  const isLogin = mode === "login";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("در حال ساخت نشست demo...");

    try {
      const response = await fetch(isLogin ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName, email, password, next: new URLSearchParams(window.location.search).get("next") }),
      });
      const data = (await response.json()) as { ok: boolean; message: string; redirectTo?: string };
      setStatus(data.message);

      if (data.ok && data.redirectTo) {
        window.location.href = data.redirectTo;
      }
    } catch {
      setStatus("ارتباط با API ورود برقرار نشد. بعداً این بخش به سرویس احراز هویت واقعی وصل می‌شود.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lux-frame p-6 shadow-2xl shadow-black/30">
      <div className="grid gap-4">
        {!isLogin ? (
          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">نام نمایشی</span>
            <div className="relative">
              <UserRound className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="h-13 w-full rounded-2xl border border-gold/20 bg-night/70 py-3 pr-12 pl-4 text-warm outline-none focus:border-gold"
              />
            </div>
          </label>
        ) : null}

        <label className="grid gap-2">
          <span className="text-sm font-bold text-warm">ایمیل</span>
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
            <input
              dir="ltr"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-13 w-full rounded-2xl border border-gold/20 bg-night/70 py-3 pr-12 pl-4 text-left text-warm outline-none focus:border-gold"
            />
          </div>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-warm">رمز عبور</span>
          <div className="relative">
            <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
            <input
              dir="ltr"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-13 w-full rounded-2xl border border-gold/20 bg-night/70 py-3 pr-12 pl-4 text-left text-warm outline-none focus:border-gold"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-black text-night transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : null}
          {isLogin ? "ورود به پروفایل" : "ساخت حساب"}
          <ArrowLeft size={18} />
        </button>
        <p className="leading-8 text-muted">{status}</p>
      </div>
    </form>
  );
}
