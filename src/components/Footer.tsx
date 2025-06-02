
import { Brain, Shield, Clock, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Aether Clinic</h3>
                <p className="text-sm text-blue-400">AI-first healthcare</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing healthcare with AI-powered diagnostics and human oversight.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-900 text-green-300 hover:bg-green-800">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge className="bg-blue-900 text-blue-300 hover:bg-blue-800">
                <Clock className="w-3 h-3 mr-1" />
                24/7 Available
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Mental Health</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dermatology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sexual Health</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Urgent Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HIPAA Notice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Aether Clinic. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                <Globe className="w-3 h-3 mr-1" />
                Serving 50+ Countries
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
