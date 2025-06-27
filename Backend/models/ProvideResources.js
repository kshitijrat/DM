const mongoose = require("mongoose");

const ProvideResource = new mongoose.Schema({
    name: { type: String, required: true }, 
    phone: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true }, // Changed from `resource_loc`
    resourceType: { type: String, enum: ["shelter", "food", "medical", "transport"], required: true }, // Changed from `resource_loc`
    quantity: { type: String, required: true }, // changed to string to match frontend input
    availability: { 
        type: String, 
        enum: ["immediate", "within24", "within48", "flexible"], 
        required: true 
    }, // changed to string enum
    description: { type: String } // changed from `additional`
});

module.exports = mongoose.model("ProvideResources", ProvideResource);
