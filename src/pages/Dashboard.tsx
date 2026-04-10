import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain, Calendar, FileText, Pill, Clock, ArrowLeft, Download,
  Activity, BarChart3, Stethoscope, Heart, User, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import HealthAnalytics from "@/components/HealthAnalytics";
import MedicalRecords from "@/components/MedicalRecords";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import VitalSignsMonitor from "@/components/VitalSignsMonitor";
import { type IntakeData } from "@/components/PatientIntakeForm";

const CONSULTATION_STORAGE_KEY = "aetherhealth_consultations";
const INTAKE_STORAGE_KEY = "aetherhealth_intake";
const APPOINTMENT_STORAGE_KEY = "aetherhealth_appointments";

interface StoredConsultation {
  id: number;
  date: string;
  time: string;
  type: string;
  status: string;
  urgency?: string;
  diagnosis: string;
  prescription: string;
  notes?: string;
}

interface StoredAppointment {
  id: number;
  date: string;
  time: string;
  type: string;
  provider: string;
}

const Dashboard = () => {
  const [consultations, setConsultations] = useState<StoredConsultation[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<StoredAppointment[]>([]);
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);

  useEffect(() => {
    // Load consultations from localStorage, fall back to sample data
    try {
      const stored = localStorage.getItem(CONSULTATION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredConsultation[];
        setConsultations(parsed.length > 0 ? parsed : getSampleConsultations());
      } else {
        setConsultations(getSampleConsultations());
      }
    } catch {
      setConsultations(getSampleConsultations());
    }

    // Load appointments
    try {
      const stored = localStorage.getItem(APPOINTMENT_STORAGE_KEY);
      if (stored) {
        const all = JSON.parse(stored) as StoredAppointment[];
        const today = new Date().toISOString().split("T")[0];
        setUpcomingAppointments(all.filter((a) => a.date >= today).slice(0, 3));
      } else {
        setUpcomingAppointments(getSampleAppointments());
      }
    } catch {
      setUpcomingAppointments(getSampleAppointments());
    }

    // Load intake / patient profile
    try {
      const stored = localStorage.getItem(INTAKE_STORAGE_KEY);
      if (stored) setIntakeData(JSON.parse(stored) as IntakeData);
    } catch {
      // no profile yet
    }
  }, []);

  const urgencyBadgeClass = (urgency?: string) => {
    switch (urgency) {
      case "emergency": return "bg-red-100 text-red-700 border-red-200";
      case "urgent": return "bg-orange-100 text-orange-700 border-orange-200";
      case "routine": return "bg-blue-100 text-blue-700 border-blue-200";
      case "self-care": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-green-100 text-green-700 border-green-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {intakeData ? `${intakeData.firstName}'s Dashboard` : "Patient Dashboard"}
                  </h1>
                  <p className="text-sm text-blue-600">Your Health Records</p>
                </div>
              </div>
            </div>
            <Link to="/consultation">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                New Consultation
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Consultations */}
                <Card className="p-6 border-blue-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Consultations</h2>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {consultations.length} Record{consultations.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {consultations.slice(0, 3).map((consultation) => (
                      <Card key={consultation.id} className="p-4 border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{consultation.type}</h3>
                            <p className="text-sm text-gray-600">
                              {consultation.date} at {consultation.time}
                            </p>
                          </div>
                          <Badge className={urgencyBadgeClass(consultation.urgency)}>
                            {consultation.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                            <p className="text-sm font-medium text-gray-900">{consultation.diagnosis}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Treatment / Next Step</p>
                            <p className="text-sm font-medium text-gray-900">{consultation.prescription}</p>
                          </div>
                        </div>
                        {consultation.notes && (
                          <p className="text-xs text-gray-500 italic mb-3 line-clamp-2">{consultation.notes}</p>
                        )}

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            <FileText className="h-3 w-3 mr-1" />
                            View Notes
                          </Button>
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}

                    {consultations.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Stethoscope className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                        <p>No consultations yet.</p>
                        <Link to="/consultation">
                          <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                            Start Your First Consultation
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Active Prescriptions */}
                <Card className="p-6 border-blue-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Prescriptions</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-full">
                          <Pill className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Hydrocortisone Cream 1%</h3>
                          <p className="text-sm text-gray-600">Apply twice daily — 3 refills remaining</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-100">
                        Refill
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Patient Profile */}
                <Card className="p-6 border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    Patient Profile
                  </h3>
                  {intakeData ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium text-gray-900">
                          {intakeData.firstName} {intakeData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Age</span>
                        <span className="font-medium text-gray-900">{intakeData.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sex</span>
                        <span className="font-medium text-gray-900 capitalize">{intakeData.sex}</span>
                      </div>
                      {intakeData.chiefComplaint && (
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-500 mb-1">Chief Complaint</p>
                          <p className="text-gray-900 text-xs leading-relaxed">{intakeData.chiefComplaint}</p>
                        </div>
                      )}
                      {intakeData.symptoms.length > 0 && (
                        <div className="pt-2">
                          <p className="text-gray-500 mb-1.5">Reported Symptoms</p>
                          <div className="flex flex-wrap gap-1">
                            {intakeData.symptoms.map((s) => (
                              <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="pt-2">
                        <Link to="/consultation">
                          <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 text-xs">
                            Update Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 mb-3">Complete your intake to personalize your care.</p>
                      <Link to="/consultation">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                          Complete Intake
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/consultation">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <Brain className="h-4 w-4 mr-2" />
                        Start New Consultation
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Follow-up
                    </Button>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                      <FileText className="h-4 w-4 mr-2" />
                      View All Records
                    </Button>
                  </div>
                </Card>

                {/* Upcoming Appointments */}
                <Card className="p-6 border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-gray-900">{appointment.type}</span>
                          </div>
                          <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                          <p className="text-sm text-gray-600">with {appointment.provider}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No upcoming appointments. Book one in the Appointments tab.</p>
                  )}
                </Card>

                {/* Health Stats */}
                <Card className="p-6 border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Health Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Consultations</span>
                      <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                        {consultations.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Prescriptions</span>
                      <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">1</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Upcoming Appointments</span>
                      <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">
                        {upcomingAppointments.length}
                      </Badge>
                    </div>
                    {consultations.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Visit</span>
                        <span className="text-sm font-medium text-gray-900">
                          {consultations[0]?.date ?? "—"}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vitals">
            <VitalSignsMonitor />
          </TabsContent>

          <TabsContent value="records">
            <MedicalRecords />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentScheduler />
          </TabsContent>

          <TabsContent value="analytics">
            <HealthAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Fallback sample data used when localStorage is empty
function getSampleConsultations(): StoredConsultation[] {
  return [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30 AM",
      type: "Dermatology",
      status: "completed",
      urgency: "routine",
      diagnosis: "Mild eczema",
      prescription: "Hydrocortisone cream 1%",
      notes: "Patient reports improvement in skin condition. Continue current treatment for 2 more weeks.",
    },
    {
      id: 2,
      date: "2024-01-10",
      time: "2:15 PM",
      type: "Mental Health",
      status: "completed",
      urgency: "routine",
      diagnosis: "Mild anxiety",
      prescription: "Therapy referral",
      notes: "Patient experiencing work-related stress.",
    },
  ];
}

function getSampleAppointments(): StoredAppointment[] {
  return [
    {
      id: 1,
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "3:00 PM",
      type: "Follow-up",
      provider: "Dr. Sarah Chen",
    },
  ];
}

export default Dashboard;
