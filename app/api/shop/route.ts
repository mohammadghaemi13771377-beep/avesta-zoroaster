import { NextResponse } from "next/server";

import { productCategories, shopProducts } from "@/lib/shop";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "all";
  const products =
    category === "all" ? shopProducts : shopProducts.filter((product) => product.category === category);

  return NextResponse.json({
    source: "local-commerce-catalog",
    nextSource: "Prisma Product, Inventory, Order and PaymentProvider tables",
    categories: productCategories,
    count: products.length,
    products,
  });
}
