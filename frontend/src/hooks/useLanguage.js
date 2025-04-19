"use client"

import { useState, useEffect } from "react"

export const useLanguage = (defaultLanguage = "en") => {
  const [language, setLanguage] = useState(defaultLanguage)

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)
  }

  return { language, changeLanguage }
}

export default useLanguage
