
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Aether Clinic</h1>
              <p className="text-sm text-blue-600 font-medium">AI-first healthcare</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <Link to="/dashboard">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Dashboard
              </Button>
            </Link>
            <Link to="/consultation">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Start Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-100">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <div className="flex flex-col space-y-2">
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/consultation">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Start Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
