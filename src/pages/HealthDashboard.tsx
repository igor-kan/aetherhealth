import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft, TrendingUp, TrendingDown, Minus, Brain,
  Heart, Footprints, Moon, Smile, Plus, ChevronRight,
  Lightbulb, Activity,
} from "lucide-react";
import {
  seedIfEmpty, getLatestValue, getWeeklyAvg, getTrend,
  getChartData, computeHealthScore, addEntry, todayIso, getLog,
} from "@/lib/storage/healthLog";
import { HEALTH_METRICS, type HealthMetric } from "@/lib/data/healthMetrics";

// ─── helpers ─────────────────────────────────────────────────────────────────

function isInRange(value: number, metric: HealthMetric): boolean {
  return value >= metric.normalRange.min && value <= metric.normalRange.max;
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ─── Trend arrow ─────────────────────────────────────────────────────────────

function TrendIcon({ trend }: { trend: "improving" | "stable" | "declining" }) {
  if (trend === "improving")
    return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend === "declining")
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-gray-400" />;
}

// ─── Overview card ────────────────────────────────────────────────────────────

interface MetricCardProps {
  metric: HealthMetric;
  value: number | undefined;
  trend: "improving" | "stable" | "declining";
}

function MetricCard({ metric, value, trend }: MetricCardProps) {
  const inRange = value !== undefined && isInRange(value, metric);
  return (
    <Link to={`/metrics/${metric.id}`}>
      <Card className="p-5 border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500">{metric.name}</span>
          <TrendIcon trend={trend} />
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {value !== undefined ? value : "—"}
          </span>
          <span className="text-sm text-gray-400 mb-0.5">{metric.unit}</span>
        </div>
        <div className="mt-3">
          <Badge
            className={
              inRange
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-amber-100 text-amber-700 border-amber-200"
            }
          >
            {inRange ? "Normal" : "Out of range"}
          </Badge>
        </div>
      </Card>
    </Link>
  );
}

// ─── Tips panel ───────────────────────────────────────────────────────────────

const TIPS: Record<string, string> = {
  heart_rate: "Practice 4-7-8 breathing to lower your heart rate: inhale 4s, hold 7s, exhale 8s.",
  blood_pressure_systolic: "Reduce sodium intake and aim for 30 min of moderate aerobic activity daily.",
  sleep_duration: "Set a consistent sleep schedule and avoid screens 60 minutes before bed.",
  steps: "Take a 10-minute walk after each meal to reach your daily step goal gradually.",
  calories: "Track your meals with a food diary to understand your calorie balance.",
  water_intake: "Keep a 500 ml bottle on your desk and refill it 4-6 times throughout the day.",
  bmi: "Combine strength training with cardio and focus on whole-food nutrition.",
  spo2: "Practice diaphragmatic breathing exercises and avoid smoking.",
  stress_level: "Try a 10-minute mindfulness meditation session — apps like Headspace can help.",
  mood_score: "Schedule at least one enjoyable social activity this week.",
  exercise_minutes: "Break exercise into two 15-minute sessions if 30 consecutive minutes feels hard.",
  resting_hr: "Consistent aerobic training over weeks will naturally lower your resting heart rate.",
  hrv: "Prioritise sleep quality and manage alcohol intake to improve HRV.",
  sleep_quality: "Keep your bedroom cool (18-20 °C) and dark to improve sleep quality.",
  hydration_pct: "Start your morning with 500 ml of water before your first coffee.",
};

