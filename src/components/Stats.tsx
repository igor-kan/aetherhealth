
import { Card } from "@/components/ui/card";
import { Clock, Users, Star, Shield } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Clock,
      value: "15-20 min",
      label: "Average consultation time",
      color: "text-blue-600"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Patients treated",
      color: "text-green-600"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Patient satisfaction",
      color: "text-yellow-600"
    },
    {
      icon: Shield,
      value: "100%",
      label: "HIPAA compliant",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center border-blue-100 hover:shadow-lg transition-shadow">
            <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Stats;
