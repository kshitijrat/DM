import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DisasterChart from "../components/DisasterChart";
import WeatherInfo from "../components/WeatherInfo";
import SafeZoneMap from "../components/SafeZoneMap";
import InfoCard from "../components/InfoCard";

const DisasterAlerts = () => {
    const [dashboardData, setDashboardData] = useState({
        disastersDetected: null,
        avgIntensity: null,
        mostAffectedArea: null,
        weather: null,
        alertsToday: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch user's location from ipapi.co
                const locRes = await fetch("https://ipapi.co/json/");
                const locData = await locRes.json();

                const { latitude, longitude, city } = locData;

                const disasterData = {
                    disastersDetected: 32,
                    avgIntensity: "67%",
                    mostAffectedArea: city || "Unknown",
                    alertsToday: 12,
                };

                // Fetch weather based on user's location
                const apiKey ="";
                const weatherRes = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                );

                if (!weatherRes.ok) {
                    throw new Error("Weather API error");
                }

                const weatherData = await weatherRes.json();
                const weatherSummary = `${weatherData.weather[0].main}, ${weatherData.main.temp}°C`;

                setDashboardData({
                    ...disasterData,
                    weather: weatherSummary,
                });
            } catch (error) {
                console.error("Error fetching location/weather data:", error);
                setDashboardData((prev) => ({
                    ...prev,
                    weather: "Unavailable",
                    mostAffectedArea: "Unknown",
                }));
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800">Live Disaster Monitoring Dashboard</h1>
                <p className="text-gray-600 text-lg mt-2">Real-time insights and updates on disaster intensity, weather and safe zones.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8">
                {loading ? (
                    <p className="col-span-full text-center">Loading data...</p>
                ) : (
                    <>
                        <InfoCard title="Disasters Detected" value={dashboardData.disastersDetected} />
                        <InfoCard title="Avg. Intensity" value={dashboardData.avgIntensity} />
                        <InfoCard title="Most Affected" value={dashboardData.mostAffectedArea} />
                        <InfoCard title="Weather" value={dashboardData.weather} />
                        <InfoCard title="Alerts Today" value={dashboardData.alertsToday} />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-8">
                <DisasterChart />
                <WeatherInfo />
                <SafeZoneMap />
            </div>
        </div>
    );
};

export default DisasterAlerts;
