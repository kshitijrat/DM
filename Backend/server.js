const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const resourceRoute = require("./routes/resources");
const alertRoutes = require("./routes/alertRoutes");
const seekRoutes = require("./routes/seekresource");
const subscribeRoute = require("./routes/subscribe");
const coinRoutes = require("./routes/coin");




const app = express();
const server = http.createServer(app); // Create HTTP server

console.log("✅ .env loaded, atlas_url =", process.env.atlas_url);

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
app.use(cors({
  origin: "https://dm-frontend-t8vb.onrender.com", // your frontend dev URL
  credentials: true,               // allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser()); // ✅ Moved before routes

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "https://dm-frontend-t8vb.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/seek", seekRoutes);
app.use("/api/provide", resourceRoute);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/coin", coinRoutes);

// ✅ IoT Sensor Data Route
app.post("/api/sensor-data", (req, res) => {
  const { sensorType, vibration } = req.body;

  if (!sensorType || vibration === undefined) {
    return res.status(400).json({ error: "sensorType and vibration required" });
  }

  console.log(`Received IoT data: ${sensorType} vibration=${vibration}`);
  io.emit("newSensorData", { sensorType, vibration, timestamp: new Date() });

  res.json({ message: "Sensor data received" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
