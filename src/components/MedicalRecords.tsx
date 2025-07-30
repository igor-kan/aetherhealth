import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  Pill, 
  TestTube,
  Download,
  Share2,
  Plus,
  Filter,
  Search,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  FileImage,
  Activity
} from "lucide-react";

const MedicalRecords = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("timeline");

  // Sample medical records data
  const medicalRecords = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:30 AM",
      type: "Consultation",
      provider: "Dr. Sarah Chen",
      specialty: "Dermatology",
      diagnosis: "Mild eczema",
      treatment: "Hydrocortisone cream 1%",
      status: "completed",
      priority: "low",
      notes: "Patient reports improvement in skin condition. Continue current treatment for 2 more weeks.",
      prescriptions: [
        { name: "Hydrocortisone cream 1%", dosage: "Apply twice daily", duration: "2 weeks" }
      ],
      labResults: [],
      attachments: ["dermatology_photos.jpg", "treatment_plan.pdf"]
    },
    {
      id: 2,
      date: "2024-01-10",
      time: "2:15 PM",
      type: "Mental Health Assessment",
      provider: "Dr. Michael Rodriguez",
      specialty: "Psychiatry",
      diagnosis: "Mild anxiety disorder",
      treatment: "Therapy referral, lifestyle modifications",
      status: "completed",
      priority: "medium",
      notes: "Patient experiencing work-related stress. Recommended cognitive behavioral therapy and stress management techniques.",
      prescriptions: [],
      labResults: [],
      attachments: ["mental_health_assessment.pdf"]
    },
    {
      id: 3,
      date: "2024-01-05",
      time: "9:00 AM",
      type: "Lab Results",
      provider: "AetherHealth Lab",
      specialty: "Laboratory",
      diagnosis: "Normal blood work",
      treatment: "No action required",
      status: "completed",
      priority: "low",
      notes: "All values within normal range. Continue current lifestyle.",
      prescriptions: [],
      labResults: [
        { test: "Complete Blood Count", result: "Normal", reference: "4.5-11.0 K/μL" },
        { test: "Cholesterol", result: "185 mg/dL", reference: "<200 mg/dL" },
        { test: "Blood Glucose", result: "92 mg/dL", reference: "70-100 mg/dL" }
      ],
      attachments: ["lab_results_jan2024.pdf"]
    },
    {
      id: 4,
      date: "2023-12-20",
      time: "11:45 AM",
      type: "Physical Examination",
      provider: "Dr. Emily Johnson",
      specialty: "Internal Medicine",
      diagnosis: "Annual physical - healthy",
      treatment: "Continue current lifestyle",
      status: "completed",
      priority: "low",
      notes: "Patient in good health. Blood pressure slightly elevated, monitor closely.",
      prescriptions: [],
      labResults: [],
      attachments: ["physical_exam_summary.pdf"]
    },
    {
      id: 5,
      date: "2023-12-15",
      time: "3:30 PM",
      type: "Vaccination",
      provider: "AetherHealth Clinic",
      specialty: "Preventive Care",
      diagnosis: "Flu vaccination",
      treatment: "Influenza vaccine administered",
      status: "completed",
      priority: "low",
      notes: "No adverse reactions. Patient advised to monitor for side effects.",
      prescriptions: [],
      labResults: [],
      attachments: ["vaccination_record.pdf"]
    }
  ];

  const medicalHistory = [
    {
      condition: "Seasonal Allergies",
      diagnosed: "2020",
      status: "Ongoing",
      severity: "Mild",
      treatment: "Antihistamines as needed"
    },
    {
      condition: "Hypertension",
      diagnosed: "2019",
      status: "Controlled",
      severity: "Mild",
      treatment: "Lifestyle modifications"
    }
  ];

  const allergies = [
    { allergen: "Penicillin", reaction: "Rash", severity: "Moderate" },
    { allergen: "Shellfish", reaction: "Hives", severity: "Mild" }
  ];

  const familyHistory = [
    { relation: "Father", conditions: ["Diabetes Type 2", "Heart Disease"] },
    { relation: "Mother", conditions: ["Osteoporosis", "Thyroid Disease"] },
    { relation: "Maternal Grandmother", conditions: ["Breast Cancer"] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Consultation": return <Stethoscope className="h-4 w-4" />;
      case "Mental Health Assessment": return <Activity className="h-4 w-4" />;
      case "Lab Results": return <TestTube className="h-4 w-4" />;
      case "Physical Examination": return <User className="h-4 w-4" />;
      case "Vaccination": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-gray-600">Complete timeline of your healthcare journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="family">Family History</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Medical Records Timeline
              </CardTitle>
              <CardDescription>
                Chronological view of all your medical encounters and treatments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                
                <div className="space-y-6">
                  {medicalRecords.map((record, index) => (
                    <div key={record.id} className="relative flex items-start gap-4">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                        {getTypeIcon(record.type)}
                      </div>
                      
                      {/* Record content */}
                      <div className="flex-1 min-w-0">
                        <Card className="border-gray-200 hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900">{record.type}</h3>
                                  <Badge className={getStatusColor(record.status)}>
                                    {record.status}
                                  </Badge>
                                  <Badge className={getPriorityColor(record.priority)}>
                                    {record.priority}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {record.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {record.time}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {record.provider}
                                  </span>
                                </div>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(record)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      {getTypeIcon(record.type)}
                                      {record.type} - {record.date}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Detailed medical record information
                                    </DialogDescription>
                                  </DialogHeader>
                                  <ScrollArea className="max-h-96 pr-4">
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-gray-700">Provider</p>
                                          <p className="text-sm text-gray-900">{record.provider}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-gray-700">Specialty</p>
                                          <p className="text-sm text-gray-900">{record.specialty}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-gray-700">Diagnosis</p>
                                          <p className="text-sm text-gray-900">{record.diagnosis}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-gray-700">Treatment</p>
                                          <p className="text-sm text-gray-900">{record.treatment}</p>
                                        </div>
                                      </div>
                                      
                                      <Separator />
                                      
                                      <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                                        <p className="text-sm text-gray-900">{record.notes}</p>
                                      </div>
                                      
                                      {record.prescriptions.length > 0 && (
                                        <>
                                          <Separator />
                                          <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Prescriptions</p>
                                            {record.prescriptions.map((prescription, idx) => (
                                              <div key={idx} className="p-2 bg-blue-50 rounded-md">
                                                <p className="text-sm font-medium text-blue-900">{prescription.name}</p>
                                                <p className="text-xs text-blue-700">{prescription.dosage} - {prescription.duration}</p>
                                              </div>
                                            ))}
                                          </div>
                                        </>
                                      )}
                                      
                                      {record.labResults.length > 0 && (
                                        <>
                                          <Separator />
                                          <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Lab Results</p>
                                            {record.labResults.map((result, idx) => (
                                              <div key={idx} className="p-2 bg-green-50 rounded-md">
                                                <p className="text-sm font-medium text-green-900">{result.test}</p>
                                                <p className="text-xs text-green-700">{result.result} (Reference: {result.reference})</p>
                                              </div>
                                            ))}
                                          </div>
                                        </>
                                      )}
                                      
                                      {record.attachments.length > 0 && (
                                        <>
                                          <Separator />
                                          <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
                                            <div className="flex flex-wrap gap-2">
                                              {record.attachments.map((attachment, idx) => (
                                                <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-gray-50">
                                                  <FileImage className="h-3 w-3 mr-1" />
                                                  {attachment}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm text-gray-600">Diagnosis</p>
                                <p className="text-sm font-medium text-gray-900">{record.diagnosis}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Treatment</p>
                                <p className="text-sm font-medium text-gray-900">{record.treatment}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {record.specialty}
                                </Badge>
                                {record.attachments.length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {record.attachments.length} attachment{record.attachments.length > 1 ? 's' : ''}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Medical History
              </CardTitle>
              <CardDescription>
                Ongoing and past medical conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.map((condition, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{condition.condition}</h3>
                        <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosed}</p>
                        <p className="text-sm text-gray-600">Treatment: {condition.treatment}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={condition.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                          {condition.status}
                        </Badge>
                        <Badge variant="outline">
                          {condition.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Allergies & Adverse Reactions
              </CardTitle>
              <CardDescription>
                Known allergies and adverse drug reactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allergies.map((allergy, index) => (
                  <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-red-900">{allergy.allergen}</h3>
                        <p className="text-sm text-red-700">Reaction: {allergy.reaction}</p>
                      </div>
                      <Badge className={`${allergy.severity === 'Severe' ? 'bg-red-600' : allergy.severity === 'Moderate' ? 'bg-orange-400' : 'bg-yellow-400'} text-white`}>
                        {allergy.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Family Medical History
              </CardTitle>
              <CardDescription>
                Medical conditions in your family that may affect your health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {familyHistory.map((family, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{family.relation}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {family.conditions.map((condition, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
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

export default MedicalRecords;