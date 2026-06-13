import { getProductEventSpecs, type ProductEventSpec } from "@/lib/product-analytics";

export type TrackingDestination = "first-party" | "posthog" | "ga4" | "newsletter" | "commerce";
export type TrackingStatus = "planned" | "instrumented" | "needs-dev" | "blocked";

export type TrackingEventMatrixItem = ProductEventSpec & {
  owner: string;
  destination: TrackingDestination[];
  status: TrackingStatus;
  trigger: string;
  qaRule: string;
  privacyNote: string;
};

export const trackingStatusLabels: Record<TrackingStatus, string> = {
  planned: "برنامه‌ریزی‌شده",
  instrumented: "آماده اتصال",
  "needs-dev": "نیازمند پیاده‌سازی",
  blocked: "مسدود",
};

export const trackingStatusTone: Record<TrackingStatus, string> = {
  planned: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  instrumented: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-dev": "border-gold/25 bg-gold/10 text-gold-light",
  blocked: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export const destinationLabels: Record<TrackingDestination, string> = {
  "first-party": "Events DB",
  posthog: "PostHog",
  ga4: "GA4",
  newsletter: "Email",
  commerce: "Commerce",
};

const eventExtensions: Record<
  string,
  Pick<TrackingEventMatrixItem, "owner" | "destination" | "status" | "trigger" | "qaRule" | "privacyNote">
> = {
  hero_cta_click: {
    owner: "Product",
    destination: ["first-party", "posthog", "ga4"],
    status: "instrumented",
    trigger: "کلیک روی CTAهای hero و کارت‌های بزرگ ورود در خانه.",
    qaRule: "با هر کلیک فقط یک event با cta_id یکتا ارسال شود.",
    privacyNote: "بدون اطلاعات شخصی؛ فقط route، locale و label.",
  },
  avesta_section_opened: {
    owner: "Content",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "کلیک روی کارت‌های بخش اوستا در `/avesta` یا dropdown اوستا.",
    qaRule: "section_slug باید با slug موجود در CMS برابر باشد.",
    privacyNote: "رفتار محتوایی ناشناس؛ برای personalization بعدی قابل اتصال به user_id هش‌شده.",
  },
  verse_reading_progress: {
    owner: "Reader Experience",
    destination: ["first-party", "posthog"],
    status: "planned",
    trigger: "رسیدن کاربر به 25/50/75/100 درصد صفحه بند اوستا.",
    qaRule: "هر آستانه پیشرفت برای هر verse فقط یک بار در هر session ثبت شود.",
    privacyNote: "برای ادامه مطالعه لازم است؛ یادداشت خصوصی یا متن کاربر ارسال نشود.",
  },
  search_submitted: {
    owner: "Search",
    destination: ["first-party", "posthog", "ga4"],
    status: "needs-dev",
    trigger: "submit جستجو در `/search` یا search overlay آینده.",
    qaRule: "result_count و normalized query ذخیره شود؛ query خام برای privacy review بررسی شود.",
    privacyNote: "برای عبارات حساس، hash یا redaction قبل از ارسال به ابزار خارجی در نظر گرفته شود.",
  },
  command_center_opened: {
    owner: "Product",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "باز شدن فرمان‌خانه سریع از دکمه هدر یا میانبر Ctrl+K.",
    qaRule: "در هر باز شدن فقط یک event با source و surface ارسال شود.",
    privacyNote: "بدون داده شخصی؛ فقط روش باز شدن و سطح UI ذخیره می‌شود.",
  },
  command_center_action_clicked: {
    owner: "Product",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "کلیک روی یک مسیر داخل فرمان‌خانه سریع.",
    qaRule: "href باید یکی از routeهای داخلی معتبر باشد و title با عنوان UI برابر بماند.",
    privacyNote: "رفتار ناوبری ناشناس؛ برای UX و بهبود IA استفاده شود.",
  },
  onboarding_profile_saved: {
    owner: "Product",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "ذخیره مسیر شروع در صفحه `/onboarding`.",
    qaRule: "goal، time و tone باید فقط از گزینه‌های مجاز ارسال شوند.",
    privacyNote: "فعلاً بدون نام و ایمیل؛ ترجیحات شروع در مرورگر ذخیره می‌شود.",
  },
  onboarding_path_started: {
    owner: "Product",
    destination: ["first-party", "posthog", "ga4"],
    status: "instrumented",
    trigger: "کلیک روی CTA شروع مسیر یا تنظیم مسیر کامل در `/onboarding`.",
    qaRule: "href باید داخلی باشد و goal/time/tone با انتخاب فعلی UI هم‌خوان باشد.",
    privacyNote: "برای تحلیل تبدیل onboarding؛ بدون داده حساس شخصی.",
  },
  dashboard_onboarding_resume_clicked: {
    owner: "Product",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "کلیک روی کارت مسیر شروع من در نورخانه شخصی.",
    qaRule: "state باید یکی از saved یا empty باشد، goal در حالت empty مقدار null داشته باشد و href با query معتبر ساخته شود.",
    privacyNote: "فقط ترجیح کلی مسیر شروع ارسال می‌شود؛ اطلاعات هویتی ارسال نمی‌شود.",
  },
  journey_plan_saved: {
    owner: "Reader Experience",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "کلیک روی ذخیره در نورخانه داخل `/journey-builder`.",
    qaRule: "step_count باید با تعداد قدم‌های نمایش داده‌شده برابر باشد و intent/pace/level/mode معتبر باشند.",
    privacyNote: "فقط تنظیمات مسیر ذخیره می‌شود؛ متن یادداشت خصوصی یا شناسه هویتی ارسال نمی‌شود.",
  },
  dashboard_active_journey_clicked: {
    owner: "Reader Experience",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "کلیک روی کارت مسیر فعال من در نورخانه.",
    qaRule: "در حالت saved، href باید به قدم بعدی یا Journey Builder معتبر اشاره کند.",
    privacyNote: "رفتار ناوبری مسیر فعال؛ بدون داده حساس شخصی.",
  },
  active_journey_step_completed: {
    owner: "Reader Experience",
    destination: ["first-party", "posthog"],
    status: "instrumented",
    trigger: "کلیک روی دکمه انجام شد در کارت مسیر فعال نورخانه.",
    qaRule: "completed_count نباید از step_count بیشتر شود و step_id باید در snapshot مسیر فعال وجود داشته باشد.",
    privacyNote: "فقط پیشرفت مسیر ذخیره می‌شود؛ متن یادداشت خصوصی ارسال نمی‌شود.",
  },
  newsletter_signup: {
    owner: "Growth",
    destination: ["first-party", "newsletter", "posthog"],
    status: "instrumented",
    trigger: "ارسال فرم نورنامه و ذخیره preferences.",
    qaRule: "double opt-in، source_route و variant باید در payload باشند.",
    privacyNote: "ایمیل فقط در email provider و دیتابیس first-party ذخیره شود؛ به GA4 ارسال نشود.",
  },
  product_added_to_cart: {
    owner: "Commerce",
    destination: ["first-party", "commerce", "posthog"],
    status: "planned",
    trigger: "کلیک افزودن به سبد در صفحه محصول.",
    qaRule: "price، category و inventory_status با داده محصول sync باشد.",
    privacyNote: "تا قبل از پرداخت، اطلاعات هویتی کاربر ارسال نشود.",
  },
};

export function getTrackingEventMatrix(): TrackingEventMatrixItem[] {
  return getProductEventSpecs().map((event) => ({
    ...event,
    ...(eventExtensions[event.event] ?? {
      owner: "Product",
      destination: ["first-party"] as TrackingDestination[],
      status: "planned" as TrackingStatus,
      trigger: "Trigger دقیق در مرحله implementation تکمیل شود.",
      qaRule: "Payload، duplicate prevention و مسیر ارسال event در QA کنترل شود.",
      privacyNote: "قبل از ارسال به ابزار خارجی، داده حساس حذف یا ناشناس شود.",
    }),
  }));
}

export function getTrackingSummary(events: TrackingEventMatrixItem[] = getTrackingEventMatrix()) {
  const mustHave = events.filter((event) => event.priority === "must-have").length;
  const ready = events.filter((event) => event.status === "instrumented").length;
  const needsDev = events.filter((event) => event.status === "needs-dev").length;
  const blocked = events.filter((event) => event.status === "blocked").length;
  const destinationCount = new Set(events.flatMap((event) => event.destination)).size;

  return {
    total: events.length,
    mustHave,
    ready,
    needsDev,
    blocked,
    destinationCount,
    implementationReadiness: Math.round((ready / Math.max(1, events.length)) * 100),
  };
}

export function getTrackingImplementationChecklist() {
  return [
    {
      title: "تعریف track() مشترک",
      owner: "Frontend",
      detail: "یک helper مرکزی برای ارسال event به first-party API و ابزارهای خارجی ساخته شود.",
    },
    {
      title: "ساخت endpoint first-party",
      owner: "Backend",
      detail: "`/api/events` برای اعتبارسنجی payload، حذف داده حساس و ذخیره batch event آماده شود.",
    },
    {
      title: "اتصال PostHog/GA4",
      owner: "Growth",
      detail: "فقط eventهای مجاز و privacy-safe به ابزارهای خارجی ارسال شوند.",
    },
    {
      title: "QA با dataLayer preview",
      owner: "QA",
      detail: "برای هر route مهم، event count، payload و duplicate prevention تست شود.",
    },
  ];
}
