import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/admin-auth";
import { getCommerceOrders, getInventorySnapshot } from "@/lib/admin-shop";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_shop");

  if (!access.ok) {
    return access.response;
  }

  const orders = await getCommerceOrders();
  const inventory = getInventorySnapshot(orders);

  return NextResponse.json({
    source: "commerce-inventory-snapshot",
    nextSource: "Prisma Product.stock, Product.reservedStock and warehouse provider sync",
    count: inventory.length,
    alerts: inventory.filter((item) => item.alert === "low" || item.alert === "empty").length,
    inventory,
  });
}
