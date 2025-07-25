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

router.get("/seek-resource", async (req, res) => {
  try {
    const data = await Resource.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.delete("/delete-resource/:id", async (req, res) => {
  console.log("DELETE hit");
  try {
    const { id } = req.params;
    console.log("Deleting ID:", id);
    const deleted = await Resource.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
