// hooks/useGeoTracker.js
import { useEffect, useRef, useState } from "react";

const useGeoTracker = () => {
  const [path, setPath] = useState([]);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPoint = [latitude, longitude];
        setPath((prevPath) => [...prevPath, newPoint]);
      },
      (err) => {
        console.error("Geo error:", err);
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
  }, []);

  return path;
};

export default useGeoTracker;
