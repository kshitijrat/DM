const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");


router.get("/", async (req, res) => {
    const alerts = await Alert.find();
    res.json(alerts);
});


// Create an alert
router.post("/", async (req, res) => {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.json(newAlert);
});

module.exports = router;
