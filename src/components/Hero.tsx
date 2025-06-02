
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Brain, MessageCircle, Video, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center max-w-4xl mx-auto">
        <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
          <Brain className="w-4 h-4 mr-2" />
          AI-Powered Healthcare Platform
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Healthcare That's
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"> Faster, Smarter, Affordable</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Get diagnosed, treated, and prescribed medication in 15-20 minutes. Our AI-first platform combines advanced algorithms with licensed medical professionals for comprehensive virtual care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/consultation">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg">
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
            <Video className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            15-20 min consultations
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-blue-600" />
            HIPAA Compliant
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
            Voice & Chat Support
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-blue-600" />
            24/7 Availability
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
