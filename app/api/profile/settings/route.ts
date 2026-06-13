import { NextResponse } from "next/server";
import { profileSnapshot } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-reading-settings",
    nextSource: "ReadingPreference Prisma model filtered by authenticated user",
    settings: profileSnapshot.readingSettings,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    message: "تنظیمات مطالعه نمونه دریافت شد. در نسخه دیتابیسی با userId ذخیره می‌شود.",
    received: body,
  });
}
