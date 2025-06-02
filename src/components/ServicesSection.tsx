
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Scan, Stethoscope, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "Mental Health",
      description: "AI-powered screening and therapy referrals for anxiety, depression, and stress management.",
      features: ["Instant screening", "Therapy matching", "Medication management"],
      price: "$39",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Scan,
      title: "Dermatology",
      description: "Visual AI analysis for skin conditions, rashes, and dermatological concerns.",
      features: ["Photo analysis", "Condition identification", "Treatment plans"],
      price: "$29",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Heart,
      title: "Sexual Health",
      description: "Confidential STD testing, birth control, and sexual wellness consultations.",
      features: ["Lab coordination", "Prescription delivery", "Follow-up care"],
      price: "$25",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Stethoscope,
      title: "Urgent Care",
      description: "Cold, flu, UTI, and other common conditions diagnosed and treated quickly.",
      features: ["Symptom analysis", "Quick diagnosis", "Prescription ready"],
      price: "$19",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <section id="services" className="container mx-auto px-4 py-20 bg-gray-50">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
          Our Specialties
        </Badge>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Comprehensive AI-Powered Care
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Start with narrow verticals, expand to full-spectrum healthcare. Each service combines AI intelligence with human oversight.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="p-6 border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`bg-gradient-to-r ${service.color} p-3 rounded-lg w-fit mb-4`}>
              <service.icon className="h-6 w-6 text-white" />
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                {service.price}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {service.description}
            </p>
            
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-500 flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link to="/consultation">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Start Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
