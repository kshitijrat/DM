import { useContext, useEffect } from "react";
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

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [35, 35],
});

// Helper component to move map view to latest location
const MoveToLatestPosition = () => {
  const { path } = useContext(GeoContext);
  const map = useMap();

  useEffect(() => {
    if (
      map &&
      Array.isArray(path) &&
      path.length > 0 &&
      Array.isArray(path[path.length - 1])
    ) {
      map.setView(path[path.length - 1], map.getZoom(), { animate: true });
    }
  }, [path, map]);

  return null;
};



const NavigationMap = () => {
  const defaultCenter = [23.1765, 75.7885];
  const { path } = useContext(GeoContext);

  return (
    <div className="p-1 bg-gray-50 dark:bg-[#0d1117] border-none">
      <p className="text-sm dark:text-gray-50 p-1">
        This map tracks your path from the starting location to your current position in real-time, helping you navigate and find your way easily.
      </p>
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

        <Polyline positions={path} color="blue" />

        {path.length > 0 && (
          <Marker position={path[path.length - 1]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        <MoveToLatestPosition />
      </MapContainer>
    </div>
  );
};

export default NavigationMap;
