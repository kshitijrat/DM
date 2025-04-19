"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, MapPin, Wind, Users } from "lucide-react";
import { toast } from "../components/ui/Toaster";
import { motion } from "framer-motion";

const Home = () => {
  const [activeDisasters, setActiveDisasters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching disaster data
    setTimeout(() => {
      setActiveDisasters([
        {
          id: 1,
          type: "Flood",
          location: "Mumbai, Maharashtra",
          severity: "High",
          affected: "50,000+",
          time: "2 hours ago",
        },
        {
          id: 2,
          type: "Cyclone",
          location: "Chennai, Tamil Nadu",
          severity: "Extreme",
          affected: "120,000+",
          time: "5 hours ago",
        },
        {
          id: 3,
          type: "Earthquake",
          location: "Shimla, Himachal Pradesh",
          severity: "Moderate",
          affected: "15,000+",
          time: "1 day ago",
        },
      ]);
      setIsLoading(false);

      // Welcome toast
      toast("Welcome to DisasterAlert! Stay informed and safe.", "info");
    }, 1500);
  }, []);

  const features = [
    {
      icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
      title: "Real-time Alerts",
      description:
        "Get instant notifications about disasters in your area and stay ahead of danger.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-green-600" />,
      title: "Safe Zone Mapping",
      description:
        "Locate the nearest safe zones and evacuation routes during emergencies.",
    },
    {
      icon: <Wind className="h-10 w-10 text-blue-500" />,
      title: "Weather Monitoring",
      description:
        "Track weather conditions that might lead to potential disasters.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Community Support",
      description:
        "Connect with others, offer or seek help during disaster situations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-800 mb-6"
        >
          DisasterAlert – Stay Aware. Stay Safe.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-600 mb-12 text-lg"
        >
          Empowering you with real-time alerts and safety insights to tackle
          emergencies effectively.
        </motion.p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Active Disasters */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ongoing Disasters
        </h2>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading latest updates...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeDisasters.map((disaster) => (
              <motion.div
                key={disaster.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-md"
              >
                <h3 className="text-lg font-bold text-red-600">
                  {disaster.type}
                </h3>
                <p className="text-gray-700">
                  <strong>Location:</strong> {disaster.location}
                </p>
                <p className="text-gray-700">
                  <strong>Severity:</strong> {disaster.severity}
                </p>
                <p className="text-gray-700">
                  <strong>Affected:</strong> {disaster.affected}
                </p>
                <p className="text-gray-700">
                  <strong>Reported:</strong> {disaster.time}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
