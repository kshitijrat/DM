// user routes
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/user/coins", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("coins");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ coins: user.coins || 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
