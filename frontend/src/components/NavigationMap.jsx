import { useEffect, useRef, useState } from "react";
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

// User marker icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [35, 35],
});

// Live tracker logic inside this helper component
const TrackerLogic = ({ setPath }) => {
  const map = useMap();
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPoint = [latitude, longitude];

        setPath((prevPath) => [...prevPath, newPoint]);

        map.setView(newPoint, map.getZoom());
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [map, setPath]);

  return null;
};

// Main LivePathTracker (without useMap directly)
const LivePathTracker = () => {
  const [path, setPath] = useState([]);

  return (
    <>
      <TrackerLogic setPath={setPath} />

      {/* Draw path */}
      <Polyline positions={path} color="blue" />

      {/* Show current marker */}
      {path.length > 0 && (
        <Marker position={path[path.length - 1]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </>
  );
};

const NavigationMap = () => {
  const defaultCenter = [23.1765, 75.7885];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LivePathTracker />
    </MapContainer>
  );
};

export default NavigationMap;
