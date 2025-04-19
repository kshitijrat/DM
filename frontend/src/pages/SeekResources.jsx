"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { MapPin, Home, Utensils, Pill, Phone, Send, AlertTriangle } from "lucide-react"
import { toast } from "../components/ui/Toaster"

const SeekResources = ({ language, setLanguage }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    people: "1",
    resourceType: "shelter",
    urgency: "medium",
    description: "",
  })
  const [loading, setLoading] = useState(false)

  // Translations
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
      availableResources: "Available Resources Near You",
      resourcesTitle: "Resources Available",
      resourcesSubtitle: "These resources are currently available in your area",
      viewDetails: "View Details",
      contactNow: "Contact Now",
      processing: "Processing...",
      emergencyContact: "Emergency Contact",
      callEmergency: "Call Emergency Services",
    },
    hi: {
      title: "संसाधन प्राप्त करें",
      subtitle: "आपातकाल के दौरान भोजन, आश्रय और चिकित्सा सहायता जैसे आवश्यक संसाधनों का अनुरोध करें।",
      formTitle: "संसाधन अनुरोध फॉर्म",
      nameLabel: "आपका नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "अपना फोन नंबर दर्ज करें",
      locationLabel: "वर्तमान स्थान",
      locationPlaceholder: "अपना वर्तमान स्थान दर्ज करें",
      peopleLabel: "लोगों की संख्या",
      resourceTypeLabel: "संसाधन प्रकार",
      shelter: "आश्रय",
      food: "भोजन और पानी",
      medical: "चिकित्सा सहायता",
      transport: "परिवहन",
      urgencyLabel: "तात्कालिकता स्तर",
      low: "कम",
      medium: "मध्यम",
      high: "उच्च",
      critical: "गंभीर",
      descriptionLabel: "अतिरिक्त विवरण",
      descriptionPlaceholder: "कोई भी अतिरिक्त जानकारी प्रदान करें जो मदद कर सकती है...",
      submitButton: "अनुरोध जमा करें",
      availableResources: "आपके पास उपलब्ध संसाधन",
      resourcesTitle: "उपलब्ध संसाधन",
      resourcesSubtitle: "ये संसाधन वर्तमान में आपके क्षेत्र में उपलब्ध हैं",
      viewDetails: "विवरण देखें",
      contactNow: "अभी संपर्क करें",
      processing: "प्रोसेसिंग...",
      emergencyContact: "आपातकालीन संपर्क",
      callEmergency: "आपातकालीन सेवाओं को कॉल करें",
    },
    es: {
      title: "Buscar Recursos",
      subtitle: "Solicita recursos esenciales como comida, refugio y ayuda médica durante emergencias.",
      formTitle: "Formulario de Solicitud de Recursos",
      nameLabel: "Tu Nombre",
      namePlaceholder: "Ingresa tu nombre completo",
      phoneLabel: "Número de Teléfono",
      phonePlaceholder: "Ingresa tu número de teléfono",
      locationLabel: "Ubicación Actual",
      locationPlaceholder: "Ingresa tu ubicación actual",
      peopleLabel: "Número de Personas",
      resourceTypeLabel: "Tipo de Recurso",
      shelter: "Refugio",
      food: "Comida y Agua",
      medical: "Ayuda Médica",
      transport: "Transporte",
      urgencyLabel: "Nivel de Urgencia",
      low: "Bajo",
      medium: "Medio",
      high: "Alto",
      critical: "Crítico",
      descriptionLabel: "Detalles Adicionales",
      descriptionPlaceholder: "Proporciona cualquier información adicional que pueda ayudar...",
      submitButton: "Enviar Solicitud",
      availableResources: "Recursos Disponibles Cerca de Ti",
      resourcesTitle: "Recursos Disponibles",
      resourcesSubtitle: "Estos recursos están actualmente disponibles en tu área",
      viewDetails: "Ver Detalles",
      contactNow: "Contactar Ahora",
      processing: "Procesando...",
      emergencyContact: "Contacto de Emergencia",
      callEmergency: "Llamar a Servicios de Emergencia",
    },
    fr: {
      title: "Chercher des Ressources",
      subtitle:
        "Demandez des ressources essentielles comme de la nourriture, un abri et une aide médicale pendant les urgences.",
      formTitle: "Formulaire de Demande de Ressources",
      nameLabel: "Votre Nom",
      namePlaceholder: "Entrez votre nom complet",
      phoneLabel: "Numéro de Téléphone",
      phonePlaceholder: "Entrez votre numéro de téléphone",
      locationLabel: "Emplacement Actuel",
      locationPlaceholder: "Entrez votre emplacement actuel",
      peopleLabel: "Nombre de Personnes",
      resourceTypeLabel: "Type de Ressource",
      shelter: "Abri",
      food: "Nourriture et Eau",
      medical: "Aide Médicale",
      transport: "Transport",
      urgencyLabel: "Niveau d'Urgence",
      low: "Faible",
      medium: "Moyen",
      high: "Élevé",
      critical: "Critique",
      descriptionLabel: "Détails Supplémentaires",
      descriptionPlaceholder: "Fournissez toute information supplémentaire qui pourrait aider...",
      submitButton: "Soumettre la Demande",
      availableResources: "Ressources Disponibles Près de Chez Vous",
      resourcesTitle: "Ressources Disponibles",
      resourcesSubtitle: "Ces ressources sont actuellement disponibles dans votre région",
      viewDetails: "Voir les Détails",
      contactNow: "Contacter Maintenant",
      processing: "Traitement en cours...",
      emergencyContact: "Contact d'Urgence",
      callEmergency: "Appeler les Services d'Urgence",
    },
  }

  const t = translations[language] || translations.en

  // Sample available resources
  const availableResources = [
    {
      id: 1,
      type: "shelter",
      name: "Community Relief Center",
      location: "123 Safety Street, Delhi",
      distance: "2.3 km",
      capacity: "120 people",
      icon: Home,
    },
    {
      id: 2,
      type: "food",
      name: "Food Distribution Point",
      location: "456 Help Avenue, Delhi",
      distance: "1.5 km",
      capacity: "Serving 500 meals/day",
      icon: Utensils,
    },
    {
      id: 3,
      type: "medical",
      name: "Emergency Medical Camp",
      location: "789 Care Road, Delhi",
      distance: "3.1 km",
      capacity: "24/7 service",
      icon: Pill,
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast("Your resource request has been submitted successfully!", "success")
      setLoading(false)
      // Reset form
      setFormData({
        name: "",
        phone: "",
        location: "",
        people: "1",
        resourceType: "shelter",
        urgency: "medium",
        description: "",
      })
    }, 1500)
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{t.formTitle}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.locationLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t.locationPlaceholder}
                    required
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.peopleLabel}
                  </label>
                  <select
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.resourceTypeLabel}
                  </label>
                  <select
                    name="resourceType"
                    value={formData.resourceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="shelter">{t.shelter}</option>
                    <option value="food">{t.food}</option>
                    <option value="medical">{t.medical}</option>
                    <option value="transport">{t.transport}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.urgencyLabel}
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="low">{t.low}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="high">{t.high}</option>
                    <option value="critical">{t.critical}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.descriptionLabel}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t.descriptionPlaceholder}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.processing}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.submitButton}
                  </>
                )}
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{t.resourcesTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t.resourcesSubtitle}</p>

            <div className="space-y-4">
              {availableResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start">
                    <div
                      className={`p-3 rounded-full bg-${resource.type === "shelter" ? "blue" : resource.type === "food" ? "green" : "red"}-100 dark:bg-${resource.type === "shelter" ? "blue" : resource.type === "food" ? "green" : "red"}-900/20 mr-4`}
                    >
                      <resource.icon
                        className={`w-6 h-6 text-${resource.type === "shelter" ? "blue" : resource.type === "food" ? "green" : "red"}-500`}
                      />
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
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Resource Map Loading...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SeekResources
