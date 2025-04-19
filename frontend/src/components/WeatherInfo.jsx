// WeatherInfo.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ externalLat, externalLon, setExternalWeather }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=9cfd85c582df09ab769763b0095ed07c`
                );
                setWeather(response.data);
                if (setExternalWeather) {
                    setExternalWeather(response.data); // send to parent
                }
            } catch (err) {
                setError("Failed to fetch weather data.");
            }
        };

        if (externalLat && externalLon) {
            fetchWeather(externalLat, externalLon);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
                () => setError("Permission denied or location unavailable.")
            );
        } else {
            setError("Geolocation not supported by this browser.");
        }
    }, [externalLat, externalLon, setExternalWeather]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Current Weather</h2>
            {error && <p className="text-red-500">{error}</p>}
            {weather ? (
                <div>
                    <p className="text-gray-600">Location: {weather.name}</p>
                    <p className="text-gray-600">Temperature: {weather.main.temp}°C</p>
                    <p className="text-gray-600">Feels Like: {weather.main.feels_like}°C</p>
                    <p className="text-gray-600">Humidity: {weather.main.humidity}%</p>
                    <p className="text-gray-600">Pressure: {weather.main.pressure} hPa</p>
                    <p className="text-gray-600">Condition: {weather.weather[0].description}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather-icon" />
                    <p className="text-gray-600">Wind Speed: {weather.wind.speed} m/s</p>
                    <p className="text-gray-600">Wind Direction: {weather.wind.deg}°</p>
                    <p className="text-gray-600">Cloudiness: {weather.clouds.all}%</p>
                    <p className="text-gray-600">Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p className="text-gray-600">Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
            ) : (
                !error && <p>Loading weather...</p>
            )}
        </div>
    );
};

export default WeatherInfo;
