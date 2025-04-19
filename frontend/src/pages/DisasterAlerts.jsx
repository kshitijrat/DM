import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DisasterChart from "../components/DisasterChart";
import WeatherInfo from "../components/WeatherInfo";
import SafeZoneMap from "../components/SafeZoneMap";
import InfoCard from "../components/InfoCard";
import Dumy_SafeZoneMap from "../testfiles/Dumy_SafeZoneMap";

const DisasterAlerts = () => {
    const [dashboardData, setDashboardData] = useState({
        disastersDetected: null,
        avgIntensity: null,
        mostAffectedArea: null,
        weather: null,
        alertsToday: null,
    });
    const [coordinates, setCoordinates] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateWeatherFromChild = (weatherData) => {
        const summary = `${weatherData.weather[0].main}, ${weatherData.main.temp}°C`;
        setDashboardData((prev) => ({
            ...prev,
            weather: summary,
        }));
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const locRes = await fetch("https://ipapi.co/json/");
                const locData = await locRes.json();

                let { latitude, longitude, city } = locData;

                if (!latitude || !longitude || window.location.hostname === "localhost") {
                    latitude = 23.2599;
                    longitude = 77.4126;
                    city = "Bhopal";
                }

                setCoordinates({ latitude, longitude });

                setDashboardData((prev) => ({
                    ...prev,
                    disastersDetected: 32,
                    avgIntensity: "67%",
                    mostAffectedArea: city,
                    alertsToday: 12,
                }));
            } catch (error) {
                console.error("Location error:", error);
                setDashboardData({
                    disastersDetected: 0,
                    avgIntensity: "N/A",
                    mostAffectedArea: "Unknown",
                    weather: "Unavailable",
                    alertsToday: 0,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
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
                <WeatherInfo
                    externalLat={coordinates?.latitude}
                    externalLon={coordinates?.longitude}
                    setExternalWeather={updateWeatherFromChild}
                />
                <SafeZoneMap />
                <Dumy_SafeZoneMap />
            </div>
        </div>
    );
};

export default DisasterAlerts;
