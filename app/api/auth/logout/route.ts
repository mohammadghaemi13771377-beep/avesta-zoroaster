import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth-constants";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    message: "خروج انجام شد.",
    redirectTo: "/login"
  });
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
