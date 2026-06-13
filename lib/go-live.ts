import { getLaunchReadinessSummary, launchReadinessItems, type LaunchReadinessStatus } from "@/lib/launch-readiness";

export type GoLiveGateStatus = "pass" | "watch" | "stop";

export type GoLiveGate = {
  id: string;
  title: string;
  owner: string;
  status: GoLiveGateStatus;
  score: number;
  evidence: string;
  command: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const goLiveGateStatusLabels: Record<GoLiveGateStatus, string> = {
  pass: "قابل عبور",
  watch: "نیازمند مراقبت",
  stop: "مانع لانچ",
};

const ownerByArea: Record<string, string> = {
  Frontend: "Frontend Lead",
  SEO: "SEO Lead",
  Content: "Editorial Lead",
  Media: "Creative Lead",
  Backend: "Backend Lead",
  Security: "Security Lead",
  Governance: "Product Ops",
  DevOps: "DevOps Lead",
  Commerce: "Commerce Lead",
  Growth: "Growth Lead",
  "Product Ops": "Product Lead",
  "Product Experience": "Product Lead",
};

const linkByArea: Record<string, GoLiveGate["links"]> = {
  Frontend: [
    { label: "خانه", href: "/" },
    { label: "نقشه جهان", href: "/world" },
  ],
  SEO: [
    { label: "SEO", href: "/admin/seo" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
  Content: [
    { label: "Inventory", href: "/admin/inventory" },
    { label: "اوستا ادمین", href: "/admin/avesta" },
  ],
  Media: [
    { label: "رسانه", href: "/admin/media" },
    { label: "Briefها", href: "/admin/production/briefs" },
  ],
  Backend: [
    { label: "Health", href: "/api/admin/health" },
    { label: "Stats", href: "/api/admin/stats" },
  ],
  Security: [
    { label: "نقش‌ها", href: "/admin#roles" },
    { label: "Audit", href: "/admin#audit-log" },
  ],
  DevOps: [
    { label: "Health", href: "/api/admin/health" },
    { label: "تحویل تیم‌ها", href: "/admin/team-handoff" },
  ],
  Commerce: [
    { label: "فروشگاه", href: "/admin/shop" },
    { label: "Checkout", href: "/shop/checkout" },
  ],
  Growth: [
    { label: "خبرنامه", href: "/admin/newsletter" },
    { label: "Delivery", href: "/admin/newsletter/delivery" },
  ],
  "Product Ops": [
    { label: "تحویل تیم‌ها", href: "/admin/team-handoff" },
    { label: "Review", href: "/admin/production/review" },
  ],
};

export function getGoLiveGates(): GoLiveGate[] {
  return launchReadinessItems.map((item) => ({
    id: `gate-${item.id}`,
    title: item.label,
    owner: ownerByArea[item.area] ?? "Product Lead",
    status: mapReadinessStatus(item.status),
    score: item.score,
    evidence: item.evidence,
    command: item.nextAction,
    links: linkByArea[item.area] ?? [{ label: "آمادگی لانچ", href: "/admin#launch-readiness" }],
  }));
}

export function getGoLiveSummary(gates: GoLiveGate[] = getGoLiveGates()) {
  const readiness = getLaunchReadinessSummary();
  const pass = gates.filter((gate) => gate.status === "pass").length;
  const watch = gates.filter((gate) => gate.status === "watch").length;
  const stop = gates.filter((gate) => gate.status === "stop").length;
  const launchMode = stop > 0 ? "NO-GO" : watch > 0 ? "SOFT-GO" : "GO";

  return {
    launchMode,
    averageScore: readiness.averageScore,
    gates: gates.length,
    pass,
    watch,
    stop,
    nextStopper: gates.find((gate) => gate.status === "stop") ?? [...gates].sort((a, b) => a.score - b.score)[0],
  };
}

function mapReadinessStatus(status: LaunchReadinessStatus): GoLiveGateStatus {
  if (status === "ready") {
    return "pass";
  }

  if (status === "blocked") {
    return "stop";
  }

  return "watch";
}
