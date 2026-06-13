import { NextResponse } from "next/server";
import { getStudyPlanSummary, studyPlanSteps } from "@/lib/study-plan";

export async function GET() {
  return NextResponse.json({
    source: "local-study-plan",
    nextSource: "Personalized ReadingPlan Prisma model filtered by authenticated user",
    summary: getStudyPlanSummary(),
    steps: studyPlanSteps
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    message: "پیشرفت برنامه مطالعه نمونه دریافت شد. در نسخه دیتابیسی با userId ذخیره می‌شود.",
    received: body
  });
}
