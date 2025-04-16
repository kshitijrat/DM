import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "9cfd85c582df09ab769763b0095ed07c"; // Your OpenWeather API key

// Define disaster conditions (for testing purposes)
const isDisaster = (weather) => {
    // Disaster simulation: Extremely high wind speed and heavy rain
    const disasterWindThreshold = 30; // m/s (disaster wind speed)
    const disasterRainThreshold = 50; // mm/h (disaster rain level)
    const wind = weather.wind.speed;
    const rain = weather.rain?.["1h"] || 0;

    return wind > disasterWindThreshold || rain > disasterRainThreshold;
};

const fetchWeather = async (lat, lon) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        return response.data;
    } catch (err) {
        return null;
    }
};

// Reverse geocoding to get location name (using Nominatim API)
const fetchLocationName = async (lat, lon) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        return response.data.address || {};
    } catch (err) {
        return {};
    }
};

const checkNearbyAreas = async (lat, lon) => {
    const deltas = [0.05, 0.1, 0.15, 0.2]; // Latitude and longitude deltas to check nearby areas
    const nearbyAreas = [];

    for (let deltaLat of deltas) {
        for (let deltaLon of deltas) {
            // Check nearby locations by modifying lat and lon within a 40 km range
            const newLat = lat + deltaLat;
            const newLon = lon + deltaLon;

            const weather = await fetchWeather(newLat, newLon);
            console.log(`Weather for lat: ${newLat}, lon: ${newLon}: `, weather);

            if (weather && !isDisaster(weather)) { // Only return safe zones, avoid disaster zones
                const areaName = await fetchLocationName(newLat, newLon);
                nearbyAreas.push({
                    name: areaName,
                    lat: newLat,
                    lon: newLon,
                    windSpeed: weather.wind.speed,
                    rain: weather.rain?.["1h"] || 0,
                    temp: weather.main.temp,
                    description: weather.weather[0].description,
                });
            }
        }
    }
    console.log('Nearby safe zones: ', nearbyAreas); // Log to see the safe zones found
    return nearbyAreas;
};

const SafeZoneMap = () => {
    const [status, setStatus] = useState("Checking safety...");
    const [location, setLocation] = useState(null);
    const [safeZones, setSafeZones] = useState([]);
    const [currentLocationName, setCurrentLocationName] = useState({});
    
    useEffect(() => {
        const determineSafety = async () => {
            if (!navigator.geolocation) {
                setStatus("Geolocation not supported.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                    const { latitude, longitude } = coords;
                    setLocation({ lat: latitude, lon: longitude });

                    // Fetch the current location's name
                    const currentLocation = await fetchLocationName(latitude, longitude);
                    setCurrentLocationName(currentLocation);
                    console.log("current location info: ", currentLocation);

                    // First, fetch weather for the current location
                    const currentWeather = await fetchWeather(latitude, longitude);
                    if (currentWeather && !isDisaster(currentWeather)) {
                        setStatus("You are in a safe zone.");
                    } else {
                        setStatus("Disaster conditions detected. Searching for safe zones nearby...");
                        const nearbyAreas = await checkNearbyAreas(latitude, longitude);
                        if (nearbyAreas.length > 0) {
                            setSafeZones(nearbyAreas);
                            setStatus("Safest zones found nearby:");
                        } else {
                            setStatus("No safe zones found nearby during disaster.");
                        }
                    }
                },
                () => setStatus("Permission denied or location unavailable.")
            );
        };

        determineSafety();
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Safe Zone Status</h2>
            <p className="text-gray-600 mb-4">{status}</p>

            {location && (
                <div className="text-sm text-gray-500">
                    <strong>Current Location: </strong>
                    {/* Displaying the current location name */}
                    {currentLocationName ? (
                        <div>
                            <p>Amenity: {currentLocationName?.amenity}</p>
                            <p>Road: {currentLocationName?.road}</p>
                            <p>City: {currentLocationName?.city}</p>
                            <p>District: {currentLocationName?.city_district}</p>
                            <p>State: {currentLocationName?.state}</p>
                            <p>Country: {currentLocationName?.country}</p>
                        </div>
                    ) : (
                        <p>Location not found</p>
                    )}
                    <p>
                        Coordinates: {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                    </p>
                </div>
            )}

            {safeZones.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-gray-700">Nearby Safe Zones:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {safeZones.map((zone, index) => (
                            <li key={index}>
                                {zone.name} (Lat: {zone.lat.toFixed(2)}, Lon: {zone.lon.toFixed(2)}) - 
                                Temp: {zone.temp}°C, Wind: {zone.windSpeed} m/s, Rain: {zone.rain} mm/h
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SafeZoneMap;
