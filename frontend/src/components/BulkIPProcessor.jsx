import React, { useState } from "react";
import Papa from "papaparse";

const BulkIPProcessor = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setLoading(true);

        Papa.parse(file, {
            header: true,
            complete: async (parsedData) => {
                const ipList = parsedData.data.map((row) => row.ip).filter(Boolean);

                const processedResults = [];

                for (const ip of ipList) {
                    try {
                        // Fetch IP location info
                        const locationRes = await fetch(`https://ipapi.co/${ip}/json/`);
                        const locationData = await locationRes.json();

                        const { latitude, longitude, city } = locationData;

                        // Fetch weather info (optional)
                        const weatherKey = "5118f8c98de942cc03b7b09cd041e9ae";
                        const weatherRes = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`
                        );

                        const weatherData = await weatherRes.json();

                        const result = {
                            ip,
                            city: city || "Unknown",
                            weather: weatherData.weather?.[0]?.main || "N/A",
                            temperature: weatherData.main?.temp || "N/A",
                        };

                        processedResults.push(result);
                    } catch (err) {
                        processedResults.push({ ip, city: "Error", weather: "Error", temperature: "Error" });
                    }
                }

                setResults(processedResults);
                setLoading(false);
            },
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Bulk IP Address Processor</h2>
            <input type="file" accept=".csv" onChange={handleCSVUpload} />

            {loading && <p className="mt-4">Processing IP addresses...</p>}

            {!loading && results.length > 0 && (
                <table className="table-auto mt-4 border w-full text-left">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">IP</th>
                            <th className="border px-4 py-2">City</th>
                            <th className="border px-4 py-2">Weather</th>
                            <th className="border px-4 py-2">Temp (°C)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border px-4 py-2">{item.ip}</td>
                                <td className="border px-4 py-2">{item.city}</td>
                                <td className="border px-4 py-2">{item.weather}</td>
                                <td className="border px-4 py-2">{item.temperature}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BulkIPProcessor;
