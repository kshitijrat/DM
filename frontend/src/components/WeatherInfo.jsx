import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  CloudRain,
  Sunrise,
  Sunset,
  Cloud,
} from "lucide-react"

const WeatherInfo = ({ externalLat, externalLon, setExternalWeather, language }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [weatherFetched, setWeatherFetched] = useState(false)

  // ✅ Memoized Translations
  const translations = useMemo(() => ({
    en: {
      title: "Current Weather",
      location: "Location",
      temperature: "Temperature",
      feelsLike: "Feels Like",
      humidity: "Humidity",
      pressure: "Pressure",
      condition: "Condition",
      windSpeed: "Wind Speed",
      windDirection: "Wind Direction",
      cloudiness: "Cloudiness",
      sunrise: "Sunrise",
      sunset: "Sunset",
      loading: "Loading weather...",
      error: "Failed to fetch weather data.",
      permissionDenied: "Permission denied or location unavailable.",
      notSupported: "Geolocation not supported by this browser.",
    },
    hi: {
      title: "वर्तमान मौसम",
      location: "स्थान",
      temperature: "तापमान",
      feelsLike: "अनुभव",
      humidity: "आर्द्रता",
      pressure: "दबाव",
      condition: "स्थिति",
      windSpeed: "हवा की गति",
      windDirection: "हवा की दिशा",
      cloudiness: "बादल",
      sunrise: "सूर्योदय",
      sunset: "सूर्यास्त",
      loading: "मौसम लोड हो रहा है...",
      error: "मौसम डेटा प्राप्त करने में विफल।",
      permissionDenied: "अनुमति अस्वीकृत या स्थान अनुपलब्ध।",
      notSupported: "इस ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।",
    },
  }), [])

  const t = useMemo(() => translations[language] || translations.en, [language, translations])

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=9cfd85c582df09ab769763b0095ed07c`,
        )
        setWeather(response.data)
        setWeatherFetched(true)
        if (setExternalWeather) setExternalWeather(response.data)
      } catch (err) {
        setError(t.error)
      } finally {
        setLoading(false)
      }
    }

    if (externalLat != null && externalLon != null) {
      fetchWeather(externalLat, externalLon)
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
        () => {
          setError(t.permissionDenied)
          setLoading(false)
        },
      )
    } else {
      setError(t.notSupported)
      setLoading(false)
    }
  }, [externalLat, externalLon, setExternalWeather, language])

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  }

  if (!weatherFetched && loading) {
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

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {weather && (
        <>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{weather.name}</h3>
                <p className="text-lg">{weather.weather[0].description}</p>
                <p className="text-3xl font-bold mt-2">{Math.round(weather.main.temp)}°C</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                  className="w-20 h-20"
                />
                <p className="text-sm">{weather.weather[0].main}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4">
            <WeatherItem
              icon={<Thermometer className="w-5 h-5 text-red-500" />}
              label={t.feelsLike}
              value={`${Math.round(weather.main.feels_like)}°C`}
            />
            <WeatherItem
              icon={<Droplets className="w-5 h-5 text-blue-500" />}
              label={t.humidity}
              value={`${weather.main.humidity}%`}
            />
            <WeatherItem
              icon={<Gauge className="w-5 h-5 text-purple-500" />}
              label={t.pressure}
              value={`${weather.main.pressure} hPa`}
            />
            <WeatherItem
              icon={<Wind className="w-5 h-5 text-cyan-500" />}
              label={t.windSpeed}
              value={`${weather.wind.speed} m/s`}
            />
            <WeatherItem
              icon={<CloudRain className="w-5 h-5 text-gray-500" />}
              label={t.windDirection}
              value={`${weather.wind.deg}° (${getWindDirection(weather.wind.deg)})`}
            />
            <WeatherItem
              icon={<Cloud className="w-5 h-5 text-gray-500" />}
              label={t.cloudiness}
              value={`${weather.clouds.all}%`}
            />
            <WeatherItem
              icon={<Sunrise className="w-5 h-5 text-yellow-500" />}
              label={t.sunrise}
              value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            />
            <WeatherItem
              icon={<Sunset className="w-5 h-5 text-orange-500" />}
              label={t.sunset}
              value={new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            />
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
