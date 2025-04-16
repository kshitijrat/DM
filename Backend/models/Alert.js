const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    type: { type: String, required: true }, // flood, earthquake, etc.
    location: { type: String, required: true },
    description: { type: String },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", AlertSchema);
