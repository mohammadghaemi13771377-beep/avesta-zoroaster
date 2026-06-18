import { editorialCommandTasks, type EditorialCommandTask } from "@/lib/editorial-workflow";
import { getCalendarEventsWithTaskReadiness, type PublishingChannel, type PublishingStatus } from "@/lib/publishing-calendar";

export type PublishDecision = "publish" | "schedule" | "hold" | "block";

export type PublishPipelineItem = {
  id: string;
  title: string;
  campaign: string;
  channel: PublishingChannel;
  status: PublishingStatus;
  date: string;
  owner: string;
  reviewer: string;
  href: string;
  readiness: number;
  decision: PublishDecision;
  gateScore: number;
  blocker: string;
  nextAction: string;
  gates: Array<{
    label: string;
    passed: boolean;
    note: string;
  }>;
  deliverables: string[];
};

export const publishDecisionLabels: Record<PublishDecision, string> = {
  publish: "قابل انتشار",
  schedule: "قابل زمان‌بندی",
  hold: "نگه‌دار",
  block: "مسدود"
};

export const publishDecisionTone: Record<PublishDecision, string> = {
  publish: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  schedule: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  hold: "border-gold/25 bg-gold/10 text-gold-light",
  block: "border-red-300/25 bg-red-300/10 text-red-100"
};

export function getPublishPipelineItems(tasks: EditorialCommandTask[] = editorialCommandTasks): PublishPipelineItem[] {
  return getCalendarEventsWithTaskReadiness().map((event) => {
    const task = event.relatedTaskId ? tasks.find((item) => item.id === event.relatedTaskId) : undefined;
    const gates = buildGates(event, task);
    const passedCount = gates.filter((gate) => gate.passed).length;
    const gateScore = Math.round((passedCount / gates.length) * 100);
    const decision = decidePublish(event.readiness, gateScore, event.status);

    return {
      id: event.id,
      title: event.title,
      campaign: event.campaign,
      channel: event.channel,
      status: event.status,
      date: event.date,
      owner: event.owner,
      reviewer: event.reviewer,
      href: event.href,
      readiness: event.readiness,
      decision,
      gateScore,
      blocker: event.blocker,
      nextAction: buildNextAction(decision, event.blocker),
      gates,
      deliverables: event.deliverables
    };
  });
}

export function getPublishPipelineSummary(items: PublishPipelineItem[] = getPublishPipelineItems()) {
  const averageGateScore = Math.round(items.reduce((sum, item) => sum + item.gateScore, 0) / Math.max(items.length, 1));
  const averageReadiness = Math.round(items.reduce((sum, item) => sum + item.readiness, 0) / Math.max(items.length, 1));
  const nextBlocked = [...items].sort((a, b) => decisionWeight(b.decision) - decisionWeight(a.decision) || a.gateScore - b.gateScore)[0];

  return {
    total: items.length,
    publish: items.filter((item) => item.decision === "publish").length,
    schedule: items.filter((item) => item.decision === "schedule").length,
    hold: items.filter((item) => item.decision === "hold").length,
    block: items.filter((item) => item.decision === "block").length,
    averageGateScore,
    averageReadiness,
    nextBlocked
  };
}

export function getPublishPipelineSnapshot() {
  const items = getPublishPipelineItems();

  return {
    generatedAt: new Date().toISOString(),
    summary: getPublishPipelineSummary(items),
    items,
    gates: [
      "محتوا و deliverable اصلی ثبت شده باشد.",
      "منبع، citation یا بازبینی پژوهشی مشخص شده باشد.",
      "تصویر، صوت، PDF یا asset مرتبط برای کانال انتشار آماده باشد.",
      "SEO، metadata و مسیر مقصد قبل از انتشار بررسی شده باشد."
    ]
  };
}

function buildGates(
  event: ReturnType<typeof getCalendarEventsWithTaskReadiness>[number],
  task: EditorialCommandTask | undefined
): PublishPipelineItem["gates"] {
  return [
    {
      label: "محتوای اصلی",
      passed: event.readiness >= 45,
      note: event.readiness >= 45 ? "محتوای پایه برای ادامه مسیر وجود دارد." : "متن یا ساختار اصلی هنوز کم است."
    },
    {
      label: "منبع و بازبینی",
      passed: Boolean(task?.checklist.find((item) => item.label.includes("citation"))?.done) || event.readiness >= 65,
      note: "citation، منبع یا تایید پژوهشی باید قبل از انتشار نهایی روشن باشد."
    },
    {
      label: "رسانه و asset",
      passed: Boolean(task?.checklist.find((item) => item.label.includes("رسانه"))?.done) || event.channel !== "media",
      note: "برای تجربه سینمایی، تصویر/صوت/thumbnail باید به مسیر مقصد وصل باشد."
    },
    {
      label: "SEO و مسیر مقصد",
      passed: Boolean(task?.checklist.find((item) => item.label.includes("SEO"))?.done) || event.status === "scheduled",
      note: "metadata، schema، sitemap و URL تمیز باید قبل از public launch بررسی شود."
    }
  ];
}

function decidePublish(readiness: number, gateScore: number, status: PublishingStatus): PublishDecision {
  if (readiness >= 85 && gateScore >= 90 && status === "scheduled") return "publish";
  if (readiness >= 70 && gateScore >= 75) return "schedule";
  if (readiness >= 45 && gateScore >= 50) return "hold";
  return "block";
}

function buildNextAction(decision: PublishDecision, blocker: string) {
  if (decision === "publish") return "انتشار نهایی قابل انجام است؛ smoke test و لینک‌سازی داخلی را اجرا کنید.";
  if (decision === "schedule") return "زمان‌بندی انتشار را انجام دهید و QA نهایی موبایل/دسکتاپ را بگیرید.";
  if (decision === "hold") return `قبل از زمان‌بندی، این مورد را حل کنید: ${blocker}`;
  return `انتشار متوقف شود تا blocker اصلی رفع شود: ${blocker}`;
}

function decisionWeight(decision: PublishDecision) {
  if (decision === "block") return 4;
  if (decision === "hold") return 3;
  if (decision === "schedule") return 2;
  return 1;
}
