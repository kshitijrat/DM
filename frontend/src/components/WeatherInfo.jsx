import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import {
  Thermometer, Droplets, Wind, Gauge, CloudRain,
  Sunrise, Sunset, Cloud
} from "lucide-react"

const WeatherInfo = ({ externalLat, externalLon, externalLocationName, language }) => {
  const [forecast, setForecast] = useState(null)  // store 5-day forecast
  const [selectedDate, setSelectedDate] = useState(null) // date string 'YYYY-MM-DD'
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  const translations = useMemo(() => ({
    en: {
      title: "Weather Forecast",
      selectDay: "Select Day",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      pressure: "Pressure",
      condition: "Condition",
      windSpeed: "Wind Speed",
      windDirection: "Wind Direction",
      cloudiness: "Cloudiness",
      loading: "Loading weather...",
      error: "Failed to fetch weather data.",
      permissionDenied: "Permission denied or location unavailable.",
      notSupported: "Geolocation not supported by this browser.",
      today: "Today",
      tomorrow: "Tomorrow"
    },
    hi: {
      title: "मौसम पूर्वानुमान",
      selectDay: "दिन चुनें",
      feelsLike: "अनुभव",
      humidity: "आर्द्रता",
      pressure: "दबाव",
      condition: "स्थिति",
      windSpeed: "हवा की गति",
      windDirection: "हवा की दिशा",
      cloudiness: "बादल",
      loading: "मौसम लोड हो रहा है...",
      error: "मौसम डेटा प्राप्त करने में विफल।",
      permissionDenied: "अनुमति अस्वीकृत या स्थान अनुपलब्ध।",
      notSupported: "इस ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।",
      today: "आज",
      tomorrow: "कल"
    },
  }), [])

  const t = useMemo(() => translations[language] || translations.en, [language, translations])

  useEffect(() => {
    const isCurrentlyOnline = navigator.onLine
    setIsOnline(isCurrentlyOnline)

    const fetchForecast = async (lat, lon) => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=9cfd85c582df09ab769763b0095ed07c`
        )
        setForecast(response.data)
        // Set default selected date as first date available
        if (response.data && response.data.list.length > 0) {
          const firstDate = response.data.list[0].dt_txt.split(" ")[0]
          setSelectedDate(firstDate)
        }
      } catch (err) {
        setError(t.error)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const fetchFromName = async (locationName) => {
      setLoading(true)
      try {
        const geo = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=9cfd85c582df09ab769763b0095ed07c`
        )
        if (geo.data && geo.data.length > 0) {
          const { lat, lon } = geo.data[0]
          fetchForecast(lat, lon)
        } else {
          setError("Location not found")
          setLoading(false)
        }
      } catch (err) {
        setError("Failed to geocode location")
        setLoading(false)
      }
    }

    if (isCurrentlyOnline) {
      if (externalLat != null && externalLon != null) {
        fetchForecast(externalLat, externalLon)
      } else if (externalLocationName) {
        fetchFromName(externalLocationName)
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => fetchForecast(coords.latitude, coords.longitude),
          () => {
            setError(t.permissionDenied)
            setLoading(false)
          }
        )
      } else {
        setError(t.notSupported)
        setLoading(false)
      }
    } else {
      setError("Offline mode not supported for forecast")
      setLoading(false)
    }
  }, [externalLat, externalLon, externalLocationName, language])

  // Helper to get wind direction from degrees
  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  }

  // Group forecast items by date
  const dailyForecasts = useMemo(() => {
    if (!forecast) return {}

    return forecast.list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0]
      if (!acc[date]) acc[date] = []
      acc[date].push(item)
      return acc
    }, {})
  }, [forecast])

  // Pick one item to display for selectedDate (e.g. midday forecast or closest to 12:00:00)
  const selectedDayForecast = useMemo(() => {
    if (!selectedDate || !dailyForecasts[selectedDate]) return null
    // Try to find 12:00:00 forecast
    const middayForecast = dailyForecasts[selectedDate].find(i => i.dt_txt.includes("12:00:00"))
    return middayForecast || dailyForecasts[selectedDate][0]
  }, [selectedDate, dailyForecasts])

  const { maxTemp, minTemp } = useMemo(() => {
    if (!selectedDate || !dailyForecasts[selectedDate]) return { maxTemp: null, minTemp: null }
    const temps = dailyForecasts[selectedDate].map(i => i.main.temp)
    return {
      maxTemp: Math.max(...temps),
      minTemp: Math.min(...temps),
    }
  }, [selectedDate, dailyForecasts])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  // Format date label for dropdown (Today, Tomorrow, or weekday)
  const formatDateLabel = (dateStr, index) => {
    const today = new Date()
    const date = new Date(dateStr)
    const diffDays = Math.floor((date - today) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return t.today
    if (diffDays === 1) return t.tomorrow

    return date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        <label htmlFor="day-select" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">{t.selectDay}:</label>
        <select
          id="day-select"
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {Object.keys(dailyForecasts).map((dateStr, idx) => (
            <option key={dateStr} value={dateStr}>
              {formatDateLabel(dateStr, idx)}
            </option>
          ))}
        </select>
      </div>

      {selectedDayForecast && (
        <>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{forecast.city.name} {isOnline ? "🌐" : "📴"}</h3>
                <p className="text-lg capitalize">{selectedDayForecast.weather[0].description}</p>
                <p className="text-3xl font-bold mt-2">
                  {Math.round(selectedDayForecast.main.temp)}°C
                </p>
                <p className="text-sm mt-1">
                  <span className="text-green-100">H: {Math.round(maxTemp)}°C</span> |{" "}
                  <span className="text-blue-100">L: {Math.round(minTemp)}°C</span>
                </p>
                {/* <p className="text-sm mt-1">
                  Forecast Time: {new Date(selectedDayForecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p> */} 


              </div>
              <div className="flex flex-col items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${selectedDayForecast.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  className="w-20 h-20"
                />
                <p className="text-sm capitalize">{selectedDayForecast.weather[0].main}</p>

              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4">
            <WeatherItem icon={<Thermometer className="w-5 h-5 text-red-500" />} label={t.feelsLike} value={`${Math.round(selectedDayForecast.main.feels_like)}°C`} />
            <WeatherItem icon={<Droplets className="w-5 h-5 text-blue-500" />} label={t.humidity} value={`${selectedDayForecast.main.humidity}%`} />
            <WeatherItem icon={<Gauge className="w-5 h-5 text-purple-500" />} label={t.pressure} value={`${selectedDayForecast.main.pressure} hPa`} />
            <WeatherItem icon={<Wind className="w-5 h-5 text-cyan-500" />} label={t.windSpeed} value={`${selectedDayForecast.wind.speed} m/s`} />
            <WeatherItem icon={<CloudRain className="w-5 h-5 text-gray-500" />} label={t.windDirection} value={`${selectedDayForecast.wind.deg}° (${getWindDirection(selectedDayForecast.wind.deg)})`} />
            <WeatherItem icon={<Cloud className="w-5 h-5 text-gray-500" />} label={t.cloudiness} value={`${selectedDayForecast.clouds.all}%`} />
            {/* Sunrise & sunset are not available in forecast data, only current weather data */}
          </div>
        </>
      )}
    </motion.div>
  )
}

const WeatherItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  </div>
)

export default WeatherInfo
