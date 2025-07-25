"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  MapPin,
  Home,
  Utensils,
  Pill,
  Phone,
  Send,
  AlertTriangle,
  Bus,
  HelpCircle,
} from "lucide-react";
import { toast } from "../components/ui/Toaster";
import axios from "axios";

const SeekResources = ({ language = "en", setLanguage }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    n_people: "1",
    resourceType: "shelter",
    urgency: "Medium",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Seek Resources",
      subtitle: "Request essential resources like food, shelter, and medical aid during emergencies.",
      formTitle: "Resource Request Form",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      locationLabel: "Current Location",
      locationPlaceholder: "Enter your current location",
      peopleLabel: "Number of People",
      resourceTypeLabel: "Resource Type",
      shelter: "Shelter",
      food: "Food & Water",
      medical: "Medical Aid",
      transport: "Transportation",
      other: "Other",
      urgencyLabel: "Urgency Level",
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
      descriptionLabel: "Additional Details",
      descriptionPlaceholder: "Provide any additional information that might help...",
      submitButton: "Submit Request",
      processing: "Processing...",
      emergencyContact: "Emergency Contact",
      callEmergency: "Call 112",
      resourcesTitle: "Available Resources Nearby",
      resourcesSubtitle: "Browse available resources shared by others near your area.",
      viewDetails: "View Details",
      contactNow: "Contact Now",
    },
  };

  const t = translations[language] || translations.en;

  const availableResources = [
    {
      id: 1,
      name: "City Community Shelter",
      location: "Sector 12, Bhopal",
      distance: "2.5 km",
      capacity: "35 beds",
      type: "shelter",
      icon: Home,
    },
    {
      id: 2,
      name: "Relief Food Center",
      location: "Nehru Chowk",
      distance: "1.2 km",
      capacity: "200 meals",
      type: "food",
      icon: Utensils,
    },
    {
      id: 3,
      name: "Mobile Medical Van",
      location: "Near AIIMS Gate",
      distance: "3.1 km",
      capacity: "50 people",
      type: "medical",
      icon: Pill,
    },
    {
      id: 4,
      name: "Emergency Bus Pickup",
      location: "Old Bus Stand",
      distance: "5.0 km",
      capacity: "30 seats",
      type: "transport",
      icon: Bus,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/seek/seek-resource",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Request Submitted!",
        description: "Your Request has been submitted successfully. Thank you!",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay!"),
        },
      });

      setFormData({
        name: "",
        phone: "",
        location: "",
        n_people: "1",
        resourceType: "shelter",
        urgency: "Medium",
        description: "",
      });
    } catch (error) {
      console.error("Error occurred:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {t.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">{t.subtitle}</p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{t.formTitle}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.nameLabel}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  required
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.phoneLabel}</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  required
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.locationLabel}</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t.locationPlaceholder}
                required
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.peopleLabel}</label>
                <input
                  type="number"
                  name="n_people"
                  value={formData.n_people}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.resourceTypeLabel}</label>
                <select
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="shelter">{t.shelter}</option>
                  <option value="food">{t.food}</option>
                  <option value="medical">{t.medical}</option>
                  <option value="transport">{t.transport}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.urgencyLabel}</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Low">{t.low}</option>
                <option value="Medium">{t.medium}</option>
                <option value="High">{t.high}</option>
                <option value="Critical">{t.critical}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.descriptionLabel}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t.descriptionPlaceholder}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              {loading ? t.processing : t.submitButton}
            </button>
          </form>

          {/* Emergency Contact */}
          <div className="mt-8 p-4 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">{t.emergencyContact}</h3>
            </div>
            <div className="mt-2 flex justify-center">
              <a
                href="tel:112"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t.callEmergency}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Available Resources */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{t.resourcesTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t.resourcesSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {availableResources.map((resource) => {
    const bgColor =
      resource.type === "shelter"
        ? "bg-blue-100 dark:bg-blue-900/20"
        : resource.type === "food"
        ? "bg-green-100 dark:bg-green-900/20"
        : resource.type === "medical"
        ? "bg-red-100 dark:bg-red-900/20"
        : "bg-yellow-100 dark:bg-yellow-900/20";

    const iconColor =
      resource.type === "shelter"
        ? "text-blue-500"
        : resource.type === "food"
        ? "text-green-500"
        : resource.type === "medical"
        ? "text-red-500"
        : "text-yellow-500";

    return (
      <motion.div
        key={resource.id}
        className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-start">
          <div className={`p-3 rounded-full ${bgColor} mr-4`}>
            <resource.icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 dark:text-white">{resource.name}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{resource.location}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Distance: </span>
                <span className="font-medium text-gray-800 dark:text-white">{resource.distance}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Capacity: </span>
                <span className="font-medium text-gray-800 dark:text-white">{resource.capacity}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                {t.viewDetails}
              </button>
              <button className="px-3 py-1 text-sm rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-colors">
                {t.contactNow}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  })}
</div>


          <div className="mt-6 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Resource Map Loading...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeekResources;
