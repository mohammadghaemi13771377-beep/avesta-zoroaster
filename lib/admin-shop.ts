import { formatPrice, getShopProduct, productCategories, shopProducts, type ProductCategory } from "@/lib/shop";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type InventoryStatus = "AVAILABLE" | "PREORDER" | "LIMITED" | "OUT_OF_STOCK";
export type OrderStatus = "DRAFT" | "SUBMITTED" | "PROCESSING" | "SHIPPED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type ShipmentStatus = "PENDING" | "PACKING" | "SHIPPED" | "DELIVERED" | "RETURNED";

export type ShippingMethodId = "standard" | "express" | "pickup";
export type CouponType = "PERCENT" | "FIXED";

export type AdminProductPayload = {
  title?: string;
  slug?: string;
  category?: ProductCategory;
  excerpt?: string;
  description?: string;
  price?: number;
  stock?: number;
  status?: ProductStatus;
  inventoryStatus?: InventoryStatus;
  coverImage?: string;
  materials?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type InventoryItem = {
  slug: string;
  title: string;
  categoryLabel: string;
  stock: number;
  reserved: number;
  available: number;
  status: InventoryStatus;
  alert: "ok" | "low" | "empty" | "preorder";
};

export type CheckoutItemInput = {
  slug?: string;
  quantity?: number;
};

export type CheckoutPayload = {
  email?: string;
  displayName?: string;
  phone?: string;
  shippingAddress?: string;
  shippingMethod?: ShippingMethodId;
  couponCode?: string;
  notes?: string;
  items?: CheckoutItemInput[];
};

export type CommerceOrder = {
  id: string;
  email: string;
  displayName?: string;
  phone?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discountCode?: string;
  discountTotal: number;
  taxTotal: number;
  total: number;
  currency: "IRR";
  shippingAddress?: string;
  shippingMethod?: ShippingMethodId;
  shippingCost: number;
  notes?: string;
  shipment?: {
    carrier?: string;
    method: string;
    status: ShipmentStatus;
    trackingCode?: string;
    shippingCost: number;
  };
  createdAt: string;
  items: Array<{
    slug: string;
    title: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
};

type NormalizedAdminProductPayload = Required<
  Pick<
    AdminProductPayload,
    "title" | "slug" | "category" | "excerpt" | "description" | "price" | "stock" | "status" | "inventoryStatus"
  >
> &
  Pick<AdminProductPayload, "coverImage" | "seoTitle" | "seoDescription"> & {
    materials: string[];
    tags: string[];
  };

type CommercePrismaClient = {
  product: {
    upsert: (args: {
      where: { slug: string };
      update: PrismaProductData;
      create: PrismaProductData & { slug: string };
    }) => Promise<unknown>;
    findMany: (args: { where: { slug: { in: string[] } } }) => Promise<Array<{ id: string; title: string; slug: string; price: number }>>;
  };
  order: {
    create: (args: {
      data: {
        email: string;
        displayName?: string;
        phone?: string;
        shippingAddress?: string;
        shippingMethod?: string;
        shippingCost: number;
        notes?: string;
        status: OrderStatus;
        paymentStatus: PaymentStatus;
        subtotal: number;
        discountCode?: string;
        discountTotal: number;
        taxTotal: number;
        total: number;
        currency: "IRR";
        items: {
          create: Array<{
            productId: string;
            title: string;
            quantity: number;
            unitPrice: number;
            total: number;
          }>;
        };
        shipments: {
          create: {
            method: string;
            status: ShipmentStatus;
            shippingCost: number;
          };
        };
      };
      include: { items: true; shipments: true };
    }) => Promise<unknown>;
    findMany: (args: {
      orderBy: { createdAt: "desc" };
      take: number;
      include: { items: true; shipments: true };
    }) => Promise<PrismaOrderRow[]>;
  };
};

type PrismaOrderRow = {
  id: string;
  email: string;
  displayName?: string | null;
  phone?: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discountCode?: string | null;
  discountTotal: number;
  taxTotal: number;
  total: number;
  currency: string;
  shippingAddress?: string | null;
  shippingMethod?: string | null;
  shippingCost: number;
  notes?: string | null;
  createdAt: Date;
  items: Array<{
    title: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  shipments: Array<{
    carrier?: string | null;
    method: string;
    status: ShipmentStatus;
    trackingCode?: string | null;
    shippingCost: number;
  }>;
};

type PrismaProductData = {
  title: string;
  category: string;
  excerpt: string;
  description: string;
  price: number;
  stock: number;
  reservedStock: number;
  lowStockAlert: number;
  status: ProductStatus;
  inventoryStatus: InventoryStatus;
  coverImage?: string;
  materials: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
};

const categoryMap: Record<ProductCategory, string> = {
  book: "BOOK",
  mug: "MUG",
  shirt: "SHIRT",
  accessory: "ACCESSORY",
  statue: "STATUE",
  art: "ART",
};

export const adminShopSchema = {
  categories: productCategories.filter((category) => category.id !== "all"),
  statuses: ["DRAFT", "ACTIVE", "ARCHIVED"] satisfies ProductStatus[],
  inventoryStatuses: ["AVAILABLE", "PREORDER", "LIMITED", "OUT_OF_STOCK"] satisfies InventoryStatus[],
  shippingMethods: [
    { id: "standard", label: "پست استاندارد", cost: 85000, eta: "۳ تا ۵ روز کاری" },
    { id: "express", label: "ارسال سریع", cost: 165000, eta: "۱ تا ۲ روز کاری" },
    { id: "pickup", label: "تحویل حضوری/رویداد", cost: 0, eta: "هماهنگی با تیم فروش" },
  ] satisfies Array<{ id: ShippingMethodId; label: string; cost: number; eta: string }>,
  taxRate: 0.09,
  required: ["title", "slug", "category", "excerpt", "description", "price"],
};

export const sampleCoupons = [
  {
    code: "ASHA10",
    label: "ده درصد هدیه اشا",
    type: "PERCENT" as CouponType,
    amount: 10,
    status: "ACTIVE",
  },
  {
    code: "GATHAS250",
    label: "تخفیف ثابت گات‌ها",
    type: "FIXED" as CouponType,
    amount: 250000,
    status: "ACTIVE",
  },
];

const sampleStockBySlug: Record<string, number> = {
  "gathas-daily-study-book": 0,
  "good-thoughts-mug": 50,
  "golden-faravahar-shirt": 18,
  "asha-metal-bookmark": 120,
  "zoroaster-desk-statue": 0,
  "avesta-portal-art-print": 35,
};

export function getCommerceDashboard() {
  const totalValue = shopProducts.reduce((sum, product) => sum + product.price, 0);
  const orders = getSampleOrders();
  const inventory = getInventorySnapshot();

  return {
    productCount: shopProducts.length,
    averagePrice: Math.round(totalValue / shopProducts.length),
    visibleCategories: new Set(shopProducts.map((product) => product.category)).size,
    preorderCount: shopProducts.filter((product) => product.inventoryStatus === "preorder").length,
    orderCount: orders.length,
    pendingRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    shippingQueue: orders.filter((order) => order.shipment?.status === "PENDING" || order.shipment?.status === "PACKING").length,
    lowStockCount: inventory.filter((item) => item.alert === "low" || item.alert === "empty").length,
    couponCount: sampleCoupons.length,
    taxRate: adminShopSchema.taxRate,
  };
}

export function getInventorySnapshot(orders: CommerceOrder[] = getSampleOrders()): InventoryItem[] {
  return shopProducts.map((product) => {
    const reserved = orders.reduce(
      (sum, order) =>
        sum + order.items.filter((item) => item.slug === product.slug).reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );
    const stock = sampleStockBySlug[product.slug] ?? 0;
    const available = Math.max(0, stock - reserved);
    const status = toInventoryStatus(product.inventoryStatus, available);

    return {
      slug: product.slug,
      title: product.title,
      categoryLabel: product.categoryLabel,
      stock,
      reserved,
      available,
      status,
      alert: getInventoryAlert(product.inventoryStatus, available),
    };
  });
}

export function getSampleOrders(): CommerceOrder[] {
  const mug = getShopProduct("good-thoughts-mug") ?? shopProducts[0];
  const book = getShopProduct("gathas-daily-study-book") ?? shopProducts[1];

  return [
    {
      id: "order-demo-1001",
      email: "buyer@example.com",
      displayName: "خریدار نمونه",
      phone: "09120000000",
      status: "SUBMITTED",
      paymentStatus: "PENDING",
      subtotal: mug.price + book.price,
      discountCode: "ASHA10",
      discountTotal: Math.round((mug.price + book.price) * 0.1),
      taxTotal: Math.round((mug.price + book.price - Math.round((mug.price + book.price) * 0.1)) * adminShopSchema.taxRate),
      total:
        mug.price +
        book.price -
        Math.round((mug.price + book.price) * 0.1) +
        Math.round((mug.price + book.price - Math.round((mug.price + book.price) * 0.1)) * adminShopSchema.taxRate) +
        85000,
      currency: "IRR",
      shippingAddress: "تهران، آدرس نمونه برای تست سفارش",
      shippingMethod: "standard",
      shippingCost: 85000,
      notes: "سفارش demo برای بررسی مسیر checkout.",
      shipment: {
        carrier: "پست پیشتاز",
        method: "پست استاندارد",
        status: "PENDING",
        trackingCode: "DEMO-TRACK-1001",
        shippingCost: 85000,
      },
      createdAt: "2026-06-06T10:00:00.000Z",
      items: [
        { slug: mug.slug, title: mug.title, quantity: 1, unitPrice: mug.price, total: mug.price },
        { slug: book.slug, title: book.title, quantity: 1, unitPrice: book.price, total: book.price },
      ],
    },
  ];
}

export async function saveAdminProduct(payload: AdminProductPayload) {
  const validation = validateProductPayload(payload);

  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      message: "Payload محصول کامل نیست.",
      errors: validation.errors,
    };
  }

  const normalized = normalizeProductPayload(payload);
  const prisma = await getPrisma();

  if (!prisma) {
    return {
      ok: true,
      status: 202,
      mode: "dry-run",
      message: "محصول معتبر است. بعد از تنظیم DATABASE_URL همین قرارداد با Prisma ذخیره می‌شود.",
      preview: {
        ...normalized,
        formattedPrice: formatPrice(normalized.price),
      },
    };
  }

  try {
    const data = toPrismaProductData(normalized);
    const saved = await prisma.product.upsert({
      where: { slug: normalized.slug },
      update: data,
      create: { ...data, slug: normalized.slug },
    });

    return {
      ok: true,
      status: 200,
      mode: "database",
      message: "محصول با موفقیت در دیتابیس ذخیره شد.",
      saved,
    };
  } catch (error) {
    return {
      ok: true,
      status: 202,
      mode: "validated",
      message: "محصول معتبر است، اما دیتابیس هنوز آماده ذخیره‌سازی نیست.",
      detail: error instanceof Error ? error.message : "Unknown database error",
      preview: normalized,
    };
  }
}

export async function createCheckoutOrder(payload: CheckoutPayload) {
  const validation = validateCheckoutPayload(payload);

  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      message: "اطلاعات سفارش کامل نیست.",
      errors: validation.errors,
    };
  }

  const normalized = normalizeCheckoutPayload(payload);
  const prisma = await getPrisma();

  if (!prisma) {
    return {
      ok: true,
      status: 202,
      mode: "dry-run",
      message: "سفارش معتبر است. بعد از اتصال دیتابیس و پرداخت، سفارش واقعی ثبت می‌شود.",
      order: normalized,
      nextStep: {
        label: "اتصال آینده به درگاه پرداخت",
        href: "/admin/shop",
      },
    };
  }

  try {
    const productRows = await prisma.product.findMany({
      where: { slug: { in: normalized.items.map((item) => item.slug) } },
    });
    const productsBySlug = new Map(productRows.map((product) => [product.slug, product]));
    const createItems = normalized.items.map((item) => {
      const product = productsBySlug.get(item.slug);

      if (!product) {
        throw new Error(`Product ${item.slug} was not found.`);
      }

      return {
        productId: product.id,
        title: product.title,
        quantity: item.quantity,
        unitPrice: product.price,
        total: product.price * item.quantity,
      };
    });
    const pricing = calculatePricing(
      createItems.reduce((sum, item) => sum + item.total, 0),
      normalized.shippingCost,
      normalized.discountCode
    );
    const saved = await prisma.order.create({
      data: {
        email: normalized.email,
        displayName: normalized.displayName,
        phone: normalized.phone,
        shippingAddress: normalized.shippingAddress,
        shippingMethod: normalized.shippingMethod,
        shippingCost: normalized.shippingCost,
        notes: normalized.notes,
        status: "SUBMITTED",
        paymentStatus: "PENDING",
        subtotal: pricing.subtotal,
        discountCode: pricing.discountCode,
        discountTotal: pricing.discountTotal,
        taxTotal: pricing.taxTotal,
        total: pricing.total,
        currency: "IRR",
        items: { create: createItems },
        shipments: {
          create: {
            method: getShippingMethod(normalized.shippingMethod).label,
            status: "PENDING",
            shippingCost: normalized.shippingCost,
          },
        },
      },
      include: { items: true, shipments: true },
    });

    return {
      ok: true,
      status: 200,
      mode: "database",
      message: "سفارش با موفقیت ثبت شد و آماده اتصال به پرداخت است.",
      order: mapPrismaOrder(saved as PrismaOrderRow),
    };
  } catch (error) {
    return {
      ok: true,
      status: 202,
      mode: "validated",
      message: "سفارش معتبر است، اما دیتابیس هنوز آماده ذخیره‌سازی نیست.",
      detail: error instanceof Error ? error.message : "Unknown database error",
      order: normalized,
    };
  }
}

