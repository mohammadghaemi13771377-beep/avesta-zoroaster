import { NextResponse } from "next/server";
import { getSearchCategories, searchDocuments, searchIndexes, suggestedQueries, type SearchType } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const type = (searchParams.get("type") ?? "all") as SearchType;
  const category = searchParams.get("category") ?? "all";
  const limit = Number(searchParams.get("limit") ?? 20);
  const results = searchDocuments(query, type, category).slice(0, limit);
  const typeSummary = results.reduce<Record<string, number>>((summary, result) => {
    summary[result.type] = (summary[result.type] ?? 0) + 1;
    return summary;
  }, {});

  return NextResponse.json({
    query,
    type,
    category,
    source: "local-sample-index",
    nextSource: "Meilisearch multi-index search",
    count: results.length,
    typeSummary,
    nextAction: results[0]
      ? {
          label: "باز کردن بهترین نتیجه",
          href: results[0].href,
          title: results[0].title
        }
      : {
          label: "شروع با واژه‌نامه",
          href: "/dictionary",
          title: "واژه‌نامه اوستایی"
        },
    indexes: searchIndexes.map((index) => index.uid),
    categories: getSearchCategories(),
    suggestedQueries,
    results
  });
}
