"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import { HandHeart, MapPin, Home, Utensils, Pill, Calendar } from "lucide-react"
import { toast } from "../components/ui/Toaster"

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
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("provide")

  // Translations
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
      viewDetails: "View Details",
      offerHelp: "Offer Help",
      processing: "Processing...",
      thanksTitle: "Thank You for Your Support",
      thanksText: "Your contribution makes a significant difference in helping those affected by disasters.",
    },
    hi: {
      title: "संसाधन प्रदान करें",
      subtitle: "आपातकाल के दौरान भोजन, आश्रय और चिकित्सा सहायता प्रदान करके दूसरों की मदद करें।",
      formTitle: "संसाधन योगदान फॉर्म",
      nameLabel: "आपका नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      phoneLabel: "फोन नंबर",
      phonePlaceholder: "अपना फोन नंबर दर्ज करें",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "अपना ईमेल पता दर्ज करें",
      locationLabel: "संसाधन स्थान",
      locationPlaceholder: "अपने संसाधनों का स्थान दर्ज करें",
      resourceTypeLabel: "संसाधन प्रकार",
      shelter: "आश्रय",
      food: "भोजन और पानी",
      medical: "चिकित्सा सहायता",
      transport: "परिवहन",
      quantityLabel: "मात्रा/क्षमता",
      quantityPlaceholder: "जैसे, 10 भोजन, 5 लोगों के लिए जगह",
      availabilityLabel: "उपलब्धता",
      immediate: "तत्काल",
      within24: "24 घंटे के भीतर",
      within48: "48 घंटे के भीतर",
      flexible: "लचीला",
      descriptionLabel: "अतिरिक्त विवरण",
      descriptionPlaceholder: "अपने संसाधनों के बारे में कोई अतिरिक्त जानकारी प्रदान करें...",
      submitButton: "प्रस्ताव जमा करें",
      requestsTitle: "वर्तमान अनुरोध",
      requestsSubtitle: "सहायता की आवश्यकता वाले लोग",
      provideTab: "संसाधन प्रदान करें",
      requestsTab: "अनुरोध देखें",
      viewDetails: "विवरण देखें",
      offerHelp: "मदद की पेशकश करें",
      processing: "प्रोसेसिंग...",
      thanksTitle: "आपके समर्थन के लिए धन्यवाद",
      thanksText: "आपका योगदान आपदाओं से प्रभावित लोगों की मदद करने में महत्वपूर्ण अंतर लाता है।",
    },
    es: {
      title: "Proporcionar Recursos",
      subtitle: "Ayuda a otros ofreciendo comida, refugio y asistencia médica durante emergencias.",
      formTitle: "Formulario de Contribución de Recursos",
      nameLabel: "Tu Nombre",
      namePlaceholder: "Ingresa tu nombre completo",
      phoneLabel: "Número de Teléfono",
      phonePlaceholder: "Ingresa tu número de teléfono",
      emailLabel: "Dirección de Correo Electrónico",
      emailPlaceholder: "Ingresa tu dirección de correo electrónico",
      locationLabel: "Ubicación del Recurso",
      locationPlaceholder: "Ingresa la ubicación de tus recursos",
      resourceTypeLabel: "Tipo de Recurso",
      shelter: "Refugio",
      food: "Comida y Agua",
      medical: "Ayuda Médica",
      transport: "Transporte",
      quantityLabel: "Cantidad/Capacidad",
      quantityPlaceholder: "ej., 10 comidas, espacio para 5 personas",
      availabilityLabel: "Disponibilidad",
      immediate: "Inmediata",
      within24: "Dentro de 24 horas",
      within48: "Dentro de 48 horas",
      flexible: "Flexible",
      descriptionLabel: "Detalles Adicionales",
      descriptionPlaceholder: "Proporciona cualquier información adicional sobre tus recursos...",
      submitButton: "Enviar Oferta",
      requestsTitle: "Solicitudes Actuales",
      requestsSubtitle: "Personas que necesitan asistencia",
      provideTab: "Proporcionar Recursos",
      requestsTab: "Ver Solicitudes",
      viewDetails: "Ver Detalles",
      offerHelp: "Ofrecer Ayuda",
      processing: "Procesando...",
      thanksTitle: "Gracias por Tu Apoyo",
      thanksText: "Tu contribución marca una diferencia significativa en ayudar a los afectados por desastres.",
    },
    fr: {
      title: "Fournir des Ressources",
      subtitle: "Aidez les autres en offrant de la nourriture, un abri et une aide médicale pendant les urgences.",
      formTitle: "Formulaire de Contribution de Ressources",
      nameLabel: "Votre Nom",
      namePlaceholder: "Entrez votre nom complet",
      phoneLabel: "Numéro de Téléphone",
      phonePlaceholder: "Entrez votre numéro de téléphone",
      emailLabel: "Adresse Email",
      emailPlaceholder: "Entrez votre adresse email",
      locationLabel: "Emplacement des Ressources",
      locationPlaceholder: "Entrez l'emplacement de vos ressources",
      resourceTypeLabel: "Type de Ressource",
      shelter: "Abri",
      food: "Nourriture et Eau",
      medical: "Aide Médicale",
      transport: "Transport",
      quantityLabel: "Quantité/Capacité",
      quantityPlaceholder: "ex., 10 repas, espace pour 5 personnes",
      availabilityLabel: "Disponibilité",
      immediate: "Immédiate",
      within24: "Dans les 24 heures",
      within48: "Dans les 48 heures",
      flexible: "Flexible",
      descriptionLabel: "Détails Supplémentaires",
      descriptionPlaceholder: "Fournissez toute information supplémentaire sur vos ressources...",
      submitButton: "Soumettre l'Offre",
      requestsTitle: "Demandes Actuelles",
      requestsSubtitle: "Personnes ayant besoin d'assistance",
      provideTab: "Fournir des Ressources",
      requestsTab: "Voir les Demandes",
      viewDetails: "Voir les Détails",
      offerHelp: "Offrir de l'Aide",
      processing: "Traitement en cours...",
      thanksTitle: "Merci pour Votre Soutien",
      thanksText:
        "Votre contribution fait une différence significative pour aider les personnes touchées par des catastrophes.",
    },
  }

  const t = translations[language] || translations.en

  // Sample resource requests
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
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    toast({
      title: "Offer Submitted!",
      description: "Your offer has been submitted successfully. Thank you!",
      action: {
        label: "Okay",
        onClick: () => console.log("Okay!"),
      },
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-4">{t.title}</h1>
        <p className="text-gray-600 text-center mb-6">{t.subtitle}</p>

        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              activeTab === "provide" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } mr-4`}
            onClick={() => setActiveTab("provide")}
          >
            {t.provideTab}
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold ${
              activeTab === "requests" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            {t.requestsTab}
          </button>
        </div>

        {activeTab === "provide" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-center mb-4">{t.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder={t.namePlaceholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder={t.phonePlaceholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={t.emailPlaceholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.locationLabel}
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder={t.locationPlaceholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="resourceType" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.resourceTypeLabel}
                </label>
                <select
                  id="resourceType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.resourceType}
                  onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                >
                  <option value="shelter">{t.shelter}</option>
                  <option value="food">{t.food}</option>
                  <option value="medical">{t.medical}</option>
                  <option value="transport">{t.transport}</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.quantityLabel}
                </label>
                <input
                  type="text"
                  id="quantity"
                  placeholder={t.quantityPlaceholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.availabilityLabel}
                </label>
                <select
                  id="availability"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                >
                  <option value="immediate">{t.immediate}</option>
                  <option value="within24">{t.within24}</option>
                  <option value="within48">{t.within48}</option>
                  <option value="flexible">{t.flexible}</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  {t.descriptionLabel}
                </label>
                <textarea
                  id="description"
                  placeholder={t.descriptionPlaceholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? t.processing : t.submitButton}
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === "requests" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-center mb-4">{t.requestsTitle}</h2>
            <p className="text-gray-600 text-center mb-6">{t.requestsSubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourceRequests.map((request) => (
                <div key={request.id} className="bg-white shadow-md rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <request.icon className="h-5 w-5 mr-2 text-blue-500" />
                    <h3 className="text-lg font-semibold">{request.name}</h3>
                  </div>
                  <p className="text-gray-700">
                    <MapPin className="inline-block h-4 w-4 mr-1" />
                    {request.location}
                  </p>
                  <p className="text-gray-700">
                    <HandHeart className="inline-block h-4 w-4 mr-1" />
                    {request.people}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-sm font-semibold ${
                        request.urgency === "High"
                          ? "text-red-500"
                          : request.urgency === "Critical"
                            ? "text-red-700"
                            : "text-yellow-500"
                      }`}
                    >
                      Urgency: {request.urgency}
                    </span>
                    <span className="text-gray-500 text-xs">
                      <Calendar className="inline-block h-3 w-3 mr-1" />
                      {request.time}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      {t.viewDetails}
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                      {t.offerHelp}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Thank you toast */}
      {/* <Toast open={showThanks} onOpenChange={setShowThanks}>
        <ToastTitle>{t.thanksTitle}</ToastTitle>
        <ToastDescription>
          {t.thanksText}
        </ToastDescription>
        <ToastClose>
          <X className="h-4 w-4" />
        </ToastClose>
      </Toast> */}
    </motion.div>
  )
}

export default ProvideResources