export async function getCommerceOrders(limit = 20): Promise<CommerceOrder[]> {
  const prisma = await getPrisma();

  if (!prisma) {
    return getSampleOrders();
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { items: true, shipments: true },
    });

    return orders.length ? orders.map(mapPrismaOrder) : getSampleOrders();
  } catch {
    return getSampleOrders();
  }
}

function mapPrismaOrder(order: PrismaOrderRow): CommerceOrder {
  return {
    id: order.id,
    email: order.email,
    displayName: order.displayName ?? undefined,
    phone: order.phone ?? undefined,
    status: order.status,
    paymentStatus: order.paymentStatus,
    subtotal: order.subtotal,
    discountCode: order.discountCode ?? undefined,
    discountTotal: order.discountTotal,
    taxTotal: order.taxTotal,
    total: order.total,
    currency: "IRR",
    shippingAddress: order.shippingAddress ?? undefined,
    shippingMethod: toShippingMethodId(order.shippingMethod),
    shippingCost: order.shippingCost,
    notes: order.notes ?? undefined,
    shipment: order.shipments[0]
      ? {
          carrier: order.shipments[0].carrier ?? undefined,
          method: order.shipments[0].method,
          status: order.shipments[0].status,
          trackingCode: order.shipments[0].trackingCode ?? undefined,
          shippingCost: order.shipments[0].shippingCost,
        }
      : undefined,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item, index) => ({
      slug: `order-item-${index + 1}`,
      title: item.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.total,
    })),
  };
}

