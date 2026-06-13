import { NextResponse } from "next/server";
import { getArticleTrustProfile, getVerseTrustProfile } from "@/lib/source-trust";

export async function GET() {
  return NextResponse.json({
    source: "local-source-trust-rules",
    nextSource: "CMS citations, editorial review status, library references and version history",
    examples: {
      verse: getVerseTrustProfile("یسنا", "هات نمونه"),
      article: getArticleTrustProfile("مفاهیم", ["اشا", "اخلاق", "زرتشت"])
    }
  });
}
