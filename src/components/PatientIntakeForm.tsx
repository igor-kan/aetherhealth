import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, ClipboardList, AlertTriangle, Activity } from "lucide-react";

export interface IntakeData {
  firstName: string;
  lastName: string;
  age: string;
  sex: string;
  chiefComplaint: string;
  symptoms: string[];
  symptomDuration: string;
  severityScore: number;
  additionalNotes: string;
  completedAt: string;
}

const SYMPTOM_LIST = [
  "Fever", "Chills", "Cough", "Shortness of breath",
  "Chest pain", "Headache", "Nausea", "Vomiting",
  "Diarrhea", "Abdominal pain", "Fatigue", "Dizziness",
  "Rash", "Swelling", "Back pain", "Joint pain",
  "Muscle aches", "Sore throat", "Runny nose", "Loss of appetite",
];

const STORAGE_KEY = "aetherhealth_intake";

interface PatientIntakeFormProps {
  onComplete: (data: IntakeData) => void;
  onSkip?: () => void;
}

const PatientIntakeForm = ({ onComplete, onSkip }: PatientIntakeFormProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<IntakeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as IntakeData;
        setSaved(true);
        return parsed;
      }
    } catch {
      // ignore parse errors
    }
    return {
      firstName: "",
      lastName: "",
      age: "",
      sex: "",
      chiefComplaint: "",
      symptoms: [],
      symptomDuration: "",
      severityScore: 3,
      additionalNotes: "",
      completedAt: "",
    };
  });

  const update = (field: keyof IntakeData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSymptom = (symptom: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: checked
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter((s) => s !== symptom),
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      const completed: IntakeData = { ...formData, completedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      setSaved(true);
      onComplete(completed);
    }
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.firstName.trim() !== "" && formData.age.trim() !== "" && formData.sex !== "";
      case 2: return formData.chiefComplaint.trim() !== "";
      case 3: return formData.symptoms.length > 0 && formData.symptomDuration !== "";
      case 4: return true;
      default: return true;
    }
  };

  const stepIcons = [User, ClipboardList, Activity, AlertTriangle];
  const stepTitles = [
    "Personal Information",
    "Chief Complaint",
    "Symptoms",
    "Severity & Notes",
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900">Patient Intake Form</h2>
          {onSkip && (
            <Button variant="ghost" size="sm" onClick={onSkip} className="text-gray-500">
              Skip for now
            </Button>
          )}
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-gray-500">
          {stepTitles.map((title, i) => (
            <span
              key={title}
              className={`hidden sm:inline ${i + 1 === step ? "text-blue-600 font-medium" : i + 1 < step ? "text-green-600" : ""}`}
            >
              {i + 1 < step ? "✓ " : ""}{title}
            </span>
          ))}
          <span className="sm:hidden text-blue-600 font-medium">
            Step {step} of {totalSteps}: {stepTitles[step - 1]}
          </span>
        </div>
      </div>

      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            {(() => {
              const Icon = stepIcons[step - 1];
              return <Icon className="h-5 w-5 text-blue-600" />;
            })()}
            {stepTitles[step - 1]}
          </CardTitle>
          {step === 1 && (
            <CardDescription>Basic information to personalize your care</CardDescription>
          )}
          {step === 2 && (
            <CardDescription>What is the main reason for your visit today?</CardDescription>
          )}
          {step === 3 && (
            <CardDescription>Select all symptoms you are currently experiencing</CardDescription>
          )}
          {step === 4 && (
            <CardDescription>Help us understand the severity of your condition</CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Step 1: Demographics */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="Jane"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Doe"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="35"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Biological Sex *</Label>
                  <RadioGroup
                    value={formData.sex}
                    onValueChange={(v) => update("sex", v)}
                    className="flex gap-4 pt-1"
                  >
                    {["Male", "Female", "Other"].map((s) => (
                      <div key={s} className="flex items-center gap-1.5">
                        <RadioGroupItem value={s.toLowerCase()} id={`sex-${s}`} />
                        <Label htmlFor={`sex-${s}`} className="cursor-pointer font-normal">{s}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Chief Complaint */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                <Textarea
                  id="chiefComplaint"
                  value={formData.chiefComplaint}
                  onChange={(e) => update("chiefComplaint", e.target.value)}
                  placeholder="Describe the main reason you are seeking care today (e.g., 'I have had a persistent cough and low-grade fever for 3 days')"
                  className="min-h-[120px] border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-700">
                Be as specific as possible. Include when symptoms started and what makes them better or worse.
              </div>
            </div>
          )}

          {/* Step 3: Symptom Checklist */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SYMPTOM_LIST.map((symptom) => (
                  <div
                    key={symptom}
                    className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${
                      formData.symptoms.includes(symptom)
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => toggleSymptom(symptom, !formData.symptoms.includes(symptom))}
                  >
                    <Checkbox
                      id={`symptom-${symptom}`}
                      checked={formData.symptoms.includes(symptom)}
                      onCheckedChange={(checked) => toggleSymptom(symptom, !!checked)}
                    />
                    <Label htmlFor={`symptom-${symptom}`} className="cursor-pointer text-sm font-normal">
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-sm text-gray-600 mr-1">Selected:</span>
                  {formData.symptoms.map((s) => (
                    <Badge key={s} className="bg-blue-100 text-blue-700 text-xs">{s}</Badge>
                  ))}
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="duration">How long have you had these symptoms? *</Label>
                <RadioGroup
                  value={formData.symptomDuration}
                  onValueChange={(v) => update("symptomDuration", v)}
                  className="grid grid-cols-2 gap-2"
                >
                  {[
                    { value: "today", label: "Started today" },
                    { value: "2-3days", label: "2–3 days" },
                    { value: "1week", label: "About 1 week" },
                    { value: "2weeks", label: "1–2 weeks" },
                    { value: "1month", label: "Weeks to 1 month" },
                    { value: "chronic", label: "Over a month" },
                  ].map(({ value, label }) => (
                    <div
                      key={value}
                      className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer ${
                        formData.symptomDuration === value
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <RadioGroupItem value={value} id={`dur-${value}`} />
                      <Label htmlFor={`dur-${value}`} className="cursor-pointer text-sm font-normal">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 4: Severity & Notes */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-3">
                <Label>Severity (1 = mild, 10 = severe) *</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-8">1</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={formData.severityScore}
                    onChange={(e) => update("severityScore", parseInt(e.target.value))}
                    className="flex-1 accent-blue-600"
                  />
                  <span className="text-sm text-gray-500 w-8 text-right">10</span>
                </div>
                <div className="text-center">
                  <Badge
                    className={`text-lg px-4 py-1 ${
                      formData.severityScore <= 3
                        ? "bg-green-100 text-green-700"
                        : formData.severityScore <= 6
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {formData.severityScore} / 10 —{" "}
                    {formData.severityScore <= 3 ? "Mild" : formData.severityScore <= 6 ? "Moderate" : "Severe"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="additionalNotes">Additional Notes (optional)</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => update("additionalNotes", e.target.value)}
                  placeholder="Any other information you'd like your care provider to know (medications, allergies, recent travel, etc.)"
                  className="min-h-[100px] border-blue-200 focus:border-blue-400"
                />
              </div>
              {formData.severityScore >= 8 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">
                    <strong>High severity reported.</strong> If you are experiencing a medical emergency (chest pain, difficulty breathing, severe bleeding), please call 911 immediately instead of continuing this consultation.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-blue-200 text-blue-700"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {step === totalSteps ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Intake
                </>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {saved && step < totalSteps && (
        <p className="text-xs text-center text-gray-500 mt-3">
          Your information is saved automatically.
        </p>
      )}
    </div>
  );
};

export default PatientIntakeForm;
export { STORAGE_KEY as INTAKE_STORAGE_KEY };