function validateCheckoutPayload(payload: CheckoutPayload) {
  const errors: string[] = [];

  if (!payload.email) {
    errors.push("email is required.");
  }

  if (!payload.items?.length) {
    errors.push("items are required.");
  }

  for (const item of payload.items ?? []) {
    if (!item.slug) {
      errors.push("item.slug is required.");
    }

    if (!item.quantity || item.quantity < 1) {
      errors.push("item.quantity must be at least 1.");
    }
  }

  return { ok: errors.length === 0, errors };
}

function normalizeCheckoutPayload(payload: CheckoutPayload): CommerceOrder {
  const shippingMethod = payload.shippingMethod ?? "standard";
  const shippingCost = getShippingMethod(shippingMethod).cost;
  const items = (payload.items ?? []).map((item) => {
    const product = getShopProduct(item.slug as string);
    const quantity = Number(item.quantity ?? 1);
    const unitPrice = product?.price ?? 0;

    return {
      slug: item.slug as string,
      title: product?.title ?? (item.slug as string),
      quantity,
      unitPrice,
      total: unitPrice * quantity,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const pricing = calculatePricing(subtotal, shippingCost, payload.couponCode);

  return {
    id: `order-preview-${Date.now()}`,
    email: payload.email as string,
    displayName: payload.displayName,
    phone: payload.phone,
    status: "SUBMITTED",
    paymentStatus: "PENDING",
    subtotal: pricing.subtotal,
    discountCode: pricing.discountCode,
    discountTotal: pricing.discountTotal,
    taxTotal: pricing.taxTotal,
    total: pricing.total,
    currency: "IRR",
    shippingAddress: payload.shippingAddress,
    shippingMethod,
    shippingCost,
    notes: payload.notes,
    shipment: {
      method: getShippingMethod(shippingMethod).label,
      status: "PENDING",
      shippingCost,
    },
    createdAt: new Date().toISOString(),
    items,
  };
}

export function calculatePricing(subtotal: number, shippingCost: number, couponCode?: string) {
  const coupon = getCoupon(couponCode);
  const discountTotal = coupon
    ? coupon.type === "PERCENT"
      ? Math.round(subtotal * (coupon.amount / 100))
      : Math.min(subtotal, coupon.amount)
    : 0;
  const taxableTotal = Math.max(0, subtotal - discountTotal);
  const taxTotal = Math.round(taxableTotal * adminShopSchema.taxRate);

  return {
    subtotal,
    discountCode: coupon?.code,
    discountTotal,
    taxTotal,
    shippingCost,
    total: taxableTotal + taxTotal + shippingCost,
  };
}

export function getCoupon(code?: string) {
  if (!code) {
    return undefined;
  }

  return sampleCoupons.find((coupon) => coupon.code.toLowerCase() === code.trim().toLowerCase() && coupon.status === "ACTIVE");
}

export function getSalesReport(orders: CommerceOrder[] = getSampleOrders()) {
  const grossSales = orders.reduce((sum, order) => sum + order.subtotal, 0);
  const discountTotal = orders.reduce((sum, order) => sum + order.discountTotal, 0);
  const taxTotal = orders.reduce((sum, order) => sum + order.taxTotal, 0);
  const shippingTotal = orders.reduce((sum, order) => sum + order.shippingCost, 0);
  const netRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return {
    grossSales,
    discountTotal,
    taxTotal,
    shippingTotal,
    netRevenue,
    orderCount: orders.length,
    averageOrderValue: orders.length ? Math.round(netRevenue / orders.length) : 0,
  };
}

export function getShippingMethod(id?: string) {
  return adminShopSchema.shippingMethods.find((method) => method.id === id) ?? adminShopSchema.shippingMethods[0];
}

function toShippingMethodId(value?: string | null): ShippingMethodId | undefined {
  if (value === "standard" || value === "express" || value === "pickup") {
    return value;
  }

  return undefined;
}

function toInventoryStatus(status: string, available: number): InventoryStatus {
  if (available <= 0 && status !== "preorder") {
    return "OUT_OF_STOCK";
  }

  if (status === "available") {
    return "AVAILABLE";
  }

  if (status === "limited") {
    return "LIMITED";
  }

  return "PREORDER";
}

function getInventoryAlert(status: string, available: number): InventoryItem["alert"] {
  if (status === "preorder") {
    return "preorder";
  }

  if (available <= 0) {
    return "empty";
  }

  if (available <= 10) {
    return "low";
  }

  return "ok";
}

function validateProductPayload(payload: AdminProductPayload) {
  const errors: string[] = [];

  if (!payload.title) {
    errors.push("title is required.");
  }

  if (!payload.slug) {
    errors.push("slug is required.");
  }

  if (!payload.category || !categoryMap[payload.category]) {
    errors.push("category is required and must be supported.");
  }

  if (!payload.excerpt) {
    errors.push("excerpt is required.");
  }

  if (!payload.description) {
    errors.push("description is required.");
  }

  if (!payload.price || payload.price <= 0) {
    errors.push("price must be greater than zero.");
  }

  return { ok: errors.length === 0, errors };
}

function normalizeProductPayload(payload: AdminProductPayload): NormalizedAdminProductPayload {
  return {
    title: payload.title as string,
    slug: payload.slug as string,
    category: payload.category as ProductCategory,
    excerpt: payload.excerpt as string,
    description: payload.description as string,
    price: Number(payload.price),
    stock: Number(payload.stock ?? 0),
    status: payload.status ?? "DRAFT",
    inventoryStatus: payload.inventoryStatus ?? "PREORDER",
    coverImage: payload.coverImage,
    materials: payload.materials ?? [],
    tags: payload.tags ?? [],
    seoTitle: payload.seoTitle,
    seoDescription: payload.seoDescription,
  };
}

function toPrismaProductData(payload: NormalizedAdminProductPayload): PrismaProductData {
  return {
    title: payload.title,
    category: categoryMap[payload.category],
    excerpt: payload.excerpt,
    description: payload.description,
    price: payload.price,
    stock: payload.stock,
    reservedStock: 0,
    lowStockAlert: payload.inventoryStatus === "LIMITED" ? 8 : 5,
    status: payload.status,
    inventoryStatus: payload.inventoryStatus,
    coverImage: payload.coverImage,
    materials: payload.materials,
    tags: payload.tags,
    seoTitle: payload.seoTitle,
    seoDescription: payload.seoDescription,
  };
}

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma as unknown as CommercePrismaClient;
  } catch {
    return null;
  }
}
