"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react"
import Navbar from "../components/Navbar"
import { toast } from "../components/ui/Toaster"
import { useAuth } from "../context/AuthContext";

const Login = ({ language, setLanguage }) => {
  const { setUser } = useAuth(); // useAuth hook must be called inside the component
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Translations
  const translations = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your account to continue",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot password?",
      loginButton: "Sign In",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      backToHome: "Back to home",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
      passwordShort: "Password must be at least 6 characters",
    },
  }

  const t = translations[language] || translations.en

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = t.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.emailInvalid
    }

    if (!password) {
      newErrors.password = t.passwordRequired
    } else if (password.length < 6) {
      newErrors.password = t.passwordShort
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await fetch("https://dm-backend-auge.onrender.com/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        credentials: "include", // for cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.message || "Login failed", "error");
        setLoading(false);
        return;
      }
      setUser(data.user);
      // localStorage.setItem("token", data.token);
      toast("Successfully logged in!", "success");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };


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
              <LogIn className="w-8 h-8" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{t.subtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.passwordLabel}
                </label>
                <a href="#" className="text-xs text-red-600 dark:text-red-400 hover:underline">
                  {t.forgotPassword}
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium transition-colors flex items-center justify-center"
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
                <LogIn className="w-4 h-4 mr-2" />
              )}
              {loading ? "Processing..." : t.loginButton}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.noAccount}{" "}
              <Link to="/signup" className="text-red-600 dark:text-red-400 font-medium hover:underline">
                {t.signUp}
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

export default Login
