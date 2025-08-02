"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const apiKey = "9cfd85c582df09ab769763b0095ed07c" // Your OpenWeather API key

const isDisaster = (weather) => {
  const disasterWindThreshold = 30
  const disasterRainThreshold = 50
  const wind = weather.wind.speed
  const rain = weather.rain?.["1h"] || 0
  return wind > disasterWindThreshold || rain > disasterRainThreshold
}

const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    )
    return response.data
  } catch (err) {
    return null
  }
}

const fetchLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    return response.data.address || {}
  } catch (err) {
    return {}
  }
}

const checkNearbyAreas = async (lat, lon) => {
  const deltas = [0.05, 0.1, -0.05, -0.1]
  const safe = []
  const unsafe = []

  for (const deltaLat of deltas) {
    for (const deltaLon of deltas) {
      const newLat = lat + deltaLat
      const newLon = lon + deltaLon

      const weather = await fetchWeather(newLat, newLon)
      if (!weather) continue

      const areaName = await fetchLocationName(newLat, newLon)
      const zoneData = {
        name: areaName,
        lat: newLat,
        lon: newLon,
        windSpeed: weather.wind.speed,
        rain: weather.rain?.["1h"] || 0,
        temp: weather.main.temp,
        description: weather.weather[0].description,
      }

      if (isDisaster(weather)) {
        unsafe.push(zoneData)
      } else {
        safe.push(zoneData)
      }
    }
  }

  return { safe, unsafe }
}

const SafeZoneMap = () => {
  const [status, setStatus] = useState("Checking safety...")
  const [location, setLocation] = useState(null)
  const [safeZones, setSafeZones] = useState([])
  const [unsafeZones, setUnsafeZones] = useState([])
  const [currentLocationName, setCurrentLocationName] = useState({})

  useEffect(() => {
    const determineSafety = async () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation not supported.")
        return
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords
          setLocation({ lat: latitude, lon: longitude })

          const currentLocation = await fetchLocationName(latitude, longitude)
          setCurrentLocationName(currentLocation)

          const currentWeather = await fetchWeather(latitude, longitude)

          if (currentWeather && !isDisaster(currentWeather)) {
            setStatus("You are in a safe zone.")
          } else {
            setStatus("Disaster conditions detected. Searching for safe zones nearby...")
            const { safe, unsafe } = await checkNearbyAreas(latitude, longitude)
            setSafeZones(safe)
            setUnsafeZones(unsafe)

            if (safe.length > 0) {
              setStatus("Safest zones found nearby:")
            } else {
              setStatus("No safe zones found nearby during disaster.")
            }
          }
        },
        () => setStatus("Permission denied or location unavailable."),
      )
    }

    determineSafety()
  }, [])

  return (
    <div>
      <div className="mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded">{status}</div>

      {location && (
        <MapContainer center={[location.lat, location.lon]} zoom={8} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Current location */}
          <Marker position={[location.lat, location.lon]}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Safe Zones */}
          {safeZones.map((zone, i) => (
            <Marker
              key={`safe-${i}`}
              position={[zone.lat, zone.lon]}
              icon={L.divIcon({
                className: "safe-marker",
                html: `<div style="background:green;border-radius:50%;width:16px;height:16px;"></div>`,
              })}
            >
              <Popup>
                {zone.name.city || "Unknown"}, {zone.temp}°C
                <br />
                Wind: {zone.windSpeed} m/s
              </Popup>
            </Marker>
          ))}

          {/* Unsafe Zones */}
          {unsafeZones.map((zone, i) => (
            <Marker
              key={`unsafe-${i}`}
              position={[zone.lat, zone.lon]}
              icon={L.divIcon({
                className: "unsafe-marker",
                html: `<div style="background:red;border-radius:50%;width:16px;height:16px;"></div>`,
              })}
            >
              <Popup>
                {zone.name.city || "Unknown"}, {zone.temp}°C
                <br />
                Wind: {zone.windSpeed} m/s
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

export default SafeZoneMap
