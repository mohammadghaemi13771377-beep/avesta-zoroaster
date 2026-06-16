export type DeploymentReadinessStatus = "ready" | "needs_setup" | "blocked";

export type DeploymentReadinessItem = {
  id: string;
  title: string;
  owner: string;
  status: DeploymentReadinessStatus;
  score: number;
  risk: "low" | "medium" | "high";
  evidence: string;
  nextAction: string;
  references: string[];
};

export const deploymentReadinessStatusLabels: Record<DeploymentReadinessStatus, string> = {
  ready: "آماده",
  needs_setup: "نیازمند تنظیم",
  blocked: "مسدود",
};

export const deploymentReadinessItems: DeploymentReadinessItem[] = [
  {
    id: "source-package",
    title: "بسته سورس و فول‌کد",
    owner: "Tech Lead",
    status: "ready",
    score: 100,
    risk: "low",
    evidence: "فایل‌های avesta-zoroaster-source.zip و avesta-zoroaster-full-code.txt تولید شده‌اند.",
    nextAction: "قبل از push نهایی، zip و txt را دوباره بعد از آخرین تغییرات بسازید.",
    references: ["avesta-zoroaster-source.zip", "avesta-zoroaster-full-code.txt", "DELIVERY.md"],
  },
  {
    id: "github-repository",
    title: "GitHub repository",
    owner: "DevOps Lead",
    status: "needs_setup",
    score: 70,
    risk: "medium",
    evidence: "دستورهای git init، remote و push در سند handoff آماده شده‌اند.",
    nextAction: "repository خصوصی بسازید، کد را روی main push کنید و branch protection را فعال کنید.",
    references: ["docs/final-github-vercel-team-handoff.md", "docs/github-vercel-deploy.md"],
  },
  {
    id: "branch-protection",
    title: "Branch protection و Pull Request flow",
    owner: "Tech Lead",
    status: "needs_setup",
    score: 65,
    risk: "medium",
    evidence: "سیاست پیشنهادی PR review و status check در سند نهایی آمده است.",
    nextAction: "روی branch main حداقل یک approval و passing checks قبل از merge را اجباری کنید.",
    references: ["docs/final-github-vercel-team-handoff.md"],
  },
  {
    id: "vercel-project",
    title: "Vercel project و build command",
    owner: "DevOps Lead",
    status: "needs_setup",
    score: 72,
    risk: "medium",
    evidence: "Next.js، package scripts و vercel.json آماده‌اند؛ build command باید npm run build باشد.",
    nextAction: "Repository را به Vercel وصل کنید، framework را Next.js بگذارید و build را در Vercel اجرا کنید.",
    references: ["vercel.json", "package.json", "docs/final-github-vercel-team-handoff.md"],
  },
  {
    id: "environment",
    title: "Environment variables",
    owner: "Backend Lead",
    status: "blocked",
    score: 45,
    risk: "high",
    evidence: ".env.example وجود دارد، اما secretهای production هنوز واقعی نیستند.",
    nextAction: "DATABASE_URL، SESSION_SECRET، MEILISEARCH و storage envها را در Vercel Project Settings وارد کنید.",
    references: [".env.example", "docs/final-github-vercel-team-handoff.md"],
  },
  {
    id: "database",
    title: "PostgreSQL production",
    owner: "Backend Lead",
    status: "blocked",
    score: 40,
    risk: "high",
    evidence: "Prisma schema و seed آماده‌اند، اما دیتابیس production هنوز وصل نشده است.",
    nextAction: "PostgreSQL production بسازید، DATABASE_URL را ست کنید، migrate و seed را اجرا کنید.",
    references: ["prisma/schema.prisma", "prisma/seed.js", "docs/technical-handoff.md"],
  },
  {
    id: "search",
    title: "Meilisearch production",
    owner: "Backend Lead",
    status: "needs_setup",
    score: 55,
    risk: "medium",
    evidence: "Search API و برنامه Meilisearch آماده اتصال است.",
    nextAction: "Meilisearch host/key را ست کنید و sync index را بعد از seed اجرا کنید.",
    references: ["docs/search-meilisearch-plan.md", "app/api/search/sync/route.ts"],
  },
  {
    id: "storage",
    title: "Upload storage",
    owner: "Media Lead",
    status: "needs_setup",
    score: 58,
    risk: "medium",
    evidence: "upload abstraction وجود دارد، اما storage دائمی production هنوز تعیین نشده است.",
    nextAction: "R2/S3/Cloudinary یا storage داخلی را انتخاب کنید و PUBLIC_UPLOAD_BASE_URL را ست کنید.",
    references: ["lib/upload-storage.ts", "docs/media-asset-plan.md"],
  },
  {
    id: "domain-dns",
    title: "Domain و DNS",
    owner: "DevOps Lead",
    status: "needs_setup",
    score: 60,
    risk: "medium",
    evidence: "دامنه avesta-zoroaster.com در اسناد ثبت شده است.",
    nextAction: "دامنه را در Vercel اضافه کنید، DNS را طبق Vercel تنظیم کنید و SSL را چک کنید.",
    references: ["docs/final-github-vercel-team-handoff.md", "app/sitemap.ts", "app/robots.ts"],
  },
  {
    id: "production-auth",
    title: "Auth production",
    owner: "Security Lead",
    status: "blocked",
    score: 35,
    risk: "high",
    evidence: "ورود demo، cookie session و role guard فعلاً برای MVP داخلی آماده است.",
    nextAction: "auth واقعی، رمزنگاری session، secure cookie، reset password و مدیریت کاربر را پیاده‌سازی کنید.",
    references: ["lib/auth.ts", "middleware.ts", "docs/auth-plan.md"],
  },
  {
    id: "smoke-tests",
    title: "Smoke test و build verification",
    owner: "QA Lead",
    status: "needs_setup",
    score: 62,
    risk: "medium",
    evidence: "چک syntax سبک انجام شده، اما npm روی محیط فعلی Codex در PATH نبود.",
    nextAction: "در CI یا سیستم تیم فنی npm install، npm run build و تست مسیرهای اصلی را اجرا کنید.",
    references: ["README.md", "docs/final-github-vercel-team-handoff.md"],
  },
];

export function getDeploymentReadinessSummary(items: DeploymentReadinessItem[] = deploymentReadinessItems) {
  const ready = items.filter((item) => item.status === "ready").length;
  const needsSetup = items.filter((item) => item.status === "needs_setup").length;
  const blocked = items.filter((item) => item.status === "blocked").length;
  const averageScore = Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length);
  const launchMode = blocked > 0 ? "NO-GO" : needsSetup > 0 ? "SOFT-GO" : "GO";
  const highestRisk = items
    .filter((item) => item.risk === "high" || item.status === "blocked")
    .sort((a, b) => a.score - b.score)[0] ?? [...items].sort((a, b) => a.score - b.score)[0];

  return {
    total: items.length,
    ready,
    needsSetup,
    blocked,
    averageScore,
    launchMode,
    highestRisk,
  };
}
