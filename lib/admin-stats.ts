import { getImportJobs } from "@/lib/bulk-import";
import { auditLogEntries, getAuditSummary } from "@/lib/audit-log";
import { contentSlots } from "@/lib/content-slots";
import { routeMap } from "@/lib/content";
import { editorialTasks, getEditorialSummary } from "@/lib/editorial-workflow";
import { adminPermissions, adminRoleProfiles } from "@/lib/admin-roles";
import { getLaunchReadinessSummary, launchReadinessItems } from "@/lib/launch-readiness";
import { getCommerceDashboard } from "@/lib/admin-shop";
import { searchIndexes } from "@/lib/search";
import { adminDashboard } from "@/lib/sample-content";

type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  tone: string;
};

type DashboardQueueItem = {
  title: string;
  type: string;
  status: string;
  owner: string;
};

type DashboardSeoCheck = {
  label: string;
  status: string;
  score: number;
};

type DashboardHealthItem = {
  label: string;
  value: string;
};

export type AdminStatsDashboard = {
  source: "database" | "fallback";
  metrics: DashboardMetric[];
  publishingQueue: DashboardQueueItem[];
  seoChecks: DashboardSeoCheck[];
  systemHealth: DashboardHealthItem[];
};

export async function getAdminStats(): Promise<AdminStatsDashboard> {
  const prisma = await getPrisma();
  const slotStats = getSlotStats();

  if (!prisma) {
    return fallbackDashboard(slotStats);
  }

  try {
    const [
      sectionCount,
      chapterCount,
      verseCount,
      articleCount,
      glossaryCount,
      libraryCount,
      mediaCount,
      readyMediaCount,
      userCount,
      importJobs,
    ] = await Promise.all([
      prisma.avestaSection.count(),
      prisma.avestaChapter.count(),
      prisma.avestaVerse.count(),
      prisma.article.count(),
      prisma.glossaryTerm.count(),
      prisma.libraryItem.count(),
      prisma.mediaAsset.count(),
      prisma.mediaAsset.count({ where: { status: "READY" } }),
      prisma.user.count(),
      getImportJobs(),
    ]);

    const failedImportCount = importJobs.filter((job) => job.status === "FAILED").length;

    return {
      source: "database",
      metrics: [
        {
          label: "بخش‌های اوستا",
          value: formatNumber(sectionCount),
          change: `${formatNumber(chapterCount)} فصل ثبت شده`,
          tone: "#D6A84F",
        },
        {
          label: "بندهای اوستا",
          value: formatNumber(verseCount),
          change: "متصل به ساختار مطالعه",
          tone: "#F2D58A",
        },
        {
          label: "مقاله و واژه",
          value: formatNumber(articleCount + glossaryCount),
          change: `${formatNumber(articleCount)} مقاله، ${formatNumber(glossaryCount)} واژه`,
          tone: "#FFF8EA",
        },
        {
          label: "رسانه‌ها",
          value: formatNumber(mediaCount),
          change: `${formatNumber(readyMediaCount)} آماده انتشار`,
          tone: "#7EA4C8",
        },
      ],
      publishingQueue: buildPublishingQueue(importJobs, slotStats),
      seoChecks: adminDashboard.seoChecks,
      systemHealth: [
        {
          label: "PostgreSQL",
          value: "متصل و آماده ذخیره‌سازی",
        },
        {
          label: "Library",
          value: `${formatNumber(libraryCount)} آیتم کتابخانه`,
        },
        {
          label: "Users",
          value: `${formatNumber(userCount)} کاربر ثبت شده`,
        },
        {
          label: "Import Jobs",
          value:
            failedImportCount > 0
              ? `${formatNumber(importJobs.length)} اجرا، ${formatNumber(failedImportCount)} خطادار`
              : `${formatNumber(importJobs.length)} اجرای اخیر بدون خطا`,
        },
      ],
    };
  } catch {
    return fallbackDashboard(slotStats);
  }
}

export async function getProjectHealth() {
  const dashboard = await getAdminStats();
  const slotStats = getSlotStats();
  const commerceDashboard = getCommerceDashboard();

  return {
    source: dashboard.source,
    status: dashboard.source === "database" ? "database-ready" : "sample-mode",
    generatedAt: new Date().toISOString(),
    checks: [
      {
        label: "Routes",
        value: routeMap.length,
        status: "ready",
      },
      {
        label: "Search indexes",
        value: searchIndexes.length,
        status: "ready",
      },
      {
        label: "Content slots",
        value: slotStats.empty + slotStats.placeholder + slotStats.ready,
        status: slotStats.empty > 0 ? "needs-content" : "ready",
      },
      {
        label: "Database",
        value: dashboard.source,
        status: dashboard.source === "database" ? "ready" : "waiting-for-DATABASE_URL",
      },
      {
        label: "Editorial workflow",
        value: getEditorialSummary(editorialTasks).averageReadiness,
        status: "needs-review",
      },
      {
        label: "Admin roles",
        value: `${adminRoleProfiles.length}/${adminPermissions.length}`,
        status: "policy-ready",
      },
      {
        label: "Launch readiness",
        value: getLaunchReadinessSummary(launchReadinessItems).averageScore,
        status: "preflight",
      },
      {
        label: "Commerce",
        value: commerceDashboard.productCount,
        status: "catalog-ready",
      },
      {
        label: "Audit log",
        value: getAuditSummary(auditLogEntries).total,
        status: "sample-events",
      },
    ],
  };
}

function fallbackDashboard(slotStats: ReturnType<typeof getSlotStats>): AdminStatsDashboard {
  return {
    source: "fallback",
    metrics: [
      ...adminDashboard.metrics,
      {
        label: "جایگاه‌های خالی",
        value: String(slotStats.empty),
        change: "آماده بارگذاری تصویر، صوت و PDF",
        tone: "#7EA4C8",
      },
    ],
    publishingQueue: buildPublishingQueue([], slotStats),
    seoChecks: adminDashboard.seoChecks,
    systemHealth: [
      ...adminDashboard.systemHealth,
      {
        label: "Content Slots",
        value: `${slotStats.ready} آماده، ${slotStats.placeholder} جایگزین، ${slotStats.empty} خالی`,
      },
    ],
  };
}

function buildPublishingQueue(
  importJobs: Awaited<ReturnType<typeof getImportJobs>>,
  slotStats: ReturnType<typeof getSlotStats>
): DashboardQueueItem[] {
  const importQueue = importJobs.slice(0, 3).map((job) => ({
    title: job.name,
    type: job.mode,
    status: job.status,
    owner: `${job.contentCount} محتوا / ${job.mediaCount} رسانه`,
  }));

  if (importQueue.length) {
    return importQueue;
  }

  return [
    {
      title: "تکمیل رسانه‌های خالی",
      type: "رسانه",
      status: `${slotStats.empty} جایگاه خالی`,
      owner: "Media",
    },
    ...adminDashboard.publishingQueue.slice(0, 2),
  ];
}

function getSlotStats() {
  return contentSlots.reduce(
    (acc, slot) => {
      acc[slot.status] += 1;
      return acc;
    },
    {
      empty: 0,
      placeholder: 0,
      ready: 0,
    }
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

async function getPrisma() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch {
    return null;
  }
}
