"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { AlertTriangle, Home, Bell, Users, Package, LogIn, UserPlus, Menu, X } from "lucide-react"

const translations = {
  en: {
    home: "Home",
    alerts: "Disaster Alerts",
    seek: "Seek Resources",
    provide: "Provide Resources",
    login: "Login",
    signup: "Sign Up",
  }
}

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const t = translations.en

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: t.home, path: "/", icon: <Home size={18} /> },
    { name: t.alerts, path: "/disaster-alerts", icon: <Bell size={18} /> },
    { name: t.seek, path: "/seek-resources", icon: <Users size={18} /> },
    { name: t.provide, path: "/provide-resources", icon: <Package size={18} /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              DisasterAlert
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                  isActive(link.path) ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100 hover:text-red-500"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogIn size={18} />
              <span>{t.login}</span>
            </Link>

            <Link
              to="/signup"
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-colors"
            >
              <UserPlus size={18} />
              <span>{t.signup}</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-red-500 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mt-2 animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md ${
                  isActive(link.path) ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="flex-1 flex justify-center items-center space-x-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              >
                <LogIn size={18} />
                <span>{t.login}</span>
              </Link>

              <Link
                to="/signup"
                className="flex-1 flex justify-center items-center space-x-1 px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white"
              >
                <UserPlus size={18} />
                <span>{t.signup}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default ModernNavbar
