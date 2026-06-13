import { NextResponse } from "next/server";
import { demoSession, encodeSession, inferDemoRole, safeRedirect } from "@/lib/auth";
import { AUTH_COOKIE } from "@/lib/auth-constants";

export async function POST(request: Request) {
  const body = (await request.json()) as { displayName?: string; email?: string; password?: string; next?: string };

  if (!body.displayName || !body.email || !body.password) {
    return NextResponse.json({ ok: false, message: "نام، ایمیل و رمز عبور لازم است." }, { status: 400 });
  }

  const response = NextResponse.json({
    ok: true,
    message: "ثبت‌نام demo انجام شد. در نسخه واقعی کاربر در دیتابیس ذخیره می‌شود.",
    redirectTo: safeRedirect(body.next)
  });

  response.cookies.set(
    AUTH_COOKIE,
    encodeSession({ ...demoSession, displayName: body.displayName, email: body.email, role: inferDemoRole(body.email) }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    }
  );

  return response;
}
