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
import { Tooltip_cus, TooltipContent_cus, TooltipProvider_cus, TooltipTrigger_cus, } from "../components/ui/tooltip"

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
      update: "Data updates every minutes",
      yAxis: "Intensity (Mw)",
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
      update: "डेटा हर 2 मिनट में USGS भूचाल्क एपीआई से अपडेट होता है।",
      yAxis: "तीव्रता (Mw)",
      xAxis: "समय",
      tooltip: "तीव्रता",
    },
  }

  const t = translations[language] || translations.en

  const calculateAvgMagnitude = (features) => {
    const mags = features
      .map((f) => f.properties.mag)
      .filter((mag) => mag !== null && !isNaN(mag))
    if (mags.length === 0) return 0
    const sum = mags.reduce((acc, val) => acc + val, 0)
    return sum / mags.length
  }

  useEffect(() => {
    let intervalId

    const fetchAndUpdate = async () => {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        )
        const data = await res.json()

        const avgMag = calculateAvgMagnitude(data.features)

        const currentTime = new Date().toLocaleTimeString()

        const diff = avgMag - prevIntensity.current
        setTrend(diff)
        prevIntensity.current = avgMag

        setCurrentIntensity(avgMag.toFixed(2))
        setChartData((prev) => ({
          labels: [...prev.labels, currentTime].slice(-12),
          datasets: [
            {
              ...prev.datasets[0],
              data: [...prev.datasets[0].data, avgMag].slice(-12),
            },
          ],
        }))
      } catch (error) {
        console.error("Failed to fetch earthquake data:", error)
      }
    }

    fetchAndUpdate()
    intervalId = setInterval(fetchAndUpdate, 6000)
    return () => clearInterval(intervalId)
  }, [])

  const getTrendIcon = () => {
    if (trend > 0.05) {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (trend < -0.05) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    } else {
      return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendText = () => {
    if (trend > 0.05) {
      return t.increasing;
    } else if (trend < -0.05) {
      return t.decreasing;
    } else {
      return t.stable;
    }
  };

  const getTrendColor = () => {
    if (trend > 0.05) {
      return "text-green-500";
    } else if (trend < -0.05) {
      return "text-red-500";
    } else {
      return "text-gray-400";
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${t.tooltip}: ${context.parsed.y} Mw`;
          }
        }
      }
    },
    scales: {
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
        },
        grid: {
          color: "rgba(243, 244, 246, 0.8)",
        },
      },
      y: {
        min: 0,
        max: 10,
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
      }
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">{t.title}</h2>
        <TooltipProvider_cus>
          <Tooltip_cus delayDuration={0}>
            <TooltipTrigger_cus asChild>
              <div className="flex items-center space-x-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full cursor-pointer">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">{currentIntensity} Mw</span>
              </div>
            </TooltipTrigger_cus>
            <TooltipContent_cus side="bottom">
              Moment Magnitude (Earthquake Strength)
            </TooltipContent_cus>
          </Tooltip_cus>
        </TooltipProvider_cus>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.intensity}</p>
          <div className="flex items-end mt-1">
            <h3 className="text-3xl font-bold">{currentIntensity} Mw</h3>
            <div className="ml-2 mb-1 flex items-center">
              {getTrendIcon()}
              <span className={`text-xs ml-1 ${getTrendColor()}`}>{getTrendText()}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentIntensity / 10) * 100}%` }}
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
            <span className="text-xs text-gray-500 dark:text-gray-400">0 Mw</span>
            <div className="flex-1 mx-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="relative w-full h-full">
                <div
                  className="absolute top-0 bottom-0 w-1 bg-red-500 rounded-full transition-all duration-300"
                  style={{ left: `${(currentIntensity / 10) * 100}%`, transform: "translateX(-50%)" }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">10 Mw</span>
          </div>
        </div>
      </div>

      <div className="h-64 md:h-80">
        <Line ref={chartRef} data={chartData} options={{
          ...options,
          scales: {
            y: {
              min: 0,
              max: 10,
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
            x: options.scales.x,
          }
        }} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">{t.update}</p>
    </motion.div>
  )
}

export default DisasterChart
