import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  getExperimentWinner,
  getNewsletterExperimentSummary,
  newsletterExperiments,
} from "@/lib/newsletter-experiments";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-newsletter-experiments",
    nextSource: "Email provider A/B testing, audience split, automatic winner selection and send-time optimization",
    summary: getNewsletterExperimentSummary(),
    experiments: newsletterExperiments.map((experiment) => ({
      ...experiment,
      winner: getExperimentWinner(experiment),
    })),
  });
}
