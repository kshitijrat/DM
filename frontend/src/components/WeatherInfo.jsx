import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=5118f8c98de942cc03b7b09cd041e9ae&q=India`
            );
            setWeather(response.data);
        };
        fetchWeather();
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Current Weather</h2>
            {weather ? (
                <div>
                    <p className="text-gray-600">Location: {weather.location.name}</p>
                    <p className="text-gray-600">Temperature: {weather.current.temp_c}°C</p>
                    <p className="text-gray-600">Condition: {weather.current.condition.text}</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
};

export default WeatherInfo;
