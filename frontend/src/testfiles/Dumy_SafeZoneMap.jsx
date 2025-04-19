"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react"

// Leaflet default marker fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const Dumy_SafeZoneMap = () => {
  const [status, setStatus] = useState("Simulating disaster condition...")
  const [location, setLocation] = useState({ lat: 23.2599, lon: 77.4126 }) // Bhopal, MP
  const [safeZones, setSafeZones] = useState([])
  const [unsafeZones, setUnsafeZones] = useState([])

  useEffect(() => {
    // Simulated weather zones
    const dummySafeZones = [
      {
        name: { city: "Indore" },
        lat: 22.7196,
        lon: 75.8577,
        temp: 28,
        windSpeed: 4,
      },
      {
        name: { city: "Ujjain" },
        lat: 23.1793,
        lon: 75.7849,
        temp: 29,
        windSpeed: 3,
      },
    ]

    const dummyUnsafeZones = [
      {
        name: { city: "Hoshangabad" },
        lat: 22.7533,
        lon: 77.7225,
        temp: 25,
        windSpeed: 35,
      },
      {
        name: { city: "Vidisha" },
        lat: 23.5251,
        lon: 77.8061,
        temp: 26,
        windSpeed: 40,
      },
    ]

    setSafeZones(dummySafeZones)
    setUnsafeZones(dummyUnsafeZones)
    setStatus("⚠️ Disaster Alert: Nearby safe and unsafe zones identified!")
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">🧪 Dummy Disaster Simulation</h2>
      <div className="mb-3 p-2 bg-yellow-100 border border-yellow-400 rounded">{status}</div>

      <MapContainer center={[location.lat, location.lon]} zoom={8} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Current simulated location */}
        <Marker position={[location.lat, location.lon]}>
          <Popup>You are here (Bhopal)</Popup>
        </Marker>

        {/* Safe Zones (🟢) */}
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
              {zone.name.city}, {zone.temp}°C
              <br />
              Wind: {zone.windSpeed} m/s
            </Popup>
          </Marker>
        ))}

        {/* Unsafe Zones (🔴) */}
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
              {zone.name.city}, {zone.temp}°C
              <br />
              Wind: {zone.windSpeed} m/s
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Dumy_SafeZoneMap
