import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Filler,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend);

const DisasterChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Disaster Intensity",
                data: [],
                borderColor: "rgba(255, 0, 0, 0.8)",
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointBackgroundColor: "rgba(255, 0, 0, 0.9)",
            },
        ],
    });

    useEffect(() => {
        const updateData = () => {
            const currentTime = new Date().toLocaleTimeString();
            const newValue = Math.floor(Math.random() * 100); // Replace this with real disaster data

            setChartData((prev) => ({
                labels: [...prev.labels, currentTime].slice(-10),
                datasets: [
                    {
                        ...prev.datasets[0],
                        data: [...prev.datasets[0].data, newValue].slice(-10),
                    },
                ],
            }));
        };

        const interval = setInterval(updateData, 2000);
        return () => clearInterval(interval);
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#333",
                    font: { size: 14 },
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (context) => `Intensity: ${context.parsed.y.toFixed(1)}`
                }
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: "Intensity (%)",
                    color: "#666",
                    font: { size: 12 },
                },
                ticks: {
                    color: "#444"
                },
                grid: {
                    color: "rgba(200,200,200,0.2)"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Time",
                    color: "#666",
                    font: { size: 12 },
                },
                ticks: {
                    color: "#444"
                },
                grid: {
                    color: "rgba(200,200,200,0.1)"
                }
            },
        },
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">
                🌪️ Real-time Disaster Intensity
            </h2>
            <Line data={chartData} options={options} />
            <p className="text-sm text-gray-500 mt-2 text-center">
                Data updates every 2 seconds. Intensity is simulated.
            </p>
        </div>
    );
};

export default DisasterChart;
