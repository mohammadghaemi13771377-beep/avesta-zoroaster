import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  getBestSendTimeForEdition,
  getSendTimeSummary,
  newsletterSendTimeSlots,
} from "@/lib/newsletter-send-times";
import { newsletterEditions } from "@/lib/newsletter-editions";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-newsletter-send-times",
    nextSource: "Email provider engagement events, timezone segmentation, scheduled sends and send-time optimization",
    summary: getSendTimeSummary(),
    recommendations: newsletterEditions.map((edition) => ({
      edition,
      bestSlot: getBestSendTimeForEdition(edition.id),
      slots: newsletterSendTimeSlots.filter((slot) => slot.editionId === edition.id),
    })),
  });
}
