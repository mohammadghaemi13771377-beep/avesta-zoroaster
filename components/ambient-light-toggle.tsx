"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "avesta-ambient-light-v1";

export function AmbientLightToggle() {
  const [bright, setBright] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) === "bright";
    setBright(saved);
    document.documentElement.dataset.ambient = saved ? "bright" : "balanced";
  }, []);

  function toggleAmbientLight() {
    setBright((current) => {
      const next = !current;
      window.localStorage.setItem(storageKey, next ? "bright" : "balanced");
      document.documentElement.dataset.ambient = next ? "bright" : "balanced";
      return next;
    });
  }

  const label = bright ? "بازگشت به نور متعادل" : "فعال کردن نور بیشتر";

  return (
    <button type="button" onClick={toggleAmbientLight} className="grid h-9 w-9 place-items-center rounded-xl border border-gold/18 text-gold-light transition hover:bg-gold/10" aria-label={label} title={label}>
      {bright ? <MoonStar size={17} /> : <SunMedium size={17} />}
    </button>
  );
}
