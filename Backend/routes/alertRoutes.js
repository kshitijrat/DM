const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");


router.get("/", async (req, res) => {
    const alerts = await Alert.find();
    alert("chala yaha tk alert route");
    res.json(alerts);
});

// for notification
router.post("/new-alert", async (req, res) => {
  const newAlert = new Alert(req.body);
  await newAlert.save();

  // Emit real-time alert to all clients
  req.io.emit("newAlert", newAlert);  // 👈 VERY IMPORTANT

  res.status(201).json(newAlert);
});


// Create an alert
router.post("/", async (req, res) => {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.json(newAlert);
});

module.exports = router;
