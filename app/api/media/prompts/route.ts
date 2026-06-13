import { NextResponse } from "next/server";
import { aiPromptTemplates } from "@/lib/ai-prompts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");
  const prompts = section
    ? aiPromptTemplates.filter((template) => template.sectionSlug === section)
    : aiPromptTemplates;

  return NextResponse.json({
    ok: true,
    count: prompts.length,
    prompts
  });
}
