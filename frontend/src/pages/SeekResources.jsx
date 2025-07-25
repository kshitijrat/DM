// ✅ FULL EDITED SeekResources COMPONENT (with preserved styling, phone + email validation, toast alerts)

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
  AlertTriangle,
  Bus,
} from "lucide-react";
import { toast } from "../components/ui/Toaster";
import axios from "axios";

const SeekResources = ({ language = "en", setLanguage }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    n_people: "1",
    resourceType: "shelter",
    urgency: "Medium",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const t = {
    title: "Seek Resources",
    subtitle:
      "Request essential resources like food, shelter, and medical aid during emergencies.",
    formTitle: "Resource Request Form",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
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
  };

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

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValidPhone(formData.phone)) {
      toast({
        title: "Invalid Phone",
        description: "Phone number must be 10 digits.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/seek/seek-resource",
        formData
      );

      toast({
        title: "Request Submitted!",
        description: "Your request has been submitted successfully. Thank you!",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        n_people: "1",
        resourceType: "shelter",
        urgency: "Medium",
        description: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-gray-400 mt-2">{t.subtitle}</p>
        </motion.div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-center mb-2">
            {t.formTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              required
            />
            <input
              type="text"
              name="location"
              placeholder={t.locationPlaceholder}
              value={formData.location}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="n_people"
              placeholder="No. of People"
              value={formData.n_people}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              required
            />
            <select
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
            >
              <option value="shelter">{t.shelter}</option>
              <option value="food">{t.food}</option>
              <option value="medical">{t.medical}</option>
              <option value="transport">{t.transport}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>

          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
          >
            <option value="Low">{t.low}</option>
            <option value="Medium">{t.medium}</option>
            <option value="High">{t.high}</option>
            <option value="Critical">{t.critical}</option>
          </select>

          <textarea
            name="description"
            placeholder={t.descriptionPlaceholder}
            value={formData.description}
            onChange={handleChange}
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
            {loading ? t.processing : t.submitButton}
          </button>
        </motion.form>

        {/* Emergency Contact */}
        <div className="mt-10 p-4 border border-red-400 bg-red-900/20 rounded-xl max-w-3xl mx-auto text-center">
          <AlertTriangle className="inline w-5 h-5 mr-2 text-red-400" />
          <span>{t.emergencyContact} - </span>
          <a href="tel:112" className="text-red-300 underline">{t.callEmergency}</a>
        </div>

        {/* Available Resources (unchanged) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableResources.map((res) => (
            <div key={res.id} className="bg-gray-800 p-6 rounded-xl flex items-start gap-4">
              <div className="bg-gray-700 p-3 rounded-full">
                <res.icon className="text-blue-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{res.name}</h3>
                <p className="text-gray-300 text-sm">{res.location}</p>
                <p className="text-gray-400 text-sm">{res.capacity}</p>
                <p className="text-gray-500 text-xs mt-1">Distance: {res.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeekResources;
