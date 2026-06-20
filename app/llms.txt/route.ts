import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo";

export function GET() {
  const body = `# ${siteConfig.name}

${siteConfig.description}

Primary language: Persian (fa-IR)
Secondary language: English (en-US)
Canonical site: ${siteConfig.url}

Key public areas:
- /avesta: Avesta portal and section landing pages
- /avesta/paths: guided study paths
- /articles: educational and research-oriented pillar articles
- /dictionary: glossary of Avestan and Zoroastrian concepts
- /trust-center: source trust and review status
- /citations: citation and source registry
- /research-methodology: research method, source policy and disclaimer

Editorial note:
AVESTA-ZOROASTER is an educational and cultural digital museum. It is not a substitute for academic editions, specialist scholarship or community religious authority. Use citations and trust-center records when referencing content.
`;

  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
