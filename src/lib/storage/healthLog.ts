// Persistent health log backed by localStorage

import { HEALTH_METRICS, generateAllMockReadings } from "../data/healthMetrics";

const STORAGE_KEY = "aetherhealth-log";

export interface HealthLog {
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** metricId → numeric reading */
  metrics: Record<string, number>;
}

// ─── Core persistence ────────────────────────────────────────────────────────

export function getLog(): HealthLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as HealthLog[];
  } catch {
    // ignore parse errors
  }
  return [];
}

export function saveLog(log: HealthLog[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

// ─── Seeding ─────────────────────────────────────────────────────────────────

/** Call once on app start. Seeds 30 days of mock data if storage is empty. */
export function seedIfEmpty(): void {
  const existing = getLog();
  if (existing.length > 0) return;

  const readings = generateAllMockReadings();

  // Collect all unique dates across metrics
  const dateSet = new Set<string>();
  for (const metric of HEALTH_METRICS) {
    for (const r of readings[metric.id]) dateSet.add(r.date);
  }

  const log: HealthLog[] = Array.from(dateSet)
    .sort()
    .map((date) => {
      const metrics: Record<string, number> = {};
      for (const metric of HEALTH_METRICS) {
        const entry = readings[metric.id].find((r) => r.date === date);
        if (entry !== undefined) metrics[metric.id] = entry.value;
      }
      return { date, metrics };
    });

  saveLog(log);
}

// ─── Mutation ────────────────────────────────────────────────────────────────

/** Add or overwrite a single metric reading for a given date. */
export function addEntry(date: string, metricId: string, value: number): void {
  const log = getLog();
  const existing = log.find((e) => e.date === date);
  if (existing) {
    existing.metrics[metricId] = value;
  } else {
    log.push({ date, metrics: { [metricId]: value } });
    log.sort((a, b) => a.date.localeCompare(b.date));
  }
  saveLog(log);
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/** Get the most-recent entry for a metric, or undefined. */
export function getLatestValue(metricId: string): number | undefined {
  const log = getLog();
  for (let i = log.length - 1; i >= 0; i--) {
    const v = log[i].metrics[metricId];
    if (v !== undefined) return v;
  }
  return undefined;
}

/** Returns today's ISO date string. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Weekly average for a metric (last 7 days). Returns null if no data. */
export function getWeeklyAvg(metricId: string): number | null {
  const log = getLog();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const values = log
    .filter((e) => e.date >= cutoffStr && e.metrics[metricId] !== undefined)
    .map((e) => e.metrics[metricId]);

  if (values.length === 0) return null;
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

/** Compare the last 7 days average vs the 7 days before that. */
export function getTrend(metricId: string): "improving" | "stable" | "declining" {
  const log = getLog();
  const today = new Date();

  const slice = (startDaysAgo: number, endDaysAgo: number): number[] => {
    const start = new Date(today);
    start.setDate(today.getDate() - startDaysAgo);
    const end = new Date(today);
    end.setDate(today.getDate() - endDaysAgo);
    const s = start.toISOString().slice(0, 10);
    const e = end.toISOString().slice(0, 10);
    return log
      .filter((entry) => entry.date >= s && entry.date <= e && entry.metrics[metricId] !== undefined)
      .map((entry) => entry.metrics[metricId]);
  };

  const recent = slice(6, 0);
  const prior = slice(13, 7);

  if (recent.length === 0 || prior.length === 0) return "stable";

  const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;
  const avgPrior = prior.reduce((a, b) => a + b, 0) / prior.length;

  // "Improving" means moving toward the normal range centre
  const metric = HEALTH_METRICS.find((m) => m.id === metricId);
  if (!metric) return "stable";

  const { min, max } = metric.normalRange;
  const centre = (min + max) / 2;
  const distRecent = Math.abs(avgRecent - centre);
  const distPrior = Math.abs(avgPrior - centre);

  const changePct = Math.abs(avgRecent - avgPrior) / (Math.abs(avgPrior) || 1);
  if (changePct < 0.03) return "stable";

  return distRecent < distPrior ? "improving" : "declining";
}

/** Returns last N log entries that have a value for the given metric. */
export function getRecentEntries(
  metricId: string,
  n: number
): { date: string; value: number }[] {
  const log = getLog();
  return log
    .filter((e) => e.metrics[metricId] !== undefined)
    .slice(-n)
    .reverse()
    .map((e) => ({ date: e.date, value: e.metrics[metricId] }));
}

/** Returns the last `days` daily values for charting (oldest → newest). */
export function getChartData(
  metricId: string,
  days = 7
): { date: string; value: number }[] {
  const log = getLog();
  return log
    .filter((e) => e.metrics[metricId] !== undefined)
    .slice(-days)
    .map((e) => ({ date: e.date, value: e.metrics[metricId] }));
}

/** Health score: percentage of today's logged metrics within normal range (0-100). */
export function computeHealthScore(): number {
  const today = todayIso();
  const log = getLog();
  const todayEntry = log.find((e) => e.date === today);
  const source = todayEntry ?? log[log.length - 1];

  if (!source) return 0;

  let inRange = 0;
  let total = 0;

  for (const metric of HEALTH_METRICS) {
    const v = source.metrics[metric.id];
    if (v === undefined) continue;
    total++;
    if (v >= metric.normalRange.min && v <= metric.normalRange.max) inRange++;
  }

  if (total === 0) return 0;
  return Math.round((inRange / total) * 100);
}
