"use client"

import { useEffect, useState, useRef } from "react"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend)

const DisasterChart = ({ language }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Disaster Intensity",
        data: [],
        borderColor: "rgba(239, 68, 68, 0.8)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: "rgba(239, 68, 68, 0.9)",
      },
    ],
  })

  const [currentIntensity, setCurrentIntensity] = useState(0)
  const [trend, setTrend] = useState(0)
  const prevIntensity = useRef(0)
  const chartRef = useRef(null)

  const translations = {
    en: {
      title: "🌪️ Real-time Disaster Intensity",
      intensity: "Current Intensity",
      trend: "Trend",
      increasing: "Increasing",
      decreasing: "Decreasing",
      stable: "Stable",
      update: "Data updates every 2 seconds. Intensity is simulated.",
      yAxis: "Intensity (%)",
      xAxis: "Time",
      tooltip: "Intensity",
    },
    hi: {
      title: "🌪️ रीयल-टाइम आपदा तीव्रता",
      intensity: "वर्तमान तीव्रता",
      trend: "प्रवृत्ति",
      increasing: "बढ़ रही है",
      decreasing: "घट रही है",
      stable: "स्थिर",
      update: "डेटा हर 2 सेकंड में अपडेट होता है। तीव्रता सिमुलेटेड है।",
      yAxis: "तीव्रता (%)",
      xAxis: "समय",
      tooltip: "तीव्रता",
    },
  }

  const t = translations[language] || translations.en

  useEffect(() => {
    const updateData = () => {
      const currentTime = new Date().toLocaleTimeString()
      // More realistic disaster data simulation with some patterns
      const baseValue = Math.sin(Date.now() / 10000) * 30 + 50 // Oscillating base
      const noise = Math.random() * 15 - 7.5 // Random noise
      const newValue = Math.max(0, Math.min(100, baseValue + noise)) // Keep between 0-100

      setCurrentIntensity(Math.round(newValue))

      // Calculate trend
      const diff = newValue - prevIntensity.current
      setTrend(diff)
      prevIntensity.current = newValue

      setChartData((prev) => ({
        labels: [...prev.labels, currentTime].slice(-12),
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, newValue].slice(-12),
          },
        ],
      }))
    }

    const interval = setInterval(updateData, 2000)
    return () => clearInterval(interval)
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#6B7280",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => `${t.tooltip}: ${context.parsed.y.toFixed(1)}%`,
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: t.yAxis,
          color: "#6B7280",
          font: { size: 12, weight: "bold" },
        },
        ticks: {
          color: "#6B7280",
          font: { size: 11 },
        },
        grid: {
          color: "rgba(243, 244, 246, 0.8)",
        },
      },
      x: {
        title: {
          display: true,
          text: t.xAxis,
          color: "#6B7280",
          font: { size: 12, weight: "bold" },
        },
        ticks: {
          color: "#6B7280",
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(243, 244, 246, 0.4)",
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
    },
  }

  const getTrendIcon = () => {
    if (trend > 1) return <ArrowUpRight className="w-5 h-5 text-red-500" />
    if (trend < -1) return <ArrowDownRight className="w-5 h-5 text-green-500" />
    return <TrendingUp className="w-5 h-5 text-yellow-500" />
  }

  const getTrendText = () => {
    if (trend > 1) return t.increasing
    if (trend < -1) return t.decreasing
    return t.stable
  }

  const getTrendColor = () => {
    if (trend > 1) return "text-red-500"
    if (trend < -1) return "text-green-500"
    return "text-yellow-500"
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">{t.title}</h2>
        <div className="flex items-center space-x-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">{currentIntensity}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.intensity}</p>
          <div className="flex items-end mt-1">
            <h3 className="text-3xl font-bold">{currentIntensity}%</h3>
            <div className="ml-2 mb-1 flex items-center">
              {getTrendIcon()}
              <span className={`text-xs ml-1 ${getTrendColor()}`}>{getTrendText()}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${currentIntensity}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.trend}</p>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`text-lg font-bold ${getTrendColor()}`}>{getTrendText()}</div>
            {getTrendIcon()}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">0%</span>
            <div className="flex-1 mx-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="relative w-full h-full">
                <div
                  className="absolute top-0 bottom-0 w-1 bg-red-500 rounded-full transition-all duration-300"
                  style={{ left: `${currentIntensity}%`, transform: "translateX(-50%)" }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">100%</span>
          </div>
        </div>
      </div>

      <div className="h-64 md:h-80">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">{t.update}</p>
    </motion.div>
  )
}

export default DisasterChart
