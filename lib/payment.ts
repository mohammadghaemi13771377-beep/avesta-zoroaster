import { formatPrice } from "@/lib/shop";

export type PaymentProviderId = "demo" | "zarinpal" | "stripe";

export type PaymentProviderConfig = {
  id: PaymentProviderId;
  label: string;
  status: "ready" | "needs_config" | "future";
  description: string;
  requiredEnv: string[];
};

export type PaymentIntentInput = {
  orderId: string;
  amount: number;
  email: string;
  callbackUrl?: string;
  provider?: PaymentProviderId;
};

export const paymentProviders: PaymentProviderConfig[] = [
  {
    id: "demo",
    label: "Demo Gateway",
    status: "ready",
    description: "درگاه نمایشی برای تست مسیر پرداخت بدون پول واقعی.",
    requiredEnv: [],
  },
  {
    id: "zarinpal",
    label: "Zarinpal",
    status: "needs_config",
    description: "درگاه مناسب بازار ایران؛ بعداً با merchant id و callback واقعی وصل می‌شود.",
    requiredEnv: ["ZARINPAL_MERCHANT_ID", "PAYMENT_CALLBACK_URL"],
  },
  {
    id: "stripe",
    label: "Stripe",
    status: "future",
    description: "گزینه بین‌المللی برای نسخه چندزبانه و فروش خارج از ایران.",
    requiredEnv: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
  },
];

export function createDemoPaymentIntent(input: PaymentIntentInput) {
  const authority = `DEMO-${input.orderId}-${Date.now()}`;
  const provider = input.provider ?? "demo";

  return {
    ok: true,
    provider,
    orderId: input.orderId,
    authority,
    amount: input.amount,
    formattedAmount: formatPrice(input.amount),
    status: "PENDING" as const,
    redirectUrl: `/shop/payment/demo?authority=${encodeURIComponent(authority)}&order=${encodeURIComponent(
      input.orderId
    )}`,
    callbackUrl: input.callbackUrl ?? "/api/shop/payments/callback",
    message: "درگاه demo آماده است. درگاه واقعی بعداً با همین قرارداد جایگزین می‌شود.",
  };
}

export function getPaymentReadiness() {
  const ready = paymentProviders.filter((provider) => provider.status === "ready").length;
  const needsConfig = paymentProviders.filter((provider) => provider.status === "needs_config").length;
  const future = paymentProviders.filter((provider) => provider.status === "future").length;

  return {
    ready,
    needsConfig,
    future,
    total: paymentProviders.length,
    providers: paymentProviders,
  };
}
