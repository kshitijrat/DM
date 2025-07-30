import { useEffect, useState } from "react";
import {
  TooltipProvider_cus,
  Tooltip_cus,
  TooltipTrigger_cus,
  TooltipContent_cus,
} from "../components/ui/tooltip"

const FiveDayForecast = ({ lat, lon }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=9cfd85c582df09ab769763b0095ed07c`
        );
        if (!res.ok) throw new Error("Failed to fetch forecast");
        const data = await res.json();
        setForecast(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchForecast();
  }, [lat, lon]);

  if (loading) return <p>Loading 5-day forecast...</p>;
  if (error) return <p>Error loading forecast: {error}</p>;
  if (!forecast) return null;

  const dailyForecasts = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <TooltipProvider_cus>
      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          5-Day Weather Forecast
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dailyForecasts.slice(0, 5).map((day) => (
            <Tooltip_cus key={day.dt} delayDuration={0}>
              <TooltipTrigger_cus asChild>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center cursor-pointer">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <img
                    alt={day.weather[0].description}
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    className="mx-auto"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {day.weather[0].main}
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">
                    {Math.round(day.main.temp)}°C
                  </p>
                </div>
              </TooltipTrigger_cus>
              <TooltipContent_cus side="bottom" className="w-64 p-3">
                <p><strong>Humidity:</strong> {day.main.humidity}%</p>
                <p><strong>Wind:</strong> {day.wind.speed} m/s</p>
                <p><strong>Pressure:</strong> {day.main.pressure} hPa</p>
                <p><strong>Feels like:</strong> {Math.round(day.main.feels_like)}°C</p>
                <p><strong>Description:</strong> {day.weather[0].description}</p>
              </TooltipContent_cus>
            </Tooltip_cus>
          ))}
        </div>
      </div>
    </TooltipProvider_cus>
  );
};

export default FiveDayForecast;
