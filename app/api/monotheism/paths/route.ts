import { NextResponse } from "next/server";
import { getMonotheismPaths, getMonotheismPathSummary } from "@/lib/monotheism-paths";

export function GET() {
  const paths = getMonotheismPaths();

  return NextResponse.json({
    source: "local-monotheism-paths",
    summary: getMonotheismPathSummary(paths),
    paths,
    nextSource: "CMS/RAG-guided monotheism learning paths",
  });
}
