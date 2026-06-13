import { NextResponse } from "next/server";
import { getWisdomGuideRecommendation, wisdomGuidePrompts } from "@/lib/wisdom-guide";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const intent = searchParams.get("intent");

  return NextResponse.json({
    prompts: wisdomGuidePrompts,
    recommendation: getWisdomGuideRecommendation(intent),
    engine: {
      mode: "editorial-rule-based",
      nextStep: "اتصال آینده به RAG، Meilisearch و مدل AI با گاردریل تحریریه.",
    },
  });
}
