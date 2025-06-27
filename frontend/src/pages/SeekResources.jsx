"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { MapPin, Home, Utensils, Pill, Phone, Send, AlertTriangle } from "lucide-react"
import { toast } from "../components/ui/Toaster"
import axios from "axios"
const SeekResources = ({ language, setLanguage }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    n_people: "1",
    resourceType: "shelter",
    urgency: "Medium",
    description: "",
  })
  const [loading, setLoading] = useState(false)

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
      urgencyLabel: "Urgency Level",
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
      descriptionLabel: "Additional Details",
      descriptionPlaceholder: "Provide any additional information that might help...",
      submitButton: "Submit Request",
      processing: "Processing...",
    },
    // Add other translations here if needed
  }

  const t = translations[language] || translations.en

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/seek/seek-resource', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast({
              title: "Request Submitted!",
              description: "Your Request has been submitted successfully. Thank you!",
              action: {
                label: "Okay",
                onClick: () => console.log("Okay!"),
              },
            });
            console.log(formData);
            alert("chal gya...");
          } 
      // Handle successful response
      
    catch (error) {
      // Handle error
      console.error('Error occurred:', error);
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">{t.subtitle}</p>
        </motion.div>

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
                  <option value="other">Other</option>
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
        </motion.div>
      </div>
    </div>
  )
}

export default SeekResources
