const mongoose = require("mongoose");

const ProvideResource = new mongoose.Schema({
    name: { type: String, required: true }, 
    phone: { type: String, required: true },
    email: { type: String,required: true },
    resource_loc: { type: String, enum: ["low.", "medium", "high"], required: true },
    quantity: { type: Number,required: true },
    availability:{type: Number, enum: [0,1,2,3,-1], required: true},
    additional:{type:String}

});

module.exports = mongoose.model("Resources", ProvideResource);
