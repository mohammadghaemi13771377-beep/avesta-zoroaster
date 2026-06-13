import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { adminContentSchema, saveAdminContent } from "@/lib/admin-content";
import { recordAuditEvent } from "@/lib/audit-log";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_avesta");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    ok: true,
    schema: adminContentSchema,
    message: "قرارداد ورود محتوای پنل مدیریت AVESTA-ZOROASTER."
  });
}

export async function POST(request: Request) {
  const access = requireAdminPermission(request, "manage_avesta");

  if (!access.ok) {
    return access.response;
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "JSON معتبر نیست."
      },
      { status: 400 }
    );
  }

  const result = await saveAdminContent(body);

  await recordAuditEvent({
    actor: access.session.displayName,
    role: access.session.role,
    action: "Save admin content",
    target: typeof body?.title === "string" ? body.title : body?.resource ?? "Admin content",
    area: "محتوا",
    severity: result.ok ? "info" : "warning",
    detail: result.ok ? "محتوا از پنل ادمین ذخیره شد." : "تلاش برای ذخیره محتوا با خطا همراه شد.",
    metadata: {
      resource: body?.resource,
      status: result.status,
    },
  });

  return NextResponse.json(result, { status: result.status });
}
