const express = require("express");
const router = express.Router();
const Resource = require("../models/SeekResources");

router.post("/seek-resource", async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json({ message: "Successfully Submitted Your Request!" });
  } catch (err) {
    console.error("Error saving resource:", err);
    res.status(400).json({
      error: err.errors ? Object.values(err.errors).map(e => e.message).join(", ") : "Failed to submit request"
    });
  }
});

module.exports = router;
