import { NextResponse } from "next/server";
import { getDailyAvesta } from "@/lib/daily-avesta";

export async function GET() {
  return NextResponse.json({
    source: "local-daily-avesta",
    nextSource: "Personalized daily recommendation from reading history and glossary interests",
    item: getDailyAvesta()
  });
}
