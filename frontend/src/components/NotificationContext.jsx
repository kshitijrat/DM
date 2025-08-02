import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // State for user location
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback coordinates (Delhi)
          setLocation({ lat: 28.6139, lon: 77.2090 });
        }
      );
    } else {
      console.error("Geolocation not supported");
      // Fallback coordinates (Delhi)
      setLocation({ lat: 28.6139, lon: 77.2090 });
    }
  }, []);

  useEffect(() => {
    if (location.lat === null || location.lon === null) return; // Wait for location

    const fetchDisasterData = async () => {
  try {
    const weatherApiKey = "9cfd85c582df09ab769763b0095ed07c";

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${weatherApiKey}`;
    const reliefUrl = `https://api.reliefweb.int/v1/disasters?limit=5&sort=-date`;
    const quakeUrl = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`;

    const [weatherRes, reliefRes, quakeRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(reliefUrl),
      fetch(quakeUrl),
    ]);

    const weather = await weatherRes.json();
    const relief = await reliefRes.json();
    const quake = await quakeRes.json();

    // Weather alert details
    if (weather.alert) {
      const { event, description, sender_name, start, end } = weather.alert;
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `Weather Alert: ${event} from ${sender_name}. ${description.slice(0, 80)}...`,
          type: "weather",
          timestamp: new Date(),
          read: false,
        },
      ]);
    }

    // Recent disasters from ReliefWeb
    if (relief.data && relief.data.length > 0) {
      relief.data.forEach((disaster) => {
        const type = disaster.fields?.type?.name || "Disaster";
        const locationName = disaster.fields?.country?.name || disaster.fields?.location?.name || "Unknown Location";
        const date = disaster.fields?.date || "";
        const name = disaster.fields?.name || "";
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            message: `${type} in ${locationName}: ${name}`,
            type: "disaster",
            timestamp: new Date(date),
            read: false,
          },
        ]);
      });
    }

    // Recent earthquakes
    if (quake.features && quake.features.length > 0) {
      quake.features.forEach((quakeItem) => {
        const mag = quakeItem.properties.mag;
        const place = quakeItem.properties.place;
        const time = quakeItem.properties.time;
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            message: `Earthquake: M${mag} near ${place}`,
            type: "earthquake",
            timestamp: new Date(time),
            read: false,
          },
        ]);
      });
    }

  } catch (err) {
    console.error("Error checking for alerts", err);
  }
};


    fetchDisasterData();

    const interval = setInterval(fetchDisasterData, 30000);
    return () => clearInterval(interval);

  }, [location.lat, location.lon]);


  useEffect(() => {
    const socket = io("http://localhost:5000"); // backend URL

    socket.on("newSensorData", (data) => {
      setNotifications((prev) => [
        ...prev,
        { ...data, id: Date.now(), read: false },
      ]);
    });

    return () => socket.disconnect();
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
