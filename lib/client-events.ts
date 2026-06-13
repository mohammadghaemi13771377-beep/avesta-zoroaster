"use client";

import { buildDefaultConsent, canTrackAnalytics, consentStorageKey, normalizeConsentSnapshot } from "@/lib/privacy-consent";

export type TrackPayloadValue = string | number | boolean | null;

export type TrackInput = {
  event: string;
  route?: string;
  payload?: Record<string, TrackPayloadValue>;
};

const anonymousKey = "avesta-anonymous-id-v1";
const sessionKey = "avesta-session-id-v1";

function getOrCreateId(key: string, prefix: string) {
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const next = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(key, next);
  return next;
}

function analyticsConsentEnabled() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(consentStorageKey) ?? "null");
    return canTrackAnalytics(normalizeConsentSnapshot(parsed));
  } catch {
    return canTrackAnalytics(buildDefaultConsent());
  }
}

export async function trackEvent(input: TrackInput) {
  if (typeof window === "undefined") return { ok: false, skipped: true };

  if (!analyticsConsentEnabled()) {
    return { ok: false, skipped: true, reason: "analytics-consent-disabled" };
  }

  const body = {
    event: input.event,
    route: input.route ?? window.location.pathname,
    payload: input.payload ?? {},
    anonymousId: getOrCreateId(anonymousKey, "anon"),
    sessionId: getOrCreateId(sessionKey, "sess"),
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });

    return response.json();
  } catch {
    return { ok: false, skipped: false };
  }
}
