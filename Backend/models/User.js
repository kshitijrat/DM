const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    location: { type: String },
    role: { type: String, enum: ["victim", "volunteer", "admin"], default: "victim" },
});

module.exports = mongoose.model("User", UserSchema);
