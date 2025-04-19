"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react"
import Navbar from "../components/Navbar"
import { toast } from "../components/ui/Toaster"

const Signup = ({ language, setLanguage }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Translations
  const translations = {
    en: {
      title: "Create an Account",
      subtitle: "Join our community to stay safe during disasters",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      signupButton: "Create Account",
      haveAccount: "Already have an account?",
      login: "Log in",
      backToHome: "Back to home",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
      passwordShort: "Password must be at least 6 characters",
      passwordsNotMatch: "Passwords do not match",
      termsAgree: "By signing up, you agree to our Terms of Service and Privacy Policy",
    },
    hi: {
      title: "खाता बनाएं",
      subtitle: "आपदाओं के दौरान सुरक्षित रहने के लिए हमारे समुदाय से जुड़ें",
      nameLabel: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailLabel: "ईमेल",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "एक पासवर्ड बनाएं",
      confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder: "अपने पासवर्ड की पुष्टि करें",
      signupButton: "खाता बनाएं",
      haveAccount: "पहले से ही खाता है?",
      login: "लॉग इन करें",
      backToHome: "होम पर वापस जाएं",
      nameRequired: "नाम आवश्यक है",
      emailRequired: "ईमेल आवश्यक है",
      emailInvalid: "कृपया एक वैध ईमेल दर्ज करें",
      passwordRequired: "पासवर्ड आवश्यक है",
      passwordShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
      passwordsNotMatch: "पासवर्ड मेल नहीं खाते",
      termsAgree: "साइन अप करके, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं",
    },
    es: {
      title: "Crear una Cuenta",
      subtitle: "Únete a nuestra comunidad para mantenerte seguro durante desastres",
      nameLabel: "Nombre Completo",
      namePlaceholder: "Ingresa tu nombre completo",
      emailLabel: "Correo Electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Crea una contraseña",
      confirmPasswordLabel: "Confirmar Contraseña",
      confirmPasswordPlaceholder: "Confirma tu contraseña",
      signupButton: "Crear Cuenta",
      haveAccount: "¿Ya tienes una cuenta?",
      login: "Iniciar sesión",
      backToHome: "Volver al inicio",
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Por favor, introduce un correo electrónico válido",
      passwordRequired: "La contraseña es obligatoria",
      passwordShort: "La contraseña debe tener al menos 6 caracteres",
      passwordsNotMatch: "Las contraseñas no coinciden",
      termsAgree: "Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad",
    },
    fr: {
      title: "Créer un Compte",
      subtitle: "Rejoignez notre communauté pour rester en sécurité pendant les catastrophes",
      nameLabel: "Nom Complet",
      namePlaceholder: "Entrez votre nom complet",
      emailLabel: "Email",
      emailPlaceholder: "Entrez votre email",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Créez un mot de passe",
      confirmPasswordLabel: "Confirmer le Mot de passe",
      confirmPasswordPlaceholder: "Confirmez votre mot de passe",
      signupButton: "Créer un Compte",
      haveAccount: "Vous avez déjà un compte?",
      login: "Se connecter",
      backToHome: "Retour à l'accueil",
      nameRequired: "Le nom est requis",
      emailRequired: "L'email est requis",
      emailInvalid: "Veuillez entrer un email valide",
      passwordRequired: "Le mot de passe est requis",
      passwordShort: "Le mot de passe doit comporter au moins 6 caractères",
      passwordsNotMatch: "Les mots de passe ne correspondent pas",
      termsAgree:
        "En vous inscrivant, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité",
    },
  }

  const t = translations[language] || translations.en

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t.nameRequired
    }

    if (!formData.email) {
      newErrors.email = t.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordShort
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordsNotMatch
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("token", "user-authenticated")
      toast("Account created successfully!", "success")
      navigate("/")
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar language={language} setLanguage={setLanguage} />

      <div className="flex justify-center items-center min-h-screen pt-16 pb-12 px-4">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4"
            >
              <UserPlus className="w-8 h-8" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className={`w-full px-4 py-2 rounded-lg border ${errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t.passwordPlaceholder}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.password ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {t.confirmPasswordLabel}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t.confirmPasswordPlaceholder}
                className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.termsAgree}</p>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium transition-colors flex items-center justify-center mt-6"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <UserPlus className="w-4 h-4 mr-2" />
              )}
              {loading ? "Processing..." : t.signupButton}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.haveAccount}{" "}
              <Link to="/login" className="text-red-600 dark:text-red-400 font-medium hover:underline">
                {t.login}
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t.backToHome}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup
