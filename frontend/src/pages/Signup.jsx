"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, UserPlus, ArrowLeft, AlertTriangle } from "lucide-react"
import Navbar from "../components/Navbar"
import { toast } from "../components/ui/Toaster"
import { useAuth } from "../context/AuthContext"

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
  const { user, setUser } = useAuth();

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

    try {
      const res = await fetch("https://dm-backend-auge.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.message || "Signup failed", "error");
        setLoading(false);
        return;
      }

      

      // ✅ Now auto-login
      const loginRes = await fetch("https://dm-backend-auge.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important for cookies!
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        toast("Signup succeeded but auto-login failed", "error");
        setLoading(false);
        return;
      }

      // ✅ Set user in context (optional: implement user context if needed)
      setUser(loginData.user);

      localStorage.setItem("token", data.token);
      toast("Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117]">
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
