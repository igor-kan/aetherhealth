
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Brain, Stethoscope, MessageCircle, Video, Phone, Star, CheckCircle, Heart, Activity, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const FEATURE_HIGHLIGHTS = [
  {
    icon: Heart,
    title: "15 Health Metrics",
    description: "Track vitals, fitness, nutrition, and mental wellness metrics in one place.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "See whether your metrics are improving, stable, or declining week over week.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Activity,
    title: "Normal-Range Alerts",
    description: "Instantly know which readings fall outside healthy ranges with colour-coded indicators.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "30-Day History",
    description: "Interactive charts show a month of data with a highlighted normal-range band.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <Hero />
      <Stats />

      {/* Health Tracking Feature Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <Heart className="w-4 h-4 mr-2" />
            Personal Health Tracking
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Monitor Your Wellness,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Every Day
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Log and visualise 15 key health metrics — from heart rate and sleep to mood and hydration — all powered by on-device storage, with no account required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FEATURE_HIGHLIGHTS.map(({ icon: Icon, title, description, color, bg }) => (
            <Card key={title} className="p-6 border-blue-100 hover:shadow-md transition-shadow">
              <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/health-dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
            >
              Open Health Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8">
              <Stethoscope className="mr-2 h-5 w-5" />
              Patient Portal
            </Button>
          </Link>
        </div>
      </section>

      <ServicesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
