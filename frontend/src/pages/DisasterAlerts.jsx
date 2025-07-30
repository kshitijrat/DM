"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import DisasterChart from "../components/DisasterChart"
import WeatherInfo from "../components/WeatherInfo"
import InfoCard from "../components/InfoCard"
import Typed from 'typed.js'
import SearchBar from "../components/SearchBar"
import FiveDayForecast from "../components/FiveDayForecast"
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
import Dumy_SafeZoneMap from "../testfiles/Dumy_SafeZoneMap"
import SafeZoneMap from "../components/SafeZoneMap"

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

  // New state: earthquakes & nearbyDisasters count
  const [earthquakes, setEarthquakes] = useState([])
  const [nearbyDisasters, setNearbyDisasters] = useState([])

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
      nearbyDisasterAlert: "Nearby Disaster Alert",
      noNearbyDisaster: "You are in safe zone",
    },
    hi: {
      // empty...
    },
  }
  const t = translations[language] || translations.en

  const [searchedCoordinates, setSearchedCoordinates] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedLocationDetails, setSearchedLocationDetails] = useState(null);

  // for search bar 
  const handleLocationSearch = async (locationName) => {
    if (!locationName.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(locationName)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setSearchedCoordinates({ latitude: lat, longitude: lon });

        // Save full address details from API response
        setSearchedLocationDetails(data[0].address);
        // toast(`Showing results for "${locationName}"`, "success");
      } else {
        setSearchedLocationDetails(null);
        toast("Location not found", "error");
      }
    } catch (error) {
      setSearchedLocationDetails(null);
      toast("Failed to fetch location", "error");
    }
  };



  // Sample disaster data (unchanged)
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

  useEffect(() => {
    const titles = {
      strings: ["Worldwide Disaster Info",
        "Real-time Safety Alerts",
        "24*7 Monitoring"],
      typeSpeed: 40,
    };
    const typed = new Typed('#title', titles);
    return () => {
      typed.destroy();
    }
  }, [])



  const subtitles = [
    t.subtitle,
    "Stay informed with latest disaster updates.",
    "Protect yourself with live alerts.",
    "Your safety, our priority.",
  ];

  // Helper: Calculate distance between two lat/lon points in km
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Update weather summary from WeatherInfo component
  const updateWeatherFromChild = (weatherData) => {
    const summary = `${weatherData.weather[0].main}, ${weatherData.main.temp}°C`
    setDashboardData((prev) => ({
      ...prev,
      weather: summary,
    }))
  }

  // Get user coordinates on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      toast("Geolocation not supported", "error")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      },
      (err) => {
        toast("Could not get your location", "error")
      }
    )
  }, [])

  // Fetch earthquake data & update dashboardData
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        )
        const data = await res.json()

        const earthquakeCount = data.features.length
        const mostRecent = data.features[0]?.properties?.place || "Unknown"

        setEarthquakes(data.features)

        // Calculate average magnitude from real data
        const magnitudes = data.features
          .map((quake) => quake.properties.mag)
          .filter((mag) => mag !== null && !isNaN(mag))

        const avgMag =
          magnitudes.reduce((sum, val) => sum + val, 0) / magnitudes.length || 0

        setDashboardData({
          disastersDetected: earthquakeCount,
          avgIntensity: avgMag.toFixed(4), // real average magnitude (e.g., 4.32)
          mostAffectedArea: mostRecent,
          weather: "loading...", // Will update later via WeatherInfo
          alertsToday: earthquakeCount,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error:", error)
        alert("Failed to fetch data. Please try again later.")
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


  // Whenever coordinates or earthquakes change, check for nearby disasters within 100 km
  useEffect(() => {
    if (!coordinates || earthquakes.length === 0) return

    const nearby = earthquakes.filter((quake) => {
      const [lon, lat] = quake.geometry.coordinates // USGS format: [lon, lat, depth]
      const distance = getDistanceFromLatLonInKm(
        coordinates.latitude,
        coordinates.longitude,
        lat,
        lon
      )
      return distance <= 100 // 100 km radius
    })

    setNearbyDisasters(nearby)
  }, [coordinates, earthquakes])

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {/* <Typewriter texts={titles} typingSpeed={20} deletingSpeed={15} pauseTime={50} /> */}
            <span id="title"></span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
            <span id="subtitle"></span>
            {/* <Typewriter texts={subtitles} typingSpeed={30} deletingSpeed={15} pauseTime={0} /> */}
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {t.loadingData}
                </p>
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
              <InfoCard
                title={t.avgIntensity}
                value={dashboardData.avgIntensity}
                icon={TrendingUp}
                color="orange"
              />
              <InfoCard
                title={t.mostAffected}
                value={dashboardData.mostAffectedArea}
                icon={MapPin}
                color="yellow"
              />
              <InfoCard
                title={t.alertsToday}
                value={dashboardData.alertsToday}
                icon={Bell}
                color="purple"
              />
              {/* New InfoCard for Nearby Disasters */}
              <InfoCard
                title={t.nearbyDisasterAlert}
                value={
                  nearbyDisasters.length > 0
                    ? `${nearbyDisasters.length} disaster(s) nearby!`
                    : t.noNearbyDisaster
                }
                icon={AlertTriangle}
                color={nearbyDisasters.length > 0 ? "red" : "green"}
              />
            </>
          )}
        </div>

        {/* Show text message for nearby disasters below cards */}
        {!loading && (
          <div
            className={`mb-8 text-center font-semibold text-lg ${nearbyDisasters.length > 0 ? "text-red-600" : "text-green-600"
              }`}
          >
            {nearbyDisasters.length > 0 ? (
              <>
                ⚠️ {nearbyDisasters.length} disaster(s) detected within 100 km of
                your location.
                <ul className="mt-2 list-disc list-inside text-sm max-w-md mx-auto text-gray-700 dark:text-gray-300">
                  {nearbyDisasters.map((quake) => (
                    <li key={quake.id}>
                      {quake.properties.place} — Magnitude: {quake.properties.mag}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              t.noNearbyDisaster
            )}
          </div>
        )}

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
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t.disasterTypes} (Dumy)
              </h2>
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
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {disaster.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {disaster.locations.join(", ")}
                        </p>
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

            {/* show real safe zone map  */}
            {showMap && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-20 z-1 bg-white dark:bg-gray-800 relative shadow-xl rounded-2xl p-6 overflow-hidden"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {t.safeZones}
                </h2>
                {/* Legend */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Safe Zone
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Unsafe Zone
                    </span>
                  </div>
                </div>
                <SafeZoneMap />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-20 z-1 bg-white border-2 dark:bg-gray-800 relative shadow-xl rounded-2xl p-6 overflow-hidden"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Dumy Map {t.safeZones}
              </h2>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Safe Zone
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Unsafe Zone
                  </span>
                </div>
              </div>

              {/* Map */}
              <Dumy_SafeZoneMap />
            </motion.div>
          </div>

          {/* Right Column - Weather and Details */}
          <div>
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t.weatherInfo}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t.currentLocation}:{" "}
                {coordinates
                  ? `${coordinates.latitude.toFixed(3)}, ${coordinates.longitude.toFixed(3)}`
                  : dashboardData.mostAffectedArea}
              </p>

              {/* Search Bar */}
              <SearchBar placeholder_input="Entr Specific City Name" onLocationFound={handleLocationSearch} />
              {/* Full Location Text */}
              {searchedLocationDetails && (
                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {[
                    searchedLocationDetails.city ||
                    searchedLocationDetails.town ||
                    searchedLocationDetails.village,
                    searchedLocationDetails.state,
                    searchedLocationDetails.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
              {/* weather card */}
              <WeatherInfo
                externalLat={searchedCoordinates?.latitude || coordinates?.latitude}
                externalLon={searchedCoordinates?.longitude || coordinates?.longitude}
                setExternalWeather={updateWeatherFromChild}
                language={language}
              />
              {/* Add this right below WeatherInfo */}
              {(searchedCoordinates?.latitude || coordinates?.latitude) && (
                <FiveDayForecast
                  lat={searchedCoordinates?.latitude || coordinates?.latitude}
                  lon={searchedCoordinates?.longitude || coordinates?.longitude}
                />
              )}
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
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {activeDisaster.name}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Affected Areas
                    </h3>
                    <p className="text-gray-800 dark:text-white">
                      {activeDisaster.locations.join(", ")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Severity
                    </h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                      <div
                        className={`bg-${activeDisaster.color}-500 h-2.5 rounded-full`}
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Safety Instructions
                    </h3>
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
