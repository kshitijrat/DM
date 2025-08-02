// routes/coin.js
const express = require("express");
const router = express.Router();
const Coin = require("../models/Coin");

router.get("/get-coins/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const entry = await Coin.findOne({ email });
    res.json({ coins: entry?.coins || 0 });
  } catch (err) {
    console.error("❌ Coin fetch failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
