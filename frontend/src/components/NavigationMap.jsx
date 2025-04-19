import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Helper component to handle routing
const Routing = () => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(23.1765, 75.7885), // start
        L.latLng(23.1800, 75.7900), // end
      ],
      routeWhileDragging: false,
      show: false,
    }).addTo(map);

    // Cleanup on component unmount
    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
};

const NavigationMap = () => {
  return (
    <MapContainer center={[23.1765, 75.7885]} zoom={13} style={{ height: "100px", width: "50%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[23.1765, 75.7885]}>
        <Popup>You're Here</Popup>
      </Marker>

      {/* Route Display */}
      <Routing />
    </MapContainer>
  );
};

export default NavigationMap;
