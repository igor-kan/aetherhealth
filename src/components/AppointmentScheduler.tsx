import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  Video, 
  MapPin,
  Phone,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Bell,
  Mail,
  MessageCircle,
  CreditCard,
  FileText,
  Users,
  Activity
} from "lucide-react";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  // Sample data
  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Dermatology",
      rating: 4.9,
      experience: "15 years",
      avatar: "/api/placeholder/100/100",
      nextAvailable: "Today at 2:00 PM",
      consultationFee: "$150",
      languages: ["English", "Mandarin"],
      location: "AetherHealth Downtown",
      videoConsultation: true,
      availability: {
        "2024-01-18": ["09:00", "10:30", "14:00", "15:30"],
        "2024-01-19": ["09:00", "11:00", "16:00"],
        "2024-01-20": ["10:00", "14:30", "16:30"]
      }
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Psychiatry",
      rating: 4.8,
      experience: "12 years",
      avatar: "/api/placeholder/100/100",
      nextAvailable: "Tomorrow at 10:00 AM",
      consultationFee: "$200",
      languages: ["English", "Spanish"],
      location: "AetherHealth Mental Health Center",
      videoConsultation: true,
      availability: {
        "2024-01-18": ["10:00", "11:30", "15:00"],
        "2024-01-19": ["09:30", "14:00", "16:30"],
        "2024-01-20": ["10:30", "13:00", "15:00"]
      }
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Internal Medicine",
      rating: 4.7,
      experience: "18 years",
      avatar: "/api/placeholder/100/100",
      nextAvailable: "Jan 20 at 9:00 AM",
      consultationFee: "$180",
      languages: ["English"],
      location: "AetherHealth Main Campus",
      videoConsultation: false,
      availability: {
        "2024-01-20": ["09:00", "11:00", "14:00", "16:00"],
        "2024-01-21": ["09:30", "13:30", "15:30"],
        "2024-01-22": ["10:00", "14:00", "16:30"]
      }
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-01-20",
      time: "15:00",
      provider: "Dr. Sarah Chen",
      specialty: "Dermatology",
      type: "Follow-up",
      location: "AetherHealth Downtown",
      status: "confirmed",
      isVirtual: false
    },
    {
      id: 2,
      date: "2024-01-25",
      time: "10:30",
      provider: "Dr. Michael Rodriguez",
      specialty: "Psychiatry",
      type: "Consultation",
      location: "Video Call",
      status: "pending",
      isVirtual: true
    }
  ];

  const appointmentHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30",
      provider: "Dr. Sarah Chen",
      specialty: "Dermatology",
      type: "Consultation",
      status: "completed",
      rating: 5,
      notes: "Prescribed hydrocortisone cream for eczema"
    },
    {
      id: 2,
      date: "2024-01-10",
      time: "14:15",
      provider: "Dr. Michael Rodriguez",
      specialty: "Psychiatry",
      type: "Assessment",
      status: "completed",
      rating: 4,
      notes: "Discussed work-related stress management"
    }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      case "completed": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleBookAppointment = () => {
    // Here you would implement the booking logic
    console.log("Booking appointment:", {
      date: selectedDate,
      provider: selectedProvider,
      time: selectedTime,
      type: appointmentType,
      reason: appointmentReason
    });
    setIsBookingDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Scheduler</h2>
          <p className="text-gray-600">Book and manage your healthcare appointments</p>
        </div>
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>
                Schedule your healthcare appointment with one of our providers
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="provider">Select Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={provider.name}>
                          {provider.name} - {provider.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select value={appointmentType} onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                      <SelectItem value="urgent-care">Urgent Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
              
              {selectedDate && (
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe your symptoms or reason for the appointment..."
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBookAppointment} className="bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  Calendar View
                </CardTitle>
                <CardDescription>
                  Select a date to view available appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>
                  {selectedDate ? `Available appointments for ${selectedDate.toDateString()}` : "Select a date to view time slots"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-3">
                    {providers.map((provider) => (
                      <div key={provider.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{provider.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {provider.specialty}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.slice(0, 3).map((time) => (
                            <Button
                              key={time}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2" />
                    <p>Please select a date to view available time slots</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <Card key={provider.id} className="border-blue-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Experience</p>
                      <p className="font-medium">{provider.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fee</p>
                      <p className="font-medium">{provider.consultationFee}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Next: {provider.nextAvailable}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {provider.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {provider.videoConsultation && (
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Book with {provider.name.split(' ')[1]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                Your scheduled appointments and important reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {appointment.isVirtual ? (
                            <Video className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.provider}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.isVirtual ? (
                          <Video className="h-4 w-4 text-gray-500" />
                        ) : (
                          <MapPin className="h-4 w-4 text-gray-500" />
                        )}
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      {appointment.isVirtual && (
                        <Button variant="outline" size="sm">
                          <Video className="h-3 w-3 mr-1" />
                          Join Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <XCircle className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Appointment History
              </CardTitle>
              <CardDescription>
                Your past appointments and visit summaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointmentHistory.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.provider}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{appointment.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{appointment.notes}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        View Summary
                      </Button>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        Book Follow-up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScheduler;