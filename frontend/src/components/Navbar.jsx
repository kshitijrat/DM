"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, AlertTriangle, Search, HandHeart, LogIn, UserPlus, Menu, X, Globe, Bell, Moon, Sun } from "lucide-react"

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
              <AlertTriangle className="relative w-8 h-8 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              DisasterAlert
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              isActive={isActive("/")}
              icon={<Home size={18} />}
              label="Home"
            />
            <NavLink
              to="/disaster-alerts"
              isActive={isActive("/disaster-alerts")}
              icon={<AlertTriangle size={18} />}
              label="Alerts"
            />
            <NavLink
              to="/seek-resources"
              isActive={isActive("/seek-resources")}
              icon={<Search size={18} />}
              label="Seek Help"
            />
            <NavLink
              to="/provide-resources"
              isActive={isActive("/provide-resources")}
              icon={<HandHeart size={18} />}
              label="Provide Help"
            />
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language selector */}
            

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
            </button>

            {/* Notification */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <Bell size={18} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                3
              </span>
            </button>

            {/* Auth buttons */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1"
            >
              <LogIn size={16} />
              <span>
                Login
              </span>
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-colors flex items-center space-x-1"
            >
              <UserPlus size={16} />
              <span>
                Sign Up
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          <MobileNavLink
            to="/"
            isActive={isActive("/")}
            icon={<Home size={18} />}
            label="Home"
            onClick={() => setIsOpen(false)}
          />
          <MobileNavLink
            to="/disaster-alerts"
            isActive={isActive("/disaster-alerts")}
            icon={<AlertTriangle size={18} />}
            label="Alerts"
            onClick={() => setIsOpen(false)}
          />
          <MobileNavLink
            to="/seek-resources"
            isActive={isActive("/seek-resources")}
            icon={<Search size={18} />}
            label="Seek Help"
            onClick={() => setIsOpen(false)}
          />
          <MobileNavLink
            to="/provide-resources"
            isActive={isActive("/provide-resources")}
            icon={<HandHeart size={18} />}
            label="Provide Help"
            onClick={() => setIsOpen(false)}
          />

          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center space-x-4">
                {/* Language selector */}
                {/* temporary i removed this  */}

                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? (
                    <Sun size={18} className="text-yellow-400" />
                  ) : (
                    <Moon size={18} className="text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>

              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm flex items-center space-x-1"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={14} />
                  <span>
                    Login
                  </span>
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-colors text-sm flex items-center space-x-1"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus size={14} />
                  <span>
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Desktop navigation link
const NavLink = ({ to, isActive, icon, label }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
      isActive
        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
)

// Mobile navigation link
const MobileNavLink = ({ to, isActive, icon, label, onClick }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
      isActive
        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
)

export default Navbar
