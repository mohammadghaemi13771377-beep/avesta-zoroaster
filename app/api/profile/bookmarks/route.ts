import { NextResponse } from "next/server";
import { profileSnapshot } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-bookmarks",
    nextSource: "Bookmark Prisma model filtered by authenticated user",
    bookmarks: profileSnapshot.bookmarks
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    message: "بوکمارک نمونه دریافت شد. در نسخه دیتابیسی با userId و targetUrl ذخیره می‌شود.",
    received: body
  });
}
