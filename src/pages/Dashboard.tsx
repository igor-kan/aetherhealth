
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, FileText, Pill, Clock, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const consultations = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30 AM",
      type: "Dermatology",
      status: "completed",
      diagnosis: "Mild eczema",
      prescription: "Hydrocortisone cream 1%"
    },
    {
      id: 2,
      date: "2024-01-10", 
      time: "2:15 PM",
      type: "Mental Health",
      status: "completed",
      diagnosis: "Mild anxiety",
      prescription: "Therapy referral"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-01-20",
      time: "3:00 PM",
      type: "Follow-up",
      provider: "Dr. Sarah Chen"
    }
  ];

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
                  <h1 className="text-lg font-bold text-gray-900">Patient Dashboard</h1>
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Consultations */}
            <Card className="p-6 border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Consultations</h2>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  {consultations.length} Complete
                </Badge>
              </div>

              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <Card key={consultation.id} className="p-4 border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{consultation.type}</h3>
                        <p className="text-sm text-gray-600">
                          {consultation.date} at {consultation.time}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {consultation.status}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                        <p className="text-sm font-medium text-gray-900">{consultation.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Treatment</p>
                        <p className="text-sm font-medium text-gray-900">{consultation.prescription}</p>
                      </div>
                    </div>
                    
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
              </div>
            </Card>

            {/* Prescriptions */}
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
                      <p className="text-sm text-gray-600">Apply twice daily - 3 refills remaining</p>
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
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-900">{appointment.type}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    with {appointment.provider}
                  </p>
                </div>
              ))}
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
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    1
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Visit</span>
                  <span className="text-sm font-medium text-gray-900">5 days ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
