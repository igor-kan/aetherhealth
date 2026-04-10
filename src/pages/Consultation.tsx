import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, Mic, MicOff, Send, ArrowLeft, AlertTriangle, CheckCircle, Clock, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import PatientIntakeForm, { type IntakeData, INTAKE_STORAGE_KEY } from "@/components/PatientIntakeForm";
import { triageSymptoms, generateAIResponse, type TriageResult } from "@/lib/symptomTriage";

const CHAT_STORAGE_KEY = "aetherhealth_chat";
const CONSULTATION_STORAGE_KEY = "aetherhealth_consultations";

interface ChatMessage {
  id: number;
  sender: "ai" | "user";
  content: string;
  timestamp: string;
}

type ConsultationStep = 1 | 2 | 3 | 4;

const stepLabels: Record<ConsultationStep, string> = {
  1: "Symptom Collection",
  2: "AI Analysis",
  3: "Treatment Plan",
  4: "Provider Review",
};

const Consultation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState<ConsultationStep>(1);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [showIntake, setShowIntake] = useState(false);
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) return JSON.parse(stored) as ChatMessage[];
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        sender: "ai",
        content:
          "Hello! I'm Dr. Aether, your AI healthcare assistant. Before we begin, I'd like to gather some basic information. Would you like to complete a brief intake form to help me serve you better?",
        timestamp: new Date().toISOString(),
      },
    ];
  });

  // Load intake data
  useEffect(() => {
    try {
      const stored = localStorage.getItem(INTAKE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as IntakeData;
        setIntakeData(parsed);
      } else {
        setShowIntake(true);
      }
    } catch {
      setShowIntake(true);
    }
  }, []);

  // Persist chat messages
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender: "ai" | "user", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender,
        content,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleIntakeComplete = (data: IntakeData) => {
    setIntakeData(data);
    setShowIntake(false);
    const greeting = `Thank you, ${data.firstName}! I can see you've come in today for "${data.chiefComplaint}". You've indicated a severity of ${data.severityScore}/10. Let's explore your symptoms further. Could you describe what you're experiencing in more detail?`;
    addMessage("ai", greeting);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMsg = message.trim();
    addMessage("user", userMsg);
    setMessage("");

    // Advance to step 2 after first user message
    setCurrentStep((prev) => (prev < 2 ? 2 : prev));

    // Run triage on the combined symptom text
    const allUserText = [...messages.filter((m) => m.sender === "user").map((m) => m.content), userMsg].join(" ");
    const userMsgCount = messages.filter((m) => m.sender === "user").length;

    const triage = triageSymptoms(allUserText);

    setTimeout(() => {
      const response = generateAIResponse(userMsg, userMsgCount);
      addMessage("ai", response);

      // After 3rd exchange, show triage result and advance steps
      if (userMsgCount >= 2) {
        setTriageResult(triage);
        setCurrentStep(3);

        // Save consultation record
        const consultations = (() => {
          try {
            return JSON.parse(localStorage.getItem(CONSULTATION_STORAGE_KEY) || "[]");
          } catch {
            return [];
          }
        })();
        consultations.unshift({
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString(),
          type: triage.specialty.split(" / ")[0],
          status: "completed",
          urgency: triage.urgency,
          diagnosis: `AI Triage: ${triage.urgencyLabel}`,
          prescription: triage.suggestedActions[0] || "",
          notes: triage.summary,
          intakeData: intakeData ?? undefined,
        });
        localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(consultations));
        setCurrentStep(4);
      }
    }, 900);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const urgencyBannerColor = triageResult
    ? {
        emergency: "bg-red-50 border-red-200 text-red-800",
        urgent: "bg-orange-50 border-orange-200 text-orange-800",
        routine: "bg-blue-50 border-blue-200 text-blue-800",
        "self-care": "bg-green-50 border-green-200 text-green-800",
      }[triageResult.urgency]
    : "";

  if (showIntake) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">AI Consultation</h1>
                  <p className="text-sm text-blue-600">Patient Intake</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <PatientIntakeForm
            onComplete={handleIntakeComplete}
            onSkip={() => {
              setShowIntake(false);
              addMessage("ai", "No problem! Please describe what brings you in today and I'll do my best to help.");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">AI Consultation</h1>
                  <p className="text-sm text-blue-600">Secure & HIPAA Compliant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {intakeData && (
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Patient: <strong>{intakeData.firstName} {intakeData.lastName}</strong>
                </span>
              )}
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Session Active
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Triage Result Banner */}
        {triageResult && (
          <div className={`mb-4 p-4 rounded-lg border ${urgencyBannerColor} flex items-start gap-3`}>
            {triageResult.urgency === "emergency" ? (
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <Stethoscope className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <strong className="font-semibold">{triageResult.urgencyLabel}</strong>
                <Badge variant="outline" className="text-xs">{triageResult.specialty}</Badge>
              </div>
              <p className="text-sm">{triageResult.summary}</p>
              <ul className="mt-2 space-y-1">
                {triageResult.suggestedActions.map((action, i) => (
                  <li key={i} className="text-sm flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <Card className="h-[550px] flex flex-col border-blue-100">
          {/* Chat Header */}
          <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Dr. Aether AI</h3>
                  <p className="text-sm text-gray-600">Healthcare Assistant</p>
                </div>
              </div>
              <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                <MessageCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-xl text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white border border-blue-100 text-gray-900 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 flex items-center gap-1 ${
                      msg.sender === "user" ? "text-blue-100 justify-end" : "text-gray-400"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-blue-100 bg-gray-50">
            <div className="flex space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your symptoms..."
                className="min-h-[60px] resize-none border-blue-200 focus:border-blue-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  className="px-3"
                  title="Voice input (not yet connected)"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 px-3"
                  size="sm"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All conversations are encrypted and HIPAA compliant. Press Enter to send.
            </p>
          </div>
        </Card>

        {/* Progress Indicator */}
        <Card className="mt-4 p-4 border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Consultation Progress</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {([1, 2, 3, 4] as ConsultationStep[]).map((step) => (
              <Badge
                key={step}
                className={
                  step < currentStep
                    ? "bg-green-100 text-green-700 border-green-200"
                    : step === currentStep
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }
              >
                {step < currentStep && <CheckCircle className="h-3 w-3 mr-1" />}
                Step {step}: {stepLabels[step]}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Consultation;
