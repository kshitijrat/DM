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
const allowedOrigins = [
  "https://dm-frontend-t8vb.onrender.com",
  "http://localhost:5173/", // production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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

app.use((req, res, next) => {
  console.log("Request path:", req.path);
  next();
});



// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/seek", seekRoutes);
app.use("/api/provide", resourceRoute);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/coin", coinRoutes);

app.get("/", (req, res) => {
  res.send("✅ Disaster Alert Backend is running!");
});

// ✅ IoT Sensor Data Route
app.post("/api/sensor-data", (req, res) => {
  const { sensorType, vibration } = req.body;

  // Step 1: Validate input types
  if (typeof sensorType !== 'string' || typeof vibration !== 'number') {
    console.error("❌ Invalid data received", req.body);
    return res.status(400).json({ error: "sensorType must be string and vibration must be number" });
  }
  const timestamp = new Date();

  // Step 2: Log the received data
  console.log("✅ Received IoT data:");
  console.log("   ➤ Sensor Type:", sensorType);
  console.log("   ➤ Vibration:", vibration);
  console.log("   ➤ Timestamp:", timestamp.toISOString());

  // Step 3: Emit data to all connected clients via Socket.IO
  io.emit("newSensorData", { sensorType, vibration, timestamp });

  // Step 4: Send confirmation to sender
  res.json({ message: "✅ Sensor data received successfully" });
});



app.get("/test", (req, res) => {
  res.json({ msg: "CORS working" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// server.js ya app.js me
// Static folder: frontend/dist
const path = require("path")
app.use(express.static(path.join(__dirname, "frontend", "dist")));
// console.log("path is: ",path);
// For SPA routing
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
