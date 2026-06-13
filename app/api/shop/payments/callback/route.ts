import { NextResponse } from "next/server";

import { recordAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authority = searchParams.get("authority") ?? "missing-authority";
  const status = searchParams.get("status") ?? "demo";

  await recordAuditEvent({
    actor: "Payment Gateway",
    role: "READER",
    action: "Payment callback",
    target: authority,
    area: "پرداخت",
    severity: status === "paid" ? "info" : "warning",
    detail: "callback نمایشی پرداخت دریافت شد. در نسخه واقعی وضعیت Payment و Order به‌روزرسانی می‌شود.",
    metadata: { authority, status },
  });

  return NextResponse.json({
    ok: true,
    source: "demo-payment-callback",
    authority,
    status,
    nextSource: "Payment provider webhook updates Payment.status and Order.paymentStatus",
  });
}
