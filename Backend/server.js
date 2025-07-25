const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const resourceRoute = require("./routes/resources");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use('/api/seek', require('./routes/seekresource'));
// app.use("/api/seek", require('./routes/seekresource'));
app.use("/api/provide",resourceRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



