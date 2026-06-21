import { NextResponse } from "next/server";
import { answerMobedQuestion, mobedStarterQuestions } from "@/lib/mobed-guide";

export function GET() {
  return NextResponse.json({
    ok: true,
    mode: "editorial-fallback",
    starterQuestions: mobedStarterQuestions,
    note: "برای اتصال آینده به RAG یا مدل AI، پاسخ‌ها باید فقط از منابع تاییدشده سایت بازیابی شوند."
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { question?: unknown };
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question || question.length > 900) {
      return NextResponse.json({ ok: false, message: "پرسش باید بین ۱ تا ۹۰۰ نویسه باشد." }, { status: 400 });
    }

    return NextResponse.json({ ok: true, mode: "editorial-fallback", question, reply: answerMobedQuestion(question) });
  } catch {
    return NextResponse.json({ ok: false, message: "فرمت پرسش قابل خواندن نیست." }, { status: 400 });
  }
}
