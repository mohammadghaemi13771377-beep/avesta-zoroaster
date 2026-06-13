import { NextResponse } from "next/server";
import { profileSnapshot } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-reading-progress",
    nextSource: "ReadingProgress Prisma model filtered by authenticated user",
    continueReading: profileSnapshot.continueReading
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    message: "پیشرفت مطالعه نمونه دریافت شد. در نسخه دیتابیسی با userId و targetUrl به‌روزرسانی می‌شود.",
    received: body
  });
}
