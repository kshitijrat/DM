// ✅ SAME COMPONENT - Styling enhanced only
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import { HandHeart, MapPin, Home, Utensils, Pill } from "lucide-react";
import { toast } from "../components/ui/Toaster";

const ProvideResources = ({ language, setLanguage }) => {
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
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("provide");

  const translations = {
    en: {
      title: "Provide Resources",
      subtitle: "Help others by offering food, shelter, and medical aid during emergencies.",
      formTitle: "Resource Contribution Form",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      locationLabel: "Resource Location",
      locationPlaceholder: "Enter the location of your resources",
      resourceTypeLabel: "Resource Type",
      shelter: "Shelter",
      food: "Food & Water",
      medical: "Medical Aid",
      transport: "Transportation",
      quantityLabel: "Quantity/Capacity",
      quantityPlaceholder: "e.g., 10 meals, space for 5 people",
      availabilityLabel: "Availability",
      immediate: "Immediate",
      within24: "Within 24 hours",
      within48: "Within 48 hours",
      flexible: "Flexible",
      descriptionLabel: "Additional Details",
      descriptionPlaceholder: "Provide any additional information about your resources...",
      submitButton: "Submit Offer",
      requestsTitle: "Current Requests",
      requestsSubtitle: "People in need of assistance",
      provideTab: "Provide Resources",
      requestsTab: "View Requests",
    },
  };

  const t = translations[language] || translations.en;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/resources/add-resource", formData);

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
        description: "Your offer has been submitted successfully. Thank you!",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay!"),
        },
      });
      console.log(formData);
      alert("chal gya...");
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission Failed",
        description: "Something went wrong while submitting your offer.",
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
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="min-h-screen bg-gray-900 py-12 px-4 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">{t.title}</h1>
        <p className="text-center text-gray-400 mb-10">{t.subtitle}</p>

        <div className="flex justify-center mb-10">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "provide"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            } mr-4`}
            onClick={() => setActiveTab("provide")}
          >
            {t.provideTab}
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "requests"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            {t.requestsTab}
          </button>
        </div>

        {activeTab === "provide" ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
          >
            <h2 className="text-xl font-semibold text-center mb-2">{t.formTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder={t.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder={t.locationPlaceholder}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.resourceType}
                onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="shelter">{t.shelter}</option>
                <option value="food">{t.food}</option>
                <option value="medical">{t.medical}</option>
                <option value="transport">{t.transport}</option>
              </select>

              <input
                type="text"
                placeholder={t.quantityPlaceholder}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="immediate">{t.immediate}</option>
              <option value="within24">{t.within24}</option>
              <option value="within48">{t.within48}</option>
              <option value="flexible">{t.flexible}</option>
            </select>

            <textarea
              placeholder={t.descriptionPlaceholder}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? t.processing || "Processing..." : t.submitButton}
            </button>
          </form>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold mb-4">{t.requestsTitle}</h2>
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