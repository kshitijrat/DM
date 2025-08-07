import { useContext, useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GeoContext } from "../context/GeoContext";

// User marker icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [35, 35],
});

// Center map on user's latest location once
const MoveToInitialPosition = () => {
  const { path } = useContext(GeoContext);
  const map = useMap();
  const [hasCentered, setHasCentered] = useState(false);

  useEffect(() => {
    if (!hasCentered && path.length > 0 && Array.isArray(path[path.length - 1])) {
      map.setView(path[path.length - 1], map.getZoom(), { animate: true });
      setHasCentered(true);
    }
  }, [path, map, hasCentered]);

  return null;
};

// Fullscreen Icon (SVG)
const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.75 9V5.25A1.5 1.5 0 015.25 3.75H9M15 3.75h3.75a1.5 1.5 0 011.5 1.5V9M20.25 15v3.75a1.5 1.5 0 01-1.5 1.5H15M9 20.25H5.25a1.5 1.5 0 01-1.5-1.5V15" />
  </svg>
);

// Exit Fullscreen Icon (SVG)
const ExitFullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 9L5.25 5.25M15 9l3.75-3.75M15 15l3.75 3.75M9 15l-3.75 3.75" />
  </svg>
);

const NavigationMap = () => {
  const defaultCenter = [23.1765, 75.7885];
  const { path } = useContext(GeoContext);
  const mapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (mapRef.current) {
        mapRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => {
      setTimeout(() => {
        setIsFullscreen(!!document.fullscreenElement);
      }, 100); // Add slight delay to allow DOM reflow
    };
    document.addEventListener("fullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, []);

  return (
    <div
      className="relative"
      style={{ height: "100vh", width: "100vw" }}
      ref={mapRef}
    >
      <MapContainer
        center={defaultCenter}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={path} color="blue" />

        {path.length > 0 && (
          <Marker position={path[path.length - 1]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        <MoveToInitialPosition />
      </MapContainer>

      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-120 z-[999] bg-black/60 text-white p-2 rounded-md hover:bg-black/80 transition duration-200"
        aria-label="Toggle fullscreen"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        style={{ pointerEvents: "auto" }}
      >
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </button>
    </div>
  );
};

export default NavigationMap;
