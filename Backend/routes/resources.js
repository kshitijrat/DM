const express = require("express");
const router = express.Router();
const Resource = require("../models/ProvideResources");

router.post("/add-resource", async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json({ message: "Resource added successfully!" });
  } catch (err) {
    console.error("🔥 Resource submission failed:", err);
    res.status(500).json({ error: err.message || "Failed to add resource" });
  }
});

module.exports = router;
