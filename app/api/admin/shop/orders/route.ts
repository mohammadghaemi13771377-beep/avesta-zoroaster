import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/admin-auth";
import { getCommerceOrders } from "@/lib/admin-shop";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_shop");

  if (!access.ok) {
    return access.response;
  }

  const orders = await getCommerceOrders();

  return NextResponse.json({
    source: "commerce-orders",
    nextSource: "Prisma Order, Payment and Shipment tables with payment provider webhooks",
    count: orders.length,
    orders,
  });
}
