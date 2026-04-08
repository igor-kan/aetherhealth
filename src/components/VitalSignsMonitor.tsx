import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Weight, 
  Ruler,
  Droplets,
  Gauge,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Plus,
  Edit,
  Calendar,
  Clock,
  Target,
  Zap,
  Wind,
  Eye,
  Brain,
  Smartphone,
  Watch
} from "lucide-react";

const VitalSignsMonitor = () => {
  const [isAddingVital, setIsAddingVital] = useState(false);
  const [selectedVital, setSelectedVital] = useState("blood-pressure");

  // Sample vital signs data
  const currentVitals = [
    {
      id: 1,
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      icon: <Heart className="h-5 w-5" />,
      color: "#ef4444",
      lastUpdated: "2 hours ago",
      trend: "stable",
      target: "< 140/90"
    },
    {
      id: 2,
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      icon: <Activity className="h-5 w-5" />,
      color: "#10b981",
      lastUpdated: "1 hour ago",
      trend: "down",
      target: "60-100"
    },
    {
      id: 3,
      name: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "normal",
      icon: <Thermometer className="h-5 w-5" />,
      color: "#f59e0b",
      lastUpdated: "3 hours ago",
      trend: "stable",
      target: "97.8-99.1"
    },
    {
      id: 4,
      name: "Weight",
      value: "146",
      unit: "lbs",
      status: "normal",
      icon: <Weight className="h-5 w-5" />,
      color: "#8b5cf6",
      lastUpdated: "1 day ago",
      trend: "down",
      target: "140-160"
    },
    {
      id: 5,
      name: "Blood Oxygen",
      value: "98",
      unit: "%",
      status: "normal",
      icon: <Wind className="h-5 w-5" />,
      color: "#06b6d4",
      lastUpdated: "30 minutes ago",
      trend: "stable",
      target: "> 95"
    },
    {
      id: 6,
      name: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "normal",
      icon: <Droplets className="h-5 w-5" />,
      color: "#ec4899",
      lastUpdated: "4 hours ago",
      trend: "stable",
      target: "70-140"
    }
  ];

  const vitalHistory = [
    { date: '2024-01-15', bloodPressure: 120, heartRate: 72, temperature: 98.6, weight: 146, oxygen: 98, glucose: 95 },
    { date: '2024-01-14', bloodPressure: 118, heartRate: 75, temperature: 98.4, weight: 146, oxygen: 97, glucose: 92 },
    { date: '2024-01-13', bloodPressure: 122, heartRate: 70, temperature: 98.7, weight: 147, oxygen: 99, glucose: 88 },
    { date: '2024-01-12', bloodPressure: 125, heartRate: 73, temperature: 98.5, weight: 147, oxygen: 98, glucose: 91 },
    { date: '2024-01-11', bloodPressure: 121, heartRate: 71, temperature: 98.3, weight: 148, oxygen: 97, glucose: 94 },
    { date: '2024-01-10', bloodPressure: 119, heartRate: 74, temperature: 98.8, weight: 148, oxygen: 98, glucose: 89 },
    { date: '2024-01-09', bloodPressure: 123, heartRate: 69, temperature: 98.2, weight: 149, oxygen: 99, glucose: 96 }
  ];

  const healthGoals = [
    { name: "Weight Loss", target: 140, current: 146, unit: "lbs", progress: 60 },
    { name: "Blood Pressure", target: 115, current: 120, unit: "mmHg", progress: 75 },
    { name: "Daily Steps", target: 10000, current: 7500, unit: "steps", progress: 75 },
    { name: "Sleep Duration", target: 8, current: 6.5, unit: "hours", progress: 81 }
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "Morning", nextDose: "Tomorrow 8:00 AM" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "Morning & Evening", nextDose: "Today 6:00 PM" },
    { name: "Multivitamin", dosage: "1 tablet", frequency: "Once daily", time: "Morning", nextDose: "Tomorrow 8:00 AM" }
  ];

  const deviceData = [
    { name: "Apple Watch", type: "Smartwatch", connected: true, lastSync: "5 minutes ago", battery: 85 },
    { name: "Omron Blood Pressure Monitor", type: "Blood Pressure", connected: true, lastSync: "2 hours ago", battery: 90 },
    { name: "Withings Scale", type: "Smart Scale", connected: false, lastSync: "2 days ago", battery: 0 },
    { name: "Glucose Meter", type: "Blood Sugar", connected: true, lastSync: "4 hours ago", battery: 65 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-700 border-green-200";
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "low": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vital Signs Monitor</h2>
          <p className="text-gray-600">Track and monitor your health metrics in real-time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Smartphone className="h-4 w-4 mr-2" />
            Sync Devices
          </Button>
          <Dialog open={isAddingVital} onOpenChange={setIsAddingVital}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Reading
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vital Sign Reading</DialogTitle>
                <DialogDescription>
                  Record a new measurement for tracking your health
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vital-type">Vital Sign Type</Label>
                  <select
                    id="vital-type"
                    className="w-full p-2 border rounded-md"
                    value={selectedVital}
                    onChange={(e) => setSelectedVital(e.target.value)}
                  >
                    <option value="blood-pressure">Blood Pressure</option>
                    <option value="heart-rate">Heart Rate</option>
                    <option value="temperature">Temperature</option>
                    <option value="weight">Weight</option>
                    <option value="oxygen">Blood Oxygen</option>
                    <option value="glucose">Blood Sugar</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" placeholder="Enter measurement value" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" placeholder="Any additional notes..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingVital(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Reading
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentVitals.map((vital) => (
          <Card key={vital.id} className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-100">
                    {vital.icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-700">{vital.name}</CardTitle>
                    <p className="text-xs text-gray-500">Updated {vital.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(vital.trend)}
                  <Badge className={getStatusColor(vital.status)}>
                    {vital.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                  <span className="text-sm text-gray-600">{vital.unit}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Target: {vital.target}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Blood Pressure Trends
                </CardTitle>
                <CardDescription>7-day blood pressure monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[110, 130]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bloodPressure" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Heart Rate & Weight
                </CardTitle>
                <CardDescription>Combined heart rate and weight tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" domain={[65, 80]} />
                    <YAxis yAxisId="right" orientation="right" domain={[145, 150]} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#10b981" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  Temperature & Oxygen
                </CardTitle>
                <CardDescription>Body temperature and oxygen saturation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={vitalHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" domain={[98, 99]} />
                    <YAxis yAxisId="right" orientation="right" domain={[96, 100]} />
                    <Tooltip />
                    <Area yAxisId="left" type="monotone" dataKey="temperature" stroke="#f59e0b" fill="#fef3c7" />
                    <Area yAxisId="right" type="monotone" dataKey="oxygen" stroke="#06b6d4" fill="#cffafe" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-pink-500" />
                  Blood Sugar Levels
                </CardTitle>
                <CardDescription>Weekly glucose monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="glucose" stroke="#ec4899" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Health Goals Progress
              </CardTitle>
              <CardDescription>Track your progress towards health objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {healthGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{goal.name}</h3>
                      <span className="text-sm text-gray-600">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={goal.progress} className="flex-1" />
                      <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Medication Schedule
              </CardTitle>
              <CardDescription>Your current medications and dosing schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((medication, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                        <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {medication.time}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Next dose: {medication.nextDose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Watch className="h-5 w-5 text-blue-500" />
                Connected Devices
              </CardTitle>
              <CardDescription>Manage your health monitoring devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Smartphone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{device.name}</h3>
                          <p className="text-sm text-gray-600">{device.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={device.connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {device.connected ? "Connected" : "Disconnected"}
                        </Badge>
                        {device.battery > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {device.battery}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last sync: {device.lastSync}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Zap className="h-3 w-3 mr-1" />
                          Sync
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Good news!</strong> Your blood pressure has been consistently in the normal range for the past week.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Reminder:</strong> Your next medication dose (Metformin) is due in 2 hours.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Device Alert:</strong> Your Withings Scale hasn't synced in 2 days. Please check the connection.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VitalSignsMonitor;