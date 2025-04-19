"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DisasterAlerts from "./pages/DisasterAlerts"
import SeekResources from "./pages/SeekResources"
import ProvideResources from "./pages/ProvideResources"
import ModernNavbar from "./components/ModernNavbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

const App = () => {
  const [language, setLanguage] = useState("en")

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <ModernNavbar onLanguageChange={handleLanguageChange} />
        <div className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/disaster-alerts" element={<DisasterAlerts />} />
            <Route path="/seek-resources" element={<SeekResources />} />
            <Route path="/provide-resources" element={<ProvideResources />} />
          </Routes>
        </div>
        <Footer language={language} />
      </div>
    </Router>
  )
}

export default App
