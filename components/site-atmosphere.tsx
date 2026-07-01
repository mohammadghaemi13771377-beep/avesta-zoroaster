"use client";

import { useEffect } from "react";

export function SiteAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function updatePointer(event: PointerEvent) {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    }

    function updateScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      root.style.setProperty("--scroll-progress", String(progress));
    }

    updateScroll();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <>
      <div className="site-scroll-progress" aria-hidden="true" />
      <div className="site-atmosphere" aria-hidden="true">
        <div className="site-pointer-glow" />
        <div className="site-aurora site-aurora-one" />
        <div className="site-aurora site-aurora-two" />
        <div className="site-orbit site-orbit-one" />
        <div className="site-orbit site-orbit-two" />
        <div className="site-grain" />
      </div>
    </>
  );
}
