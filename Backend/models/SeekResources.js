const mongoose = require("mongoose");

const SeekResources = new mongoose.Schema({
    name: { type: String, required: true }, 
    phone: { type: String, required: true },
    location: { type: String, required: true }, // Changed from `resource_loc`
    resourceType: { type: String, enum: ["shelter", "food", "medical", "transport", "other"], required: true }, // Changed from `resource_loc`
    n_people: { type: String, required: true }, // changed to string to match frontend input
    urgency: { 
        type: String, 
        enum: ["Low", "Medium", "High", "Critical"], 
        required: true 
    }, // changed to string enum
    description: { type: String } // changed from `additional`
});

module.exports = mongoose.model("SeekResources", SeekResources);

