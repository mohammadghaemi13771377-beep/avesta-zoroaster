import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/admin-auth";
import { adminShopSchema, getCommerceDashboard, getInventorySnapshot, saveAdminProduct } from "@/lib/admin-shop";
import { recordAuditEvent } from "@/lib/audit-log";
import { shopProducts } from "@/lib/shop";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_shop");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-commerce-admin",
    nextSource: "Prisma Product dashboard with inventory, order aggregates, payment states and revenue reports",
    schema: adminShopSchema,
    dashboard: getCommerceDashboard(),
    inventory: getInventorySnapshot(),
    products: shopProducts,
  });
}

export async function POST(request: Request) {
  const access = requireAdminPermission(request, "manage_shop");

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
        message: "JSON محصول معتبر نیست.",
      },
      { status: 400 }
    );
  }

  const result = await saveAdminProduct(body);

  await recordAuditEvent({
    actor: access.session.displayName,
    role: access.session.role,
    action: "Save shop product",
    target: typeof body?.title === "string" ? body.title : body?.slug ?? "Shop product",
    area: "فروشگاه",
    severity: result.ok ? "info" : "warning",
    detail: result.ok ? "محصول فروشگاه از پنل ادمین ذخیره شد." : "تلاش برای ذخیره محصول با خطا همراه شد.",
    metadata: {
      slug: body?.slug,
      category: body?.category,
      status: result.status,
    },
  });

  return NextResponse.json(result, { status: result.status });
}
