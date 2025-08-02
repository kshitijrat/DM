import React, { useEffect, useState } from "react";
import axios from "axios";

const DisasterFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data & cache
  useEffect(() => {
    const fetchDisasters = async () => {
      const cached = localStorage.getItem("disaster_events");
      if (cached) {
        setEvents(JSON.parse(cached));
        setLoading(false);
      } else {
        try {
          const res = await axios.get("https://eonet.gsfc.nasa.gov/api/v3/events");
          const recentEvents = res.data.events
            .filter((event) => event.geometry && event.geometry.length > 0)
            .slice(0, 10);
          localStorage.setItem("disaster_events", JSON.stringify(recentEvents));
          setEvents(recentEvents);
        } catch (error) {
          console.error("Failed to fetch disaster data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDisasters();
  }, []);

  // Change image every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [events]);

  if (loading) {
    return <div className="text-center text-blue-500 p-6 text-lg">Loading Images...</div>;
  }

  if (!events.length) {
    return <div className="text-center text-red-500 p-6 text-lg">No disaster data available.</div>;
  }

  const event = events[currentIndex];
  const coords = event.geometry[0]?.coordinates;
  const lat = coords?.[1];
  const lon = coords?.[0];

  const imageUrl = `https://tiles.maps.eox.at/wms?service=WMS&request=GetMap&layers=s2cloudless&bbox=${lon - 0.5},${lat - 0.5},${lon + 0.5},${lat + 0.5}&width=800&height=400&srs=EPSG:4326&format=image/jpeg`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full object-cover transition-all duration-500 max-h-[200px] sm:max-h-[100px] md:max-h-[200px]"
        />

        <small className="text-center text-xs text-gray-500 dark:text-gray-400 italic mt-2">
          This is a recent satellite image from the affected area.
        </small>

        <div className="p-1 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {event.categories?.[0]?.title || "Unknown Category"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {event.geometry[0]?.date?.slice(0, 10) || "Unknown Date"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisasterFeed;
