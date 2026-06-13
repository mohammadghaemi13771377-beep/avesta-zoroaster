import { NextResponse } from "next/server";
import { aiArtStyleRules, getAiArtBrief, getAiArtBriefs, getAiArtStudioStats } from "@/lib/ai-art-studio";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return NextResponse.json({
    styleRules: aiArtStyleRules,
    stats: getAiArtStudioStats(),
    briefs: id ? [getAiArtBrief(id)].filter(Boolean) : getAiArtBriefs(),
    engine: {
      mode: "prompt-brief-studio",
      nextStep: "اتصال آینده به صف تولید تصویر، storage و تایید تحریریه قبل از انتشار.",
    },
  });
}
