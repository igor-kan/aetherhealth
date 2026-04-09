// Health Metrics definitions and mock data generator

export interface HealthMetric {
  id: string;
  name: string;
  unit: string;
  normalRange: { min: number; max: number };
  category: "vital" | "fitness" | "nutrition" | "mental";
  icon: string;
  description: string;
}

export const HEALTH_METRICS: HealthMetric[] = [
  {
    id: "heart_rate",
    name: "Heart Rate",
    unit: "bpm",
    normalRange: { min: 60, max: 100 },
    category: "vital",
    icon: "Heart",
    description: "Resting beats per minute measured in the morning.",
  },
  {
    id: "blood_pressure_systolic",
    name: "Blood Pressure",
    unit: "mmHg",
    normalRange: { min: 90, max: 120 },
    category: "vital",
    icon: "Activity",
    description: "Systolic blood pressure (top number).",
  },
  {
    id: "sleep_duration",
    name: "Sleep Duration",
    unit: "hrs",
    normalRange: { min: 7, max: 9 },
    category: "vital",
    icon: "Moon",
    description: "Total hours of sleep per night.",
  },
  {
    id: "steps",
    name: "Daily Steps",
    unit: "steps",
    normalRange: { min: 7000, max: 12000 },
    category: "fitness",
    icon: "Footprints",
    description: "Total number of steps walked in a day.",
  },
  {
    id: "calories",
    name: "Calories Burned",
    unit: "kcal",
    normalRange: { min: 1800, max: 2500 },
    category: "nutrition",
    icon: "Flame",
    description: "Total calories burned including basal metabolic rate.",
  },
  {
    id: "water_intake",
    name: "Water Intake",
    unit: "ml",
    normalRange: { min: 2000, max: 3000 },
    category: "nutrition",
    icon: "Droplets",
    description: "Total water consumed throughout the day.",
  },
  {
    id: "bmi",
    name: "BMI",
    unit: "kg/m²",
    normalRange: { min: 18.5, max: 24.9 },
    category: "vital",
    icon: "Scale",
    description: "Body Mass Index calculated from height and weight.",
  },
  {
    id: "spo2",
    name: "SpO2",
    unit: "%",
    normalRange: { min: 95, max: 100 },
    category: "vital",
    icon: "Wind",
    description: "Blood oxygen saturation level.",
  },
  {
    id: "stress_level",
    name: "Stress Level",
    unit: "/10",
    normalRange: { min: 1, max: 4 },
    category: "mental",
    icon: "Zap",
    description: "Self-reported stress level on a scale of 1-10.",
  },
  {
    id: "mood_score",
    name: "Mood Score",
    unit: "/10",
    normalRange: { min: 6, max: 10 },
    category: "mental",
    icon: "Smile",
    description: "Self-reported mood rating on a scale of 1-10.",
  },
  {
    id: "exercise_minutes",
    name: "Exercise Minutes",
    unit: "min",
    normalRange: { min: 30, max: 90 },
    category: "fitness",
    icon: "Dumbbell",
    description: "Active exercise time per day.",
  },
  {
    id: "resting_hr",
    name: "Resting Heart Rate",
    unit: "bpm",
    normalRange: { min: 50, max: 70 },
    category: "vital",
    icon: "HeartPulse",
    description: "Heart rate at complete rest, best measured upon waking.",
  },
  {
    id: "hrv",
    name: "Heart Rate Variability",
    unit: "ms",
    normalRange: { min: 40, max: 100 },
    category: "vital",
    icon: "TrendingUp",
    description: "Variation in time between heartbeats; higher is generally better.",
  },
  {
    id: "sleep_quality",
    name: "Sleep Quality",
    unit: "/10",
    normalRange: { min: 6, max: 10 },
    category: "mental",
    icon: "BedDouble",
    description: "Self-rated sleep quality score.",
  },
  {
    id: "hydration_pct",
    name: "Hydration",
    unit: "%",
    normalRange: { min: 50, max: 65 },
    category: "nutrition",
    icon: "Droplet",
    description: "Body water percentage as measured by bio-impedance.",
  },
];

// Seeded pseudo-random for reproducible mock data
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/** Returns an ISO date string (YYYY-MM-DD) offset `daysAgo` from today. */
function dateOffset(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/** Generate 30 days of realistic readings for a single metric.
 *  Returns an array of { date, value } sorted oldest → newest. */
export function generateMockReadings(
  metric: HealthMetric
): { date: string; value: number }[] {
  const rng = seededRandom(metric.id.length * 31 + metric.normalRange.min);
  const { min, max } = metric.normalRange;
  const mid = (min + max) / 2;
  const spread = (max - min) * 0.6; // natural variation band

  // Simulate a slow-moving baseline that wanders ±15% of the mid
  let baseline = mid;

  return Array.from({ length: 30 }, (_, i) => {
    // Drift baseline slightly each day
    baseline += (rng() - 0.5) * spread * 0.15;
    // Clamp baseline to stay within a sensible outer range
    const outerMin = min - (max - min) * 0.3;
    const outerMax = max + (max - min) * 0.3;
    baseline = Math.max(outerMin, Math.min(outerMax, baseline));

    // Daily noise on top of baseline
    const noise = (rng() - 0.5) * spread * 0.4;
    let value = baseline + noise;

    // For integer-style metrics, round appropriately
    if (["steps", "calories", "water_intake", "hrv"].includes(metric.id)) {
      value = Math.round(value);
    } else if (["bmi", "hydration_pct"].includes(metric.id)) {
      value = Math.round(value * 10) / 10;
    } else {
      value = Math.round(value * 10) / 10;
    }

    return { date: dateOffset(29 - i), value };
  });
}

/** Pre-generated readings map: metricId → [{date, value}] */
export type ReadingsMap = Record<string, { date: string; value: number }[]>;

export function generateAllMockReadings(): ReadingsMap {
  const result: ReadingsMap = {};
  for (const metric of HEALTH_METRICS) {
    result[metric.id] = generateMockReadings(metric);
  }
  return result;
}
