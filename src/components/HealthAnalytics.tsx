import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Weight, 
  Droplets,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Calendar,
  Download,
  Share2
} from "lucide-react";

const HealthAnalytics = () => {
  // Sample health data
  const vitalSigns = [
    { date: '2024-01-01', systolic: 120, diastolic: 80, heartRate: 72, temperature: 98.6, weight: 150 },
    { date: '2024-01-07', systolic: 118, diastolic: 78, heartRate: 75, temperature: 98.4, weight: 149 },
    { date: '2024-01-14', systolic: 122, diastolic: 82, heartRate: 70, temperature: 98.7, weight: 148 },
    { date: '2024-01-21', systolic: 116, diastolic: 76, heartRate: 68, temperature: 98.5, weight: 147 },
    { date: '2024-01-28', systolic: 119, diastolic: 79, heartRate: 73, temperature: 98.3, weight: 146 },
  ];

  const healthScores = [
    { category: 'Cardiovascular', score: 85, color: '#ef4444' },
    { category: 'Respiratory', score: 92, color: '#3b82f6' },
    { category: 'Metabolic', score: 78, color: '#10b981' },
    { category: 'Mental Health', score: 88, color: '#f59e0b' },
    { category: 'Sleep Quality', score: 75, color: '#8b5cf6' },
    { category: 'Nutrition', score: 82, color: '#06b6d4' },
  ];

  const medicationAdherence = [
    { name: 'Taken', value: 85, color: '#10b981' },
    { name: 'Missed', value: 10, color: '#ef4444' },
    { name: 'Delayed', value: 5, color: '#f59e0b' },
  ];

  const appointmentStats = [
    { month: 'Oct', completed: 4, missed: 1, scheduled: 2 },
    { month: 'Nov', completed: 6, missed: 0, scheduled: 3 },
    { month: 'Dec', completed: 3, missed: 2, scheduled: 1 },
    { month: 'Jan', completed: 5, missed: 1, scheduled: 4 },
  ];

  const getCurrentTrend = (data: any[], key: string) => {
    if (data.length < 2) return 'stable';
    const latest = data[data.length - 1][key];
    const previous = data[data.length - 2][key];
    return latest > previous ? 'up' : latest < previous ? 'down' : 'stable';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive overview of your health metrics and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share with Provider
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Blood Pressure</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">119/79</p>
                <p className="text-sm text-gray-600">mmHg</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(getCurrentTrend(vitalSigns, 'systolic'))}
                <Badge className="bg-green-100 text-green-700 border-green-200">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Heart Rate</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">73</p>
                <p className="text-sm text-gray-600">bpm</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(getCurrentTrend(vitalSigns, 'heartRate'))}
                <Badge className="bg-green-100 text-green-700 border-green-200">Good</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">98.3°F</p>
                <p className="text-sm text-gray-600">Normal</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(getCurrentTrend(vitalSigns, 'temperature'))}
                <Badge className="bg-green-100 text-green-700 border-green-200">Stable</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Weight</CardTitle>
              <Weight className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">146</p>
                <p className="text-sm text-gray-600">lbs</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(getCurrentTrend(vitalSigns, 'weight'))}
                <Badge className="bg-green-100 text-green-700 border-green-200">Trending Down</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="health-scores">Health Scores</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Blood Pressure Trends
                </CardTitle>
                <CardDescription>Systolic and diastolic readings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalSigns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Heart Rate & Weight
                </CardTitle>
                <CardDescription>Heart rate and weight tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalSigns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#10b981" strokeWidth={2} name="Heart Rate (bpm)" />
                    <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={2} name="Weight (lbs)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health-scores" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Health Score Overview
                </CardTitle>
                <CardDescription>Your overall health assessment across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={healthScores}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name="Health Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>Detailed Health Scores</CardTitle>
                <CardDescription>Individual category breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthScores.map((score, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{score.category}</span>
                      <span className="text-sm font-bold text-gray-900">{score.score}%</span>
                    </div>
                    <Progress value={score.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Medication Adherence
                </CardTitle>
                <CardDescription>How well you're following your medication schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={medicationAdherence}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {medicationAdherence.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>Medication Alerts</CardTitle>
                <CardDescription>Important medication reminders and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Prescription Refill Due</p>
                    <p className="text-xs text-yellow-700">Hydrocortisone cream expires in 3 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Good Adherence</p>
                    <p className="text-xs text-green-700">You've taken 85% of medications on time this month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Upcoming Dose</p>
                    <p className="text-xs text-blue-700">Next medication reminder in 2 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Appointment Statistics
              </CardTitle>
              <CardDescription>Your appointment history and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                  <Bar dataKey="scheduled" fill="#3b82f6" name="Scheduled" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthAnalytics;