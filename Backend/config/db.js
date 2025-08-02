const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        // console.log("🌐 process.env:", process.env); // Check full object
        console.log("🧪 atlas_url:", process.env.atlas_url); // Should not be undefined
        const conn = await mongoose.connect(process.env.atlas_url);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