function TipsPanel({ outOfRangeIds }: { outOfRangeIds: string[] }) {
  const tips = outOfRangeIds.slice(0, 3).map((id) => ({
    id,
    name: HEALTH_METRICS.find((m) => m.id === id)?.name ?? id,
    tip: TIPS[id] ?? "Work with your healthcare provider to improve this metric.",
  }));

  if (tips.length === 0) {
    return (
      <Card className="p-5 border-green-200 bg-green-50">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">All metrics looking great!</h3>
        </div>
        <p className="text-sm text-green-700">
          All your tracked metrics are within the normal range. Keep up the excellent work.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Actionable Tips</h3>
      </div>
      <div className="space-y-4">
        {tips.map(({ id, name, tip }) => (
          <div key={id} className="flex gap-3">
            <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-xs text-amber-700 font-bold">!</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{name}</p>
              <p className="text-sm text-gray-600">{tip}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Log Modal ────────────────────────────────────────────────────────────────

interface LogModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

function LogModal({ open, onClose, onSaved }: LogModalProps) {
  const today = todayIso();
  const [values, setValues] = useState<Record<string, string>>({});

  const handleSave = () => {
    for (const [metricId, raw] of Object.entries(values)) {
      const n = parseFloat(raw);
      if (!isNaN(n)) addEntry(today, metricId, n);
    }
    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Today's Metrics</DialogTitle>
          <p className="text-sm text-gray-500">{today}</p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-2">
          {HEALTH_METRICS.map((metric) => (
            <div key={metric.id} className="space-y-1">
              <Label htmlFor={metric.id} className="text-xs text-gray-600">
                {metric.name}{" "}
                <span className="text-gray-400">({metric.unit})</span>
              </Label>
              <Input
                id={metric.id}
                type="number"
                placeholder={`${metric.normalRange.min}–${metric.normalRange.max}`}
                value={values[metric.id] ?? ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [metric.id]: e.target.value }))
                }
                className="h-8 text-sm"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
          >
            Save Entries
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const OVERVIEW_METRIC_IDS = ["steps", "heart_rate", "sleep_duration", "mood_score"];

export default function HealthDashboard() {
  const [, setTick] = useState(0);
  const [selectedMetricId, setSelectedMetricId] = useState("heart_rate");
  const [logOpen, setLogOpen] = useState(false);

  useEffect(() => {
    seedIfEmpty();
    setTick((n) => n + 1);
  }, []);

  const refresh = useCallback(() => setTick((n) => n + 1), []);

  // Compute out-of-range metrics using the most-recent log entry
  const log = getLog();
  const latestEntry = log[log.length - 1];
  const outOfRangeIds = latestEntry
    ? HEALTH_METRICS.filter((m) => {
        const v = latestEntry.metrics[m.id];
        return v !== undefined && !isInRange(v, m);
      }).map((m) => m.id)
    : [];

  const healthScore = computeHealthScore();
  const chartMetric = HEALTH_METRICS.find((m) => m.id === selectedMetricId)!;
  const chartData = getChartData(selectedMetricId, 7).map((d) => ({
    ...d,
    label: formatDate(d.date),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Health Dashboard</h1>
                <p className="text-sm text-blue-600">Your wellness at a glance</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => setLogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Today's Metrics
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">

        {/* Health score banner */}
        <Card className="p-6 border-blue-100 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Overall Health Score</h2>
              <p className="text-sm text-gray-500 mb-3">
                Based on how many of your metrics are within the normal range.
              </p>
              <Progress value={healthScore} className="h-3" />
            </div>
            <div className="text-center">
              <span
                className={`text-5xl font-bold ${
                  healthScore >= 70
                    ? "text-green-600"
                    : healthScore >= 40
                    ? "text-amber-500"
                    : "text-red-500"
                }`}
              >
                {healthScore}
              </span>
              <p className="text-sm text-gray-500">/ 100</p>
            </div>
          </div>
        </Card>

        {/* Overview cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Key Metrics</h2>
            <Link to="/metrics/steps" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OVERVIEW_METRIC_IDS.map((id) => {
              const metric = HEALTH_METRICS.find((m) => m.id === id)!;
              return (
                <MetricCard
                  key={id}
                  metric={metric}
                  value={getLatestValue(id)}
                  trend={getTrend(id)}
                />
              );
            })}
          </div>
        </div>

        {/* Chart + tips */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 p-6 border-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">7-Day Trend</h2>
              <Select value={selectedMetricId} onValueChange={setSelectedMetricId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HEALTH_METRICS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[
                      (dataMin: number) =>
                        Math.floor(Math.min(dataMin, chartMetric.normalRange.min) * 0.9),
                      (dataMax: number) =>
                        Math.ceil(Math.max(dataMax, chartMetric.normalRange.max) * 1.1),
                    ]}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v} ${chartMetric.unit}`, chartMetric.name]}
                  />
                  <ReferenceLine
                    y={chartMetric.normalRange.min}
                    stroke="#86efac"
                    strokeDasharray="4 4"
                    label={{ value: "min", fontSize: 10, fill: "#16a34a" }}
                  />
                  <ReferenceLine
                    y={chartMetric.normalRange.max}
                    stroke="#86efac"
                    strokeDasharray="4 4"
                    label={{ value: "max", fontSize: 10, fill: "#16a34a" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#2563eb" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-60 text-gray-400">
                <Activity className="h-8 w-8 mr-2" />
                No data for this metric yet.
              </div>
            )}

            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="inline-block w-6 h-0.5 border-t-2 border-dashed border-green-400" />
                Normal range
              </div>
              <div>
                Weekly avg:{" "}
                <strong>
                  {getWeeklyAvg(selectedMetricId) ?? "—"} {chartMetric.unit}
                </strong>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <div className="space-y-4">
            <TipsPanel outOfRangeIds={outOfRangeIds} />

            {/* All metrics quick-links */}
            <Card className="p-5 border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">All Metrics</h3>
              <div className="space-y-2">
                {HEALTH_METRICS.map((m) => {
                  const v = getLatestValue(m.id);
                  const ok = v !== undefined && isInRange(v, m);
                  return (
                    <Link
                      key={m.id}
                      to={`/metrics/${m.id}`}
                      className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm text-gray-700">{m.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {v ?? "—"}{" "}
                          <span className="text-gray-400 font-normal">{m.unit}</span>
                        </span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            v === undefined
                              ? "bg-gray-300"
                              : ok
                              ? "bg-green-500"
                              : "bg-amber-500"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <LogModal open={logOpen} onClose={() => setLogOpen(false)} onSaved={refresh} />
    </div>
  );
}
