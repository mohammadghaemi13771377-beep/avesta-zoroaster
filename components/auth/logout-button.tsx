"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  async function handleLogout() {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const data = (await response.json()) as { redirectTo?: string };
    window.location.href = data.redirectTo ?? "/login";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 font-bold text-gold-light transition hover:bg-gold/10"
    >
      <LogOut size={18} />
      خروج
    </button>
  );
}
