import type { JourneyBuilderInput, JourneyPlan } from "@/lib/journey-builder";

export const activeJourneyStorageKey = "avesta-active-journey-v1";

export type ActiveJourneySnapshot = {
  title: string;
  savedAt: string;
  input: JourneyBuilderInput;
  totalDuration: string;
  steps: ActiveJourneyStep[];
  completedStepIds: string[];
  stepCount: number;
  focusWords: string[];
};

export type ActiveJourneyStep = {
  id: string;
  title: string;
  href: string;
  task: string;
};

export type ActiveJourneyProgress = {
  completedCount: number;
  totalCount: number;
  percent: number;
  nextStep: ActiveJourneyStep | null;
};

export function buildActiveJourneySnapshot(input: JourneyBuilderInput, plan: JourneyPlan): ActiveJourneySnapshot {
  const steps = plan.steps.map((step) => ({
    id: step.id,
    title: step.title,
    href: step.href,
    task: step.task,
  }));

  return {
    title: plan.title,
    savedAt: new Date().toISOString(),
    input,
    totalDuration: plan.totalDuration,
    steps,
    completedStepIds: [],
    stepCount: plan.steps.length,
    focusWords: plan.focusWords,
  };
}

export function buildJourneyHrefFromInput(input: JourneyBuilderInput) {
  return `/journey-builder?intent=${input.intent}&pace=${input.pace}&level=${input.level}&mode=${input.mode}`;
}

export function isActiveJourneySnapshot(value: unknown): value is ActiveJourneySnapshot {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ActiveJourneySnapshot>;

  return (
    typeof candidate.title === "string" &&
    typeof candidate.savedAt === "string" &&
    isJourneyInput(candidate.input) &&
    typeof candidate.totalDuration === "string" &&
    Array.isArray(candidate.steps) &&
    candidate.steps.every(isActiveJourneyStep) &&
    Array.isArray(candidate.completedStepIds) &&
    candidate.completedStepIds.every((item) => typeof item === "string") &&
    typeof candidate.stepCount === "number" &&
    Array.isArray(candidate.focusWords)
  );
}

export function getActiveJourneyProgress(snapshot: ActiveJourneySnapshot): ActiveJourneyProgress {
  const completed = new Set(snapshot.completedStepIds);
  const nextStep = snapshot.steps.find((step) => !completed.has(step.id)) ?? null;
  const completedCount = snapshot.steps.filter((step) => completed.has(step.id)).length;
  const totalCount = Math.max(1, snapshot.steps.length);

  return {
    completedCount,
    totalCount: snapshot.steps.length,
    percent: Math.round((completedCount / totalCount) * 100),
    nextStep,
  };
}

export function completeActiveJourneyStep(snapshot: ActiveJourneySnapshot, stepId: string): ActiveJourneySnapshot {
  const existing = new Set(snapshot.completedStepIds);
  existing.add(stepId);

  return {
    ...snapshot,
    completedStepIds: snapshot.steps.filter((step) => existing.has(step.id)).map((step) => step.id),
  };
}

function isActiveJourneyStep(value: unknown): value is ActiveJourneyStep {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ActiveJourneyStep>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.href === "string" &&
    typeof candidate.task === "string"
  );
}

function isJourneyInput(value: unknown): value is JourneyBuilderInput {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<JourneyBuilderInput>;
  return (
    (candidate.intent === "study" ||
      candidate.intent === "clarity" ||
      candidate.intent === "calm" ||
      candidate.intent === "truth" ||
      candidate.intent === "courage") &&
    (candidate.pace === "short" || candidate.pace === "balanced" || candidate.pace === "deep") &&
    (candidate.level === "beginner" || candidate.level === "curious" || candidate.level === "advanced") &&
    (candidate.mode === "study" || candidate.mode === "ritual" || candidate.mode === "visual" || candidate.mode === "action")
  );
}
