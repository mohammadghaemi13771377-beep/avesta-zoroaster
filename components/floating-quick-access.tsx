"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, BookOpen, Search } from "lucide-react";

export function FloatingQuickAccess() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setShowBackToTop(window.scrollY > 520);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className="floating-quick-access" aria-label="دسترسی سریع">
      <Link href="/search" className="floating-quick-action" data-label="جستجو" aria-label="جستجو">
        <Search className="h-4 w-4" />
      </Link>
      <Link href="/avesta" className="floating-quick-action floating-quick-action-primary" data-label="اوستا" aria-label="ورود به اوستا">
        <BookOpen className="h-4 w-4" />
      </Link>
      <button
        type="button"
        className={`floating-quick-action floating-back-top ${showBackToTop ? "is-visible" : ""}`}
        data-label="بالا"
        aria-label="بازگشت به بالا"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
