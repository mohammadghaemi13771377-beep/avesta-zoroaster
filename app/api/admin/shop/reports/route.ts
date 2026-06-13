import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/admin-auth";
import { getCommerceOrders, getSalesReport, sampleCoupons } from "@/lib/admin-shop";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_shop");

  if (!access.ok) {
    return access.response;
  }

  const orders = await getCommerceOrders();

  return NextResponse.json({
    source: "commerce-sales-report",
    nextSource: "Prisma revenue aggregates with date filters, coupon usage and tax exports",
    report: getSalesReport(orders),
    coupons: sampleCoupons,
  });
}
