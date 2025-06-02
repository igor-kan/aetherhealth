
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Brain, Stethoscope, MessageCircle, Video, Phone, Star, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      <Hero />
      <Stats />
      <ServicesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
