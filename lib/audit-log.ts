export type AuditSeverity = "info" | "warning" | "critical";

export type AuditLogEntry = {
  id: string;
  actor: string;
  role: "READER" | "EDITOR" | "ADMIN";
  action: string;
  target: string;
  area: string;
  severity: AuditSeverity;
  createdAt: string;
  detail: string;
  metadata?: Record<string, unknown>;
};

export type AuditLogInput = {
  actor: string;
  role: AuditLogEntry["role"];
  action: string;
  target: string;
  area: string;
  severity?: AuditSeverity;
  detail: string;
  metadata?: Record<string, unknown>;
};

type PrismaAuditSeverity = "INFO" | "WARNING" | "CRITICAL";

type PrismaAuditLogRow = {
  id: string;
  actor: string;
  role: AuditLogEntry["role"];
  action: string;
  target: string;
  area: string;
  severity: PrismaAuditSeverity;
  detail: string;
  metadata: unknown;
  createdAt: Date;
};

type AuditPrismaClient = {
  auditLog: {
    findMany: (args: { orderBy: { createdAt: "desc" }; take: number }) => Promise<PrismaAuditLogRow[]>;
    create: (args: {
      data: {
        actor: string;
        role: AuditLogEntry["role"];
        action: string;
        target: string;
        area: string;
        severity: PrismaAuditSeverity;
        detail: string;
        metadata?: Record<string, unknown>;
      };
    }) => Promise<PrismaAuditLogRow>;
  };
};

export const auditLogEntries: AuditLogEntry[] = [
  {
    id: "audit-import-dry-run",
    actor: "Content Team",
    role: "EDITOR",
    action: "Dry-run import",
    target: "Yasna starter content",
    area: "ورود دسته‌ای",
    severity: "info",
    createdAt: "2026-06-06T08:10:00.000Z",
    detail: "بسته نمونه یسنا برای اعتبارسنجی ساختار متن و رسانه بررسی شد.",
  },
  {
    id: "audit-media-placeholder",
    actor: "Media Team",
    role: "EDITOR",
    action: "Prepare media slot",
    target: "Gathas audio narration",
    area: "رسانه",
    severity: "warning",
    createdAt: "2026-06-06T08:20:00.000Z",
    detail: "جایگاه صوتی آماده است، اما فایل نهایی هنوز بارگذاری نشده است.",
  },
  {
    id: "audit-source-trust",
    actor: "Editorial Lead",
    role: "ADMIN",
    action: "Review source trust",
    target: "Article trust panel",
    area: "اعتبار محتوا",
    severity: "info",
    createdAt: "2026-06-06T08:30:00.000Z",
    detail: "لایه اعتبار منابع برای مقاله‌ها و بندهای اوستا فعال شد.",
  },
  {
    id: "audit-role-policy",
    actor: "Product Admin",
    role: "ADMIN",
    action: "Define role matrix",
    target: "Admin roles",
    area: "دسترسی",
    severity: "critical",
    createdAt: "2026-06-06T08:40:00.000Z",
    detail: "ماتریس نقش‌ها باید پیش از اتصال ادمین واقعی به API enforce شود.",
  },
];

export function getAuditSummary(entries: AuditLogEntry[] = auditLogEntries) {
  return {
    total: entries.length,
    critical: entries.filter((entry) => entry.severity === "critical").length,
    warning: entries.filter((entry) => entry.severity === "warning").length,
    info: entries.filter((entry) => entry.severity === "info").length,
    latest: entries[0],
  };
}

export async function getAuditLogEntries(limit = 30) {
  const prisma = await getPrisma();

  if (!prisma) {
    return auditLogEntries;
  }

  try {
    const entries = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    if (!entries.length) {
      return auditLogEntries;
    }

    return entries.map((entry) => ({
      id: entry.id,
      actor: entry.actor,
      role: entry.role,
      action: entry.action,
      target: entry.target,
      area: entry.area,
      severity: fromPrismaSeverity(entry.severity),
      createdAt: entry.createdAt.toISOString(),
      detail: entry.detail,
      metadata: isRecord(entry.metadata) ? entry.metadata : undefined,
    }));
  } catch {
    return auditLogEntries;
  }
}

export async function recordAuditEvent(input: AuditLogInput) {
  const entry: AuditLogEntry = {
    id: `audit-${Date.now()}`,
    actor: input.actor,
    role: input.role,
    action: input.action,
    target: input.target,
    area: input.area,
    severity: input.severity ?? "info",
    detail: input.detail,
    metadata: input.metadata,
    createdAt: new Date().toISOString(),
  };

  const prisma = await getPrisma();

  if (!prisma) {
    return entry;
  }

  try {
    const saved = await prisma.auditLog.create({
      data: {
        actor: input.actor,
        role: input.role,
        action: input.action,
        target: input.target,
        area: input.area,
        severity: toPrismaSeverity(input.severity ?? "info"),
        detail: input.detail,
        metadata: input.metadata,
      },
    });

    return {
      ...entry,
      id: saved.id,
      createdAt: saved.createdAt.toISOString(),
    };
  } catch {
    return entry;
  }
}

function toPrismaSeverity(severity: AuditSeverity) {
  return severity.toUpperCase() as PrismaAuditSeverity;
}

function fromPrismaSeverity(severity: PrismaAuditSeverity) {
  return severity.toLowerCase() as AuditSeverity;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma as unknown as AuditPrismaClient;
  } catch {
    return null;
  }
}
