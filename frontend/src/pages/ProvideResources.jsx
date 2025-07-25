"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Home, Utensils, Pill } from "lucide-react";
import { toast } from "../components/ui/Toaster";

const ProvideResources = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    resourceType: "shelter",
    quantity: "",
    availability: "immediate",
    description: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("provide");

  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+1", name: "USA/Canada" },
    { code: "+44", name: "UK" },
    { code: "+61", name: "Australia" },
    { code: "+81", name: "Japan" },
    { code: "+49", name: "Germany" },
    { code: "+971", name: "UAE" },
    { code: "+880", name: "Bangladesh" },
    { code: "+977", name: "Nepal" },
    { code: "+94", name: "Sri Lanka" },
  ];

  const resourceRequests = [
    {
      id: 1,
      type: "shelter",
      name: "Sharma Family",
      location: "Sector 12, Noida",
      people: "4 people",
      urgency: "High",
      time: "2 hours ago",
      icon: Home,
    },
    {
      id: 2,
      type: "food",
      name: "Relief Camp #3",
      location: "Mayur Vihar, Delhi",
      people: "50+ people",
      urgency: "Critical",
      time: "5 hours ago",
      icon: Utensils,
    },
    {
      id: 3,
      type: "medical",
      name: "Kumar, Elderly",
      location: "Dwarka, Delhi",
      people: "2 people",
      urgency: "Medium",
      time: "1 day ago",
      icon: Pill,
    },
  ];

  const isValidPhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    const countryCodeLength = countryCode.replace(/\D/g, "").length;
    const localNumber = digitsOnly.slice(countryCodeLength);
    return localNumber.length === 10 && /^\+\d{1,4}[0-9]+$/.test(phone);
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhone = `${countryCode}${formData.phone}`;

    if (!isValidPhone(fullPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone must have exactly 10 digits after country code.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/provide/add-resource", {
        ...formData,
        phone: fullPhone,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        resourceType: "shelter",
        quantity: "",
        availability: "immediate",
        description: "",
      });

      toast({
        title: "Offer Submitted!",
        description: "Your offer has been submitted successfully.",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay!"),
        },
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission Failed",
        description: err.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="min-h-screen bg-gray-900 py-12 px-4 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Provide Resources</h1>
        <p className="text-center text-gray-400 mb-10">
          Help others by offering food, shelter, and medical aid during emergencies.
        </p>

        <div className="flex justify-center mb-10">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "provide"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            } mr-4`}
            onClick={() => setActiveTab("provide")}
          >
            Provide Resources
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "requests"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            View Requests
          </button>
        </div>

        {activeTab === "provide" ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
          >
            <h2 className="text-xl font-semibold text-center mb-2">
              Resource Contribution Form
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
                required
              />

              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-2 py-2 w-28"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })
                  }
                  className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Enter the resource location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.resourceType}
                onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
                required
              >
                <option value="shelter">Shelter</option>
                <option value="food">Food & Water</option>
                <option value="medical">Medical Aid</option>
                <option value="transport">Transportation</option>
              </select>

              <input
                type="text"
                placeholder="e.g., 10 meals, space for 5 people"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
                required
              />
            </div>

            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
            >
              <option value="immediate">Immediate</option>
              <option value="within24">Within 24 hours</option>
              <option value="within48">Within 48 hours</option>
              <option value="flexible">Flexible</option>
            </select>

            <textarea
              placeholder="Additional info about your resource..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              rows={4}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Submit Offer"}
            </button>
          </form>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Current Requests</h2>
            {resourceRequests.map((req) => (
              <div
                key={req.id}
                className="bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <req.icon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-lg font-semibold">{req.name}</p>
                    <p className="text-sm text-gray-300">{req.location}</p>
                    <p className="text-sm text-gray-400">{req.people}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{req.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProvideResources;
