const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skills: [String],
    availability: { type: Boolean, default: true },
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);
