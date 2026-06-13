import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/auth-constants";

export type DemoSession = {
  email: string;
  displayName: string;
  role: "READER" | "EDITOR" | "ADMIN";
};

export const demoSession: DemoSession = {
  email: "reader@avesta-zoroaster.com",
  displayName: "همراه اوستا",
  role: "READER",
};

export function inferDemoRole(email: string): DemoSession["role"] {
  const normalized = email.trim().toLowerCase();

  if (normalized.startsWith("admin@") || normalized.includes("+admin@")) {
    return "ADMIN";
  }

  if (normalized.startsWith("editor@") || normalized.includes("+editor@")) {
    return "EDITOR";
  }

  return "READER";
}

export function encodeSession(session: DemoSession) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function decodeSession(value?: string): DemoSession | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as DemoSession;
  } catch {
    return null;
  }
}

export function getDemoSession() {
  return decodeSession(cookies().get(AUTH_COOKIE)?.value);
}

export function safeRedirect(value?: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/profile";
  }

  if (value.startsWith("/api")) {
    return "/profile";
  }

  return value;
}
