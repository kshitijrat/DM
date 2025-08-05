"use client"

import { useEffect, useState, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine"

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

// Dummy data
const dummyLocation = { lat: 26.85, lon: 80.95 } // Lucknow approx
const dummySafeZones = [
  { lat: 27.0, lon: 81.1, name: { city: "Barabanki" }, temp: 28, windSpeed: 10 },
  { lat: 26.7, lon: 81.3, name: { city: "Unnao" }, temp: 30, windSpeed: 8 },
]
const dummyUnsafeZones = [
  { lat: 26.9, lon: 80.7, name: { city: "Sitapur" }, temp: 29, windSpeed: 35 },
  { lat: 26.75, lon: 80.85, name: { city: "Hardoi" }, temp: 27, windSpeed: 40 },
]
const dummyEarthquakes = [
  { id: 1, mag: 5.4, lat: 26.8, lon: 81.0 },
  { id: 2, mag: 4.8, lat: 27.1, lon: 80.8 },
]

const Dummy_SafeZoneMap = () => {
  const [showRoute, setShowRoute] = useState(false)

  return (
    <div>
      <div className="mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded">
        Dummy Safe Zone Map (Hardcoded data with real route)
      </div>

      <MapContainer
        center={[dummyLocation.lat, dummyLocation.lon]}
        zoom={9}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={[dummyLocation.lat, dummyLocation.lon]}>
          <Popup>You are here (Dummy Location)</Popup>
        </Marker>

        {dummySafeZones.map((zone, i) => (
          <Marker
            key={`safe-${i}`}
            position={[zone.lat, zone.lon]}
            icon={L.divIcon({
              className: "safe-marker",
              html: `<div style="background:green;border-radius:50%;width:16px;height:16px;"></div>`,
            })}
          >
            <Popup>
              {zone.name.city}, {zone.temp}&deg;C
              <br />
              Wind: {zone.windSpeed} m/s
            </Popup>
          </Marker>
        ))}

        {dummyUnsafeZones.map((zone, i) => (
          <Marker
            key={`unsafe-${i}`}
            position={[zone.lat, zone.lon]}
            icon={L.divIcon({
              className: "unsafe-marker",
              html: `<div style="background:red;border-radius:50%;width:16px;height:16px;"></div>`,
            })}
          >
            <Popup>
              {zone.name.city}, {zone.temp}&deg;C
              <br />
              Wind: {zone.windSpeed} m/s
            </Popup>
          </Marker>
        ))}

        {dummyEarthquakes.map((eq) => (
          <Marker
            key={`eq-${eq.id}`}
            position={[eq.lat, eq.lon]}
            icon={L.divIcon({
              className: "eq-marker",
              html: `<div style="background:red; border-radius:50%; width:16px; height:16px;" title="Magnitude: ${eq.mag}"></div>`,
            })}
          >
            <Popup>Magnitude: {eq.mag}</Popup>
          </Marker>
        ))}

        {showRoute && (
          <RoutingControl
            from={{ lat: dummyLocation.lat, lon: dummyLocation.lon }}
            to={{ lat: dummySafeZones[0].lat, lon: dummySafeZones[0].lon }}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default Dummy_SafeZoneMap