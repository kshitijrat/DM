"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import DisasterChart from "../components/DisasterChart"
import WeatherInfo from "../components/WeatherInfo"
import InfoCard from "../components/InfoCard"
import {
  AlertTriangle,
  Thermometer,
  MapPin,
  Bell,
  TrendingUp,
  Wind,
  Droplets,
  Waves,
  Flame,
  Mountain,
} from "lucide-react"
import { toast } from "../components/ui/Toaster"

const DisasterAlerts = ({ language, setLanguage }) => {
  const [dashboardData, setDashboardData] = useState({
    disastersDetected: null,
    avgIntensity: null,
    mostAffectedArea: null,
    weather: null,
    alertsToday: null,
  })
  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeDisaster, setActiveDisaster] = useState(null)
  const [showMap, setShowMap] = useState(false)

  // Translations
  const translations = {
    en: {
      title: "Live Disaster Monitoring Dashboard",
      subtitle: "Real-time insights and updates on disaster intensity, weather and safe zones.",
      disastersDetected: "Disasters Detected",
      avgIntensity: "Avg. Intensity",
      mostAffected: "Most Affected",
      weather: "Weather",
      alertsToday: "Alerts Today",
      recentDisasters: "Recent Disasters",
      safeZones: "Safe Zones",
      viewDetails: "View Details",
      disasterTypes: "Disaster Types",
      floodWarning: "Flood Warning",
      earthquakeAlert: "Earthquake Alert",
      cycloneWarning: "Cyclone Warning",
      fireAlert: "Fire Alert",
      tsunamiWarning: "Tsunami Warning",
      loadingData: "Loading data...",
      viewMap: "View Map",
      hideMap: "Hide Map",
      weatherInfo: "Weather Information",
      currentLocation: "Current Location",
    },
    hi: {
      title: "लाइव आपदा निगरानी डैशबोर्ड",
      subtitle: "आपदा तीव्रता, मौसम और सुरक्षित क्षेत्रों पर रीयल-टाइम अंतर्दृष्टि और अपडेट।",
      disastersDetected: "पता लगाई गई आपदाएं",
      avgIntensity: "औसत तीव्रता",
      mostAffected: "सबसे अधिक प्रभावित",
      weather: "मौसम",
      alertsToday: "आज के अलर्ट",
      recentDisasters: "हाल की आपदाएं",
      safeZones: "सुरक्षित क्षेत्र",
      viewDetails: "विवरण देखें",
      disasterTypes: "आपदा प्रकार",
      floodWarning: "बाढ़ चेतावनी",
      earthquakeAlert: "भूकंप अलर्ट",
      cycloneWarning: "चक्रवात चेतावनी",
      fireAlert: "आग अलर्ट",
      tsunamiWarning: "सुनामी चेतावनी",
      loadingData: "डेटा लोड हो रहा है...",
      viewMap: "मानचित्र देखें",
      hideMap: "मानचित्र छिपाएं",
      weatherInfo: "मौसम की जानकारी",
      currentLocation: "वर्तमान स्थान",
    },
  }

  const t = translations[language] || translations.en

  // Sample disaster data
  const disasterTypes = [
    {
      id: 1,
      type: "flood",
      name: t.floodWarning,
      icon: Droplets,
      color: "blue",
      locations: ["Delhi", "Mumbai", "Chennai"],
    },
    {
      id: 2,
      type: "earthquake",
      name: t.earthquakeAlert,
      icon: Mountain,
      color: "yellow",
      locations: ["Shimla", "Dehradun", "Gangtok"],
    },
    {
      id: 3,
      type: "cyclone",
      name: t.cycloneWarning,
      icon: Wind,
      color: "purple",
      locations: ["Kolkata", "Bhubaneswar", "Visakhapatnam"],
    },
    {
      id: 4,
      type: "fire",
      name: t.fireAlert,
      icon: Flame,
      color: "red",
      locations: ["Uttarakhand", "Madhya Pradesh", "Karnataka"],
    },
    {
      id: 5,
      type: "tsunami",
      name: t.tsunamiWarning,
      icon: Waves,
      color: "green",
      locations: ["Andaman", "Kerala", "Tamil Nadu"],
    },
  ]

  const updateWeatherFromChild = (weatherData) => {
    const summary = `${weatherData.weather[0].main}, ${weatherData.main.temp}°C`
    setDashboardData((prev) => ({
      ...prev,
      weather: summary,
    }))
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setCoordinates({ latitude: 23.2599, longitude: 77.4126 })

          setDashboardData({
            disastersDetected: 32,
            avgIntensity: "67%",
            mostAffectedArea: "Bhopal",
            weather: "Loading...",
            alertsToday: 12,
          })

          setLoading(false)

          // Show alert notification
          setTimeout(() => {
            toast("⚠️ New flood warning detected in Mumbai region!", "warning")
          }, 3000)
        }, 1500)
      } catch (error) {
        console.error("Error:", error)
        setDashboardData({
          disastersDetected: 0,
          avgIntensity: "N/A",
          mostAffectedArea: "Unknown",
          weather: "Unavailable",
          alertsToday: 0,
        })
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleDisasterClick = (disaster) => {
    setActiveDisaster(disaster)
    toast(`${disaster.name} details loaded`, "info")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Navbar />

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

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{t.loadingData}</p>
              </div>
            </div>
          ) : (
            <>
              <InfoCard
                title={t.disastersDetected}
                value={dashboardData.disastersDetected}
                icon={AlertTriangle}
                color="red"
              />
              <InfoCard title={t.avgIntensity} value={dashboardData.avgIntensity} icon={TrendingUp} color="orange" />
              <InfoCard title={t.mostAffected} value={dashboardData.mostAffectedArea} icon={MapPin} color="yellow" />
              <InfoCard title={t.weather} value={dashboardData.weather} icon={Thermometer} color="blue" />
              <InfoCard title={t.alertsToday} value={dashboardData.alertsToday} icon={Bell} color="purple" />
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <DisasterChart language={language} />

            {/* Disaster Types */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t.disasterTypes}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {disasterTypes.map((disaster) => (
                  <motion.div
                    key={disaster.id}
                    className={`p-4 rounded-xl border border-${disaster.color}-200 dark:border-${disaster.color}-900/30 bg-${disaster.color}-50 dark:bg-${disaster.color}-900/10 cursor-pointer transition-all duration-300 hover:shadow-md`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleDisasterClick(disaster)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-full bg-${disaster.color}-100 dark:bg-${disaster.color}-900/20 mr-4`}
                      >
                        <disaster.icon
                          className={`w-6 h-6 text-${disaster.color}-500 dark:text-${disaster.color}-400`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">{disaster.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{disaster.locations.join(", ")}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map Toggle Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowMap(!showMap)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-colors"
              >
                {showMap ? t.hideMap : t.viewMap}
              </button>
            </div>

            {/* Map (conditionally rendered) */}
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 overflow-hidden"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t.safeZones}</h2>
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Map loading...</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Weather and Details */}
          <div>
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t.weatherInfo}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t.currentLocation}: {dashboardData.mostAffectedArea}
              </p>
              <WeatherInfo
                externalLat={coordinates?.latitude}
                externalLon={coordinates?.longitude}
                setExternalWeather={updateWeatherFromChild}
                language={language}
              />
            </motion.div>

            {/* Active Disaster Details */}
            {activeDisaster && (
              <motion.div
                className={`mt-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border-l-4 border-${activeDisaster.color}-500`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full bg-${activeDisaster.color}-100 dark:bg-${activeDisaster.color}-900/20 mr-4`}
                  >
                    <activeDisaster.icon
                      className={`w-6 h-6 text-${activeDisaster.color}-500 dark:text-${activeDisaster.color}-400`}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{activeDisaster.name}</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Affected Areas</h3>
                    <p className="text-gray-800 dark:text-white">{activeDisaster.locations.join(", ")}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Severity</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                      <div
                        className={`bg-${activeDisaster.color}-500 h-2.5 rounded-full`}
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Safety Instructions</h3>
                    <ul className="list-disc list-inside text-gray-800 dark:text-white text-sm mt-1 space-y-1">
                      <li>Stay informed through official channels</li>
                      <li>Prepare emergency supplies</li>
                      <li>Follow evacuation orders if issued</li>
                      <li>Check on vulnerable neighbors</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisasterAlerts
