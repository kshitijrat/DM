"use client"

import { useEffect, useRef } from "react"

const DisasterMap = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20, lng: 78 },
      zoom: 5,
    })

    const markers = [
      { lat: 28.6139, lng: 77.209, title: "Flood in Delhi" },
      { lat: 19.076, lng: 72.8777, title: "Earthquake in Mumbai" },
      { lat: 12.9716, lng: 77.5946, title: "Cyclone near Bangalore" },
    ]

    markers.forEach(({ lat, lng, title }) => {
      new window.google.maps.Marker({ position: { lat, lng }, map, title })
    })
  }, [])

  return <div ref={mapRef} className="w-full h-96 rounded-lg shadow-lg"></div>
}

export default DisasterMap
