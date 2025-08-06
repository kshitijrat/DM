import { useEffect, useState } from "react";
import {
  TooltipProvider_cus,
  Tooltip_cus,
  TooltipTrigger_cus,
  TooltipContent_cus,
} from "../components/ui/tooltip";

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

  // ✅ Group forecast data by date
  const groupForecastsByDay = (list) => {
    const grouped = {};

    list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
    });

    // Return array of daily summaries
    return Object.entries(grouped).map(([date, entries]) => {
      const temps = entries.map(e => e.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);

      return {
        date,
        maxTemp,
        minTemp,
        weather: entries[0].weather[0],
        humidity: entries[0].main.humidity,
        wind: entries[0].wind.speed,
        pressure: entries[0].main.pressure,
        feels_like: entries[0].main.feels_like,
      };
    }).slice(0, 5); // Only keep 5 days
  };

  const dailyForecasts = groupForecastsByDay(forecast.list);

  return (
    <TooltipProvider_cus>
      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          5-Day Weather Forecast
        </h3>
        <div className="flex overflow-x-auto space-x-3 pb-2">
          {dailyForecasts.map((day) => (
            <Tooltip_cus key={day.date} delayDuration={0}>
              <TooltipTrigger_cus asChild>
                <div className="min-w-[120px] bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center cursor-pointer flex-shrink-0">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <img
                    alt={day.weather.description}
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                    className="mx-auto"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {day.weather.main}
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                    H: {Math.round(day.maxTemp)}°C | L: {Math.round(day.minTemp)}°C
                  </p>
                </div>
              </TooltipTrigger_cus>
              <TooltipContent_cus side="bottom" className="w-64 p-3">
                <p><strong>Humidity:</strong> {day.humidity}%</p>
                <p><strong>Wind:</strong> {day.wind} m/s</p>
                <p><strong>Pressure:</strong> {day.pressure} hPa</p>
                <p><strong>Feels like:</strong> {Math.round(day.feels_like)}°C</p>
                <p><strong>Description:</strong> {day.weather.description}</p>
              </TooltipContent_cus>
            </Tooltip_cus>
          ))}
        </div>
      </div>
    </TooltipProvider_cus>
  );
};

export default FiveDayForecast;
