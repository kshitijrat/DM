import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// React Icons
import { FaMapMarkedAlt, FaTimes } from 'react-icons/fa'; // Importing icons

// Routing Component
const NavigationMap = ({ showMap }) => {
  const map = useMap();

  useEffect(() => {
    if (!showMap) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(23.1765, 75.7885), // Start
        L.latLng(23.1800, 75.7900), // End
      ],
      routeWhileDragging: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl); // Cleanup to avoid duplicates
    };
  }, [showMap, map]);

  return null;
};

// Main Component
const MapIcon = () => {
  const [showMap, setShowMap] = useState(false);
  const [mapSize, setMapSize] = useState(300); // Default size is 300px

  const handleClick = () => {
    setShowMap(!showMap);
  };

  const handleSizeChange = (e) => {
    setMapSize(e.target.value); // Update map size based on slider input
  };

  return (
    <div>
      {/* Toggle Button (Map ↔️ Close) */}
      <button
        onClick={handleClick}
        className={`fixed bottom-10 right-10 p-4 ${
          showMap ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-full z-30 shadow-md text-xl transition-all`}
      >
        {showMap ? <FaTimes /> : <FaMapMarkedAlt />} {/* Using React Icon here */}
      </button>

      {/* Custom Map Size Slider */}
      {showMap && (
        <div className="fixed bottom-4 right-25 p-2 bg-gray-200 rounded-lg z-20">
          <label htmlFor="mapSize" className="block text-sm mb-2 text-gray-700">
            Adjust Map Size:
          </label>
          <input
            id="mapSize"
            type="range"
            min="200"
            max="700"
            value={mapSize}
            onChange={handleSizeChange}
            className="w-full"
          />
          <span className="text-sm">{mapSize}px</span>
        </div>
      )}

      {/* Map Container */}
      {showMap && (
        <div
          className="fixed z-50 bottom-29 right-10 border bg-white shadow-lg transition-all"
          style={{
            width: `${mapSize}px`,
            height: `${(mapSize * 0.66)}px`, // Adjust height based on width ratio (1:1.5)
            maxHeight: 'calc(100vh - 150px)', // Prevent map from going under navbar (150px is an arbitrary value for navbar height)
          }}
        >
          <MapContainer
            center={[23.1765, 75.7885]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[23.1765, 75.7885]}>
              <Popup>You are here</Popup>
            </Marker>
            <NavigationMap showMap={showMap} />
            <ZoomControl position="topright" />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default MapIcon;
