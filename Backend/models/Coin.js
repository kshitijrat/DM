const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 }
});

module.exports = mongoose.model("Coin", coinSchema);
