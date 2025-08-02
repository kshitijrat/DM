"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { MapPin, Home, Utensils, Pill, Bus } from "lucide-react";
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
  const [providedResources, setProvidedResources] = useState([]);

  const t = {
    title: "Seek Resources",
    subtitle:
      "Request essential resources like food, shelter, and medical aid during emergencies.",
    formTitle: "Resource Request Form",
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "Enter your phone number",
    emailPlaceholder: "Enter your email",
    locationPlaceholder: "Enter your current location",
    shelter: "Shelter",
    food: "Food & Water",
    medical: "Medical Aid",
    transport: "Transportation",
    other: "Other",
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
    descriptionPlaceholder:
      "Provide any additional information that might help...",
    submitButton: "Submit Request",
    processing: "Processing...",
    emergencyContact: "Emergency Contact",
    callEmergency: "Call 112",
    resourcesTitle: "Available Resources",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => phone.replace(/\D/g, "").length === 10;

  const handleSubmit = async (event) => {
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
      await axios.post("http://localhost:5000/api/seek/seek-resource", formData);
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
  };

  useEffect(() => {
    const fetchProvidedResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/provide/provided-resources");
        setProvidedResources(res.data);
      } catch (err) {
        console.error("Error fetching provided resources:", err);
      }
    };

    fetchProvidedResources();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-black dark:text-white pt-16 overflow-x-hidden">
      <Navbar language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-4  flex flex-col lg:flex-row gap-10">
        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className="lg:w-1/2 w-full bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-center mb-2">{t.formTitle}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder={t.namePlaceholder} value={formData.name} onChange={handleChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
              required />
            <input type="text" name="phone" placeholder={t.phonePlaceholder} value={formData.phone} onChange={handleChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
              required />
            <input type="email" name="email" placeholder={t.emailPlaceholder} value={formData.email} onChange={handleChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
              required />
            <input type="text" name="location" placeholder={t.locationPlaceholder} value={formData.location} onChange={handleChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
              required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="n_people" placeholder="No. of People" value={formData.n_people} onChange={handleChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
              required />
            <select name="resourceType" value={formData.resourceType} onChange={handleChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full">
              <option value="shelter">{t.shelter}</option>
              <option value="food">{t.food}</option>
              <option value="medical">{t.medical}</option>
              <option value="transport">{t.transport}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>

          <select name="urgency" value={formData.urgency} onChange={handleChange}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full">
            <option value="Low">{t.low}</option>
            <option value="Medium">{t.medium}</option>
            <option value="High">{t.high}</option>
            <option value="Critical">{t.critical}</option>
          </select>

          <textarea name="description" placeholder={t.descriptionPlaceholder} value={formData.description} onChange={handleChange}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
            rows={4} />

          <button type="submit" disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${loading ? "bg-gray-400 dark:bg-gray-700" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}>
            {loading ? t.processing : t.submitButton}
          </button>
        </motion.form>

        {/* Available Resources Section */}
        <div className={`lg:w-1/2 w-full mt-10 lg:mt-0 lg:sticky 
  ${providedResources.length > 0 ? "h-[calc(100vh-120px)]" : "h-[200px]"} 
  bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md flex flex-col`}>

          <h2 className="text-xl font-semibold mb-2 text-center">{t.resourcesTitle}</h2>

          <div className="overflow-y-auto space-y-6 pr-2 mt-4 flex-1">
            {providedResources.length > 0 ? (
              providedResources.map((res, index) => (
                <div key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl flex items-start gap-4 shadow-md hover:shadow-lg transition duration-300">
                  <div className="bg-gray-200 dark:bg-gray-600 p-3 rounded-full">
                    {res.resourceType === "shelter" && <Home className="text-blue-600 dark:text-blue-400 w-6 h-6" />}
                    {res.resourceType === "food" && <Utensils className="text-blue-600 dark:text-blue-400 w-6 h-6" />}
                    {res.resourceType === "medical" && <Pill className="text-blue-600 dark:text-blue-400 w-6 h-6" />}
                    {res.resourceType === "transport" && <Bus className="text-blue-600 dark:text-blue-400 w-6 h-6" />}
                    {!["shelter", "food", "medical", "transport"].includes(res.resourceType) &&
                      <MapPin className="text-blue-600 dark:text-blue-400 w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{res.name}</h3>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.location)}`} target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold flex items-center gap-1 mt-1 uppercase p-1 hover:underline">
                      <MapPin className="w-4 h-4" />
                      {res.location}
                    </a>
                    <p className="text-sm capitalize p-1">Type: {res.resourceType}, Quantity: {res.quantity}</p>
                    {res.description && <p className="text-sm mt-1 p-1">Description: {res.description}</p>}
                    <p className="text-sm mt-1 p-1">Availability: {res.availability}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <a href={`tel:${res.phone}`} className="text-blue-600 dark:text-blue-400 text-sm">📞 Call Now</a>
                      <a href={`tel:${res.phone}`} className="text-red-600 dark:text-red-400 text-sm">🚨 Emergency: 112</a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 dark:text-gray-300 mt-8 text-lg">
                🚫 No Available Resource Found
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default SeekResources;
