import { NextResponse } from "next/server";

import { createCheckoutOrder } from "@/lib/admin-shop";
import { recordAuditEvent } from "@/lib/audit-log";

export async function POST(request: Request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "JSON سفارش معتبر نیست.",
      },
      { status: 400 }
    );
  }

  const result = await createCheckoutOrder(body);

  await recordAuditEvent({
    actor: typeof body?.displayName === "string" ? body.displayName : "Shop Visitor",
    role: "READER",
    action: "Create checkout order",
    target: typeof body?.email === "string" ? body.email : "Shop order",
    area: "فروشگاه",
    severity: result.ok ? "info" : "warning",
    detail: result.ok ? "سفارش checkout فروشگاه ثبت/اعتبارسنجی شد." : "تلاش برای ثبت سفارش با خطا همراه شد.",
    metadata: {
      itemCount: Array.isArray(body?.items) ? body.items.length : 0,
      status: result.status,
    },
  });

  return NextResponse.json(result, { status: result.status });
}
