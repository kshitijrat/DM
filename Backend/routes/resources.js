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

router.get("/provided-resources", async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (err) {
    console.error("❌ Error fetching resources:", err);
    res.status(500).json({ error: "Failed to fetch provided resources" });
  }
});


// Delete resource by ID
// router.delete("/delete-resource/:id", async (req, res) => {
//   console.log("DELETE hit");
//   try {
//     const { id } = req.params;
//     console.log("Deleting ID:", id);
//     const deleted = await Resource.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ error: "Resource not found" });
//     }
//     res.status(200).json({ message: "Deleted successfully" });
//   } catch (error) {
//     console.error("Delete error:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


module.exports = router;
