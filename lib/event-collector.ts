import { getTrackingEventMatrix } from "@/lib/event-tracking";

export type EventPayloadValue = string | number | boolean | null;

export type ClientEventInput = {
  event: string;
  route: string;
  payload?: Record<string, EventPayloadValue>;
  anonymousId?: string;
  sessionId?: string;
  timestamp?: string;
};

export type StoredClientEvent = Required<Omit<ClientEventInput, "payload" | "anonymousId" | "sessionId">> & {
  id: string;
  payload: Record<string, EventPayloadValue>;
  anonymousId: string | null;
  sessionId: string | null;
  receivedAt: string;
  accepted: boolean;
  warnings: string[];
};

const maxStoredEvents = 250;
const allowedEvents = new Map(getTrackingEventMatrix().map((item) => [item.event, item]));
const memoryEvents: StoredClientEvent[] = [];

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.slice(0, 220) : fallback;
}

function safePayload(value: unknown): Record<string, EventPayloadValue> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => item === null || ["string", "number", "boolean"].includes(typeof item))
      .slice(0, 30)
      .map(([key, item]) => [key.slice(0, 80), typeof item === "string" ? item.slice(0, 500) : (item as EventPayloadValue)])
  );
}

export function normalizeClientEvent(input: unknown): StoredClientEvent {
  const raw = input && typeof input === "object" ? (input as Partial<ClientEventInput>) : {};
  const event = safeString(raw.event);
  const route = safeString(raw.route || "/");
  const payload = safePayload(raw.payload);
  const spec = allowedEvents.get(event);
  const warnings: string[] = [];

  if (!event) warnings.push("event is required");
  if (!spec) warnings.push("event is not registered in tracking matrix");

  if (spec) {
    const missing = spec.payload.filter((key) => !(key in payload));
    if (missing.length) {
      warnings.push(`missing payload keys: ${missing.join(", ")}`);
    }
  }

  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    event,
    route,
    payload,
    anonymousId: safeString(raw.anonymousId) || null,
    sessionId: safeString(raw.sessionId) || null,
    timestamp: safeString(raw.timestamp) || new Date().toISOString(),
    receivedAt: new Date().toISOString(),
    accepted: Boolean(event && spec),
    warnings,
  };
}

export function collectClientEvent(input: unknown) {
  const normalized = normalizeClientEvent(input);

  if (normalized.accepted) {
    memoryEvents.unshift(normalized);
    memoryEvents.splice(maxStoredEvents);
  }

  return normalized;
}

export function getCollectedEvents() {
  return memoryEvents;
}

export function getEventCollectorSummary() {
  const matrix = getTrackingEventMatrix();
  const uniqueEvents = new Set(memoryEvents.map((event) => event.event));

  return {
    registeredEvents: matrix.length,
    storedEvents: memoryEvents.length,
    uniqueReceivedEvents: uniqueEvents.size,
    maxStoredEvents,
    mode: "in-memory-preview",
    nextSource: "Prisma Event table, warehouse, PostHog/GA4 fan-out and consent-aware routing",
  };
}
