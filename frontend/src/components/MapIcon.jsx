import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

import { FaMap, FaTimes } from 'react-icons/fa'; // Map icon, Close icon

// Routing logic
const NavigationRoute = ({ active }) => {
  const map = useMap();

  useEffect(() => {
    if (!active) return;

    const routing = L.Routing.control({
      waypoints: [
        L.latLng(23.1765, 75.7885),
        L.latLng(23.1800, 75.7900),
      ],
      show: false,
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(routing);
  }, [active, map]);

  return null;
};

const MapIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mapSize, setMapSize] = useState(320); // Base size for desktop

  const toggleMap = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMap}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-xl text-white transition-all ${
          isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaMap size={20} />}
      </button>

      {/* Map Size Slider (Optional UI Tweak) */}
      {isOpen && (
        <div className="fixed bottom-[105px] right-6 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg z-40 w-60">
          <label htmlFor="mapSize" className="block text-sm mb-2 font-medium text-gray-700 dark:text-gray-300">
            Map Size
          </label>
          <input
            id="mapSize"
            type="range"
            min="200"
            max="600"
            value={mapSize}
            onChange={(e) => setMapSize(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-right text-gray-600 dark:text-gray-400 mt-1">{mapSize}px</div>
        </div>
      )}

      {/* Floating Map Container */}
      {isOpen && (
        <div
          className="fixed bottom-[105px] right-6 bg-white border rounded-xl overflow-hidden z-40 shadow-xl transition-all"
          style={{
            width: `${mapSize}px`,
            height: `${mapSize * 0.65}px`,
            maxWidth: '90vw',
            maxHeight: '60vh',
          }}
        >
          <MapContainer
            center={[23.1765, 75.7885]}
            zoom={14}
            scrollWheelZoom={false}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
            dragging={true}
            doubleClickZoom={false}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[23.1765, 75.7885]}>
              <Popup>You are here</Popup>
            </Marker>
            <NavigationRoute active={isOpen} />
            <ZoomControl position="topright" />
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default MapIcon;
