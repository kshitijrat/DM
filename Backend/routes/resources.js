// routes/provideResource.js
const express = require("express");
const router = express.Router();
const Resource = require("../models/ProvideResources");
const Coin = require("../models/Coin");
const User = require("../models/User");

// Route to add a resource and award a coin
router.post("/add-resource", async (req, res) => {
  try {
    const { email } = req.body;
    const newResource = new Resource(req.body);
    await newResource.save();
    let coinEntry;
    if (email) {
      // Update or create coin entry
      coinEntry = await Coin.findOne({ email });
      if (coinEntry) {
        coinEntry.coins += 1;
        await coinEntry.save();
        console.log("Updated coinEntry:", coinEntry);
      } else {
        console("coin create: ");
        await Coin.create({ email, coins: 1 });
      }
    }
    console.log("Total coins", { coinEntry })
    res.status(201).json({ message: "Resource added and coin updated!" });
  } catch (err) {
    console.error("🔥 Resource submission failed:", err);
    res.status(500).json({ error: err.message || "Failed to add resource" });
  }
});

// Route to get all provided resources
router.get("/provided-resources", async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (err) {
    console.error("❌ Error fetching resources:", err);
    res.status(500).json({ error: "Failed to fetch provided resources" });
  }
});

module.exports = router;
