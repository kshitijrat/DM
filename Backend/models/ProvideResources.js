const mongoose = require("mongoose");

const ProvideResource = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+\d{1,4}[0-9]{6,14}$/.test(v);
      },
      message: props => `Phone number ${props.value} is invalid. Use format like +919876543210`
    }
  },

  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },

  location: { 
    type: String, 
    required: true,
    trim: true
  },

  resourceType: { 
    type: String, 
    enum: ["shelter", "food", "medical", "transport"], 
    required: true 
  },

  quantity: { 
    type: String, 
    required: true,
    trim: true
  },

  availability: { 
    type: String, 
    enum: ["immediate", "within24", "within48", "flexible"], 
    required: true 
  },

  description: { 
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("ProvideResources", ProvideResource);
