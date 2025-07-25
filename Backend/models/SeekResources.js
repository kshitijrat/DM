const mongoose = require("mongoose");

const SeekResources = new mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  location: { type: String, required: true },
  resourceType: {
    type: String,
    enum: ["shelter", "food", "medical", "transport", "other"],
    required: true
  },
  n_people: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[1-9]\d*$/.test(v); // Positive integer only
      },
      message: "Number of people must be a valid number"
    }
  },
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    required: true
  },
  description: { type: String }
});

module.exports = mongoose.model("SeekResources", SeekResources);
