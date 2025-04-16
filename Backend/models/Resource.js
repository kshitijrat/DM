const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
    type: { type: String, required: true }, // food, shelter, medical
    description: { type: String },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Resource", ResourceSchema);
