import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const DisasterChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "Disaster Intensity", data: [], borderColor: "red", fill: false }]
    });

    useEffect(() => {
        const updateData = () => {
            setChartData((prevData) => ({
                labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(-10),
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: [...prevData.datasets[0].data, Math.random() * 100].slice(-10),
                    }
                ]
            }));
        };

        const interval = setInterval(updateData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Disaster Intensity Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default DisasterChart;
