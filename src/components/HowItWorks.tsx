
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Brain, FileText, Pill, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "AI Intake",
      description: "Tell our AI assistant your symptoms through voice or chat. Natural conversation extracts structured medical data.",
      details: ["Voice or text input", "SNOMED/ICD-10 mapping", "Past medical history"],
      step: "01"
    },
    {
      icon: Brain,
      title: "AI Diagnosis",
      description: "Advanced LLM analyzes symptoms and generates differential diagnosis with confidence levels and risk assessment.",
      details: ["Risk stratification", "Clinical reasoning", "Red flag detection"],
      step: "02"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Auto-generated SOAP notes and medical documentation in FHIR-compatible format for your records.",
      details: ["SOAP note generation", "EHR integration", "HL7/FHIR format"],
      step: "03"
    },
    {
      icon: Pill,
      title: "Treatment Plan",
      description: "AI recommends treatment and prescriptions. Licensed MD/NP provides final approval and e-prescribes to your pharmacy.",
      details: ["Human oversight", "E-prescribe", "Insurance check"],
      step: "04"
    },
    {
      icon: CheckCircle,
      title: "Follow-up",
      description: "Automated follow-up care, reminders, and 24/7 AI assistant for after-care questions and support.",
      details: ["Care reminders", "24/7 support", "Progress tracking"],
      step: "05"
    }
  ];

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
          How It Works
        </Badge>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          From Symptoms to Treatment in Minutes
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our AI-first approach streamlines the entire healthcare journey while maintaining the highest standards of medical care.
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <Card key={index} className="p-8 border-blue-100 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 text-sm font-bold px-3 py-1 rounded-full">
                  {step.step}
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-lg">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {step.details.map((detail, idx) => (
                    <Badge key={idx} variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                      {detail}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
