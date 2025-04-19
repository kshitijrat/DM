"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

const LanguageSwitcher = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
  ]

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage")
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage)
      if (onLanguageChange) onLanguageChange(savedLanguage)
    }
  }, [onLanguageChange])

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode)
    localStorage.setItem("preferredLanguage", langCode)
    if (onLanguageChange) onLanguageChange(langCode)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <Globe size={20} />
        <span className="hidden md:inline">{languages.find((l) => l.code === selectedLanguage)?.name}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedLanguage === lang.code ? "bg-red-50 text-red-500" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
