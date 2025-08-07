import { useEffect } from "react"
import { io } from "socket.io-client"

const socket = io("https://dm-backend-auge.onrender.com") // 👈 Hosted backend

const IoTSensorConsole = () => {
  useEffect(() => {
    socket.on("newSensorData", (data) => {
      if (data.sensorType === "earthquake") {
        console.log("📟 Arduino Se Data Aaya:", data)
      }
    })

    return () => {
      socket.off("newSensorData")
    }
  }, [])

  return (
    <div className="text-sm text-gray-700 p-4">
      <p className="font-semibold text-lg text-green-700">👂 Listening to Earthquake Sensor...</p>
      <p className="text-gray-500 mt-2">Open dev console (F12) to see real-time logs.</p>
    </div>
  )
}

export default IoTSensorConsole;
