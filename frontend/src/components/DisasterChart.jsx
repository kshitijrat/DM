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
import {
  Tooltip_cus,
  TooltipContent_cus,
  TooltipProvider_cus,
  TooltipTrigger_cus,
} from "../components/ui/tooltip"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend)

const DisasterChart = ({ language, coordinates = null, locationName = "" }) => {

  // //Debugging: console log props received
  useEffect(() => {
    console.log("DisasterChart props - locationName:", locationName);
    console.log("DisasterChart props - coordinates:", coordinates);
  }, [locationName, coordinates]);


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
  const [alertInfo, setAlertInfo] = useState({ level: "No alert", action: "Ignore", icon: "" })
  const [trend, setTrend] = useState(0)
  const prevIntensity = useRef(0)
  const chartRef = useRef(null)
  const [localCoordinates, setLocalCoordinates] = useState(null);
  const [currLocationName, setcurrLocationName] = useState("");




  const translations = {
    en: {
      title: "🌪️ Predicted Earthquake Intensity",
      intensity: "Current Intensity",
      trend: "Trend",
      increasing: "Increasing",
      decreasing: "Decreasing",
      stable: "Stable",
      update: "Data updates every 6 seconds from USGS Earthquake API",
      yAxis: "Intensity (Mw)",
      xAxis: "Time",
      tooltip: "Intensity",
      alertLevel: "Alert Level",
      action: "Recommended Action"
    },
  }

  const t = translations[language] || translations.en

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const calculateAvgMagnitude = (features, coords = null) => {
    const filtered = coords
      ? features.filter((f) => {
        const [lon, lat] = f.geometry.coordinates
        const distance = getDistanceFromLatLonInKm(coords.latitude, coords.longitude, lat, lon)
        return distance <= 100
      })
      : features

    const mags = filtered.map((f) => f.properties.mag).filter((mag) => mag !== null && !isNaN(mag))
    if (mags.length === 0) return 0
    const sum = mags.reduce((acc, val) => acc + val, 0)
    return sum / mags.length
  }

  const getAlertLevel = (mag) => {
    if (mag < 3.5) return { level: "No alert", icon: "", action: "Ignore" }
    if (mag < 4.5) return { level: "Mild Alert", icon: "🔍", action: "Just display info" }
    if (mag < 6.0) return { level: "Warning ⚠️", icon: "⚠️", action: "Notify + Vibrate" }
    return { level: "Emergency 🚨", icon: "🚨", action: "Show alert + SOS + Notify" }
  }

  // try to get curr location
  useEffect(() => {
    if (!coordinates) {
      // Try to get browser location if coordinates prop missing
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => { // ✅ mark callback as async
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setLocalCoordinates({ latitude, longitude });

            const name = await fetchLocationName(latitude, longitude); // ✅ await now works
            setcurrLocationName(name);
          },

          (error) => {
            console.warn("Geolocation error:", error);
            setLocalCoordinates(null);
          }
        );
      } else {
        console.warn("Geolocation not supported by this browser.");
        setLocalCoordinates(null);
      }

    }
  }, [coordinates]);

  // console local coordinates
  useEffect(() => {
    if (localCoordinates) {
      console.log("Updated localCoordinates:", localCoordinates);
    }
  }, [localCoordinates]);

  // fetch and update 
  useEffect(() => {
    const activeCoords = coordinates || localCoordinates;


    const fetchAndUpdate = async () => {
      try {
        const endTime = new Date().toISOString().split("T")[0];
        const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

        let url = "";

        if (activeCoords?.latitude && activeCoords?.longitude) {
          const { latitude, longitude } = activeCoords;
          const radius = 300;

          url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}&starttime=${startTime}&endtime=${endTime}&minmagnitude=3`;
        } else {
          url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=3`;
        }

        console.log("Fetching from URL:", url);

        const res = await fetch(url);
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`API Error ${res.status}: ${errorText}`);
          return;
        }

        const data = await res.json();

        const avgMag = calculateAvgMagnitude(data.features, activeCoords);
        // rest remains same...

        const currentTime = new Date().toLocaleTimeString();
        const diff = avgMag - prevIntensity.current;
        setTrend(diff);
        prevIntensity.current = avgMag;

        const roundedMag = parseFloat(avgMag.toFixed(2));
        setCurrentIntensity(roundedMag);
        setAlertInfo(getAlertLevel(roundedMag));

        if (window.navigator.vibrate && roundedMag >= 4.5) {
          window.navigator.vibrate([300, 200, 300]);
        }

        setChartData((prev) => ({
          labels: [...prev.labels, currentTime].slice(-12),
          datasets: [
            {
              ...prev.datasets[0],
              data: [...prev.datasets[0].data, avgMag].slice(-12),
            },
          ],
        }));
      } catch (error) {
        console.error("Failed to fetch earthquake data:", error);
      }
    };



    fetchAndUpdate();
    const intervalId = setInterval(fetchAndUpdate, 6000);
    return () => clearInterval(intervalId);
  }, [coordinates, localCoordinates]);

  // try to fet location name using lat & lon
  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      console.log("Location info:", data);

      const locationName = data.address.city || data.address.town || data.address.village || data.address.state;
      // console.log("locationname: ", );
      return locationName || "Unknown Location";
    } catch (error) {
      console.error("Failed to fetch location name:", error);
      return "Unknown Location";
    }
  };


  const getTrendIcon = () => trend > 0.05
    ? <ArrowUpRight className="w-4 h-4 text-green-500" />
    : trend < -0.05
      ? <ArrowDownRight className="w-4 h-4 text-red-500" />
      : <TrendingUp className="w-4 h-4 text-gray-400" />

  const getTrendText = () => trend > 0.05 ? t.increasing : trend < -0.05 ? t.decreasing : t.stable
  const getTrendColor = () => trend > 0.05 ? "text-green-500" : trend < -0.05 ? "text-red-500" : "text-gray-400"
  const finalLocationName = locationName || currLocationName || "";
  return (
    <motion.div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>

      <div className="flex items-center justify-between mb-4">

        <h4 className="text-xl font-semibold text-red-600 dark:text-red-400">
          {t.title}{finalLocationName && ` - ${finalLocationName}`}
        </h4>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.intensity}</p>
          <div className="flex items-end mt-1">
            <h3 className="text-3xl font-bold text-black dark:text-gray-200">{currentIntensity} Mw</h3>
            <div className="ml-2 mb-1 flex items-center">
              {getTrendIcon()}
              <span className={`text-xs ml-1 ${getTrendColor()}`}>{getTrendText()}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
            <div className="bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${(currentIntensity / 10) * 100}%` }}></div>
          </div>
        </div>

        <div
          className={`rounded-xl p-4 ${currentIntensity >= 6
            ? 'border-2 border-red-800 opacity-80 bg-red-200 text-black'
            : currentIntensity >= 4.5
              ? 'bg-yellow-200 border-yellow-600 border-1 text-black'
              : 'bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400'
            }`}
        >
          <p className="text-sm">{t.alertLevel}</p>
          <div className="text-lg font-bold flex items-center space-x-2">
            <span>{alertInfo.icon}</span>
            <span>{alertInfo.level}</span>
          </div>
        </div>
      </div>

      <div className="h-50 md:h-80">
        <Line ref={chartRef} data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${t.tooltip}: ${context.parsed.y} Mw`
              }
            }
          },
          scales: {
            y: {
              min: 0,
              max: 10,
              title: {
                display: true,
                text: t.yAxis,
                color: "#6B7280",
                font: { size: 12, weight: "bold" }
              },
              ticks: { color: "#6B7280", font: { size: 11 } },
              grid: { color: "gray" }
            },
            x: {
              title: {
                display: true,
                text: t.xAxis,
                color: "#6B7280",
                font: { size: 12, weight: "bold" }
              },
              ticks: { color: "#6B7280", font: { size: 11 } },
              grid: { color: "gray" }
            }
          }
        }} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 p-2 text-center">Data calculate every 6 second</p>
      <p className="text-sm text-red-400 p-2 text-justify"> <h3>Note:</h3> This data is an estimate based on recent earthquakes and may not be fully accurate.</p>
    </motion.div>
  )
}

export default DisasterChart
