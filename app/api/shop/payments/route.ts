import { NextResponse } from "next/server";

import { createDemoPaymentIntent } from "@/lib/payment";
import { recordAuditEvent } from "@/lib/audit-log";

export async function POST(request: Request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON پرداخت معتبر نیست." }, { status: 400 });
  }

  if (!body?.orderId || !body?.amount || !body?.email) {
    return NextResponse.json(
      {
        ok: false,
        message: "orderId، amount و email برای شروع پرداخت لازم است.",
      },
      { status: 400 }
    );
  }

  const intent = createDemoPaymentIntent({
    orderId: body.orderId,
    amount: Number(body.amount),
    email: body.email,
    callbackUrl: body.callbackUrl,
    provider: body.provider,
  });

  await recordAuditEvent({
    actor: body.email,
    role: "READER",
    action: "Create payment intent",
    target: body.orderId,
    area: "پرداخت",
    severity: "info",
    detail: "درخواست پرداخت demo برای سفارش فروشگاه ساخته شد.",
    metadata: {
      provider: intent.provider,
      authority: intent.authority,
      amount: intent.amount,
    },
  });

  return NextResponse.json(intent);
}
