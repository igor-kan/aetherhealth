import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Brain, Activity } from "lucide-react";
import { HEALTH_METRICS, type HealthMetric } from "@/lib/data/healthMetrics";
import {
  seedIfEmpty, getChartData, getRecentEntries, getTrend, getWeeklyAvg,
} from "@/lib/storage/healthLog";

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function TrendBadge({ trend }: { trend: "improving" | "stable" | "declining" }) {
  if (trend === "improving")
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
        <TrendingUp className="h-3 w-3" /> Improving
      </Badge>
    );
  if (trend === "declining")
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
        <TrendingDown className="h-3 w-3" /> Declining
      </Badge>
    );
  return (
    <Badge className="bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1">
      <Minus className="h-3 w-3" /> Stable
    </Badge>
  );
}

export default function MetricDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setTick] = useState(0);

  useEffect(() => {
    seedIfEmpty();
    setTick((n) => n + 1);
  }, []);

  const metric: HealthMetric | undefined = HEALTH_METRICS.find((m) => m.id === id);

  if (!metric) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Metric not found.</p>
        <Link to="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const chartData = getChartData(metric.id, 30).map((d) => ({
    ...d,
    label: formatDate(d.date),
  }));

  const recentEntries = getRecentEntries(metric.id, 7);
  const trend = getTrend(metric.id);
  const weeklyAvg = getWeeklyAvg(metric.id);

  const values = chartData.map((d) => d.value);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 0;
  const avgVal =
    values.length
      ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
      : 0;

  const { min: rangeMin, max: rangeMax } = metric.normalRange;

  // Y-axis domain: contain both data range and normal range with 10% padding
  const yMin = Math.floor(Math.min(minVal, rangeMin) * 0.9);
  const yMax = Math.ceil(Math.max(maxVal, rangeMax) * 1.1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/health-dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{metric.name}</h1>
                <p className="text-sm text-blue-600">{metric.category} metric</p>
              </div>
            </div>
          </div>
          <TrendBadge trend={trend} />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">

        {/* Description + quick stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card className="sm:col-span-2 p-5 border-blue-100">
            <h2 className="text-sm font-medium text-gray-500 mb-1">About this metric</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{metric.description}</p>
            <p className="text-xs text-gray-400 mt-3">
              Normal range:{" "}
              <strong className="text-gray-600">
                {rangeMin}–{rangeMax} {metric.unit}
              </strong>
            </p>
          </Card>

          {[
            { label: "30-day Min", value: values.length ? minVal : "—" },
            { label: "30-day Max", value: values.length ? maxVal : "—" },
            { label: "30-day Avg", value: values.length ? avgVal : "—" },
          ].map(({ label, value }) => (
            <Card key={label} className="p-5 border-blue-100 flex flex-col justify-between">
              <span className="text-sm text-gray-500">{label}</span>
              <div>
                <span className="text-2xl font-bold text-gray-900">{value}</span>{" "}
                <span className="text-sm text-gray-400">{metric.unit}</span>
              </div>
              <span className="text-xs text-gray-400">
                Weekly avg: {weeklyAvg ?? "—"} {metric.unit}
              </span>
            </Card>
          ))}
        </div>

        {/* 30-day chart */}
        <Card className="p-6 border-blue-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">30-Day History</h2>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                  interval={4}
                />
                <YAxis tick={{ fontSize: 12 }} domain={[yMin, yMax]} />
                <Tooltip
                  formatter={(v: number) => [`${v} ${metric.unit}`, metric.name]}
                />

                {/* Green band = normal range */}
                <ReferenceArea
                  y1={rangeMin}
                  y2={rangeMax}
                  fill="#bbf7d0"
                  fillOpacity={0.35}
                  stroke="#86efac"
                  strokeOpacity={0.5}
                  label={{
                    value: "Normal range",
                    position: "insideTopLeft",
                    fontSize: 11,
                    fill: "#16a34a",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <Activity className="h-8 w-8 mr-2" />
              No data recorded yet.
            </div>
          )}
        </Card>

        {/* Last 7 entries table */}
        <Card className="p-6 border-blue-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Last 7 Entries</h2>
          {recentEntries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEntries.map(({ date, value }) => {
                  const inRange = value >= rangeMin && value <= rangeMax;
                  return (
                    <TableRow key={date}>
                      <TableCell className="text-gray-700">{formatDate(date)}</TableCell>
                      <TableCell className="font-medium">
                        {value} {metric.unit}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            inRange
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }
                        >
                          {inRange ? "Normal" : "Out of range"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-gray-400">No entries recorded yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
